angular.module('ciApp').controller('memberSecurityCtrl', ['$filter', '$scope', '$stateParams', '$state', 'Container', 'appServices', 'SecurityService', 'verifyService', 'BonusService', 'BRAND_ID', 'AccountService', 'maskService', '$timeout', function($filter, $scope, $stateParams, $state, Container, appServices, SecurityService, verifyService, BonusService, BRAND_ID, AccountService, maskService, $timeout) {
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
  $scope.countryCode = '86';
  $scope.Send_Now = !1;
  $scope.openLiveChat = function() {
    appServices.openLiveChat();
  };
  $scope.getSecurityStatus = function() {
    $scope.security_status = {};
    $scope.security_status.name = !1;
    $scope.security_status.mobile = !1;
    $scope.security_status.email = !1;
    $scope.security_status.withdraw = !1;
    $scope.security_status.question = !1;
    $scope.security_status.password = !1;
    SecurityService.call('MainAccount_Auth_Get', {}, function(e) {
      if(e.Success) {
        if(null != e.Result[0].IDVerifiedTime) {
          $scope.security_status.name = true;
        }
        if(null != e.Result[0].ContactNumberVerifiedTime) {
          $scope.security_status.mobile = true;
        }
        if(null != e.Result[0].EMailVerifiedTime) {
          $scope.security_status.email = true;
        }
        if(null != e.Result[0].WithdrawalPassword) {
          $scope.security_status.withdraw = true;
        }
        if(null != e.Result[0].SecurityQuestionID) {
          $scope.security_status.question = true;
        }
        if(null != e.Result[0].MainAccountPassword) {
          $scope.security_status.password = true;
        }
        if(null != e.Result[0].MainAccountPassword) {
          $scope.security_status.PTPassword = true;
        }
      }
      Container.setSecurity_status($scope.security_status);
    });
  };
  $scope.$on('$stateChangeSuccess', function(i, v, h, f, y) {
    if ('name' == h.method) {
      $scope.currencyID = s.getCurrencyID(), $scope.lockBtn = !1, $scope.counter = 30;
      if (Container.getSecurity_status().name) {
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
      BonusService.call('Bonus_VerifyList_Get', {
        intCurrencyID: Container.getCurrencyID()
      }, function(e) {
        if(e.Success) {
          $scope.name.BonusAmount = e.Result[0].BonusAmount;
        }
      });
      AccountService.call('MainAccount_Basicinfo_Get', {}, function(e) {
        if('' != e.Result[0].FirstName) {
          $scope.name.valid = !0;
          $scope.name.value = e.Result[0].FirstName;
          if(2 != $scope.currencyID) {
            $scope.name.middleName = e.Result[0].MiddleName;
            $scope.name.lastName = e.Result[0].LastName;
          }
        }
      });
      $scope.CreateSecurityName = function(t) {
        return $scope.lockBtn ? void o.showAlertMsg('popup_alert@title_fail', e('translate')('member_security_name@not_push_in_30sec')) : n.checkIDCodeFormat(t.code) ? void SecurityService.call('IDVerify', {
          BrandID: u,
          Name: t.value,
          IdsNumber: t.code
        }, function(e) {
          if (e.Success === !0) return void a.go('member.security', {
            method: 'index'
          });
          o.showAlertMsg('popup_alert@title_fail', e.Message), g.counter = 30, g.lockBtn = !0;
          m(g.onTimeout, 1e3)
        }) : void o.showAlertMsg('popup_alert@title_fail', e('translate')('member_security@ID_Error'))
      }, g.onTimeout = function() {
        return g.counter--, t.counter <= 0 ? (g.lockBtn = !1, void m.cancel(mytimeout)) : void(mytimeout = m(g.onTimeout, 1e3))
      }, g.CreateforeignSecurityName = function(e) {
        AccountService.call('MainAccount_ReAccountName', {
          strNewFirstName: e.value,
          strNewMiddleName: e.middleName,
          strNewLastName: e.lastName,
          strMemo: ''
        }, function(e) {
          return e.Success === !0 ? (a.go('member.security', {
            method: 'name'
          }), void(g.name.valid = !0)) : void o.showAlertMsg('popup_alert@title_fail', e.Message)
        })
      }
    } else 'mobile' == h.method ? (g.mobile = {
      valid: !1,
      areacode: '',
      value: '',
      code: '',
      modify: !1,
      readonly: !1,
      ReferralID: 2,
      BonusAmount: 0,
      checkValid: function() {
        this.valid = this.value && n.checkPhone(g.countryCode, this.value)
      },
      reset: function() {
        this.value = '', this.valid = !1, this.code = ''
      }
    }, sec = 0, BonusService.call('Bonus_VerifyList_Get', {
      intCurrencyID: s.getCurrencyID()
    }, function(e) {
      e.Success && (g.mobile.BonusAmount = e.Result[2].BonusAmount)
    }), g.ReferralID = function() {
      s.getSecurity_status().mobile && (1 == g.mobile.modify ? g.mobile.ReferralID = 6 : g.mobile.ReferralID = 7)
    }, g.SendSMSVerifyCode = function(t) {
      return g.ReferralID(), g.mobile.valid ? void p(g.mobile, 'mobile') : void o.showAlertMsg('popup_alert@title_fail', e('translate')('header_register@mobile_error'))
    }, g.CreateSecurityMobile = function(t) {
      return g.ReferralID(), g.mobile.valid ? n.checkCodesFormat(t.code) ? void SecurityService.call('Password_TokenCode_Auth', {
        intReferralID: t.ReferralID,
        strTokenCode: t.code
      }, function(e) {
        return e.Success === !1 ? void o.showAlertMsg('popup_alert@title_fail', e.Message) : 0 == g.mobile.modify ? (o.showAlertMsg('popup_alert@title_message', 'popup_alert@title_success'), void a.go('member.security', {
          method: 'index'
        })) : (g.mobile.modify = !1, g.mobile.readonly = !1, g.mobile.value = '', g.mobile.code = '', sec = 0, o.showAlertMsg('popup_alert@title_message', 'popup_alert@title_success'), void a.go('member.security', {
          method: 'mobile'
        }))
      }) : void o.showAlertMsg('popup_alert@title_fail', e('translate')('member_security@code_format_error')) : void o.showAlertMsg('popup_alert@title_fail', e('translate')('member_security@mobile_format_error'))
    }, g.ModifySecurityMobile = function() {
      AccountService.call('MainAccount_Basicinfo_Get', {}, function(e) {
        g.mobile.areacode = e.Result[0].AreaCode, g.mobile.value = d.maskMobile(e.Result[0].ContactNumber)
      }), g.security_status.mobile = !1, g.mobile.modify = !0, g.mobile.readonly = !0, g.mobile.valid = !0
    }) : 'email' == h.method ? (g.email = {
      valid: !1,
      areacode: '',
      value: '',
      code: '',
      modify: !1,
      ReferralID: 1,
      readonly: !1,
      BonusAmount: 0,
      checkValid: function() {
        this.valid = this.value && n.checkEmailFormat(this.value)
      },
      reset: function() {
        this.value = '', this.valid = !1, this.code = ''
      }
    }, sec = 0, BonusService.call('Bonus_VerifyList_Get', {
      intCurrencyID: s.getCurrencyID()
    }, function(e) {
      e.Success && (g.email.BonusAmount = e.Result[1].BonusAmount)
    }), g.ReferralID = function() {
      s.getSecurity_status().email && (1 == g.email.modify ? g.email.ReferralID = 4 : g.email.ReferralID = 5)
    }, g.SendEmailVerifyCode = function(t) {
      return g.ReferralID(), g.email.valid ? void _(t, 'email') : void o.showAlertMsg('popup_alert@title_fail', e('translate')('member_security@email_format_error'))
    }, g.CreateSecurityEmail = function(t) {
      return g.ReferralID(), g.email.valid ? n.checkCodesFormat(t.code) ? void SecurityService.call('Password_TokenCode_Auth', {
        intReferralID: t.ReferralID,
        strTokenCode: t.code
      }, function(e) {
        return e.Success === !1 ? void o.showAlertMsg('popup_alert@title_fail', e.Message) : 0 == g.email.modify ? (o.showAlertMsg('popup_alert@title_message', 'popup_alert@title_success'), void a.go('member.security', {
          method: 'index'
        })) : (g.email.modify = !1, g.email.value = '', g.email.readonly = !1, g.email.code = '', sec = 0, o.showAlertMsg('popup_alert@title_message', 'popup_alert@title_success'), void a.go('member.security', {
          method: 'email'
        }))
      }) : void o.showAlertMsg('popup_alert@title_fail', e('translate')('member_security@code_format_error')) : void o.showAlertMsg('popup_alert@title_fail', e('translate')('member_security@email_format_error'))
    }, g.ModifySecurityEmail = function() {
      AccountService.call('MainAccount_Basicinfo_Get', {}, function(e) {
        g.email.value = d.maskEmail(e.Result[0].EMail)
      }), g.security_status.email = !1, g.email.modify = !0, g.email.readonly = !0, g.email.valid = !0
    }) : 'withdraw' == h.method ? (g.withdraw = {}, g.mobile = {}, g.withdraw.modify = !1, g.withdraw.flow = 'withdraw', g.WithdrawUI_Change = function(e) {
      g.withdraw.flow = e, sec = 0, AccountService.call('MainAccount_Basicinfo_Get', {}, function(e) {
        g.mobile.value = d.maskMobile(e.Result[0].ContactNumber), g.mobile.areacode = e.Result[0].AreaCode, g.mobile.readonly = !0
      })
    }, g.CreateSecurityWithdraw = function(e) {
      return n.checkWithdrawLength(e.value) ? n.checkWithdrawFormat(e.value) ? e.value != e.check ? void o.showAlertMsg('popup_alert@title_fail', 'member_security@withdraw_twice_error') : void SecurityService.call('MainAccount_UpdateWithdrawalPassword', {
        strWithdrawalPassword: e.value
      }, function(e) {
        return e.Success === !0 ? (o.showAlertMsg('popup_alert@title_message', 'popup_alert@title_success'), void a.go('member.security', {
          method: 'index'
        })) : void o.showAlertMsg('popup_alert@title_fail', e.Message)
      }) : void o.showAlertMsg('popup_alert@title_fail', 'member_security@withdraw_format_error') : void o.showAlertMsg('popup_alert@title_fail', 'member_security@withdraw_length_error')
    }, g.SendSMSVerifyCode = function(e) {
      g.mobile.ReferralID = 12, p(e, 'withdraw')
    }, g.CreateSecurityMobile = function(e) {
      SecurityService.call('Password_TokenCode_Auth', {
        intReferralID: 12,
        strTokenCode: e.code
      }, function(e) {
        return e.Success === !1 ? void o.showAlertMsg('popup_alert@title_fail', e.Message) : (g.security_status.withdraw = !1, void('withdraw' == g.withdraw.flow))
      })
    }) : 'question' == h.method ? (g.email = {}, g.mobile = {}, g.question = {}, g.question.modify = !1, g.question.flow = 'question', g.QuestionUI_Change = function(e) {
      sec = 0, g.question.flow = e, AccountService.call('MainAccount_Basicinfo_Get', {}, function(e) {
        g.mobile.value = d.maskMobile(e.Result[0].ContactNumber), g.mobile.areacode = e.Result[0].AreaCode, g.email.value = d.maskEmail(e.Result[0].EMail)
      }), 'mobile' == e ? g.mobile.readonly = !0 : 'email' == e && (g.email.readonly = !0)
    }, g.getQuestionList = function() {
      SecurityService.call('SecurityQuestion_GetByLanguageCode', {
        strLanguageCode: t.userLang
      }, function(e) {
        g.question.questionList = e.Result
      })
    }, g.getQuestionList(), g.CreateSecurityQuestion = function(e, t) {
      if (!n.checkSecurityAnsFormat(t.ans)) return void o.showAlertMsg('popup_alert@title_fail', 'member_security_question@too_long');
      if (0 == g.question.modify) SecurityService.call('MainAccount_UpdateSecurityQuestion', {
        intSecurityQuestion: e.SecurityQuestionID,
        strSecurityAnswer: t.ans
      }, function(e) {
        return e.Success === !0 ? (o.showAlertMsg('popup_alert@title_message', 'popup_alert@title_success'), void a.go('member.security', {
          method: 'index'
        })) : void o.showAlertMsg('popup_alert@title_fail', e.Message)
      });
      else {
        if (SecurityService.call('MainAccount_Auth_Get', {}, function(e) {
            g.question.SecurityQuestionAnswer = e.Result[0].SecurityQuestionAnswer
          }), t.ans != g.question.SecurityQuestionAnswer) return void o.showAlertMsg('popup_alert@title_fail', 'popup_alert@title_fail');
        g.question.disabled = !1, g.question.modify = !1, g.question_list = '', g.question.ans = '', o.showAlertMsg('popup_alert@title_message', 'popup_alert@title_success'), a.go('member.security', {
          method: 'question'
        })
      }
    }, g.ModifySecurityQuestion = function() {
      SecurityService.call('MainAccount_Auth_Get', {}, function(e) {
        if (e.Success) {
          g.question.SecurityQuestionAnswer = e.Result[0].SecurityQuestionAnswer, g.question.SecurityQuestionID = e.Result[0].SecurityQuestionID, g.security_status.question = !1, g.question.modify = !0, g.question.disabled = !0;
          for (var t = 0; t < g.question.questionList.length; t++) g.question.questionList[t].SecurityQuestionID == g.question.SecurityQuestionID && (g.question_list = g.question.questionList[t]);
          a.go('member.security', {
            method: 'question'
          })
        }
      })
    }, g.SendSMSVerifyCode = function(e) {
      e.ReferralID = 11, p(e, 'question')
    }, g.CreateSecurityMobile = function(e) {
      SecurityService.call('Password_TokenCode_Auth', {
        intReferralID: 11,
        strTokenCode: e.code
      }, function(e) {
        return e.Success === !1 ? void o.showAlertMsg('popup_alert@title_fail', e.Message) : (g.security_status.question = !1, void('question' == g.question.flow))
      })
    }, g.SendEmailVerifyCode = function(e) {
      e.ReferralID = 11, _(e, 'question')
    }, g.CreateSecurityEmail = function(e) {
      SecurityService.call('Password_TokenCode_Auth', {
        intReferralID: 11,
        strTokenCode: e.code
      }, function(e) {
        return e.Success === !1 ? void o.showAlertMsg('popup_alert@title_fail', e.Message) : (g.security_status.question = !1, void('question' == g.question.flow))
      })
    }) : 'password' == h.method && (g.UpdatePassword = function(t, i, s) {
      return n.checkPasswordLength(i) ? n.checkPasswordFormat(i) ? s != i ? void o.showAlertMsg('popup_alert@title_fail', 'member_security@withdraw_twice_error') : s == t ? void o.showAlertMsg('popup_alert@title_fail', 'member_security_password@password_not_same') : void SecurityService.call('MainAccount_UpdatePassword', {
        strMainAccountPassword: i,
        strMainAccountOldPassword: t,
        intPasswordStrength: 0
      }, function(t) {
        return t.Success === !0 ? (o.showAlertMsg('popup_alert@title_success', e('translate')('member_security@modify_success')), void a.go('member.security', {
          method: 'index'
        })) : void o.showAlertMsg('popup_alert@title_fail', t.Message)
      }) : void o.showAlertMsg('popup_alert@title_fail', 'find_password@wrong_new_password_char') : void o.showAlertMsg('popup_alert@title_fail', 'find_password@wrong_new_password_width')
    })
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
