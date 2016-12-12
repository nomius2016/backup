angular.module('ciApp')
  .controller('homeContentCtrl', ["$scope", "AccountService", "appServices", "Container", "Config", "PlatformService", "Storage", function($scope, AccountService, appServices, Container, Config, PlatformService, Storage) {
    function initGbPlatform() {
      try {
        if (GbPlatform !== undefined) {
          $(".sport-game-1:eq(1)").children(".team-bg:eq(0)").before('<div class="sport-game-gap"><img src="/static/v1/images/index-con1-6-img-2.png"> </div>');
          var e = "00002";
          switch ($scope.userLang.toLowerCase()) {
            case "en-us":
              e = "00001";
              break;
            case "zh-cn":
            case "zh-tw":
            case "th-tn":
              e = "00002";
              break;
            case "vi-vn":
              e = "00003"
          }
          GbPlatform.Idx.options.gbUrl = gbURL;
          GbPlatform.Idx.options.tpid = Container.getRelease() ? "001" : "901";
          GbPlatform.Idx.options.lang = $scope.userLang;
          GbPlatform.Idx.options.oddstype = e;
          GbPlatform.Idx.options.token = '';
          GbPlatform.Idx.bind(updateView);
          GbPlatform.Idx.push = updateView;
        }
      } catch (t) {}
    }

    function updateView(e) {
      if ("undefined" == e) {
        return setTimeout(customFetchData, 300);
      }
      for (var t = 0; t < e.length; t++) {
        var a = e[t];
        if (0 == a.TP) {
          $(".sport-game-1 .Prematch:eq(" + t + ")").css("display", "inline-block");
          $(".sport-game-1 .Live:eq(" + t + ")").css("display", "none");
          var o = new Date(a.ETime);
          $(".sport-game-1 .ETime:eq(" + t + ")").text(o.formatDate("MM/dd HH:mm"));
        } else {
          $(".sport-game-1 .Live:eq(" + t + ")").css("display", "inline-block");
          $(".sport-game-1 .Prematch:eq(" + t + ")").css("display", "none");
          var i = a.Score;
          var n = i.split(":")[0] || "0";
          var s = i.split(":")[1] || "0";
          $(".sport-game-1 .score-left:eq(" + t + ")").html(getScoreScript(n));
          $(".sport-game-1 .score-right:eq(" + t + ")").html(getScoreScript(s));
        }
        var r = a.SPVB.replace(/\+/g, '').replace(/\.0/g, '');
        $(".sport-game-1 .SPV:eq(" + t + ")").text(r);
        var c = '';
        var l = '';
        if (a.SC == '00001') {
          c = "/static/v1/images/team-sample-1.png";
          l = "/static/v1/images/team-sample-2.png";
        } else {
          c = "/static/v1/images/team-sample-3.png";
          l = "/static/v1/images/team-sample-4.png"
        }
        if ("0" != a.ImgA) {
          c = gbURL + a.ImgA;
        }
        if ("0" != a.ImgB) {
          l = gbURL + a.ImgB;
        }
        $(".sport-game-1 .ImgA:eq(" + t + ")").attr("src", c);
        $(".sport-game-1 .ImgAbg:eq(" + t + ")").attr("src", c);
        $(".sport-game-1 .ImgB:eq(" + t + ")").attr("src", l);
        $(".sport-game-1 .ImgBbg:eq(" + t + ")").attr("src", l);
        $(".sport-game-1 .ImgA:eq(" + t + ")").css({
          width: "48px",
          height: "48px"
        });
        $(".sport-game-1 .ImgB:eq(" + t + ")").css({
          width: "48px",
          height: "48px"
        });
        $(".sport-game-1 .TA:eq(" + t + ")").text(a.TA);
        $(".sport-game-1 .TB:eq(" + t + ")").text(a.TB);
        $(".sport-game-1 .TN:eq(" + t + ")").text(a.TN);
        $(".sport-game-1 .RteA:eq(" + t + ")").text(a.RteA);
        $(".sport-game-1 .RteB:eq(" + t + ")").text(a.RteB);
      }
    }

    function customFetchData() {
      if (GbPlatform.data === undefined) {
        setTimeout(customFetchData, 300);
      } else {
        updateView(GbPlatform.data);
      }
    }

    function getScoreScript(e) {
      var t = e.length;
      if (t < 2) {
        t = 2;
      }
      e = padLeft(e, t);
      for (var a = '', o = 0; o < t; o++) {
        a += scoreImage.replace("{0}", e.substr(o, 1));
      }
      return a;
    }

    function padLeft(e, t) {
      return e.length >= t ? e : padLeft("0" + e, t)
    }
    $scope.userLang = Container.getLang() || "zh-cn";
    var scoreImage = '<img src="/static/v1/images/icon-socre-{0}.png">';
    var gbURL = Container.getRelease() ? appServices.getCombinedUrl(Config.gbplatform_release) : Config.gbplatform_local;
    if (Container.getGbPlatform()) {
      try {
        if (GbPlatform !== undefined) {
          GbPlatform.Idx.options.lang = $scope.userLang;
          GbPlatform.Idx.bind(updateView);
          GbPlatform.Idx.push = updateView;
        }
      } catch (e) {}
    } else {
      var gbJsUrl = gbURL + "/js/GbPlatform.js";
      appServices.loadScript(gbJsUrl, initGbPlatform);
      Container.setGbPlatform(!0);
    }
    $scope.casinoStages = [{
      name: "home@game_ag",
      image: "/static/v1/images/index-con1-1-img-ag.png",
      platformCode: "20006",
      openWindowName: "AG",
      openWindowSpecs: "resizable=1,width=746,height=640"
    }, {
      name: "home@game_opus",
      image: "/static/v1/images/index-con1-1-img-opus.png",
      platformCode: "20004",
      openWindowName: "OPUS",
      openWindowSpecs: "resizable=1,width=1050,height=620,resizable=yes"
    }, {
      name: "home@game_gd",
      image: "/static/v1/images/index-con1-1-img-gd.png",
      platformCode: "20008",
      openWindowName: "GD",
      openWindowSpecs: "resizable=1,width=1050,height=780,resizable=yes"
    }, {
      name: "home@game_gpi",
      image: "/static/v1/images/index-con1-1-img-gpi.png",
      platformCode: "20007",
      openWindowName: "W88",
      openWindowSpecs: "resizable=1,width=1050,height=780"
    }, {
      name: "home@game_pt",
      image: "/static/v1/images/index-con1-1-img-pt.png",
      platformCode: "40003",
      openWindowName: "PlayTechWindow",
      openWindowSpecs: "resizable=1,menubar=no,status=no,scrollbars=yes,top=50,left=100,toolbar=no,width=1000,height=650"
    }, {
      name: "home@game_ea",
      image: "/static/v1/images/index-con1-1-img-ea.png",
      platformCode: "20001",
      openWindowName: "EA",
      openWindowSpecs: "resizable=1,width=1050,height=780"
    }, {
      name: "home@game_ev",
      image: "/static/v1/images/index-con1-1-img-ev.png",
      platformCode: "20002",
      openWindowName: "EV",
      openWindowSpecs: "resizable=1,width=746,height=640"
    }, {
      name: "home@game_bbin",
      image: "/static/v1/images/index-con1-1-img-bbin.png",
      platformCode: "20009",
      openWindowName: "BBIN",
      openWindowSpecs: "resizable=1,width=1050,height=780,resizable=yes"
    }];
    $scope.clickOnCasino = function(index) {
      if (Container.getAuthStatus()) {
        var casinoItem = $scope.casinoStages[index];
        var playWindow = window.open("about:blank", casinoItem.openWindowName, casinoItem.openWindowSpecs);
        if (index === 1) {
          AccountService.call("Password_TokenCode_3rdParty", {
            intBrandID: 2,
            strMainAccountID: Container.getUserName(),
            strPlatformCode: "20004"
          }).success(function(e) {
            if (e.Success) {
              for (var t = appServices.getDomainName().split("."); t.length > 2;) {
                t.shift('');
              }
              Storage.putCookie("s", e.Result[0].TokenCode, {
                domain: t.join(".")
              });
            }
            PlatformService.call("PlayGame", {
              PlatformCode: "20004",
              Domain: appServices.getDomainName(),
              LanguageCode: Container.getLang(),
              PlayMode: "1"
            }).success(function(e) {
              if (e.Success) {
                Storage.putCookie("selectedLanguage", e.Result[0].Lang, {
                  domain: t.join(".")
                });
                playWindow.location.href = e.Result[0].GameURL;
              }
            })
          });
        } else if (index === 4) {
          PlatformService.call("PlayGame", {
            PlatformCode: "40003",
            GameCode: "7bal",
            Domain: appServices.getDomainName(),
            LanguageCode: Container.getLang(),
            PlayMode: "1",
            WebSiteMode: "1",
            Merchant: "VWin"
          }).success(function(e) {
            if (e.Success) {
              playWindow.location.href = e.Result;
            }
          });
        } else {
          PlatformService.call("PlayGame", {
            PlatformCode: casinoItem.platformCode,
            Domain: appServices.getDomainName(),
            LanguageCode: Container.getLang(),
            PlayMode: "1"
          }).success(function(result) {
            if (result.Success)
              if (7 === index) {
                playWindow.document.body.innerHTML = result.Result;
                if (playWindow.document.getElementById("post_form")) {
                  playWindow.document.getElementById("post_form").submit();
                } else {
                  playWindow.close();
                  var jsString = result.Result.substring(result.Result.indexOf("javascript>") + "javascript>".length, result.Result.indexOf("</script>"));
                  eval(jsString);
                }
              } else {
                playWindow.location.href = result.Result;
              }
          });
        }
      } else {
        appServices.needLogin();
      }
    };
    $(".con1-1").mouseenter(function() {
      $(this).children(".casino-on").animate({
        opacity: 1
      }, 250);
    });
    $(".con1-1").mouseleave(function() {
      $(this).children(".casino-on").animate({
        opacity: 0
      }, 250);
    });
    $scope.casinoMouseEnterEffect = function(e) {
      var _this = $(".casino-con ul li:nth-child(" + e + ") a");
      var _boxWidth = _this.children("div").width();
      var _boxHeight = _this.children("div").height();
      var _brandWidth = _this.children("div").children("span").width();
      var _brandHeight = _this.children("div").children("span").height();
      var _brandMoveReight = (_boxWidth - _brandWidth) / 2;
      _this.children("div").children("span").stop().animate({
        right: _brandMoveReight
      }, 500);
      var t = $("<span>", {
        "class": "lightTop"
      });
      var a = $("<span>", {
        "class": "lightRight"
      });
      var o = $("<span>", {
        "class": "lightBottom"
      });
      var i = $("<span>", {
        "class": "lightLeft"
      });
      _this.append(t).children(".lightTop").append("<img src=/static/v1/images/index-con1-1-light-1.png>");
      _this.append(a).children(".lightRight").append("<img src=/static/v1/images/index-con1-1-light-2.png>");
      _this.append(o).children(".lightBottom").append("<img src=/static/v1/images/index-con1-1-light-1.png>");
      _this.append(i).children(".lightLeft").append("<img src=/static/v1/images/index-con1-1-light-2.png>");
      _this.children(".lightTop").animate({
        left: _boxWidth / 2,
        opacity: 1
      }, 150).animate({
        left: _boxWidth,
        opacity: 0
      }, 150), _this.children(".lightRight").animate({
        bottom: _boxHeight / 2,
        opacity: 1
      }, 150).animate({
        bottom: _boxHeight,
        opacity: 0
      }, 150), _this.children(".lightBottom").delay(200).animate({
        right: _boxWidth / 2,
        opacity: 1
      }, 150).animate({
        right: _boxWidth,
        opacity: 0
      }, 150), _this.children(".lightLeft").delay(200).animate({
        top: _boxHeight / 2,
        opacity: 1
      }, 150).animate({
        top: _boxHeight,
        opacity: 0
      }, 150);
    };
    $scope.casinoMouseLeaveEffect = function(e) {
      var _this = $(".casino-con ul li:nth-child(" + e + ") a");
      _this.children("span").remove();
      _this.children("div").children("span").stop().animate({
        right: "-4px"
      }, 500);
    };
    $(".zoom").mouseenter(function() {
      var _this = $(this);
      var _img = _this.children(".zoom-img").children("img");
      var _btn = _this.find(".btn-1");
      var _text = _this.children(".con1-text").children("p");
      var _imgWidth = _this.children(".zoom-img").width();
      var _imgHeight = _this.children(".zoom-img").height();
      var _imgWidthBig = 1.2 * _this.children(".zoom-img").children(".zoom-bg").width();
      var _imgHeightBig = 1.2 * _this.children(".zoom-img").children(".zoom-bg").height();
      _btn.stop().animate({
        opacity: 1
      }, 100);
      _text.css("color", "#f8efd2");
      _this.children(".zoom-img").children("div").stop().animate({
        opacity: 1
      }, 100);
      _img.parent(".zoom-img").css({
        width: _imgWidth,
        height: _imgHeight,
        overflow: "hidden",
        position: " relative"
      });
      _img.css({
        "max-width": "none",
        "max-height": "none",
        width: _imgWidth,
        height: _imgHeight
      }).stop().animate({
        width: _imgWidthBig,
        height: _imgHeightBig,
        marginTop: -(.1 * _imgWidth),
        marginLeft: -(.1 * _imgHeight)
      }, 100);
    });
    $(".zoom").mouseleave(function() {
      var _this = $(this);
      var _img = _this.children(".zoom-img").children("img");
      var _btn = _this.find(".btn-1");
      var _text = _this.children(".con1-text").children("p");
      _text.css("color", "#ffffff");
      var _imgWidth = _this.children(".zoom-img").children(".zoom-bg").width();
      var _imgHeight = _this.children(".zoom-img").children(".zoom-bg").height();
      _this.children(".zoom-img").children("div").stop().animate({
        opacity: 0
      }, 100);
      _btn.stop().animate({
        opacity: 0
      }, 100);
      _img.stop().animate({
        width: _imgWidth,
        height: _imgHeight,
        marginTop: "0px",
        marginLeft: "0px"
      }, 100, function() {})
    });
    $(window).resize(function() {
      $(".zoom").children(".zoom-img").children("img").css({
        "max-width": "100%",
        "max-height": "100%",
        width: "auto",
        height: "auto"
      }).parent(".zoom-img").css({
        width: '',
        height: ''
      });
    });
    $(".sport-game-1").hover(function() {
      $(this).find(".score").stop().animate({
        opacity: 0
      }, 200);
      $(this).find(".score-btn").stop().animate({
        opacity: 1
      }, 200);
      if (!jQuery.support.leadingWhitespace) {
        if ("inline-block" == $(this).find(".Live").css("display")) {
          current_type = ".Live";
        } else {
          current_type = ".Prematch";
        }
        $(this).find(".score-btn").css("display", "inline-block");
        $(this).find(current_type).css("display", "none");
      }
    }, function() {
      $(this).find(".score").stop().animate({
        opacity: 1
      }, 200);
      $(this).find(".score-btn").stop().animate({
        opacity: 0
      }, 200);
      if (!jQuery.support.leadingWhitespace) {
        $(this).find(".score-btn").css("display", "none");
        if ('' != current_type) {
          $(this).find(current_type).css("display", "inline-block");
        }
      }
    });
    $scope.$on("$destroy", function() {
      try {
        if (GbPlatform) {
          GbPlatform.Idx.bind(null);
          GbPlatform.Idx.push = null;
        }
      } catch (e) {}
    });
  }]);
