angular.module('ciApp')
  .directive('render', ['$compile', function($compile) {
    return {
      restrict: 'A',
      scope: {
        content: '='
      },
      link: function($scope, element, arrt) {
          element.html($scope.content);
      }
    }
  }]);