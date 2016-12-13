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
  var url = "http://keno.vw099.com/SSC/Default.aspx?tpid=001&token=9c9e99c713018c9f09f9f4e3d97ec2e9de79eebe7dbbb5afa7a3cd0bc49e91004377dd83ab772bc530e7db65b0f546aa1c8b847c57be81693230e5d4f01bf66a342a194afc07fb9828f072d889d1cfa2851c12c23b8011ac2bd5cf35658b1f4c2b296e5c218f2036b084034d1817c196&languagecode=zh-cn";
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