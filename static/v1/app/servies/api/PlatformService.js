angular.module('requesterModule').factory('PlatformService', ['ZeusService', function(ZeusService) {
  var route = 'SP';
  var route_Game = 'Mercury/Game';
  var actionMap = {
    PlayGame: route_Game,
    GetBalance: route_Game,
    PlatformList_Get: route,
    Transfer: route_Game,
    Platform_History_Funds_Get: route,
    MainAccount_History_Funds_Get: route,
    History_FundTransferLog_Get: route,
    History_DepositLog_Get: route,
    History_WithdrawalLog_Get: route,
    History_BonusLog_Get: route,
    MainAccount_FincialLog_Get: route,
    GetRaceLog: route_Game
  };
  return {
    call: function(action, data, callback) {
      if (actionMap[action] !== undefined) {
        var route = actionMap[action];
        return ZeusService.call([route, action], data, callback);
      } else {
        console.log('PlatformService', action + ' is not defined...');
      }
    }
  };
}]);