<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Withdraw extends Basecontroller {

	public function __construct(){
		parent::__construct();
		$this->load->model('fund_withdraw');
	}
	
	public function apply() {
	    $aRS = array();
	    $ret = array();
	    if ($this->user_id>0){
	        $p = $this->input->get();
	        $aRestrict = $this->users->restrict($this->user_id);
	        $aUser     = $this->users->getUserInfo($this->user_id);
	        if ($aUser['user_id']<1) {
	            $aRS = array('status' => false, 'msg' => '为非法请求');
	        } else if ($aUser['balance']<$p['amount']) {
	            $aRS = array('status' => false, 'msg' => '提款金额不能大于可用余额'.$this->f($aRestrict['balance']));
	        } else if ($p['amount'] < $aRestrict['withdraw_min']) {
    	        $aRS = array('status' => false, 'msg' => '最小提款不能小于'.$this->f($aRestrict['withdraw_min']));
    	    } else if ($p['amount'] > $aRestrict['withdraw_max']) {
    	        $aRS = array('status' => false, 'msg' => '单笔最大提款不能大于'.$this->f($aRestrict['withdraw_max']));
    	    } else if ($this->fund_withdraw->todayTotal($this->user_id)>$aRestrict['withdraw_day_max']) {
    	        $aRS = array('status' => false, 'msg' => '当日最大提款总额不能大于'.$this->f($aRestrict['withdraw_day_max']));
    	    } else if ($aUser['fund_password']!=$p['fund_password']) {
    	        $aRS = array('status' => false, 'msg' => '资金密码不正确');
    	    } else {
    	        $aRS = array();
    	        $aRS['err_no'] = 0;
    	        $aRS['err_msg'] = '';
    	        try {
    	            $this->db->trans_begin();
    	             
	                $aField = array();
	                $aField['user_id'] = $this->user_id;
	                $aField['amount']  = $p['amount'];
	                $aField['remark']  = '用户申请提现';
	                $aField['status']  = 0;
	                $aField['createtime'] = date('Y-m-d H:i:s');
	                $this->db->set($aField)->insert('fund_withdraw');
	                if ($this->db->insert_id()<1) {
	                    throw new Exception('failed to insert withdraw ',10002);
	                }
    	             
    	            $aStatus = $this->transation->make($p['user_id'],$p['transfer_type_id'],$p['amount']*1000,0,$iAdminID,$p['remark']);
    	            $aRS['balance'] = $this->f($aStatus['balance']);
    	            $aRS['balance_locked'] = $this->f($aStatus['balance_locked']);
    	            //////////////////////////////
    	            $this->db->trans_commit();
    	            
    	            $ret['result'] = array('status' => true, 'msg' => '申请提现成功');
    	        } catch (Exception $e) {
    	            $this->db->trans_rollback();
    	            $ret['result'] = array('status' => false, 'msg' => $e->getMessage());
    	        }
    	        $ret['status'] = true;
    	        $ret['code'] = 1;
    	        $ret['msg'] = '获取成功';
    	    }
	        
	    } else {
	        $ret['status'] = false;
	        $ret['code']   = -1;
	        $ret['msg']    = '登录状态丢失!';
	    }
	    $this->teamapi($ret);
	}
	
	public function history() {
	    $aCond = array();
	    $aCond['user_id'] = $this->user_id; 
	    
	    $params = $this->input->get();
	   
	    $ret = array();
	    if ($this->user_id>0){
	        $aCond = array_merge($aCond,(array)$params);
	        $aList = $this->fund_withdraw->getList($aCond);
	        foreach ($aList['rows'] AS $k => &$v) {
	            $v['status'] = $this->statusText($v['status']);
	            $v['amount'] = sprintf("%.2f",$v['amount']/1000);
	        }
	        
	        $ret['status'] = true;
	        $ret['code'] = 1;
	        $ret['msg'] = '获取成功';
	        $ret['result'] = $aList;
	    } else {
	        $ret['status'] = false;
	        $ret['code']   = -1;
	        $ret['msg']    = '登录状态丢失!';
	    }
	    $this->teamapi($ret);
	}
	
	private function statusText($i) {
	    if ($i==1) {//$i = '待初审';状态 (1 申请中 2 一审成功 -2一审失败 3二审成功 -3二审失败)
	        $i = '待初审';
	    } else if ($i==2) {
	        $i = '一审通过 ';
	    } else if ($i==-2) {
	        $i = '一审拒绝 ';
	    } else if ($i==3) {
	        $i = '二审通过 ';
	    } else if ($i==-2) {
	        $i = '二审拒绝';
	    }
	    return $i;
	}

	/**
	 * [getUserWithdrawalCards 获取用户提款银行卡]
	 * @return [type] [description]
	 */
	public function getUserWithdrawalCards(){
		
		$ret = array('status'=>false,'code'=>-1,'msg'=>'用户未登陆');
		if(!$this->islogin){
			$this->teamapi($ret);
		}
		$this->load->model('users');
		$this->load->model('user_bank_card');
		$userinfo = $this->users->getLoginInfo();
		$banks = $this->user_bank_card->getCardsByUserId($userinfo['user_id']);
		if(!$banks){
			$ret['msg'] = '用户无可用提款卡!';
			$this->teamapi($ret);
		}

		$ret['status'] = true;
		$ret['code'] = 1;
		$ret['msg'] = '获取成功';
		$ret['result'] = $banks;
		$this->teamapi($ret);

	}
}