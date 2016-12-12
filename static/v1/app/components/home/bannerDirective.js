angular.module('ciApp').directive('banner', ['$compile', '$state', 'Container', 'appServices', 'TemplateService', 'BRAND_ID', function($compile, $state, Container, appServices, TemplateService, BRAND_ID) {
  return {
    templateUrl: '/static/v1/app/components/home/banner.html',
    restrict: 'A',
    scope: {},
    link: function(e, s) {
      function r() {
        for (var e = $(".hero-kv li"), t = 0; t < e.length; t++) 0 === t ? $(e[t]).addClass("slide-active") : $(e[t]).css("display", "none")
      }

      function c() {
        var e = $("#hero_nav").width();
        $("#hero_nav").css("margin-left", -e / 2);
        var t = $("#hero_nav li");
        t.length > 0 && $(t[0]).addClass("heroNavActive"), $(".adSlider li").hoverIntent({
          interval: 200,
          over: function() {
            clearTimeout(p);
            var e = $(this).index(),
              t = $(".hero-kv ul li.slide-active"),
              a = t.index();
            $(".adSlider li").eq(e).parent().children().removeClass("heroNavActive"), $(".adSlider li").eq(e).addClass("heroNavActive"), e > a ? (t.removeClass("slide-active").stop().animate({
              left: "-1920px"
            }, 800, function() {
              $(this).hide()
            }), $(".hero-kv ul li").eq(e).addClass("slide-active").stop().show().css("left", "1920px").animate({
              left: "0"
            }, 800)) : e < a && (t.removeClass("slide-active").stop().animate({
              left: "1920px"
            }, 800, function() {
              $(this).hide()
            }), $(".hero-kv ul li").eq(e).addClass("slide-active").stop().show().css("left", "-1920px").animate({
              left: "0"
            }, 800))
          },
          timeout: 200,
          out: function() {
            p = setTimeout(u, 5e3)
          }
        })
      }

      function l() {
        $(".btnRegister").bind("click", function() {
          o.needRegister()
        }), $(".btnLogin").bind("click", function() {
          o.needLogin()
        }), $(".btnPromotion").bind("click", function() {
          t.go("promotion")
        }), $(".btnDepositWechat").bind("click", function() {
          t.go("member.bank", {
            method: "deposit",
            way: "wechat"
          })
        })
      }

      function u(e) {
        g(), m(), p = setTimeout(u, 5e3)
      }

      function d() {
        var e = $(".adSlider li.heroNavActive").index() - 1;
        e < 0 && (e = $(".adSlider li").length - 1), $(".hero-kv ul").children(".slide-active").stop().animate({
          left: "1920px"
        }, 800), $(".hero-kv ul").children().removeClass("slide-active"), $(".hero-kv ul li").eq(e).addClass("slide-active").stop().show().css("left", "-1920px").animate({
          left: "0"
        }, 800)
      }

      function g() {
        var e = $(".adSlider li.heroNavActive").index() + 1;
        e == $(".adSlider li").length && (e = 0), $(".hero-kv ul").children(".slide-active").stop().animate({
          left: "-1920px"
        }, 800), $(".hero-kv ul").children().removeClass("slide-active"), $(".hero-kv ul li").eq(e).addClass("slide-active").stop().show().css("left", "1920px").animate({
          left: "0"
        }, 800)
      }

      function m() {
        var e = $(".hero-kv ul").find(".slide-active"),
          t = e.index(),
          a = $(".adSlider li").length;
        t >= a && (t = 0), $(".adSlider li").eq(t).hasClass("heroNavActive") || ($(".adSlider li").eq(t).parent().children().removeClass("heroNavActive"), $(".adSlider li").eq(t).addClass("heroNavActive"))
      }

      function h() {
        var t = Container.getLang(),
          o = Container.getCurrencyID();
        o < 0 && (o = "th-th" === t ? 18 : "vi-vn" === t ? 16 : 2);
        var s = {
          intBrandID: BRAND_ID,
          intCurrencyID: o,
          strLanguageCode: t
        };
        TemplateService.call("Scrolling_TextInfo_Get", s, function(t) {
          if (t.Success) {
            if (t.Result.length > 0) {
              for (var a = "", o = 0; o < t.Result.length; o++) o > 0 && (a += "                           "), a += t.Result[o].ScrollingText;
              e.bulletinObj.content = a;
            } else e.bulletinObj.content = "Welcome to Vwin.com";
            e.bulletinObj.enabled = !0
          }
        })
      }
      var p, f = Container.getAuthStatus() === !0 ? "kv-after" : "kv-before",
        v = appServices.getTemplatePath(Container.getLang(), "banner", f),
        w = appServices.getTemplatePath(Container.getLang(), "banner", "nav");
      appServices.getTemplatePath(Container.getLang(), "banner", "bulletin");
      e.bulletinObj = {
        enabled: !1,
        content: "",
        speed: "3"
      }, $("#hero_kv_insert").load(v, function() {
        if (r(), l(), Container.getRelease())
          for (var e = $("#hero_kv_insert img"), t = 0; t < e.length; t++) appServices.replaceImgSrc(e[t], "src"), appServices.replaceImgSrc(e[t], "original")
      }), $("#hero_nav_insert").load(w, function() {
        c()
      }), $(".hero-slide .next").click(function() {
        clearTimeout(p), g(), m(), p = setTimeout(u, 5e3)
      }), $(".hero-slide .prev").click(function() {
        clearTimeout(p), d(), m(), p = setTimeout(u, 5e3)
      }), p = setTimeout(u, 5e3), e.$on("$destroy", function() {
        clearTimeout(p)
      }), h()
    }
  }
}]);