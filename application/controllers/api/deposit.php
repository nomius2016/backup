<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Deposit extends Basecontroller {

	public function __construct(){
		parent::__construct();
		$this->load->model('fund_deposit');
		$this->load->model('payment_method');
		
	}
	
	public function apply() {
	    $ret = array();
		if(!$this->user_id){
			$ret['code']   = -1;
	        $this->teamapi($ret);
		}
		$min_deposit = $this->system_config->get('min_deposit');
		$max_deposit = $this->system_config->get('max_deposit');
		if($amount>$max_deposit || $amount < $min_deposit){
			$ret['code'] = -1022;
			$this->teamapi($ret);
		}

		$params = $this->getApiParams();
		$payment_method_id = intval($params['pay_method_id']);
		$amount = $params['amount'];
		$amount = sprintf("%01.2f", $amount);


		$this->load->model('pay_adapter');
		$ret = $this->pay_adapter->deposit($payment_method_id,$this->user_id,$amount);
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

		$this->load->model('base_pay');
		$online = $this->base_pay->getOnlinePay();  //在线支付
		$alipay = $this->base_pay->getAliPay();    //支付宝
		$wechat = $this->base_pay->getWechatPay(); //微信
		$transfer = $this->base_pay->getTransferPay(); //银行转账
		if($online) $data['online'] = $online;
		if($alipay) $data['alipay'] = $alipay;
		if($wechat) $data['wechat'] = $wechat;
		if($transfer) $data['transfer'] = $transfer;

		$ret['code'] = 1;
		$ret['result'] = $data;
		$this->teamapi($ret);
	}
}