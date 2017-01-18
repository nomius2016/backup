angular.module('requesterModule').factory('PromotionService', ['ZeusService', function(ZeusService) {
  var route = 'publicapi';
  var actionMap = {
    getpromotions:route
  };
  return {
    call: function(action, data, callback) {
      if (actionMap[action] !== undefined) {
        
        return ZeusService.call([route, action], data, callback);
      } else {
        console.log('PromotionService', action + ' is not defined...');
      }
    }
  };
}]);
