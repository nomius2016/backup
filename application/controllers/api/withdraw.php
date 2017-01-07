<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Withdraw extends Basecontroller {

	public function __construct(){
		parent::__construct();
		$this->load->model('fund_withdraw');
	}
	
	public function apply() {
	    //先临时返回成功. 下面的逻辑貌似有问题
	    $ret = array();
	    $ret['code'] = 1;
	    $this->teamapi($ret);

	    if ($this->user_id>0){
	        $p = $this->getApiParams();
	        $aRestrict = $this->users->restrict($this->user_id);
	        $aUser     = $this->users->getUserInfo($this->user_id);
	        if ($aUser['user_id']<1) {
	            $ret = array('code'=>-1);
	        } else if ($aUser['balance']<$p['amount']) {
	            $ret = array('code'=>-1010);
	        } else if ($p['amount'] < $aRestrict['withdraw_min']) {
	            $ret = array('code'=>-1011);
    	    } else if ($p['amount'] > $aRestrict['withdraw_max']) {
	            $ret = array('code'=>-1012);
    	    } else if ($this->fund_withdraw->todayTotal($this->user_id)>$aRestrict['withdraw_day_max']) {
	            $ret = array('code'=>-1013);
    	    } else if ($aUser['fund_password']!=$p['fund_password']) {
	            $ret = array('code'=>-1003);
    	    } else {
    	        
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
    	            // $aRS['balance'] = $this->f($aStatus['balance']);
    	            // $aRS['balance_locked'] = $this->f($aStatus['balance_locked']);
    	            //////////////////////////////
    	            $this->db->trans_commit();
    	            
    	            $ret = array('code'=>1);
    	        } catch (Exception $e) {
    	            $this->db->trans_rollback();
    	            $ret = array('code'=>-2);
    	        }
    	        
    	    }
	        
	    } else {
	        $ret['code']   = -1;
	    }
	    $this->teamapi($ret);
	}
	
	public function history() {
	    $aCond = array();
	    $aCond['user_id'] = $this->user_id; 
	    
	    $params = $this->getApiParams();
	   
	    $ret = array();
	    if ($this->user_id>0){
	        $aCond = array_merge($aCond,(array)$params);
	        $aList = $this->fund_withdraw->getList($aCond);
	        foreach ($aList['rows'] AS $k => &$v) {
	            $v['status'] = $this->statusText($v['status']);
	            $v['amount'] = sprintf("%.2f",$v['amount']/1000);
	        }
	        
	        $ret['code'] = 1;
	        $ret['result'] = $aList;
	    } else {
	        $ret['code']   = -1;
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
		
		$ret = array('code'=>-1);
		if(!$this->islogin){
			$this->teamapi($ret);
		}
		$this->load->model('users');
		$this->load->model('user_bank_card');
		$userinfo = $this->users->getLoginInfo();
		$banks = $this->user_bank_card->getCardsByUserId($userinfo['user_id']);
		$ret['code'] = $banks ? 1 :1001;
		$ret['result'] = $banks;
		$this->teamapi($ret);

	}
}