angular.module('ciApp')
  .controller('promotionCtrl', ['$scope', '$location', '$anchorScroll', '$compile', '$state', 'Container', 'appServices','PromotionService',function($scope, $location, $anchorScroll, $compile, $state, Container, appServices,PromotionService) {
    function toggleActive() {
      $('.pmt_info_ct').outerHeight();
      $('.pmt_info_ct').css('overflow', 'hidden').css('height', '324px');
      $('.opnBtn a.btn4').click(function() {
        var cont = $(this).parent().parent().children('.pmt_info_ct').css('height', '100%');
        var height = cont.outerHeight();
        if ($(this).parent().parent().children('.pmt_info_ct').hasClass('active')) {
          $(this).parent().parent().children('.pmt_info_ct').animate({
            height: '324px'
          }).removeClass('active');
          $(this).find('.icon_cls').removeClass('icon_opn');
        } else {
          $(this).parent().parent().children('.pmt_info_ct').css('height', '324px');
          $(this).parent().parent().children('.pmt_info_ct').animate({
            height: height
          }).addClass('active');
          $(this).find('.icon_cls').addClass('icon_opn');
        }
      });
    }

    function floatRight() {
      var e = 1;
      $('.pmt').removeClass('pmt_rt');
      $('.cols10').removeClass('fltrt');
      $('.pmt').each(function() {
        if ($(this).is(':visible')) {
          if (e % 2 === 0) {
            $(this).addClass('pmt_rt');
          } else {
            $(this).find('.cols10').addClass('fltrt');
          }
          e++;
        }
      });
    }
    function togglePage() {
      if (Container.getRelease()) {
        toggleActive();
        floatRight();
        $('#li_All').bind('click', function() {
          $('.pmt').show();
          document.body.scrollTop = 0;
          $('.pmtmenu').removeClass('active');
          $(this).addClass('active');
          floatRight();
        });
        $('#li_DWMoney, #li_Sports, #li_Casino, #li_Games, #li_NumberGames').bind('click', function() {
          $('.pmt').hide();
          $('.' + $(this).data('type')).show();
          document.body.scrollTop = 0;
          $('.pmtmenu').removeClass('active');
          $(this).addClass('active');
          floatRight();
        });
        $('.Register').bind('click', function() {
          appServices.needRegister();
        });
        $('.ClaimBonus').bind('click', function() {
          $state.go('member.bonus');
        });
        $('.OfferTC').bind('click', function() {
          $scope.openRule();
        });
        for (var imgs = $('#PromotionDetail img'), i = 0; i < imgs.length; i++) {
          appServices.replaceImgSrc(imgs[i], 'src');
        }
      }

      $(window).scroll(function() {
        var top = parseInt(document.body.scrollTop);
        if (top > 115) {
          $('#div_pmtmenu').css('margin-top', top);
        } else {
          $('#div_pmtmenu').css('margin-top', 115);
        }
      });
    }

    //获取优惠活动
    PromotionService.call("getpromotions", {}, function(res) {
          $scope.promotions = [];    
          //1 存提款 2体育 3娱乐场 4电子游戏 5 彩票
          for (var i = res.Result.length - 1; i >= 0; i--){
              var temp = res.Result[i];
              switch(temp.type){
                case '1':
                  temp.c_name = 'DWMoney';
                  break;
                case '2':
                  temp.c_name = 'Sports';
                  break;
                case '3':
                  temp.c_name = 'Casino';
                  break;
                case '4':
                  temp.c_name = 'Games';
                  break;
                case '5':
                  temp.c_name = 'NumberGames';
                  break;
              }
              console.log(temp);
              $scope.promotions[i] = temp;
              console.log($scope.promotions);
          };

    });



    // var authStatus = Container.getAuthStatus() === true ? 'after' : 'before';
    $scope.showPop = false;
    $scope.templateUrl = appServices.getTemplatePath(Container.getLang(), 'promotion', 'before');
    $scope.promotionRuleUrl = appServices.getTemplatePath(Container.getLang(), 'promotion', 'rules');
    $scope.loadTemplateComplete = function() {
      togglePage();
    };
    $scope.openRule = function() {
      $scope.showPop = true;
    };
  }]);

