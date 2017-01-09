angular.module('ciApp', ['ui.router',
    'storageModule',
    'requesterModule',
    'containerModule',
    'pascalprecht.translate',
    'angular-md5',
    'ngAnimate'
  ])
  .constant('APP_NAME', 'ciApp')
  .constant('VERSION', '1.0.0.1122')
  .constant('BRAND_ID', 2)
  .service('App', ['APP_NAME', function(APP_NAME) {
    return {
      name: APP_NAME,
      lang: APP_NAME + 'Lang',
      token: APP_NAME + 'Token',
      account: APP_NAME + 'Account',
      logAccount: APP_NAME + 'LogAccount',
      currencyID: APP_NAME + 'CurrencyID',
      autoMobile: APP_NAME + 'AutoMobile',
      affiliateID: APP_NAME + 'AffiliateID',
      affiliateType: APP_NAME + 'AffiliateType',
      affiliateGUID: APP_NAME + 'AffiliateGUID'
    };
  }])
  .config(['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', '$sceDelegateProvider', function($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $sceDelegateProvider) {
    $urlMatcherFactoryProvider.caseInsensitive(true);
    $urlRouterProvider.when('', '/home').otherwise('/error/404');
    $sceDelegateProvider.resourceUrlWhitelist(['self']);
    $stateProvider.state('home', {
      url: '/home?act',
      views: {
        '': {
          templateUrl: '/static/v1/app/components/home/home.html'
        },
        'content@home': {
          templateUrl: '/static/v1/app/components/home/home.content.html'
        }
      }
    }).state('about', {
      url: '/about/{menuItem}',
      templateUrl: '/static/v1/app/components/about/about.html',
      css: 'styles/help.css'
    }).state('live800', {
      url: '/live800',
      templateUrl: '/static/v1/app/components/live800/live800.html'
    }).state('mobile', {
      url: '/mobile',
      templateUrl: '/static/v1/app/components/mobile/mobile.html'
    }).state('casino', {
      url: '/casino?kv',
      templateUrl: '/static/v1/app/components/casino/casino.html'
    }).state('games', {
      url: '/games',
      templateUrl: '/static/v1/app/components/games/games.html'
    }).state('playground', {
      url: '/games/playground?gameCode&gameCategoryID&platformCode&accountID&gameMode',
      templateUrl: '/static/v1/app/components/games/playground.html',
      css: ['styles/playground.css']
    }).state('promotion', {
      url: '/promotion',
      templateUrl: '/static/v1/app/components/promotion/promotion.html'
    }).state('member', {
      url: '/member',
      templateUrl: '/static/v1/app/components/member/member.html'
    }).state('member.profile', {
      url: '/profile',
      templateUrl: '/static/v1/app/components/member/member.profile.html'
    }).state('member.bank', {
      url: '/bank/{way}',
      params: {
        method: 'deposit'
      },
      views: {
        '': {
          templateUrl: '/static/v1/app/components/member/member.bank.html'
        },
        'deposit@member.bank': {
          templateUrl: '/static/v1/app/components/member/member.bank.deposit.html'
        },
        'withdraw@member.bank': {
          templateUrl: '/static/v1/app/components/member/member.bank.withdraw.html'
        }
      }
    }).state('member.trade', {
      url: '/trade',
      params: {
        method: 'deposit'
      },
      views:{
        '': {
          templateUrl: '/static/v1/app/components/member/member.trade.html'
        },
        'deposit@member.trade': {
          templateUrl: '/static/v1/app/components/member/member.trade.deposit.html'
        },
        'withdraw@member.trade': {
          templateUrl: '/static/v1/app/components/member/member.trade.withdraw.html'
        },
        'fund@member.trade': {
          templateUrl: '/static/v1/app/components/member/member.trade.fund.html'
        }
      }
    }).state('member.message', {
      url: '/message',
      templateUrl: '/static/v1/app/components/member/member.message.html'
    }).state('member.bonus', {
      url: '/bonus',
      params: {
        method: 'applied'
      },
      templateUrl: '/static/v1/app/components/member/member.bonus.html'
    }).state('member.friend', {
      url: '/friend',
      templateUrl: '/static/v1/app/components/member/member.friend.html'
    }).state('member.vip', {
      url: '/vip',
      templateUrl: '/static/v1/app/components/member/member.vip.html'
    }).state('member.info', {
      url: '/info',
      templateUrl: '/static/v1/app/components/member/member.info.html'
    }).state('member.security', {
      url: '/security',
      params: {
        method: 'index'
      },
      views: {
        '': {
          templateUrl: '/static/v1/app/components/member/member.security.html'
        },
        'index@member.security': {
          templateUrl: '/static/v1/app/components/member/member.security.index.html'
        },
        'bindcard@member.security': {
          templateUrl: '/static/v1/app/components/member/member.security.bindcard.html'
        },
        'withdraw@member.security': {
          templateUrl: '/static/v1/app/components/member/member.security.withdraw.html'
        },
        'question@member.security': {
          templateUrl: '/static/v1/app/components/member/member.security.question.html'
        },
        'password@member.security': {
          templateUrl: '/static/v1/app/components/member/member.security.password.html'
        }
      }
    }).state('help', {
      url: '/help/{mainmenu}/{menu}',
      templateUrl: '/static/v1/app/components/help/help.html',
      css: 'styles/help.css',
      controller: 'helpCtrl'
    }).state('gb_sports', {
      url: '/gb_sports',
      templateUrl: '/static/v1/app/components/gb_sports/gb_sports.html'
    }).state('sports', {
      url: '/sports',
      templateUrl: '/static/v1/app/components/sports/sports.html'
    }).state('keno', {
      url: '/keno',
      templateUrl: '/static/v1/app/components/keno/keno.html'
    }).state('lotto', {
      url: '/lotto',
      templateUrl: '/static/v1/app/components/lotto/lotto.html'
    }).state('ssc', {
      url: '/ssc',
      templateUrl: '/static/v1/app/components/ssc/ssc.html'
    }).state('vip', {
      url: '/vip',
      templateUrl: '/static/v1/app/components/vip/vip.html',
      css: 'styles/vip.css'
    }).state('error', {
      url: '/error/{type}',
      templateUrl: '/static/v1/app/components/error/error.html',
      css: 'styles/error.css',
      controller: 'errorCtrl'
    }).state('affiliate', {
      url: '/affiliate/{type}?id&ID&Id&target&strLoginItem&strOTPTokenCode&strIPAddress&strDevice&strServiceProvider&token&user',
      controller: 'affiliateRegCtrl'
    }).state('mobiletrigger', {
      url: '/mobiletrigger'
    }).state('affiliates', {
      url: '/affiliates',
      templateUrl: '/static/v1/app/components/affiliate/index_a.html'
    }).state('FishingGame', {
      url: '/FishingGame',
      templateUrl: '/static/v1/app/components/FishingGame/FishingGame.html'
    });
  }])
  .config(['$translateProvider', function($translateProvider) {
    $translateProvider.useUrlLoader('/static/v1/i18n/zh-CN.json');
    $translateProvider.useSanitizeValueStrategy();
    $translateProvider.preferredLanguage('zh-cn');
  }])
  .controller('appCtrl', ['$scope', '$translate', '$state', 'appServices', 'App', 'Storage', 'Container', 'Config', 'UtilityService', 'AccountService', '$filter', function($scope, $translate, $state, appServices, App, Storage, Container, Config, UtilityService, AccountService, $filter) {
    function logout(bManual) {
      if(bManual) {
        AccountService.call("MainAccount_Logout", {}, function(e) {});
      }
      Storage.putCookie(App.token, '');
      Container.setAuthStatus(false);
      Container.setCurrencyID(-1);
      appServices.basicInfoUpdated()
      $scope.$broadcast("closeSidebar");
      $scope.$broadcast("logoutFromMain");
      appServices.reloadPage("home")
    }

    function showAlertMsg(title, content) {
      $scope.alertTitle = title;
      $scope.alertContent = content;
      $scope.showAlert = true;
    }

    function f(e, t) {
      var n = e.name.split(".")[0],
        o = '';
      switch (n) {
        case "mobile":
        case "gb_sports":
        case "sports":
        case "casino":
        case "games":
        case "keno":
        case "lotto":
        case "ssc":
        case "promotion":
        case "vip":
          o = n;
          break;
        case "member":
          o = n + e.url;
          break;
        case "about":
          o = n + "/" + t.menuItem;
          break;
        case "help":
          o = n + "/" + t.mainmenu + "/" + t.menu;
          break;
        default:
          o = "home"
      }
      return o
    }
    $scope.userLang = Container.getLang();
    $scope.showModalDialog = false;
    $scope.showHeader = true;
    $scope.showFooter = true;
    $scope.showSidebar = true;
    $scope.showMask = false;
    $scope.showAlert = false;
    $scope.showLoading = false;
    $scope.maskHeightStyle = '';
    $scope.alertTitle = '';
    $scope.alertContent = '';
    $scope.metadata = {
      title: '',
      description: '',
      keywords: ''
    };
    if ($scope.userLang !== 'zh-ch') {
      $translate.use($scope.userLang).then(function() {
        $scope.metadata = {
          title: $filter("translate")("index@meta_title"),
          description: $filter("translate")("index@meta_description"),
          keywords: $filter("translate")("index@meta_keywords")
        }
      });
    }
    if (Container.getAuthStatus()) {
      UtilityService.call("Valid_Token", {}, function(result) {
        if (result.Success) {
          AccountService.call("MainAccount_Basicinfo_Get", {}, function(res) {
            if (res.Success) {
              Container.setPromotionID(res.Result[0].PromotionID);
              appServices.basicInfoUpdated();
            }
          });
        } else {
          logout(false);
        }
      });
    }
    $(".main-loading-mask").css("display", '');
    $scope.clickMask = function() {
      $scope.$broadcast("onClickMask")
    };
    $scope.$watch("showModalDialog", function(t, n) {
      if (t === false) {
        $scope.$broadcast("closePopupDialog");
      }
    });
    $scope.$on("showPopupDialog", function(t, n) {
      $scope.$broadcast("showModalDialog", n)
    });
    $scope.$on("hidePopupDialog", function(t) {
      $scope.$broadcast("hideModalDialog")
    });
    $scope.$on("needLogin", function() {
      $scope.$broadcast("openLogin")
    });
    $scope.$on("needRegister", function() {
      $scope.$broadcast("openRegister")
    });
    $scope.$on("logout", function(e, t) {
      logout(t.bManual)
    });
    $scope.$on("onChangeLanguage", function(n, s) {
      if ("langKey" in s && s.langKey !== $translate.use()) {
        $scope.$broadcast("langChanged", {
          lang: s.langKey
        });
        $scope.userLang = s.langKey;
        $translate.use(s.langKey).then(function() {
          Container.setLang(s.langKey);
          Storage.putCookie(App.lang, s.langKey);
          $scope.metadata = {
            title: u("translate")("index@meta_title"),
            description: u("translate")("index@meta_description"),
            keywords: u("translate")("index@meta_keywords")
          };
          appServices.reloadPage();
        });
      }
    });
    $scope.$on("setMainMask", function(t, n) {
      $scope.showMask = n.showMask
      if ($scope.showMask) {
        var o = "100%";
        if ("height" in n) {
          o = n.height
        }
        $scope.maskHeightStyle = {
          height: o
        };
      }
      $scope.maskHeight = "height" in n ? n.height : "100%"
    });
    $scope.$on("showAlertMsg", function(e, data) {
      showAlertMsg(data.title, data.content)
    });
    $scope.$on("showLoading", function(t, n) {
      $scope.showLoading = n.showLoading;
    });
    $scope.$on("$stateChangeStart", function(e, t, c, l, u) {
      if (Container.getBlockStatus()) {
        e.preventDefault();
      }
      if (t && t.name) {
        var m = window.location.protocol;
        if ("https:" === m && "home" !== t.name) {
          var g = window.location.hostname;
          window.top.location.replace("http://" + g + "/#/" + f(t, c));
          e.preventDefault();
        }
        if ("mobile" === Container.getDeviceType() && "live800" != t.name) {
          if ("mobiletrigger" === t.name) {
            r.putCookie(a.autoMobile, "0");
            e.preventDefault();
            n.go("home");
          } else if ("0" !== r.getCookie(a.autoMobile)) {
            var p = '';
            var h = c.id || c.ID || c.Id;
            if ("affiliate" === t.name) {
              p = s[c.type] + "?id=" + h
            }
            e.preventDefault();
          }
          var v = '';
          var y = window.location.hostname;
          v = i.getRelease() ? o.getCombinedUrl("mobile") + "/" + p : s[y] + p;
          window.location = v;
        }
        if (!Container.getAuthStatus()) {
          var _ = t.name.split(".")[0];
          if ("member" === _) {
            e.preventDefault();
            showAlertMsg("錯誤", "請重新登入");
            $state.go("home");
          }
        }
      }
    });
    $scope.$on("$stateChangeSuccess", function(t, n, a, r, s) {
      if (n && n.name) {
        var c = n.name.split(".")[0];
        if("error" === c && a && "block" === a.type) {
          Container.setBlockStatus(true);
        }
        if(c === 'casino') {
          appServices.forceUpSidebar(true);
        } else {
          appServices.forceUpSidebar(false);
        }
        if("sports" === c || "gb_sports" === c || "keno" === c || "lotto" === c || "ssc" === c) {
          $scope.showHeader = true;
          $scope.showFooter = false;
          $scope.showSidebar = false;
        } else if("playground" === c || "error" === c || "affiliates" === c || "live800" === c) {
          $scope.showHeader = false;
          $scope.showFooter = false;
          $scope.showSidebar = false;
        } else {
          $scope.showHeader = true;
          $scope.showFooter = true;
          $scope.showSidebar = true;
        }
        if ("zh-cn" === $scope.userLang) {
          var title = '';
          var description = '';
          var keywords = '';
          if("mobile" === c || "gb_sports" === c || "sports" === c || "casino" === c || "games" === c || "keno" === c || "lotto" === c || "promotion" === c) {
            title = "seo_" + c + "@title";
            description = "seo_" + c + "@description";
            keywords = "seo_" + c + "@keywords";
          } else {
            title = "seo_home@title";
            description = "seo_home@description";
            keywords = "seo_home@keywords";
          }
          $scope.metadata = {
            title: $filter("translate")(title),
            description: $filter("translate")(description),
            keywords: $filter("translate")(keywords)
          }
        }
      }
    });
  }])
  .directive("modalDialog", ["$sce", function(e) {
      return {
          restrict: "A",
          scope: {
              show: "="
          },
          replace: !0,
          link: function(t, n, o) {
              var a, r;
              return a = function() {
                  var n = t.customizeCloseBtn ? t.customizeCloseBtn : "<a class='btn-close' style='z-index: 999;'></a>";
                  return t.closeButtonHtml = e.trustAsHtml(n)
              }, r = function() {
                  if (t.dialogStyle = {}, o.width && (t.dialogStyle.width = o.width), o.height) return t.dialogStyle.height = o.height
              }, t.hideModal = function(e) {
                  if (!e || "1" === t.outsideclose) return t.show = !1
              }, t.$on("showModalDialog", function(e, n) {
                  angular.element(document.getElementById("mainDialog")).empty(), angular.element(document.getElementById("mainDialog")).append(n.content), t.show = !0
              }), t.$on("hideModalDialog", function(e) {
                  t.hideModal(!1)
              }), a(), r()
          },
          template: "<div class='ng-modal' ng-show='show'> <div class='ng-modal-overlay' ng-click='hideModal(true)'></div> <div class='ng-modal-dialog' ng-style='dialogStyle'> <span class='ng-modal-title' ng-show='dialogTitle && dialogTitle.length' ng-bind='dialogTitle'></span> <div class='ng-modal-close' ng-click='hideModal(false)'> <div ng-bind-html='closeButtonHtml'></div> </div> <div class='ng-modal-dialog-content' id='mainDialog'></div> </div> </div>"
      }
  }])
  .directive('popupDialog', function() {
    return {
      restrict: 'A',
      scope: {
        show: '='
      },
      replace: true,
      transclude: true,
      link: function($scope, elem, attrs, ctrls, trans) {
        var childScope;
        $scope.$watch('show', function(newVal, oldVal) {
          if (newVal === true) {
            childScope = $scope.$parent.$new();
            trans(childScope, function(content) {
              $scope.$emit('showPopupDialog', {
                content: content,
                title: attrs.title,
              });
            });
          } else if (newVal === false && oldVal === true) {
            childScope.$destroy();
            $scope.$emit('hidePopupDialog');
          }
        });
        $scope.$on('closePopupDialog', function() {
          $scope.show = false;
        });
      }
    };
  })
  .directive("btnProcess", function() {
    return {
        restrict: "A",
        scope: {
            callback: "&"
        },
        template: "",
        link: function($scope, elem) {
          elem.on("click", function() {
            elem.hasClass("btn-disable") || $scope.callback()
          });
        }
    };
  })
  .directive("partialLoading", function() {
    return {
      restrict: "A",
      scope: {
        show: "="
      },
      replace: true,
      template: "<div ng-show='show'><div style='width:100%; height:100%; background-color: rgba(0,0,0,0); position: absolute; z-index:1;'></div><div style='position:absolute; z-index:1;' ng-style='customStyle'><span class='icon-loading-1'></span></div></div>",
      link: function(e, t, n) {
        e.customStyle = {};
        n.top ? e.customStyle.top = n.top : (e.customStyle.top = "50%",
        e.customStyle["margin-top"] = "-10px"),
        n.right ? e.customStyle.right = n.right : (e.customStyle.right = "50%",
        e.customStyle["margin-right"] = "-10px")
      }
    }
  })
  .run(['$rootScope', '$state', 'App', 'Container', 'Config', 'Storage', 'appServices', 'ZeusService', 'UtilityService', function($rootScope, $state, App, Container, Config, Storage, appServices, ZeusService, UtilityService) {
    var token = Storage.getCookie(App.token);
    var userName = Storage.getCookie(App.account);
    var currencyID = Storage.getCookie(App.currencyID);
    var lang = Storage.getCookie(App.lang) || window.navigator.language || 'zh-cn';
    lang = lang.toLowerCase();
    if (lang === 'zh-cn' || lang === 'zh') {
      lang = 'zh-cn';
    } else {
      lang = 'zh-cn';
    }
    Container.setLang(lang);
    if (userName && token && currencyID) {
      Container.setAuthStatus(true);
      Container.setUserName(userName);
      Container.setCurrencyID(parseInt(currencyID, 10));
    }

    function checkDevice() {
      var parser = new UAParser();
      var device = parser.getDevice();
      if (device) {
        var deviceType = device.type;
        if (deviceType) {
          Container.setDeviceType(deviceType);
        }
      }
    }

    function initZeus() {
      var url = '';
      var domain = window.location.hostname;
      switch (domain) {
        case 'localhost':
        case '127.0.0.1':
          url = "http://127.0.0.1/api";
          break;
        default:
          Container.setRelease(true);
          url = appServices.getCombinedUrl("service") + "/api";
          break;
      }
      ZeusService.setHost(url);
    }

    function redirectToBlockPage() {
      $state.go("error", {
        type: 'ipBan'
      });
    }
    checkDevice();
    initZeus();
    if (!document.addEventListener) {
      Container.setIE8(true);
    }
    UtilityService.call('GetClientIPAddress', {}, function(result) {
      if (result.Success) {
        var ip = result.Result;
        Container.setIPAddress(ip);
        var longIp = appServices.ipConvertToLong(ip);
        if (longIp > 0) {
          UtilityService.call('IPAddressDeny_Get', {
              strLongIPAddress: longIp
          }, function(result) {
            if (!result.Success) {
              redirectToBlockPage();
            }
          });
        } else {
          redirectToBlockPage();
        }
      }
    });
  }]);
