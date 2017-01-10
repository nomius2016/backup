angular.module('ciApp').controller('memberMessageCtrl', ['$scope', '$stateParams', '$filter', 'Container', 'MessageService', '$location', '$anchorScroll', 'appServices', function($scope, $stateParams, $filter, Container, MessageService, $location, $anchorScroll, appServices) {
  $scope.init = function() {
    delete $scope.subject;
    delete $scope.body;
    delete $scope.type;
    $scope.messages = [];
    $scope.getMessageList()
  };
  $scope.createMessage = function() {
    var data = {};
    data.intIDType = 1;
    data.intComplaintTypeID = $scope.type;
    data.strSubject = $scope.subject;
    data.strContentDetail = $scope.body;
    data.intType = 0;
    data.intIDType = 1;
    $scope.showMessageLoading = !0;
    MessageService.call("CreateMessage", data, function(e) {
      if (e.Success) {
        delete $scope.subject;
        delete $scope.body;
        delete $scope.type;
        $scope.getMessageList();
        appServices.showAlertMsg("popup_alert@title_message", "member_message@complaint_success_and_dont_send_again");
      } else {
        $scope.showMessageLoading = !1;
        appServices.showAlertMsg("popup_alert@title_fail", e.Message);
      }
    });
  };
  $scope.pager = {
    pageSize: 5,
    pageCount: 1,
    pageIndex: 0,
    turnPage: function(e) {
      $scope.pager.pageIndex = e;
      $scope.getMessageList();
    }
  };
  $scope.getMessageList = function() {
    $scope.showMessageLoading = true;
    MessageService.call("GetMessageList", {}, function(res) {
      if (res.Success) {
        $scope.messages = res.Result.rows;
        var t = res.Result.rows.length;
        $scope.pager.pageCount = Math.ceil(t / $scope.pager.pageSize);
      }
      appServices.scrollTop();
      $scope.showMessageLoading = false;
    });
  };
  $scope.deleteMessage = function(e) {
    var t = {};
    t.intIDType = 1;
    t.intRelatedID = e.SubjectID;
    t.chrTrashStatus = "1";
    t.strMemo = "";
    t.bitIsBulletin = 1 === e.Is_Bulletin;
    t.strCreator = Container.getUserName();
    $scope.showMessageLoading = !0;
    MessageService.call("DeleteMessage", t, function(e) {
      if (e.Success) {
        $scope.getMessageList();
      }
    });
  };
  $scope.init();
}]);
