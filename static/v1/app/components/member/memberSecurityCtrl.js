angular.module('ciApp').controller('memberSecurityCtrl', ['$filter', '$scope', '$stateParams', '$state', 'Container', 'appServices', 'SecurityService', 'verifyService', 'BonusService', 'BRAND_ID', 'AccountService', 'maskService', '$timeout', 'md5', function($filter, $scope, $stateParams, $state, Container, appServices, SecurityService, verifyService, BonusService, BRAND_ID, AccountService, maskService, $timeout, md5) {
  // e, t, i, a, s, o, r, n, l, u, c, d, m
  function p(e, t) {
    if(!g.Send_Now !== 0) {
      SecurityService.call('Password_TokenCode_GetRequestCounts', {
        intReferralID: e.ReferralID
      }, function(i) {
        return i.Success !== !0 ? void o.showAlertMsg('popup_alert@title_fail', i.Message) : i.Result[0].RequestCount >= 3 ? void o.showAlertMsg('popup_alert@title_fail', 'member_security_mobile@code_notice') : void v(e, t)
      })
    }
  }

  function _(e, t) {
    0 != !g.Send_Now && SecurityService.call('Password_TokenCode_GetRequestCounts', {
      intReferralID: e.ReferralID
    }, function(i) {
      return i.Success !== !0 ? void o.showAlertMsg('popup_alert@title_fail', i.Message) : i.Result[0].RequestCount >= 3 ? void o.showAlertMsg('popup_alert@title_fail', 'member_security_mobile@code_notice') : void h(e, t)
    })
  }

  function v(e, t) {
    var i = '';
    2 != e.ReferralID && 7 != e.ReferralID || (i = e.value), SecurityService.call('SendSMSVerifyCode', {
      AreaCode: g.countryCode,
      ContactNumber: i,
      ContentID: '2',
      UserType: '1',
      ReferralID: e.ReferralID
    }, function(e) {
      return e.Success !== !0 ? ('0.3' == e.Code && f(e.Result.RemainingSec), void o.showAlertMsg('popup_alert@title_fail', e.Message)) : (o.showAlertMsg('popup_alert@title_message', e.Message), f(e.Result.RemainingSec), a.go('member.security', {
        method: t
      }), void 0)
    })
  }

  function h(e, i) {
    var s = '';
    1 != e.ReferralID && 5 != e.ReferralID || (s = e.value), SecurityService.call('EmailVerify', {
      Email: s,
      LanguageCode: t.userLang,
      ReferralID: e.ReferralID
    }, function(e) {
      return e.Success !== !0 ? ('0.3' == e.Code && f(e.Result.RemainingSec), void o.showAlertMsg('popup_alert@title_fail', e.Message)) : (o.showAlertMsg('popup_alert@title_message', e.Message), f(e.Result.RemainingSec), a.go('member.security', {
        method: i
      }), void 0)
    })
  }

  function f(t) {
    sec = parseInt(t), Interval = setInterval('CountDown()', 1e3), CountDown = function() {
      sec--, sec > 0 ? ($('#bt_SendCode').html('(' + sec + ')'), g.Send_Now = !0) : (clearInterval(Interval), $('#bt_SendCode').html(e('translate')('member_security@get_code')), g.Send_Now = !1)
    }
  }
  $scope.method = $stateParams.method;
  $scope.openLiveChat = function() {
    appServices.openLiveChat();
  };
  $scope.getSecurityStatus = function() {
    $scope.security_status = {};
    $scope.security_status.bindcard = false;
    $scope.security_status.withdraw = false;
    $scope.security_status.question = false;
    $scope.security_status.password = true;
    AccountService.call('MainAccount_Basicinfo_Get', {}, function(e) {
      if(e.Success) {
        if(e.Result[0].binded_card_count > 2) {
          $scope.security_status.bindcard = true;
        }
        if(e.Result[0].fund_password_setted) {
          $scope.security_status.withdraw = true;
        }
        if(e.Result[0].question_setted) {
          $scope.security_status.question = true;
        }
      }
      Container.setSecurityStatus($scope.security_status);
    });
  };
  $scope.$on('$stateChangeSuccess', function(i, v, h, f, y) {
    if ('bindcard' == h.method) {
      $scope.lockBtn = false;
      $scope.counter = 30;
      if (Container.getSecurityStatus().bindcard) {
        return $state.go('member.security', {
          method: 'index'
        });
      }
      $scope.name = {
        valid: !1,
        value: '',
        code: '',
        BonusAmount: 0
      };
      
    } else if('withdraw' == h.method) {
      $scope.withdraw = {};
      $scope.withdraw.modify = false;
      $scope.withdraw.flow = 'withdraw';
      $scope.WithdrawUI_Change = function(e) {
        $scope.security_status.withdraw = false;
        $scope.withdraw.flow = e;
      };
      $scope.CreateSecurityWithdraw = function(e) {
        if(!verifyService.checkWithdrawLength(e.password)) {
          appServices.showAlertMsg('popup_alert@title_tip', 'member_security@password_length_error');
          return false;
        }
        if(!verifyService.checkWithdrawFormat(e.password)) {
          appServices.showAlertMsg('popup_alert@title_tip', 'member_security@withdraw_format_error');
          return false;
        }
        if(!verifyService.checkWithdrawLength(e.value)) {
          appServices.showAlertMsg('popup_alert@title_tip', 'member_security@withdraw_length_error');
          return false;
        }
        if(!verifyService.checkWithdrawFormat(e.value)) {
          appServices.showAlertMsg('popup_alert@title_tip', 'member_security@withdraw_format_error');
          return false;
        }
        if(e.value != e.check) {
          void appServices.showAlertMsg('popup_alert@title_tip', 'member_security@withdraw_twice_error');
          return false;
        }

        SecurityService.call('FundPassword_Set', {
          password: md5.createHash(e.password),
          fund_password: md5.createHash(e.value)
        }, function(e) {
          if(e.Success) {
            appServices.showAlertMsg('popup_alert@title_message', e.Message);
            $state.go('member.security', {
              method: 'index'
            });
          } else {
            appServices.showAlertMsg('popup_alert@title_fail', e.Message);
          }
        }); 
      };
      $scope.SendSMSVerifyCode = function(e) {
        $scope.mobile.ReferralID = 12, p(e, 'withdraw')
      };
      $scope.CreateSecurityMobile = function(e) {
        SecurityService.call('Password_TokenCode_Auth', {
          intReferralID: 12,
          strTokenCode: e.code
        }, function(e) {
          return e.Success === !1 ? void o.showAlertMsg('popup_alert@title_fail', e.Message) : (g.security_status.withdraw = !1, void('withdraw' == g.withdraw.flow))
        })
      };
    } else if('question' == h.method) {
      $scope.email = {};
      $scope.mobile = {};
      $scope.question = {};
      $scope.question.modify = !1;
      $scope.question.flow = 'question';
      $scope.QuestionUI_Change = function(e) {
        sec = 0;
        $scope.question.flow = e;
        AccountService.call('MainAccount_Basicinfo_Get', {}, function(e) {
          $scope.mobile.value = d.maskMobile(e.Result[0].ContactNumber);
          $scope.mobile.areacode = e.Result[0].AreaCode;
          $scope.email.value = d.maskEmail(e.Result[0].EMail)
        });
        if('mobile' == e) {
          $scope.mobile.readonly = !0;
        } else if ('email' == e) {
          $scope.email.readonly = !0;
        }
      };
      $scope.getQuestionList = function() {
        SecurityService.call('Security_Question_List', {}, function(e) {
          $scope.question.questionList = e.Result
        });
      };
      $scope.getQuestionList();
      $scope.CreateSecurityQuestion = function(e, t) {
        if (!verifyService.checkSecurityAnsFormat(t.ans)) {
          o.showAlertMsg('popup_alert@title_fail', 'member_security_question@too_long');
          return false;
        }
        if (0 == $scope.question.modify) {
          SecurityService.call('Security_Question_Set', {
            security_question_id: e.question_id,
            security_answer: t.ans
          }, function(e) {
            if (e.Success) {
              appServices.showAlertMsg('popup_alert@title_message', e.Message);
              $state.go('member.security', {
                method: 'index'
              });
            } else {
              appServices.showAlertMsg('popup_alert@title_fail', e.Message);
              return false;
            }
          });
        } else {
          SecurityService.call('Security_Question_Check', {
            security_answer: t.ans
          }, function(e) {
            if(e.Success) {
              $scope.question.disabled = false;
              $scope.question.modify = false;
              $scope.question_list = '';
              $scope.question.ans = '';
              appServices.showAlertMsg('popup_alert@title_message', e.Message);
              $state.go('member.security', {
                method: 'question'
              });
            } else {
              appServices.showAlertMsg('popup_alert@title_fail', e.Message);
              return false;
            }
          });
        }
      };
      $scope.ModifySecurityQuestion = function() {
        AccountService.call('MainAccount_Basicinfo_Get', {}, function(e) {
          if (e.Success) {
            $scope.question.SecurityQuestionAnswer = '';
            $scope.question.SecurityQuestionID = e.Result[0].security_question_id;
            $scope.security_status.question = false;
            $scope.question.modify = true;
            $scope.question.disabled = true;
            for (var t = 0; t < $scope.question.questionList.length; t++) {
              if($scope.question.questionList[t].question_id == $scope.question.SecurityQuestionID) {
                $scope.question_list = $scope.question.questionList[t];
              }
            }
            $state.go('member.security', {
              method: 'question'
            });
          }
        })
      };
      $scope.SendSMSVerifyCode = function(e) {
        e.ReferralID = 11, p(e, 'question')
      };
      $scope.CreateSecurityMobile = function(e) {
        SecurityService.call('Password_TokenCode_Auth', {
          intReferralID: 11,
          strTokenCode: e.code
        }, function(e) {
          return e.Success === !1 ? void o.showAlertMsg('popup_alert@title_fail', e.Message) : ($scope.security_status.question = !1, void('question' == $scope.question.flow))
        })
      };
      $scope.SendEmailVerifyCode = function(e) {
        e.ReferralID = 11, _(e, 'question')
      };
      $scope.CreateSecurityEmail = function(e) {
        SecurityService.call('Password_TokenCode_Auth', {
          intReferralID: 11,
          strTokenCode: e.code
        }, function(e) {
          return e.Success === !1 ? void o.showAlertMsg('popup_alert@title_fail', e.Message) : ($scope.security_status.question = !1, void('question' == $scope.question.flow))
        })
      }
    } else if('password' == h.method) {
      $scope.UpdatePassword = function(t, i, s) {
        if(!verifyService.checkPasswordLength(i)) {
          appServices.showAlertMsg('popup_alert@title_fail', 'find_password@wrong_new_password_width');
          return false;
        }
        if(!verifyService.checkPasswordFormat(i)) {
          appServices.showAlertMsg('popup_alert@title_fail', 'find_password@wrong_new_password_char');
          return false;
        }
        if(s != i) {
          appServices.showAlertMsg('popup_alert@title_fail', 'member_security@withdraw_twice_error');
          return false;
        }
        if(s == t) {
          appServices.showAlertMsg('popup_alert@title_fail', 'member_security_password@password_not_same');
          return false;
        }
        SecurityService.call('Update_Password', {
          new_password: md5.createHash(i),
          curr_password: md5.createHash(t)
        }, function(res) {
          if(res.Success) {
            appServices.showAlertMsg('popup_alert@title_success', res.Message);
            $state.go('member.security', {
              method: 'index'
            });
          } else {
            appServices.showAlertMsg('popup_alert@title_fail', res.Message)
          }
        });
      }
    }
  });
  $scope.area_select = function() {
    if($('#security_area_select').children('.select-choice:hidden').length) {
      $('#security_area_select').children('.select-choice').fadeIn('fast');
      $('.select-choice-area').show();
    } else {
      $('#security_area_select').children('.select-choice').fadeOut('fast');
      $('.select-choice-area').hide();
    }
    $('#security_area_select li').click(function() {
      var e = $(this).children('span:last').text();
      var i = $(this).attr('code');
      var a = $(this).children('span:first').attr('class');
      $(this).parents('.ui-select').children('.select-text').text(e);
      $(this).parents('.ui-select').children('.select-icon-flag').attr('class', 'select-' + a);
      $scope.countryCode = i;
    });
    $('.select-choice-area').click(function() {
      $('.select-choice').fadeOut();
      $(this).hide();
    });
  };
  $scope.question_select = function() {
    if($('#question_list').children('.select-choice:hidden').length) {
      $('#question_list').children('.select-choice').fadeIn('fast');
      $('.select-choice-area').show();
    } else {
      $('#question_list').children('.select-choice').fadeOut('fast');
      $('.select-choice-area').hide();
    }
    $('#question_list li').click(function() {
      $(this).parents('.ui-select').children('.select-text').text($(this).children('span:last').text());
    });
    $('.select-choice-question').click(function() {
      $('.select-choice').fadeOut();
      $(this).hide();
    });
  };
  $scope.getSecurityStatus()
}]);
