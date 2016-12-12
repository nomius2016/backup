angular.module("ciApp").directive("sidebar", ["$state", "Container", "MessageService", "appServices", "AccountService", "SecurityService", "PlatformService", "BonusService", "Config", "Storage", "App", function(e, t, a, n, o, s, i, r, l, u, c) {
  return {
    templateUrl: "/static/v1/app/components/sidebar/sidebar.html",
    restrict: "A",
    scope: {},
    link: function($scope) {
      function d() {
        $scope.opened = !1;
        var e = $(".vw-bar"),
          t = $(".vw-bar-tab");
        e.stop().animate({
          right: "-235px"
        }, 350, "easeInQuad", function() {
          e.removeClass("vw-bar-status-expand"), t.removeClass("vw-bar-tab-sel")
        })
      }

      function m() {
        var e = 59,
          t = window.innerHeight - e;
        $(".vw-bar-plugin-bd").css("height", t.toString() + "px"), f(t)
      }

      function f(e) {
        var t = (e - 65) / 120;
        $scope.messageCount = t > 5 ? t : 5
      }

      function g() {
        b(), P(), C()
      }

      function h() {
        b(), $scope.total = 0, $scope.totalWithdrawal = 0, I()
      }

      function v() {
        $scope.showBonusLoading = !0, b(), S()
      }

      function w() {
        $scope.showMessageLoading = !0, b(), _()
      }

      function b() {
        $scope.userName = t.getUserName(), $scope.lang = t.getLang(), $scope.chkVwinVabyShow = n.getServerTime() < new Date("2016/11/15")
      }

      function y(e, t, a) {
        var n = !1;
        switch (e.code) {
          case "10001":
          case "30001":
          case "20001":
          case "20006":
          case "20007":
          case "20009":
          case "20004":
          case "20008":
          case "20002":
          case "40003":
            n = !0;
            break;
          case "40002":
          case "60001":
          case "62001":
          default:
            n = !1
        }
        return n
      }

      function P() {
        s.call("MainAccount_Auth_Get", {}, function(e) {
          if (e.Success) {
            var t = 0;
            null != e.Result[0].IDVerifiedTime && ($scope.securityStatus.name = !0, $(".nameAuth").css("background-position-x", "100%"), t += l.PctID), null != e.Result[0].ContactNumberVerifiedTime && ($scope.securityStatus.mobile = !0, $(".mobileAuth").css("background-position-x", "100%"), t += l.PctPhone), null != e.Result[0].EMailVerifiedTime && ($scope.securityStatus.email = !0, $(".emailAuth").css("background-position-x", "100%"), t += l.PctEmail), $scope.bonusVerifyAllPass = 70 === t, null != e.Result[0].WithdrawalPassword && ($scope.securityStatus.withdraw_pswd = !0, $(".wdpwdAuth").css("background-position-x", "100%"), t += l.PctWdPwd), null != e.Result[0].SecurityQuestionID && ($scope.securityStatus.question = !0, $(".questionAuth").css("background-position-x", "100%"), t += l.PctAnswer), $("#kb2").val(t).trigger("change"), $(".pieFont").text(t)
          }
        });
        var e = !1,
          a = !1,
          n = !1;
        r.call("GetBonusList", {
          intBrandID: 2,
          dtStartDate: "1900/01/01",
          dtEndDate: R(),
          intBonusCategoryID: 1,
          intApplyType: -1,
          strMainAccountID: t.getUserName(),
          intReceiveStatus: 2,
          strLanguageCode: t.getLang(),
          intPageNumber: 0,
          intRecordCounts: 100,
          strOrderField: "",
          bitDesc: !1
        }).success(function(t) {
          if ($scope.bonusAllGet = !1, t.Success && t.Result && t.Result.Table && t.Result.Table.length > 0) {
            for (var o = 0; o < t.Result.Table.length; o++) switch (t.Result.Table[o].BonusCategoryTypeID) {
              case 1:
                e = !0;
                break;
              case 2:
                a = !0;
                break;
              case 3:
                n = !0
            }
            e && a && n && ($scope.bonusAllGet = !0)
          }
        }), r.call("Bonus_VerifyList_Get", {
          intCurrencyID: t.getCurrencyID()
        }, function(e) {
          if (e.Success) {
            var t = e.Result[0].BonusAmount,
              a = e.Result[1].BonusAmount,
              n = e.Result[2].BonusAmount;
            $scope.bonusAll = parseInt(t, 10) + parseInt(a, 10) + parseInt(n, 10)
          }
        }), $(".vw-bar-prof-safe li,.vw-hl-time-wrap li,.vw-bar-prof-item li").on("mouseenter", function() {
          $(this).find("i").show()
        }).on("mouseleave", function() {
          $(this).find("i").hide()
        })
      }

      function C() {
        o.call("MainAccount_VIPInfo_Get", {
          intCurrencyID: 3
        }, function(e) {
          $scope.vipValues.NextLevelTypeID = e.Result[0].NextLevelTypeID, $scope.vipValues.NextPoint = e.Result[0].NextPoint, $scope.vipValues.Points = e.Result[0].Points, $scope.vipValues.TotalPoints = e.Result[0].TotalPoints, o.call("MainAccount_VIPBonus_Setting_Get", {
            intLevelTypeID: $scope.vipValues.NextLevelTypeID - 1
          }, function(e) {
            $scope.vipValues.BirthdayBonus = e.Result[0].BirthdayBonus, $scope.vipValues.CasinoBonus = e.Result[0].CasinoBonus, $scope.vipValues.DP_MaxLimit = e.Result[0].DP_MaxLimit, $scope.vipValues.LevelTypeID = e.Result[0].LevelTypeID, $scope.vipValues.LevelUpBonus = e.Result[0].LevelUpBonus, $scope.vipValues.SportsBonus = e.Result[0].SportsBonus, $scope.vipValues.TotalBonus = e.Result[0].TotalBonus, $scope.vipValues.TurnoverAmount = e.Result[0].TurnoverAmount, $scope.vipValues.VIPHelpBonusLimit = e.Result[0].VIPHelpBonusLimit, "Member" === e.Result[0].VIPName ? $scope.vipValues.VIPName = "sidebar@member_ordinary" : $scope.vipValues.VIPName = e.Result[0].VIPName
          }), o.call("MainAccount_VIPBonus_Setting_Get", {
            intLevelTypeID: $scope.vipValues.NextLevelTypeID
          }, function(e) {
            $scope.vipValues.NextLevelUpBonus = e.Result[0].LevelUpBonus, $scope.vipValues.NextLevelVIPName = e.Result[0].VIPName
          })
        })
      }

      function I() {
        i.call("PlatformList_Get", {
          strLanguageCode: t.getLang()
        }, function(e) {
          e.Success && ($scope.platformsAll = e.Result, $scope.platforms = $scope.platformsAll.filter(y), D())
        })
      }

      function A(e, t, a) {
        for (var n = 0; n < $scope.platforms.length; n++)
          if ($scope.platforms[n].code === e) {
            $scope.platforms[n].amount = t, $scope.platforms[n].isMaintain = a, $scope.total = Number($scope.total) + Number(t);
            break
          }
      }

      function D() {
        $scope.total = 0;
        for (var e = 0; e < $scope.platforms.length; e++) $scope.platforms[e].vwallet && "10001" !== $scope.platforms[e].code || k($scope.platforms[e].code)
      }

      function R() {
        var e = new Date,
          t = e.getDate(),
          a = e.getMonth() + 1,
          n = e.getFullYear();
        return t < 10 && (t = "0" + t), a < 10 && (a = "0" + a), n + "/" + a + "/" + t
      }

      function S() {
        $scope.bonus = [];
        var e = [];
        r.call("GetBonusList", {
          intBrandID: 2,
          dtStartDate: "1900/01/01",
          dtEndDate: R(),
          intBonusCategoryID: -1,
          intApplyType: -1,
          strMainAccountID: t.getUserName(),
          intReceiveStatus: 1,
          strLanguageCode: t.getLang(),
          intPageNumber: 0,
          intRecordCounts: 100,
          strOrderField: "",
          bitDesc: !1
        }).success(function(a) {
          if (a.Success) {
            e = a.Result.Table;
            var n = t.getCurrencyID();
            n === -1 && (n = 2), e.length > 0 ? r.call("GetVerifyStatus", {
              intBrandID: 2,
              strMainAccountID: t.getUserName(),
              intCurrencyID: n
            }).success(function(t) {
              if ($scope.showBonusLoading = !1, t.Success) {
                for (var a = t.Result, n = 0; n < e.length; n++)
                  if (5 !== e[n].BonusCategoryID && 7 !== e[n].BonusCategoryID)
                    for (var o = 0; o < a.length; o++) e[n].TransactionNumber === a[o].TransactionNumber && (e[n].verifiedName = a[o].IDVerified, e[n].verifiedEmail = a[o].EmailVerified, e[n].verifiedPhone = a[o].CellPhoneVerified, e[n].verifiedDeposit = a[o].SuccessDeposit, e[n].verifiedWithdrawal = a[o].SuccessWithdrawal, e[n].verifiedAllPass = !(a[o].IDVerified !== -1 && 1 !== a[o].IDVerified || a[o].EmailVerified !== -1 && 1 !== a[o].EmailVerified || a[o].CellPhoneVerified !== -1 && 1 !== a[o].CellPhoneVerified || a[o].SuccessDeposit !== -1 && 1 !== a[o].SuccessDeposit || a[o].SuccessWithdrawal !== -1 && 1 !== a[o].SuccessWithdrawal));
                  else e[n].verifiedAllPass = !0;
                if (e.length > 0)
                  for (var s = 0; s < e.length; s++) e[s].verifiedAllPass && e[s].RealTurnoverAmount >= e[s].TurnoverAmount && $scope.bonus.push(e[s])
              }
            }) : $scope.showBonusLoading = !1
          } else $scope.showBonusLoading = !1
        })
      }

      function k(e) {
        i.call("GetBalance", {
          PlatformCode: e
        }, function(t) {
          if (t.Success) {
            var a = 0;
            t.Result.length && t.Result.length > 0 ? (a = t.Result[0].BalanceAmount ? t.Result[0].BalanceAmount : 0, "10001" === e && ($scope.totalWithdrawal = a - t.Result[0].WithdrawalLimitAmount > 0 ? a - t.Result[0].WithdrawalLimitAmount : 0)) : a = 0, A(e, a, !1)
          } else A(e, 0, !0);
          $scope.isProcess = !1
        })
      }

      function _() {
        a.call("GetMessageList", {
          intRecordCounts: 10,
          intPageNumber: 0,
          strOrderField: "",
          bitDesc: !0
        }, function(e) {
          $scope.showMessageLoading = !1, e.Success && ($scope.messages = e.Result.Table)
        })
      }
      var B = ["sidebar@privilege", "sidebar@funds", "sidebar@bonus", "sidebar@message"];
      var V = $(".vw-bar");
      var T = $(".vw-bar-tab");
      var L = $(".vw-bar-plugin");
      var M = ["ClaimBonusZeroBase", "ClaimVerifyBonus", "ClaimDepositBonus", "ClaimTransferBonus", "ClaimTurnoverBonus", "ClaimVIPBonus", "ClaimSpecialBonus", "ClaimReferralBonus"];
      $scope.forceUp = t.getSidebarZ();
      $scope.opened = !1;
      $scope.selectTitle = "";
      $scope.userName = "";
      $scope.lang = "";
      $scope.bonus = [];
      $scope.messages = [];
      $scope.popupMessages = [];
      $scope.messageCount = 5;
      $scope.platformsAll = [];
      $scope.platforms = [];
      $scope.inProcess = !1;
      $scope.from = "";
      $scope.to = "";
      $scope.transferAmount = "";
      $scope.total = 0;
      $scope.totalWithdrawal = 0;
      $scope.popMessage = null;
      $scope.popMessageReply = [];
      $scope.showPopup = !1;
      $scope.showBonusLoading = !1;
      $scope.showMessageLoading = !1;
      $scope.chkVwinVabyShow = !1;
      $scope.currencyID = t.getCurrencyID();
      $scope.currencySymbol = t.getCurrencySymbol();
      $scope.vipValues = {
        VIPName: "",
        LevelUpBonus: 0,
        BirthdayBonus: 0,
        TurnoverAmount: 0,
        SportsBonus: 0,
        CasinoBonus: 0,
        VIPHelpBonusLimit: 0
      };
      $scope.securityStatus = {
        mobile: !1,
        email: !1,
        name: !1,
        question: !1,
        withdraw_pswd: !1
      };
      $scope.platforms = [{
        name: "主帳戶",
        code: "10001",
        vwallet: !0
      }, {
        name: "體育",
        code: "62001",
        vwallet: !0
      }, {
        name: "數字遊戲",
        code: "60001",
        vwallet: !0
      }, {
        name: "GamesOS遊戲",
        code: "40002",
        vwallet: !0
      }, {
        name: "沙巴體育",
        code: "30001",
        vwallet: !1
      }, {
        name: "柏金館",
        code: "20001",
        vwallet: !1
      }, {
        name: "翡翠廳",
        code: "20006",
        vwallet: !1
      }, {
        name: "星耀廳",
        code: "20007",
        vwallet: !1
      }, {
        name: "波音館",
        code: "20009",
        vwallet: !1
      }, {
        name: "海盜城",
        code: "20004",
        vwallet: !1
      }, {
        name: "奪寶島",
        code: "20008",
        vwallet: !1
      }, {
        name: "米蘭站",
        code: "20002",
        vwallet: !1
      }, {
        name: "Playtech遊戲",
        code: "40003",
        vwallet: !1
      }];
      $scope.bonusAll = 0;
      $scope.bonusVerifyAllPass = !1;
      $scope.bonusAllGet = !0;
      for (var i = 0; i < $scope.platforms.length; i++) {
        $scope.platforms[i].isProcess = !1;
        $scope.platforms[i].isMaintain = !1;
      }
      b();
      $scope.selectPage = function(e) {
        $scope.currencySymbol = t.getCurrencySymbol();
        $scope.selectTitle = B[e]
      };
      $scope.openMessagePage = function(e) {
        $scope.popMessageReply = [], $scope.popMessage = $scope.messages[e], 0 === $scope.popMessage.Is_Bulletin ? a.call("GetMessageReplyList", {
          intComplaintID: $scope.popMessage.SubjectID
        }, function(e) {
          e.Success && ($scope.popMessageReply = e.Result, $scope.showPopup = !0)
        }) : $scope.showPopup = !0
      };
      $scope.reply = function() {
        $scope.popMessage.replyContent && a.call("CreateMessageReply", {
          strReplyMessage: $scope.popMessage.replyContent,
          intComplaintID: $scope.popMessage.SubjectID,
          strMemo: "",
          strCreator: t.getUserName()
        }, function(e) {
          e.Success && e.Result.length > 0 && ($scope.popMessageReply.push(e.Result[0]), $scope.popMessage.replyContent = "")
        })
      };
      $scope.openMore = function(t) {
        var a = "member." + t;
        e.go(a)
      };
      $scope.transfer = function() {
        if (!$scope.inProcess && $scope.from && $scope.to && $scope.transferAmount && $scope.from != $scope.to) {
          $scope.inProcess = !0;
          var e = {
            PlatformCode: $scope.from,
            From: $scope.from,
            To: $scope.to,
            TransferAmount: parseInt($scope.transferAmount)
          };
          i.call("Transfer", e, function(e) {
            e.Success ? (n.showAlertMsg("popup_alert@title_dear_user", "popup_alert@title_success"), D()) : n.showAlertMsg("popup_alert@title_fail", e.Message), $scope.inProcess = !1, $scope.from = "", $scope.to = "", $scope.transferAmount = ""
          })
        }
      };
      $scope.claimBonus = function(e) {
        r.call(M[e.BonusCategoryID], {
          intBrandID: 2,
          strTransactionNumber: e.TransactionNumber,
          strMainAccountID: t.getUserName(),
          strIPAddress: t.getIPAddress()
        }).success(function(e) {
          e.Success && (n.showAlertMsg("popup_alert@title_dear_user", "popup_alert@title_success"), v())
        })
      };
      $scope.$on("langChanged", function(e, t) {
        switch ($scope.lang = t.lang, $scope.lang) {
          case "vi-vn":
            $("#vwinbaby_format").hide(), $("#vwinbaby_format_vn").show();
            break;
          default:
            $("#vwinbaby_format").show(), $("#vwinbaby_format_vn").hide()
        }
      });
      $scope.$on("sidebarWalletUpdate", function(e, t) {
        $scope.total = $scope.total + t.amount
      });
      $scope.$on("closeSidebar", function(e, t) {
        d()
      });
      $scope.$on("forceUpSidebar", function(e, t) {
        $scope.forceUp = t
      });
      $scope.$on("basicInfoUpdated", function() {
        $scope.currencyID = t.getCurrencyID()
      });
      $(".vw-bar-tab-top").find(".vw-bar-tab").bind("click", function() {
        if (!t.getAuthStatus()) return void n.needLogin();
        var e = $(this),
          a = $(this).index(),
          o = $(".vw-bar-tab-top").find(".vw-bar-tab-sel").index(),
          s = $(this).attr("page");
        if (a !== o) switch ($scope.opened = !0, V.stop().animate({
          right: "0px"
        }, 50, "easeOutQuad", function() {
          o > -1 ? (L.eq(a).css("opacity", "0"), L.eq(o).addClass("vw-bar-plugin-scaleDown"), L.eq(a).removeClass("vw-bar-plugin-scaleDown"), L.eq(a).stop().animate({
            opacity: "1"
          }, 500, "easeOutQuad")) : L.eq(a).removeClass("vw-bar-plugin-scaleDown"), L.eq(a).css({
            "z-index": "99999",
            visibility: "visible"
          }).siblings().css({
            "z-index": "99997"
          }), V.addClass("vw-bar-status-expand"), T.removeClass("vw-bar-tab-sel"), e.addClass("vw-bar-tab-sel")
        }), s) {
          case "Member":
            g();
            break;
          case "Bank":
            h();
            break;
          case "MessageBox":
            w();
            break;
          case "Bonus":
            v()
        }
      });
      $(".vw-bar-tab-top, .vw-bar-tab-bottom").find(".vw-bar-tab").bind("mouseenter", function() {
        var e = $(this);
        setTimeout(function() {
          e.find(".vw-bar-tab-tip").css({
            right: "70px",
            opacity: 0
          }), e.find(".vw-bar-tab-tip").show(), e.find(".vw-bar-tab-tip").animate({
            right: "35px",
            opacity: 1
          }, {
            duration: 300,
            easing: "easeOutQuad"
          })
        }, 200)
      });
      $(".vw-bar-tab-top, .vw-bar-tab-bottom").find(".vw-bar-tab").bind("mouseleave", function() {
        var e = $(this);
        e.find(".vw-bar-tab-tip").animate({
          right: "70px",
          opacity: 0
        }, 300, "easeInQuad", function() {
          $(this).hide()
        })
      });
      $(".vw-bar-tab-logo").click(function() {
        $("html, body").animate({
          scrollTop: "0"
        }, 1e3)
      });
      $(".vw-bar-plugin-hd-close").bind("click", function() {
        d()
      })
      if (!t.getIE8()) {
        $("#kb2").knob({
          width: 83,
          min: 0,
          max: 100,
          displayInput: !1,
          displayPrevious: !0,
          thickness: ".06",
          bgColor: "#e5e5e5",
          fgColor: "#27ae61",
          readOnly: !0
        });
      }
      $(".dropDown").on("click", function() {
        $(".errormsgBank").text("").hide();
        $(".vw-asset-table").animate({
          "max-height": "1000px"
        }, 400, "easeInQuad");
        $(".vw-zz-tit").hide();
        $(".vw-zz-cnt .vw-slt").hide();
        $(".vw-zz-cnt .vw-frm").hide();
        $(".btnTransfer").hide();
        $(".dropUp").show();
        $(".dropDown").hide();
        $(".vw-zz").css("height", "50px");
      });
      $(".dropUp").on("click", function() {
        $(".errormsgBank").text("").hide(), $(".vw-asset-table").animate({
          "max-height": "53px"
        }, 400, "easeInQuad");
        $(".vw-zz-tit").show();
        $(".vw-zz-cnt .vw-slt").show();
        $(".vw-zz-cnt .vw-frm").show();
        $(".btnTransfer").show();
        $(".dropUp").hide();
        $(".dropDown").show();
        $(".vw-zz").css("height", "260px");
      });
      $(window).resize(m);
      m();
      $scope.toProm = function() {
        window.open(l.VWinBabyVNSite)
      };
      $scope.toBaby = function() {
        return t.getAuthStatus() ? void(winObj1 = window.open("/html/vwinbaby/2017/2017vwinbaby.html?name=" + u.getCookie(c.token))) : void n.needLogin()
      }
    }
  }
}])
