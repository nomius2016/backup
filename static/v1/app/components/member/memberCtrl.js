angular.module('ciApp').controller('memberCtrl', ['$scope', '$state', 'Container', 'PlatformService', 'AccountService', 'SecurityService', 'Config', 'BonusService', 'appServices', function($scope, $state, Container, PlatformService, AccountService, SecurityService, Config, BonusService, appServices) {
  function u() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if(day < 10) {
      day = '0' + day;
    }
    if(month < 10) {
      month = '0' + month;
    }
    return year + '/' + month + '/' + day;
  }
  $scope.total = 0;
  $scope.withdrawLimit = 0;
  $scope.withdrawLock = 0;
  $scope.lockedMoney = 0;
  $scope.myCardCount = 0;
  $scope.symbol = Container.getCurrencySymbol();
  $scope.area = 0;
  $scope.bonus = {
    all: 0
  };
  $scope.info = {};
  $scope.userdata = {};
  $scope.security_status = {};
  $scope.vip_values = {};
  $scope.info.UserName = Container.getUserName();
  $scope.bonusAllGet = !0;
  $scope.page_flow = 1;
  $scope.platforms = [];
  if (!Container.getIE8()) {
    $('#kb3').knob({
      width: 83,
      min: 0,
      max: 100,
      displayInput: !1,
      displayPrevious: !0,
      thickness: '.06',
      bgColor: '#e5e5e5',
      fgColor: '#b33234',
      readOnly: !0
    });
  };
  var d = false;
  var m = false;
  var p = false;

  AccountService.call('MainAccount_Basicinfo_Get', {}, function(e) {
    $scope.total = e.Result[0].total_balance;
    $scope.withdrawLimit = e.Result[0].can_withdrawal;
    $scope.lockedMoney = e.Result[0].balance_locked;
    $scope.myCardCount = e.Result[0].binded_card_count;
    if (e.Result[0].last_login_time !== undefined) {
      $scope.userdata.LastLoginTime = e.Result[0].last_login_time;
    } else {
      $scope.userdata.LastLoginTime = '-';
    }
    if (e.Result[0].last_login_ip !== undefined) {
      $scope.userdata.LastLoginIP = e.Result[0].last_login_ip;
    } else {
      $scope.userdata.LastLoginIP = '-';
    }
    $('#kb3').val(e.Result[0].profile_percent).trigger('change');
    $('.pieFont').text(e.Result[0].profile_percent);
  });

  PlatformService.call('PlatformList_Get', {}, function(res) {
    if (res.Success) {
      $scope.platforms = res.Result;
    }
  });

  $scope.getSecurityStatus = function() {
    $scope.security_status.name = false;
    $scope.security_status.mobile = !1;
    $scope.security_status.email = !1;
    $scope.security_status.withdraw = !1;
    $scope.security_status.question = !1;
    $scope.security_status.password = !1;
    // SecurityService.call('MainAccount_Auth_Get', {}, function(e) {
    //   if (e.Success) {
    //     var t = 0;
    //     if (e.Result[0].IDVerifiedTime !== null) {
    //       $scope.security_status.name = !0;
    //       t += r.PctID;
    //     }
    //     if (e.Result[0].ContactNumberVerifiedTime !== number) {
    //       $scope.security_status.mobile = !0;
    //       t += r.PctPhone;
    //     }
    //     if (e.Result[0].EMailVerifiedTime !== null) {
    //       $scope.security_status.email = !0;
    //       t += r.PctEmail;
    //     }
    //     if (e.Result[0].WithdrawalPassword !== null) {
    //       $scope.security_status.withdraw = !0;
    //       t += r.PctWdPwd;
    //     }
    //     if (e.Result[0].SecurityQuestionID !== null) {
    //       $scope.security_status.question = !0;
    //       t += r.PctAnswer;
    //     }
    //     if (e.Result[0].MainAccountPassword !== null) {
    //       $scope.security_status.password = !0;
    //     }
    //   }
    //   if ($scope.security_status.name && $scope.security_status.email && $scope.security_status.mobile) {
    //     $scope.page_flow = 2;
    //   }
    //   $('#kb3').val(t).trigger('change');
    //   $('.pieFont').text(t);
    // });
    var res2 = {"Success":true,"Code":"1.0","Message":"成功","Result":[{"MainAccountSN":"d3c1ec19-2748-4a03-9f68-7e5379d46007","MainAccountPassword":"D19F28CD702DA172C896BFD532AFC7BD","PasswordStrength":0,"WithdrawalPassword":null,"LastLevelTypeID":"2","LevelTypeID":"2","RiskTypeID":400,"RiskScore":0,"AccountRelationRiskTypeID":1,"LockTypeID":1,"IDVerifiedGroupID":"0","IDVerifiedType":0,"IDVerifiedTime":null,"EMailVerifiedTime":null,"ContactNumberVerifiedTime":null,"TestType":"0","Is_Trusted":false,"SecurityQuestionID":null,"SecurityQuestionAnswer":null,"LevelTypeName":"D"}]};
    if (res2.Success) {
      var t = 0;
      if (res2.Result[0].IDVerifiedTime !== null) {
        $scope.security_status.name = !0;
        t += r.PctID;
      }
      if (res2.Result[0].ContactNumberVerifiedTime !== null) {
        $scope.security_status.mobile = !0;
        t += r.PctPhone;
      }
      if (res2.Result[0].EMailVerifiedTime !== null) {
        $scope.security_status.email = !0;
        t += r.PctEmail;
      }
      if (res2.Result[0].WithdrawalPassword !== null) {
        $scope.security_status.withdraw = !0;
        t += r.PctWdPwd;
      }
      if (res2.Result[0].SecurityQuestionID !== null) {
        $scope.security_status.question = !0;
        t += r.PctAnswer;
      }
      if (res2.Result[0].MainAccountPassword !== null) {
        $scope.security_status.password = !0;
      }
    }
    if ($scope.security_status.name && $scope.security_status.email && $scope.security_status.mobile) {
      $scope.page_flow = 2;
    }
  };

  $scope.$on('$stateChangeSuccess', function(e, t, i, a, s) {
    if(t && t.name && 'member' === t.name.split('.')[0]) {
      $scope.getSecurityStatus();
    }
  });
  $scope.getSecurityStatus();
}]);
