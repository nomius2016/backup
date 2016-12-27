angular.module('ciApp').directive('register', ["$timeout", "$state", "appServices", "verifyService", "affiliateService", "App", "Container", "Storage", "AccountService", "BRAND_ID", "BonusService", "md5", function($timeout, $state, appServices, verifyService, affiliateService, App, Container, Storage, AccountService, BRAND_ID, BonusService, md5) {
  return {
    templateUrl: '/static/v1/app/components/header/register.html',
    restrict: 'A',
    scope: {},
    link: function($scope) {
      var submitData = {
        strCookie: '',
        strMainAccountID: '',
        strMainAccountPassword: '',
        intMainAccountType: 1,
        intPasswordStength: 0,
        strLanguageCode: 0,
        strAreaCode: '',
        strContactNumber: '',
        intNewsLetter: 0,
        strIPAddress: Container.getIPAddress(),
        strMemo: '',
        strCreator: "ciapp.com",
        intPromotionType: 0,
        strPromotionCode: '',
        strDomain: appServices.getDomainName()
      };
      var affiliateAuto = false;
      var affiliateFromCookie = false;
      $scope.allValid = true;
      $scope.allowCondition = false;
      $scope.showWelcome = false;
      $scope.userName = {
        value: '',
        focus: false,
        valid: false,
        lengthValid: false,
        charValid: false,
        unique: false,
        checkValid: function() {
          var self = this;
          var regular = /^\d*[a-zA-Z][a-zA-Z0-9]*$/;
          this.lengthValid = this.value && this.value.length >= 6 && this.value.length <= 16;
          this.charValid = this.value && regular.test(this.value);
          if (this.lengthValid && this.charValid) {
              // AccountService.call('MainAccountExists_Check', {
              //     strMainAccountID: this.value,
              //     intBrandID: BRAND_ID
              // }).success(function(result) {
              //     self.unique = result.Success;
              //     self.valid = self.unique;
              // });
              this.valid = true;
          } else {
              this.valid = false;
          }
        },
        reset: function() {
          this.value = '';
          this.valid = false;
          this.lengthValid = false;
          this.charValid = false;
          this.unique = false;
        }
      };
      $scope.password = {
        value: '',
        focus: false,
        valid: false,
        lengthValid: false,
        charValid: false,
        diffWithName: false,
        checkValid: function() {
          var regular = /^[a-zA-Z0-9!@#$%^&*()_+]+$/;
          this.lengthValid = this.value && this.value.length >= 6 && this.value.length <= 20;
          this.charValid = this.value && regular.test(this.value);
          this.diffWithName = this.value && (this.value !== $scope.userName.value);
          this.valid = this.lengthValid && this.charValid && this.diffWithName;
          if (this.valid) {
              $scope.passwordConfirm.checkValid();
          }
        },
        reset: function() {
          this.value = '';
          this.valid = false;
          this.lengthValid = false;
          this.charValid = false;
          this.diffWithName = false;
        }
      };
      $scope.passwordRepeat = {
        value: '',
        focus: false,
        valid: false,
        checkValid: function() {
          if(!this.value) {
            this.valid = false
          }
          this.valid = this.value === $scope.password.value;
        },
        reset: function() {
          this.value = '';
          this.valid = false;
        }
      };
      $scope.phone = {
        value: '',
        focus: false,
        valid: false,
        checkValid: function() {
          this.valid = this.value && verifyService.checkPhone($scope.countryCode, this.value);
        },
        reset: function() {
          this.value = '';
          this.valid = false;
        }
      };
      $scope.agent = {
        value: '',
        type: 0,
        focus: false,
        valid: false,
        autoSet: false,
        checkValid: function() {
          var self = this;
          if(this.value && !this.autoSet) {
            AccountService.call("Account_AffiliateID_Get", {
              strAccountID: this.value
            }, function(result) {
              self.valid = result.Success;
              self.type = 3;
            });
          }
        },
        reset: function() {
          this.value = '';
          this.type = 0;
          this.valid = false;
          this.autoSet = false;
        }
      };
      $scope.bonusList = {
        name: 0,
        mobile: 0,
        email: 0
      };
      $scope.checkCondition = function() {
        $scope.allowCondition = !$scope.allowCondition
      };
      $scope.submitErrMsg = '';
      $scope.submit = function() {
          var t = $("#btnGameSubmit").text();
          $scope.allValid = false;
          $scope.submitErrMsg = ''; 
          if(!$scope.allowCondition) {
            $scope.submitErrMsg = "header_register@confirm_msg";
            return;
          }
          if(!$scope.userName.valid) {
            $("#tb_userid").focus();
            return;
          }
          if(!$scope.password.valid) {
            $("#tb_password").focus();
            return;
          }
          if(!$scope.passwordRepeat.valid) {
            $("#tb_passwordcof").focus();
            return;
          }
          if(!$scope.phone.valid) {
            $("#tb_contact").focus();
            return;
          }
          if($scope.agent.autoSet || !$scope.agent.value || $scope.agent.valid) {
            $("#tb_affiliatecode").focus();
            return;
          }
          $scope.allValid = true;
          submitData.username = $scope.userName.value;
          submitData.password = md5.createHash($scope.password.value);
          submitData.confirm_password = submitData.password;
          submitData.phone = $scope.phone.value;
          submitData.intPromotionType = $scope.agent.type;
          submitData.agent_code = $scope.agent.value;
          $("#btnGameSubmit").removeClass().addClass("btn-3 mgbt10 goToStep3").html('<span class="icon-loading-1"></span>');
          AccountService.call("MainAccount_Create", submitData, function(result) {
              if(result.Success) {
                $("#registerPage").animate({
                  left: "-706px"
                }, function() {
                  $(".layer-style-1").addClass("img-bg-finish");
                });
                setRegTimeCookie();
                resetRegisterInfo();
                $timeout(function() {
                  autoLogin();
                }, 3000);
              } else {
                displayErrorMsg(result.Message);
                $("#btnGameSubmit").removeClass().addClass("btn-1 mgbt10 goToStep3").text(t);
              }
          });
      };
      $scope.openSpecificPage = function(target, param) {
          $state.go(target, param);
          $scope.showWelcome = false;
      };
      $scope.openLiveChat = function() {
          appServices.openLiveChat();
      };
      if(Container.getLoginLP() === true) {
        Container.setLoginLP(false);
        updateBasicInfo();
      }
      $scope.$on("updateAffiliateInfo", function() {
          updateAffiliateInfo();
      });
      $scope.$on("onRegister", function() {
        if(affiliateAuto === true) {
          return;
        }
        updateAffiliateInfo();
          if (affiliateAuto === false) {
            var id = Storage.getCookie(App.affiliateID);
            var type = Storage.getCookie(App.affiliateType);
            var guid = Storage.getCookie(App.affiliateGUID) || ''
            if (id && type) {
                affiliateService.setAffiliateInfoFromCookie(id, type, guid);
                $scope.agent.value = e;
                $scope.agent.type = t;
                $scope.agent.autoSet = !0;
                affiliateFromCookie = true;
            }
          }
      });
      $scope.$on("loginFromLP", function() {
          updateBasicInfo();
      });
      $scope.$on("$destroy", function() {}), $(".ui-select").click(function() {
        if($(this).children(".select-choice:hidden").length) {
          $(this).children(".select-choice").fadeIn("fast");
          $(".select-choice-area").show();
        } else {
          $(this).children(".select-choice").fadeOut("fast");
          $(".select-choice-area").hide();
        }
      });
      $(".ui-select li").click(function() {
          var e = $(this).children("span:last").text();
          var t = $(this).attr("code");
          var a = $(this).children("span:first").attr("class");
          $(this).parents(".ui-select").children(".select-text").text(e);
          $(this).parents(".ui-select").children(".select-icon-flag").attr("class", "select-" + a);
          $scope.countryCode = t;
          $scope.phone.checkValid();
      });
      $(".select-choice-area").click(function() {
          $(".select-choice").fadeOut();
          $(this).hide();
      });

      // h()
      function autoLogin() {
        var parser = new UAParser();
        var _browser = parser.getBrowser();
        var data = {
          intLoginType: 1,
          strLoginItem: submitData.strMainAccountID,
          strPassword: submitData.strMainAccountPassword,
          IovationBlackBox: document.getElementById("blackBox").value,
          RuleSet: "login",
          strDomain: appServices.getDomainName(),
          strBrowserType: _browser.name + " " + _browser.major,
          strBrowserResolution: window.outerWidth + "*" + window.outerHeight
        };
        AccountService.call("MainAccount_Login", data, function(result) {
          if (result.Success && result.Result[0].LoginSuccess) {
            Storage.putCookie(App.token, result.Result[0].Token);
            Storage.putCookie(App.account, submitData.strMainAccountID);
            Container.setUserName(submitData.strMainAccountID);
            if (affiliateAuto || affiliateFromCookie) {
              affiliateService.register(submitData.strMainAccountID);
              affiliateAuto = false;
              affiliateFromCookie = false;
            }
            updateBasicInfo();
          }
        });
      }

      // p()
      function updateBasicInfo() {
        AccountService.call("MainAccount_Basicinfo_Get", {}, function(result) {
          if (result.Success) {
            Storage.putCookie(App.currencyID, result.Result[0].CurrencyID);
            Container.setCurrencyID(result.Result[0].CurrencyID);
            Container.setPromotionID(result.Result[0].PromotionID);
            $scope.symbol = Container.getCurrencySymbol();
            $scope.$emit("loginSuccess", {});
            appServices.basicInfoUpdated();
            updateBonusList();
          }
        });
      }

      // f()
      function updateAffiliateInfo() {
        var id = affiliateService.getAffiliateID();
        var type = affiliateService.getAffiliateType();
        if (type > 0 && id !== "") {
            $scope.agent.value = id;
            $scope.agent.type = type;
            $scope.agent.autoSet = true;
            affiliateAuto = true;
        }
      }

      // v()
      function updateBonusList() {
        BonusService.call("Bonus_VerifyList_Get", {
          intCurrencyID: s.getCurrencyID()
        }, function(result) {
          if (result.Success) {
            for (var t = 0; t < result.Result.length; t++) {
              switch (result.Result[t].BonusCategoryTypeID) {
                case 1:
                  $scope.bonusList.name = result.Result[t].BonusAmount;
                  break;
                case 2:
                  $scope.bonusList.email = result.Result[t].BonusAmount;
                  break;
                case 3:
                  $scope.bonusList.mobile = result.Result[t].BonusAmount
              }
            }
            $scope.showWelcome = true;
          }
        });
      }

      // w()
      function displayErrorMsg(msg) {
        $(".errormsg").text(msg);
      }

      // P()
      function setRegTimeCookie() {
        var date = new Date;
        Storage.putCookie("regTime", date.getTime());
        Storage.putCookie("welcomeDate", date.getDate());
      }

      // b()
      function resetRegisterInfo() {
        $scope.userName.reset();
        $scope.password.reset();
        $scope.passwordRepeat.reset();
        $scope.phone.reset();
        $scope.agent.reset();
        $scope.allowCondition = false;
      }
    }
  }
}]);