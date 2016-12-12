angular.module('ciApp').directive('walletWidget', ['Container', 'Config', function(Container, Config) {
  return {
    templateUrl: '/static/v1/app/components/widgets/wallet.widget.html',
    restrict: 'A',
    replace: true,
    scope: true,
    link: function($scope) {
      $scope.total = 0;
      $scope.withdrawLimit = 0;
      $scope.withdrawLock = 0;
      $scope.currencyID = Container.getCurrencyID();
      $scope.symbol = Container.getCurrencySymbol();
      $scope.mainAccount = {
        key: 'MainAccount',
        code: '10001',
        vwallet: true
      };
      var o = [{
        key: 'GBSport',
        code: '62001',
        vwallet: !0
      }, {
        key: 'NumericGames',
        code: '60001',
        vwallet: !0
      }];
      if ($scope.currencyID !== 18) {
        o.push({
          key: 'GamesOS',
          code: '40002',
          vwallet: !0
        });
      }
      if ($scope.currencyID !== 16) {
        o.push({
          key: 'Betsoft',
          code: '40005',
          vwallet: !0
        });
        if (Config.NYXActive) {
          o.push({
            key: 'NYX',
            code: '40007',
            vwallet: !0
          });
        }
      }

      if (Config.MGActive) {
        o.push({
          key: 'MG',
          code: '40001',
          vwallet: !0
        });
      }

      o = o.concat([{
        key: 'SBSport',
        code: '30001',
        vwallet: false
      }, {
        key: 'EA',
        code: '20001',
        vwallet: false
      }, {
        key: 'AG',
        code: '20006',
        vwallet: false
      }, {
        key: 'W88',
        code: '20007',
        vwallet: false
      }, {
        key: 'BBIN',
        code: '20009',
        vwallet: false
      }, {
        key: 'OPUS',
        code: '20004',
        vwallet: false
      }, {
        key: 'GD',
        code: '20008',
        vwallet: false
      }, {
        key: 'EV',
        code: '20002',
        vwallet: false
      }, {
        key: 'Playtech',
        code: '40003',
        vwallet: false
      }]);
      $scope.platforms = [];
      for (var i = 0; i < o.length; i++) {
        if (i % 3 === 0) {
          $scope.platforms.push([o[i]]);
        } else {
          var r = $scope.platforms.length;
          $scope.platforms[r - 1].push(o[i]);
        }
      }
      $scope.$on('walletUpdate', function(e, t) {
        $scope.total = Number($scope.total) + Number(t.amount);
        if (t.withdrawLimit !== undefined) {
          if (t.withdrawLimit < 0) {
            t.withdrawLimit = 0;
          }
          $scope.withdrawLimit = t.withdrawLimit;
          $scope.withdrawLock = t.withdrawLock;
        }
      });
    }
  };
}]);
