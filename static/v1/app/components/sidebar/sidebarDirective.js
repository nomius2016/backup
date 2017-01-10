angular.module("ciApp").directive("sidebar", ["$state", "Container", "MessageService", "appServices", "AccountService", "SecurityService", "PlatformService", "BonusService", "Config", "Storage", "App", '$filter', function(e, t, a, n, o, s, PlatformService, r, l, u, c, $filter) {
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
        P();
      }

      function h() {
        $scope.total = 0;
        $scope.totalWithdrawal = 0;
        I()
      }

      function getMessageList() {
        $scope.showMessageLoading = !0;
        a.call("GetMessageList", {}, function(res) {
          $scope.showMessageLoading = false;
          if(res.Success) {
            $scope.messages = res.Result.rows;
          }
        });
      }

      function P() {
        o.call('MainAccount_Basicinfo_Get', {}, function(res) {
          $("#kb2").val(res.Result[0].profile_percent).trigger("change");
          $(".pieFont").text(res.Result[0].profile_percent)
        });

        $(".vw-bar-prof-safe li,.vw-hl-time-wrap li,.vw-bar-prof-item li").on("mouseenter", function() {
          $(this).find("i").show()
        }).on("mouseleave", function() {
          $(this).find("i").hide()
        })
      }

      function I() {
        o.call('MainAccount_Basicinfo_Get', {}, function(res) {
          $scope.total =  res.Result[0].total_balance;
          $scope.totalWithdrawal =  res.Result[0].can_withdrawal;
        });
        PlatformService.call("PlatformList_Get", {}, function(res) {
          if(res.Success) {
            $scope.platformsAll = res.Result;
            $scope.platforms = $scope.platformsAll;
            D();
          }
        });
      }

      function A(e, t, a) {
        for (var n = 0; n < $scope.platforms.length; n++)
          if ($scope.platforms[n].code === e) {
            $scope.platforms[n].amount = t;
            $scope.platforms[n].isMaintain = a;
            // $scope.total = Number($scope.total) + Number(t);
            break
          }
      }

      function D() {
        // $scope.total = 0;
        for (var e = 0; e < $scope.platforms.length; e++) $scope.platforms[e].vwallet && "10001" !== $scope.platforms[e].code || k($scope.platforms[e].code)
      }

      function R() {
        var e = new Date,
          t = e.getDate(),
          a = e.getMonth() + 1,
          n = e.getFullYear();
        return t < 10 && (t = "0" + t), a < 10 && (a = "0" + a), n + "/" + a + "/" + t
      }

      function k(e) {
        PlatformService.call("GetBalance", {
          PlatformCode: e
        }, function(t) {
          if (t.Success) {
            var a = 0;
            t.Result.length && t.Result.length > 0 ? (a = t.Result[0].BalanceAmount ? t.Result[0].BalanceAmount : 0, "10001" === e && ($scope.totalWithdrawal = a - t.Result[0].WithdrawalLimitAmount > 0 ? a - t.Result[0].WithdrawalLimitAmount : 0)) : a = 0, A(e, a, !1)
          } else A(e, 0, !0);
          $scope.isProcess = !1
        })
      }

      var B = ["sidebar@privilege", "sidebar@funds", "sidebar@bonus", "sidebar@message"];
      var $bar = $(".vw-bar");
      var $barTab = $(".vw-bar-tab");
      var $barPlugin = $(".vw-bar-plugin");
      var M = ["ClaimBonusZeroBase", "ClaimVerifyBonus", "ClaimDepositBonus", "ClaimTransferBonus", "ClaimTurnoverBonus", "ClaimVIPBonus", "ClaimSpecialBonus", "ClaimReferralBonus"];
      $scope.forceUp = t.getSidebarZ();
      $scope.opened = !1;
      $scope.selectTitle = "";
      $scope.userName = t.getUserName();
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
      $scope.transferValid = false;
      $scope.total = 0;
      $scope.totalWithdrawal = 0;
      $scope.popMessage = null;
      $scope.popMessageReply = [];
      $scope.showPopup = !1;
      $scope.showBonusLoading = !1;
      $scope.showMessageLoading = !1;
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

      $scope.bonusAll = 0;
      $scope.bonusVerifyAllPass = !1;
      $scope.bonusAllGet = !0;
      for (var i = 0; i < $scope.platforms.length; i++) {
        $scope.platforms[i].isProcess = !1;
        $scope.platforms[i].isMaintain = !1;
      }

      $scope.selectPage = function(e) {
        $scope.currencySymbol = t.getCurrencySymbol();
        $scope.selectTitle = B[e]
      };
      $scope.openMessagePage = function(e) {
        // return false;
        $scope.popMessageReply = [];
        $scope.popMessage = $scope.messages[e];
        0 === $scope.popMessage.Is_Bulletin ? a.call("GetMessageReplyList", {
          intComplaintID: $scope.popMessage.SubjectID
        }, function(e) {
          e.Success && ($scope.popMessageReply = e.Result, $scope.showPopup = !0)
        }) : $scope.showPopup = !0
      };
      $scope.deleteMessage = function(message) {
        $scope.showMessageLoading = true;
        a.call("DeleteMessage", {
          id: message.id
        }, function(e) {
          if (e.Success) {
            $scope.showPopup = false;
            getMessageList();
            $scope.showMessageLoading = true;
          }
        });
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
      $scope.transferChange = function() {
        // 第三方钱包之前不可以转账
        if($scope.from && $scope.to) {
          if ($scope.from == $scope.to) {
            $(".errormsgBank").text($filter('translate')('sidebar@transfer_error_1')).show();
            $scope.transferValid = false;
          } else if ($scope.from != '10000' && $scope.to != '10000') {
            $(".errormsgBank").text($filter('translate')('sidebar@transfer_error_2')).show();
            $scope.transferValid = false;
          } else {
            $(".errormsgBank").text("").hide();
            $scope.transferValid = true;
          }
        }
      };
      $scope.transfer = function() {
        if (!$scope.inProcess && $scope.from && $scope.to && $scope.transferAmount && $scope.from != $scope.to) {
          $scope.inProcess = !0;
          var data = {
            from: $scope.from,
            to: $scope.to,
            amount: parseInt($scope.transferAmount)
          };
          PlatformService.call("Transfer", data, function(e) {
            e.Success ? (n.showAlertMsg("popup_alert@title_dear_user", "popup_alert@title_success"), D()) : n.showAlertMsg("popup_alert@title_fail", e.Message), $scope.inProcess = !1, $scope.from = "", $scope.to = "", $scope.transferAmount = ""
            I();  //转账成功之后刷新余额
          });
        }
      };
      $scope.$on("sidebarWalletUpdate", function(e, t) {
        // $scope.total = $scope.total + t.amount
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
        if (!t.getAuthStatus()) {
          return void n.needLogin();
        }
        var e = $(this),
          a = $(this).index(),
          o = $(".vw-bar-tab-top").find(".vw-bar-tab-sel").index(),
          s = $(this).attr("page");
        if (a !== o) {
          $scope.opened = true;
          $bar.stop().animate({
            right: "0px"
          }, 50, "easeOutQuad", function() {
            if(o > -1) {
              $barPlugin.eq(a).css("opacity", "0");
              $barPlugin.eq(o).addClass("vw-bar-plugin-scaleDown");
              $barPlugin.eq(a).removeClass("vw-bar-plugin-scaleDown");
              $barPlugin.eq(a).stop().animate({
                opacity: "1"
              }, 500, "easeOutQuad");
            } else {
              $barPlugin.eq(a).removeClass("vw-bar-plugin-scaleDown");
            }
            $barPlugin.eq(a).css({
              "z-index": "99999",
              visibility: "visible"
            }).siblings().css({
              "z-index": "99997"
            });
            $bar.addClass("vw-bar-status-expand");
            $barTab.removeClass("vw-bar-tab-sel");
            e.addClass("vw-bar-tab-sel");
          });
          switch (s) {
            case "Member":
              g();
              break;
            case "Bank":
              h();
              break;
            case "MessageBox":
              getMessageList();
              break;
          }
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
          fgColor: "#b33234",
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
        $(".errormsgBank").text("").hide();
        $(".vw-asset-table").animate({
          "max-height": "30px"
        }, 400, "easeInQuad", function() {
          $(".vw-zz-tit").show();
          $(".vw-zz-cnt .vw-slt").show();
          $(".vw-zz-cnt .vw-frm").show();
          $(".btnTransfer").show();
          $(".dropUp").hide();
          $(".dropDown").show();
          $(".vw-zz").css("height", "260px");
        });
      });
      $(window).resize(m);
      m();
    }
  }
}])
