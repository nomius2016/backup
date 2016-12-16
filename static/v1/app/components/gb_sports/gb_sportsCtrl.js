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
    var url = "http://msp2.vw033.com/Sports/Asia/Index.aspx?tpid=001&token=d65f4cbc3b6ed44b193575fc1135adba122dd6df99291c20e71ecaec5641b750e322aad27db0923640c8ddbf48b1ca4dd2d8616c703e553f9b9ed70c667973d14add040abb11050aba8915779455fb2d392d26f0f4d3416dc2e18732ae587a65e194aa31969b77486aa263e527a79c6c&languagecode=zh-cn";
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
