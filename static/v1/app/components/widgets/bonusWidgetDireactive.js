angular.module('ciApp').directive('bonusWidget', ['$log', '$state', 'BonusService', 'Container', function($log, $state, BonusService, Container) {
  return {
    templateUrl: '/static/v1/app/components/widgets/bonus.widget.html',
    restrict: 'A',
    replace: !0,
    scope: {},
    link: function($scope) {
      function updateBonus() {
        $scope.bonusData.number = 0;
        $scope.bonusData.amount = 0;
        BonusService.call("GetBonusList", {
          intBrandID: 2,
          dtStartDate: "1900/01/01",
          dtEndDate: getDateTime(),
          intBonusCategoryID: -1,
          intApplyType: -1,
          strMainAccountID: Container.getUserName(),
          intReceiveStatus: 1,
          strLanguageCode: Container.getLang(),
          intPageNumber: 0,
          intRecordCounts: 100,
          strOrderField: "",
          bitDesc: !1
        }, function(result) {
          if (result.Success) {
            var o = result.Result.Table;
            var s = Container.getCurrencyID();
            if (s === -1) {
              s = 2;
            }
            BonusService.call("GetVerifyStatus", {
              intBrandID: 2,
              strMainAccountID: Container.getUserName(),
              intCurrencyID: s
            }).success(function(res) {
              if (res.Success) {
                for (var a = res.Result, n = 0; n < o.length; n++) {
                  if (!(o[n].RealTurnoverAmount < o[n].TurnoverAmount)) {
                    if (5 !== o[n].BonusCategoryID && 7 !== o[n].BonusCategoryID) {
                      for (var s = 0; s < a.length; s++) {
                        if (o[n].TransactionNumber === a[s].TransactionNumber) {
                          if (0 === a[s].IDVerified || 0 === a[s].EmailVerified || 0 === a[s].CellPhoneVerified || 0 === a[s].SuccessDeposit || 0 === a[s].SuccessWithdrawal) {
                            break;
                          }
                          e.bonusData.number += 1;
                          e.bonusData.amount += o[n].BonusAmount;
                        }
                      }
                    } else {
                      e.bonusData.number += 1;
                    }
                  }
                }
              }
              e.bonusData.amount += o[n].BonusAmount;
            });
          }
        });
      }

      function getDateTime() {
        var now = new Date();
        var day = now.getDate();
        var month = now.getMonth() + 1;
        var year = now.getFullYear();
        day = day < 10 ? "0" + day : day;
        month = month < 10 ? "0" + month : month;
        return year + "/" + month + "/" + day;
      }
      $scope.Symbol = Container.getCurrencySymbol();
      $scope.bonusData = {
        number: 0,
        amount: 0
      };
      $scope.goToBonusPage = function() {
        $state.go("member.bonus");
      };
      $scope.$on("updateBonus", function() {
        updateBonus()
      });
      updateBonus();
    }
  };
}]);
