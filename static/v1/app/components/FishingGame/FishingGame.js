angular.module('ciApp')
  .controller('FishingGame', ['$scope', 'appServices', 'Container', 'GameService', 'Config', 'PlatformService', function($scope, appServices, Container, GameService, Config, PlatformService) {
    $scope.isLoggedIn = function() {
      return Container.getAuthStatus();
    };
    $scope.needLoginBtn = function() {
      appServices.needLogin();
    };
    $scope.onPlayGameBtn = function() {
      if ('zh-cn' !== Container.getLang()) {
        appServices.showAlertMsg('Error', 'Your Area Does Not Support this game');
        return false;
      }
      var popup = window.open('about:blank', 'AG', 'resizable=1,width=746,height=640');
      PlatformService.call('PlayGame', {
        PlatformCode: '20006',
        Domain: appServices.getDomainName(),
        LanguageCode: Container.getLang(),
        GameCode: '6',
        PlayMode: '1'
      }).success(function(result) {
        if(result.Success) {
          popup.location.href = result.Result;
        }
      });
    };
    $scope.FishingGameInfo = function() {
      $('.helpoverlay').addClass('active');
    };
    $scope.FishingGameInfoClose = function() {
      $('.helpoverlay').removeClass('active');
    };
    $('.button').click(function() {
      $('.button').removeClass('active');
      $(this).addClass('active');
      var cls = $(this).attr('id');
      $('.content-pic').removeClass('active');
      $('.' + cls).addClass('active');
    });
    var bubble1 = $('fn').BubbleEngine({
      particleSizeMin: 0,
      particleSizeMax: 30,
      particleSourceX: $('.gamemod').width() / 2,
      particleSourceY: $('.gamemod').height() - 50,
      particleDirection: 'center',
      particleAnimationDuration: 2e3,
      particleAnimationVariance: 2e3,
      particleScatteringX: 150,
      particleScatteringY: 500,
      gravity: -100
    });
    var bubble2 = $('fn').BubbleEngine({
      particleSizeMin: 10,
      particleSizeMax: 100,
      particleSourceX: $('.gamemod').width() / 2,
      particleSourceY: $('.gamemod').height() - 100,
      particleDirection: 'center',
      particleAnimationDuration: 1e4,
      particleAnimationVariance: 2e3,
      particleScatteringX: 700,
      particleScatteringY: 1e3,
      gravity: -500
    });
    var bubble3 = $('fn').BubbleEngine({
      particleSizeMin: 0,
      particleSizeMax: 60,
      particleSourceX: $('.gamemod').width() / 2,
      particleSourceY: $('.gamemod').height() - 100,
      particleDirection: 'center',
      particleAnimationDuration: 1e4,
      particleAnimationVariance: 2e3,
      particleScatteringX: 1e3,
      particleScatteringY: 1e3,
      gravity: -100
    });
    bubble1.addBubbles(60);
    bubble2.addBubbles(3);
    bubble3.addBubbles(50);
  }]);
