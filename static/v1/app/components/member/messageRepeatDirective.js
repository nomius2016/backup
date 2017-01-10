angular.module('ciApp').directive('messageRepeat', ['$filter', 'MessageService', 'Container', function($filter, MessageService, Container) {
  return {
    templateUrl: '/static/v1/app/components/member/message.repeat.html',
    restrict: 'A',
    link: function($scope) {
      $scope.isExpand = !1;
      $scope.replys = [];
      $scope.switchReply = function() {
        if($scope.isExpand) {
          $scope.isExpand = !$scope.isExpand;
        } else {
          MessageService.call('GetMessageReplyList', {
            intComplaintID: $scope.message.SubjectID
          }, function(res) {
            if(res.Success) {
              $scope.replys = res.Result;
            }
            $scope.isExpand = !$scope.isExpand;
          });
        }
      };
      $scope.reply = function() {
        t.call('CreateMessageReply', {
          strReplyMessage: $scope.body,
          intComplaintID: $scope.message.SubjectID,
          strMemo: '',
          strCreator: a.getUserName()
        }, function(res) {
          if(res.Success && res.Result.length > 0) {
            $scope.replys.push(res.Result[0]);
            delete $scope.body;
          }
        });
      };
      $scope.deleteMessage = function(e) {
        $scope.$parent.deleteMessage(e);
      }
    }
  }
}]);