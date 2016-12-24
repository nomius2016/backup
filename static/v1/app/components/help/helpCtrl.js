angular.module("ciApp").controller("helpCtrl", ["$window", "$scope", "$state", "$stateParams", "Container", "appServices", function(e, t, a, o, i, n) {
  function s(e, a) {
    var o = n.getTemplatePath(t.lang, "help", e);
    switch ($(".div_SubmenuItem").hide(),
      "vi-vn" === t.lang && ($("#DepositeItem").show(),
        $("#v2-Depositsop7").hide()),
      a) {
      case "v2-Depositsop":
        "zh-cn" === t.lang && $("#DepositeItem").show();
        break;
      case "v2-DWFAQ":
        $("#DWFAQItem").show();
        break;
      case "v2-Handicap":
        $("#HandicapInfoItem").show();
        break;
      case "v2-GBHandicap":
        $("#GBHandicapInfoItem").show();
        break;
      case "v2-Football":
        $("#FootballItem").show();
        break;
      case "v2-GBFootball":
        $("#GBFootballItem").show();
        break;
      case "v2-Miracle":
        $("#MiracleItem").show();
        break;
      case "v2-Lines5-10":
        $("#Lines5-10Item").show();
        break;
      case "v2-Lines15-20":
        $("#Lines15-20Item").show();
        break;
      case "v2-Lines25":
        $("#Lines25Item").show();
        break;
      case "v2-Multi-turn":
        $("#Multi-turnItem").show();
        break;
      case "v2-Slots":
        $("#SlotsItem").show();
        break;
      case "v2-Table":
        $("#TableItem").show();
        break;
      case "v2-GRotaryTable":
        $("#RotaryTableItem").show();
        break;
      case "v2-Scratch":
        $("#ScratchItem").show();
        break;
      case "v2-Multi-player":
        $("#Multi-playerItem").show();
        break;
      case "v2-Asia":
        $("#AsiaItem").show();
        break;
      case "v2-BigGame":
        $("#BigGameItem").show()
    }
    "v2-Football" === a ? (r("#SportsContent", o),
      "v2-PlayRule-FootballMatchesTR" === e ? $("#FootballMenu").hide() : $("#FootballMenu").show()) : "v2-GBFootball" === a ? (r("#GBSportsContent", o),
      "v2-GBPlayRule-FootballMatchesTR" == e ? $("#GBFootballMenu").hide() : $("#GBFootballMenu").show()) : r("#HelperCenterDetail", o)
  }

  function r(e, t) {
    $(e).load(t, function() {
      if (i.getRelease())
        for (var t = $(e).find("img"), a = 0; a < t.length; a++)
          n.replaceImgSrc(t[a], "src");
      $(e).show(),
        c()
    })
  }

  function c() {
    $(".menu").removeClass("absl"),
      $(".mc-rtct").removeClass("absl"),
      $(".menu").height() > $(".mc-rtct").height() && !l ? ($(".mc-rtct").addClass("absl"),
        $(".menu").removeClass("absl")) : ($(".mc-rtct").removeClass("absl"),
        $(".menu").addClass("absl"))
  }
  t.mainMenu = o.mainmenu || "greenhand",
    t.menu = o.menu || "v2-SignupLogin",
    t.currentMenu = t.menu,
    t.lang = i.getLang();
  var l = !1;
  switch (t.currentMenu) {
    case "v2-BettingRules":
    case "v2-Miracle":
    case "v2-SignupLogin":
    case "v2-Withdrawalsop":
    case "v2-Depositsop":
    case "v2-SignupLogin":
      l = !0
  }
  if ("keno" === t.mainMenu)
    switch (t.menu) {
      case "v2-SizeMono":
        t.currentMenu = "v2-Size/Mono";
        break;
      case "v2-OddEvenOnInUnder":
        t.currentMenu = "v2-OddEven/OnInUnder";
        break;
      case "v2-SizeIndexFive":
        t.currentMenu = "v2-SizeIndex/Five";
        break;
      case "v2-MixNotMixPass":
        t.currentMenu = "v2-Mix/NotMixPass"
    }
  switch (t.menu) {
    case "v2-Depositsop":
      "zh-cn" === t.lang && (t.currentMenu = "v2-Depositsop1");
      break;
    case "v2-DWFAQ":
      t.currentMenu = "v2-DepositFAQ";
      break;
    case "v2-IdentityVerify":
      "th-th" !== t.lang && "vi-vn" !== t.lang || a.go("help", {
        mainmenu: "greenhand",
        menu: "v2-SignupLogin"
      });
      break;
    case "v2-GBHandicap":
      t.currentMenu = "v2-GBHandicapRules";
      break;
    case "v2-GBFootball":
      t.currentMenu = "v2-GBPlayRule-FootballMatchesTR";
      break;
    case "v2-Handicap":
      t.currentMenu = "v2-HandicapRules";
      break;
    case "v2-Football":
      t.currentMenu = "v2-PlayRule-FootballMatchesTR";
      break;
    case "v2-Miracle":
      t.currentMenu = "v2-Game1",
        $("#G_Page1").attr("class", "hlpGameBtn Gamechecked");
      break;
    case "v2-Lines5-10":
      t.currentMenu = "v2-Game7",
        $("#G_Page2").attr("class", "hlpGameBtn Gamechecked");
      break;
    case "v2-Lines15-20":
      t.currentMenu = "v2-Game9",
        $("#G_Page3").attr("class", "hlpGameBtn Gamechecked");
      break;
    case "v2-Lines25":
      t.currentMenu = "v2-Game11",
        $("#G_Page4").attr("class", "hlpGameBtn Gamechecked");
      break;
    case "v2-Multi-turn":
      t.currentMenu = "v2-Game13",
        $("#G_Page5").attr("class", "hlpGameBtn Gamechecked");
      break;
    case "v2-Slots":
      t.currentMenu = "v2-Game15",
        $("#G_Page6").attr("class", "hlpGameBtn Gamechecked");
      break;
    case "v2-Table":
      t.currentMenu = "v2-Game18",
        $("#G_Page7").attr("class", "hlpGameBtn Gamechecked");
      break;
    case "v2-GRotaryTable":
      t.currentMenu = "v2-Game21",
        $("#G_Page8").attr("class", "hlpGameBtn Gamechecked");
      break;
    case "v2-Scratch":
      t.currentMenu = "v2-Game24",
        $("#G_Page9").attr("class", "hlpGameBtn Gamechecked");
      break;
    case "v2-Multi-player":
      t.currentMenu = "v2-Game28",
        $("#G_Page10").attr("class", "hlpGameBtn Gamechecked");
      break;
    case "v2-Asia":
      t.currentMenu = "v2-Game31",
        $("#G_Page11").attr("class", "hlpGameBtn Gamechecked");
      break;
    case "v2-BigGame":
      t.currentMenu = "v2-Game33",
        $("#G_Page12").attr("class", "hlpGameBtn Gamechecked")
  }
  t.openMenu = function(e) {
      t.mainMenu !== e && (t.mainMenu = e)
    },
    s(t.currentMenu, t.menu),
    $(".Detail").click(function() {
      t.currentMenu = $(this).attr("CurrentMenu"),
        "v2-IOSHelp" == t.currentMenu && $(".mc-rtct").css("min-height", "800px");
      var e = $(this).attr("Menu"),
        a = $(this).attr("Item");
      "DF_PagFB" !== a && $(".Detail").find("li").removeClass("active"),
        $("li").removeClass("yellow2"),
        $(".Detail").find("> div").removeClass("checked"),
        $(this).parent().parent().find("a").attr("class", "Detail"),
        $(this).attr("class", "Detail yellow2"),
        "DF_Pag" == a && ($("#FootballMatchesTR").attr("class", "active"),
          $("#GBFootballMatchesTR").attr("class", "active"),
          $("#HandicapRules").attr("class", "active"),
          $("#GBHandicapRules").attr("class", "active"),
          $("#DepositFAQ").attr("class", "active"),
          $("#div_HMenu14").attr("class", "Detail yellow2")),
        "DF_PagFB" == a && ("v2-PlayRule-Correct" == t.currentMenu ? ($("#Correct").attr("class", "hlpBtn2 checked"),
          $("#FootballInfo").attr("class", "active")) : "v2-GBPlayRule-Correct" == t.currentMenu && (t.currentMenu = "v2-GBFootball1",
          $("#GBCorrect").attr("class", "hlpBtn2 checked"),
          $("#GBFootballInfo").attr("class", "active"))),
        $(this).find("li").attr("class", "active"),
        $(this).find("> div").attr("class", "hlpBtn2"),
        $(".hlpGameBtn").attr("class", "hlpGameBtn"),
        "v2-Gam" == t.currentMenu.slice(0, 6) ? $(this).find("> div").attr("class", "hlpGameBtn Gamechecked") : $(this).find("> div").attr("class", "hlpBtn2 checked"),
        "G_Page" == a.slice(0, 6) && $("#" + a).attr("class", "hlpGameBtn Gamechecked"),
        s(t.currentMenu, e)
    }),
    e.onload = function() {
      c()
    }
}]);