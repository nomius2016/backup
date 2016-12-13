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
  var url = "http://keno.vw099.com/lotto/Default.aspx?tpid=001&token=99edb02409105e85ce5c41efe3d018d2222bfeaafbddfa787fbb6c4604b761e3f770212a69988deb92d9e10e361ec4a467fee536b648df57a30e37095353b9384221cea90b9c40df4e697c35d5f344c37c1a2a8523a6f7046476704d8c8a1b2975c8b461e0c2f690f19b2bcf174fc056&languagecode=zh-cn";
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