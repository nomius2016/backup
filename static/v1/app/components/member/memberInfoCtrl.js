angular.module("ciApp").controller("memberInfoCtrl", ["$scope", "$stateParams", "$state", "Container", "appServices", "AccountService", "verifyService", function(e, t, i, a, s, o, r) {
  var n = e;
  n.countryCode = 2, n.method = t.method, n.userdata = {
    birthday: moment(new Date).subtract(18, "year").format("YYYY/MM/DD"),
    birthday_readonly: !1
  }, n.getSecurityStatus = function() {
    n.security_status = {}, n.security_status.name = !1, SecurityService.call("MainAccount_Auth_Get", {}, function(e) {
      e.Success && null != e.Result[0].IDVerifiedTime && (n.security_status.name = !0)
    })
  }, o.call("MainAccount_Logininfo_Get", {}, function(e) {
    n.userdata.FirstName = e.Result[0].FirstName, n.userdata.MiddleName = e.Result[0].MiddleName, n.userdata.HandicapID = e.Result[0].HandicapID, n.userdata.gender = e.Result[0].Gender, n.userdata.CountryID = e.Result[0].CountryID, n.userdata.city = e.Result[0].City, n.userdata.region = e.Result[0].Region, n.userdata.zipcode = e.Result[0].ZipCode, n.userdata.address = e.Result[0].Address, void 0 != e.Result[0].Birthday && (n.userdata.birthday = moment(e.Result[0].Birthday).format("YYYY/MM/DD")), n.security_status.name && (n.birthday_readonly = !0, n.gender_readonly = !0), $("#info_country_select li:contains(" + n.userdata.CountryID + ")").click()
  }), n.CreateInfo = function(t, l, u, c, d) {
    return r.checkZipCodeFormat(l) ? void o.call("MainAccount_UpdateBasicInfo", {
      strLanguageCode: e.userLang,
      intCurrencyID: 2,
      intHandicapID: n.userdata.HandicapID,
      strFirstName: n.userdata.FirstName,
      strMiddleName: n.userdata.MiddleName,
      strLastName: "",
      dateBirthday: n.userdata.birthday,
      intGender: t,
      intCountryID: e.countryCode,
      strCity: u,
      strRegion: c,
      strZipCode: l,
      strAddress: d,
      bitNewsLetter: !1,
      strIPAddress: a.getIPAddress(),
      strMemo: "",
      strCreator: "Vwin.com"
    }, function(e) {
      return e.Success === !1 ? void s.showAlertMsg("popup_alert@title_fail", e.Message) : (s.showAlertMsg("popup_alert@title_success", e.Message), void i.go("member.profile"))
    }) : void s.showAlertMsg("popup_alert@title_fail", "郵政編碼格式錯誤")
  }, $("#datepicker_birthday").datepicker({
    defaultDate: moment(new Date).subtract(18, "year").format("YYYY/MM/DD"),
    yearRange: "1900:-18",
    dateFormat: "yy/mm/dd",
    changeMonth: !0,
    changeYear: !0,
    onClose: function(e) {
      var t = $("#datepicker_birthday").datepicker("getDate");
      n.userdata.birthday = moment(t).format("YYYY/MM/DD")
    }
  }), $("#info_country_select").click(function() {
    $(this).children(".select-choice:hidden").length ? ($(this).children(".select-choice").fadeIn("fast"), $(".select-choice-area").show()) : ($(this).children(".select-choice").fadeOut("fast"), $(".select-choice-area").hide())
  }), $("#info_country_select li").click(function() {
    var t = $(this).children("span:last").text(),
      i = $(this).attr("countryid"),
      a = $(this).children("span:first").attr("class");
    $(this).parents(".ui-select").children(".select-text").text(t), $(this).parents(".ui-select").children(".select-icon-flag").attr("class", "select-" + a), e.countryCode = i
  }), $(".select-choice-area").click(function() {
    $(".select-choice").fadeOut(), $(this).hide()
  })
}]);
