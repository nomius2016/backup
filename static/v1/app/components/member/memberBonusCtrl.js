angular.module("ciApp").controller("memberBonusCtrl", ["$filter", "$scope", "$state", "$stateParams", "AccountService", "appServices", "BonusService", "Container", function(e, t, a, o, i, n, s, r) {
  var c = ["ApplyBonusZeroBase", "ApplyVerifyBonus", "ApplyDepositBonus", "ApplyTransferBonus", "ApplyTurnoverBonus", "ApplyVIPBonus", "ApplySpecialBonus", "ApplyReferralBonus"],
    d = ["ClaimBonusZeroBase", "ClaimVerifyBonus", "ClaimDepositBonus", "ClaimTransferBonus", "ClaimTurnoverBonus", "ClaimVIPBonus", "ClaimSpecialBonus", "ClaimReferralBonus"],
    l = t;
  l.method = o.method, l.data = {
    bonusCategories: [{
      BonusCategoryID: -1,
      Name: e("translate")("member_bonus@all")
    }],
    bonusList: [],
    filteredBonusList: []
  };
  var u = function() {
    var e = new Date,
      t = e.getDate(),
      a = e.getMonth() + 1,
      o = e.getFullYear();
    return t < 10 && (t = "0" + t), a < 10 && (a = "0" + a), o + "/" + a + "/" + t
  };
  l.init = function() {
    i.call("MainAccount_VIPInfo_Get", {
      intCurrencyID: 3
    }, function(e) {
      if (e.Result.length > 0) {
        var t = e.Result[0].NextLevelTypeID;
        l.data.vipImageSrc = "../../Styles/images/vip" + (t - 3) + ".png", i.call("MainAccount_VIPBonus_Setting_Get", {
          intLevelTypeID: t - 1
        }, function(e) {
          e.Result.length > 0 && (l.data.vipName = e.Result[0].VIPName)
        })
      }
    }), s.call("GetCategories", {
      intBrandID: 2,
      intApplyType: "applicable" === l.method ? 1 : -1,
      strLanguageCode: r.getLang()
    }).success(function(e) {
      e.Success && l.data.bonusCategories.push.apply(l.data.bonusCategories, e.Result)
    });
    var e = -1,
      t = 1;
    "applied" === l.method ? (e = -1, t = 1) : "applicable" === l.method ? (e = 1, t = 8) : "history" === l.method && (e = -1, t = 6), s.call("GetBonusList", {
      intBrandID: 2,
      dtStartDate: "1900/01/01",
      dtEndDate: u(),
      intBonusCategoryID: -1,
      intApplyType: e,
      strMainAccountID: r.getUserName(),
      intReceiveStatus: t,
      strLanguageCode: r.getLang(),
      intPageNumber: 0,
      intRecordCounts: 100,
      strOrderField: "",
      bitDesc: !1
    }).success(function(e) {
      if (e.Success) {
        l.data.bonusList = e.Result.Table;
        var t = r.getCurrencyID();
        t === -1 && (t = 2), l.data.bonusList.length > 0 && ("applied" === l.method || "applicable" === l.method) ? s.call("GetVerifyStatus", {
          intBrandID: 2,
          strMainAccountID: r.getUserName(),
          intCurrencyID: t
        }).success(function(e) {
          if (e.Success) {
            for (var t = e.Result, a = 0; a < l.data.bonusList.length; a++)
              if (5 !== l.data.bonusList[a].BonusCategoryID && 7 !== l.data.bonusList[a].BonusCategoryID)
                for (var o = 0; o < t.length; o++)("applied" === l.method && l.data.bonusList[a].TransactionNumber === t[o].TransactionNumber || "applicable" === l.method && l.data.bonusList[a].BonusCategoryID === t[o].BonusCategoryID) && (l.data.bonusList[a].verifiedName = t[o].IDVerified, l.data.bonusList[a].verifiedEmail = t[o].EmailVerified, l.data.bonusList[a].verifiedPhone = t[o].CellPhoneVerified, l.data.bonusList[a].verifiedDeposit = t[o].SuccessDeposit, l.data.bonusList[a].verifiedWithdrawal = t[o].SuccessWithdrawal, l.data.bonusList[a].verifiedAllPass = !(t[o].IDVerified !== -1 && 1 !== t[o].IDVerified || t[o].EmailVerified !== -1 && 1 !== t[o].EmailVerified || t[o].CellPhoneVerified !== -1 && 1 !== t[o].CellPhoneVerified || t[o].SuccessDeposit !== -1 && 1 !== t[o].SuccessDeposit || t[o].SuccessWithdrawal !== -1 && 1 !== t[o].SuccessWithdrawal));
              else l.data.bonusList[a].verifiedAllPass = !0;
            l.data.filteredBonusList = l.data.bonusList
          } else l.data.filteredBonusList = l.data.bonusList
        }) : l.data.filteredBonusList = l.data.bonusList
      }
    })
  }, l.init(), l.form = {
    bonusCategory: l.data.bonusCategories[0]
  }, l.showPopup = function(e) {
    l.selectItem = e, l.historyShown = !0
  }, l.updateBonusList = function() {
    var e = l.form.bonusCategory.BonusCategoryID;
    if (e === -1) l.data.filteredBonusList = l.data.bonusList;
    else {
      l.data.filteredBonusList = [];
      for (var t in l.data.bonusList) l.data.bonusList[t].BonusCategoryID === e && l.data.filteredBonusList.push(l.data.bonusList[t])
    }
  };
  var p = !1;
  l.applyBonus = function(e) {
    p || (p = !0, s.call(c[e.BonusCategoryID], {
      intBrandID: 2,
      strMainAccountID: r.getUserName(),
      intBonusCategoryTypeID: e.BonusCategoryTypeID,
      strIPAddress: r.getIPAddress(),
      strDevice: r.getDevice()
    }).success(function(e) {
      e.Success ? (n.showAlertMsg("popup_alert@title_message", "popup_alert@title_success"), l.init(), n.updateBonus()) : (l.resultTitle = "", l.resultContent = e.Message, l.resultShown = !0), p = !1
    }).error(function(e, t) {
      l.resultTitle = "", l.resultContent = e, l.resultShown = !0, p = !1
    }))
  };
  var h = !1;
  l.claimBonus = function(e) {
    h || (h = !0, s.call(d[e.BonusCategoryID], {
      intBrandID: 2,
      strTransactionNumber: e.TransactionNumber,
      strMainAccountID: r.getUserName(),
      strIPAddress: r.getIPAddress()
    }).success(function(e) {
      e.Success ? (n.showAlertMsg("popup_alert@title_message", "popup_alert@title_success"), l.init(), n.updateBonus()) : (l.resultTitle = "", l.resultContent = e.Message, l.resultShown = !0), h = !1
    }).error(function(e, t) {
      l.resultTitle = "", l.resultContent = e, l.resultShown = !0, h = !1
    }))
  }, l.playGame = function(e) {
    switch (l.historyShown && (l.historyShown = !1, n.forceClosePopupDialog()), e.PlatformCode) {
      case "20001":
        a.go("casino", {
          kv: 2
        });
        break;
      case "20002":
        a.go("casino", {
          kv: 1
        });
        break;
      case "20004":
        a.go("casino", {
          kv: 6
        });
        break;
      case "20006":
        a.go("casino", {
          kv: 3
        });
        break;
      case "20007":
        a.go("casino", {
          kv: 5
        });
        break;
      case "20008":
        a.go("casino", {
          kv: 7
        });
        break;
      case "20009":
        a.go("casino", {
          kv: 8
        });
        break;
      case "30001":
        a.go("sports");
        break;
      case "40002":
      case "40003":
        a.go("games");
        break;
      case "60001":
        a.go("keno");
        break;
      case "61001":
        a.go("lotto");
        break;
      default:
        a.go("casino")
    }
  }
}]);
