<?php

/**
 * 支付用基类  自动获取对应的 IP 商户秘钥 之类的
 * 
 */
class pay_adapter extends Base_Model{
	
	
	private $_payapi;
	
	public function __construct() {
		parent::__construct ();
	}

	public function init($pay_method_id){
		
		$pay_method_id = intval($pay_method_id);
		$sql = "SELECT  g.nickname AS filename,g.type  FROM payment_method AS m INNER JOIN payment_group AS g ON m.payment_group_id = g.payment_group_id where m.payment_method_id = {$pay_method_id}";
		$ret = $this->querySql($sql);
		$ret = $ret['0'];
		
		if($ret['type'] == 4){
			$filename = 'pay_bank';
			$this->load->model($filename);
		}else{
			$filename = 'pay_'.strtolower($ret['filename']);
			$this->load->model($filename);
		}
		$this->_payapi = $this->$filename;
	}

	/**
	 * [getDetailByMethodId 根据method ID 获取信息]
	 * @return [type] [description]
	 */
	// public function getDetailByMethodId($pay_method_id){
	// 	$pay_method_id = intval($pay_method_id);
	// 	$sql = "SELECT  g.nickname FROM payment_method AS m INNER JOIN payment_group AS g ON m.payment_group_id = g.payment_group_id where m.payment_method_id = {$pay_method_id}";

	// 	$ret = $this->querySql($sql);
	// }	
		
	/**
	 * [deposit description]
	 * @param  [type] $payment_method_id [存款的ID]
	 * @param  [type] $amount            [description]
	 * @return [type]                    [description]
	 */
	public function deposit($payment_method_id,$user_id,$amount){
		$this->init($payment_method_id);
		$ret = $this->_payapi->deposit($user_id,$amount,$payment_method_id);
		return $ret;
	}

}