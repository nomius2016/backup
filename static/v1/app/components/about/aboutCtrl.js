angular.module("ciApp").controller("aboutCtrl", ["$scope", "$state", "$stateParams", "$timeout", "Container", "appServices", "verifyService", "MessageService", "SecurityService", function($scope, $state, o, $timeout, n, s, i, r, c) {
  $scope.menuItem = o.menuItem || "";
  $scope.lang = n.getLang();
  delete $scope.name;
  delete $scope.email;
  delete $scope.selectType;
  delete $scope.selectSubject;
  delete $scope.message;
  $scope.errMsg = "";
  $scope.isLoggedIn = n.getAuthStatus();
  $scope.contactType = [{
    code: 3,
    name: "about_contact@technical",
    content: [{
      name: "about_contact@others",
      id: 0,
      code: 18
    }, {
      name: "about_contact@web_error",
      id: 1,
      code: 17
    }, {
      name: "about_contact@unable_edit_profile",
      id: 2,
      code: 16
    }, {
      name: "about_contact@cannot_access",
      id: 3,
      code: 15
    }]
  }, {
    code: 2,
    name: "about_contact@financial",
    content: [{
      name: "about_contact@others",
      id: 0,
      code: 9
    }, {
      name: "about_contact@deposit_payment",
      id: 1,
      code: 8
    }, {
      name: "about_contact@account_balance",
      id: 2,
      code: 7
    }]
  }, {
    code: 1,
    name: "about_contact@marketing",
    content: [{
      name: "about_contact@others",
      id: 0,
      code: 4
    }, {
      name: "about_contact@payment_cooperation",
      id: 1,
      code: 3
    }, {
      name: "about_contact@project_cooperation",
      id: 2,
      code: 2
    }, {
      name: "about_contact@advertisement",
      id: 3,
      code: 1
    }]
  }];
  $scope.subjectsByType = [];
  var l = "";
  $scope.onTypeChanged = function() {
    $scope.subjectsByType = $scope.selectType.content;
    delete $scope.selectSubject;
  };
  $scope.openLiveChat = function() {
    s.openLiveChat()
  };
  $scope.$on("logout", function(t, o) {
    $scope.showLockAccountDialog = !1
  });
  $scope.$on("$destroy", function(t) {
    $scope.showLockAccountDialog = !1
  });
  $scope.submit = function() {
    $scope.errMsg = "";
    var t = {
      strUserName: $scope.name,
      strEMail: $scope.email,
      intCategoryID: $scope.selectType.code,
      intSubjectID: $scope.selectSubject.code,
      strMessage: $scope.message,
      strCreator: n.getUserName(),
      strMemo: "",
      strDomain: s.getDomainName(),
      intIDType: 1
    };
    r.call("ContactUs_Create", t, function(e) {
      e.Success ? (s.showAlertMsg("popup_alert@title_message", "popup_alert@title_success"),
        s.reloadPage()) : s.showAlertMsg("popup_alert@title_fail", e.Message)
    })
  };
  $scope.showLockAccountDialog = !1;
  $scope.isIDVerified = !1;
  $scope.translationData = {
    userName: n.getUserName()
  };
  $scope.checkAccountIsLocked = function() {
    var t = !1;
    if (t) {
      s.showAlertMsg("popup_alert@title_fail", "someData");
    } else {
      var o = n.getSecurity_status();
      if (o.name === undefined) {
        o.name = !1;
        o.mobile = !1;
        o.email = !1;
        o.withdraw = !1;
        o.question = !1;
        o.password = !1;
        c.call("MainAccount_Auth_Get", {}, function(t) {
          t.Success && (null != t.Result[0].IDVerifiedTime && (o.name = !0),
              null != t.Result[0].ContactNumberVerifiedTime && (o.mobile = !0),
              null != t.Result[0].EMailVerifiedTime && (o.email = !0),
              null != t.Result[0].WithdrawalPassword && (o.withdraw = !0),
              0 != t.Result[0].SecurityQuestionID && (o.question = !0),
              null != t.Result[0].MainAccountPassword && (o.password = !0)),
            n.setSecurity_status(o),
            $scope.isIDVerified = o.name,
            $scope.showLockAccountDialog = !0
        });
      } else {
        $scope.isIDVerified = o.name;
        $scope.showLockAccountDialog = !0;
      }
    }
  };
  $scope.clickIDVerify = function() {
    $scope.showLockAccountDialog = !1;
    $timeout(function() {
      $state.go("member.security", {
        method: "name"
      })
    }, 0, false);
  };
  var u = "";
  switch ($scope.menuItem) {
    case "vwin":
      u = "v2-AboutVwin";
      break;
    case "responsible":
      u = "v2-ResponsibleGaming";
      break;
    case "condition":
      u = "v2-TermsConditions";
      break;
    case "promotion":
      u = "v2-OfferTermsConditions";
      break;
    case "privacy":
      u = "v2-PrivacyPolicy";
      break;
    case "contact":
      u = "v2-ContactUs"
  }
  if ("v2-ContactUs" !== u) {
    l = s.getTemplatePath($scope.lang, "about", u);
    $("#HelperCenterDetail").load(l, function() {
      if (n.getRelease()) {
        for (var e = $("#HelperCenterDetail img"), t = 0; t < e.length; t++) {
          s.replaceImgSrc(e[t], "src");
        }
      }
      $("#HelperCenterDetail").show();
    });
  } else {
    $("#HelperCenterDetail").hide()
  }
}]);