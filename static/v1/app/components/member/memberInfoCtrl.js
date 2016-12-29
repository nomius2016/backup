angular.module("ciApp").controller("memberInfoCtrl", ["$scope", "$stateParams", "$state", "Container", "appServices", "AccountService", "verifyService", function($scope, t, i, a, s, o, r) {
  $scope.countryCode = 2;
  $scope.method = t.method;
  $scope.userdata = {
    birthday: moment(new Date).subtract(18, "year").format("YYYY/MM/DD"),
    birthday_readonly: !1
  };
  $scope.getSecurityStatus = function() {
    $scope.security_status = {};
    $scope.security_status.name = !1;
    SecurityService.call("MainAccount_Auth_Get", {}, function(e) {
      e.Success && null != e.Result[0].IDVerifiedTime && ($scope.security_status.name = !0)
    })
  };
  o.call("MainAccount_Basicinfo_Get", {}, function(e) {
    $scope.userdata.realname = e.Result[0].real_name;
    $scope.userdata.gender = e.Result[0].gender;
    if(e.Result[0].birthday) {
      $scope.userdata.birthday = moment(e.Result[0].birthday).format("YYYY/MM/DD")
    }
    if($scope.security_status.name) {
      $scope.birthday_readonly = !0;
      $scope.gender_readonly = !0;
    }
  });
  $scope.CreateInfo = function(realname, birthday, gender) {
    o.call("MainAccount_UpdateBasicInfo", {
      real_name: realname,
      birthday: birthday,
      sex: gender,
    }, function(e) {
      if(e.Success) {
        s.showAlertMsg("popup_alert@title_fail", e.Message);
      } else {
        s.showAlertMsg("popup_alert@title_success", e.Message);
        i.go("member.profile");
      }
    });
  };
  $("#datepicker_birthday").datepicker({
    defaultDate: moment(new Date).subtract(18, "year").format("YYYY/MM/DD"),
    yearRange: "1900:-18",
    dateFormat: "yy/mm/dd",
    changeMonth: !0,
    changeYear: !0,
    onClose: function(e) {
      var t = $("#datepicker_birthday").datepicker("getDate");
      $scope.userdata.birthday = moment(t).format("YYYY/MM/DD")
    }
  });
  $("#info_country_select").click(function() {
    $(this).children(".select-choice:hidden").length ? ($(this).children(".select-choice").fadeIn("fast"), $(".select-choice-area").show()) : ($(this).children(".select-choice").fadeOut("fast"), $(".select-choice-area").hide())
  });
  $("#info_country_select li").click(function() {
    var t = $(this).children("span:last").text(),
      i = $(this).attr("countryid"),
      a = $(this).children("span:first").attr("class");
    $(this).parents(".ui-select").children(".select-text").text(t), $(this).parents(".ui-select").children(".select-icon-flag").attr("class", "select-" + a), e.countryCode = i
  });
  $(".select-choice-area").click(function() {
    $(".select-choice").fadeOut(), $(this).hide()
  })
}]);
