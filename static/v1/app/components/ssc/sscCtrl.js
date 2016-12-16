angular.module("ciApp").controller("ssc", ["$sce", "$scope", "appServices", "Container", "PlatformService", function(e, t, a, n, o) {
  var i = n.getAuthStatus() ? "1" : "0";
  // o.call("PlayGame", {
  //   LanguageCode: n.getLang(),
  //   PlatformCode: "63001",
  //   Domain: a.getDomainName(),
  //   PlayMode: i
  // }).success(function(a) {
  //   if (a.Success) {
  //     var n = a.Result;
  //     t.externalUrl = e.trustAsResourceUrl(n)
  //   }
  // });
  var url = "http://keno.vw033.com/SSC/Default.aspx?tpid=001&token=6e62f20226a8ad1530d59f63c96a303aea56f8b25c2826fe9bba4fc18919c670b1afa38bda4db18beab74f3b9150806e32f67cb4dec2ec4eb9356a35d2e6e176c6ec965a038b5d109c9a3c4f02cb7a632a1b3d35b224bdeadff672fcf3b3726fccbfd4921e2b5a6df6b7fde2f36e1dc4&languagecode=zh-cn";
  t.externalUrl = e.trustAsResourceUrl(url)
  $(document.body).css("overflow-y", "hidden");
  t.$on("$destroy", function(e) {
    $(document.body).css("overflow-y", "");
  });
  var s = 115;
  $("#sscGameScreen").height($(window).height() - s);
  $(window).resize(function() {
    $("#sscGameScreen").height($(window).height() - s);
  });
}]);