angular.module('requesterModule').factory('CashFlowService', ['ZeusService', function(ZeusService) {
  var route = 'SP';
  var routeMain = 'Mercury/CashFlow/Main';
  var routeAsia = 'Mercury/CashFlow/AsiaPay';
  var routeXPay = 'Mercury/CashFlow/XPay';
  var payBank = 'Mercury/CashFlow';
  var routeMap = {
    Get_Online_Bank: route,
    Apply: route,
    GetLastDepositOrder: routeMain,
    GetFavoritesBankList: routeMain,
    GetDepositCardFlag: routeMain,
    GetWebsiteSetting: routeMain,
    GetCashBankWay: routeAsia,
    DepositCancel: routeAsia,
    GetDepositReceive: routeAsia,
    Withdraw: routeAsia,
    GetWithdrawalBindCard: routeMain,
    DeleteBankCard: routeMain,
    GetDCardInfoInfo: routeAsia,
    XDeposit: routeXPay,
    XWithdraw: routeXPay,
    'PayBank/Deposit': payBank,
    'PayBank/DepositOrderLastOne': payBank,
    'PayBank/DepositOrderCancel': payBank,
    'PayBank/Withdrawal': payBank
  };
  return {
    call: function(action, data, callback) {
      var route = routeMap[action];
      if (route !== undefined) {
        if(action == 'Get_Online_Bank' || action == 'Apply') {
          route = 'deposit';
        }
        return ZeusService.call([route, action], data, callback);
      }
      console.log(route, action + ' is not defined...');
    }
  };
}]);
