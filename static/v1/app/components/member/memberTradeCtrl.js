angular.module('ciApp').controller('memberTradeCtrl', ['$scope', '$stateParams', '$filter', 'Container', 'PlatformService', 'appServices', function($scope, $stateParams, $filter, Container, PlatformService, appServices) {
  $scope.pager = {
    pageSize: 7,
    pageCount: 1,
    pageIndex: 0,
    turnPage: function(e) {
      $scope.pager.pageIndex = e;
      $scope.getTradeList();
    }
  };
  $scope.method = $stateParams.method;
  $scope.clickTab = function(method) {
    $scope.method = method;
    appServices.scrollAnchor("#vw-ck");
    $scope.getHistory();
  };
  $scope.enddate = appServices.getServerTime(),
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

  $scope.clickQuery = function() {
    $scope.pager.pageIndex = 0;
    $scope.getHistory();
  };
  $scope.getHistory = function() {
    $scope.showLoading = true;
    var data = {
      page: 0,
      start_date: $('#datepicker_start').val(),
      end_date: $('#datepicker_end').val()
    };
    PlatformService.call($scope.method + 'History', data, function(res) {
      if (res.Success) {
        $scope[$scope.method + 'List'] =  res.Result.rows;
      }
      $scope.showLoading = false;
    });
  };
  $scope.getHistory();
  $scope.showPopup = function(e, t) {
    $scope[e + 'Shown'] = true;
    $scope.queryDate = t;
  };
}]);
