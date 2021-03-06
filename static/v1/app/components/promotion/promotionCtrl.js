angular.module('ciApp')
  .controller('promotionCtrl', ['$scope', '$location', '$anchorScroll', '$compile', '$state', 'Container', 'appServices','PromotionService',function($scope, $location, $anchorScroll, $compile, $state, Container, appServices,PromotionService) {
    
    function togglePage() {
      if (Container.getRelease()) {
        
        
        $('#li_All').bind('click', function() {
          $scope.promotions = $scope.promotiondata;
          $('.pmt').show();
          document.body.scrollTop = 0;
          $('.pmtmenu').removeClass('active');
          $(this).addClass('active');
          
        });
        $('#li_DWMoney, #li_Sports, #li_Casino, #li_Games, #li_NumberGames').bind('click', function() {
          $('.pmt').hide();
          $scope.promotions = [];
          for (var i = $scope.promotiondata.length - 1; i >= 0; i--) {
            // console.log()
            if($scope.promotiondata[i].c_name == $(this).data('type')){
                $scope.promotions.push($scope.promotiondata[i]);
            }
          };

          $('.' + $(this).data('type')).show();
          document.body.scrollTop = 0;
          $('.pmtmenu').removeClass('active');
          $(this).addClass('active');

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
              $scope.promotiondata[i] = temp;
          };
          $scope.promotions = $scope.promotiondata;
    });


    $scope.promotiondata = [];
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

    //查看更多详情
    $scope.showall = function(index){
        
      var current_obj =  $('#promotion_a_'+index);
      var current_obj_parent = current_obj.parent().parent();
      
      var cont = current_obj_parent.children('.pmt_info_ct').css('height', '100%');
      var height = cont.outerHeight();
        if (current_obj_parent.children('.pmt_info_ct').hasClass('active')) {
          current_obj_parent.children('.pmt_info_ct').animate({
            height: '324px'
          }).removeClass('active');
          current_obj.find('.icon_cls').removeClass('icon_opn');
        }else {
          current_obj_parent.children('.pmt_info_ct').css('height', '324px');
          current_obj_parent.children('.pmt_info_ct').animate({
            height: height
          }).addClass('active');
          current_obj.find('.icon_cls').addClass('icon_opn');
        }
    }
  }]);
