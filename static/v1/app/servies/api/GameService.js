angular.module('requesterModule').factory('GameService', ['ZeusService', function(ZeusService) {
  var route = 'SP';
  var route2 = 'Mercury/Game';
  var actionMap = {
    GetPromotions: route,
    GetJackpots: route,
    GetGames: route,
    GetCategories: route,
    GetPlatforms: route,
    GetPlayHistory: route2
  };
  var actionMap2 = {
    GetPromotions: 'GameService_GamePromotion_Get',
    GetJackpots: 'GameService_GameJackpot_Get',
    GetGames: 'GameService_GameList_WebsiteMode_Get',
    GetCategories: 'GameService_Category_Get',
    GetPlatforms: 'PlatformInfo_Get',
    GetPlayHistory: 'PlayGameHistory'
  };
  return {
    call: function(action, data, callback) {
      if (actionMap[action] !== undefined && actionMap2[action] !== undefined) {
        return ZeusService.call([actionMap[action], actionMap2[action]], data, callback);
      } else {
        console.log(route, action + ' is not defined...');
      }
    }
  };
}]);
