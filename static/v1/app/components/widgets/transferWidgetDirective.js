angular.module('ciApp').directive('transferWidget', ['Container', 'PlatformService', 'appServices', '$filter', function(Container, PlatformService, appServices, $filter) {
  return {
    templateUrl: '/static/v1/app/components/widgets/transfer.widget.html',
    restrict: 'A',
    replace: !0,
    scope: !0,
    link: function($scope) {
      $scope.platforms = [{
          code: "10001",
          key: "MainAccount"
      },
      {
          code: "30001",
          key: "SBSport"
      },
      // {
      //     code: "20001",
      //     key: "EA"
      // },
      {
          code: "20006",
          key: "AG"
      },
      // {
      //     code: "20007",
      //     key: "W88"
      // },
      // {
      //     code: "20002",
      //     key: "EV"
      // },
      // {
      //     code: "20004",
      //     key: "OPUS"
      // },
      // {
      //     code: "20008",
      //     key: "GD"
      // },
      // {
      //     code: "40003",
      //     key: "Playtech"
      // },
      {
          code: "20009",
          key: "BBIN"
      }];
      angular.forEach($scope.platforms, function(platform) {
        platform.name = $filter('translate')('wallet_widget@' + platform.key);
      });
      $scope.inProcess = !1;
      $scope.transfer = function() {
        if (!$scope.inProcess) {
          $scope.inProcess = !0;
          var data = {
            PlatformCode: $scope.from,
            From: $scope.from,
            To: $scope.to,
            TransferAmount: parseInt($scope.amount)
          };
          PlatformService.call('Transfer', data, function(result) {
            if (result.Success) {
              if ($scope.platforms.length > 0) {
                appServices.showAlertMsg('popup_alert@title_message', 'popup_alert@title_success');
                appServices.reloadPage();
              }
            } else {
              appServices.showAlertMsg('popup_alert@title_message', result.Message);
            }
            $scope.inProcess = !1;
            delete $scope.from;
            delete $scope.to;
            delete $scope.amount;
          });
        }
      };
    }
  };
}]);
