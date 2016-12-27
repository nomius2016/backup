angular.module('ciApp').controller('membervipCtrl', ['$scope', '$stateParams', 'Container', 'AccountService', function($scope, $stateParams, Container, AccountService) {
  $scope.method = $stateParams.method;
  $scope.Symbol = Container.getCurrencySymbol();
  $scope.vip_values = {};
  AccountService.call('MainAccount_Basicinfo_Get', {}, function(result) {
    $scope.vip_values.LevelTypeID_now = result.Result[0].LevelTypeID;
    AccountService.call('MainAccount_VIPBonus_Setting_Get', {
      intLevelTypeID: $scope.vip_values.LevelTypeID_now
    }, function(res) {
      $scope.vip_values.BirthdayBonus = res.Result[0].BirthdayBonus;
      $scope.vip_values.CasinoBonus = res.Result[0].CasinoBonus;
      $scope.vip_values.DP_MaxLimit = res.Result[0].DP_MaxLimit;
      $scope.vip_values.LevelTypeID = res.Result[0].LevelTypeID;
      $scope.vip_values.LevelUpBonus = res.Result[0].LevelUpBonus;
      $scope.vip_values.SportsBonus = res.Result[0].SportsBonus;
      $scope.vip_values.TotalBonus = res.Result[0].TotalBonus;
      $scope.vip_values.TurnoverAmount = res.Result[0].TurnoverAmount;
      $scope.vip_values.VIPHelpBonusLimit = res.Result[0].VIPHelpBonusLimit;
      $scope.vip_values.VIPName = res.Result[0].VIPName;
      $scope.vip_values.VIPImage = '../../Styles/images/vip' + ($scope.vip_values.NextLevelTypeID - 3) + '.png';
    });
  });
  AccountService.call('MainAccount_VIPInfo_Get', {
    intCurrencyID: 3
  }, function(result) {
    $scope.vip_values.NextLevelTypeID = result.Result[0].NextLevelTypeID;
    $scope.vip_values.NextPoint = result.Result[0].NextPoint;
    $scope.vip_values.Points = result.Result[0].Points;
    $scope.vip_values.TotalPoints = Math.round(result.Result[0].TotalPoints) / 100;
    AccountService.call('MainAccount_VIPBonus_Setting_Get', {
      intLevelTypeID: $scope.vip_values.NextLevelTypeID
    }, function(res) {
      $scope.vip_values.BirthdayBonus_N = res.Result[0].BirthdayBonus;
      $scope.vip_values.CasinoBonus_N = res.Result[0].CasinoBonus;
      $scope.vip_values.DP_MaxLimit_N = res.Result[0].DP_MaxLimit;
      $scope.vip_values.LevelTypeID_N = res.Result[0].LevelTypeID;
      $scope.vip_values.LevelUpBonus_N = res.Result[0].LevelUpBonus;
      $scope.vip_values.SportsBonus_N = res.Result[0].SportsBonus;
      $scope.vip_values.TotalBonus_N = res.Result[0].TotalBonus;
      $scope.vip_values.TurnoverAmount_N = res.Result[0].TurnoverAmount;
      $scope.vip_values.VIPHelpBonusLimit_N = res.Result[0].VIPHelpBonusLimit;
      $scope.vip_values.VIPName_N = res.Result[0].VIPName;
      $scope.vip_values.VIPImage_N = '../../Styles/images/vip' + ($scope.vip_values.NextLevelTypeID - 2) + '.png';
    });
  });
}]);
