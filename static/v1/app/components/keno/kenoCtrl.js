angular.module("ciApp").controller("keno", ["$sce", "$scope", "appServices", "Container", "PlatformService", function(e, t, a, o, i) {
  var n = o.getAuthStatus() ? "1" : "0";
  // i.call("PlayGame", {
  //   LanguageCode: o.getLang(),
  //   PlatformCode: "60001",
  //   Domain: a.getDomainName(),
  //   PlayMode: n
  // }).success(function(a) {
  //   if (a.Success) {
  //     var o = a.Result;
  //     t.externalUrl = e.trustAsResourceUrl(o)
  //   }
  // });
  var url = "http://keno.vw033.com/keno/Default.aspx?tpid=001&token=76e8975a0dd65330020a1744b7678eab45919ad17455088b876728f99c72a6d7d64f1edf30daabfb08a5c57fe840d2acdfb689a4017b93d0757be37801d2ed2592b07730fb1da5bf6fce799b0fb914f4daaff1a4d647ce7b17599a67ffc0515462814f84b97c3a24039d4a21e7fe6903&languagecode=zh-cn";
  t.externalUrl = e.trustAsResourceUrl(url);
  $(document.body).css("overflow-y", "hidden");
  t.$on("$destroy", function(e) {
    $(document.body).css("overflow-y", "");
  });
  var s = 115;
  $("#kenoGameScreen").height($(window).height() - s);
  $(window).resize(function() {
    $("#kenoGameScreen").height($(window).height() - s);
  })
}]);