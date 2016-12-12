angular.module('ciApp')
  .controller('homeCtrl', ['$scope', 'Container', 'appServices', 'Storage', function($scope, Container, appServices, Storage) {
    function getLangFlag(t) {
      switch (t) {
        case 'vi-vn':
          $scope.flag = 'vn';
          break;
        case 'th-th':
          $scope.flag = 'thai';
          break;
        default:
          $scope.flag = 'cn'
      }
    }
    $scope.regDate = Storage.getCookie('regTime');
    $scope.regDate_7 = parseInt($scope.regDate) + 6048e5;
    $scope.now = new Date();
    $scope.showWelcome = false;
    $scope.welcomeDate = Storage.getCookie('welcomeDate');
    if ($scope.regDate && $scope.regDate_7 > $scope.now && $scope.welcomeDate != $scope.now.getDate()) {
      $scope.showWelcome = true;
      Storage.putCookie('welcomeDate', $scope.now.getDate());
    }
    getLangFlag(Container.getLang());
    $scope.$on('langChanged', function(e, t) {
      getLangFlag(t.lang);
    });
    $scope.openLiveChat = function() {
      appServices.openLiveChat();
    }
  }]).directive("riowidget", ["Config", "Container", "TemplateService", "$http", "Storage", "UtilityService", "appServices", "BRAND_ID", "$sce", function(e, t, a, o, i, n, s, r, c) {
        return {
            restrict: "A",
            templateUrl: "/static/v1/app/components/home/riowidget.html",
            link: function(o, d) {
                function l() {
                    n.call("OlympicCnt", {
                        ctype: "GET"
                    }, function(e) {
                        e.Success && (o.cheerCnt = e.Message.split(":")[1])
                    })
                }

                function u(e) {
                    e /= 3600;
                    var t = e / 24;
                    e >= 0 ? t >= 1 ? (o.countUnit = "day@rio", o.cntDays = Math.floor(t)) : (o.countUnit = "hour@rio", o.cntDays = Math.ceil(e)) : (e -= 7, t = e / 24, o.countUnit = "day@rio", o.cntDays = Math.abs(Math.floor(t)))
                }

                function p(e) {
                    var t = 1;
                    return t = e < o.startDate ? 1 : e <= o.endDate ? 2 : 3, t > 1 && (o.title1 = "title_after1@rio", o.title2 = "title_after2@rio"), t
                }

                function h() {
                    var e = t.getCurrencyID() == -1 ? 2 : t.getCurrencyID(),
                        o = t.getLang();
                    switch (o.toUpperCase()) {
                        case "ZH-CN":
                            e = 2;
                            break;
                        case "EN-US":
                            2 == e ? o = "zh-cn" : 18 == e ? o = "th-th" : 16 == e && (o = "vi-vn");
                            break;
                        case "TH-TH":
                            e = 18;
                            break;
                        case "VI-VN":
                            e = 16
                    }
                    var i = {
                        token: "",
                        inputdata: {
                            intBrandID: r,
                            strLanguageCode: o,
                            intCurrencyID: e,
                            intLoginType: 0,
                            strContentPage: "1011"
                        }
                    };
                    a.call("Backend_WebSite_Content_V2_Get", i.inputdata, function(e) {
                        e.Success && e.Result.length > 0 && m(e.Result)
                    })
                }

                function m(e) {
                    for (var t = 0; t < e.length; t++) "Olympics2016c" === e[t].ContentName && (o.tpGB = c.trustAsHtml(e[t].ContentDetail));
                    for (var t = 0; t < e.length; t++) "Olympics2016f" === e[t].ContentName && (o.tpPromo = c.trustAsHtml(e[t].ContentDetail))
                }
                o.title1 = "title_before1@rio", o.title2 = "title_before2@rio", o.nowDate = new Date, o.nowDate2 = new Date, o.startDate = new Date(Date.UTC(2016, 7, 5, 23, 0, 0)), o.endDate = new Date(Date.UTC(2016, 7, 20, 16, 0, 0)), o.tpGBEnable = !0, o.tpPromoEnable = !0, o.tpGB = "", o.tpPromo = "", o.showBounce = !1, o.step = p(o.nowDate), o.enable = e.RioBannerActive, o.cheerCnt = 0, l(), o.countDown = Math.floor((o.startDate.getTime() - o.nowDate.getTime()) / 1e3), u(o.countDown);
                setInterval(function() {
                    o.countDown--, u(o.countDown)
                }, 1e3);
                h(), o.$watch("cntDays", function(e, t) {
                    1 == e && 0 == t && (o.step = p(o.nowDate2))
                }, !0), o.doCheer = function() {
                    var e = (new Date).getDate(),
                        t = "rioCnt1_" + e,
                        a = i.getCookie(t);
                    return "" === a ? a = 1 : a++, a > 5 ? (s.showAlertMsg("popup_alert_limit_title@rio", "popup_alert_limit_content@rio"), !1) : (i.putCookie(t, a, {
                        expires: 3
                    }), void n.call("OlympicCnt", {
                        ctype: "CNT"
                    }, function(e) {
                        e.Success && (o.showBounce = !0, e.Message.split(":")[1] > o.cheerCnt ? o.cheerCnt = e.Message.split(":")[1] : o.cheerCnt++, setTimeout(function() {
                            o.showBounce = !1
                        }, 1e3))
                    }))
                }
            }
        }
    }]);
