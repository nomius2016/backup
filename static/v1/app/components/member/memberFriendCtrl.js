angular.module("ciApp").controller("memberFriendCtrl", ["$scope", "$stateParams", "Container", "UtilityService", "appServices", "BonusService", "BRAND_ID", "maskService", "Config", "$filter", function(e, t, a, o, i, n, s, r, c, d) {
  var l = e;
  l.copylink = "http://" + i.getDomainName() + "/C.aspx?ID=" + a.getPromotionID(), l.$on("basicInfoUpdated", function() {
    l.copylink = "http://" + i.getDomainName() + "/C.aspx?ID=" + a.getPromotionID()
  }), l.copyUrlSuccess = function() {
    i.showAlertMsg("popup_alert@title_success", "popup_alert@content_copy_success")
  }, l.friends_bouns = {}, l.invite_bonus = {
    DepositAmount: 0,
    BonusAmount: 0
  }, n.call("Bonus_RefList_Get", {
    intBrandID: s,
    intCurrencyID: a.getCurrencyID(),
    strLanguageCode: e.userLang
  }, function(e) {
    e.Success === !0 && e.Result && e.Result.length > 0 && (l.invite_bonus.DepositAmount = e.Result[0].DepositAmount, l.invite_bonus.BonusAmount = e.Result[0].BonusAmount)
  }), l.pager = {
    pageSize: 5,
    pageCount: 1,
    pageIndex: 0,
    turnPage: function(e) {
      l.pager.pageIndex = e, l.getFriendList()
    }
  }, l.getFriendList = function() {
    o.call("History_Referral_Get", {
      strMainAccountID: a.getUserName(),
      dtStartTime: moment().subtract(1, "year").format("YYYY/MM/DD"),
      dtEndTime: moment().format("YYYY/MM/DD"),
      intPageNumber: l.pager.pageIndex,
      intRecordCounts: l.pager.pageSize,
      strOrderField: "",
      bitDesc: !1
    }).success(function(e, t, a) {
      e.Success && (l.friends_bouns = e.Result.Table), angular.forEach(l.friends_bouns, function(e, t) {
        l.friends_bouns[t].CreateTime = moment(e.CreateTime).subtract().format("YYYY/MM/DD"), l.friends_bouns[t].MainAccountID = r.maskFriendID(e.MainAccountID), e.RealDepositAmount >= l.invite_bonus.DepositAmount ? l.friends_bouns[t].RealDepositAmount = l.invite_bonus.DepositAmount + "/" + l.invite_bonus.DepositAmount : l.friends_bouns[t].RealDepositAmount = l.friends_bouns[t].RealDepositAmount + "/" + l.invite_bonus.DepositAmount
      })
    })
  }, $("#btnFriendsWeChat1").click(function() {
    $("#FriendsshareWeChat1").show()
  }), $(".btnFriendsWeChat_close1").click(function() {
    $("#FriendsshareWeChat1").hide()
  }), e.shareURL = "http://" + i.getDomainName() + "/C.aspx?ID=" + a.getPromotionID(), window.jiathis_config.url = e.shareURL, e.onJiaMouseOver = function(e) {
    var t = e.currentTarget;
    $(t).find("span").eq(1).stop().animate({
      opacity: "1"
    })
  }, e.onJiaMouseLeave = function(e) {
    var t = e.currentTarget;
    $(t).find("span").eq(1).stop().animate({
      opacity: ".5"
    })
  }, l.getFriendList(), "16" == a.getCurrencyID() && $(".sricon").hide(), e.PlaytechActive = c.PlaytechActive, e.shareURL = "http://" + i.getDomainName() + "/C.aspx?ID=" + a.getPromotionID();
  var u = i.getCombinedUrl("image") + "/TemplateFile/AW/sport.jpg";
  window.jiathis_config = {
    url: e.shareURL,
    summary: d("translate")("footer@share_summary"),
    title: " ",
    shortUrl: !1,
    hideMore: !1,
    pic: u
  }, i.loadScript("scripts/jia.js"), e.activeApp = "", e.template = "popDialog2", e.appQRImg = "qrcode.png", e.lang = "";
  var p = a.getCurrencyID(),
    h = "zh-cn";
  switch (p) {
    case 16:
      h = "vi-vn";
      break;
    case 18:
      h = "th-th"
  }
  l.getIcon = function(t) {
    var o = a.getCurrencyID(),
      i = "zh-cn";
    switch (o) {
      case 16:
        i = "vi-vn";
        break;
      case 18:
        i = "th-th"
    }
    return void 0 !== e.SocialConfig[i].colApp[t]
  }, e.clickApp = function(t) {
    var o = a.getCurrencyID(),
      i = "zh-cn";
    switch (o) {
      case 16:
        i = "vi-vn";
        break;
      case 18:
        i = "th-th"
    }
    if (e.lang = i, "link" === e.appType[t]) {
      var n = e.appLink[t] + e.SocialConfig[i].colApp[t];
      window.open(n, t)
    } else "dialog" === e.appType[t] && (e.$emit("setMainMask", {
      showMask: !1
    }), e.activeApp = t, e.appQRImg = e.SocialConfig[i].colApp[t])
  }, e.appLink = {
    Facebook: "https://www.facebook.com/",
    Weibo: "http://www.weibo.com/vwin361",
    "56.com": "http://i.56.com/u/vwincom/videos",
    Tudou: "http://www.tudou.com/home/_121227105/item",
    YouTube: "https://www.youtube.com/channel/UCGe6qpHVIeHDXCaW_1N_0TQ",
    YouTube2: "https://www.youtube.com/channel/UCTe6y73vziLRIF90fBUjeVQ"
  }, e.appType = {
    WeChat: "dialog",
    Weibo: "link",
    "56.com": "link",
    Tudou: "link",
    Line: "dialog",
    YouTube: "link",
    Facebook: "link",
    Zalo: "dialog",
    Viber: "dialog",
    Talk: "text",
    Phone: "text",
    Line2: "dialog",
    YouTube2: "link"
  }, e.dialogMsg = {
    WeChat: {
      head: "footer@share_to_wechat_head",
      content: "footer@share_to_wechat_content"
    },
    Line: {
      head: "footer@share_to_line_head",
      content: "footer@share_to_line_content"
    },
    Zalo: {
      head: "footer@share_to_zalo_head",
      content: "footer@share_to_zalo_content"
    },
    Viber: {
      head: "footer@share_to_viber_head",
      content: "footer@share_to_viber_content"
    },
    Line2: {
      head: "footer@share_to_line_head",
      content: "footer@share_to_line_content"
    }
  }, e.SocialConfig = {
    "zh-tw": {
      colApp: {
        WeChat: "qrcode.png",
        Weibo: "",
        Tudou: "",
        "56.com": ""
      }
    },
    "zh-cn": {
      colApp: {
        WeChat: "qrcode.png",
        Weibo: "",
        Tudou: "",
        "56.com": ""
      }
    },
    "en-us": {
      colApp: {
        WeChat: "qrcode.png",
        Weibo: "",
        Tudou: "",
        "56.com": ""
      }
    },
    "th-th": {
      colApp: {
        Line: "QR_CODE.jpg",
        Facebook: "Vwin365TH",
        YouTube2: ""
      }
    },
    "vi-vn": {
      colApp: {
        WeChat: "qrcode.png",
        Zalo: "zalo-vn.jpg",
        Facebook: "vwinthethao",
        Viber: "viber-vn.jpg",
        Line2: "line-vn.jpg",
        YouTube: ""
      }
    }
  }, e.closeDlg = function() {
    e.$emit("setMainMask", {
      showMask: !1
    }), e.activeApp = ""
  }
}]);
