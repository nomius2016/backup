<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Deposit extends Basecontroller {

	public function __construct(){
		parent::__construct();
		$this->load->model('fund_deposit');
		$this->load->model('payment_method');
		
	}
	
	public function apply() {
	    $aRS = array();
	    $ret = array();
	    if ($this->user_id>0){
	        $aRestrict = $this->users->restrict($this->user_id,'extra');
    	    if ($aRestrict['allow_recharge']==1) {
    	        
    	    } else {
    	        $aRS = array('msg' => '不允许充值');
    	    }
	        $ret['status'] = true;
	        $ret['code'] = 1;
	        $ret['msg'] = '获取成功';
	        $ret['result'] = $aRS;
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
	        $aList = $this->fund_deposit->getList($aCond);
	        foreach ($aList['rows'] AS $k => &$v) {
	            $v['pay_method'] = $this->payment_method->getPaymentMethodName($v['payment_method_id']);
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
	 * [get_onlone_bank 获取转账用的银行列表]
	 * @return [type] [description]
	 */
	public function get_onlone_bank(){
		
	}
}