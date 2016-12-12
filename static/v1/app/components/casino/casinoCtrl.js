angular.module('ciApp')
  .controller('casino', ['$interval', '$sce', '$scope', '$stateParams', 'AccountService', 'appServices', 'Container', 'PlatformService', 'Storage', '$translate', 'Config', function($interval, $sce, $scope, $stateParams, AccountService, appServices, Container, PlatformService, Storage, $translate, Config) {
    function getKvByPlatform(e) {
      for (var t = 0; t < $scope.menuItems.length; t++) {
        if ($scope.menuItems[t].platformCode === e) {
          return $scope.menuItems[t].kv;
        }
      }
    }
    if ($scope.currencyID === -1) {
      $scope.PlaytechActive = Config.PlaytechActive;
      $scope.txtRegisterBtn = '立即注册';
      $scope.txtPlayGameBtn = '在线游戏';
      $scope.userLang = Container.getLang() || 'zh-cn';
      $scope.currencyID = Container.getCurrencyID();
      switch ($scope.userLang) {
        case 'vi-vn':
          $scope.currencyID = 16;
          break;
        case 'th-th':
          $scope.currencyID = 18;
          break;
        default:
          $scope.currencyID = 2;
      }
    }
    $scope.sceTranslate = {};
    $translate('casino@birgin_description').then(function(el) {
      $scope.sceTranslate.descEA = $sce.trustAsHtml(el);
    });
    $translate('casino@emerald_description').then(function(el) {
      $scope.sceTranslate.descAG = $sce.trustAsHtml(el);
    });
    $translate('casino@star_description').then(function(el) {
      $scope.sceTranslate.descW88 = $sce.trustAsHtml(el);
    });
    $translate('casino@pirate_description').then(function(el) {
      $scope.sceTranslate.descOPUS = $sce.trustAsHtml(el);
    });
    $translate('casino@bbin_description').then(function(el) {
      $scope.sceTranslate.descBBIN = $sce.trustAsHtml(el);
    });
    $translate('casino@treasure_description').then(function(el) {
      $scope.sceTranslate.descGD = $sce.trustAsHtml(el);
    });
    $translate('casino@paramount_description').then(function(el) {
      $scope.sceTranslate.descPT = $sce.trustAsHtml(el);
    });
    $translate('casino@milano_description').then(function(el) {
      $scope.sceTranslate.descEV = $sce.trustAsHtml(el);
    });
    $scope.menuItems = [{
      kv: '7',
      platformCode: '20008',
      name: 'casino@treasure_title',
      styleClass: 'gd',
      openWindowName: 'GD',
      openWindowSpecs: 'resizable=1,width=1050,height=780,resizable=yes'
    }, {
      kv: '2',
      platformCode: '20001',
      name: 'casino@birgin_title',
      styleClass: 'bir',
      openWindowName: 'EA',
      openWindowSpecs: 'resizable=1,width=1050,height=780'
    }, {
      kv: '3',
      platformCode: '20006',
      name: 'casino@emerald_title',
      styleClass: 'eme',
      openWindowName: 'AG',
      openWindowSpecs: 'resizable=1,width=746,height=640'
    }, {
      kv: '5',
      platformCode: '20007',
      name: 'casino@star_title',
      styleClass: 'm88',
      openWindowName: 'W88',
      openWindowSpecs: 'resizable=1,width=1050,height=780'
    }, {
      kv: '6',
      platformCode: '20004',
      name: 'casino@pirate_title',
      styleClass: 'opus',
      openWindowName: 'OPUS',
      openWindowSpecs: 'resizable=1,width=1050,height=780,resizable=yes'
    }, {
      kv: '8',
      platformCode: '20009',
      name: 'casino@bbin_title',
      styleClass: 'bbin',
      openWindowName: 'BBIN',
      openWindowSpecs: 'resizable=1,width=1050,height=780,resizable=yes'
    }, {
      kv: '4',
      platformCode: '40003',
      name: 'casino@paramount_title',
      styleClass: 'ptCasino',
      openWindowName: 'PlayTechWindow',
      openWindowSpecs: 'resizable=1,menubar=no,status=no,scrollbars=yes,top=50,left=100,toolbar=no,width=1000,height=650'
    }, {
      kv: '1',
      platformCode: '20002',
      name: 'casino@milano_title',
      styleClass: 'mil',
      openWindowName: 'EV',
      openWindowSpecs: 'resizable=1,width=746,height=640'
    }];
    $scope.currentKv = $stateParams.kv || $scope.menuItems[0].kv;
    for (var menuMapping = new Array($scope.menuItems.length), i = 0; i < $scope.menuItems.length; i++) {
      menuMapping[parseInt($scope.menuItems[i].kv) - 1] = i + 1;
    }
    $scope.customizeCasinoMenu = function() {};
    $scope.isLoggedIn = function() {
      return Container.getAuthStatus();
    };
    $scope.getCasinoHeroStyles = function(id) {
      var opacity = Number($scope.currentKv) === id ? '1' : '0';
      var zIndex = Number($scope.currentKv) === id ? '10' : '0';
      return {
        opacity: opacity,
        'z-index': zIndex,
        display: 'block'
      };
    };
    $scope.onRegisterBtn = function() {
      appServices.needRegister();
    };
    $scope.onPlayGameBtn = function(game) {
      var menuItem = $scope.menuItems[menuMapping[$scope.currentKv - 1] - 1];
      var playWindow = window.open('about:blank', menuItem.openWindowName, menuItem.openWindowSpecs);
      if ($scope.currentKv === getKvByPlatform('20004')) {
        AccountService.call('Password_TokenCode_3rdParty', {
          intBrandID: 2,
          strMainAccountID: Container.getUserName(),
          strPlatformCode: '20004'
        }).success(function(result) {
          if (result.Success) {
            for (var t = appServices.getDomainName().split('.'); t.length > 2;) {
              t.shift('');
            }
            Storage.putCookie('s', result.Result[0].TokenCode, {
              domain: t.join('.')
            });
          }
          PlatformService.call('PlayGame', {
            PlatformCode: '20004',
            Domain: appServices.getDomainName(),
            LanguageCode: Container.getLang(),
            PlayMode: '1'
          }).success(function(e) {
            if (e.Success) {
              Storage.putCookie('selectedLanguage', e.Result[0].Lang, {
                domain: t.join('.')
              });
              playWindow.location.href = e.Result[0].GameURL;
            }
          });
        });
      } else {
        if ($scope.currentKv === getKvByPlatform('40003')) {
          PlatformService.call('PlayGame', {
            PlatformCode: '40003',
            GameCode: '7bal',
            Domain: appServices.getDomainName(),
            LanguageCode: Container.getLang(),
            PlayMode: '1',
            WebSiteMode: '1',
            Merchant: 'VWin'
          }).success(function(result) {
            if(result.Success) {
              playWindow.location.href = result.Result;
            }
          });
        } else {
          PlatformService.call('PlayGame', {
            PlatformCode: menuItem.platformCode,
            Domain: appServices.getDomainName(),
            LanguageCode: Container.getLang(),
            PlayMode: '1'
          }).success(function(result) {
            if (result.Success) {
              if ($scope.currentKv === getKvByPlatform('20009')) {
                if (playWindow.document.getElementById('post_form')) {
                  playWindow.document.body.innerHTML = result.Result;
                  playWindow.document.getElementById('post_form').submit();
                }
              } else {
                playWindow.close();
                var jsString = result.Result.substring(result.Result.indexOf('javascript>') + 'javascript>'.length, result.Result.indexOf('</script>'));
                eval(jsString);
              }
            } else {
              if ('GD_Fish' === game) {
                playWindow.location.href = result.Result + '&view=RNG75608';
              } else {
                playWindow.location.href = result.Result;
              }
            }
          });
        }
      }
    };
    $scope.onPlayPromotionGameBtn = function() {
      var menuItems = $scope.menuItems[menuMapping[$scope.currentKv - 1] - 1];
      var playWindow = window.open('about:blank', menuItems.openWindowName, menuItems.openWindowSpecs);
      if ($scope.currentKv === getKvByPlatform('20004')) {
        AccountService.call('Password_TokenCode_3rdParty', {
          intBrandID: 2,
          strMainAccountID: Container.getUserName(),
          strPlatformCode: '20004'
        }).success(function(result) {
          if (result.Success) {
            for (var o = appServices.getDomainName().split('.'); o.length > 2;) {
              o.shift('');
            }
            Storage.putCookie('s', result.Result[0].TokenCode, {
              domain: o.join('.')
            });
          }
          PlatformService.call('PlayGame', {
            PlatformCode: '20004',
            Domain: appServices.getDomainName(),
            LanguageCode: Container.getLang(),
            GameCode: 'PromoteGame',
            PlayMode: '1'
          }).success(function(res) {
            if(res.Success) {
              Storage.putCookie('selectedLanguage', res.Result[0].Lang, {
                domain: o.join('.')
              });
              playWindow.location.href = res.Result[0].GameURL;
            }
          });
        });
      }
    };
    $scope.onDownloadBtn = function() {
      if ($scope.currentKv === '2') {
        $('.download').attr('href', '/Download/vwin_casino.exe');
      } else if ($scope.currentKv === '3') {
        $('.download').attr('href', '/Download/VWin_setup.exe');
      } else if ($scope.currentKv === '4') {
        $('.download').attr('href', '/Download/setup.exe');
      }
    };
    var casinoAutoPlay = function() {
      for (var e = 0; e < $scope.menuItems.length; e++) {
        if ($scope.menuItems[e].kv === $scope.currentKv) {
          var t = e < $scope.menuItems.length - 1 ? e + 1 : 0;
          $scope.currentKv = $scope.menuItems[t].kv;
          break;
        }
      }
    };
    $scope.autoPlay = $interval(casinoAutoPlay, 1e4);
    $scope.resetAutoPlay = function() {
      $interval.cancel($scope.autoPlay);
      $scope.autoPlay = $interval(casinoAutoPlay, 1e4);
    };
    $scope.pauseAutoPlay = function() {
      $interval.cancel($scope.autoPlay);
    };
    $scope.resumeAutoPlay = function() {
      $scope.autoPlay = $interval(casinoAutoPlay, 1e4);
    };
    $scope.onMenuClick = function(e) {
      $scope.currentKv = e;
      $scope.resetAutoPlay();
    };
    $scope.menuRetouch = function() {
      $('.csn_mn li').each(function(e, t) {
        if($scope.menuItems[e]) {
          $(t).addClass($scope.menuItems[e].styleClass);
        }
      });
      $('.csn_mn').css('margin-left', -($('.csn_mn').width() / 2));
    };
    $scope.onPTAPPClick = function() {
      appServices.showAlertMsg('casino@ptAppReminderTitle', 'casino@ptAppReminderCcontent1');
    };
  }]);
