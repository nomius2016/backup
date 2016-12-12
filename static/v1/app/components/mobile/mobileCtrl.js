angular.module('ciApp')
  .controller('mobileCtrl', ['$scope', '$location', '$anchorScroll', 'Container', function($scope, $location, $anchorScroll, Container) {
    function s(e) {
      var t = 0;
      var i = $('.text' + e).children('div');
      if(e === 1) {
        $('.hero-point-' + e).css({
          bottom: '-52px',
          opacity: 0
        }).show().animate({
          bottom: 25,
          opacity: 1
        }, 800);
        i.each(function() {
          $(this).delay(t).css({
            left: '45%',
            opacity: 0
          }).show().animate({
            left: '50%',
            opacity: 1
          }, 600);
          t += 200;
        });
      } else {
        $('.hero-point-' + e).css({
          bottom: '-52px',
          opacity: 0
        }).show().animate({
          bottom: 0,
          opacity: 1
        }, 800);
        i.each(function() {
          $(this).delay(t).css({
            left: '45%',
            opacity: 0
          }).show().animate({
            left: '50%',
            opacity: 1
          }, 600);
          t += 200;
        });
      }
    }

    function o(e) {
      var t = $('.mobileBox-1').position().top;
      var i = $('.mobileBox-2').position().top;
      var a = $('.mobileBox-3').position().top;
      var s = $('.mobileBox-4').position().top;
      var o = $(window).scrollTop() + $(window).height() / 2;
      if(o > t) {
        $('.mobile-image-ios').animate({
          left: 0,
          opacity: 1
        }, 1e3);
      }
      if(o > i) {
        $('.mobile-image-poker').animate({
          top: 0,
          opacity: 1
        }, 1e3);
        $('.mobile-image-android').animate({
          bottom: 0,
          opacity: 1
        }, 1e3);
      }
      if (o > a) {
        $('.mobile-image-wap').animate({
          top: 0,
          opacity: 1
        }, 1e3, function() {
          $('.magnifier').stop().animate({
            width: '65%',
            marginLeft: '-48%',
            top: '8%'
          }, 500, 'easeInOutBack');
        });
      }
      if(o > s) {
        $('.mobile-image-casino').animate({
          top: 60
        }, 2e3, 'easeOutBounce');
        $('.mobile-image-sport').delay(200).animate({
          top: 80
        }, 2e3, 'easeOutBounce');
        $('.mobile-image-dice1').delay(100).animate({
          top: 280
        }, 2e3, 'easeOutBounce');
        $('.mobile-image-dice2').delay(500).animate({
          top: 60
        }, 1500, 'easeOutBounce');
        $('.mobile-intro-3').delay(1500).animate({
          bottom: '0px',
          opacity: 1,
          top: 0
        }, 500, function() {
          $('.mobile-games').animate({
            width: '38%',
            marginLeft: '13%',
            top: '-3px'
          }, 700, 'easeInOutBack');
        });
      }
    }
    $scope.bannerItems = [{
      imgSrc: '/assets/images/mobile-hero-bg.jpg',
      link: ''
    }, {
      imgSrc: '/assets/images/mobile-hero-bg-1.jpg',
      link: ''
    }, {
      imgSrc: '/assets/images/mobile-hero-bg-2.jpg',
      link: ''
    }];
    $scope.imgResource = [
      ['mobile-hero-01', 'mobile-hero-02', 'mobile-hero-03', 'mobile-hero-05'],
      ['mobile-hero-11', 'mobile-hero-12', 'mobile-hero-13', 'mobile-hero-15'],
      ['mobile-hero-21', 'mobile-hero-22', 'mobile-hero-23', 'mobile-hero-25']
    ];
    $scope.lang = Container.getLang();
    var r = '';
    if ('' !== $scope.lang) {
      r = $scope.lang.split('-')[1];
      r = 'us' === r || 'kr' === r || 'th' === r || 'vn' === r ? '-' + r : '';
    }
    if (r !== '') {
      for (var n = 0; n < $scope.imgResource.length; n++) {
        for (var l = 0; l < $scope.imgResource[n].length; l++) {
          $scope.imgResource[n][l] = $scope.imgResource[n][l] + r;
        }
      }
    }

    $scope.scrollTo = function(e) {
      $location.hash(e);
      $anchorScroll();
    };
    $('#hero_nav').css('bottom', '40px');
    var u = $('#hero_nav').width();
    $('#hero_nav').css('margin-left', -u / 2);
    var c = $('.adSlider-2 li').length;
    $('.adSlider-2 li').hoverIntent({
      interval: 200,
      over: function() {
        var e = $(this).index();
        var t = $('.adSlider-2 li.heroNavActive').index();
        if(e > t) {
          $(this).parent().children().removeClass('heroNavActive');
          $(this).addClass('heroNavActive');
          $('.hero-kv ul').children('.slide-active').removeClass('slide-active').stop().animate({
            left: '-1920px'
          }, 500, function() {
            $(this).hide();
            $(this).children('div').eq(0).hide();
            $(this).children('div').eq(1).children('div').hide();
          });
          $('.hero-kv ul li').eq(e).addClass('slide-active').stop().show().css('left', '1920px').animate({
            left: '0'
          }, 500, function() {
            s(e);
          });
        } else {
          $(this).parent().children().removeClass('heroNavActive');
          $(this).addClass('heroNavActive');
          $('.hero-kv ul').children('.slide-active').removeClass('slide-active').stop().animate({
            left: '1920px'
          }, 500, function() {
            $(this).hide();
            $(this).children('div').eq(0).hide();
            $(this).children('div').eq(1).children('div').hide();
          });
          $('.hero-kv ul li').eq(e).addClass('slide-active').stop().show().css('left', '-1920px').animate({
            left: '0'
          }, 500, function() {
            s(e);
          });
        }
      },
      timeout: 500,
      out: function() {}
    });
    $('.hero-slide-2 div.next').click(function() {
      var e = $('.adSlider-2 li.heroNavActive').index() + 1;
      if(e === c) {
        e = 0;
      }
      $('.adSlider-2 li').parent().children().removeClass('heroNavActive');
      $('.adSlider-2 li').eq(e).addClass('heroNavActive');
      $('.hero-kv ul').children('.slide-active').stop().animate({
        left: '-1920px'
      }, 500, function() {
        $(this).hide();
        $(this).children('div').eq(0).hide();
        $(this).children('div').eq(1).children('div').hide();
      });
      $('.hero-kv ul li').eq(e).addClass('slide-active').stop().show().css('left', '1920px').animate({
        left: '0'
      }, 500, function() {
        s(e);
      });
    });
    $('.hero-slide-2 div.prev').click(function() {
      var e = $('.adSlider-2 li.heroNavActive').index() - 1;
      if(e < 0) {
        e = c -1;
      }
      $('.adSlider-2 li').parent().children().removeClass('heroNavActive');
      $('.adSlider-2 li').eq(e).addClass('heroNavActive');
      $('.hero-kv ul').children('.slide-active').stop().animate({
        left: '1920px'
      }, 500, function() {
        $(this).hide();
        $(this).children('div').eq(0).hide();
        $(this).children('div').eq(1).children('div').hide();
      });
      $('.hero-kv ul li').eq(e).addClass('slide-active').stop().show().css('left', '-1920px').animate({
        left: '0'
      }, 500, function() {
        s(e);
      });
    });
    s(0);
    $('.mobile-link a').click(function() {
      var e = $(this).attr('name');
      var t = $(e).position().top - 115;
      $('html,body').animate({
        scrollTop: t
      }, 1e3);
    });
    $('.mobile-7 li').mouseenter(function() {
      var e = $(this).index();
      var t = e - 1;
      var i = e + 1;
      $('.mobile-7').stop().animate({
        width: '972px',
        marginLeft: '-486px'
      }, 200);
      $('.mobile-7 li').removeClass('active').stop().animate({
        width: '107px',
        marginTop: '17px',
        marginLeft: '0'
      }, 200).children('h4').stop().animate({
        fontSize: '16px'
      }, 200);
      $('.mobile-7 li').eq(e).addClass('active').stop().animate({
        width: '140px',
        marginTop: 0
      }, 200);
      $('.mobile-7 li').eq(e).children('h4').stop().animate({
        fontSize: '20px'
      }, 200);
      $(this).parent().find('.mobile-msg').removeClass('active').stop().css({
        opacity: 0,
        top: '20px'
      }).hide();
      $(this).children('.mobile-msg').addClass('active').show().stop().animate({
        opacity: 1,
        top: '0px'
      }, 500);

      if (t > 0) {
        $('.mobile-7 li').eq(t).stop().animate({
          width: '120px',
          marginTop: '10px'
        }, 200);
        $('.mobile-7 li').eq(t).children('h4').stop().animate({
          fontSize: '18px'
        }, 200);
      }
      if (i <= 6) {
        $('.mobile-7 li').eq(i).stop().animate({
          width: '120px',
          marginTop: '10px'
        }, 200);
        $('.mobile-7 li').eq(i).children('h4').stop().animate({
          fontSize: '18px'
        }, 200);
      }
    });
    $('.mobile-7 li').mouseleave(function() {
      $('.mobile-7 li').removeClass('active').stop().animate({
        width: '107px',
        marginTop: '17px',
        marginLeft: '0'
      }, 200).children('h4').stop().animate({
        fontSize: '16px'
      }, 200);
      $(this).parent().find('.mobile-msg').removeClass('active').stop().css({
        opacity: 0,
        top: '20px'
      }).hide();
      $('.mobile-7').stop().animate({
        width: '902px',
        marginLeft: '-451px'
      }, 200);
    });
    $scope.$on('$destroy', function() {
      $(window).off('scroll', o);
    });
    $(window).scroll(o);
  }]);
