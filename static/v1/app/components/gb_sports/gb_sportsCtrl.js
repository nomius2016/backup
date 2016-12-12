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
    $scope.externalUrl = $sce.trustAsResourceUrl("http://msp2.vw033.com/Sports/Asia/Index.aspx?tpid=001&token=6296e4da60dbf110e928d53111cb0e576bcb8abbfea045ef4df57aa7f4ef11d6ee04ba2b73d79be467ba303e4d6b821cb7741c438249c058e0a3c98c5c7c7f277fe431c1dcbb6dfab42a8f08e42555061440780d2c83b0a4de978991b99e0c81e427b1bc78c8497015cdc173ddae1776&languagecode=zh-cn");
    $(document.body).css('overflow-y', 'hidden');
    $scope.$on('$destroy', function(e) {
      $(document.body).css('overflow-y', '');
    });
    $('#gbSportsGameScreen').height($(window).height() - 115);
    $(window).resize(function() {
      $('#gbSportsGameScreen').height($(window).height() - 115);
    });
  }]);
