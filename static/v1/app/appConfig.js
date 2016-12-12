angular.module('ciApp').constant('Config', {
  'MaxErrorCount': 5, // 最多輸入密碼錯誤次數
  'PctAnswer': 15, // 設定安全問題百分比
  'PctEmail': 10, // Email驗證百分比
  'PctID': 40, // ID驗證百分比
  'PctPhone': 20, // 手機驗證百分比
  'PctWdPwd': 15, // 設定提款密碼百分比
  'ptvwin.66.net': 'http://ptm.vwin.lan/', // PT環境, 導去的手機URL
  'uatvwin.66.net': 'http://uatm.vwin.lan/', // UAT環境, 導去的手機URL
  'localhost': 'http://ptm.vwin.lan/', // PT環境, 導去的手機URL
  'agent': 'a.aspx',
  'advertisement': 'b.aspx',
  'friend': 'c.aspx',
  'zeus_local': 'http://uatservice.66.net:81/Api', //'http://uatservice.66.net:81/Api',//'http://localhost:57822/',//
  'zeus_sit': 'http://sitapi.66.net/Api',
  'zeus_uat': 'http://uatservice.66.net/Api',
  'zeus_uat_new': 'http://service.veyaca.com/Api',
  'zeus_pt': 'http://uatservice.66.net:81/Api',
  'gbplatform_local': 'http://qasport.vwin.local',
  'gbplatform_release': 'msp2',
  'PlaytechActive': true,
  'SSCActive': true,
  'NYXActive': true,
  'MGActive': true,
  'AlipayActive': true,
  'WechatActive': true,
  'QuickActive': true,
  'XPayActive': true,
  'MoneyPayActive': true,
  'MoneyPayDepositCurrencyVND': true,
  'MoneyPayWithdrawCurrencyVND': true,
  'MoneyPayDepositCurrencyTHB': true,
  'MoneyPayWithdrawCurrencyTHB': false,
  'MoneyPayFrontMessageURL': 'http://paycenter.i4cute.com/TestForm/Settle.aspx',
  'GetCurrencyByIP': true,
  'PointActive': true,
  'RioBannerActive': false,
  'WithdrawPaymentDefaultCN': 'online',
  'WithdrawPaymentDefaultVND': 'moneypay',
  'WithdrawPaymentDefaultTHB': 'xpay',
  'DepositPaymentDefaultCN': 'online',
  'DepositPaymentDefaultVND': 'moneypay',
  'DepositPaymentDefaultTHB': 'xpay',
  'VWinBabyVNSite': 'https://docs.google.com/forms/d/e/1FAIpQLScqGxUnELlc9rD3VgynLiFLkD8nlTC1mdBaSP2xWlSpT1qlZA/viewform?c=0&w=1',
  'VWinBabyTHSite': 'https://docs.google.com/forms/d/e/1FAIpQLSdF92ds67HFux8SNWRCOlf7YD8D0f7XICdDbVdZlnsvbhV8zQ/viewform'
});
