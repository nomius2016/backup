angular.module('ciApp')
  .controller('vipCtrl', ['Container', 'appServices', function(Container, appServices) {
    var tmpPath = 'app/templates/vip.html';
    $('#vipContent').load(tmpPath, function() {
      $('#a_VIPRules').click(function() {
        $('#VIPRules').show();
        $('#VIPRewardRules').hide();
        $('#VIPQA').hide();
      });
      $('#a_VIPRewardRules').click(function() {
        $('#VIPRules').hide();
        $('#VIPRewardRules').show();
        $('#VIPQA').hide();
      });
      $('#a_VIPQA').click(function() {
        $('#VIPRules').hide();
        $('#VIPRewardRules').hide();
        $('#VIPQA').show();
      });
      $('.vip-answer').hide();
      $('.vip-question').click(function() {
        if ($(this).hasClass('vip-active')) {
          $(this).children('.vip-answer').slideUp('fast');
          $(this).removeClass('vip-active');
        } else {
          $(this).parent().parent().find('.vip-active').children('.vip-answer').slideUp('fast')
          $(this).parent().parent().find('.vip-active').removeClass('vip-active');
          $(this).addClass('vip-active').children('.vip-answer').slideDown('fast');
        }
      });
      var a = $('#a_VIPRules h4').html();
      var n = $('#a_VIPQA h4 a').html();
      var o = $('#a_VIPRewardRules h4 a').html();
      $('#a_VIPRules').bind('click', function() {
        $('#VIPRules').show();
        $('#VIPQA').hide();
        $('#VIPRewardRules').hide();
        $('#a_VIPRules h4').html(a);
        $('#a_VIPQA h4').html('<a>' + n + '</a>');
        $('#a_VIPRewardRules h4').html('<a>' + o + '</a>');
      });
      $('#a_VIPQA').bind('click', function() {
        $('#VIPQA').show();
        $('#VIPRules').hide();
        $('#VIPRewardRules').hide();
        $('#a_VIPQA h4').html(n);
        $('#a_VIPRules h4').html('<a>' + a + '</a>');
        $('#a_VIPRewardRules h4').html('<a>' + o + '</a>');
      });
      $('#a_VIPRewardRules').bind('click', function() {
        $('#VIPRewardRules').show();
        $('#VIPRules').hide();
        $('#VIPQA').hide();
        $('#a_VIPRewardRules h4').html(o);
        $('#a_VIPQA h4').html('<a>' + n + '</a>');
        $('#a_VIPRules h4').html('<a>' + a + '</a>');
      });
      if (Container.getRelease()) {
        for (var s = $('#vipContent img'), i = 0; i < s.length; i++) {
          appServices.replaceImgSrc(s[i], 'src');
        }
      }
    });
  }]);
