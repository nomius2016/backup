angular.module('ciApp').controller('memberTradeCtrl', ['$scope', '$filter', 'Container', 'PlatformService', 'appServices', function($scope, $filter, Container, PlatformService, appServices) {
  function o(e) {
    var a = true;
    switch ($scope.currencyID) {
      case 2:
        break;
      case 16:
        a = '40005' !== e.code && '40007' !== e.code;
        break;
      case 18:
        a = '40002' !== e.code;
    }
    return a;
  }
  $scope.pager = {
    pageSize: 7,
    pageCount: 1,
    pageIndex: 0,
    turnPage: function(e) {
      $scope.pager.pageIndex = e;
      $scope.getTradeList();
    }
  };
  $scope.currencyID = Container.getCurrencyID();
  $scope.platforms = [];
  $scope.enddate = appServices.getServerTime();
  $scope.startdate = moment($scope.enddate).subtract(6, 'days').toDate();
  $('#datepicker_end').datepicker({
    dateFormat: 'yy/mm/dd',
    maxDate: $scope.enddate,
    minDate: moment($scope.enddate).subtract(5, 'days').toDate(),
    onClose: function() {
      $scope.enddate = $('#datepicker_end').datepicker('getDate');
      $('#datepicker_start').datepicker('option', 'maxDate', moment($scope.enddate).subtract(1, 'days').toDate());
    }
  });
  $('#datepicker_start').datepicker({
    dateFormat: 'yy/mm/dd',
    maxDate: moment($scope.enddate).subtract(1, 'days').toDate(),
    minDate: -99,
    onClose: function() {
      $scope.startdate = $('#datepicker_start').datepicker('getDate');
      $('#datepicker_end').datepicker('option', 'minDate', moment($scope.startdate).add(1, 'days').toDate());
    }
  });
  $('#datepicker_end').datepicker('setDate', $scope.enddate);
  $('#datepicker_start').datepicker('setDate', $scope.startdate);
  $scope.trades = [];
  $scope.getPlatformList = function() {
    $scope.showLoading = true;
    PlatformService.call('PlatformList_Get', {
      strLanguageCode: Container.getLang()
    }, function(e) {
      if (e.Success) {
        $scope.platformsAll = e.Result;
        $scope.platforms = $scope.platformsAll.filter(o);
        var i = $filter('translate')('member_trade@gbsport');
        $scope.platforms.push({
          code: '62001',
          name: i
        });
        $scope.platform = $scope.platforms[0].code;
        $scope.showLoading = false;
        $scope.getTradeList();
      } else {
        $scope.showLoading = false;
      }
    });
  };
  $scope.clickQuery = function() {
    $scope.pager.pageIndex = 0;
    $scope.getTradeList();
  };
  $scope.getTradeList = function() {
    $scope.showLoading = true;
    $scope.trades = [];
    delete $scope.currentPlatform;
    var e = moment($scope.startdate);
    var t = moment($scope.enddate);
    var i = t.diff(e, 'days') + 1;
    var s = Math.ceil(i / $scope.pager.pageSize);
    var o = moment($scope.enddate).subtract($scope.pager.pageSize * $scope.pager.pageIndex, 'days').toDate();
    var n = moment(o).subtract($scope.pager.pageSize - 1, 'days').toDate();
    if(moment(n).isSameOrBefore($scope.startdate)) {
      n = moment($scope.startdate).toDate();
    }
    var l = moment(o).diff(moment(n), 'days') + 1;
    var u = {
      dtStartTime: moment(n).format('YYYY/MM/DD'),
      dtEndTime: moment(o).format('YYYY/MM/DD'),
      intPageNumber: 0,
      intRecordCounts: l,
      strOrderField: '',
      bitDesc: true
    };
    var c = '10001' === $scope.platform ? 'MainAccount_History_Funds_Get' : 'Platform_History_Funds_Get';
    if ('10001' !== $scope.platform) {
      u.strPlatformCode = $scope.platform;
    }
    PlatformService.call(c, u, function(e) {
      if (e.Success) {
        $scope.trades = e.Result;
        $scope.pager.pageCount = s;
        $scope.currentPlatform = $scope.platform;
      }
      $scope.showLoading = false;
    });
  };
  $scope.showPopup = function(e, t) {
    $scope[e + 'Shown'] = true;
    $scope.queryDate = t;
  };
  $scope.getPlatformList();
}]);
