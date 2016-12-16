angular.module('requesterModule', []).service('restService', ['$http', '$state', 'Storage', 'App', 'appServices', 'Container', function($http, $state, Storage, App, appServices, Container) {
  var httpPost = function(url, sendData) {
    return $http({
      url: url,
      method: "post",
      data: $.param(sendData || {}),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    })
  };
  return {
    post: function(url, data, callback) {
      var sendData = {};
      sendData.token = Storage.getCookie(App.token);
      sendData.inputdata = data;

      data.token = Storage.getCookie(App.token);
      if (callback) {
        httpPost(url, data).success(function(result) {
          if (!result.Success) {
            if (url.indexOf('balance') > -1) {

            } else if (url.indexOf('MainAccount_ReAccountName_Check') > -1) {

            } else if (url.indexOf('GetDepositCardFlag') > -1) {

            } else if (result.Code !== '0.99.0' || result.Code !== '-1.99.0') {
              console.log(url);
              console.log('token', sendData.token);
              console.log('inputdata', data);
              console.log('message', result.Message);
            }
            if (result.Code && result.Code == -1) {
              if (Container.getAuthStatus()) {
                Container.setAuthStatus(false);
                appServices.logout(false);
              }
              return false;
            }
          }
          return callback(result);
        }).error(function() {
          console.log(url, 'response failed');
        });
      } else {
        httpPost(url, data);
      }
    }
  }
}]).factory('LogService', ['restService', function(restService) {
  var url;
  var protocal = 'http://';
  var host = '10.10.102.112';
  var routes = ['WebMnemosyne', 'Mnemosyne', 'Log'];
  return {
    call: function(data, callback) {
      routes.unshift(host);
      url = protocal + routes.join('/');
      return restService.post(url, data, callback);
    }
  };
}]);
