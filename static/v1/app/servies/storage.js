angular.module('storageModule', ['ipCookie']).service('Storage', ['ipCookie', function(ipCookie) {
  var storage = null;
  if (typeof(Storage) !== 'undefined') {
    storage = localStorage;
  }
  this.get = function(key) {
    return (storage) ? storage[key] : ipCookie(key);
  };
  this.put = function(key, value) {
    if (storage) {
      storage[key] = value;
    } else {
      ipCookie(key, value);
    }
  };
  this.getCookie = function(key, option) {
    var value = (option) ? ipCookie(key, undefined, option) : ipCookie(key);
    if (value !== undefined && value !== '' && value !== null) {
      value = value.toString();
    } else {
      value = '';
    }
    return value;
  };
  this.putCookie = function(key, value, option) {
    if(option) {
      ipCookie(key, value, option);
    } else {
      ipCookie(key, value);
    }
  };
  this.removeCookie = function(key, option) {
    if(option) {
      ipCookie.remove(key, option);
    } else {
      ipCookie.remove(key);
    }
  };
}]);
