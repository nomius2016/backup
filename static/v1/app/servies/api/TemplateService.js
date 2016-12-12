angular.module('requesterModule').factory('TemplateService', ['ZeusService', function(ZeusService) {
  var route = 'SP';
  var actionMap = {
    Template_Get: 'Template_Get',
    BulletinText_Get: 'Website_Scrolling_TextInfo_GetByLanguageCode',
    PromotionContent_Get: 'WebSite_Content_GetByCurrencyID',
    Scrolling_TextInfo_Get: 'Scrolling_TextInfo_Get',
    Backend_WebSite_Content_V2_Get: 'Backend_WebSite_Content_V2_Get'
  };
  return {
    call: function(action, data, callback) {
      if (actionMap[action] !== undefined) {
        return ZeusService.call([route, actionMap[action]], data, callback);
      } else {
        console.log(route, action + ' is not defined...');
      }
    }
  };
}]);
