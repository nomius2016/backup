angular.module('requesterModule', []).service('restService', ['$http', '$state', 'Storage', 'App', 'appServices', 'Container', function($http, $state, Storage, App, appServices, Container) {
  var httpPost = function(url, sendData) {
    return $http({
      url: url,
      method: 'post',
      data: $.param(sendData || {}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    });
  };

  return {
    post: function(url, data, callback) {
      var sendData = {};
      sendData.token = Storage.getCookie(App.token);
      sendData.inputdata = data;
      if (callback) {
        // httpPost(url, sendData).success(function(result) {
        httpPost(url, data).success(function(result) {
          if (!result.Success) {
            if (url.indexOf('GetBalance') > -1) {

            } else if (url.indexOf('MainAccount_ReAccountName_Check') > -1) {

            } else if (url.indexOf('GetDepositCardFlag') > -1) {

            } else if (result.Code !== '0.99.0' || result.Code !== '-1.99.0') {
              console.log(url);
              console.log('token', sendData.token);
              console.log('inputdata', data);
              console.log('message', result.Message);
            }
            if ((result.Code && result.Code.indexOf('0.99') === 0) || result.Code === '-1.99.0') {
              if (Container.getAuthStatus()) {
                var msg = '';
                if (result.Code.indexOf('0.99') === 0) {
                  switch (result.Code) {
                    case '0.99.1':
                      msg = '距离您的上一步操作已有一段时间，请问您在站点的访问是否遇到什么问题？ 7 X 24小时在线客服将会竭诚为您服务！';
                      break;
                    case '0.99.2':
                      msg = '己检测到相同账号登录，如有疑问请联系在线客服';
                      break;
                    case '0.99.4':
                      msg = '您的网路线路不稳，请重新登入';
                      break;
                    case '0.99.8':
                      msg = '您的帐户被锁定，请联系在线客服';
                      break;
                    default:
                      break;
                  }
                }
                Container.setAuthStatus(false);
                appServices.logout(false, msg);
              }
              appServices.showLoading(false);
              return false;
            }
          }
          return callback(result);
        }).error(function() {
          console.log(url, 'response failed');
          appServices.showLoading(false);
        });
      } else {
        // return httpPost(url, sendData);
        return httpPost(url, data);
      }
    }
  };
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
