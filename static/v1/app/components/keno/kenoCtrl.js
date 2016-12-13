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
  var url = "http://keno.vw099.com/keno/Default.aspx?tpid=001&token=072db883ecb49b5971559add4d053daa0db8b64c6b05181aff1a54dedc47820fa30818df8c9f4ab1ac1d485f3827f07e38ff692228334cb42bb14bad853cd295e8de01a4f2119ff6bd233feeb12d3cea09652f599a631547b15c95aa78e46b64c2d25b949c89708dc47c45755d149c8f&languagecode=zh-cn";
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