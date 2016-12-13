angular.module('ciApp')
  .controller('gb_sports', ['$sce', '$scope', 'appServices', 'Container', 'PlatformService', function($sce, $scope, appServices, Container, PlatformService) {
    var authStatus = Container.getAuthStatus() ? '1' : '0';
    // PlatformService.call('PlayGame', {
    //   LanguageCode: Container.getLang(),
    //   PlatformCode: '62001',
    //   Domain: appServices.getDomainName(),
    //   PlayMode: authStatus
    // }).success(function(result) {
    //   if (result.Success) {
    //     $scope.externalUrl = $sce.trustAsResourceUrl(result.Result)
    //   }
    // });
    var url = "http://msp2.vw077.com/Sports/Asia/Index.aspx?tpid=001&token=e297cd487d986442a291900987a317099f8290e648c3189e71a659812caae2c02ef1524deb9ffe2d795a3c68524fac16258253218aeb4a97cfdcb0fa8ef86e104a731cca56b488abd52bdb2de1769a5b1df1c7e0d934432b6155dfb454ccaa4b27e39e54cb7e7d7bc85629e3d47da9e0&languagecode=zh-cn";
    $scope.externalUrl = $sce.trustAsResourceUrl(url);
    $(document.body).css('overflow-y', 'hidden');
    $scope.$on('$destroy', function(e) {
      $(document.body).css('overflow-y', '');
    });
    $('#gbSportsGameScreen').height($(window).height() - 115);
    $(window).resize(function() {
      $('#gbSportsGameScreen').height($(window).height() - 115);
    });
  }]);
