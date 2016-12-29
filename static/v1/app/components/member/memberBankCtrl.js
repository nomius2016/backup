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
    $scope.method = $stateParams.method;
    $scope.way = $stateParams.way ? $stateParams.way :'online';
    var C = {
        1: "online",
        2: "transfer",
        3: "cash",
        5: "bao",
        6: "wechat",
        7: "quick",
        8: "moneypay",
        9: "dcard"
      };
    var k = {
        online: "1",
        transfer: "2",
        cash: "3",
        bao: "5",
        wechat: "6",
        quick: "7",
        moneypay: "8",
        dcard: "9"
      };
    $scope.openLiveChat = function() {
      appServices.openLiveChat()
    };
    $scope.clickDeposit = function() {
      $scope.method = "deposit";
      $scope[$scope.method].init();
    };
    $scope.clickWithdraw = function() {
      $scope.method = "withdraw";
      $scope[$scope.method].init();
    };
    $scope.deposit = {
      MoneyPayActive: true,
      QuickActive: Config.QuickActive,
      AlipayActive: Config.AlipayActive,
      WechatActive: Config.WechatActive,
      minValue: 0,
      maxValue: 0,
      min: {},
      max: {},
      methods: ["online", "bao", "transfer", "cash"],
      method: $scope.way,
      cardNumber: "",
      cardLock: !0,
      cardUserName: "USER-NAME",
      moreShown: !1,
      moreStyle: {},
      bankList: [],
      allBank: {},
      payWayList: [],
      favoriteShown: !1,
      init: function() {
        appServices.scrollAnchor("#vw-ck");
        $scope.deposit.allBank = bankService.getBankList();
        delete $scope.deposit.bankName;
        delete $scope.deposit.orderSerial;
        delete $scope.deposit.amount;
        delete $scope.deposit.bankGUID;
        delete $scope.deposit.cardUserName;
        delete $scope.deposit.cardNumber;
        delete $scope.deposit.QQaccount;
        delete $scope.deposit.ReturnURL;
        delete $scope.deposit.payWay;
        $scope.deposit.cardLock = !0;
        $scope.deposit.favoriteShown = !1;
        $scope.stateEmpty = !0;
        $scope.stateCheck = !1;
        $scope.stateOrder = !1;
        $scope.stateConfirm = !1;
        $scope.stateResult = !1;
        $scope.deposit.isMore = !1;
        $scope.deposit.moreStyle = {};
        // $scope.showLoading = !0;
        // CashFlowService.call("GetDepositCardFlag", {}, function(result) {
        //   $scope.showLoading = !1;
        //   $scope.deposit.cardLock = !result.Success;
        //   $scope.deposit.check();
        // });
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
        data.UserPayAmount = $scope.deposit.amount;
        if ($scope.currencyID === 2) {
          data.PaymentMethodID = k[$scope.deposit.method]
          switch ($scope.deposit.method) {
            case "online":
              data.UserBankID = $scope.deposit.allBank[$scope.deposit.bankGUID].PaymentGUID;
              data.UserBankName = $scope.deposit.allBank[$scope.deposit.bankGUID].BankName;
              var t = c.open("", "_blank");
              break;
            case "bao":
              break;
            case "wechat":
              break;
            case "quick":
              var t = c.open("", "_blank");
              break;
            case "transfer":
            case "cash":
              data.UserBankID = $scope.deposit.allBank[$scope.deposit.bankGUID].PaymentGUID;
              data.UserBankName = $scope.deposit.allBank[$scope.deposit.bankGUID].BankName;
              data.UserPaywayID = $scope.deposit.payWay.Code;
              data.UserPaywayName = $scope.deposit.payWay.Name;
              break;
            default:
              break;
          }
          $scope.showLoading = !0;
          CashFlowService.call("Deposit", data, function(result) {
            if (result.Success) {
              if ("online" === $scope.deposit.method || "quick" === $scope.deposit.method) {
                t.location.href = result.Result[0].ReturnURL;
              }
              $scope.deposit.getUncompleteOrder();
            } else {
              appServices.showAlertMsg("popup_alert@title_fail", result.Message);
            }
            $scope.showLoading = !1;
          });
        } else {
          if("moneypay" == $scope.deposit.method) {
            data.UserBankName = $scope.deposit.bankName;
            data.PaymentMethodID = k[$scope.deposit.method];
            data.FrontURI = m.MoneyPayFrontMessageURL;
            data.Method = $scope.deposit.method;
            $scope.showLoading = !0;
            CashFlowService.call("PayBank/Deposit", data, function(result) {
             if (result.Success) {
               var t = result.Data.PostUrl;
               var a = "";
               angular.forEach(result.Data.PostData, function(e, t) {
                 a += "<input type='hidden' name='" + t + "' value='" + e + "'>";
               });
               var o = "<form id='myForm' method='post' action='" + t + "'>" + a + "</form><script>document.getElementById('myForm').submit();</script>";
               var n = c.open("", "_blank");
               n.document.write(o);
               $scope.deposit.getUncompleteOrder();
             } else {
               appServices.showAlertMsg("popup_alert@title_fail", result.Message);
             }
             $scope.showLoading = !1;
           });
         } else {
           data.UserBankName = $scope.deposit.bankName;
           $scope.showLoading = !0;
           CashFlowService.call("XDeposit", data, function(result) {
            if (result.Success) {
              var t = result.Result[0];
              var a = t.TransactionNumber;
              if (a.length >= 7) {
                var o = a.substr(0, 1);
                var n = a.substr(a.length - 6, 6);
                a = o.toString() + n.toString();
              }
              $scope.deposit.orderSerial = a;
              $scope.deposit.cardOwnerName = t.CardName;
              $scope.deposit.bank = t.CashBankDesc;
              $scope.deposit.bankAccount = t.CardNumber;
              $scope.deposit.city = t.City;
              $scope.deposit.branch = t.BranchName;
              $scope.stateCheck = !1;
              $scope.stateOrder = !1;
              $scope.stateConfirm = !0;
            } else {
              i.showAlertMsg("popup_alert@title_fail", result.Message);
            }
            $scope.showLoading = !1;
          });
         }
        }
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
      isMore: !1,
      showMore: function() {
        $scope.deposit.isMore = !0;
        var e = $scope.deposit.bankList.length;
        $scope.deposit.bankListLimit = e;
        var t = 48 * Math.ceil(e / 4);
        $scope.deposit.moreStyle = {
          height: t.toString() + "px"
        }
      },
      getFavorite: function() {
        $scope.deposit.favoriteShown = !1;
        $scope.deposit.favortieList = [];
        $scope.showLoading = !0;
        CashFlowService.call("GetFavoritesBankList", {
          Counts: 3,
          PaymentAgentID: $scope.paymentAgentID()
        }, function(result) {
          if (result.Success) {
            var t = result.Result;
            if(t.length > 0) {
              if("online" === $scope.deposit.method || "moneypay" == $scope.deposit.method) {
                angular.forEach(t, function(e) {
                  var t = w(e.GUID);
                  void 0 !== t && (t.duplicate = !0);
                });
                $scope.deposit.favortieList = t;
              } else {
                $scope.deposit.favortieList = t;
              }
              $scope.deposit.favoriteShown = !0;
              $scope.deposit.bankGUID = $scope.deposit.favortieList[0].GUID;
              $scope.deposit.bankList = r("filter")($scope.deposit.bankList, {
                duplicate: !1
              });
            }
          }
          $scope.showLoading = !1;
        });
      },
      onDcardChange: function() {
        delete $scope.deposit.dcardAmount;
      },
      createDcardOrder: function() {
        $scope.showLoading = !0;
        var e = {
          UserPayAmount: $scope.deposit.dcardAmount,
          UserPaywayID: $scope.deposit.dcard.Way,
          UserPaywayName: $scope.deposit.dcard.DCardName,
          PaymentMethodID: k.dcard,
          DCardNumber: $scope.deposit.dcardNumber,
          DCardPassWord: $scope.deposit.dcardPassword
        };
        CashFlowService.call("Deposit", e, function(result) {
          if(result.Success) {
            appServices.showAlertMsg("popup_alert@title_dear_user", "popup_alert@dcard_order_create_success");
            delete $scope.deposit.dcard;
            delete $scope.deposit.dcardAmount;
            delete $scope.deposit.dcardNumber;
            delete $scope.deposit.dcardPassword;
          } else {
            appServices.showAlertMsg("popup_alert@title_fail", result.Message);
            $scope.showLoading = !1;
          }
        });
      },
      getDCardInfo: function() {
        $scope.showLoading = !0;
        CashFlowService.call("GetDCardInfoInfo", {}, function(result) {
          $scope.deposit.dcards = result.Result;
          $scope.showLoading = !1;
        });
      },
      getUncompleteOrder: function() {
        if (2 !== $scope.currencyID) {
          $scope.showLoading = !0;
          if ("moneypay" == $scope.deposit.method) {
            CashFlowService.call("PayBank/DepositOrderLastOne", {
              Method: "moneypay",
              PaymentMethodID: "8"
            }, function(result) {
              if (result.Success)
                if (null === result.Data) {
                  switch ($scope.deposit.method) {
                    case "moneypay":
                      $scope.deposit.bankList = bankService.getPayment($scope.paymentAgentID(), "deposit");
                      if($scope.deposit.bankList.length > 0) {
                        $scope.deposit.bankGUID = $scope.deposit.bankList[0].GUID;
                        $scope.deposit.bankName = $scope.deposit.bankList[0].BankName;
                      }
                      $scope.deposit.bankListLimit = 3;
                      $scope.deposit.getFavorite();
                  }
                  if("PA00004" === $scope.paymentAgentID()) {
                    $scope.deposit.minValue = $scope.deposit.min.moneypay;
                    $scope.deposit.maxValue = $scope.deposit.max.moneypay;
                    $scope.stateCheck = !1;
                    $scope.stateOrder = !0;
                  } else {
                    $scope.deposit.bankList = bankService.getPayment($scope.paymentAgentID(), "deposit");
                    $scope.deposit.minValue = $scope.deposit.min.xpay
                    $scope.deposit.maxValue = $scope.deposit.max.xpay;
                    $scope.stateEmpty = !1;
                    $scope.stateOrder = !0;
                  }
                } else {
                  $scope.deposit.method = "moneypay";
                  $scope.deposit.amount = result.Data.DepositAmount;
                  $scope.deposit.orderSerial = result.Data.TransactionNumber;
                  var t = 108e5;
                  switch ($scope.deposit.method) {
                    case "moneypay":
                      t = 36e4;
                  }
                  var a = Math.floor((Date.parse(result.Data.StartTransactionTime) + t - Date.parse(result.Data.DBTime)) / 1e3);
                  $scope.orderValidTime = {
                    time: a + 1
                  };
                  $scope.orderCountingDown();
                  $scope.stateCheck = !1;
                  $scope.stateOrder = !1;
                  $scope.stateConfirm = !0;
                }
              $scope.showLoading = !1;
            });
          }
          if($scope.paymentAgentID() !== "PA00004") {
            $scope.deposit.bankList = bankService.getPayment($scope.paymentAgentID(), "deposit");
            $scope.deposit.minValue = $scope.deposit.min.xpay;
            $scope.deposit.maxValue = $scope.deposit.max.xpay;
            $scope.stateEmpty = !1;
            $scope.stateOrder = !0;
          }
        } else {
          CashFlowService.call("GetLastDepositOrder", {}, function(result) {
            if (result.Success) {
              if (0 === result.Result.length) {
                switch ($scope.deposit.method) {
                  case "online":
                  case "transfer":
                  case "cash":
                    $scope.deposit.bankList = bankService.getPayment($scope.paymentAgentID(), $scope.deposit.method);
                    if($scope.deposit.bankList.length > 0) {
                      $scope.deposit.bankGUID = $scope.deposit.bankList[0].GUID;
                    }
                    if($scope.deposit.method !== 'online') {
                      $scope.deposit.bankListLimit = $scope.deposit.bankList.length;
                      $scope.deposit.getDepositPayWay();
                    } else {
                      $scope.deposit.bankListLimit = 3;
                      $scope.deposit.getFavorite();
                    }
                    break;
                  case "dcard":
                    $scope.deposit.getDCardInfo()
                }
                $scope.deposit.minValue = $scope.deposit.min[$scope.deposit.method];
                $scope.deposit.maxValue = $scope.deposit.max[$scope.deposit.method];
                $scope.stateCheck = !1;
                $scope.stateOrder = !0;
              } else {
                var t = result.Result[0];
                $scope.deposit.method = C[t.PaymentMethodID];
                $scope.deposit.amount = t.SuggestAmount;
                $scope.deposit.orderSerial = t.TransactionNumber;
                var a = 108e5;
                switch ($scope.deposit.method) {
                  case "online":
                  case "quick":
                    a = 12e5;
                    break;
                  case "bao":
                  case "wechat":
                    $scope.deposit.ReturnURL = t.ReturnURL;
                    a = 3e5;
                    break;
                  case "transfer":
                  case "cash":
                    $scope.deposit.cardOwnerName = t.CardUserName;
                    $scope.deposit.bank = t.UserBankName;
                    $scope.deposit.bankAccount = t.CardNumber;
                    $scope.deposit.branchFullName = t.CardPro + t.CardCity + t.BranchBankName
                }
                var o = Math.floor((Date.parse(t.CreateTime) + a - Date.parse(t.DBSysTime)) / 1e3);
                $scope.orderValidTime = {
                  time: o + 1
                };
                $scope.orderCountingDown();
                $scope.stateCheck = !1;
                $scope.stateOrder = !1;
                $scope.stateConfirm = !0
              }
              $scope.showLoading = !1;
            }
          });
        }
      },
      openReturnUrl: function() {
        $window.open($scope.deposit.ReturnURL, "_blank");
      },
      changeBank: function(e) {
        $scope.deposit.bankGUID = e.GUID;
        if(!("transfer" !== $scope.deposit.method && "cash" !== $scope.deposit.method)) {
          $scope.deposit.payWayList = [];
          delete $scope.deposit.payWay;
          $scope.deposit.getDepositPayWay();
        }
        if("moneypay" == $scope.deposit.method) {
          $scope.deposit.bankName = e.BankName;
        }
      },
      getDepositPayWay: function() {
        var e = k[$scope.deposit.method];
        $scope.showLoading = !0;
        CashFlowService.call("GetCashBankWay", {
          AssignType: e,
          CashBankID: $scope.deposit.allBank[$scope.deposit.bankGUID].PaymentGUID
        }, function(e) {
          if(e.Success) {
            $scope.deposit.payWayList = e.Result;
            if($scope.deposit.payWayList.length > 0) {
              $scope.deposit.payWay = $scope.deposit.payWayList[0];
            }
          }
          $scope.showLoading = !1;
        });
      }
    };
    $scope.withdraw = {
      XPayActive: Config.XPayActive,
      MoneyPayActive: v(),
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
        var e = [AccountService.call("MainAccount_ReAccountName_Check", {}), SecurityService.call("MainAccount_Auth_Get", {})];
        $scope.showLoading = !0;
        $q.all(e).then(function(e) {
          $scope.showLoading = !1;
          var t = e[0].data;
          var a = e[1].data;
          $scope.nameValid = !t.Success;
          if (!$scope.nameValid) {
            delete $scope.withdraw.firstName;
            delete $scope.withdraw.middleName;
            delete $scope.withdraw.lastName;
            if ($scope.currencyID === 2) {
              $scope.withdraw.middleName = "";
              $scope.withdraw.lastName = "";
            }
          }
          if (a && a.Result[0].WithdrawalPassword !== null) {
            $scope.withdrawValid = !0
          }
          if ($scope.nameValid && $scope.withdrawValid) {
            $scope.withdraw.bankList = bankService.getPayment($scope.paymentAgentID(), "withdraw");
            $scope.withdraw.randomPasswordDigit();
            $scope.stateEmpty = !1;
            $scope.stateCheck = !1;
            $scope.stateOrder = !0;
            if ($scope.currencyID === 2) {
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
            }
            if ("withdraw" === $scope.method && "moneypay" === $scope.withdraw.method) {
              $scope.withdraw.minValue = $scope.withdraw.min.moneypay;
              $scope.withdraw.maxValue = $scope.withdraw.max.moneypay;
            } else {
              $scope.withdraw.minValue = $scope.withdraw.min.notmoneypay;
              $scope.withdraw.maxValue = $scope.withdraw.max.notmoneypay;
            }
          } else {
            $scope.stateEmpty = !1;
            $scope.stateCheck = !0;
            $scope.stateOrder = !1;
          }
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
      $scope.cardBank = bankService.getImage(card);
    };
    $scope.checkComplete = function() {
      if (bankService.isComplete()) {
        $scope.getAmountLimit()
      } else {
        timer = $timeout($scope.checkComplete, 500)
      }
    };
    $scope.getAmountLimit = function() {
      // CashFlowService.call("GetWebsiteSetting", {
      //   IsBackEnd: 0
      // }, function(result) {
      //   if (result.Success) {
      //     angular.forEach(result.Result, function(item) {
      //       var min = item.MinValue;
      //       var max = item.MaxValue;
      //       switch (item.Name) {
      //         case "DepositAmountAlipay":
      //           $scope.deposit.min.bao = min;
      //           $scope.deposit.max.bao = max;
      //           break;
      //         case "DepositAmountUnionPay":
      //           $scope.deposit.min.quick = min;
      //           $scope.deposit.max.quick = max;
      //           break;
      //         case "DepositAmountOnLine":
      //           $scope.deposit.min.online = min;
      //           $scope.deposit.max.online = max;
      //           break;
      //         case "DepositAmountWeixin":
      //           $scope.deposit.min.wechat = min;
      //           $scope.deposit.max.wechat = max;
      //           break;
      //         case "DepositAmountUnLine":
      //           $scope.deposit.min.transfer = min;
      //           $scope.deposit.max.transfer = max;
      //           $scope.deposit.min.cash = min;
      //           $scope.deposit.max.cash = max;
      //           $scope.deposit.min.xpay = min;
      //           $scope.deposit.max.xpay = max;
      //           break;
      //         case "WithdrawAmount":
      //           $scope.withdraw.minValue = min;
      //           $scope.withdraw.maxValue = max;
      //           $scope.withdraw.min.notmoneypay = min;
      //           $scope.withdraw.max.notmoneypay = max;
      //           break;
      //         case "DailyMaxWithdrawalAmount":
      //           $scope.withdraw.dailyLimit = max;
      //           break;
      //         case "MoneyPayDepositMYR":
      //         case "MoneyPayDepositVND":
      //         case "MoneyPayDepositTHB":
      //           $scope.deposit.min.moneypay = min;
      //           $scope.deposit.max.moneypay = max;
      //           break;
      //         case "MoneyPayWithdrawalTHB":
      //         case "MoneyPayWithdrawalVND":
      //           $scope.withdraw.min.moneypay = min;
      //           $scope.withdraw.max.moneypay = max;
      //       }
      //     });
      //     if ("deposit" === $scope.method && null != $scope.way) {
      //       $scope.deposit.setMethod($scope.way);
      //     } else {
      //       $scope[$scope.method].init();
      //     }
      //   }
      // });
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
    $scope.currencyID = Container.getCurrencyID();
    $scope.paymentAgentID = function() {
      var pAgentID = "PA00001";
      if ("deposit" === $scope.method) {
        if ($scope.currencyID === 2) {
          pAgentID = "PA00001";
        } else {
          pAgentID = "PA00003";
          if ($scope.deposit.method === 'moneypay') {
            pAgentID = "PA00004";
          }
        }
      } else if ("withdraw" === $scope.method) {
        var pAgentID = "PA00001";
        if ($scope.currencyID === 2) {
          pAgentID = "PA00001";
        } else {
          pAgentID = "PA00003";
          if ($scope.withdraw.method === 'moneypay') {
            pAgentID = "PA00004";
          }
        }
      }
      return pAgentID;
    };
    $scope.checkComplete();
    $scope.refresh = function() {
      appServices.reloadPage()
    };
    $scope.$on("$destroy", function(e) {
      $timeout.cancel(timer);
    });
  }]);
