angular.module('ciApp').factory('appServices', ['$state', '$rootScope', 'VERSION', 'Container', function($state, $rootScope, VERSION, Container) {
  return {
    reloadPage: function(target) {
      var targetState = target || $state.current;
      $state.transitionTo(targetState, $state.params, {
        reload: true,
        inherit: false,
        notify: true
      });
      $rootScope.$broadcast('reloadPage');
    },
    scrollTop: function() {
      $('html, body').scrollTop(0);
    },
    scrollAnchor: function(id) {
      $('html, body').scrollTop($(id).offset().top - $('#header').height());
    },
    showLoadingIcon: function(e) {
        $rootScope.$broadcast("showLoading", {
            showLoading: e
        });
    },
    getDomainName: function() {
      var domain = window.location.hostname;
      if (domain === 'localhost') {
        domain = 'www.ciapp.com';
      }
      return domain;
    },
    loadScript: function(url, callbackFn, type, charset) {
      if (type === undefined) {
        type = 'text/javascript';
      }
      if (charset === undefined) {
        charset = 'utf-8';
      }
      if (url) {
        var script;
        var heads = document.getElementsByTagName('head');
        if (heads && heads.length) {
          var head = heads[0];
          if (head) {
            script = document.createElement('script');
            script.setAttribute('src', url);
            script.setAttribute('type', type);
            if (charset) {
              script.setAttribute('charset', charset);
            }
            script.onreadystatechange = callbackFn;
            script.onload = callbackFn;
            head.appendChild(script);
          }
        }
        return script;
      }
    },
    showAlertMsg: function(title, content) {
      $rootScope.$broadcast('showAlertMsg', {
        title: title,
        content: content
      });
    },
    openLiveChat: function() {
      window.open('#/live800', 'Live800', 'menubar=no,status=no,scrollbars=no,location=no,resizable=no,top=50,left=100,toolbar=no,width=500,height=658');
    },
    ipConvertToLong: function(ip) {
      var arr_ip = ip.split('.');
      var retValue = 0;
      var pow = 3;
      if (arr_ip.length === 4) {
        for (var i = 0; i < arr_ip.length; i++) {
          retValue += Math.pow(256, pow) * parseInt(arr_ip[i]);
          pow--;
        }
      }
      return retValue;
    },
    getTemplatePath: function(lang, group, key) {
      var fromImageServer = true;
      switch (group) {
        case 'error':
          fromImageServer = false;
          break;
      }
      if (window.location.hostname === 'localhost') {
        fromImageServer = false;
      }
      var path = '';
      if (fromImageServer) {
        if (lang === 'en-us') {
          if (Container.getAuthStatus()) {
            lang = Container.getDenfaultLang();
          } else {
            lang = 'zh-cn';
          }
        }
        path = window.location.protocol + '//' + this.getDomainName() + '/static/v1/app/templates/' + lang + '/' + group + '--' + key.replace('/', '_') + '.html' + '?v=' + VERSION;
      } else {
        path = '/static/v1/app/templates' + '/' + lang + '/' + group + '--' + key.replace('/', '_') + '.html' + '?v=' + VERSION;
      }
      return path;
    },
    logout: function(bManual) {
      $rootScope.$broadcast('logout', {
        bManual: bManual
      });
    },
    needLogin: function() {
      $rootScope.$broadcast('needLogin');
    },
    needRegister: function() {
      $rootScope.$broadcast('needRegister');
    },
    forceClosePopupDialog: function() {
      $rootScope.$broadcast('hideModalDialog');
    },
    updateAffiliateInfo: function() {
      $rootScope.$broadcast('updateAffiliateInfo');
    },
    getCombinedUrl: function(headUrl) {
      var url = window.location.hostname;
      switch (url) {
        case 'localhost':
          url = 'localhost';
          break;
      }
      var protocal = window.location.protocol;
      var arrayUrl = url.split('.');
      if (arrayUrl.length === 2) {
        arrayUrl.unshift('');
      }
      arrayUrl[0] = headUrl;
      // return protocal + '//' + arrayUrl.join('.');
      return protocal + '//' + window.location.hostname;
    },
    replaceImgSrc: function(elem, attr) {
      var domain = this.getCombinedUrl('image');
      var srcStr = $(elem).attr(attr);
      var newStr = srcStr.replace('http://image.ciapp.com', domain);
      $(elem).attr(attr, newStr);
    },
    affiliateLogin: function(data) {
      $rootScope.$broadcast('affiliateLogin', data);
    },
    forceUpSidebar: function(data) {
      Container.setSidebarZ(data);
      $rootScope.$broadcast('forceUpSidebar', data);
    },
    basicInfoUpdated: function() {
      $rootScope.$broadcast('basicInfoUpdated');
    },
    updateBonus: function() {
      $rootScope.$broadcast('updateBonus');
    },
    openRegister: function() {
      $rootScope.$broadcast('openRegister');
    },
    loginFromLP: function() {
      $rootScope.$broadcast('loginFromLP');
    },
    getGMTStr: function() {
      var localTime = new Date();
      var str = '(GMT' + (localTime.getTimezoneOffset() > 0 ? '-' : '+') + (localTime.getTimezoneOffset() / -60) + ')';
      return str;
    },
    getServerTime: function() {
      var now = new Date();
      var server = new Date();
      var hours = -240;
      server.setMinutes(server.getMinutes() + now.getTimezoneOffset() + hours);
      return server;
    },
    getPagesNumber: function(totalCount, perPage, nowPage) {
      var pageCount = Math.ceil(totalCount / perPage);
      var pages = [];
      var diff, max, i;
      if (nowPage === 1) {
        diff = 4;
      } else if (nowPage === 2) {
        diff = 3;
      } else {
        diff = 2;
      }
      if (pageCount - nowPage > diff) {
        max = nowPage + diff;
      } else {
        max = pageCount;
      }
      i = max - 4 > 1 ? max - 4 : 1;
      for (i; i <= max; i++) {
        pages.push(i);
      }
      return pages;
    },
    showLoading: function(show) {
      if (show) {
        $('#main-loading-mask').show();
        $('body').css('overflow', 'hidden');
      } else {
        $('#main-loading-mask').hide();
        $('body').css('overflow', 'auto');
      }
    }
  };
}]).service('affiliateService', ['$state', 'BRAND_ID', 'appServices', 'AccountService', 'Container', 'Storage', 'App', function($state, BRAND_ID, appServices, AccountService, Container, Storage, App) {
  var affiliateSrcID = '';
  var affiliateType = 0;
  var affiliateGUID = '';
  var advertisementID = '';
  var affiliateCode = '';
  var affiliateDisplayID = '';
  var channelID = 0;
  var intADSeqNo = -1;
  var affiliateTypeMap = {
    advertisement: 1,
    agent: 3,
    friend: 4
  };
  var affiliateIsAutoLogin = false;
  var affiliateAutoLoginData = {
    target: '',
    user: '',
    token: ''
  };
  var forceDirect = false;

  function urlRedirect(path) {
    if (path) {
      if (path.indexOf('Register') >= 0) {
        $state.go('register');
      } else if (path.indexOf('Home') >= 0) {
        $state.go('home');
      } else if (path.indexOf('Games/Sports') >= 0) {
        $state.go('sports');
      } else if (path.indexOf('Games/GB') >= 0) {
        $state.go('gb_sports');
      } else if (path.indexOf('Games/Casino') >= 0) {
        $state.go('casino');
      } else if (path.indexOf('Games/Games') >= 0) {
        $state.go('games');
      } else if (path.indexOf('Games/Ssc') >= 0) {
        $state.go('ssc');
      } else if (path.indexOf('Games/Keno') >= 0) {
        $state.go('keno');
      } else if (path.indexOf('Games/Lotto') >= 0) {
        $state.go('lotto');
      } else if (path.indexOf('Promotion') >= 0) {
        $state.go('promotion');
      }
    }
  }

  function updateAffiliateInfo() {
    Storage.putCookie(App.affiliateID, affiliateDisplayID, {
      expires: 7
    });
    Storage.putCookie(App.affiliateType, affiliateType, {
      expires: 7
    });
    Storage.putCookie(App.affiliateGUID, affiliateGUID, {
      expires: 7
    });
    appServices.updateAffiliateInfo();
  }

  function createLog() {
    var data = {};
    data.intBrandID = BRAND_ID;
    data.intIDType = affiliateType;
    data.strAdvertisementID = advertisementID;
    data.strAffiliateCode = affiliateCode;
    data.intChannelID = channelID;
    data.strMemo = '';
    data.strCreator = 'Vwin.com';
    data.strIPAddress = Container.getIPAddress();
    data.intADSeqNo = intADSeqNo;
    data.strChannelType = 'W';
    AccountService.call('History_AdvertisementLog_Create', data, function(result) {
      if (result.Success === true) {
        affiliateGUID = result.Result[0].GUID;
        if (!forceDirect) {
          urlRedirect(result.Result[0].ItemUrl);
        }
      }
      updateAffiliateInfo();
    });
  }

  function removeAffiliateInfo() {
    Storage.removeCookie(App.affiliateID);
    Storage.removeCookie(App.affiliateType);
    Storage.removeCookie(App.affiliateGUID);
  }

  function reset() {
    affiliateSrcID = '';
    affiliateType = 0;
    affiliateDisplayID = '';
    advertisementID = '';
    affiliateCode = '';
    affiliateGUID = '';
    channelID = 0;
    intADSeqNo = -1;
    ip = '';
    forceDirect = false;
  }

  function otpLogin(target, data) {
    var parser = new UAParser();
    var browser = parser.getBrowser();
    var user = data.strLoginItem;
    data.intLoginType = 1;
    data.strDomain = appServices.getDomainName();
    data.bitDoubleLogin = false;
    data.strBrowserType = browser.name + ' ' + browser.major;
    data.strBrowserResolution = window.outerWidth + '*' + window.outerHeight;
    AccountService.call('MainAccount_Login_OTP', data, function(result) {
      if (result.Success === true) {
        if (result.Result[0].LoginSuccess) {
          affiliateIsAutoLogin = true;
          affiliateAutoLoginData.target = target;
          affiliateAutoLoginData.user = user;
          affiliateAutoLoginData.token = result.Result[0].Token;
          appServices.affiliateLogin(affiliateAutoLoginData);
        }
      } else {
        $state.go('home');
      }
    });
  }

  return {
    setAffiliateInfo: function(id, type) {
      affiliateSrcID = id;
      affiliateType = affiliateTypeMap[type];
    },
    setAffiliateInfoFromCookie: function(id, type, guid) {
      affiliateDisplayID = id;
      affiliateType = type;
      affiliateGUID = guid;
    },
    setForceDirect: function(bForceDirect) {
      forceDirect = bForceDirect;
    },
    init: function() {
      if (affiliateType > 0 && affiliateSrcID !== '') {
        var idNumber = parseInt(affiliateSrcID, 10);
        if (affiliateType === 1) {
          affiliateDisplayID = affiliateSrcID;
          AccountService.call('Advertisement_GetParameterByID', {
            intBrandID: BRAND_ID,
            intUrlID: idNumber
          }, function(result) {
            if (result.Success === true) {
              for (var i = 0; i < result.Result.length; i++) {
                if (result.Result[i].Key === 'AdvertisementID') {
                  advertisementID = result.Result[i].Value;
                }
                if (result.Result[i].Key === 'ChannelID') {
                  channelID = parseInt(result.Result[i].Value, 10);
                }
              }
              createLog();
            }
          });
        } else if (affiliateType === 3) {
          AccountService.call('AffAccount_GetUrlParameter', {
            intBrandID: BRAND_ID,
            UrlParameterID: idNumber
          }, function(result) {
            if (result.Success === true) {
              for (var i = 0; i < result.Result.length; i++) {
                if (result.Result[i].Key === 'AF') {
                  affiliateCode = result.Result[i].Value;
                  affiliateDisplayID = result.Result[i].Value;
                }
                if (result.Result[i].Key === 'AD') {
                  intADSeqNo = parseInt(result.Result[i].Value, 10);
                }
                if (result.Result[i].Key === 'CH') {
                  channelID = parseInt(result.Result[i].Value, 10);
                }
              }
              createLog();
            }
          });
        } else if (affiliateType === 4) {
          AccountService.call('MainAccountReferralParameter_Get', {
            intBrandID: BRAND_ID,
            intPromotionID: idNumber
          }, function(result) {
            if (result.Success === true) {
              for (var i = 0; i < result.Result.length; i++) {
                if (result.Result[i].Key === 'MainAccountID') {
                  affiliateDisplayID = result.Result[i].Value;
                  break;
                }
              }
              updateAffiliateInfo();
            }
          });
        }
      }
    },
    register: function(user) {
      if (affiliateGUID === '' || affiliateType === 4) {
        removeAffiliateInfo();
        reset();
        return false;
      }
      var data = {};
      data.intBrandID = BRAND_ID;
      data.intGUID = affiliateGUID;
      data.strMainAccountID = user;
      data.intLinkType = affiliateType;
      AccountService.call('History_advertisementlog_update', data, function(result) {
        removeAffiliateInfo();
        reset();
      });
    },
    autoLogin: function(target, data) {
      if (Storage.getCookie(App.account) === data.strLoginItem && Storage.getCookie(App.token) !== '') {
        otpLogin(target, data);
      }
    },
    cleanAutoLogin: function() {
      affiliateIsAutoLogin = false;
      affiliateAutoLoginData.target = '';
      affiliateAutoLoginData.user = '';
      affiliateAutoLoginData.token = '';
    },
    getAffiliateID: function() {
      return affiliateDisplayID;
    },
    getAffiliateType: function() {
      return affiliateType;
    },
    getAffiliateIsAutoLogin: function() {
      return affiliateIsAutoLogin;
    },
    getAffiliateAutoLoginData: function() {
      return affiliateAutoLoginData;
    }
  };
}]).service('verifyService', function() {
  return {
    checkPhone: function(countryCode, number) {
      var charVerify;
      switch (countryCode) {
        case '86':
          charVerify = /^[1]{1}[34578]{1}[0-9]{9}$/;
          break;
        case '84':
          charVerify = /^[9]{1}[0-9]{8}$|^[1]{1}[0-9]{9}$|^[8]{1}[0-9]{8}$/;
          break;
        case '66':
          charVerify = /^[13689]{1}[0-9]{8}$/;
          break;
        case '82':
          charVerify = /^[0]{1}[0-9]{10}$/;
          break;
        default:
          return false;
      }
      return charVerify.test(number);
    },
    checkHtmlValue: function(value) {
      if (value.indexOf('<') >= 0 || value.indexOf('>') >= 0) {
        return false;
      }
      return !value.match(/(<([^>]+)>)/gi);
    },
    checkEmailFormat: function(value) {
      return value.match(/^[0-9a-zA-Z]([-._]*[0-9a-zA-Z])*@[0-9a-zA-Z]([-._]*[0-9a-zA-Z])*\.+[a-zA-Z]+$/);
    },
    checkCodesFormat: function(value) {
      return value.match(/^[0-9]{6}$/);
    },
    checkZipCodeFormat: function(value) {
      return value.match(/^\d+$/);
    },
    checkIDCodeFormat: function(value) {
      return value.match(/^[0-9]{17}[0-9Xx]{1}$/);
    },
    checkWithdrawFormat: function(value) {
      return value.match(/^[a-zA-Z0-9]+$/);
    },
    checkWithdrawLength: function(value) {
      return value.length >= 8 && value.length <= 20;
    },
    checkSecurityAnsFormat: function(value) {
      return value.length <= 25;
    },
    checkPasswordFormat: function(value) {
      return value.match(/^[a-zA-Z0-9!@#$%^&*()_+]+$/);
    },
    checkPasswordLength: function(value) {
      return value.length >= 6 && value.length <= 20;
    },
    checkNumberOnly: function(value) {
      return value.match(/^[0-9]*$/);
    }
  };
}).service("maskService", function() {
  return {
    maskRealName: function(e) {
      for (var t = e.split(""), n = t.length, o = n - 1; o > 0; o--) t[o] = "*";
      return e = t.join("")
    },
    maskMobile: function(e) {
      if (null != e) {
        var t = e.split("");
        var n = t.length;
        t[n - 3] = "*", t[n - 4] = "*", t[n - 5] = "*", t[n - 6] = "*";
        e = t.join("")
      }
      return e;
    },
    maskEmail: function(e) {
      var t = e.split("@"),
        n = t[0].split(""),
        o = n.length;
      return n[o - 1] = "*", n[o - 2] = "*", n[o - 3] = "*", n[o - 4] = "*", e = n.join("") + "@" + t[1]
    }
  }
}).service("bankService", ["CashFlowService", "$q", "Container", "Config", function(e, t, n, o) {
  var a = {};
  var r = {};
  var i = {};
  var s = {};
  var c = false;
  var l = {};
  var u = {};
  var payMethod = ["withdraw", "online", "transfer", "cash", "deposit"];
  angular.forEach(payMethod, function(e) {
    s[e] = {};
  });
  var d = [];
  e.call("Get_Online_Bank", {}, function(t) {
    if(res.Success) {
      angular.forEach(t.Result, function(e) {
        var t = {
          BankName: e.BankName,
          cash: e.CashDeposit,
          deposit: e.Deposit,
          GUID: e.GUID,
          ImageName: e.ImageName,
          online: e.OnlinePayment,
          PaymentAgentID: e.PaymentAgentID,
          PaymentGUID: e.PaymentGUID,
          Priority: e.Priority,
          transfer: e.Transfer,
          withdraw: e.Withdrawal,
          duplicate: !1
        };
        a[t.GUID] = t;
        r[t.BankName] = t.GUID;
        angular.forEach(m, function(e) {
          "withdraw" === e ? t[e] && (void 0 === s[e][t.PaymentAgentID] && (s[e][t.PaymentAgentID] = []), s[e][t.PaymentAgentID].push(t)) : t[e] && t.deposit && (void 0 === s[e][t.PaymentAgentID] && (s[e][t.PaymentAgentID] = []), s[e][t.PaymentAgentID].push(t))
        })
      })
    }
    c = true;
  });

  return {
    getImage: function(e) {
      var t = null;
      for (var n in i)
        if (0 === e.indexOf(n)) {
          t = null === i[n] ? "000-000" : i[n].toString();
          break
        }
      return t
    },
    getPayment: function(e, t) {
      var o = [];
      if ("PA00001" === e) o = void 0 === s[t][e] ? [] : s[t][e];
      else if ("PA00004" === e) {
        var a = n.getCurrencyID();
        o = u[a][t]
      } else {
        var a = n.getCurrencyID();
        o = l[a][t]
      }
      return o
    },
    getBankList: function() {
      return a
    },
    isComplete: function() {
      return c
    }
  }
}]);
