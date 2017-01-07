angular.module('ciApp')
  .controller('memberBankCtrl', ['$scope', '$stateParams', '$state', '$timeout', 'appServices', 'Container', 'bankService', '$filter', '$window', 'CashFlowService', 'BRAND_ID', 'SecurityService', 'AccountService', '$q', 'Config', function($scope, $stateParams, $state, $timeout, appServices, Container, bankService, $filter, $window, CashFlowService, BRAND_ID, SecurityService, AccountService, $q, Config) {
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
        CashFlowService.call("Apply", data, function(result) {
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
      favoriteCards: [],
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
              $scope.withdraw.randomPasswordDigit();
              $scope.stateEmpty = !1;
              $scope.stateCheck = !1;
              $scope.stateOrder = !0;
              $scope.showLoading = !0;
              CashFlowService.call("GetWithdrawalBindCard", {}, function(e) {
                if (e.Success) {
                  var t = e.Result;
                  $scope.withdraw.favoriteCards = t;
                  if (t.length > 0) {
                    $scope.withdraw.selectCard = t[0]
                  } else {
                    $scope.withdraw.selectCard = "other";
                  }
                  $scope.withdraw.changeCard();
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
      generatePaasword: function() {
        var password = "";
        angular.forEach($scope.passwordSet, function(item) {
            if (!item.isEmpty && item.enable) {
                password = password + item.position + item.value;
            }
        });
        $scope.password = password;
        $scope.passwordValid = password.length === 6;
      },
      deleteCard: function(e) {
        $scope.showLoading = !0;
        CashFlowService.call("DeleteBankCard", {
          CashCardNumber: e.CashCardNumber
        }, function(e) {
          if(e.Success) {
            $scope[$scope.method].init();
          }
          $scope.showLoading = !1;
        });
      },
      changeCard: function() {
        if($scope.withdraw.selectCard !== undefined) {
          if("other" === $scope.withdraw.selectCard) {
            if($scope.withdraw.favoriteCards.length >= 3) {
              i.showAlertMsg("popup_alert@title_message", "popup_alert@content_withdraw_card_full");
              $scope.withdraw.selectCard = $scope.withdraw.favoriteCards[0];
              $scope.withdraw.changeCard();
              $scope.withdraw.needPassword = !1;
            } else {
              $scope.withdraw.cardNumber = "";
              $scope.updateCard($scope.withdraw.cardNumber);
              $scope.withdraw.oldCard = !1;
              $scope.withdraw.needPassword = !0;
            }
          } else {
            $scope.withdraw.cardNumber = $scope.withdraw.selectCard.CashCardNumber;
            $scope.updateCard($scope.withdraw.cardNumber);
            $scope.withdraw.oldCard = !0;
            $scope.withdraw.needPassword = !1;
          }
        }
      },
      randomPasswordDigit: function() {
        $scope.withdraw.passwordSet = [];
        for (var e = 0; e < 8; e++) {
          var t = {
            enable: !1,
            focus: !1,
            value: "",
            isEmpty: !1,
            position: e + 1
          };
          $scope.withdraw.passwordSet.push(t);
        }
        $scope.withdraw.passwordSet[0].enable = !0;
        $scope.withdraw.passwordSet[1].enable = !0;
        $scope.withdraw.passwordSet[5].isEmpty = !0;
        $scope.withdraw.passwordSet[5].position = -1;
        $scope.withdraw.passwordSet[6].position = 6;
        $scope.withdraw.passwordSet[7].position = 7;
        for (var e = 0; e < 100; e++) {
          var a = Math.floor(4 * Math.random());
          var o = Math.floor(4 * Math.random());
          if (a != o) {
            var i = $scope.withdraw.passwordSet[a].enable;
            $scope.withdraw.passwordSet[a].enable = $scope.withdraw.passwordSet[o].enable;
            $scope.withdraw.passwordSet[o].enable = i;
          }
          $scope.withdraw.passwordSet[6].enable = Math.random() < .5;
          $scope.withdraw.passwordSet[7].enable = !$scope.withdraw.passwordSet[6].enable;
        }
      },
      createOrder: function(e, t) {
        if (!$scope.inProcess) {
          $scope.inProcess = !0;
          var a = {};
          a.CashCardNumber = e;
          a.WithdrawAmount = t;
          if($scope.withdraw.needPassword) {
            a.WithdrawPwd = $scope.withdraw.password;
          }
          CashFlowService.call("Withdraw", a, function(e) {
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
      },
      createXOrder: function(e) {
        if (!$scope.inProcess) {
          $scope.inProcess = !0;
          var t = {};
          t.CashBankName = $scope.withdraw.bankName;
          t.BankDetail = $scope.withdraw.branch;
          t.CashBankPro = $scope.withdraw.province;
          t.CashBankCity = $scope.withdraw.city;
          t.CashCardNumber = $scope.withdraw.account;
          t.WithdrawAmount = e;
          t.WithdrawPwd = $scope.withdraw.password;
          $scope.showLoading = !0;
          CashFlowService.call("XWithdraw", t, function(e) {
            if(e.Success) {
              $scope.stateOrder = !1;
              $scope.stateResult = !0;
              $scope.countingDown(10);
            } else {
              appServices.showAlertMsg("popup_alert@title_fail", e.Message);
            }
            $scope.showLoading = !1;
            $scope.inProcess = !1;
          });
        }
      },
      createMoneyPayOrder: function(e) {
        if (!$scope.inProcess) {
          $scope.inProcess = !0;
          var t = {};
          t.UserBankName = $scope.withdraw.bankName;
          t.BankAccountNumber = $scope.withdraw.account;
          t.WithdrawPwd = $scope.withdraw.password;
          t.WithdrawAmount = e;
          t.Method = $scope.withdraw.method;
          t.PaymentMethodID = k[$scope.withdraw.method];
          CashFlowService.call("PayBank/Withdrawal", t, function(e) {
            if(e.Success) {
              $scope.stateOrder = !1;
              $scope.stateResult = !0;
              $scope.countingDown(10);
            } else {
              appServices.showAlertMsg("popup_alert@title_fail", e.Message);
            }
            $scope.showLoading = !1;
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
      $scope.cardNumberFix = card.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ");
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
