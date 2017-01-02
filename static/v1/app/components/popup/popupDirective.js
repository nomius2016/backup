angular.module('ciApp')
  .directive('popupAlert', ['$sce', '$translate', function($sce, $translate) {
    return {
      replace: !0,
      templateUrl: '/static/v1/app/components/popup/popup.alert.html',
      restrict: 'A',
      scope: {
        title: '=',
        content: '='
      },
      link: function($scope, n, o) {
        $scope.contentTrans = $sce.trustAsHtml($scope.content),
        $translate($scope.content).then(function(content) {
          $scope.contentTrans = $sce.trustAsHtml(content)
        });
      }
    }
  }]);