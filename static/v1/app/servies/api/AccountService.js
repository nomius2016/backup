angular.module('requesterModule').factory('AccountService', ['ZeusService', function(ZeusService) {
  var route = 'USER';
  var actionMap = {
    'MainAccount_Basicinfo_Get': 'Basic_Info',
    'MainAccount_Login': 'Login',
    'MainAccount_Logout': 'Logout',
    'MainAccount_Create': 'Register',
    'MainAccountExists_Check': 'MainAccountExists_Check',
    'MainAccount_UpdateBasicInfo': 'Update_Profile',
    'MainAccount_VIPInfo_Get': 'VipPoint',
    'MainAccount_VIPBonus_Setting_Get': 'MainAccount_VIPBonus_Setting_Get',
    'Mainaccount_All_Auth_Get': 'Mainaccount_All_Auth_Get',
    'MainAccount_ReAccountName_Check': 'MainAccount_ReAccountName_Check',
    'MainAccount_ReAccountName': 'MainAccount_ReAccountName',
    'MainAccount_RiskLevelType_Create': 'MainAccount_RiskLevelType_Create',
    'MainAccount_UpdateForgotPassword': 'MainAccount_UpdateForgotPassword',
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
