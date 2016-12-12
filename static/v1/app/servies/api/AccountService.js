angular.module('requesterModule').factory('AccountService', ['ZeusService', function(ZeusService) {
  var route = 'SP';
  var actionMap = {
    'MainAccount_Basicinfo_Get': 'MainAccount_Basicinfo_Get',
    'MainAccount_Login': 'MainAccount_Login',
    'MainAccount_Logout': 'MainAccount_Logout',
    'MainAccount_Create': 'MainAccount_Create',
    'MainAccountExists_Check': 'MainAccountExists_Check',
    'MainAccount_UpdateBasicInfo': 'MainAccount_UpdateBasicInfo',
    'MainAccount_VIPInfo_Get': 'MainAccount_VIPInfo_Get',
    'MainAccount_VIPBonus_Setting_Get': 'MainAccount_VIPBonus_Setting_Get',
    'Mainaccount_All_Auth_Get': 'Mainaccount_All_Auth_Get',
    'MainAccount_ReAccountName_Check': 'MainAccount_ReAccountName_Check',
    'MainAccount_ReAccountName': 'MainAccount_ReAccountName',
    'MainAccount_RiskLevelType_Create': 'MainAccount_RiskLevelType_Create',
    'MainAccount_UpdateForgotPassword': 'MainAccount_UpdateForgotPassword',
    'MainAccount_Logininfo_Get': 'MainAccount_Logininfo_Get',
    'AffAccount_GetUrlParameter': 'AffAccount_GetUrlParameter',
    'Advertisement_GetParameterByID': 'Advertisement_GetParameterByID',
    'MainAccountReferralParameter_Get': 'MainAccountReferralParameter_Get',
    'History_advertisementlog_update': 'History_advertisementlog_update',
    'Account_AffiliateID_Get': 'Account_AffiliateID_Get',
    'History_AdvertisementLog_Create': 'History_AdvertisementLog_Create',
    'Password_TokenCode_3rdParty': 'Password_TokenCode_3rdParty_CreateByMainAccountID',
    'MainAccount_Login_OTP': 'MainAccount_Login_OTP',
    'MainAccount_ReceiverInfo_Get': 'MainAccount_ReceiverInfo_Get',
    'MainAccount_ReceiverInfo_Update': 'MainAccount_ReceiverInfo_Upsert'
  };
  return {
    call: function(action, data, callback) {
      if (actionMap[action] === undefined) {
        console.log(route, action + ' is not defined...');
      } else {
        return ZeusService.call([route, actionMap[action]], data, callback);
      }
    },
    GetRealNameSetting: function(callback) {
      return ZeusService.call(['SP', 'MainAccount_ReAccountName_Check'], {}, callback);
    },
    SetRealName: function(first, middle, last, callback) {
      var data = {
        strNewFirstName: first,
        strNewMiddleName: middle,
        strNewLastName: last,
        strMemo: ''
      };
      return ZeusService.call(['SP', 'MainAccount_ReAccountName'], data, callback);
    }
  };
}]);
