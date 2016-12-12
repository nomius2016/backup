angular.module('requesterModule').factory('SecurityService', ['ZeusService', function(ZeusService) {
  var actionMap = {
    'MainAccount_Auth_Get': 'SP',
    'IDVerify': 'Utility/ZcxyCredit',
    'EmailVerify': 'Utility/Mail',
    'MobileVerify': 'Utility/Mobile',
    'SendSMSVerifyCode': 'Utility/SMS/SMSServices',
    'MainAccount_UpdatePassword': 'SP',
    'MainAccount_UpdateWithdrawalPassword': 'SP',
    'MainAccount_UpdateSecurityQuestion': 'SP',
    'Password_TokenCode_Auth': 'SP',
    'Password_TokenCode_Check': 'SP',
    'SecurityQuestion_GetByLanguageCode': 'SP',
    'SecurityQuestion_Check': 'SP'
  };
  return {
    call: function(action, data, callback) {
      if (actionMap[action] === undefined) {
        console.log('SecurityService', action + ' is not defined...');
      } else {
        var route = actionMap[action];
        return ZeusService.call([route, action], data, callback);
      }
    },
    GetAuth: function(callback) {
      return ZeusService.call(['SP', 'MainAccount_Auth_Get'], {}, callback);
    }
  };
}]);
