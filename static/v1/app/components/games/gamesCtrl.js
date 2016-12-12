angular.module('ciApp').controller('games', ["$filter", "$http", "$q", "$scope", "$timeout", "$window", "appServices", "Container", "GameService", "Config", function(e, t, o, a, n, s, i, r, c, l) {
  function u(e, t) {
    if (null === e) return e;
    var o = encodeURIComponent(e).match(/%[89ABab]/g);
    return o = null === o ? e : o, o.length > t ? e.substring(0, t) + "..." : e
  }

  function p(e) {
    for (var t = i.getCombinedUrl("image"), o = 0; o < e.length; o++) e[o].ImgUrl = e[o].ImgUrl.replace("http://image.vwin.com", t);
    return e
  }

  function m(e) {
    0 == $("body").find("." + e).length && $("body").append("<div class='clsarea " + e + "' style='z-index: 11;'></div>")
  }

  function g(e) {
    $("body").find("." + e).length > 0 && $("." + e).remove()
  }

  function d() {
    _ -= 22, $(".slot-bar").css("background-position", _ + "px 0px");
    var e = setTimeout(d, 16);
    _ <= -352 && (_ = 0, clearTimeout(e))
  }

  function f(e) {
    e ? ($(".game-block").css("opacity", "0.0"), $(".games-mask").css({
      width: "100%",
      height: "100%",
      top: 40,
      position: "fixed",
      "background-color": "rgba(0,0,0,0.8)"
    }).show(), i.showLoadingIcon(!0)) : (i.showLoadingIcon(!1), $(".games-mask").hide(), $(".game-block").fadeTo(800, 1))
  }

  function h(e) {
    e ? $(".game-list-container").css("opacity", "0.0") : $(".game-list-container").fadeTo(800, 1)
  }
  var y = 36;
  if (a.PlaytechActive = l.PlaytechActive, a.recommendGameList = [], a.gameCategories = [], a.gameList = [], a.jackpotList = [], a.winnerList = [], a.topTenList = [], a.platforms = [], a.userLang = r.getLang() || "zh-cn", a.currencyID = r.getCurrencyID(), a.currencyID === -1) switch (r.getLang()) {
    case "vi-vn":
      a.currencyID = 16;
      break;
    case "th-th":
      a.currencyID = 18;
      break;
    default:
      a.currencyID = 2
  }
  a.totalPage = 0, a.selectedPlatform = {}, a.selectedCategory = {}, a.isLoggedIn = r.getAuthStatus(), a.accountId = a.isLoggedIn ? r.getUserName() : "", a.gamesPerRow = s.innerWidth >= 1200 ? 4 : 3, angular.element(s).bind("resize", function() {
    a.gamesPerRow = s.innerWidth >= 1200 ? 4 : 3
  }), a.init = function() {
    c.call("GetPromotions", {
      intGamePromotion: -2,
      intGameCategoryID: 0,
      strLanguageCode: a.userLang,
      strPlatformCode: "-1",
      intPageNumber: 0,
      intRecordCounts: y,
      strOrderField: "",
      bitDesc: !1
    }).success(function(e) {
      if (e.Success) {
        var t = e.Result.Table.slice(0, 4);
        a.recommendGameList = p(t)
      }
    }), c.call("GetJackpots", {
      intCurrencyID: a.currencyID,
      strLanguageCode: a.userLang,
      strPlatformCode: "-1",
      intFrom: 0,
      intTo: 100
    }).success(function(e) {
      e.Success && (a.jackpotList = p(e.Result))
    }), t.get("app/components/games/Winner.json").then(function(e) {
      a.winnerList = e.data.Winner[a.userLang];
      for (var t = 0; t < a.winnerList.length; t++) a.winnerList[t].account = u(a.winnerList[t].account, 14), a.winnerList[t].name = u(a.winnerList[t].name, 14)
    }), c.call("GetPromotions", {
      intGamePromotion: -1,
      intGameCategoryID: 0,
      strLanguageCode: a.userLang,
      intCurrencyID: a.currencyID,
      strPlatformCode: "-1",
      intPageNumber: 0,
      intRecordCounts: y,
      strOrderField: "",
      bitDesc: !1
    }).success(function(e) {
      e.Success && (a.topTenList = [], t.get("Features/games/Top10Games.json").then(function(t) {
        for (var o = 0; o < 5; o++)
          if (e.Result.Table[o]) {
            var n = i.getCombinedUrl("image"),
              s = e.Result.Table[o].ImgUrl.replace("http://image.vwin.com", n),
              r = {
                RowNumber: e.Result.Table[o].RowNumber,
                GameName: e.Result.Table[o].GameName,
                GameCode: e.Result.Table[o].GameCode,
                GameCategoryID: e.Result.Table[o].GameCategoryID,
                PlatformCode: e.Result.Table[o].PlatformCode,
                ImgUrl: s,
                GameSubname: t.data[e.Result.Table[o].GameCode][a.userLang] ? t.data[e.Result.Table[o].GameCode][a.userLang].name : "",
                GameDescription: t.data[e.Result.Table[o].GameCode][a.userLang] ? t.data[e.Result.Table[o].GameCode][a.userLang].des : ""
              };
            a.topTenList.push(r)
          }
      }))
    }), f(!0);
    var n = [c.call("GetPlatforms", {
      intBrandID: 2,
      strLanguageCode: a.userLang
    }), c.call("GetCategories", {
      strPlatformCode: "-1",
      strLanguageCode: a.userLang,
      intCurrencyID: a.currencyID,
      strWebsiteMode: "1"
    }), c.call("GetGames", {
      intGameCategoryID: 0,
      strLanguageCode: a.userLang,
      intCurrencyID: a.currencyID,
      strPlatformCode: -1,
      strWebsiteMode: "",
      intPageNumber: 0,
      intRecordCounts: y,
      strOrderField: "",
      intDesc: 0
    })];
    o.all(n).then(function(t) {
      var o = t[0],
        n = t[1],
        s = t[2];
      if (o.data.Success) {
        a.platforms = [{
          PlatformGroup: "-1",
          PlatformCode: "-1",
          PlatformName: e("translate")("games@all_games"),
          ShortName: e("translate")("games@all_games"),
          Priority: -1
        }];
        for (var i in o.data.Result) "1" === o.data.Result[i].GameService && o.data.Result[i].Priority <= 70 && a.platforms.push(o.data.Result[i]);
        a.platforms.sort(function(e, t) {
          return e.Priority > t.Priority ? 1 : t.Priority > e.Priority ? -1 : 0
        }), a.selectedPlatform = a.platforms[0]
      }
      if (n.data.Success && (a.gameCategories = n.data.Result.Table, a.selectedCategory = a.gameCategories[0]), s.data.Success) {
        a.gameList = p(s.data.Result.Table);
        for (var i = 0; i < a.gameList.length; i++) a.gameList[i].GameName = u(a.gameList[i].GameName, 24);
        var r = s.data.Result.Table1[0] ? parseInt(s.data.Result.Table1[0].TotalCount, 10) : 0;
        a.totalPage = r > 0 ? Math.floor((r - 1) / y) + 1 : 0, a.selectedPage = 0;
        for (var i = 0; i < a.gameCategories.length; i++) a.gameCategories[i] === a.selectedCategory && (a.selectedCategory.GameCategoryCount = r, a.gameCategories[i] = a.selectedCategory)
      }
      f(!1)
    })
  }, a.init(), a.getGameCategoryIcon = function(e) {
    for (var t = "" + (e + 1); t.length < 2;) t = "0" + t;
    return "game-icon game-icon-" + t
  }, a.onGameCategoryClicked = function(e) {
    a.selectedPage = 0, a.selectedCategory = e, h(!0), c.call("GetGames", {
      intGameCategoryID: a.selectedCategory.GameCategoryID,
      strLanguageCode: a.userLang,
      intCurrencyID: a.currencyID,
      strPlatformCode: a.selectedPlatform.PlatformGroup,
      strWebsiteMode: "",
      intPageNumber: 0,
      intRecordCounts: y,
      strOrderField: "",
      intDesc: 0
    }).success(function(e, t, o) {
      if (e.Success) {
        a.gameList = p(e.Result.Table);
        for (var n = 0; n < a.gameList.length; n++) a.gameList[n].GameName = u(a.gameList[n].GameName, 24);
        var s = e.Result.Table1[0] ? parseInt(e.Result.Table1[0].TotalCount, 10) : 0;
        a.totalPage = s > 0 ? Math.floor((s - 1) / y) + 1 : 0;
        for (var n = 0; n < a.gameCategories.length; n++) a.gameCategories[n] === a.selectedCategory && (a.selectedCategory.GameCategoryCount = s, a.gameCategories[n] = a.selectedCategory)
      }
      h(!1)
    })
  }, a.onPlatformSelected = function(e) {
    e != a.selectedPlatform && (a.selectedPage = 0, a.selectedPlatform = e, updateGameList()), $(".game-platform span").eq(0).text(e.platformName), $(".game-platform ul").slideUp()
  }, a.onPageClicked = function(e) {
    a.selectedPage = e, v(), $(window).scrollTop($(".game-list-menu").offset().top)
  }, a.onNextPage = function() {
    a.selectedPage++, v(), $(window).scrollTop($(".game-list-menu").offset().top)
  }, a.onPrevPage = function() {
    a.selectedPage--, v(), $(window).scrollTop($(".game-list-menu").offset().top)
  }, a.onPlayBtnClicked = function(e, t, o, n) {
    a.isLoggedIn || "0" !== e ? window.open("#/games/playground?gameCode=" + t + "&gameCategoryID=" + o + "&platformCode=" + n + "&accountID=" + a.accountId + "&gameMode=" + e, "Playground") : i.needLogin()
  }, a.onDownloadGame = function(e) {
    var t;
    switch (e) {
      case "Playtech":
        t = "/Download/setup.exe";
        break;
      case "GamesOS":
        t = "/Download/CasinoInstall.exe"
    }
    s.location.href = t
  };
  var C = function() {
      var e = !1;
      for (var t in a.gameCategories)
        if (a.gameCategories[t].GameCategoryID === a.selectedCategory.GameCategoryID) {
          e = !0, a.selectedCategory = a.gameCategories[t];
          break
        }
      e || (a.selectedCategory = a.gameCategories[0])
    },
    v = function() {
      c.call("GetGames", {
        intGameCategoryID: a.selectedCategory.GameCategoryID,
        strLanguageCode: a.userLang,
        intCurrencyID: a.currencyID,
        strPlatformCode: a.selectedPlatform.PlatformGroup,
        strWebsiteMode: "",
        intPageNumber: a.selectedPage,
        intRecordCounts: y,
        strOrderField: "",
        intDesc: 0
      }).success(function(e, t, o) {
        if (e.Success) {
          a.gameList = p(e.Result.Table);
          for (var n = 0; n < a.gameList.length; n++) a.gameList[n].GameName = u(a.gameList[n].GameName, 24);
          var s = e.Result.Table1[0] ? parseInt(e.Result.Table1[0].TotalCount, 10) : 0;
          a.totalPage = s > 0 ? Math.floor((s - 1) / y) + 1 : 0;
          for (var n = 0; n < a.gameCategories.length; n++) a.gameCategories[n] === a.selectedCategory && (a.selectedCategory.GameCategoryCount = s, a.gameCategories[n] = a.selectedCategory)
        }
      })
    };
  var updateGameList = function() {
    h(!0), c.call("GetCategories", {
      strPlatformCode: a.selectedPlatform.PlatformGroup,
      strLanguageCode: a.userLang,
      intCurrencyID: a.currencyID,
      strWebsiteMode: "1"
    }).success(function(e, t, o) {
      e.Success && (a.gameCategories = e.Result.Table, C(), v()), h(!1)
    })
  };
  var w, b = !1,
    P = o.defer();
  a.searchString = "", a.searchGames = function() {
    w && n.cancel(w), w = n(function() {
      b && P.resolve(), b = !0;
      var e = {};
      e.token = "81602125-9f39-42f2-8800-e86f8599d11f", e.inputdata = {
        strQueryString: a.searchString
      }, t({
        url: "http://10.10.102.112/SP/en-us/tmp_SearchGames",
        method: "post",
        data: $.param(e),
        timeout: P.promise
      }).success(function(e, t, o) {
        b = !1
      })
    }, 1e3)
  }, a.onMenuMouseEnter = function(e, t) {
    var o = e.currentTarget;
    $(o).hasClass("active") || ($(o).children("p").html(t.GameCategoryCount.toString()), $(o).children("p").counterUp({
      delay: 10,
      time: 200
    }))
  }, a.onMenuMouseLeave = function(e, t) {
    var o = e.currentTarget;
    $(o).hasClass("active") || $(o).children("p").html(t.GameCategoryCount.toString())
  }, a.onPlatformMenuClicked = function() {
    $(".game-platform ul").is(":visible") ? ($(".game-platform ul").slideUp(), g("game-platformMask")) : ($(".game-platform ul").slideDown(), m("game-platformMask"), $(".game-platformMask").css("z-index", 1))
  }, $(document).on("click", ".game-platformMask", function() {
    $(".game-platform ul").slideUp(), g("game-platformMask")
  }), a.addPlayButtonEffects = function() {
    $("#gameList li").mouseenter(function(e) {
      var t = $(".game-img-black", this),
        o = $(".game-btn-play", this),
        a = $(".game-btn-try", this);
      $(t).stop().animate({
        opacity: 1
      }, "fast"), $(o).parent().children().hasClass("game-btn-try") ? $(o).stop().show().delay(100).animate({
        top: "15px",
        opacity: 1
      }, "fast") : $(o).stop().show().delay(100).animate({
        top: "25px",
        opacity: 1
      }, "fast"), $(a).stop().delay(100).animate({
        top: "132px",
        opacity: 1
      }, "fast")
    }).mouseleave(function(e) {
      $(".game-img-black", this).stop().animate({
        opacity: 0
      }), $(".game-btn-play", this).stop().animate({
        top: "30px",
        opacity: "0"
      }, "fast", function() {
        $(this).hide()
      }), $(".game-btn-try", this).stop().animate({
        top: "108px",
        opacity: "0"
      }, "fast")
    })
  };
  var S = {},
    D = -1,
    I = 0;
  a.jackpotsAnimation = function() {
    I = a.jackpotList.length, d(), D + 1 >= I && (D = -1), $(".jackpots-goods li").eq(D).show().animate({
      top: "92px"
    }, 800, "easeOutElastic"), $(".jackpots-money li").eq(D).hide(), $(".jackpots-goods li").eq(D + 1).show().css("top", "-92px").animate({
      top: "0px"
    }, 800, "easeOutElastic"), $(".jackpots-money li").eq(D + 1).find("span").html(e("number")(a.jackpotList[D + 1].amount, 2)), $(".jackpots-money li").eq(D + 1).show().find("span").counterUp({
      delay: 10,
      time: 500
    }), D++, n.cancel(S), S = n(a.jackpotsAnimation, 5e3)
  };
  var _ = 0,
    k = {},
    L = 0,
    A = a.winnerList.length;
  a.winnersAnimation = function() {
    var n1 = L;
    var n2 = L + 1;
    var n3 = L + 2;
    var n4 = L + 3;
    L >= A ? (L = 0, n1 = L, n2 = L + 1, n3 = L + 2, n4 = L + 3) : L + 1 >= A ? (n2 = 0, n3 = 1, n4 = 2) : L + 2 >= A ? (n3 = 0, n4 = 1) : L + 3 >= A && (n4 = 0), $(".winners-list").children("li").hide(), $(".winners-list").children("li").eq(n1).show().css("top", "124px"), $(".winners-list").children("li").eq(n2).show().css("top", "62px"), $(".winners-list").children("li").eq(n3).show().css("top", "0"), $(".winners-list").children("li").eq(n4).show().css("top", "-62px"), $(".winners-list").children("li").eq(n2).delay(100).animate({
      top: "124px"
    }, 500, "easeOutBounce", function() {
      $(".winners-list").children("li").eq(n1).hide()
    }), $(".winners-list").children("li").eq(n3).delay(200).animate({
      top: "62px"
    }, 500, "easeOutBounce"), $(".winners-list").children("li").eq(n4).delay(300).animate({
      top: "0px"
    }, 500, "easeOutBounce"), L++, n.cancel(k), k = n(a.winnersAnimation, 5e3)
  }, a.addTopFiveButtonEffects = function() {
    $("#rankingList li").mouseenter(function() {
      $(".goods-intro", this).fadeIn(200);
      var e = $(".game-img-black", this),
        t = $(".game-btn-play", this),
        o = $(".game-btn-try", this);
      $(e).stop().animate({
        opacity: 1
      }, "fast"), $(t).parent().children().hasClass("game-btn-try") ? $(t).stop().show().delay(100).animate({
        top: "15px",
        opacity: 1
      }, "fast") : $(t).stop().show().delay(100).animate({
        top: "25px",
        opacity: 1
      }, "fast"), $(o).stop().delay(100).animate({
        top: "132px",
        opacity: 1
      }, "fast")
    }).mouseleave(function() {
      $(".game-img-black", this).stop().animate({
        opacity: 0
      }), $(".game-btn-play", this).stop().animate({
        top: "30px",
        opacity: "0"
      }, "fast", function() {
        $(this).hide()
      }), $(".game-btn-try", this).stop().animate({
        top: "108px",
        opacity: "0"
      }, "fast"), $(".goods-intro", this).fadeOut(200)
    })
  }, a.$on("$destroy", function(e) {
    n.cancel(S), n.cancel(k)
  }), a.customizeGameHero = function() {
    var e = {
        "background-image": "url(styles/images/game-hero-sugarpop.jpg)",
        "background-color": "#60295f"
      },
      t = {
        "background-image": "url(styles/images/game-hero-sugarpop_en.jpg)",
        "background-color": "#60295f"
      },
      o = {
        "background-image": "url(styles/images/game-hero-sugarpop_thai.jpg)",
        "background-color": "#60295f"
      };
    return 2 === a.currencyID ? "en-us" === a.userLang ? t : e : 18 === a.currencyID ? "en-us" === a.userLang ? t : o : void 0
  }, a.onBetsoftBetButton = function() {
    a.isLoggedIn ? window.open("#/games/playground?gameCode=402&gameCategoryID=3&platformCode=40005&accountID=" + a.accountId + "&gameMode=0", "Playground") : window.open("#/games/playground?gameCode=402&gameCategoryID=3&platformCode=40005&accountID=&gameMode=1", "Playground")
  }
}]);
