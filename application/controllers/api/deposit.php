<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Deposit extends Basecontroller {

	public function __construct(){
		parent::__construct();
		$this->load->model('fund_deposit');
		$this->load->model('payment_method');
		
	}
	
	public function apply() {
	    // $aRS = array();
	    $ret = array();
	    // if ($this->user_id>0){
	    //     $aRestrict = $this->users->restrict($this->user_id,'extra');
    	//     if ($aRestrict['allow_recharge']==1) {
    	        
    	//     } else {
    	//         $aRS = array('msg' => '不允许充值');
    	//     }
	    //     $ret['code'] = 1;
	    //     $ret['result'] = $aRS;
	    // } else {
	    //     $ret['code']   = -1;
	    // }
	    // 
	    if($this->user_id){
	    	$ret['code'] = 1;
	    	$ret['result'] = array(array('url'=>'http://www.baidu.com'));
	    }else{
	    	$ret['code'] = -1;
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
	        $aList = $this->fund_deposit->getList($aCond);
	        foreach ($aList['rows'] AS $k => &$v) {
	            $v['pay_method'] = $this->payment_method->getPaymentMethodName($v['payment_method_id']);
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
	 * [get_onlone_bank 获取转账用的银行列表]
	 * @return [type] [description]
	 */
	public function get_online_bank(){
		// $this->load->model('payment_method');
		// $banks = $this->payment_method->getOnlineBank();
		// $ret = array();
		// if(!$banks){
	 //        $ret['code'] = 1001;
		// }else{
	 //        $ret['code'] = 1;
	 //        $ret['result'] = $banks;
		// }
		// {
  //   "payment_method_id": "6",
  //   "bank_name": "工商银行",
  //   "bank_address": "中国工商一行福建支行",
  //   "account_no": "6222084402005312444",
  //   "name": "张三"
  // }


		$data = array();
		$data['online'] = array(
				array('payment_method_id'=>1,'title'=>'通汇在线支付'),
				array('payment_method_id'=>2,'title'=>'顺丰在线支付'),
			);
		$data['transfer'] = array(
				array('payment_method_id'=>3,'bank_name'=>'工商银行','bank_address'=>'中国工商银行福建支行','account_no'=>'6222084402005312441','name'=>'张三'),
				array('payment_method_id'=>4,'bank_name'=>'招商银行','bank_address'=>'中国招商银行福建支行','account_no'=>'6222084402005312442','name'=>'李四'),
				array('payment_method_id'=>5,'bank_name'=>'中国银行','bank_address'=>'中国银行福建支行','account_no'=>'6222084402005312443','name'=>'王麻子'),
				array('payment_method_id'=>6,'bank_name'=>'建设银行','bank_address'=>'中国建设银行福建支行','account_no'=>'6222084402005312444','name'=>'吴广'),
				
			);
		$data['alipay'] = array(
				array('payment_method_id'=>7,'title'=>'通汇支付宝'),
				array('payment_method_id'=>8,'title'=>'顺丰支付宝'),
			);

		$data['wechat'] = array(
				array('payment_method_id'=>9,'title'=>'通汇微信'),
				array('payment_method_id'=>10,'title'=>'顺丰微信'),
			);

		$ret['code'] = 1;
		$ret['result'] = $data;
		$this->teamapi($ret);
	}
}