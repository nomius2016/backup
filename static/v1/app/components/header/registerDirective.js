angular.module('ciApp').directive('register', ["$timeout", "$state", "appServices", "verifyService", "affiliateService", "App", "Container", "Storage", "AccountService", "BRAND_ID", "BonusService", function($timeout, $state, appServices, verifyService, affiliateService, App, Container, Storage, AccountService, BRAND_ID, BonusService) {
  return {
    templateUrl: '/static/v1/app/components/header/register.html',
    restrict: 'A',
    scope: {},
    link: function($scope) {
      var submitData = {
        strCookie: '',
        strMainAccountID: '',
        strMainAccountPassword: '',
        intMainAccountType: 1,
        intPasswordStength: 0,
        strLanguageCode: 0,
        intCurrencyID: 0,
        strAreaCode: '',
        strContactNumber: '',
        intNewsLetter: 0,
        strIPAddress: Container.getIPAddress(),
        strMemo: '',
        strCreator: "ciapp.com",
        intPromotionType: 0,
        strPromotionCode: '',
        strDomain: appServices.getDomainName()
      };
      var affiliateAuto = false;
      var affiliateFromCookie = false;
    }
  }
}]);
