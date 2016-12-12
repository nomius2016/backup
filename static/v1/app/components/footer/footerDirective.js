angular.module('ciApp').directive('footer', function($state, $translate) {
  return {
    templateUrl: '/static/v1/app/components/footer/footer.html',
    restrict: 'A',
    scope: {
      lang: '='
    },
    link: function($scope) {
      $scope.appType = {
        'WeChat': 'dialog',
        'Weibo': 'link',
        '56.com': 'link',
        'Tudou': 'link',
        'Line': 'dialog',
        'YouTube': 'link',
        'Facebook': 'link',
        'Zalo': 'dialog',
        'Viber': 'dialog',
        'Talk': 'text',
        'Phone': 'text',
        'Line2': 'dialog',
        'YouTube2': 'link'
      };
      $scope.appLink = {
        'Facebook': 'https://www.facebook.com/',
        'Weibo': 'http://www.weibo.com/vwin361',
        '56.com': 'http://i.56.com/u/vwincom/videos',
        'Tudou': 'http://www.tudou.com/home/_121227105/item',
        'YouTube': 'https://www.youtube.com/channel/UCGe6qpHVIeHDXCaW_1N_0TQ',
        'YouTube2': 'https://www.youtube.com/channel/UCTe6y73vziLRIF90fBUjeVQ'
      };
      $scope.footerConfig = {
        'col1Width': '11%',
        'col1App': {
          'WeChat': 'qrcode.png',
          'Weibo': ''
        },
        'col2App': {
          'Tudou': '',
          '56.com': ''
        }
      };
      $scope.openAffiliates = function() {
        var e = g + $scope.lang + '/Home';
        window.open(e, 'affiliates')
      };
      $scope.openAffiliatesFAQ = function() {
        var e = g + $scope.lang + '/Home/FAQ';
        window.open(e, 'affiliates')
      };
      $scope.closeDlg = function() {
        $scope.$emit('setMainMask', {
          showMask: !1
        });
        $scope.activeApp = '';
      };
      $scope.$on('onClickMask', function() {
        $scope.closeDlg();
        $scope.showFriendsMain = false;
        $scope.showFriends1 = false;
        $scope.showFriends2 = false;
        $('#FriendsshareWeChat').hide();
      });
      $('.downloadProduct').click(function() {
        var e = $(this).attr('code');
        switch (e) {
          case 'EA':
            $(this).attr('href', '/Download/vwin_casino.exe');
            break;
          case 'AG':
            $(this).attr('href', '/Download/VWin_setup.exe');
            break;
          case 'GamesOS':
            $(this).attr('href', '/Download/CasinoInstall.exe');
            break;
          case 'PT':
            $(this).attr('href', '/Download/setup.exe');
            break;
          default:
            break;
        }
      });
      $('.ahover').bind('mouseover', function() {
        $(this).stop().animate({
          opacity: '1'
        });
      });
      $('.ahover').bind('mouseout', function() {
        $(this).stop().animate({
          opacity: '.5'
        });
      });
    }
  };
});
