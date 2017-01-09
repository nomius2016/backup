angular.module('requesterModule').factory('PlatformService', ['ZeusService', function(ZeusService) {
  var route = 'USER';
  var actionMap = {
    Balance: route,
    PlatformList_Get: route,
    Transfer: 'Transfer',
    depositHistory: 'deposit',
    withdrawHistory: 'withdraw',
    fundHistory: 'fund'
  };
  return {
    call: function(action, data, callback) {
      if (actionMap[action] !== undefined) {
        var route = actionMap[action];
        if (action == 'PlatformList_Get') {
          route = 'publicapi';
          action = 'getmaingames';
        }
        if(action == 'Transfer') {
          action = 'index';
        }
        if(action == 'depositHistory' || action == 'withdrawHistory') {
          action = 'history';
        }
        if(action == 'fundHistory') {
          action = 'log';
        }
        return ZeusService.call([route, action], data, callback);
      } else {
        console.log('PlatformService', action + ' is not defined...');
      }
    }
  };
}]);
