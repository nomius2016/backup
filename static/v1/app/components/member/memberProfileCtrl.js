angular.module('ciApp').controller('memberProfileCtrl', ['$scope', '$state', 'Container', 'GameService', 'MessageService', 'appServices', 'AccountService', 'maskService', function($scope, $state, Container, GameService, MessageService, appServices, AccountService, maskService) {
  $scope.data = {
    member: {
      username: '',
      realname: '',
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
  $scope.messages = [];
  $scope.profilt_userdata = {};
  AccountService.call('MainAccount_Basicinfo_Get', {}, function(result) {
    $scope.data.member.username = result.Result[0].username;
    
    if (result.Result[0].real_name) {
      $scope.data.member.nameValid = true;
      $scope.data.member.realname = maskService.maskRealName(result.Result[0].real_name);
    }
    $scope.data.member.birthday = result.Result[0].birthday;
    if ($scope.data.member.birthday) {
      $scope.data.member.birthdayValid = true;
    }
    if(result.Result[0].email) {
      $scope.data.member.email = result.Result[0].email;
      $scope.data.member.emailValid = true;
    }
    // $scope.profilt_userdata.CreateTime = moment(result.Result[0].CreateTime).format('YYYY/MM/DD HH:mm:ss');
    $scope.profilt_userdata.CreateTime = result.Result[0].register_time;
    $scope.profilt_userdata.LastLoginTime = result.Result[0].last_login_time;
    $scope.data.member.mobile = result.Result[0].phone;;
    if ($scope.data.member.mobile !== '') {
      $scope.data.member.mobile = maskService.maskMobile($scope.data.member.mobile);
      $scope.data.member.mobileValid = true;
    }
  });
  
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
  // GameService.call('GetPlayHistory', {
  //   PlatformCode: '10001',
  //   LanguageCode: Container.getLang(),
  //   From: 1,
  //   To: 4
  // }).success(function(result) {
  //   if (result.Success) {
  //     var recentGames = [];
  //     for (var i = 0; i < result.Result.length; i++) {
  //       recentGames.push({
  //         name: result.Result[i].GameName,
  //         image: result.Result[i].ImgUrl,
  //         GameCode: result.Result[i].GameCode,
  //         GameCategoryID: result.Result[i].GameCategoryID,
  //         PlatformCode: result.Result[i].PlatformCode
  //       });
  //     }
  //     $scope.data.recentGames = recentGames;
  //   }
  // });
  var res1 = {"Success":true,"Code":null,"Message":null,"Result":[]};
  if (res1.Success) {
    var recentGames = [];
    for (var i = 0; i < res1.Result.length; i++) {
      recentGames.push({
        name: res1.Result[i].GameName,
        image: res1.Result[i].ImgUrl,
        GameCode: res1.Result[i].GameCode,
        GameCategoryID: res1.Result[i].GameCategoryID,
        PlatformCode: res1.Result[i].PlatformCode
      });
    }
    $scope.data.recentGames = recentGames;
  }


  $scope.clickOnGames = function(e) {
    window.open('#/games/playground?gameCode=' + e.GameCode + '&gameCategoryID=' + e.GameCategoryID + '&platformCode=' + e.PlatformCode + '&accountID=' + i.getUserName() + '&gameMode=0', 'Playground')
  };
}]);
