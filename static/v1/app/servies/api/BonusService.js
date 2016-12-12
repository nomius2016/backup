angular.module('requesterModule').factory('BonusService', ['ZeusService', function(ZeusService) {
  var route = 'SP';
  var actionMap = {
    GetCategories: 'Bonus_BonusCategory_Get',
    GetBonusList: 'Bonus_MainAccountBonusList_Get',
    GetVerifyStatus: 'Bonus_ReceiveVerify_Check',
    ApplyVerifyBonus: 'Bonus_VerifiedBonus_Apply',
    ApplyDepositBonus: 'Bonus_DepositBonus_Apply',
    ApplyTransferBonus: 'Bonus_FundTransferBonus_Apply',
    ApplyTurnoverBonus: 'Bonus_TurnoverBonus_Apply',
    ApplyVIPBonus: 'Bonus_VIPBonus_Deposit_Apply',
    ApplySpecialBonus: 'Bonus_RechargeBonus_Apply',
    ApplyReferralBonus: 'Bonus_ReferralBonus_Apply',
    ClaimVerifyBonus: 'Bonus_VerifiedBonus_Accept',
    ClaimDepositBonus: 'Bonus_DepositBonus_Accept',
    ClaimTransferBonus: 'Bonus_FundTransferBonus_Accept',
    ClaimTurnoverBonus: 'Bonus_TurnoverBonus_Accept',
    ClaimVIPBonus: 'Bonus_VIPBonus_Accept',
    ClaimSpecialBonus: 'Bonus_RechargeBonus_Accept',
    ClaimReferralBonus: 'Bonus_ReferralBonus_Accept',
    Bonus_VerifyList_Get: 'Backend_Bonus_VerifyList_Get',
    Bonus_RefList_Get: 'Bonus_RefList_Get'
  };
  return {
    call: function(action, data, callback) {
      if (actionMap[action] !== undefined) {
        return ZeusService.call([route, actionMap[action]], data, callback);
      } else {
        console.log(route, action + ' is not defined...');
      }
    }
  };
}]);
