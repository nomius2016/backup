angular.module('requesterModule').factory('SecurityService', ['ZeusService', function(ZeusService) {
  var actionMap = {
    'MainAccount_Auth_Get': 'SP',
    'IDVerify': 'Utility/ZcxyCredit',
    'EmailVerify': 'Utility/Mail',
    'MobileVerify': 'Utility/Mobile',
    'SendSMSVerifyCode': 'Utility/SMS/SMSServices',
    'MainAccount_UpdatePassword': 'SP',
    'FundPassword_Set': 'USER',
    'Password_TokenCode_Auth': 'SP',
    'Password_TokenCode_Check': 'SP',
    'Security_Question_List': 'USER',
    'Security_Question_Set': 'USER',
    'Security_Question_Check': 'USER'
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
