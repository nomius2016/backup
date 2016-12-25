angular.module('ciApp').directive('header', ['$state', '$translate', '$interval', '$timeout', 'App', 'Config', 'Container', 'Storage', 'appServices', 'PlatformService', function($state, $translate, $interval, $timeout, App, Config, Container, Storage, appServices, PlatformService) {
  return {
    templateUrl: '/static/v1/app/components/header/header.html',
    restrict: 'A',
    scope: {},
    link: function($scope) {
      function o() {
          $("#sec-nav").addClass("active")
      }

      function s() {}

      function l(e) {
          for (var a = 0, o = t.listLang.length, i = 0; i < o; i++)
              if (t.listLang[i].id === e) {
                  a = i;
                  break
              }
          // t.selectLang(a);
          n.setLangByAssigned("")
      }

      function u() {
          getBalance();
          if(!angular.isDefined(b) && !Container.getIE8()) {
            b = $interval(function() {
              getBalance();
            }, 10 * 1000)
          }
      }

      function d() {
          angular.isDefined(b) && (a.cancel(b), b = void 0)
      }

      function g(e) {
          $("body").append("<div class='clsarea'></div>"), $(".clsarea").click(function() {
              $(e).slideUp(), $(".clsarea").remove()
          })
      }

      function m() {
          $(".clsarea").remove()
      }

      function h(e) {
          "" !== e && ("home" === e || "mobile" === e || "casino" === e || "games" === e || "FishingGame" === e ? (P = !0, p($(document).scrollTop() > 0)) : (P = !1, p(!0)))
      }

      function p(e) {
          e ? $("#header").addClass("header-color") : $("#header").removeClass("header-color")
      }
      // f()
      function f(e) {
        $scope.listLang = [];
        var a = Container.getCurrencyID();
        if(a > 0) {
          if(a === 2) {
            $scope.listLang.push(y[0]);
          } else if(a === 16) {
            $scope.listLang.push(y[2]);
          } else if(a === 18) {
            $scope.listLang.push(y[3]);
          }
          $scope.listLang.push(y[1]);
          if(!e) {
            // $scope.selectLang(0)
          }
        } else {
          $scope.listLang = y;
        }
      }
      // getBalance()
      function getBalance() {
        PlatformService.call('Balance', {
          PlatformCode: '10001'
        }, function(result) {
          $scope.amount = result.Success ? result.Result[0].balance : 0;
        });
      }

      var popHeaderShow = function() {
        var _top = $('.header').position().top + 40;
        $('.popup-header-bgArea').css('top', _top).show();
      };

      var b;
      var P = true;

      $scope.lang = Container.getLang();
      $scope.login = false;
      $scope.userName = '';
      $scope.listLang = [];
      $scope.amount = 0;
      $scope.format = 'yyyy-M-d HH:mm';
      $scope.SSCActive = Config.SSCActive;

      var y = [{
          className: "cn",
          id: "zh-cn",
          transId: "header@china",
          localizeStr: "简体中文"
      }, {
          className: "en",
          id: "en-us",
          transId: "header@uk",
          localizeStr: "English"
      }, {
          className: "vn",
          id: "vi-vn",
          transId: "header@vietnam",
          localizeStr: "Tiếng Việt"
      }, {
          className: "thai",
          id: "th-th",
          transId: "header@thailand",
          localizeStr: "ภาษาไทย"
      }];

      $scope.openLoginDlg = function() {
        var _width = $('.loginPage').width();
        var _top = $('.loginPage').position().top + 23;
        var _left = $('.loginPage').offset().left - 189 + _width / 2;
        if ($('#registerPage').is(':visible') === 1) {
          $('.popup-style-1').slideUp(function() {
            $('.layer-style-1').removeClass('img-bg-finish');
            $('#registerPage').css('left', 0);
            $('.popup-style-1').css({
              left: _left,
              top: _top
            });
            $('.popup-style-1').find('#loginPage').show();
            $('.popup-style-1').find('#registerPage').hide();
            $('.popup-style-1').slideDown();
            popHeaderShow();
          });
        } else {
          $('.popup-style-1').css({
            left: _left,
            top: _top
          });
          $('.popup-style-1').find('#loginPage').show();
          $('.popup-style-1').find('#registerPage').hide();
          $('.popup-style-1').slideDown();
        }
        popHeaderShow();
        $(window).resize(function() {
          var _w = $('.loginPage').width();
          var _t = $('.loginPage').position().top + 23;
          var _l = $('.loginPage').offset().left - 189 + _w / 2;
          $('.popup-style-1').css({
            left: _l,
            top: _t
          });
        });
      };

      $scope.openRegisterDlg = function() {
        $scope.$broadcast('onRegister');
        var _width = $('.registerPage').width();
        var _top = $('.registerPage').position().top + 23;
        var _left = $('.registerPage').offset().left - 189 + _width / 2;
        if ($('#loginPage').is(':visible') === 1) {
          $('.popup-style-1').slideUp(function() {
            $('.layer-style-1').removeClass('img-bg-finish');
            $('#registerPage').css('left', 0);
            $('.popup-style-1').css({
              left: _left,
              top: _top
            });
            $('.popup-style-1').find('#registerPage').show();
            $('.popup-style-1').find('#loginPage').hide();
            $('.popup-style-1').slideDown();
            popHeaderShow();
          });
        } else {
          $('.popup-style-1').css({
            left: _left,
            top: _top
          });
          $('.popup-style-1').find('#registerPage').show();
          $('.popup-style-1').find('#loginPage').hide();
          $('.popup-style-1').slideDown();
          popHeaderShow();
          if($(window).width() > 1290 && $(window).width() < 1390) {
            var i = (1390 - $(window).width()) / 2;
            $('.layer-style-1').css('left', -i);
          } else if($(window).width() < 1290) {
            $('.layer-style-1').css('left', '-50px');
          } else {
            $('.layer-style-1').css('left', '0px');
          }
        }

        $(window).resize(function() {
          _width = $('.registerPage').width();
          _top = $('.registerPage').position().top + 23;
          _left = $('.registerPage').offset().left - 189 + _width / 2;
          if ($(window).width() > 1290 && $(window).width() < 1390) {
            $('.popup-style-1').css({
              left: _left,
              top: _top
            });
            var o = (1390 - $(window).width()) / 2;
            $('.layer-style-1').css('left', -o);
          } else if ($(window).width() < 1290) {
            $('.layer-style-1').css('left', '-50px');
          } else {
            $('.layer-style-1').css('left', '0px');
          }
        });
      };

      $scope.closeDialog = function() {
        $('.popup-style-1').slideUp('fast', function() {
          $('.layer-style-1').removeClass('img-bg-finish');
          $('#registerPage').css('left', 0);
        });
      };
      $scope.sidebarFundsClick = function($event) {
        $event.stopPropagation();
        $timeout(function() {
          var element = document.getElementById('sidebarFunds');
          angular.element(element).triggerHandler('click');
        }, 100);
      };
      $scope.logout = function() {
        $scope.login = false;
        $scope.amount = 0;
        appServices.logout(true);
        cancelTimer();
      };
      $scope.openLiveChat = function() {
        appServices.openLiveChat();
      };
      $scope.openExploreVwin = function() {
        window.open('http://114lau.com/', '探索Vwin');
      };
      $('.numberGame').hoverIntent({
        sensitivity: 3,
        interval: 30,
        over: function() {
          $('#sec-nav').addClass('active');
        },
        timeout: 30,
        out: function() {}
      });
      $('.numberGame').mouseleave(function() {
        $('#sec-nav').removeClass('active');
        $('.numberGame').removeClass('active');
      });
      $('#sec-nav').mouseenter(function() {
        $('#sec-nav').addClass('active');
        $('.numberGame').removeClass('active');
      });
      $('#sec-nav').mouseleave(function() {
        $('#sec-nav').removeClass('active');
        $('.numberGame').removeClass('active');
      });
      $scope.getNumberGameTextSrc = function() {
        if("zh-cn" === t.lang) {
          return;
        } else {
          return '';
        }
      };
      if(Container.getAuthStatus() === true) {
        $scope.login = true;
        $scope.userName = Container.getUserName();
        u();
      }
      if(Container.getOpenReg() === !0) {
        Container.setOpenReg(!1);
        $scope.openRegisterDlg();
      }
      $scope.$on("reloadPage", function() {
          getBalance();
      });
      $scope.$on("logoutFromMain", function() {
          $scope.login = !1;
          $scope.amount = 0;
          $scope.userName = "";
      });
      $scope.$on("closePopupDlg", function() {
          $scope.closeDialog();
      });
      $scope.$on("openLogin", function() {
          $scope.openLoginDlg();
      });
      $scope.$on("openRegister", function() {
          $scope.openRegisterDlg();
      });
      $scope.$on("changeLangByAssigned", function(e, t) {
          l(t);
      });
      $scope.$on("loginSuccess", function(e, a) {
          $scope.userName = a.userName ? a.userName : n.getUserName();
          $scope.login = !0;
          $scope.closeDialog();
          $scope.$broadcast("updateUserName", {
              name: $scope.userName
          });
          Container.setAuthStatus(!0);
          Container.setUserName($scope.userName);
          u();
          if(a.reload !== !1) {
            appServices.reloadPage();
          }
      });
      $scope.$on("basicInfoUpdated", function() {
          f(!1);
      });

      $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        if (toState && toState.name && toState.name !== '') {
          var name = toState.name;
          if ('home' === name || 'mobile' === name || 'casino' === name || 'games' === name || 'FishingGame' === name) {
            P = true;
            if ($(document).scrollTop() > 0) {
              $('#header').addClass('header-color');
            } else {
              $('#header').removeClass('header-color');
            }
          } else {
            P = false;
            $('#header').addClass('header-color');
          }
        }
      });
      $scope.$on("$destroy", function() {
          d();
      });
      f(!0);
      if("" !== Container.getLangByAssigned()) {
        $scope.lang = Container.getLangByAssigned();
        l($scope.lang);
      }

      for (var i = 0; i < $scope.listLang.length; i++) {
        if ($scope.lang === $scope.listLang[i].id) {
            $scope.currentLang = $scope.listLang[i];
            break;
        }
      }
      h($state.current.name);
      $(document).scroll(function() {
        P && p($(document).scrollTop() > 0)
      });
      $(".popup-header-bgArea").click(function() {
          $(".popup-style-1").slideUp("fast", function() {
              $(".layer-style-1").removeClass("img-bg-finish");
              $("#registerPage").css("left", 0);
          });
      });
    }
  };
}]).directive("myCurrentTime", ["$interval", "dateFilter", "appServices", function($interval, dateFilter, appServices) {
  return function($scope, i, n) {
    function s() {
      i.text(dateFilter(new Date, r) + " " + appServices.getGMTStr());
    }
    var r, c;
    $scope.$watch(n.myCurrentTime, function(e) {
      r = e;
      s();
    });
    c = $interval(s, 1e3);
    i.on("$destroy", function() {
      $interval.cancel(c);
    });
  }
}]);
