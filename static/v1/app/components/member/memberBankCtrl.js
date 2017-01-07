angular.module('ciApp')
  .controller('memberBankCtrl', ['$scope', '$stateParams', '$state', '$timeout', 'appServices', 'Container', 'bankService', '$filter', '$window', 'CashFlowService', 'BRAND_ID', 'SecurityService', 'AccountService', '$q', 'Config', 'md5', function($scope, $stateParams, $state, $timeout, appServices, Container, bankService, $filter, $window, CashFlowService, BRAND_ID, SecurityService, AccountService, $q, Config, md5) {
    function w(e) {
      for (var t = $scope.deposit.bankList.length, a = 0; a < t; a++)
        if ($scope.deposit.bankList[a].GUID === e) return $scope.deposit.bankList[a]
    }

    function y() {
      var e = "online";
      if(2 == Container.getCurrencyID()) {
        way = Config.WithdrawPaymentDefaultCN;
      } else if(16 == Container.getCurrencyID()) {
        way = Config.WithdrawPaymentDefaultVND;
      } else if(18 == Container.getCurrencyID()) {
        way = Config.WithdrawPaymentDefaultTHB;
      }
      return e;
    }

    function v() {
      var e = !1;
      if(Config.MoneyPayActive) {
        if(16 == Container.getCurrencyID()) {
          e = Config.MoneyPayWithdrawCurrencyVND;
        } else if(18 == Container.getCurrencyID()) {
          e = Config.MoneyPayWithdrawCurrencyTHB;
        }
      } else {
        e = !1;
      }
      return e;
    }
    var timer;
    $scope.currencyID = 2;
    $scope.method = $stateParams.method;
    $scope.way = $stateParams.way ? $stateParams.way :'online';
    $scope.clickTab = function(method) {
      $scope.method = method;
      $scope[method].init();
    };
    $scope.deposit = {
      minValue: 0,
      maxValue: 0,
      min: {
        online: 50
      },
      max: {
        online: 50000
      },
      methods: ["online", "transfer", "alipay", "wechat"],
      method: $scope.way,
      cardNumber: "",
      cardLock: !0,
      cardUserName: "USER-NAME",
      bankList: [],
      init: function() {
        appServices.scrollAnchor("#vw-ck");
        $scope.deposit.bankList = bankService.getBankList();
        delete $scope.deposit.amount;
        delete $scope.deposit.bankID;
        delete $scope.deposit.ReturnURL;
        delete $scope.deposit.payWay;
        $scope.stateEmpty = !0;
        $scope.stateCheck = !1;
        $scope.stateOrder = !1;
        $scope.stateConfirm = !1;
        $scope.stateResult = !1;
        $scope.deposit.check();
      },
      check: function() {
        $scope.showLoading = true;
        AccountService.call("MainAccount_Basicinfo_Get", {}, function(result) {
          if (result.Success) {
            if(result.Result[0].real_name) {
              $scope.nameValid = true;
            } else {
              $scope.nameValid = false;
              $scope.stateEmpty = false;
              $scope.stateCheck = true;
            }            
          }
          $scope.deposit.getUncompleteOrder();
          $scope.showLoading = !1;
        });
      },
      setMethod: function(method) {
        $scope.deposit.method = method;
        $scope.deposit.init();
      },
      createOrder: function() {
        var data = {};
        var win = $window.open("", "_blank");
        data.amount = $scope.deposit.amount;
        data.pay_method_id = $scope.deposit.bankID;
        $scope.showLoading = !0;
        CashFlowService.call("Deposit", data, function(result) {
          if (result.Success) {
            if ("online" === $scope.deposit.method) {
              win.location.href = result.Result[0].url;
            }
            $scope.deposit.getUncompleteOrder();
          } else {
            appServices.showAlertMsg("popup_alert@title_fail", result.Message);
          }
          $scope.showLoading = !1;
        });
      },
      cancelOrder: function() {
        $scope.showLoading = !0;
        if ("moneypay" == $scope.deposit.method) {
          var e = {};
          e.TransactionNumber = $scope.deposit.orderSerial;
          e.Method = $scope.deposit.method;
          e.PaymentMethodID = k[$scope.deposit.method];
          CashFlowService.call("PayBank/DepositOrderCancel", e, function(result) {
            if(result.Success) {
              appServices.showAlertMsg("popup_alert@title_dear_user", "popup_alert@content_deposit_cancel_success");
              $scope[$scope.method].init();
              $timeout.cancel(timer);
            } else {
              appServices.showAlertMsg("popup_alert@title_fail", result.Message);
            }
            $scope.showLoading = !1;
          })
        } else {
          CashFlowService.call("DepositCancel", {
            TransactionNumber: $scope.deposit.orderSerial
          }, function(e) {
            if(result.Success) {
              appServices.showAlertMsg("popup_alert@title_dear_user", "popup_alert@content_deposit_cancel_success");
              $scope[$scope.method].init();
              $timeout.cancel(timer);
            } else {
              appServices.showAlertMsg("popup_alert@title_fail", result.Message);
            }
            $scope.showLoading = !1;
          });
        }
      },
      confirmOrder: function() {
        $scope.showLoading = !0;
        CashFlowService.call("GetDepositReceive", {
          TransactionNumber: $scope.deposit.orderSerial
        }, function(result) {
          if(result.Success) {
            $scope.stateConfirm = !1;
            $scope.stateResult = !0;
            $scope.countingDown(10);
          }
          $scope.showLoading = !1;
        });
      },
      getUncompleteOrder: function() {
        switch ($scope.deposit.method) {
          case "online":
          case "transfer":
            if($scope.deposit.bankList['online'].length > 0) {
              $scope.deposit.bankID = $scope.deposit.bankList['online'][0].payment_method_id;
            }
            break;
          default:
            break;
        }
        $scope.deposit.minValue = $scope.deposit.min[$scope.deposit.method];
        $scope.deposit.maxValue = $scope.deposit.max[$scope.deposit.method];
        $scope.stateCheck = false;
        $scope.stateOrder = true;

        $scope.showLoading = false;
      },
      openReturnUrl: function() {
        $window.open($scope.deposit.ReturnURL, "_blank");
      },
      changeBank: function(e) {
        $scope.deposit.bankID = e.payment_method_id;
        if(!("transfer" !== $scope.deposit.method && "cash" !== $scope.deposit.method)) {
          $scope.deposit.payWayList = [];
          delete $scope.deposit.payWay;
          $scope.deposit.getDepositPayWay();
        }
        if("moneypay" == $scope.deposit.method) {
          $scope.deposit.bankName = e.BankName;
        }
      }
    };
    $scope.withdraw = {
      minValue: 0,
      maxValue: 0,
      min: {},
      max: {},
      method: y(),
      dailyLimit: 0,
      bindCards: [],
      needPassword: !0,
      init: function() {
        appServices.scrollAnchor("#vw-ck");
        $scope.stateEmpty = !0;
        $scope.stateCheck = !1;
        $scope.stateOrder = !1;
        $scope.stateResult = !1;
        $scope.nameValid = !1;
        $scope.withdrawValid = !1;
        $scope.inProcess = !1;
        $scope.withdraw.passwordValid = !1;
        $scope.withdraw.needPassword = !0;
        delete $scope.cardNumberFix;
        delete $scope.cardNumber;
        delete $scope.withdraw.password;
        $scope.passwordTip = !1;
        $scope.withdraw.check();
      },
      check: function() {
        $scope.showLoading = !0;
        AccountService.call("MainAccount_Basicinfo_Get", {}, function(result) {
          if (result.Success) {
            if(result.Result[0].real_name) {
              $scope.nameValid = true;
            } else {
              $scope.nameValid = false;
              $scope.stateEmpty = false;
              $scope.stateCheck = true;
            }
            $scope.withdrawValid = result.Result[0].fund_password_setted;
            if ($scope.nameValid && $scope.withdrawValid) {
              $scope.withdraw.bankList = bankService.getBankList();
              $scope.stateEmpty = !1;
              $scope.stateCheck = !1;
              $scope.stateOrder = !0;
              $scope.showLoading = !0;
              CashFlowService.call("GetUserWithdrawalCards", {}, function(e) {
                if (e.Success) {
                  var t = e.Result;
                  $scope.withdraw.bindCards = t;
                }
                $scope.showLoading = !1;
              });
            } else {
              $scope.stateEmpty = !1;
              $scope.stateCheck = !0;
              $scope.stateOrder = !1;
            }     
          }
          $scope.deposit.getUncompleteOrder();
          $scope.showLoading = !1;
        });
      },
      setMethod: function(method) {
        $scope.withdraw.method = method;
        $scope.withdraw.init();
      },
      changeCard: function(selectCard) {
        console.log(selectCard)
          $scope.withdraw.cardNumber = selectCard.account_no;
          $scope.updateCard($scope.withdraw.cardNumber);
      },
      createOrder: function(selectCard, fundPassword, amount) {
        if (!$scope.inProcess) {
          $scope.inProcess = !0;
          var data = {};
          data.user_card_id = selectCard.id;
          data.fund_password = md5.createHash(fundPassword);
          data.amount = amount;
          CashFlowService.call("Withdraw", data, function(e) {
            if(e.Success) {
              $scope.stateOrder = !1;
              $scope.stateResult = !0;
              $scope.countingDown(10);
            } else {
              appServices.showAlertMsg("popup_alert@title_fail", e.Message);
            }
            $scope.inProcess = !1;
          });
        }
      }
    };
    $scope.setRealName = function(realname) {
      if (!$scope.nameValid) {
        AccountService.call("MainAccount_UpdateBasicInfo", {
          real_name: realname
        }, function(result) {
          if (result.Success) {
            $scope[$scope.method].init();
          }
        })
      }
    };
    $scope.validateWithdraw = function() {
      if (!$scope.withdrawValid) {
        appServices.scrollTop();
        $state.go("member.security", {
          method: "withdraw"
        });
      }
    };
    $scope.countingDown = function(t) {
      $timeout.cancel(timer);
      $scope.leaveTime = t;
      timer = $timeout($scope.countingDownTrigger, 1000);
    };
    $scope.countingDownTrigger = function() {
      $scope.leaveTime = $scope.leaveTime - 1;
      if (0 === $scope.leaveTime) {
        appServices.reloadPage();
      } else {
        timer = $timeout($scope.countingDownTrigger, 1000);
      }
    };
    $scope.orderCountingDown = function() {
      $timeout.cancel(timer);
      $scope.orderValidTime.time = $scope.orderValidTime.time - 1;
      var t = $scope.orderValidTime.time;
      if(t <= 0) {
        $scope.deposit.orderValid = !1;
        return;
      }
      $scope.deposit.orderValid = !0;
      $scope.orderValidTime.hh = $filter("leadingZero")(Math.floor(t / 3600), 2);
      $scope.orderValidTime.mm = $filter("leadingZero")(Math.floor(t % 3600 / 60), 2);
      $scope.orderValidTime.ss = $filter("leadingZero")(Math.floor(t % 60), 2)
      timer = $timeout($scope.orderCountingDown, 1000);
    };
    $scope.updateCard = function(card) {
      $scope.cardNumFix = card.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ");
    };
    $scope.checkComplete = function() {
      if (bankService.isComplete()) {
        $scope.getAmountLimit()
      } else {
        timer = $timeout($scope.checkComplete, 500)
      }
    };
    $scope.getAmountLimit = function() {
      $scope.withdraw.min.moneypay = 100;
      $scope.withdraw.max.moneypay = 50000;
      if ("deposit" === $scope.method && null != $scope.way) {
        $scope.deposit.setMethod($scope.way);
      } else {
        $scope[$scope.method].init();
      }
    };
    $scope.copySuccess = function() {
      appServices.showAlertMsg("popup_alert@title_dear_user", "popup_alert@content_copy_success");
    };
    $scope.checkComplete();
    $scope.$on("$destroy", function(e) {
      $timeout.cancel(timer);
    });
  }]);
