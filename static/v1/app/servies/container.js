angular.module('containerModule', []).service('Container', function() {
  var currentLang = 'zh-cn';
  var authStatus = false;
  var blockStatus = false;
  var userName = '';
  var loadGbPlatform = false;
  var ipAddress = '';
  var device = '';
  var currencyID = -1;
  var currencySymbol = '¥';
  var accountInfoData = {};
  var securityData = {};
  var affiliateType = 0;
  var affiliateID = '';
  var promotionID = 0;
  var deviceType = '';
  var isIE8 = false;
  var release = false;
  var sidebarZ = false;
  var langByAssigned = '';
  var openReg = false;
  var loginLP = false;
  this.setLang = function(value) {
    currentLang = value;
  };
  this.getLang = function() {
    return currentLang;
  };
  this.setAuthStatus = function(value) {
    authStatus = value;
  };
  this.getAuthStatus = function() {
    return authStatus;
  };
  this.setBlockStatus = function(value) {
    blockStatus = value;
  };
  this.getBlockStatus = function() {
    return blockStatus;
  };
  this.setUserName = function(value) {
    userName = value;
  };
  this.getUserName = function() {
    return userName;
  };
  this.setGbPlatform = function(value) {
    loadGbPlatform = value;
  };
  this.getGbPlatform = function() {
    return loadGbPlatform;
  };
  this.setDevice = function(value) {
    device = value;
  };
  this.getDevice = function() {
    return device;
  };
  this.setIPAddress = function(value) {
    ipAddress = value;
  };
  this.getIPAddress = function() {
    return ipAddress;
  };
  this.setCurrencyID = function(value) {
    currencyID = value;
    switch (value) {
      case 1:
        currencySymbol = '$';
        break;
      case 2:
        currencySymbol = '¥';
        break;
      case 16:
        currencySymbol = '₫';
        break;
      case 18:
        currencySymbol = '฿';
        break;
      default:
        currencySymbol = '¥';
        break;
    }
  };
  this.getCurrencyID = function() {
    return currencyID;
  };
  this.getCurrencySymbol = function() {
    return currencySymbol;
  };
  this.setAccountInfo = function(value) {
    accountInfoData = value;
  };
  this.getAccountInfo = function() {
    return accountInfoData;
  };
  this.setSecurityStatus = function(value) {
    securityData = angular.copy(value);
  };
  this.getSecurityStatus = function() {
    return securityData;
  };
  this.setAffiliateType = function(value) {
    affiliateType = value;
  };
  this.getAffiliateType = function() {
    return affiliateType;
  };
  this.setAffiliateID = function(value) {
    affiliateID = value;
  };
  this.getAffiliateID = function() {
    return affiliateID;
  };
  this.setPromotionID = function(value) {
    promotionID = value;
  };
  this.getPromotionID = function() {
    return promotionID;
  };
  this.setDeviceType = function(value) {
    deviceType = value;
  };
  this.getDeviceType = function() {
    return deviceType;
  };
  this.setIE8 = function(value) {
    isIE8 = value;
  };
  this.getIE8 = function() {
    return isIE8;
  };
  this.setRelease = function(value) {
    release = value;
  };
  this.getRelease = function() {
    return release;
  };
  this.setSidebarZ = function(value) {
      sidebarZ = value;
  };
  this.getSidebarZ = function() {
      return sidebarZ;
  };
  this.setLangByAssigned = function(value) {
      langByAssigned = value;
  };
  this.getLangByAssigned = function() {
      return langByAssigned;
  }
  this.setOpenReg = function(value) {
      openReg = value;
  };
  this.getOpenReg = function() {
      return openReg;
  };
  this.setLoginLP = function(value) {
      loginLP = value;
  };
  this.getLoginLP = function() {
      return loginLP;
  };
});
