angular.module('ciApp').controller('memberMessageCtrl', ['$scope', '$stateParams', '$filter', 'Container', 'MessageService', '$location', '$anchorScroll', 'appServices', function($scope, $stateParams, $filter, Container, MessageService, $location, $anchorScroll, appServices) {
  $scope.init = function() {
    delete $scope.subject;
    delete $scope.body;
    delete $scope.type;
    $scope.messages = [];
    $scope.types = [];
    $scope.getMessageTypeList();
    $scope.getMessageList()
  };
  $scope.getMessageTypeList = function() {
    $scope.showMessageLoading = !0;
    MessageService.call("GetMessageTypeList", {
      intParentID: 0,
      intThesaurusID: 1,
      strLanguageCode: Container.getLang(),
      intPageNumber: 0,
      intRecordCounts: 999,
      strOrderField: "CreateTime",
      intDesc: 0
    }, function(e) {
      if (e.Success) {
        $scope.types = e.Result;
      }
      $scope.showMessageLoading = !1;
    });
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
    $scope.showMessageLoading = !0;
    MessageService.call("GetMessageList", {
      intRecordCounts: $scope.pager.pageSize,
      intPageNumber: $scope.pager.pageIndex,
      strOrderField: "",
      bitDesc: !0
    }, function(e) {
      if (e.Success && $scope.messages.length > 0) {
        $scope.messages = e.Result.Table;
        var t = e.Result.Table1[0].TotalCount;
        $scope.pager.pageCount = Math.ceil(t / $scope.pager.pageSize);
      }
      appServices.scrollTop();
      $scope.showMessageLoading = !1;
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
  $scope.init()
}]);
