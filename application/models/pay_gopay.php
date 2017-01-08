<?php
/**
 * 国付宝支付
 */

class pay_gopay extends base_pay 
{

	public function __construct() {
		parent::__construct();
	}

	/**
	 * [deposit 存款]
	 * @param  [type] $user_id           [description]
	 * @param  [type] $amount            [description]
	 * @param  [type] $payment_method_id [description]
	 * @return [type]                    [description]
	 */
	public function deposit($user_id,$amount,$payment_method_id){
		//生成订单
		$this->init($payment_method_id);  //需要先初始化
		$orderNo = $this->createOrder($user_id,$amount);
		
		//开始生成第三方链接

		return array('code'=>1,'result'=>array(array('url'=>'http://www.baidu.com')));

	}



}