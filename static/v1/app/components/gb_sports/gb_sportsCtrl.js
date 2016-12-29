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
    $scope.externalUrl = $sce.trustAsResourceUrl('/play/sb');
    $(document.body).css('overflow-y', 'hidden');
    $scope.$on('$destroy', function(e) {
      $(document.body).css('overflow-y', '');
    });
    $('#gbSportsGameScreen').height($(window).height() - 115);
    $(window).resize(function() {
      $('#gbSportsGameScreen').height($(window).height() - 115);
    });
  }]);
