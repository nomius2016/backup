angular.module('ciApp').controller('memberProfileCtrl', ['$scope', '$state', 'Container', 'GameService', 'MessageService', 'appServices', 'AccountService', 'maskService', function($scope, $state, Container, GameService, MessageService, appServices, AccountService, maskService) {
  $scope.messages = [];
  $scope.profilt_userdata = {};
  AccountService.call('MainAccount_Basicinfo_Get', {}, function(result) {
    $scope.data.member.birthday = result.Result[0].Birthday;
    $scope.data.member.email = result.Result[0].EMail;
    if (result.Result[0].FirstName !== '') {
      $scope.data.member.nameValid = true;
      $scope.data.member.name = result.Result[0].FirstName;
      if (result.Result[0].MiddleName !== '') {
        $scope.data.member.name += result.Result[0].MiddleName;
      }
      $scope.data.member.name = maskService.maskRealName($scope.data.member.name);
    }
    if (result.Result[0].Birthday !== undefined) {
      $scope.data.member.birthday = moment(result.Result[0].Birthday).format('YYYY/MM/DD');
      $scope.data.member.birthdayValid = true;
    }
    if (result.Result[0].EMail !== '' && result.Result[0].EMail !== null) {
      $scope.data.member.email = maskService.maskEmail(result.Result[0].EMail);
      $scope.data.member.emailValid = true;
    }
  });
  AccountService.call('MainAccount_Logininfo_Get', {}, function(result) {
    $scope.profilt_userdata.CreateTime = moment(result.Result[0].CreateTime).format('YYYY/MM/DD HH:mm:ss');
    $scope.profilt_userdata.LastLoginTime = moment(result.Result[0].LastLoginTime).format('YYYY/MM/DD HH:mm:ss');
    $scope.data.member.mobile = result.Result[0].ContactNumber;
    if ($scope.data.member.mobile !== '') {
      $scope.data.member.mobile = maskService.maskMobile(result.Result[0].ContactNumber);
      $scope.data.member.mobileValid = true;
    }
  });
  $scope.data = {
    member: {
      name: '',
      email: '',
      mobile: '',
      birthday: '',
      nameValid: false,
      mobileValid: false,
      emailValid: false,
      birthdayValid: false
    },
    recentGames: []
  };
  $scope.pager = {
    pageSize: 3,
    pageIndex: 0
  };
  $scope.getMessageList = function() {
    $scope.messages = [];
    MessageService.call('GetMessageList', {
      intRecordCounts: $scope.pager.pageSize,
      intPageNumber: $scope.pager.pageIndex,
      strOrderField: '',
      bitDesc: true
    }, function(result) {
      if (result.Success) {
        $scope.messages = result.Result.Table;
      }
    })
  };
  $scope.reloadPage = function() {
    appServices.reloadPage();
  };
  $scope.getMessageList();
  GameService.call('GetPlayHistory', {
    PlatformCode: '10001',
    LanguageCode: Container.getLang(),
    From: 1,
    To: 4
  }).success(function(result) {
    if (result.Success) {
      var recentGames = [];
      for (var i = 0; i < result.Result.length; i++) {
        recentGames.push({
          name: result.Result[i].GameName,
          image: result.Result[i].ImgUrl,
          GameCode: result.Result[i].GameCode,
          GameCategoryID: result.Result[i].GameCategoryID,
          PlatformCode: result.Result[i].PlatformCode
        });
      }
      $scope.data.recentGames = recentGames;
    }
  });
  $scope.clickOnGames = function(e) {
    window.open('#/games/playground?gameCode=' + e.GameCode + '&gameCategoryID=' + e.GameCategoryID + '&platformCode=' + e.PlatformCode + '&accountID=' + i.getUserName() + '&gameMode=0', 'Playground')
  };
}]);