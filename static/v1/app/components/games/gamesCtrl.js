angular.module('ciApp').controller('games', ["$filter", "$http", "$q", "$scope", "$timeout", "$window", "appServices", "Container", "GameService", "Config", function(e, $http, o, a, n, s, i, r, c, l) {
  function u(e, t) {
    if (null === e) return e;
    var o = encodeURIComponent(e).match(/%[89ABab]/g);
    return o = null === o ? e : o, o.length > t ? e.substring(0, t) + "..." : e
  }

  function p(e) {
    for (var t = i.getCombinedUrl("image"), o = 0; o < e.length; o++) {
      // e[o].ImgUrl = e[o].ImgUrl.replace("http://image.vwin.com", t);
      e[o].ImgUrl = e[o].ImgUrl;
    }
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
  a.totalPage = 0;
  a.selectedPlatform = {};
  a.selectedCategory = {};
  a.isLoggedIn = r.getAuthStatus();
  a.accountId = a.isLoggedIn ? r.getUserName() : "";
  a.gamesPerRow = s.innerWidth >= 1200 ? 4 : 3;
  angular.element(s).bind("resize", function() {
    a.gamesPerRow = s.innerWidth >= 1200 ? 4 : 3;
  });
  a.init = function() {
    // c.call("GetPromotions", {
    //   intGamePromotion: -2,
    //   intGameCategoryID: 0,
    //   strLanguageCode: a.userLang,
    //   strPlatformCode: "-1",
    //   intPageNumber: 0,
    //   intRecordCounts: y,
    //   strOrderField: "",
    //   bitDesc: !1
    // }).success(function(e) {
    //   if (e.Success) {
    //     var t = e.Result.Table.slice(0, 4);
    //     a.recommendGameList = p(t)
    //   }
    // });
    var res1 = {
      "Success": true,
      "Code": "1.0",
      "Message": "成功",
      "Result": {
        "Table": [{
          "RowNumber": 1,
          "AwardRate": null,
          "GameID": 1202,
          "GameCode": "402",
          "GameName": "弹弹糖",
          "PlatformCode": "40005",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/BetSoft/402.jpg",
          "Priority": 1,
          "Experience": true
        }, {
          "RowNumber": 2,
          "AwardRate": null,
          "GameID": 1061,
          "GameCode": "5049",
          "GameName": "玉蒲团",
          "PlatformCode": "20009",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/BBIN/5049.jpg",
          "Priority": 2,
          "Experience": false
        }, {
          "RowNumber": 3,
          "AwardRate": null,
          "GameID": 615,
          "GameCode": "grel",
          "GameName": "黄金反弹",
          "PlatformCode": "40003",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/grel.jpg",
          "Priority": 3,
          "Experience": false
        }, {
          "RowNumber": 4,
          "AwardRate": null,
          "GameID": 1023,
          "GameCode": "xc_doublebonusslots",
          "GameName": "双重奖励老虎机",
          "PlatformCode": "40002",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/GamesOS/xc_doublebonusslots.jpg",
          "Priority": 4,
          "Experience": true
        }, {
          "RowNumber": 5,
          "AwardRate": null,
          "GameID": 596,
          "GameCode": "fnf",
          "GameName": "神奇四侠",
          "PlatformCode": "40003",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/fnf.jpg",
          "Priority": 5,
          "Experience": true
        }, {
          "RowNumber": 6,
          "AwardRate": null,
          "GameID": 1020,
          "GameCode": "fcgz",
          "GameName": "翡翠公主",
          "PlatformCode": "40003",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/fcgz.jpg",
          "Priority": 6,
          "Experience": false
        }],
        "Table1": [{
          "TotalCount": "6"
        }]
      }
    };
    if (res1.Success) {
      var t = res1.Result.Table.slice(0, 4);
      a.recommendGameList = p(t)
    }
    // c.call("GetJackpots", {
    //   intCurrencyID: a.currencyID,
    //   strLanguageCode: a.userLang,
    //   strPlatformCode: "-1",
    //   intFrom: 0,
    //   intTo: 100
    // }).success(function(e) {
    //   e.Success && (a.jackpotList = p(e.Result))
    // });
    var res2 = {
      "Success": true,
      "Code": "1.0",
      "Message": "成功",
      "Result": [{
        "Rank": 1,
        "GameCode": "bl",
        "GameName": "海滨嘉年华",
        "GameCategoryID": 3,
        "PlatformCode": "40003",
        "CurrencyCode": "CNY",
        "Symbol": "￥",
        "amount": 2859336.3600,
        "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/bl.jpg"
      }, {
        "Rank": 2,
        "GameCode": "grel",
        "GameName": "黄金反弹",
        "GameCategoryID": 3,
        "PlatformCode": "40003",
        "CurrencyCode": "CNY",
        "Symbol": "￥",
        "amount": 1701235.1000,
        "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/grel.jpg"
      }, {
        "Rank": 3,
        "GameCode": "pbj",
        "GameName": "乐透21点",
        "GameCategoryID": 2,
        "PlatformCode": "40003",
        "CurrencyCode": "CNY",
        "Symbol": "￥",
        "amount": 803507.7800,
        "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/pbj.jpg"
      }, {
        "Rank": 4,
        "GameCode": "gesjp",
        "GameName": "艺伎故事积宝游戏",
        "GameCategoryID": 3,
        "PlatformCode": "40003",
        "CurrencyCode": "CNY",
        "Symbol": "￥",
        "amount": 419370.1700,
        "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/gesjp.jpg"
      }, {
        "Rank": 5,
        "GameCode": "sisjp",
        "GameName": "忍者风云积宝游戏",
        "GameCategoryID": 3,
        "PlatformCode": "40003",
        "CurrencyCode": "CNY",
        "Symbol": "￥",
        "amount": 419370.1700,
        "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/sisjp.jpg"
      }, {
        "Rank": 6,
        "GameCode": "wlgjp",
        "GameName": "舞龙积宝游戏",
        "GameCategoryID": 3,
        "PlatformCode": "40003",
        "CurrencyCode": "CNY",
        "Symbol": "￥",
        "amount": 419370.1700,
        "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/wlgjp.jpg"
      }, {
        "Rank": 7,
        "GameCode": "cifr",
        "GameName": "全景电影",
        "GameCategoryID": 3,
        "PlatformCode": "40003",
        "CurrencyCode": "CNY",
        "Symbol": "￥",
        "amount": 321035.4200,
        "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/cifr.jpg"
      }, {
        "Rank": 8,
        "GameCode": "bls",
        "GameName": "魔法彩金球",
        "GameCategoryID": 6,
        "PlatformCode": "40003",
        "CurrencyCode": "CNY",
        "Symbol": "￥",
        "amount": 287279.3700,
        "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/bls.jpg"
      }, {
        "Rank": 9,
        "GameCode": "jb10p",
        "GameName": "十线对 J 高手",
        "GameCategoryID": 1,
        "PlatformCode": "40003",
        "CurrencyCode": "CNY",
        "Symbol": "￥",
        "amount": 38663.5900,
        "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/jb10p.jpg"
      }]
    };
    if (res2.Success) {
      a.jackpotList = p(res2.Result)
    }
    $http.get("/static/v1/app/components/games/Winner.json").then(function(e) {
      a.winnerList = e.data.Winner[a.userLang];
      for (var t = 0; t < a.winnerList.length; t++) a.winnerList[t].account = u(a.winnerList[t].account, 14), a.winnerList[t].name = u(a.winnerList[t].name, 14)
    });
    // c.call("GetPromotions", {
    //   intGamePromotion: -1,
    //   intGameCategoryID: 0,
    //   strLanguageCode: a.userLang,
    //   intCurrencyID: a.currencyID,
    //   strPlatformCode: "-1",
    //   intPageNumber: 0,
    //   intRecordCounts: y,
    //   strOrderField: "",
    //   bitDesc: !1
    // }).success(function(e) {
    //   e.Success && (a.topTenList = [], t.get("Features/games/Top10Games.json").then(function(t) {
    //     for (var o = 0; o < 5; o++)
    //       if (e.Result.Table[o]) {
    //         var n = i.getCombinedUrl("image"),
    //           s = e.Result.Table[o].ImgUrl.replace("http://image.vwin.com", n),
    //           r = {
    //             RowNumber: e.Result.Table[o].RowNumber,
    //             GameName: e.Result.Table[o].GameName,
    //             GameCode: e.Result.Table[o].GameCode,
    //             GameCategoryID: e.Result.Table[o].GameCategoryID,
    //             PlatformCode: e.Result.Table[o].PlatformCode,
    //             ImgUrl: s,
    //             GameSubname: t.data[e.Result.Table[o].GameCode][a.userLang] ? t.data[e.Result.Table[o].GameCode][a.userLang].name : "",
    //             GameDescription: t.data[e.Result.Table[o].GameCode][a.userLang] ? t.data[e.Result.Table[o].GameCode][a.userLang].des : ""
    //           };
    //         a.topTenList.push(r)
    //       }
    //   }))
    // });
    var res3 = {
      "Success": true,
      "Code": "1.0",
      "Message": "成功",
      "Result": {
        "Table": [{
          "RowNumber": 1,
          "AwardRate": null,
          "GameID": 804,
          "GameCode": "irmn3",
          "GameName": "钢铁侠3",
          "PlatformCode": "40003",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/irmn3.jpg",
          "Priority": 1,
          "Experience": true
        }, {
          "RowNumber": 2,
          "AwardRate": null,
          "GameID": 935,
          "GameCode": "xc_atlantisdiveslots",
          "GameName": "亚特兰蒂斯潜水",
          "PlatformCode": "40002",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/GamesOS/xc_atlantisdiveslots.jpg",
          "Priority": 2,
          "Experience": true
        }, {
          "RowNumber": 3,
          "AwardRate": null,
          "GameID": 882,
          "GameCode": "xc_teddyscratch",
          "GameName": "泰迪刮刮乐",
          "PlatformCode": "40002",
          "GameCategoryID": 4,
          "GameCategoryName": "刮刮卡",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/GamesOS/xc_teddyscratch.jpg",
          "Priority": 3,
          "Experience": true
        }, {
          "RowNumber": 4,
          "AwardRate": null,
          "GameID": 801,
          "GameCode": "avng",
          "GameName": "复仇者联盟",
          "PlatformCode": "40003",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/avng.jpg",
          "Priority": 4,
          "Experience": true
        }, {
          "RowNumber": 5,
          "AwardRate": null,
          "GameID": 803,
          "GameCode": "spidc",
          "GameName": "蜘蛛侠",
          "PlatformCode": "40003",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/spidc.jpg",
          "Priority": 5,
          "Experience": true
        }, {
          "RowNumber": 6,
          "AwardRate": null,
          "GameID": 1020,
          "GameCode": "fcgz",
          "GameName": "翡翠公主",
          "PlatformCode": "40003",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/fcgz.jpg",
          "Priority": 6,
          "Experience": false
        }],
        "Table1": [{
          "TotalCount": "6"
        }]
      }
    };
    if (res3.Success) {
      a.topTenList = [];
      $http.get("/static/v1/app/components/games/Top10Games.json").then(function(t) {
        for (var o = 0; o < 5; o++) {
          if (res3.Result.Table[o]) {
            // var n = i.getCombinedUrl("image"),
              // s = res3.Result.Table[o].ImgUrl.replace("http://image.vwin.com", n),
            var s = res3.Result.Table[o].ImgUrl,
              r = {
                RowNumber: res3.Result.Table[o].RowNumber,
                GameName: res3.Result.Table[o].GameName,
                GameCode: res3.Result.Table[o].GameCode,
                GameCategoryID: res3.Result.Table[o].GameCategoryID,
                PlatformCode: res3.Result.Table[o].PlatformCode,
                ImgUrl: s,
                GameSubname: t.data[res3.Result.Table[o].GameCode][a.userLang] ? t.data[res3.Result.Table[o].GameCode][a.userLang].name : "",
                GameDescription: t.data[res3.Result.Table[o].GameCode][a.userLang] ? t.data[res3.Result.Table[o].GameCode][a.userLang].des : ""
              };
            a.topTenList.push(r)
          }
        }
      });
    }
    f(!0);
    // var n = [c.call("GetPlatforms", {
    //   intBrandID: 2,
    //   strLanguageCode: a.userLang
    // }), c.call("GetCategories", {
    //   strPlatformCode: "-1",
    //   strLanguageCode: a.userLang,
    //   intCurrencyID: a.currencyID,
    //   strWebsiteMode: "1"
    // }), c.call("GetGames", {
    //   intGameCategoryID: 0,
    //   strLanguageCode: a.userLang,
    //   intCurrencyID: a.currencyID,
    //   strPlatformCode: -1,
    //   strWebsiteMode: "",
    //   intPageNumber: 0,
    //   intRecordCounts: y,
    //   strOrderField: "",
    //   intDesc: 0
    // })];
    // o.all(n).then(function(t) {
    //   var o = t[0],
    //     n = t[1],
    //     s = t[2];
    //   if (o.data.Success) {
    //     a.platforms = [{
    //       PlatformGroup: "-1",
    //       PlatformCode: "-1",
    //       PlatformName: e("translate")("games@all_games"),
    //       ShortName: e("translate")("games@all_games"),
    //       Priority: -1
    //     }];
    //     for (var i in o.data.Result) "1" === o.data.Result[i].GameService && o.data.Result[i].Priority <= 70 && a.platforms.push(o.data.Result[i]);
    //     a.platforms.sort(function(e, t) {
    //       return e.Priority > t.Priority ? 1 : t.Priority > e.Priority ? -1 : 0
    //     }), a.selectedPlatform = a.platforms[0]
    //   }
    //   if (n.data.Success && (a.gameCategories = n.data.Result.Table, a.selectedCategory = a.gameCategories[0]), s.data.Success) {
    //     a.gameList = p(s.data.Result.Table);
    //     for (var i = 0; i < a.gameList.length; i++) a.gameList[i].GameName = u(a.gameList[i].GameName, 24);
    //     var r = s.data.Result.Table1[0] ? parseInt(s.data.Result.Table1[0].TotalCount, 10) : 0;
    //     a.totalPage = r > 0 ? Math.floor((r - 1) / y) + 1 : 0, a.selectedPage = 0;
    //     for (var i = 0; i < a.gameCategories.length; i++) a.gameCategories[i] === a.selectedCategory && (a.selectedCategory.GameCategoryCount = r, a.gameCategories[i] = a.selectedCategory)
    //   }
    //   f(!1)
    // });
    var o = {
      "Success": true,
      "Code": "1.0",
      "Message": "成功",
      "Result": [{
        "PlatformGroup": "20001",
        "GroupName": "铂金馆",
        "PlatformCode": "20001",
        "PlatformName": "铂金馆",
        "Priority": 20,
        "Visible": true,
        "ShortName": "EA",
        "Deduction": false,
        "GameService": "0",
        "PlatformType": "1"
      }, {
        "PlatformGroup": "20002",
        "GroupName": "米兰站",
        "PlatformCode": "20002",
        "PlatformName": "米兰站",
        "Priority": 32,
        "Visible": true,
        "ShortName": "EV",
        "Deduction": false,
        "GameService": "0",
        "PlatformType": "1"
      }, {
        "PlatformGroup": "20004",
        "GroupName": "海盗城",
        "PlatformCode": "20004",
        "PlatformName": "海盗城",
        "Priority": 33,
        "Visible": true,
        "ShortName": "OP",
        "Deduction": false,
        "GameService": "0",
        "PlatformType": "1"
      }, {
        "PlatformGroup": "20006",
        "GroupName": "翡翠厅",
        "PlatformCode": "20006",
        "PlatformName": "翡翠厅",
        "Priority": 30,
        "Visible": true,
        "ShortName": "AG",
        "Deduction": false,
        "GameService": "0",
        "PlatformType": "1"
      }, {
        "PlatformGroup": "20007",
        "GroupName": "星耀厅",
        "PlatformCode": "20007",
        "PlatformName": "星耀厅",
        "Priority": 31,
        "Visible": true,
        "ShortName": "W88",
        "Deduction": false,
        "GameService": "0",
        "PlatformType": "1"
      }, {
        "PlatformGroup": "20008",
        "GroupName": "夺宝岛",
        "PlatformCode": "20008",
        "PlatformName": "夺宝岛娱乐场",
        "Priority": 34,
        "Visible": true,
        "ShortName": "GD",
        "Deduction": false,
        "GameService": "0",
        "PlatformType": "1"
      }, {
        "PlatformGroup": "20008",
        "GroupName": "夺宝岛",
        "PlatformCode": "21008",
        "PlatformName": null,
        "Priority": 999,
        "Visible": true,
        "ShortName": "GD",
        "Deduction": false,
        "GameService": "1",
        "PlatformType": "3"
      }, {
        "PlatformGroup": "20009",
        "GroupName": "波音馆",
        "PlatformCode": "20009",
        "PlatformName": "波音馆",
        "Priority": 55,
        "Visible": true,
        "ShortName": "BBIN",
        "Deduction": false,
        "GameService": "0",
        "PlatformType": "1"
      }, {
        "PlatformGroup": "20009",
        "GroupName": "波音馆",
        "PlatformCode": "21009",
        "PlatformName": "BBIN",
        "Priority": 55,
        "Visible": true,
        "ShortName": "BBIN",
        "Deduction": false,
        "GameService": "1",
        "PlatformType": "3"
      }, {
        "PlatformGroup": "30001",
        "GroupName": "沙巴体育",
        "PlatformCode": "30001",
        "PlatformName": "沙巴体育",
        "Priority": 10,
        "Visible": true,
        "ShortName": "SB",
        "Deduction": false,
        "GameService": "0",
        "PlatformType": "2"
      }, {
        "PlatformGroup": "30001",
        "GroupName": "沙巴体育",
        "PlatformCode": "31001",
        "PlatformName": "百炼赛",
        "Priority": 10,
        "Visible": true,
        "ShortName": "SB",
        "Deduction": false,
        "GameService": "0",
        "PlatformType": "2"
      }, {
        "PlatformGroup": "40001",
        "GroupName": "MG",
        "PlatformCode": "40001",
        "PlatformName": "MG",
        "Priority": 63,
        "Visible": true,
        "ShortName": "MG",
        "Deduction": true,
        "GameService": "1",
        "PlatformType": "3"
      }, {
        "PlatformGroup": "40002",
        "GroupName": "GamesOS小遊戲",
        "PlatformCode": "40002",
        "PlatformName": "GamesOS",
        "Priority": 50,
        "Visible": true,
        "ShortName": "GamesOS",
        "Deduction": true,
        "GameService": "1",
        "PlatformType": "3"
      }, {
        "PlatformGroup": "40003",
        "GroupName": "Playtech游戏",
        "PlatformCode": "40003",
        "PlatformName": "Playtech",
        "Priority": 40,
        "Visible": true,
        "ShortName": "PlayTech",
        "Deduction": false,
        "GameService": "1",
        "PlatformType": "3"
      }, {
        "PlatformGroup": "40003",
        "GroupName": "Playtech游戏",
        "PlatformCode": "41003",
        "PlatformName": "百乐门",
        "Priority": 40,
        "Visible": true,
        "ShortName": "PlayTech",
        "Deduction": false,
        "GameService": "0",
        "PlatformType": "1"
      }, {
        "PlatformGroup": "40005",
        "GroupName": "Betsoft游戏",
        "PlatformCode": "40005",
        "PlatformName": "Betsoft",
        "Priority": 61,
        "Visible": true,
        "ShortName": "Betsoft",
        "Deduction": true,
        "GameService": "1",
        "PlatformType": "3"
      }, {
        "PlatformGroup": "40007",
        "GroupName": "QT游戏",
        "PlatformCode": "40007",
        "PlatformName": "QT",
        "Priority": 62,
        "Visible": true,
        "ShortName": "QT",
        "Deduction": true,
        "GameService": "1",
        "PlatformType": "3"
      }, {
        "PlatformGroup": "60001",
        "GroupName": "彩票",
        "PlatformCode": "60001",
        "PlatformName": "快乐彩",
        "Priority": 60,
        "Visible": true,
        "ShortName": "GB",
        "Deduction": true,
        "GameService": "0",
        "PlatformType": "4"
      }, {
        "PlatformGroup": "60001",
        "GroupName": "彩票",
        "PlatformCode": "61001",
        "PlatformName": "世界樂透",
        "Priority": 70,
        "Visible": true,
        "ShortName": "GB",
        "Deduction": true,
        "GameService": "0",
        "PlatformType": "4"
      }, {
        "PlatformGroup": "60001",
        "GroupName": "彩票",
        "PlatformCode": "62001",
        "PlatformName": "体育",
        "Priority": 70,
        "Visible": true,
        "ShortName": "GB",
        "Deduction": true,
        "GameService": "0",
        "PlatformType": "2"
      }, {
        "PlatformGroup": "60001",
        "GroupName": "彩票",
        "PlatformCode": "63001",
        "PlatformName": "SSC",
        "Priority": 70,
        "Visible": true,
        "ShortName": "GB",
        "Deduction": true,
        "GameService": "0",
        "PlatformType": "4"
      }]
    };
    var n = {
      "Success": true,
      "Code": "1.0",
      "Message": "成功",
      "Result": {
        "Table": [{
          "GameCategoryID": 0,
          "GamesCategoryName": "编辑精选",
          "Priority": 0,
          "GameCategoryCount": 103
        }, {
          "GameCategoryID": 7,
          "GamesCategoryName": "累积大奖",
          "Priority": 1,
          "GameCategoryCount": 66
        }, {
          "GameCategoryID": 3,
          "GamesCategoryName": "老虎机",
          "Priority": 2,
          "GameCategoryCount": 698
        }, {
          "GameCategoryID": 2,
          "GamesCategoryName": "桌面游戏",
          "Priority": 3,
          "GameCategoryCount": 137
        }, {
          "GameCategoryID": 4,
          "GamesCategoryName": "刮刮卡",
          "Priority": 4,
          "GameCategoryCount": 65
        }, {
          "GameCategoryID": 6,
          "GamesCategoryName": "游戏厅",
          "Priority": 6,
          "GameCategoryCount": 50
        }, {
          "GameCategoryID": 1,
          "GamesCategoryName": "视频扑克",
          "Priority": 7,
          "GameCategoryCount": 66
        }, {
          "GameCategoryID": -1,
          "GamesCategoryName": "全部游戏",
          "Priority": 99,
          "GameCategoryCount": 1016
        }],
        "Table1": [{
          "Column1": "1.0"
        }]
      }
    };
    var s = {
      "Success": true,
      "Code": "1.0",
      "Message": "成功",
      "Result": {
        "Table": [{
          "RowNumber": 1,
          "GameID": 1061,
          "GameCode": "5049",
          "PlatformCode": "20009",
          "GameName": "玉蒲团",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/BBIN/5049.jpg",
          "Priority": 1,
          "Experience": false,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 2,
          "GameID": 1501,
          "GameCode": "lndg",
          "PlatformCode": "40003",
          "GameName": "遍地黄金",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/lndg.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 3,
          "GameID": 1508,
          "GameCode": "647",
          "PlatformCode": "40005",
          "GameName": "弗兰肯怪物",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Betsoft/647.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 4,
          "GameID": 1509,
          "GameCode": "654",
          "PlatformCode": "40005",
          "GameName": "笨笨鸟",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Betsoft/654.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 5,
          "GameID": 1512,
          "GameCode": "619",
          "PlatformCode": "40005",
          "GameName": "圣诞颂歌",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Betsoft/619.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 6,
          "GameID": 1719,
          "GameCode": "xc_mrmonkeyslots",
          "PlatformCode": "40002",
          "GameName": "猴子先生",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/GamesOS/xc_mrmonkeyslots.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 7,
          "GameID": 1723,
          "GameCode": "spud",
          "PlatformCode": "40003",
          "GameName": "欧莱里之黄金大田",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/spud.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 8,
          "GameID": 1724,
          "GameCode": "wlcsh",
          "PlatformCode": "40003",
          "GameName": "五路财神",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/wlcsh.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 9,
          "GameID": 1725,
          "GameCode": "kfp",
          "PlatformCode": "40003",
          "GameName": "六福兽",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/kfp.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 10,
          "GameID": 1726,
          "GameCode": "jqw",
          "PlatformCode": "40003",
          "GameName": "金钱蛙",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/jqw.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 11,
          "GameID": 1727,
          "GameCode": "qnw",
          "PlatformCode": "40003",
          "GameName": "权杖女王",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/qnw.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 12,
          "GameID": 1749,
          "GameCode": "HAB-goldrush",
          "PlatformCode": "40007",
          "GameName": "淘金疯狂",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/NYX/HAB-goldrush.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 13,
          "GameID": 1750,
          "GameCode": "HAB-monstermashcash",
          "PlatformCode": "40007",
          "GameName": "怪物聚集",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/NYX/HAB-monstermashcash.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 14,
          "GameID": 1751,
          "GameCode": "HAB-shaolinfortunes",
          "PlatformCode": "40007",
          "GameName": "少林宝藏",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/NYX/HAB-shaolinfortunes.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 15,
          "GameID": 1752,
          "GameCode": "HAB-wickedwitch",
          "PlatformCode": "40007",
          "GameName": "巫婆大财",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/NYX/HAB-wickedwitch.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 16,
          "GameID": 1753,
          "GameCode": "HAB-sparta",
          "PlatformCode": "40007",
          "GameName": "斯巴达",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/NYX/HAB-sparta.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 17,
          "GameID": 1757,
          "GameCode": "bfb",
          "PlatformCode": "40003",
          "GameName": "犎牛闪电突击",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/bfb.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 18,
          "GameID": 1758,
          "GameCode": "chao",
          "PlatformCode": "40003",
          "GameName": "超级 888",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/chao.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 19,
          "GameID": 1759,
          "GameCode": "gemq",
          "PlatformCode": "40003",
          "GameName": "宝石女王",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/gemq.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 20,
          "GameID": 1761,
          "GameCode": "longlong",
          "PlatformCode": "40003",
          "GameName": "龙龙龙",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/longlong.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 21,
          "GameID": 1762,
          "GameCode": "700",
          "PlatformCode": "40005",
          "GameName": "好运发发",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Betsoft/700.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 22,
          "GameID": 1764,
          "GameCode": "QS-bigbadwolf",
          "PlatformCode": "40007",
          "GameName": "灰太狼",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/NYX/QS-bigbadwolf.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 23,
          "GameID": 1768,
          "GameCode": "QS-sevenshigh",
          "PlatformCode": "40007",
          "GameName": "疯狂777",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/NYX/QS-sevenshigh.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 24,
          "GameID": 1770,
          "GameCode": "OGS-emeraldisle",
          "PlatformCode": "40007",
          "GameName": "翡翠岛",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/NYX/OGS-emeraldisle.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 25,
          "GameID": 1779,
          "GameCode": "LostVegas",
          "PlatformCode": "40001",
          "GameName": "迷失拉斯维加斯",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/MG/LostVegas.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 26,
          "GameID": 1781,
          "GameCode": "QS-thethreemusketeers",
          "PlatformCode": "40007",
          "GameName": "三剑客",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/NYX/QS-thethreemusketeers.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 27,
          "GameID": 1782,
          "GameCode": "QS-titanthunder",
          "PlatformCode": "40007",
          "GameName": "泰坦雷霆",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/NYX/QS-titanthunder.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 28,
          "GameID": 1783,
          "GameCode": "QS-hiddenvalley",
          "PlatformCode": "40007",
          "GameName": "神秘山谷",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/NYX/QS-hiddenvalley.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 29,
          "GameID": 1784,
          "GameCode": "QS-royalfrog",
          "PlatformCode": "40007",
          "GameName": "皇族青蛙",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/NYX/QS-royalfrog.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 30,
          "GameID": 1785,
          "GameCode": "QS-theepicjourney",
          "PlatformCode": "40007",
          "GameName": "史诗之旅",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/NYX/QS-theepicjourney.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 31,
          "GameID": 1786,
          "GameCode": "QS-sugartrail",
          "PlatformCode": "40007",
          "GameName": "糖果传奇",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/NYX/QS-sugartrail.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 32,
          "GameID": 1787,
          "GameCode": "HAB-gangsters",
          "PlatformCode": "40007",
          "GameName": "黑手党",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/NYX/HAB-gangsters.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 33,
          "GameID": 1788,
          "GameCode": "Dragonz",
          "PlatformCode": "40001",
          "GameName": "幸运龙宝贝",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/MG/Dragonz.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 34,
          "GameID": 1789,
          "GameCode": "attackOfTheZombiesDesktop",
          "PlatformCode": "40001",
          "GameName": "丧尸出笼",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/MG/attackOfTheZombiesDesktop.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 35,
          "GameID": 1790,
          "GameCode": "snowQueenRichesDesktop",
          "PlatformCode": "40001",
          "GameName": "冰雪皇后",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/MG/snowQueenRichesDesktop.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }, {
          "RowNumber": 36,
          "GameID": 1794,
          "GameCode": "hlf2",
          "PlatformCode": "40003",
          "GameName": "万圣节宝藏 2",
          "GameCategoryID": 3,
          "GameCategoryName": "老虎机",
          "ImgUrl": "http://image.vwin.com/TemplateFile/Games/Playtech/hlf2.jpg",
          "Priority": 1,
          "Experience": true,
          "Symbol": null,
          "Amount": null,
          "Focus": 1,
          "favorite": 0
        }],
        "Table1": [{
          "TotalCount": "103"
        }]
      }
    };
    if (o.Success) {
      a.platforms = [{
        PlatformGroup: "-1",
        PlatformCode: "-1",
        PlatformName: e("translate")("games@all_games"),
        ShortName: e("translate")("games@all_games"),
        Priority: -1
      }];
      for (var i in o.Result) "1" === o.Result[i].GameService && o.Result[i].Priority <= 70 && a.platforms.push(o.Result[i]);
      a.platforms.sort(function(e, t) {
        return e.Priority > t.Priority ? 1 : t.Priority > e.Priority ? -1 : 0
      });
      a.selectedPlatform = a.platforms[0]
    }
    if (n.Success && (a.gameCategories = n.Result.Table, a.selectedCategory = a.gameCategories[0]), s.Success) {
      a.gameList = p(s.Result.Table);
      for (var i = 0; i < a.gameList.length; i++) a.gameList[i].GameName = u(a.gameList[i].GameName, 24);
      var r = s.Result.Table1[0] ? parseInt(s.Result.Table1[0].TotalCount, 10) : 0;
      a.totalPage = r > 0 ? Math.floor((r - 1) / y) + 1 : 0, a.selectedPage = 0;
      for (var i = 0; i < a.gameCategories.length; i++) a.gameCategories[i] === a.selectedCategory && (a.selectedCategory.GameCategoryCount = r, a.gameCategories[i] = a.selectedCategory)
    }
    f(!1);
  };

  a.init();
  a.getGameCategoryIcon = function(e) {
    for (var t = "" + (e + 1); t.length < 2;) t = "0" + t;
    return "game-icon game-icon-" + t
  };
  a.onGameCategoryClicked = function(e) {
    a.selectedPage = 0;
    a.selectedCategory = e;
    h(!0);
    // c.call("GetGames", {
    //   intGameCategoryID: a.selectedCategory.GameCategoryID,
    //   strLanguageCode: a.userLang,
    //   intCurrencyID: a.currencyID,
    //   strPlatformCode: a.selectedPlatform.PlatformGroup,
    //   strWebsiteMode: "",
    //   intPageNumber: 0,
    //   intRecordCounts: y,
    //   strOrderField: "",
    //   intDesc: 0
    // }).success(function(e, t, o) {
    //   if (e.Success) {
    //     a.gameList = p(e.Result.Table);
    //     for (var n = 0; n < a.gameList.length; n++) a.gameList[n].GameName = u(a.gameList[n].GameName, 24);
    //     var s = e.Result.Table1[0] ? parseInt(e.Result.Table1[0].TotalCount, 10) : 0;
    //     a.totalPage = s > 0 ? Math.floor((s - 1) / y) + 1 : 0;
    //     for (var n = 0; n < a.gameCategories.length; n++) a.gameCategories[n] === a.selectedCategory && (a.selectedCategory.GameCategoryCount = s, a.gameCategories[n] = a.selectedCategory)
    //   }
    //   h(!1);
    // });
    var data = {
      '0': {"Success":true,"Code":"1.0","Message":"成功","Result":{"Table":[{"RowNumber":1,"GameID":1061,"GameCode":"5049","PlatformCode":"20009","GameName":"玉蒲团","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BBIN/5049.jpg","Priority":1,"Experience":false,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":2,"GameID":1501,"GameCode":"lndg","PlatformCode":"40003","GameName":"遍地黄金","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/lndg.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":3,"GameID":1508,"GameCode":"647","PlatformCode":"40005","GameName":"弗兰肯怪物","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Betsoft/647.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":4,"GameID":1509,"GameCode":"654","PlatformCode":"40005","GameName":"笨笨鸟","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Betsoft/654.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":5,"GameID":1512,"GameCode":"619","PlatformCode":"40005","GameName":"圣诞颂歌","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Betsoft/619.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":6,"GameID":1719,"GameCode":"xc_mrmonkeyslots","PlatformCode":"40002","GameName":"猴子先生","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_mrmonkeyslots.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":7,"GameID":1723,"GameCode":"spud","PlatformCode":"40003","GameName":"欧莱里之黄金大田","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/spud.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":8,"GameID":1724,"GameCode":"wlcsh","PlatformCode":"40003","GameName":"五路财神","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/wlcsh.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":9,"GameID":1725,"GameCode":"kfp","PlatformCode":"40003","GameName":"六福兽","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/kfp.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":10,"GameID":1726,"GameCode":"jqw","PlatformCode":"40003","GameName":"金钱蛙","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/jqw.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":11,"GameID":1727,"GameCode":"qnw","PlatformCode":"40003","GameName":"权杖女王","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/qnw.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":12,"GameID":1749,"GameCode":"HAB-goldrush","PlatformCode":"40007","GameName":"淘金疯狂","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/HAB-goldrush.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":13,"GameID":1750,"GameCode":"HAB-monstermashcash","PlatformCode":"40007","GameName":"怪物聚集","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/HAB-monstermashcash.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":14,"GameID":1751,"GameCode":"HAB-shaolinfortunes","PlatformCode":"40007","GameName":"少林宝藏","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/HAB-shaolinfortunes.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":15,"GameID":1752,"GameCode":"HAB-wickedwitch","PlatformCode":"40007","GameName":"巫婆大财","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/HAB-wickedwitch.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":16,"GameID":1753,"GameCode":"HAB-sparta","PlatformCode":"40007","GameName":"斯巴达","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/HAB-sparta.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":17,"GameID":1757,"GameCode":"bfb","PlatformCode":"40003","GameName":"犎牛闪电突击","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/bfb.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":18,"GameID":1758,"GameCode":"chao","PlatformCode":"40003","GameName":"超级 888","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/chao.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":19,"GameID":1759,"GameCode":"gemq","PlatformCode":"40003","GameName":"宝石女王","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/gemq.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":20,"GameID":1761,"GameCode":"longlong","PlatformCode":"40003","GameName":"龙龙龙","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/longlong.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":21,"GameID":1762,"GameCode":"700","PlatformCode":"40005","GameName":"好运发发","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Betsoft/700.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":22,"GameID":1764,"GameCode":"QS-bigbadwolf","PlatformCode":"40007","GameName":"灰太狼","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/QS-bigbadwolf.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":23,"GameID":1768,"GameCode":"QS-sevenshigh","PlatformCode":"40007","GameName":"疯狂777","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/QS-sevenshigh.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":24,"GameID":1770,"GameCode":"OGS-emeraldisle","PlatformCode":"40007","GameName":"翡翠岛","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/OGS-emeraldisle.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":25,"GameID":1779,"GameCode":"LostVegas","PlatformCode":"40001","GameName":"迷失拉斯维加斯","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/MG/LostVegas.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":26,"GameID":1781,"GameCode":"QS-thethreemusketeers","PlatformCode":"40007","GameName":"三剑客","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/QS-thethreemusketeers.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":27,"GameID":1782,"GameCode":"QS-titanthunder","PlatformCode":"40007","GameName":"泰坦雷霆","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/QS-titanthunder.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":28,"GameID":1783,"GameCode":"QS-hiddenvalley","PlatformCode":"40007","GameName":"神秘山谷","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/QS-hiddenvalley.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":29,"GameID":1784,"GameCode":"QS-royalfrog","PlatformCode":"40007","GameName":"皇族青蛙","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/QS-royalfrog.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":30,"GameID":1785,"GameCode":"QS-theepicjourney","PlatformCode":"40007","GameName":"史诗之旅","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/QS-theepicjourney.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":31,"GameID":1786,"GameCode":"QS-sugartrail","PlatformCode":"40007","GameName":"糖果传奇","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/QS-sugartrail.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":32,"GameID":1787,"GameCode":"HAB-gangsters","PlatformCode":"40007","GameName":"黑手党","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/HAB-gangsters.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":33,"GameID":1788,"GameCode":"Dragonz","PlatformCode":"40001","GameName":"幸运龙宝贝","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/MG/Dragonz.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":34,"GameID":1789,"GameCode":"attackOfTheZombiesDesktop","PlatformCode":"40001","GameName":"丧尸出笼","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/MG/attackOfTheZombiesDesktop.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":35,"GameID":1790,"GameCode":"snowQueenRichesDesktop","PlatformCode":"40001","GameName":"冰雪皇后","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/MG/snowQueenRichesDesktop.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":36,"GameID":1794,"GameCode":"hlf2","PlatformCode":"40003","GameName":"万圣节宝藏 2","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/hlf2.jpg","Priority":1,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0}],"Table1":[{"TotalCount":"103"}]}},
      '1': {"Success":true,"Code":"1.0","Message":"成功","Result":{"Table":[{"RowNumber":1,"GameID":993,"GameCode":"xc_faceace","PlatformCode":"40002","GameName":"花牌和 A","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_faceace.jpg","Priority":103,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":2,"GameID":852,"GameCode":"hsd","PlatformCode":"40003","GameName":"德州扑克争霸","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/hsd.jpg","Priority":113,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":3,"GameID":538,"GameCode":"hljb","PlatformCode":"40003","GameName":"皇家同花顺","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/hljb.jpg","Priority":162,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":4,"GameID":634,"GameCode":"po","PlatformCode":"40003","GameName":"对 J 高手","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/po.jpg","Priority":163,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":5,"GameID":983,"GameCode":"xc_coliseum","PlatformCode":"40002","GameName":"竞技场扑克","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_coliseum.jpg","Priority":169,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":6,"GameID":537,"GameCode":"jb10p","PlatformCode":"40003","GameName":"十线对 J 高手","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/jb10p.jpg","Priority":180,"Experience":false,"Symbol":"$","Amount":53616.3800,"Focus":null,"favorite":0},{"RowNumber":7,"GameID":994,"GameCode":"xc_faceace10l","PlatformCode":"40002","GameName":"10 行花牌和 A","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_faceace10l.jpg","Priority":228,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":8,"GameID":984,"GameCode":"xc_coliseum10l","PlatformCode":"40002","GameName":"10 行竞技场扑克","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_coliseum10l.jpg","Priority":229,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":9,"GameID":996,"GameCode":"xc_faceace4l","PlatformCode":"40002","GameName":"4 行花牌和 A","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_faceace4l.jpg","Priority":230,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":10,"GameID":735,"GameCode":"dw4","PlatformCode":"40003","GameName":"4线百搭","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/dw4.jpg","Priority":245,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":11,"GameID":637,"GameCode":"jp","PlatformCode":"40003","GameName":"小丑扑克","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/jp.jpg","Priority":246,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":12,"GameID":985,"GameCode":"xc_coliseum25l","PlatformCode":"40002","GameName":"25 行竞技场扑克","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_coliseum25l.jpg","Priority":270,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":13,"GameID":986,"GameCode":"xc_coliseum4l","PlatformCode":"40002","GameName":"4 线竞技场扑克","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_coliseum4l.jpg","Priority":271,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":14,"GameID":998,"GameCode":"xc_fiveaces","PlatformCode":"40002","GameName":"五张 A","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_fiveaces.jpg","Priority":272,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":15,"GameID":1009,"GameCode":"xc_shockwave","PlatformCode":"40002","GameName":"冲击波扑克","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_shockwave.jpg","Priority":273,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":16,"GameID":734,"GameCode":"af4","PlatformCode":"40003","GameName":"4线A和花牌","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/af4.jpg","Priority":289,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":17,"GameID":541,"GameCode":"jb4","PlatformCode":"40003","GameName":"4线的J或更大","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/jb4.jpg","Priority":290,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":18,"GameID":542,"GameCode":"jb50","PlatformCode":"40003","GameName":"J或更大50线","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/jb50.jpg","Priority":291,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":19,"GameID":584,"GameCode":"dw","PlatformCode":"40003","GameName":"百搭","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/dw.jpg","Priority":292,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":20,"GameID":691,"GameCode":"tob","PlatformCode":"40003","GameName":"数十或更大","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/tob.jpg","Priority":293,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":21,"GameID":989,"GameCode":"xc_deuceswild10l","PlatformCode":"40002","GameName":"10 行万能两点","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_deuceswild10l.jpg","Priority":318,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":22,"GameID":1005,"GameCode":"xc_jokerwild10l","PlatformCode":"40002","GameName":"10 线万能小丑","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_jokerwild10l.jpg","Priority":319,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":23,"GameID":990,"GameCode":"xc_deuceswild25l","PlatformCode":"40002","GameName":"25 行万能两点","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_deuceswild25l.jpg","Priority":320,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":24,"GameID":991,"GameCode":"xc_deuceswild4l","PlatformCode":"40002","GameName":"4 线万能两点","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_deuceswild4l.jpg","Priority":321,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":25,"GameID":1002,"GameCode":"xc_jacksorbetter4l","PlatformCode":"40002","GameName":"4 线好过杰克","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_jacksorbetter4l.jpg","Priority":322,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":26,"GameID":992,"GameCode":"xc_deuceswild50l","PlatformCode":"40002","GameName":"50 行万能两点","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_deuceswild50l.jpg","Priority":323,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":27,"GameID":1008,"GameCode":"xc_jokerwild50l","PlatformCode":"40002","GameName":"50 线万能小丑","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_jokerwild50l.jpg","Priority":324,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":28,"GameID":1004,"GameCode":"xc_jokerwild","PlatformCode":"40002","GameName":"万能小丑","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_jokerwild.jpg","Priority":325,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":29,"GameID":999,"GameCode":"xc_jacksorbetter","PlatformCode":"40002","GameName":"好过杰克","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_jacksorbetter.jpg","Priority":326,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":30,"GameID":733,"GameCode":"af25","PlatformCode":"40003","GameName":"25线的A和花牌","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/af25.jpg","Priority":337,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":31,"GameID":546,"GameCode":"af","PlatformCode":"40003","GameName":"A和花牌","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/af.jpg","Priority":338,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":32,"GameID":549,"GameCode":"amvp","PlatformCode":"40003","GameName":"全美大奖赛","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/amvp.jpg","Priority":339,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":33,"GameID":1137,"GameCode":"29","PlatformCode":"40005","GameName":"疯狂局末","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BetSoft/29.jpg","Priority":500,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":34,"GameID":1138,"GameCode":"30","PlatformCode":"40005","GameName":"鬼牌百搭","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BetSoft/30.jpg","Priority":500,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":35,"GameID":1142,"GameCode":"65","PlatformCode":"40005","GameName":"人傑地灵","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BetSoft/65.jpg","Priority":500,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":36,"GameID":1143,"GameCode":"68","PlatformCode":"40005","GameName":"王牌對決","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BetSoft/68.jpg","Priority":500,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0}],"Table1":[{"TotalCount":"66"}]}},
      '2': {"Success":true,"Code":"1.0","Message":"成功","Result":{"Table":[{"RowNumber":1,"GameID":1549,"GameCode":"BaccaratGold","PlatformCode":"40001","GameName":"金牌百家乐","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/MG/BaccaratGold.jpg","Priority":5,"Experience":true,"Symbol":null,"Amount":null,"Focus":5,"favorite":0},{"RowNumber":2,"GameID":890,"GameCode":"xc_blackjack","PlatformCode":"40002","GameName":"21 点经典","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_blackjack.jpg","Priority":31,"Experience":true,"Symbol":null,"Amount":null,"Focus":31,"favorite":0},{"RowNumber":3,"GameID":559,"GameCode":"bj_mh5","PlatformCode":"40003","GameName":"21点","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/bj_mh5.jpg","Priority":36,"Experience":true,"Symbol":null,"Amount":null,"Focus":36,"favorite":0},{"RowNumber":4,"GameID":888,"GameCode":"xc_baccarat","PlatformCode":"40002","GameName":"百家乐","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_baccarat.jpg","Priority":45,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":5,"GameID":667,"GameCode":"pbj","PlatformCode":"40003","GameName":"乐透21点","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/pbj.jpg","Priority":48,"Experience":true,"Symbol":"￥","Amount":803507.7800,"Focus":null,"favorite":0},{"RowNumber":6,"GameID":982,"GameCode":"xc_sic_bo","PlatformCode":"40002","GameName":"骰宝","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_sic_bo.jpg","Priority":54,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":7,"GameID":981,"GameCode":"xc_euroulettepro","PlatformCode":"40002","GameName":"轮盘赌专家","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_euroulettepro.jpg","Priority":83,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":8,"GameID":903,"GameCode":"xc_blackjack_perfectpairs","PlatformCode":"40002","GameName":"完美对子二十一点经典","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_blackjack_perfectpairs.jpg","Priority":92,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":9,"GameID":847,"GameCode":"fsc","PlatformCode":"40003","GameName":"最终得分","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/fsc.jpg","Priority":96,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":10,"GameID":684,"GameCode":"psdbj","PlatformCode":"40003","GameName":"单人21点","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/psdbj.jpg","Priority":133,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":11,"GameID":909,"GameCode":"xc_mhbaccarat","PlatformCode":"40002","GameName":"VIP百家乐","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_mhbaccarat.jpg","Priority":135,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":12,"GameID":897,"GameCode":"xc_hold_em","PlatformCode":"40002","GameName":"赌场德州扑克","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_hold_em.jpg","Priority":136,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":13,"GameID":894,"GameCode":"xc_blackjack_s","PlatformCode":"40002","GameName":"投降 21 点经典","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_blackjack_s.jpg","Priority":140,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":14,"GameID":980,"GameCode":"xc_euroulette","PlatformCode":"40002","GameName":"欧式轮盘赌","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_euroulette.jpg","Priority":141,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":15,"GameID":550,"GameCode":"rodz","PlatformCode":"40003","GameName":"美式轮盘","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/rodz.jpg","Priority":148,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":16,"GameID":565,"GameCode":"bjuk_mh5","PlatformCode":"40003","GameName":"英式21点","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/bjuk_mh5.jpg","Priority":161,"Experience":false,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":17,"GameID":901,"GameCode":"xc_paigowpoker","PlatformCode":"40002","GameName":"牌九扑克","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_paigowpoker.jpg","Priority":168,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":18,"GameID":663,"GameCode":"rodz_g","PlatformCode":"40003","GameName":"高级美式轮盘","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/rodz_g.jpg","Priority":178,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":19,"GameID":794,"GameCode":"gtsro3d","PlatformCode":"40003","GameName":"新式3D轮盘","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/gtsro3d.jpg","Priority":179,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":20,"GameID":892,"GameCode":"xc_blackjack_progressive","PlatformCode":"40002","GameName":"累积二十一点经典","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_blackjack_progressive.jpg","Priority":189,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":21,"GameID":540,"GameCode":"ro3d","PlatformCode":"40003","GameName":"3D轮盘","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/ro3d.jpg","Priority":198,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":22,"GameID":750,"GameCode":"bja","PlatformCode":"40003","GameName":"美式21点","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/bja.jpg","Priority":211,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":23,"GameID":665,"GameCode":"frr_g","PlatformCode":"40003","GameName":"高级法式轮盘","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/frr_g.jpg","Priority":212,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":24,"GameID":741,"GameCode":"s21","PlatformCode":"40003","GameName":"超级21点","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/s21.jpg","Priority":213,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":25,"GameID":906,"GameCode":"xc_poker_russian","PlatformCode":"40002","GameName":"俄罗斯扑克（Russian Poker）","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_poker_russian.jpg","Priority":227,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":26,"GameID":862,"GameCode":"gtssprs","PlatformCode":"40003","GameName":"黑道家族","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/gtssprs.jpg","Priority":234,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":27,"GameID":850,"GameCode":"glrj","PlatformCode":"40003","GameName":"角斗士大奖","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/glrj.jpg","Priority":237,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":28,"GameID":666,"GameCode":"rop_g","PlatformCode":"40003","GameName":"高级职业轮盘","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/rop_g.jpg","Priority":238,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":29,"GameID":860,"GameCode":"cnpr","PlatformCode":"40003","GameName":"甜蜜派对","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/cnpr.jpg","Priority":239,"Experience":false,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":30,"GameID":593,"GameCode":"ro","PlatformCode":"40003","GameName":"欧洲轮盘","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/ro.jpg","Priority":241,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":31,"GameID":676,"GameCode":"rop","PlatformCode":"40003","GameName":"职业轮盘","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/rop.jpg","Priority":243,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":32,"GameID":821,"GameCode":"rouk","PlatformCode":"40003","GameName":"轮盘俱乐部","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/rouk.jpg","Priority":244,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":33,"GameID":904,"GameCode":"xc_bj_pontoon","PlatformCode":"40002","GameName":"英式二十一点","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_bj_pontoon.jpg","Priority":266,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":34,"GameID":891,"GameCode":"xc_bj_progressive","PlatformCode":"40002","GameName":"累积二十一点","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_bj_progressive.jpg","Priority":267,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":35,"GameID":979,"GameCode":"xc_craps","PlatformCode":"40002","GameName":"掷骰子","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_craps.jpg","Priority":268,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":36,"GameID":900,"GameCode":"xc_poker_oasis","PlatformCode":"40002","GameName":"绿洲扑克（Oasis Poker）","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_poker_oasis.jpg","Priority":269,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0}],"Table1":[{"TotalCount":"137"}]}},
      '3': {"Success":true,"Code":"1.0","Message":"成功","Result":{"Table":[{"RowNumber":1,"GameID":1061,"GameCode":"5049","PlatformCode":"20009","GameName":"玉蒲团","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BBIN/5049.jpg","Priority":1,"Experience":false,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":2,"GameID":804,"GameCode":"irmn3","PlatformCode":"40003","GameName":"钢铁侠3","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/irmn3.jpg","Priority":2,"Experience":true,"Symbol":null,"Amount":null,"Focus":2,"favorite":0},{"RowNumber":3,"GameID":1021,"GameCode":"nian_k","PlatformCode":"40003","GameName":"年年有余","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/nian_k.jpg","Priority":3,"Experience":false,"Symbol":null,"Amount":null,"Focus":3,"favorite":0},{"RowNumber":4,"GameID":1788,"GameCode":"Dragonz","PlatformCode":"40001","GameName":"幸运龙宝贝","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/MG/Dragonz.jpg","Priority":3,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":5,"GameID":817,"GameCode":"zcjb","PlatformCode":"40003","GameName":"招财进宝","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/zcjb.jpg","Priority":4,"Experience":true,"Symbol":null,"Amount":null,"Focus":4,"favorite":0},{"RowNumber":6,"GameID":1023,"GameCode":"xc_doublebonusslots","PlatformCode":"40002","GameName":"双重奖励老虎机","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_doublebonusslots.jpg","Priority":5,"Experience":true,"Symbol":null,"Amount":null,"Focus":5,"favorite":0},{"RowNumber":7,"GameID":1501,"GameCode":"lndg","PlatformCode":"40003","GameName":"遍地黄金","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/lndg.jpg","Priority":5,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":8,"GameID":1812,"GameCode":"ELK-championsgoal","PlatformCode":"40007","GameName":"足球宝贝","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/ELK-championsgoal.jpg","Priority":5,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":9,"GameID":1020,"GameCode":"fcgz","PlatformCode":"40003","GameName":"翡翠公主","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/fcgz.jpg","Priority":6,"Experience":false,"Symbol":null,"Amount":null,"Focus":6,"favorite":0},{"RowNumber":10,"GameID":596,"GameCode":"fnf","PlatformCode":"40003","GameName":"神奇四侠","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/fnf.jpg","Priority":7,"Experience":true,"Symbol":null,"Amount":null,"Focus":7,"favorite":0},{"RowNumber":11,"GameID":801,"GameCode":"avng","PlatformCode":"40003","GameName":"复仇者联盟","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/avng.jpg","Priority":8,"Experience":true,"Symbol":null,"Amount":null,"Focus":8,"favorite":0},{"RowNumber":12,"GameID":618,"GameCode":"bib","PlatformCode":"40003","GameName":"碧海蓝天","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/bib.jpg","Priority":9,"Experience":true,"Symbol":null,"Amount":null,"Focus":9,"favorite":0},{"RowNumber":13,"GameID":803,"GameCode":"spidc","PlatformCode":"40003","GameName":"蜘蛛侠","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/spidc.jpg","Priority":10,"Experience":true,"Symbol":null,"Amount":null,"Focus":10,"favorite":0},{"RowNumber":14,"GameID":1202,"GameCode":"402","PlatformCode":"40005","GameName":"弹弹糖","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BetSoft/402.jpg","Priority":10,"Experience":true,"Symbol":null,"Amount":null,"Focus":5,"favorite":0},{"RowNumber":15,"GameID":1554,"GameCode":"bikiniparty","PlatformCode":"40001","GameName":"比基尼派对","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/MG/bikiniparty.jpg","Priority":10,"Experience":true,"Symbol":null,"Amount":null,"Focus":10,"favorite":0},{"RowNumber":16,"GameID":1797,"GameCode":"ririjc","PlatformCode":"40003","GameName":"日日进财","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/ririjc.jpg","Priority":10,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":17,"GameID":694,"GameCode":"hlk50","PlatformCode":"40003","GameName":"绿巨人50线","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/hlk50.jpg","Priority":11,"Experience":true,"Symbol":null,"Amount":null,"Focus":11,"favorite":0},{"RowNumber":18,"GameID":1509,"GameCode":"654","PlatformCode":"40005","GameName":"笨笨鸟","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Betsoft/654.jpg","Priority":12,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":19,"GameID":1127,"GameCode":"xc_eastwindbattleslots","PlatformCode":"40002","GameName":"战东风","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_eastwindbattleslots.jpg","Priority":12,"Experience":true,"Symbol":null,"Amount":null,"Focus":12,"favorite":0},{"RowNumber":20,"GameID":610,"GameCode":"fm","PlatformCode":"40003","GameName":"疯狂的猴子","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/fm.jpg","Priority":13,"Experience":true,"Symbol":null,"Amount":null,"Focus":13,"favorite":0},{"RowNumber":21,"GameID":554,"GameCode":"bl","PlatformCode":"40003","GameName":"海滨嘉年华","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/bl.jpg","Priority":14,"Experience":false,"Symbol":"$","Amount":5050675.9100,"Focus":14,"favorite":0},{"RowNumber":22,"GameID":1019,"GameCode":"xc_pipezillasslots","PlatformCode":"40002","GameName":"管道精灵","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_pipezillasslots.jpg","Priority":15,"Experience":true,"Symbol":null,"Amount":null,"Focus":15,"favorite":0},{"RowNumber":23,"GameID":1581,"GameCode":"dragondance","PlatformCode":"40001","GameName":"舞龙舞狮","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/MG/dragondance.jpg","Priority":15,"Experience":true,"Symbol":null,"Amount":null,"Focus":15,"favorite":0},{"RowNumber":24,"GameID":1802,"GameCode":"OGS-fiestacubana","PlatformCode":"40007","GameName":"热辣古巴","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/OGS-fiestacubana.jpg","Priority":15,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":25,"GameID":1126,"GameCode":"xc_mayawheelofluckslots","PlatformCode":"40002","GameName":"玛雅幸运轮","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_mayawheelofluckslots.jpg","Priority":16,"Experience":true,"Symbol":null,"Amount":null,"Focus":16,"favorite":0},{"RowNumber":26,"GameID":800,"GameCode":"cam","PlatformCode":"40003","GameName":"美国队长-复仇","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/cam.jpg","Priority":17,"Experience":true,"Symbol":null,"Amount":null,"Focus":17,"favorite":0},{"RowNumber":27,"GameID":835,"GameCode":"wlg","PlatformCode":"40003","GameName":"舞龙","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/wlg.jpg","Priority":18,"Experience":true,"Symbol":null,"Amount":null,"Focus":18,"favorite":0},{"RowNumber":28,"GameID":1508,"GameCode":"647","PlatformCode":"40005","GameName":"弗兰肯怪物","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Betsoft/647.jpg","Priority":18,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":29,"GameID":617,"GameCode":"gos","PlatformCode":"40003","GameName":"黄金之旅","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/gos.jpg","Priority":19,"Experience":true,"Symbol":null,"Amount":null,"Focus":19,"favorite":0},{"RowNumber":30,"GameID":795,"GameCode":"fnfrj","PlatformCode":"40003","GameName":"酷炫水果","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/fnfrj.jpg","Priority":20,"Experience":false,"Symbol":null,"Amount":null,"Focus":20,"favorite":0},{"RowNumber":31,"GameID":1597,"GameCode":"GirlsWithGunsFrozenDawn","PlatformCode":"40001","GameName":"女孩与枪:极地战争","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/MG/GirlsWithGunsFrozenDawn.jpg","Priority":20,"Experience":true,"Symbol":null,"Amount":null,"Focus":20,"favorite":0},{"RowNumber":32,"GameID":1190,"GameCode":"277","PlatformCode":"40005","GameName":"马亚传奇","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BetSoft/277.jpg","Priority":20,"Experience":true,"Symbol":null,"Amount":null,"Focus":10,"favorite":0},{"RowNumber":33,"GameID":1017,"GameCode":"xc_firecrackerslots","PlatformCode":"40002","GameName":"幸运星空","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_firecrackerslots.jpg","Priority":21,"Experience":true,"Symbol":null,"Amount":null,"Focus":21,"favorite":0},{"RowNumber":34,"GameID":1128,"GameCode":"xc_mavericksaloonslots","PlatformCode":"40002","GameName":"独行酒吧","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_mavericksaloonslots.jpg","Priority":22,"Experience":true,"Symbol":null,"Amount":null,"Focus":34,"favorite":0},{"RowNumber":35,"GameID":569,"GameCode":"ct","PlatformCode":"40003","GameName":"船长的宝藏","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/ct.jpg","Priority":23,"Experience":true,"Symbol":null,"Amount":null,"Focus":23,"favorite":0},{"RowNumber":36,"GameID":974,"GameCode":"xc_summerdreamslots","PlatformCode":"40002","GameName":"夏日梦想","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_summerdreamslots.jpg","Priority":24,"Experience":true,"Symbol":null,"Amount":null,"Focus":24,"favorite":0}],"Table1":[{"TotalCount":"698"}]}},
      '4': {"Success":true,"Code":"1.0","Message":"成功","Result":{"Table":[{"RowNumber":1,"GameID":882,"GameCode":"xc_teddyscratch","PlatformCode":"40002","GameName":"泰迪刮刮乐","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_teddyscratch.jpg","Priority":42,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":2,"GameID":731,"GameCode":"tclsc","PlatformCode":"40003","GameName":"3个小丑刮刮乐","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/tclsc.jpg","Priority":46,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":3,"GameID":659,"GameCode":"pks","PlatformCode":"40003","GameName":"法老王国度","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/pks.jpg","Priority":47,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":4,"GameID":641,"GameCode":"kkgsc","PlatformCode":"40003","GameName":"金刚刮刮乐","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/kkgsc.jpg","Priority":49,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":5,"GameID":575,"GameCode":"scs","PlatformCode":"40003","GameName":"老虎机刮刮乐","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/scs.jpg","Priority":61,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":6,"GameID":631,"GameCode":"irm3sc","PlatformCode":"40003","GameName":"钢铁侠2刮刮乐","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/irm3sc.jpg","Priority":67,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":7,"GameID":869,"GameCode":"xc_formulascratch","PlatformCode":"40002","GameName":"方程式刮刮乐","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_formulascratch.jpg","Priority":91,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":8,"GameID":679,"GameCode":"ssa","PlatformCode":"40003","GameName":"圣诞刮刮乐","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/ssa.jpg","Priority":110,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":9,"GameID":677,"GameCode":"sro","PlatformCode":"40003","GameName":"轮盘刮刮乐","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/sro.jpg","Priority":111,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":10,"GameID":590,"GameCode":"essc","PlatformCode":"40003","GameName":"复活节刮刮乐","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/essc.jpg","Priority":123,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":11,"GameID":806,"GameCode":"irmn3sc","PlatformCode":"40003","GameName":"钢铁侠3刮刮乐","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/irmn3sc.jpg","Priority":124,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":12,"GameID":864,"GameCode":"xc_basebullscratch","PlatformCode":"40002","GameName":"棒球刮刮乐","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_basebullscratch.jpg","Priority":134,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":13,"GameID":644,"GameCode":"lom","PlatformCode":"40003","GameName":"爱情比赛刮刮乐","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/lom.jpg","Priority":142,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":14,"GameID":562,"GameCode":"sbj","PlatformCode":"40003","GameName":"21点刮刮乐","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/sbj.jpg","Priority":151,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":15,"GameID":783,"GameCode":"ttcsc","PlatformCode":"40003","GameName":"名人大亨刮刮乐","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/ttcsc.jpg","Priority":152,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":16,"GameID":876,"GameCode":"xc_magicpotscratch","PlatformCode":"40002","GameName":"魔罐刮刮乐","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_magicpotscratch.jpg","Priority":165,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":17,"GameID":877,"GameCode":"xc_monstersscratch","PlatformCode":"40002","GameName":"怪兽刮刮乐","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_monstersscratch.jpg","Priority":184,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":18,"GameID":555,"GameCode":"bbn","PlatformCode":"40003","GameName":"投注宾果","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/bbn.jpg","Priority":193,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":19,"GameID":879,"GameCode":"xc_nonstoppartyscratch","PlatformCode":"40002","GameName":"不间断聚会刮刮乐","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_nonstoppartyscratch.jpg","Priority":202,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":20,"GameID":601,"GameCode":"fbm","PlatformCode":"40003","GameName":"足球刮刮乐","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/fbm.jpg","Priority":208,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":21,"GameID":1110,"GameCode":"5705","PlatformCode":"20009","GameName":"聚宝盆","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BBIN/5705.jpg","Priority":216,"Experience":false,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":22,"GameID":873,"GameCode":"xc_houseofscarescratch","PlatformCode":"40002","GameName":"鬼屋刮刮乐","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_houseofscarescratch.jpg","Priority":220,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":23,"GameID":874,"GameCode":"xc_jourdelamourscratch","PlatformCode":"40002","GameName":"爱的日子刮刮乐游戏","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_jourdelamourscratch.jpg","Priority":221,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":24,"GameID":844,"GameCode":"qbd","PlatformCode":"40003","GameName":"飞镖","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/qbd.jpg","Priority":234,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":25,"GameID":1109,"GameCode":"5704","PlatformCode":"20009","GameName":"斗牛","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BBIN/5704.jpg","Priority":249,"Experience":false,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":26,"GameID":1107,"GameCode":"5701","PlatformCode":"20009","GameName":"连连看","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BBIN/5701.jpg","Priority":250,"Experience":false,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":27,"GameID":865,"GameCode":"xc_bingoscratch","PlatformCode":"40002","GameName":"宾果刮刮乐","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_bingoscratch.jpg","Priority":262,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":28,"GameID":866,"GameCode":"xc_cubanatropicanascratch","PlatformCode":"40002","GameName":"热带古巴刮刮乐游戏","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_cubanatropicanascratch.jpg","Priority":263,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":29,"GameID":846,"GameCode":"rodl","PlatformCode":"40003","GameName":"独家轮盘","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/rodl.jpg","Priority":275,"Experience":false,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":30,"GameID":868,"GameCode":"xc_footballcupscratch","PlatformCode":"40002","GameName":"足球杯赛刮刮乐","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_footballcupscratch.jpg","Priority":311,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":31,"GameID":854,"GameCode":"pbro","PlatformCode":"40003","GameName":"弹球转盘","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/pbro.jpg","Priority":329,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":32,"GameID":1158,"GameCode":"143","PlatformCode":"40005","GameName":"史加彻斯","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BetSoft/143.jpg","Priority":500,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":33,"GameID":1333,"GameCode":"OGS-scratchdrlove","PlatformCode":"40007","GameName":"刮刮乐－爱情医生","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/OGS-scratchdrlove.jpg","Priority":1000,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":34,"GameID":1334,"GameCode":"OGS-scratchdrloveonvacation","PlatformCode":"40007","GameName":"刮刮乐－爱情假日","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/OGS-scratchdrloveonvacation.jpg","Priority":1000,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":35,"GameID":1335,"GameCode":"OGS-scratchemperorsgarden","PlatformCode":"40007","GameName":"刮刮乐－皇庭踏青","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/OGS-scratchemperorsgarden.jpg","Priority":1000,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":36,"GameID":1336,"GameCode":"OGS-scratchfoxinwins","PlatformCode":"40007","GameName":"刮刮乐－狐狸家族","GameCategoryID":4,"GameCategoryName":"刮刮卡","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/OGS-scratchfoxinwins.jpg","Priority":1000,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0}],"Table1":[{"TotalCount":"65"}]}},
      '6': {"Success":true,"Code":"1.0","Message":"成功","Result":{"Table":[{"RowNumber":1,"GameID":1449,"GameCode":"xc_fortunecashout","PlatformCode":"40002","GameName":"财富大冒险","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_fortunecashout.jpg","Priority":10,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":2,"GameID":657,"GameCode":"pso","PlatformCode":"40003","GameName":"点球大战","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/pso.jpg","Priority":26,"Experience":true,"Symbol":null,"Amount":null,"Focus":26,"favorite":0},{"RowNumber":3,"GameID":886,"GameCode":"xc_luckywheel","PlatformCode":"40002","GameName":"幸运转盘","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_luckywheel.jpg","Priority":56,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":4,"GameID":672,"GameCode":"rps","PlatformCode":"40003","GameName":"剪刀石头布","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/rps.jpg","Priority":84,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":5,"GameID":887,"GameCode":"xc_soccershot","PlatformCode":"40002","GameName":"足球点射","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_soccershot.jpg","Priority":97,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":6,"GameID":872,"GameCode":"xc_goldenscratch","PlatformCode":"40002","GameName":"黄金 999.9","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_goldenscratch.jpg","Priority":114,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":7,"GameID":580,"GameCode":"hr","PlatformCode":"40003","GameName":"德比日","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/hr.jpg","Priority":121,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":8,"GameID":622,"GameCode":"head","PlatformCode":"40003","GameName":"掷硬币","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/head.jpg","Priority":122,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":9,"GameID":875,"GameCode":"xc_keno","PlatformCode":"40002","GameName":"基诺","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_keno.jpg","Priority":150,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":10,"GameID":870,"GameCode":"xc_freakythimblesscratch","PlatformCode":"40002","GameName":"多彩猜豆","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_freakythimblesscratch.jpg","Priority":164,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":11,"GameID":673,"GameCode":"rcd","PlatformCode":"40003","GameName":"过山车骰子","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/rcd.jpg","Priority":170,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":12,"GameID":881,"GameCode":"xc_sparkleladiesscratch","PlatformCode":"40002","GameName":"闪耀王后","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_sparkleladiesscratch.jpg","Priority":183,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":13,"GameID":662,"GameCode":"pop","PlatformCode":"40003","GameName":"流行宾果","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/pop.jpg","Priority":190,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":14,"GameID":611,"GameCode":"ghl","PlatformCode":"40003","GameName":"猜扑克牌彩池","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/ghl.jpg","Priority":191,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":15,"GameID":551,"GameCode":"atw","PlatformCode":"40003","GameName":"环游世界","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/atw.jpg","Priority":192,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":16,"GameID":639,"GameCode":"kn","PlatformCode":"40003","GameName":"基诺快乐彩","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/kn.jpg","Priority":207,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":17,"GameID":1123,"GameCode":"5901","PlatformCode":"20009","GameName":"连环夺宝","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BBIN/5901.jpg","Priority":214,"Experience":false,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":18,"GameID":884,"GameCode":"xc_potshot","PlatformCode":"40002","GameName":"曲棍球随手射击","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_potshot.jpg","Priority":218,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":19,"GameID":687,"GameCode":"lwh","PlatformCode":"40003","GameName":"极速百万","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/lwh.jpg","Priority":231,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":20,"GameID":651,"GameCode":"mro","PlatformCode":"40003","GameName":"迷你轮盘","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/mro.jpg","Priority":232,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":21,"GameID":648,"GameCode":"bls","PlatformCode":"40003","GameName":"魔法彩金球","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/bls.jpg","Priority":233,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":22,"GameID":1124,"GameCode":"5902","PlatformCode":"20009","GameName":"糖果派对","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BBIN/5902.jpg","Priority":247,"Experience":false,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":23,"GameID":883,"GameCode":"xc_blackandwhite","PlatformCode":"40002","GameName":"黑与白","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_blackandwhite.jpg","Priority":260,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":24,"GameID":871,"GameCode":"xc_gangstersscratch","PlatformCode":"40002","GameName":"黑帮财宝","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_gangstersscratch.jpg","Priority":261,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":25,"GameID":606,"GameCode":"tps","PlatformCode":"40003","GameName":"弗兰基的神奇七侠","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/tps.jpg","Priority":274,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":26,"GameID":568,"GameCode":"bowl","PlatformCode":"40003","GameName":"保龄猜球游戏","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/bowl.jpg","Priority":327,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":27,"GameID":586,"GameCode":"dctw","PlatformCode":"40003","GameName":"旋转骰子","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/dctw.jpg","Priority":328,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":28,"GameID":1169,"GameCode":"199","PlatformCode":"40005","GameName":"虚幻赛马","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BetSoft/199.jpg","Priority":500,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":29,"GameID":1422,"GameCode":"ashvrth","PlatformCode":"40003","GameName":"虛擬賽馬","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/PlayTech/ashvrth.jpg","Priority":1000,"Experience":false,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":30,"GameID":1423,"GameCode":"pep","PlatformCode":"40003","GameName":"全揽扑克","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/PlayTech/pep.jpg","Priority":1000,"Experience":false,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":31,"GameID":1424,"GameCode":"ashvtrd","PlatformCode":"40003","GameName":"虛擬賽狗","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/PlayTech/ashvtrd.jpg","Priority":1000,"Experience":false,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":32,"GameID":1425,"GameCode":"gtscb","PlatformCode":"40003","GameName":"现金魔块","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/PlayTech/gtscb.jpg","Priority":1000,"Experience":false,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":33,"GameID":1426,"GameCode":"gog","PlatformCode":"40003","GameName":"一击即倒","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/PlayTech/gog.jpg","Priority":1000,"Experience":false,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":34,"GameID":1427,"GameCode":"gts35","PlatformCode":"40003","GameName":"美杜萨","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/PlayTech/gts35.jpg","Priority":1000,"Experience":false,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":35,"GameID":1428,"GameCode":"mnkt","PlatformCode":"40003","GameName":"霹雳神猴","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/PlayTech/mnkt.jpg","Priority":1000,"Experience":false,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":36,"GameID":878,"GameCode":"xc_moonapolisscratch","PlatformCode":"40002","GameName":"月球刮刮乐","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_moonapolisscratch.jpg","Priority":1000,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0}],"Table1":[{"TotalCount":"50"}]}},
      '7': {"Success":true,"Code":"1.0","Message":"成功","Result":{"Table":[{"RowNumber":1,"GameID":1788,"GameCode":"Dragonz","GameName":"幸运龙宝贝","PlatformCode":"40001","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/MG/Dragonz.jpg","Priority":3,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":2,"GameID":1812,"GameCode":"ELK-championsgoal","GameName":"足球宝贝","PlatformCode":"40007","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/ELK-championsgoal.jpg","Priority":5,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":3,"GameID":1797,"GameCode":"ririjc","GameName":"日日进财","PlatformCode":"40003","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/ririjc.jpg","Priority":10,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":4,"GameID":554,"GameCode":"bl","GameName":"海滨嘉年华","PlatformCode":"40003","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/bl.jpg","Priority":14,"Experience":false,"Symbol":"￥","Amount":2859336.3600,"Focus":14,"favorite":0},{"RowNumber":5,"GameID":1802,"GameCode":"OGS-fiestacubana","GameName":"热辣古巴","PlatformCode":"40007","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/OGS-fiestacubana.jpg","Priority":15,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":6,"GameID":1512,"GameCode":"619","GameName":"圣诞颂歌","PlatformCode":"40005","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Betsoft/619.jpg","Priority":30,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":7,"GameID":574,"GameCode":"cifr","GameName":"全景电影","PlatformCode":"40003","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/cifr.jpg","Priority":33,"Experience":false,"Symbol":"￥","Amount":321035.4200,"Focus":33,"favorite":0},{"RowNumber":8,"GameID":667,"GameCode":"pbj","GameName":"乐透21点","PlatformCode":"40003","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/pbj.jpg","Priority":48,"Experience":true,"Symbol":"￥","Amount":803507.7800,"Focus":null,"favorite":0},{"RowNumber":9,"GameID":1198,"GameCode":"344","GameName":"虎机老爷","PlatformCode":"40005","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BetSoft/344.jpg","Priority":55,"Experience":true,"Symbol":null,"Amount":null,"Focus":40,"favorite":0},{"RowNumber":10,"GameID":1197,"GameCode":"341","GameName":"贪婪妖精","PlatformCode":"40005","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BetSoft/341.jpg","Priority":60,"Experience":true,"Symbol":null,"Amount":null,"Focus":41,"favorite":0},{"RowNumber":11,"GameID":1203,"GameCode":"426","GameName":"淑女魔姬","PlatformCode":"40005","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BetSoft/426.jpg","Priority":65,"Experience":true,"Symbol":null,"Amount":null,"Focus":42,"favorite":0},{"RowNumber":12,"GameID":615,"GameCode":"grel","GameName":"黄金反弹","PlatformCode":"40003","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/grel.jpg","Priority":76,"Experience":false,"Symbol":"￥","Amount":1701235.1000,"Focus":null,"favorite":0},{"RowNumber":13,"GameID":1210,"GameCode":"534","GameName":"钻光灿影","PlatformCode":"40005","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BetSoft/534.jpg","Priority":80,"Experience":true,"Symbol":null,"Amount":null,"Focus":25,"favorite":0},{"RowNumber":14,"GameID":1171,"GameCode":"210","GameName":"赌场大亨","PlatformCode":"40005","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BetSoft/210.jpg","Priority":85,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":15,"GameID":537,"GameCode":"jb10p","GameName":"十线对 J 高手","PlatformCode":"40003","GameCategoryID":1,"GameCategoryName":"视频扑克","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/jb10p.jpg","Priority":180,"Experience":false,"Symbol":"￥","Amount":38663.5900,"Focus":null,"favorite":0},{"RowNumber":16,"GameID":648,"GameCode":"bls","GameName":"魔法彩金球","PlatformCode":"40003","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/bls.jpg","Priority":233,"Experience":true,"Symbol":"￥","Amount":287279.3700,"Focus":null,"favorite":0},{"RowNumber":17,"GameID":1186,"GameCode":"258","GameName":"天使传奇","PlatformCode":"40005","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BetSoft/258.jpg","Priority":500,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":18,"GameID":1194,"GameCode":"300","GameName":"科帕酒店","PlatformCode":"40005","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BetSoft/300.jpg","Priority":500,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":19,"GameID":1139,"GameCode":"41","GameName":"巨奖旋风","PlatformCode":"40005","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BetSoft/41.jpg","Priority":500,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":20,"GameID":1200,"GameCode":"351","GameName":"浪漫巴黎","PlatformCode":"40005","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BetSoft/351.jpg","Priority":500,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":21,"GameID":1212,"GameCode":"554","GameName":"奢丽人生","PlatformCode":"40005","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BetSoft/554.jpg","Priority":500,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":22,"GameID":1500,"GameCode":"gesjp","GameName":"艺伎故事积宝游戏","PlatformCode":"40003","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/gesjp.jpg","Priority":500,"Experience":true,"Symbol":"￥","Amount":419370.1700,"Focus":null,"favorite":0},{"RowNumber":23,"GameID":1207,"GameCode":"504","GameName":"金星异客","PlatformCode":"40005","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BetSoft/504.jpg","Priority":500,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":24,"GameID":1502,"GameCode":"sisjp","GameName":"忍者风云积宝游戏","PlatformCode":"40003","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/sisjp.jpg","Priority":600,"Experience":true,"Symbol":"￥","Amount":419370.1700,"Focus":null,"favorite":0},{"RowNumber":25,"GameID":1503,"GameCode":"wlgjp","GameName":"舞龙积宝游戏","PlatformCode":"40003","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/wlgjp.jpg","Priority":600,"Experience":true,"Symbol":"￥","Amount":419370.1700,"Focus":null,"favorite":0},{"RowNumber":26,"GameID":1798,"GameCode":"QS-geniestouch","GameName":"阿拉丁神灯","PlatformCode":"40007","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/QS-geniestouch.jpg","Priority":999,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":27,"GameID":1799,"GameCode":"QS-jewelblast","GameName":"宝石爆炸","PlatformCode":"40007","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/QS-jewelblast.jpg","Priority":999,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":28,"GameID":1800,"GameCode":"QS-kingcolossus","GameName":"国王巨像","PlatformCode":"40007","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/QS-kingcolossus.jpg","Priority":999,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":29,"GameID":1801,"GameCode":"QS-secondstrike","GameName":"连环炮","PlatformCode":"40007","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/QS-secondstrike.jpg","Priority":999,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":30,"GameID":1813,"GameCode":"ELK-djwild","GameName":"狂野DJ","PlatformCode":"40007","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/ELK-djwild.jpg","Priority":999,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":31,"GameID":1814,"GameCode":"ELK-electricsam","GameName":"美女和野兽","PlatformCode":"40007","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/ELK-electricsam.jpg","Priority":999,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":32,"GameID":1815,"GameCode":"ELK-poltava","GameName":"波尔塔瓦之战","PlatformCode":"40007","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/ELK-poltava.jpg","Priority":999,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":33,"GameID":1816,"GameCode":"ELK-tacobrothers","GameName":"塔科兄弟","PlatformCode":"40007","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/ELK-tacobrothers.jpg","Priority":999,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":34,"GameID":1817,"GameCode":"ELK-thelab","GameName":"神奇实验室","PlatformCode":"40007","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/ELK-thelab.jpg","Priority":999,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":35,"GameID":1803,"GameCode":"HAB-3handblackjack","GameName":"三手黑杰克","PlatformCode":"40007","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/HAB-3handblackjack.jpg","Priority":999,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":36,"GameID":1804,"GameCode":"HAB-3handblackjackdoubleexposure","GameName":"三手黑杰克双重曝光","PlatformCode":"40007","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/HAB-3handblackjackdoubleexposure.jpg","Priority":999,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0}],"Table1":[{"TotalCount":"66"}]}},
      '-1': {"Success":true,"Code":"1.0","Message":"成功","Result":{"Table":[{"RowNumber":1,"GameID":1061,"GameCode":"5049","GameName":"玉蒲团","PlatformCode":"20009","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BBIN/5049.jpg","Priority":1,"Experience":false,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":2,"GameID":804,"GameCode":"irmn3","GameName":"钢铁侠3","PlatformCode":"40003","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/irmn3.jpg","Priority":2,"Experience":true,"Symbol":null,"Amount":null,"Focus":2,"favorite":0},{"RowNumber":3,"GameID":1021,"GameCode":"nian_k","GameName":"年年有余","PlatformCode":"40003","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/nian_k.jpg","Priority":3,"Experience":false,"Symbol":null,"Amount":null,"Focus":3,"favorite":0},{"RowNumber":4,"GameID":1788,"GameCode":"Dragonz","GameName":"幸运龙宝贝","PlatformCode":"40001","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/MG/Dragonz.jpg","Priority":3,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":5,"GameID":817,"GameCode":"zcjb","GameName":"招财进宝","PlatformCode":"40003","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/zcjb.jpg","Priority":4,"Experience":true,"Symbol":null,"Amount":null,"Focus":4,"favorite":0},{"RowNumber":6,"GameID":1023,"GameCode":"xc_doublebonusslots","GameName":"双重奖励老虎机","PlatformCode":"40002","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_doublebonusslots.jpg","Priority":5,"Experience":true,"Symbol":null,"Amount":null,"Focus":5,"favorite":0},{"RowNumber":7,"GameID":1812,"GameCode":"ELK-championsgoal","GameName":"足球宝贝","PlatformCode":"40007","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/ELK-championsgoal.jpg","Priority":5,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":8,"GameID":1501,"GameCode":"lndg","GameName":"遍地黄金","PlatformCode":"40003","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/lndg.jpg","Priority":5,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":9,"GameID":1549,"GameCode":"BaccaratGold","GameName":"金牌百家乐","PlatformCode":"40001","GameCategoryID":2,"GameCategoryName":"桌面游戏","ImgUrl":"http://image.vwin.com/TemplateFile/Games/MG/BaccaratGold.jpg","Priority":5,"Experience":true,"Symbol":null,"Amount":null,"Focus":5,"favorite":0},{"RowNumber":10,"GameID":1020,"GameCode":"fcgz","GameName":"翡翠公主","PlatformCode":"40003","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/fcgz.jpg","Priority":6,"Experience":false,"Symbol":null,"Amount":null,"Focus":6,"favorite":0},{"RowNumber":11,"GameID":596,"GameCode":"fnf","GameName":"神奇四侠","PlatformCode":"40003","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/fnf.jpg","Priority":7,"Experience":true,"Symbol":null,"Amount":null,"Focus":7,"favorite":0},{"RowNumber":12,"GameID":801,"GameCode":"avng","GameName":"复仇者联盟","PlatformCode":"40003","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/avng.jpg","Priority":8,"Experience":true,"Symbol":null,"Amount":null,"Focus":8,"favorite":0},{"RowNumber":13,"GameID":618,"GameCode":"bib","GameName":"碧海蓝天","PlatformCode":"40003","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/bib.jpg","Priority":9,"Experience":true,"Symbol":null,"Amount":null,"Focus":9,"favorite":0},{"RowNumber":14,"GameID":803,"GameCode":"spidc","GameName":"蜘蛛侠","PlatformCode":"40003","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/spidc.jpg","Priority":10,"Experience":true,"Symbol":null,"Amount":null,"Focus":10,"favorite":0},{"RowNumber":15,"GameID":1202,"GameCode":"402","GameName":"弹弹糖","PlatformCode":"40005","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BetSoft/402.jpg","Priority":10,"Experience":true,"Symbol":null,"Amount":null,"Focus":5,"favorite":0},{"RowNumber":16,"GameID":1449,"GameCode":"xc_fortunecashout","GameName":"财富大冒险","PlatformCode":"40002","GameCategoryID":6,"GameCategoryName":"游戏厅","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_fortunecashout.jpg","Priority":10,"Experience":true,"Symbol":null,"Amount":null,"Focus":null,"favorite":0},{"RowNumber":17,"GameID":1554,"GameCode":"bikiniparty","GameName":"比基尼派对","PlatformCode":"40001","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/MG/bikiniparty.jpg","Priority":10,"Experience":true,"Symbol":null,"Amount":null,"Focus":10,"favorite":0},{"RowNumber":18,"GameID":1797,"GameCode":"ririjc","GameName":"日日进财","PlatformCode":"40003","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/ririjc.jpg","Priority":10,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":19,"GameID":694,"GameCode":"hlk50","GameName":"绿巨人50线","PlatformCode":"40003","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/hlk50.jpg","Priority":11,"Experience":true,"Symbol":null,"Amount":null,"Focus":11,"favorite":0},{"RowNumber":20,"GameID":1127,"GameCode":"xc_eastwindbattleslots","GameName":"战东风","PlatformCode":"40002","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_eastwindbattleslots.jpg","Priority":12,"Experience":true,"Symbol":null,"Amount":null,"Focus":12,"favorite":0},{"RowNumber":21,"GameID":1509,"GameCode":"654","GameName":"笨笨鸟","PlatformCode":"40005","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Betsoft/654.jpg","Priority":12,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":22,"GameID":610,"GameCode":"fm","GameName":"疯狂的猴子","PlatformCode":"40003","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/fm.jpg","Priority":13,"Experience":true,"Symbol":null,"Amount":null,"Focus":13,"favorite":0},{"RowNumber":23,"GameID":554,"GameCode":"bl","GameName":"海滨嘉年华","PlatformCode":"40003","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/bl.jpg","Priority":14,"Experience":false,"Symbol":"￥","Amount":2859336.3600,"Focus":14,"favorite":0},{"RowNumber":24,"GameID":1019,"GameCode":"xc_pipezillasslots","GameName":"管道精灵","PlatformCode":"40002","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_pipezillasslots.jpg","Priority":15,"Experience":true,"Symbol":null,"Amount":null,"Focus":15,"favorite":0},{"RowNumber":25,"GameID":1802,"GameCode":"OGS-fiestacubana","GameName":"热辣古巴","PlatformCode":"40007","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/NYX/OGS-fiestacubana.jpg","Priority":15,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":26,"GameID":1581,"GameCode":"dragondance","GameName":"舞龙舞狮","PlatformCode":"40001","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/MG/dragondance.jpg","Priority":15,"Experience":true,"Symbol":null,"Amount":null,"Focus":15,"favorite":0},{"RowNumber":27,"GameID":1126,"GameCode":"xc_mayawheelofluckslots","GameName":"玛雅幸运轮","PlatformCode":"40002","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_mayawheelofluckslots.jpg","Priority":16,"Experience":true,"Symbol":null,"Amount":null,"Focus":16,"favorite":0},{"RowNumber":28,"GameID":800,"GameCode":"cam","GameName":"美国队长-复仇","PlatformCode":"40003","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/cam.jpg","Priority":17,"Experience":true,"Symbol":null,"Amount":null,"Focus":17,"favorite":0},{"RowNumber":29,"GameID":835,"GameCode":"wlg","GameName":"舞龙","PlatformCode":"40003","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/wlg.jpg","Priority":18,"Experience":true,"Symbol":null,"Amount":null,"Focus":18,"favorite":0},{"RowNumber":30,"GameID":1508,"GameCode":"647","GameName":"弗兰肯怪物","PlatformCode":"40005","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Betsoft/647.jpg","Priority":18,"Experience":true,"Symbol":null,"Amount":null,"Focus":1,"favorite":0},{"RowNumber":31,"GameID":617,"GameCode":"gos","GameName":"黄金之旅","PlatformCode":"40003","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/gos.jpg","Priority":19,"Experience":true,"Symbol":null,"Amount":null,"Focus":19,"favorite":0},{"RowNumber":32,"GameID":795,"GameCode":"fnfrj","GameName":"酷炫水果","PlatformCode":"40003","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/Playtech/fnfrj.jpg","Priority":20,"Experience":false,"Symbol":null,"Amount":null,"Focus":20,"favorite":0},{"RowNumber":33,"GameID":1597,"GameCode":"GirlsWithGunsFrozenDawn","GameName":"女孩与枪:极地战争","PlatformCode":"40001","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/MG/GirlsWithGunsFrozenDawn.jpg","Priority":20,"Experience":true,"Symbol":null,"Amount":null,"Focus":20,"favorite":0},{"RowNumber":34,"GameID":1190,"GameCode":"277","GameName":"马亚传奇","PlatformCode":"40005","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/BetSoft/277.jpg","Priority":20,"Experience":true,"Symbol":null,"Amount":null,"Focus":10,"favorite":0},{"RowNumber":35,"GameID":1017,"GameCode":"xc_firecrackerslots","GameName":"幸运星空","PlatformCode":"40002","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_firecrackerslots.jpg","Priority":21,"Experience":true,"Symbol":null,"Amount":null,"Focus":21,"favorite":0},{"RowNumber":36,"GameID":1128,"GameCode":"xc_mavericksaloonslots","GameName":"独行酒吧","PlatformCode":"40002","GameCategoryID":3,"GameCategoryName":"老虎机","ImgUrl":"http://image.vwin.com/TemplateFile/Games/GamesOS/xc_mavericksaloonslots.jpg","Priority":22,"Experience":true,"Symbol":null,"Amount":null,"Focus":34,"favorite":0}],"Table1":[{"TotalCount":"1016"}]}}
    };
    var d = data[e.GameCategoryID];
    if (d.Success) {
      a.gameList = p(d.Result.Table);
      for (var n = 0; n < a.gameList.length; n++) {
        a.gameList[n].GameName = u(a.gameList[n].GameName, 24);
      }
      var s = d.Result.Table1[0] ? parseInt(d.Result.Table1[0].TotalCount, 10) : 0;
      a.totalPage = s > 0 ? Math.floor((s - 1) / y) + 1 : 0;
      for (var n = 0; n < a.gameCategories.length; n++) {
        if(a.gameCategories[n] === a.selectedCategory) {
          a.selectedCategory.GameCategoryCount = s;
          a.gameCategories[n] = a.selectedCategory;
        }
      }
    }
    h(!1);
  };
  a.onPlatformSelected = function(e) {
    e != a.selectedPlatform && (a.selectedPage = 0, a.selectedPlatform = e, updateGameList()), $(".game-platform span").eq(0).text(e.platformName), $(".game-platform ul").slideUp()
  };
  a.onPageClicked = function(e) {
    a.selectedPage = e;
    v();
    $(window).scrollTop($(".game-list-menu").offset().top);
  };
  a.onNextPage = function() {
    a.selectedPage++;
    v();
    $(window).scrollTop($(".game-list-menu").offset().top);
  };
  a.onPrevPage = function() {
    a.selectedPage--;
    v();
    $(window).scrollTop($(".game-list-menu").offset().top);
  };
  a.onPlayBtnClicked = function(e, t, o, n) {
    a.isLoggedIn || "0" !== e ? window.open("#/games/playground?gameCode=" + t + "&gameCategoryID=" + o + "&platformCode=" + n + "&accountID=" + a.accountId + "&gameMode=" + e, "Playground") : i.needLogin()
  };
  a.onDownloadGame = function(e) {
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
  a.searchString = "";
  a.searchGames = function() {
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
  };
  a.onMenuMouseEnter = function(e, t) {
    var o = e.currentTarget;
    $(o).hasClass("active") || ($(o).children("p").html(t.GameCategoryCount.toString()), $(o).children("p").counterUp({
      delay: 10,
      time: 200
    }))
  };
  a.onMenuMouseLeave = function(e, t) {
    var o = e.currentTarget;
    $(o).hasClass("active") || $(o).children("p").html(t.GameCategoryCount.toString())
  };
  a.onPlatformMenuClicked = function() {
    $(".game-platform ul").is(":visible") ? ($(".game-platform ul").slideUp(), g("game-platformMask")) : ($(".game-platform ul").slideDown(), m("game-platformMask"), $(".game-platformMask").css("z-index", 1))
  }, $(document).on("click", ".game-platformMask", function() {
    $(".game-platform ul").slideUp(), g("game-platformMask")
  });
  a.addPlayButtonEffects = function() {
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
  };
  a.addTopFiveButtonEffects = function() {
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
  };
  a.$on("$destroy", function(e) {
    n.cancel(S), n.cancel(k)
  });
  a.customizeGameHero = function() {
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
  };
  a.onBetsoftBetButton = function() {
    a.isLoggedIn ? window.open("#/games/playground?gameCode=402&gameCategoryID=3&platformCode=40005&accountID=" + a.accountId + "&gameMode=0", "Playground") : window.open("#/games/playground?gameCode=402&gameCategoryID=3&platformCode=40005&accountID=&gameMode=1", "Playground")
  }
}]);