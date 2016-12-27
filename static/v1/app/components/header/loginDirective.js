angular.module('ciApp').directive('login', ['$state', 'appServices', 'App', 'Storage', 'Container', 'AccountService', 'SecurityService', 'BRAND_ID', 'affiliateService', 'md5', function($state, appServices, App, Storage, Container, AccountService, SecurityService, BRAND_ID, affiliateService, md5) {
  return {
    templateUrl: '/static/v1/app/components/header/login.html',
    restrict: 'A',
    scope: {},
    link: function($scope) {
      function getBasicinfo(reload, page) {
        AccountService.call('MainAccount_Basicinfo_Get', {}, function(result) {
          if (result.Success) {
            Storage.putCookie(App.currencyID, 2);
            Container.setCurrencyID(2);
            Container.setPromotionID(result.Result[0].PromotionID);
            $scope.$emit('loginSuccess', {
              userName: $scope.accountName.value,
              reload: !reload
            });
            appServices.basicInfoUpdated();
            $scope.accountName.value = $scope.allowLogAccountName ? $scope.accountName.value : '';
            $scope.accountPassword.value = '';
            if (reload) {
              switch (page) {
                case 'id':
                  $state.go('member.security', {
                    method: 'name'
                  });
                  break;
                case 'phone':
                  $state.go('member.security', {
                    method: 'mobile'
                  });
                  break;
                case 'email':
                  $state.go('member.security', {
                    method: 'email'
                  });
                  break;
                case 'message':
                  $state.go('member.message');
                  break;
                case 'withdraw':
                  $state.go('member.bank', {
                    method: 'withdraw'
                  });
                  break;
                default:
                  $state.go('home');
                  break;
              }
            }
          }
        });
      };

      function setCookie(obj) {
        Storage.putCookie(App.token, $state.token);
        Storage.putCookie(App.account, $state.user);
        Container.setUserName($state.user);
        Container.setAuthStatus(true);
        $scope.accountName.value = $state.user;
        getBasicinfo(true, $state.target);
        affiliateService.cleanAutoLogin();
      }

      function countDownStop() {
        $scope.countDownProcess = false;
        clearInterval(timer);
      }

      function timeOutHandler() {
        $scope.countDownValue = '';
        $scope.timeout = true;
      }

      function countDown() {
        remainTime--;
        if (remainTime < 0) {
          countDownStop();
          timeOutHandler();
        } else {
          $scope.countDownValue = '(' + remainTime + ')';
        }
      }

      function countDownStart() {
        if (remainTime > 0) {
          $scope.countDownProcess = false;
          $scope.timeout = false;
          clearInterval(timer);
          timer = setInterval(countDown, 1000);
        }
      }

      function verifyNewPassword() {
        var password = $scope.forgetPasswordObj.newpassword;
        var charVerify = /^[a-zA-Z0-9!@#$%^&*()_+]+$/;
        if (password == '') {
          $scope.forgetPasswordObj.newPasswordErrMsg = 'find_password@wrong_new_password_empty';
          return false;
        }
        if (password.length < 6 || password.length > 20) {
          $scope.forgetPasswordObj.newPasswordErrMsg = 'find_password@wrong_new_password_width'
          return false;
        }
        if (!charVerify.test(password)) {
          $scope.forgetPasswordObj.newPasswordErrMsg = 'find_password@wrong_new_password_char';
          return false;
        }
        if (password !== $scope.forgetPasswordObj.repeatNewpassword) {
          $scope.forgetPasswordObj.newPasswordErrMsg = 'member_security@withdraw_twice_error';
          return false;
        }
        return true;
      }

      function verifyInfoHandle(verifyObj) {
        if (verifyObj.SecurityQuestion !== '') {
          $scope.forgetPasswordObj.isQuestion = true;
          $scope.forgetPasswordObj.textQuestion = verifyObj.SecurityQuestion;
        }
        if (verifyObj.ContactNumber !== '') {
          $scope.forgetPasswordObj.isMobile = true;
          $scope.forgetPasswordObj.textMobile = verifyObj.ContactNumber;
        }
        if (verifyObj.Email !== '') {
          $scope.forgetPasswordObj.isEmail = true;
          $scope.forgetPasswordObj.textEmail = verifyObj.Email;
        }
        if ($scope.forgetPasswordObj.isQuestion || $scope.forgetPasswordObj.isMobile || $scope.forgetPasswordObj.isEmail) {
          $scope.forgetPasswordObj.hasVerify = true;
        }
      }

      var b = Storage.getCookie(App.logAccount) || '0';
      $scope.allowLogAccountName = '1' === b;
      $scope.forgetPasswordObj = {
        showForgotPassword: false,
        verifyStep: '0',
        accountNameErr: false,
        isQuestion: false,
        isMobile: false,
        isEmail: false,
        hasVerify: false,
        accountName: '',
        verifyType: '',
        textMobile: '',
        textEmail: ''
      };
      $scope.accountName = {
        value: $scope.allowLogAccountName ? Storage.getCookie(App.account) : '',
        focus: false,
        checkValid: function() {
          $scope.errorMsg = '' === this.value ? 'header_login@account_incorrect' : '';
          return '' !== this.value;
        }
      };
      $scope.accountPassword = {
        value: '',
        focus: false,
        checkValid: function() {
          $scope.errorMsg = '' === this.value ? 'header_login@password_incorrect' : '';
          return '' !== this.value;
        }
      };
      $scope.errorMsg = '';
      $scope.loginButtonClicked = false;
      if (affiliateService.getAffiliateIsAutoLogin()) {
        setCookie(affiliateService.getAffiliateAutoLoginData());
      }

      $scope.onKeyUp = function($event) {
        if ($event.keyCode.toString() === '13') {
          $scope.submit();
        }
      };

      $scope.submit = function() {
        if (!$scope.loginButtonClicked && $scope.accountName.checkValid() && $scope.accountPassword.checkValid()) {
          $scope.errorMsg = '';
          $scope.loginButtonClicked = true;
          var parser = new UAParser();
          var browser = parser.getBrowser();
          var data = {
            // intLoginType: 1,
            username: $scope.accountName.value,
            password: md5.createHash($scope.accountPassword.value),
            // IovationBlackBox: document.getElementById('blackBox').value,
            // RuleSet: 'login',
            // strDomain: appServices.getDomainName(),
            // strBrowserType: browser.name + ' ' + browser.major,
            // strBrowserResolution: window.outerWidth + '*' + window.outerHeight
          };
          AccountService.call('MainAccount_Login', data, function(result) {
            if (result.Success) {
              if (result.Result[0].LoginSuccess === 1) {
                Storage.putCookie(App.token, result.Result[0].Token);
                Storage.putCookie(App.account, $scope.accountName.value);
                Storage.putCookie(App.logAccount, $scope.allowLogAccountName ? '1' : '0');
                Container.setUserName($scope.accountName.value);
                getBasicinfo(false);
              }
            } else {
              $scope.errorMsg = result.Message;
            }
            $scope.loginButtonClicked = false;
          });
        }
      };

      $scope.goRegister = function() {
        $('.btn-close').trigger('click');
        $scope.$emit('openRegister');
      };
      $scope.checkLogAccountName = function() {
        $scope.allowLogAccountName = !$scope.allowLogAccountName;
      };
      $scope.$on('affiliateLogin', function(e, t) {
        setCookie(t);
      });
      $scope.$on('updateUserName', function(e, t) {
        $scope.accountName.value = t.name;
      });
      $scope.onLogin = function() {
        $scope.forgetPasswordObj.showForgotPassword = false;
        $scope.$emit('openLogin');
      };
      $scope.openLiveChat = function() {
        $scope.forgetPasswordObj.showForgotPassword = false;
        appServices.openLiveChat()
      };
      $scope.contactus = function() {
        $scope.forgetPasswordObj.showForgotPassword = false;
        $state.go('about', {
          menuItem: 'contact'
        });
      };
      $scope.showLoading = false;
      var timer = null;
      var remainTime = 0;

      $scope.forgetPassword = function() {
        $scope.$emit('closePopupDlg');
        $scope.forgetPasswordObj.showForgotPassword = true;
        $scope.forgetPasswordObj.verifyStep = '0';
        $scope.forgetPasswordObj.accountNameErr = false;
        $scope.forgetPasswordObj.questionErr = false;
        $scope.forgetPasswordObj.mobileErr = false;
        $scope.forgetPasswordObj.emailErr = false;
        $scope.forgetPasswordObj.newPasswordErr = false;
        $scope.forgetPasswordObj.newPasswordErrMsg = '';
        $scope.forgetPasswordObj.hasVerify = false;
        $scope.forgetPasswordObj.isQuestion = false;
        $scope.forgetPasswordObj.isMobile = false;
        $scope.forgetPasswordObj.isEmail = false;
        $scope.forgetPasswordObj.accountName = '';
        $scope.forgetPasswordObj.verifyType = '';
        $scope.forgetPasswordObj.textMobile = '';
        $scope.forgetPasswordObj.textEmail = '';
        $scope.forgetPasswordObj.textQuestion = '';
        $scope.forgetPasswordObj.answerQuestion = '';
        $scope.forgetPasswordObj.mobileCode = '';
        $scope.forgetPasswordObj.emailCode = '';
        $scope.forgetPasswordObj.newpasswordCode = '';
        $scope.forgetPasswordObj.newpassword = '';
        $scope.forgetPasswordObj.repeatNewpassword = '';
        timer = null;
        $scope.countDownValue = '';
        $scope.sendSuccess = false;
        $scope.countDownProcess = false;
        $scope.timeout = false
      };
      $scope.checkAccount = function() {
        $scope.forgetPasswordObj.accountNameErr = false;
        $scope.showLoading = true;
        if ($scope.forgetPasswordObj.accountName === '') {
          $scope.forgetPasswordObj.accountNameErr = true;
          $scope.showLoading = false;
        } else {
          AccountService.call('MainAccountExists_Check', {
            strMainAccountID: $scope.forgetPasswordObj.accountName,
            intBrandID: BRAND_ID
          }).success(function(result) {
            if (result.Sucess) {
              $scope.showLoading = false;
              $scope.forgetPasswordObj.accountNameErr = true;
            } else {
              AccountService.call('Mainaccount_All_Auth_Get', {
                strMainAccountID: $scope.forgetPasswordObj.accountName,
                intBrandID: BRAND_ID
              }).success(function(result) {
                $scope.showLoading = false;
                if (result.Result && result.Result.length > 0) {
                  $scope.forgetPasswordObj.verifyStep = '1';
                  verifyInfoHandle(result.Result[0]);
                }
              })
            }
          });
        }
      };
      $scope.goVerifyInput = function(type) {
        $scope.countDownValue = '';
        $scope.forgetPasswordObj.verifyType = type;
        $scope.forgetPasswordObj.verifyStep = '2';
      };
      $scope.verifyQuestion = function() {
        if ($scope.forgetPasswordObj.answerQuestion) {
          $scope.forgetPasswordObj.questionErr = false;
          return false;
        }
        $scope.showLoading = true;
        SecurityService.call('SecurityQuestion_Check', {
          strMainAccountID: $scope.forgetPasswordObj.accountName,
          intBrandID: BRAND_ID,
          strSecurityQuestionAnswer: $scope.forgetPasswordObj.answerQuestion
        }, function(result) {
          $scope.showLoading = false;
          if (e.Success === true) {
            remainTime = e.Result[0].RemainingSec;
            countDownStart();
            $scope.forgetPasswordObj.newpasswordCode = result.Result[0].Token_Out;
            $scope.goResetPassword();
          } else {
            $scope.forgetPasswordObj.questionErr = true;
          }
        });
      };
      $scope.sendMobileCode = function() {
        if ($scope.countDownProcess !== true) {
          $scope.showLoading = true;
          SecurityService.call('SendSMSVerifyCode', {
            MainAccountID: $scope.forgetPasswordObj.accountName,
            BrandID: BRAND_ID,
            ContentID: '4',
            UserType: '1',
            ReferralID: '13'
          }, function(result) {
            $scope.showLoading = false;
            if (result.Success === true) {
              remainTime = result.Result.RemainingSec;
              $scope.sendSuccess = true;
              countDownStart();
            } else {
              appServices.showAlertMsg('popup_alert@title_fail', result.Message)
            }
          });
        }
      };
      $scope.verifyMobile = function() {
        $scope.forgetPasswordObj.mobileErr = false;
        if ($scope.forgetPasswordObj.mobileCode) {
          $scope.forgetPasswordObj.mobileErr = true;
          return false;
        }
        $scope.showLoading = true;
        SecurityService.call('Password_TokenCode_Check', {
          intBrandID: BRAND_ID,
          strMainAccountID: $scope.forgetPasswordObj.accountName,
          intReferralID: 13,
          strTokenCode: $scope.forgetPasswordObj.mobileCode
        }, function(result) {
          $scope.showLoading(false);
          if (result.Success === false) {
            $scope.forgetPasswordObj.mobileErr = true;
          } else {
            $scope.forgetPasswordObj.newpasswordCode = result.Result[0].Token_Out;
            remainTime = result.Result[0].RemainingSec;
            $scope.goResetPassword();
          }
        });
      };
      $scope.sendEmailCode = function() {
        if ($scope.countDownProcess !== true) {
          $scope.showLoading = true;
          SecurityService.call('EmailVerify', {
            BrandID: BRAND_ID,
            MainAccountID: $scope.forgetPasswordObj.accountName,
            LanguageCode: Container.getLang(),
            ReferralID: '23'
          }, function(result) {
            $scope.showLoading = false;
            if (result.Success === true) {
              remainTime = result.Result.RemainingSec;
              $scope.sendSuccess = true;
              countDownStart();
            } else {
              appServices.showAlertMsg('popup_alert@title_fail', result.Message);
            }
          });
        }
      };
      $scope.verifyEmail = function() {
        $scope.forgetPasswordObj.emailErr = false;
        if ($scope.forgetPasswordObj.emailCode) {
          $scope.showLoading = true;
          SecurityService.call('Password_TokenCode_Check', {
            intBrandID: BRAND_ID,
            strMainAccountID: $scope.forgetPasswordObj.accountName,
            intReferralID: 23,
            strTokenCode: $scope.forgetPasswordObj.emailCode
          }, function(result) {
            $scope.showLoading = false;
            if (result.Success === false) {
              $scope.forgetPasswordObj.emailErr = true;
            } else {
              $scope.forgetPasswordObj.newpasswordCode = result.Result[0].Token_Out;
              remainTime = result.Result[0].RemainingSec;
              $scope.goResetPassword();
            }
          });
        } else {
          $scope.forgetPasswordObj.emailErr = true;
        }
      };
      $scope.goResetPassword = function() {
        $scope.forgetPasswordObj.verifyStep = '3';
      };
      $scope.resetPassword = function() {
        $scope.forgetPasswordObj.newPasswordErr = false;
        if (verifyNewPassword()) {
          $scope.showLoading = true;
          SecurityService.call('MainAccount_UpdateForgotPassword', {
            strMainAccountID: $scope.forgetPasswordObj.accountName,
            intBrandID: BRAND_ID,
            strMainAccountPassword: $scope.forgetPasswordObj.newpassword,
            strTokenCode: $scope.forgetPasswordObj.newpasswordCode,
            intReferralID: 15,
            intPasswordStrength: 0
          }, function(result) {
            $scope.showLoading = false;
            if (result.Success !== true) {
              $scope.forgetPasswordObj.newPasswordErr = true;
            } else {
              appServices.showAlertMsg('popup_alert@title_success', 'member_security@modify_success');
            }
          })
        } else {
          $scope.forgetPasswordObj.newPasswordErr = true;
        }
      };
      $scope.rechooseVerifyType = function() {
        $scope.forgetPasswordObj.verifyType = '';
        $scope.forgetPasswordObj.verifyStep = '1';
        countDownStop();
        timeOutHandler();
        $scope.sendSuccess = false;
        $scope.forgetPasswordObj.questionErr = false;
        $scope.forgetPasswordObj.mobileErr = false;
        $scope.forgetPasswordObj.emailErr = false;
      };
      $scope.$watch("forgetPasswordObj.showForgotPassword", function(e, t) {
        if(e === false && t === true) {
          countDownStop();
          timeOutHandler();
        }
      });
    }
  }
}]);
