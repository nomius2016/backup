angular.module('ciApp').controller('memberCtrl', ['$scope', '$state', 'Container', 'MessageService', 'AccountService', 'SecurityService', 'Config', 'BonusService', 'appServices', function($scope, $state, Container, MessageService, AccountService, SecurityService, Config, BonusService, appServices) {
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
  var c = $scope;
  c.Symbol = Container.getCurrencySymbol();
  c.area = 0;
  c.bonus = {
    all: 0
  };
  c.info = {};
  c.userdata = {};
  c.security_status = {};
  c.vip_values = {};
  c.info.UserName = Container.getUserName();
  c.bonusAllGet = !0;
  c.page_flow = 1;
  if (Container.getIE8()) {
    $('#kb3').knob({
      width: 83,
      min: 0,
      max: 100,
      displayInput: !1,
      displayPrevious: !0,
      thickness: '.06',
      bgColor: '#e5e5e5',
      fgColor: '#27ae61',
      readOnly: !0
    });
  };
  // BonusService.call('Bonus_VerifyList_Get', {
  //   intCurrencyID: Container.getCurrencyID()
  // }, function(result) {
  //   if (result.Success) {
  //     c.bonus.ID = result.Result[0].BonusAmount;
  //     c.bonus.Email = result.Result[1].BonusAmount;
  //     c.bonus.Mobile = result.Result[2].BonusAmount;
  //     c.bonus.all = parseInt(c.bonus.ID) + parseInt(c.bonus.Mobile) + parseInt(c.bonus.Email)
  //   }
  // });
  var res0 = {"Success":true,"Code":"1.0","Message":"成功","Result":[{"BonusCategoryTypeID":1,"Name":"身份证验证红利","BonusAmount":18.0000,"WithdrawalLimitPercent":5.0,"AffiliateLimitBonusAmount":0.0000,"AuditStatus":1},{"BonusCategoryTypeID":2,"Name":"Email验证红利","BonusAmount":8.0000,"WithdrawalLimitPercent":5.0,"AffiliateLimitBonusAmount":0.0000,"AuditStatus":1},{"BonusCategoryTypeID":3,"Name":"手机验证红利","BonusAmount":12.0000,"WithdrawalLimitPercent":5.0,"AffiliateLimitBonusAmount":0.0000,"AuditStatus":1}]};
  if (res0.Success) {
    c.bonus.ID = res0.Result[0].BonusAmount;
    c.bonus.Email = res0.Result[1].BonusAmount;
    c.bonus.Mobile = res0.Result[2].BonusAmount;
    c.bonus.all = parseInt(c.bonus.ID) + parseInt(c.bonus.Mobile) + parseInt(c.bonus.Email)
  }
  var d = false;
  var m = false;
  var p = false;
  // AccountService.call('MainAccount_Basicinfo_Get', {}, function(e) {
  //   c.userdata.FirstName = e.Result[0].FirstName;
  //   c.userdata.HandicapID = e.Result[0].HandicapID;
  //   c.userdata.gender = e.Result[0].Gender;
  //   c.userdata.AreaCode = e.Result[0].AreaCode;
  //   c.userdata.city = e.Result[0].City;
  //   c.userdata.region = e.Result[0].Region;
  //   c.userdata.zipcode = e.Result[0].ZipCode;
  //   c.userdata.address = e.Result[0].Address;
  //   c.userdata.birthday = moment(e.Result[0].Birthday).format('YYYY/MM/DD');
  // });
  var res1 = {"Success":true,"Code":"1.0","Message":"成功","Result":[{"MainAccountSN":"d3c1ec19-2748-4a03-9f68-7e5379d46007","LanguageCode":"zh-cn","CurrencyID":2,"HandicapID":2,"FirstName":"","MiddleName":"","LastName":"","IDVerifiedNumber":null,"Birthday":null,"Gender":null,"EMail":null,"AreaCode":"86","ContactNumber":"3snd5EsUzaVOqehdl4IUkQ==","CountryID":2,"City":null,"Region":null,"ZipCode":null,"Address":null,"SecurityQuestionID":null,"SecurityAnswer":null,"NewsLetter":1,"Image":null,"PromotionType":1,"PromotionCode":"308","QQAccount":null,"SkypeAccount":null,"PromotionChannel":null,"PromotionExperience":null,"URL":null,"URL_Previous":null,"PromotionID":134496,"Audittype":0,"IsApply":1}]};
  c.userdata.FirstName = res1.Result[0].FirstName;
  c.userdata.HandicapID = res1.Result[0].HandicapID;
  c.userdata.gender = res1.Result[0].Gender;
  c.userdata.AreaCode = res1.Result[0].AreaCode;
  c.userdata.city = res1.Result[0].City;
  c.userdata.region = res1.Result[0].Region;
  c.userdata.zipcode = res1.Result[0].ZipCode;
  c.userdata.address = res1.Result[0].Address;
  c.userdata.birthday = moment(res1.Result[0].Birthday).format('YYYY/MM/DD');
  var _ = new Date();
  var v = _.getTimezoneOffset() / -60;
  // AccountService.call('MainAccount_Logininfo_Get', {}, function(e) {
  //   if (e.Result[0].LastLoginTime !== undefined) {
  //     c.userdata.LastLoginTime = moment(e.Result[0].LastLoginTime).add(v - -4, 'hour').format('YYYY/MM/DD HH:mm:ss') + ' ' + appServices.getGMTStr();
  //   } else {
  //     c.userdata.LastLoginTime = '-';
  //   }
  // });
  var res1 = {"Success":true,"Code":"1.0","Message":"Unknown","Result":[{"MainAccountID":"god123456","FirstName":"","BalanceAmount":0.0000,"ContactNumber":"13612031031","EMail":null,"Birthday":null,"Gender":null,"CountryID":2,"AreaCode":"86","ZipCode":null,"City":null,"Address":null,"CountryName":"中国","IDVerifiedNumber":"","CurrencyID":2,"LanguageCode":"zh-cn","MiddleName":"","LastName":"","HandicapID":2,"Region":null,"NewsLetter":1,"LevelTypeID":"2","MainAccountSN":"d3c1ec19-2748-4a03-9f68-7e5379d46007","SecurityQuestionID":null,"SecurityAnswer":null,"LastLoginTime":"2016-12-14T03:38:44.44","CreateTime":"2016-06-17T10:16:02.883","PromotionID":134496,"MainAccountType":1}]};
  if (res1.Result[0].LastLoginTime !== undefined) {
    c.userdata.LastLoginTime = moment(res1.Result[0].LastLoginTime).add(v - -4, 'hour').format('YYYY/MM/DD HH:mm:ss') + ' ' + appServices.getGMTStr();
  } else {
    c.userdata.LastLoginTime = '-';
  }

  c.getSecurityStatus = function() {
    c.security_status.name = false;
    c.security_status.mobile = !1;
    c.security_status.email = !1;
    c.security_status.withdraw = !1;
    c.security_status.question = !1;
    c.security_status.password = !1;
    // SecurityService.call('MainAccount_Auth_Get', {}, function(e) {
    //   if (e.Success) {
    //     var t = 0;
    //     if (e.Result[0].IDVerifiedTime !== null) {
    //       c.security_status.name = !0;
    //       t += r.PctID;
    //     }
    //     if (e.Result[0].ContactNumberVerifiedTime !== number) {
    //       c.security_status.mobile = !0;
    //       t += r.PctPhone;
    //     }
    //     if (e.Result[0].EMailVerifiedTime !== null) {
    //       c.security_status.email = !0;
    //       t += r.PctEmail;
    //     }
    //     if (e.Result[0].WithdrawalPassword !== null) {
    //       c.security_status.withdraw = !0;
    //       t += r.PctWdPwd;
    //     }
    //     if (e.Result[0].SecurityQuestionID !== null) {
    //       c.security_status.question = !0;
    //       t += r.PctAnswer;
    //     }
    //     if (e.Result[0].MainAccountPassword !== null) {
    //       c.security_status.password = !0;
    //     }
    //   }
    //   if (c.security_status.name && c.security_status.email && c.security_status.mobile) {
    //     c.page_flow = 2;
    //   }
    //   $('#kb3').val(t).trigger('change');
    //   $('.pieFont').text(t);
    // });
    var res2 = {"Success":true,"Code":"1.0","Message":"成功","Result":[{"MainAccountSN":"d3c1ec19-2748-4a03-9f68-7e5379d46007","MainAccountPassword":"D19F28CD702DA172C896BFD532AFC7BD","PasswordStrength":0,"WithdrawalPassword":null,"LastLevelTypeID":"2","LevelTypeID":"2","RiskTypeID":400,"RiskScore":0,"AccountRelationRiskTypeID":1,"LockTypeID":1,"IDVerifiedGroupID":"0","IDVerifiedType":0,"IDVerifiedTime":null,"EMailVerifiedTime":null,"ContactNumberVerifiedTime":null,"TestType":"0","Is_Trusted":false,"SecurityQuestionID":null,"SecurityQuestionAnswer":null,"LevelTypeName":"D"}]};
    if (res2.Success) {
      var t = 0;
      if (res2.Result[0].IDVerifiedTime !== null) {
        c.security_status.name = !0;
        t += r.PctID;
      }
      if (res2.Result[0].ContactNumberVerifiedTime !== null) {
        c.security_status.mobile = !0;
        t += r.PctPhone;
      }
      if (res2.Result[0].EMailVerifiedTime !== null) {
        c.security_status.email = !0;
        t += r.PctEmail;
      }
      if (res2.Result[0].WithdrawalPassword !== null) {
        c.security_status.withdraw = !0;
        t += r.PctWdPwd;
      }
      if (res2.Result[0].SecurityQuestionID !== null) {
        c.security_status.question = !0;
        t += r.PctAnswer;
      }
      if (res2.Result[0].MainAccountPassword !== null) {
        c.security_status.password = !0;
      }
    }
    if (c.security_status.name && c.security_status.email && c.security_status.mobile) {
      c.page_flow = 2;
    }
    $('#kb3').val(t).trigger('change');
    $('.pieFont').text(t);
  };
  // BonusService.call('GetBonusList', {
  //   intBrandID: 2,
  //   dtStartDate: '1900/01/01',
  //   dtEndDate: u(),
  //   intBonusCategoryID: 1,
  //   intApplyType: -1,
  //   strMainAccountID: Container.getUserName(),
  //   intReceiveStatus: 2,
  //   strLanguageCode: Container.getLang(),
  //   intPageNumber: 0,
  //   intRecordCounts: 100,
  //   strOrderField: '',
  //   bitDesc: !1
  // }).success(function(t) {
  //   if (t.Success && t.Result && t.Result.Table && t.Result.Table.length > 0) {
  //     e.bonusAllGet = !1;
  //     for (var i = 0; i < t.Result.Table.length; i++) {
  //       switch (t.Result.Table[i].BonusCategoryTypeID) {
  //         case 1:
  //           d = !0;
  //           break;
  //         case 2:
  //           m = !0;
  //           break;
  //         case 3:
  //           p = !0
  //       }
  //     }
  //   }
  //   if (d && m && p) {
  //     c.page_flow = 3
  //   }
  // });
  var res3 = {"Success":true,"Code":"1.0","Message":"成功","Result":{"Table":[],"Table1":[{"TotalCount":"0"}]}};
  if (res3.Success && res3.Result && res3.Result.Table && res3.Result.Table.length > 0) {
    e.bonusAllGet = !1;
    for (var i = 0; i < res3.Result.Table.length; i++) {
      switch (res3.Result.Table[i].BonusCategoryTypeID) {
        case 1:
          d = !0;
          break;
        case 2:
          m = !0;
          break;
        case 3:
          p = !0
      }
    }
  }
  if (d && m && p) {
    c.page_flow = 3
  }


  c.getVIPStatus = function() {
    // AccountService.call('MainAccount_Logininfo_Get', {}, function(e) {
    //   c.vip_values.LevelTypeID_now = e.Result[0].LevelTypeID;
    //   AccountService.call('MainAccount_VIPBonus_Setting_Get', {
    //     intLevelTypeID: parseInt(c.vip_values.LevelTypeID_now)
    //   }, function(e) {
    //     c.vip_values.BirthdayBonus = e.Result[0].BirthdayBonus;
    //     c.vip_values.CasinoBonus = e.Result[0].CasinoBonus;
    //     c.vip_values.DP_MaxLimit = e.Result[0].DP_MaxLimit;
    //     c.vip_values.LevelTypeID = e.Result[0].LevelTypeID;
    //     c.vip_values.LevelUpBonus = e.Result[0].LevelUpBonus;
    //     c.vip_values.SportsBonus = e.Result[0].SportsBonus;
    //     c.vip_values.TotalBonus = e.Result[0].TotalBonus;
    //     c.vip_values.TurnoverAmount = e.Result[0].TurnoverAmount;
    //     c.vip_values.VIPHelpBonusLimit = e.Result[0].VIPHelpBonusLimit;
    //     c.vip_values.VIPName = e.Result[0].VIPName;
    //     switch (c.vip_values.LevelTypeID) {
    //       case '3':
    //         c.vip_values.icon = 'vip_1';
    //         break;
    //       case '4':
    //         c.vip_values.icon = 'vip_2';
    //         break;
    //       case '5':
    //         c.vip_values.icon = 'vip_3';
    //         break;
    //       case '6':
    //         c.vip_values.icon = 'vip_4';
    //         break;
    //       default:
    //         c.vip_values.icon = '';
    //         break;
    //     }
    //   });
    // });
    AccountService.call('MainAccount_VIPInfo_Get', {
      intCurrencyID: 3
    }, function(e) {
      c.vip_values.TotalPoints = Math.round(e.Result[0].monthPoint) / 100;
      c.vip_values.YearPoints = Math.round(e.Result[0].yearPoint) / 100;
      c.vip_values.VIPName_N = e.Result[0].vipName;
      c.vip_values.LevelUpBonus_N = e.Result[0].LevelUpBonus;
      // c.vip_values.NextLevelTypeID = e.Result[0].NextLevelTypeID;
      // c.vip_values.NextPoint = e.Result[0].NextPoint;
      // c.vip_values.Points = e.Result[0].Points;
      // c.vip_values.TotalPoints = Math.round(e.Result[0].TotalPoints) / 100;
      // c.vip_values.YearPoints = Math.round(e.Result[0].YearPoints) / 100;
      // c.vip_values.YearPoints = Math.round(e.Result[0].YearPoints) / 100;
      // AccountService.call('MainAccount_VIPBonus_Setting_Get', {
      //   intLevelTypeID: c.vip_values.NextLevelTypeID
      // }, function(e) {
      //   c.vip_values.BirthdayBonus_N = e.Result[0].BirthdayBonus;
      //   c.vip_values.CasinoBonus_N = e.Result[0].CasinoBonus;
      //   c.vip_values.DP_MaxLimit_N = e.Result[0].DP_MaxLimit;
      //   c.vip_values.LevelTypeID_N = e.Result[0].LevelTypeID;
      //   c.vip_values.LevelUpBonus_N = e.Result[0].LevelUpBonus;
      //   c.vip_values.SportsBonus_N = e.Result[0].SportsBonus;
      //   c.vip_values.TotalBonus_N = e.Result[0].TotalBonus;
      //   c.vip_values.TurnoverAmount_N = e.Result[0].TurnoverAmount;
      //   c.vip_values.VIPHelpBonusLimit_N = e.Result[0].VIPHelpBonusLimit;
      //   c.vip_values.VIPName_N = e.Result[0].VIPName;
      //   c.vip_values.VIPImage_N = '../../Styles/images/vip' + (c.vip_values.NextLevelTypeID - 2) + '.png'
      // });
    });
  };
  c.$on('$stateChangeSuccess', function(e, t, i, a, s) {
    if(t && t.name && 'member' === t.name.split('.')[0]) {
      c.getSecurityStatus();
    }
  });
  // c.getSecurityStatus();
  c.getVIPStatus();
}]);
