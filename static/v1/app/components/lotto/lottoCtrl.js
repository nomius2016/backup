angular.module("ciApp").controller("lotto", ["$sce", "$scope", "appServices", "Container", "PlatformService", function(e, t, a, o, i) {
  var n = o.getAuthStatus() ? "1" : "0";
  // i.call("PlayGame", {
  //   LanguageCode: o.getLang(),
  //   PlatformCode: "61001",
  //   Domain: a.getDomainName(),
  //   PlayMode: n
  // }).success(function(a) {
  //   if (a.Success) {
  //     var o = a.Result;
  //     t.externalUrl = e.trustAsResourceUrl(o)
  //   }
  // });
  var url = "http://keno.vw033.com/lotto/Default.aspx?tpid=001&token=45588ca5db4d6d6fda8db3339e97c61804b1ff2999a1efd7d9de2769c0e26e18adbdd0f1c55790acab692c34c3999d4695dafacd26fb235f7083e80f27334751f5452b14fc785dde4a46ce95f895476d54a104575f20925eedf0951711bd16225b82addeb82f379740a03b4e69240494&languagecode=zh-cn";
  t.externalUrl = e.trustAsResourceUrl(url);
  $(document.body).css("overflow-y", "hidden");
  t.$on("$destroy", function(e) {
    $(document.body).css("overflow-y", "");
  });
  var s = 115;
  $("#lottoGameScreen").height($(window).height() - s);
  $(window).resize(function() {
    $("#lottoGameScreen").height($(window).height() - s);
  })
}]);