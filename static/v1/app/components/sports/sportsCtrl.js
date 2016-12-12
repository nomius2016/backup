angular.module('ciApp')
  .controller('sports', ['$sce', '$scope', 'AccountService', 'appServices', 'Container', 'PlatformService', 'Storage', function($sce, $scope, AccountService, appServices, Container, PlatformService, Storage) {
    var authStatus = Container.getAuthStatus() ? '1' : '0';
    var l = Container.getLang();
    $scope.showBanner = 'zh-cn' === l || 'en-us' === l && !Container.getAuthStatus() || Container.getAuthStatus() && 2 === Container.getCurrencyID();
    var data = {
      LanguageCode: Container.getLang(),
      PlatformCode: '30001',
      WebSiteMode: '1',
      Domain: appServices.getDomainName(),
      PlayMode: authStatus
    };
    if (authStatus === '0') {
      // PlatformService.call('PlayGame', data, function(result) {
      //   if (result.Success) {
      //     $scope.externalUrl = $sce.trustAsResourceUrl(result.Result);
      //   }
      // });
      $scope.externalUrl = $sce.trustAsResourceUrl("http://mkt5.vw033.com/vender.aspx?lang=cs&ts=20161208112139948");
    } else {
      PlatformService.call('Password_TokenCode_3rdParty', {
        intBrandID: 2,
        strMainAccountID: Container.getUserName(),
        strPlatformCode: '30001'
      }).success(function(result) {
        if (result.Success) {
          for (var o = appServices.getDomainName().split('.'); o.length > 2;) {
            o.shift('');
          }
          Storage.putCookie('g', result.Result[0].TokenCode, {
            domain: o.join('.')
          });
        }
        PlatformService.call('PlayGame', data, function(result) {
          if (result.Success) {
            $scope.externalUrl = $sce.trustAsResourceUrl(result.Result);
          }
        });
      });
    }
    $(document.body).css('overflow-y', 'hidden');
    $scope.$on('$destroy', function() {
      $(document.body).css('overflow-y', '');
    });
    var p = $scope.showBanner ? 60 : 0;
    $('#maincontent').height($(window).height() - (115 + p));
    $(window).resize(function() {
      $('#maincontent').height($(window).height() - (115 + p));
    });
  }]);
