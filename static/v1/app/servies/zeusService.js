angular.module('requesterModule').factory('ZeusService', ['restService', 'Container', function(restService, Container) {
  var url;
  var zeusHost = '';
  return {
    call: function(routes, data, callback) {
      var _lang = Container.getLang();
      _lang = _lang.length === 0 ? 'zh-cn' : _lang;
      var route = routes[0].toLowerCase();
      if (route === 'sp') {
        routes.splice(1, 0, _lang);
      } else if (route.indexOf('cashflow') > -1) {} else if (route.indexOf('mercury') > -1) {
        routes.splice(1, 0, _lang);
      }
      routes.unshift(zeusHost);
      url = routes.join('/');
      return restService.post(url, data, callback);
    },
    post: function(routeUrl, data, callback) {
      var routes = routeUrl.split('/');
      return this.call(routes, data, callback);
    },
    setHost: function(host) {
      zeusHost = host;
    }
  };
}]);
