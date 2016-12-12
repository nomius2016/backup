angular.module('requesterModule').factory('UtilityService', ['ZeusService', function(ZeusService) {
  var actionMap = {
    GetClientIPAddress: 'Utility',
    ValidGUIDToken: 'Token',
    IPAddressDeny_Get: 'SP',
    History_Referral_Get: 'SP',
    GuestsCounts_Get: 'SP',
    Currency_GetByIPAddress: 'SP',
    OlympicCnt: 'Utility',
    GetOlympicCnt: 'Utility',
    QuestionLanguage_Read: 'Utility/Live800',
    URLGenerator: 'Utility/Live800'
  };
  return {
    call: function(action, data, callback) {
      var route = actionMap[action];
      if (actionMap[action] === undefined) {
        console.log(route, action + ' is not defined...');
      } else {
        return ZeusService.call([route, action], data, callback);
      }
    }
  };
}]).filter("startFrom", function() {
  return function(e, t) {
    t = +t;
    return e.slice(t);
  }
}).filter("range", function() {
  return function(e, t) {
    t = parseInt(t);
    for (var n = 0; n < t; n++) {
      e.push(n);
    }
    return e;
  }
}).filter("leadingZero", function() {
  return function(e, t) {
    for (var n = e.toString(), o = n.length; o < t;) {
      n = "0" + n;
      o += 1;
    }
    return n;
  }
}).filter('currencyFix', function() {
  return function(e) {
    e += '';
    for (var t = /(-?\d+)(\d{3})/; t.test(e);) {
      e = e.replace(t, '$1,$2');
    }
    return e;
  };
});
