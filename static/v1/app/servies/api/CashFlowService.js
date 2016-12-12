angular.module('requesterModule').factory('CashFlowService', ['ZeusService', function(ZeusService) {
  var route = 'SP';
  var routeMain = 'Mercury/CashFlow/Main';
  var routeAsia = 'Mercury/CashFlow/AsiaPay';
  var routeXPay = 'Mercury/CashFlow/XPay';
  var payBank = 'Mercury/CashFlow';
  var routeMap = {
    BankList_Get: route,
    BankPrefixList_Get: route,
    XPayBankList_Get: route,
    BankListbyPaymentAgentID_Get: route,
    GetLastDepositOrder: routeMain,
    GetFavoritesBankList: routeMain,
    GetDepositCardFlag: routeMain,
    GetWebsiteSetting: routeMain,
    GetCashBankWay: routeAsia,
    Deposit: routeAsia,
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
        return ZeusService.call([action, action], data, callback);
      }
      console.log(route, action + ' is not defined...');
    }
  };
}]);
