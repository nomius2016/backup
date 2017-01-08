<?php

/**
 * 支付用基类  自动获取对应的 IP 商户秘钥 之类的
 * 
 */
class base_pay extends Base_Model{
	
	
	public $secret_key;   //秘钥
	public $merchant_id;  //商户id
	public $merchant_name;//商户名称
	public $whitelist;    //白名单
	public $apiurl;       //api 请求地址
	public $successurl;   //成功之后跳转的地址
	public $noticeurl;    //成功之后异步通知的URL
	public $payment_method_id;
	public function __construct($method = false) {
		parent::__construct ();
	}

	/**
	 * [init 初始化商户信息]
	 * @param  [type] $payment_method_id [description]
	 * @return [type]                    [description]
	 */
	public function init($payment_method_id){
		$sql = "SELECT  *  FROM payment_method AS m INNER JOIN payment_group AS g ON m.payment_group_id = g.payment_group_id where m.payment_method_id = {$payment_method_id}";
		$ret = $this->querySql($sql);
		$ret = $ret['0'];
		$this->payment_method_id = $payment_method_id;
		$this->secret_key = $ret['secret_key'];
		$this->merchant_id = $ret['company_id'];
		$this->whitelist = $ret['white_list'];
		$this->apiurl = $ret['api_url'];
		$this->successurl = $ret['success_url'];
		$this->noticeurl = $ret['notice_url'];
		$this->merchant_name = $ret['merchant'];
	}

	/**
	 * [createOrder 生成订单]
	 * @param  [type] $amount    [description]
	 * @param  [type] $bank_code [description]
	 * @return [type]            [description]
	 */
	public function createOrder($user_id,$amount){
		
		$orderNo = 	$this->getTradeNo($user_id);
		$amount = $amount * 1000;
		$data = array(
				'user_id'=>$user_id,
				'payment_method_id'=>$this->payment_method_id,
				'amount'=>$amount,
				'remark'=>$this->merchant_name.'存款',
				'createtime'=>date('Y-m-d H:i:s'),
				'status'=>1
			);
		$this->load->model('fund_deposit');
		$this->fund_deposit->insert($data);
		//这里开始进行资金操作
		return $orderNo;
	}


	/**
	 * [getTradeNo 生成订单号]
	 * @param  [type] $user_id [description]
	 * @return [type]          [description]
	 */
	private function getTradeNo($user_id){

		$dt = new DateTime('NOW');
		$time8 = dechex($dt->format('U'));// 8bit
		$user6 = sprintf("%08s", substr(dechex($account_id), 0,8)); // 8bit
		$fs = explode('.', microtime(true));
		$fsend = end($fs);
		$haomiao4 =sprintf("%04d", $fsend);// 4bit
		return substr($user6.$time8.$haomiao4, 0, 20);//BM平台 订单号生成规则
	}

	/**
	 * [getMerchantId 获取可用的商户信息]
	 * @param  [type] $method [description]
	 * @return [type]         [description]
	 */
	public function getMerchantDetail(){
		
	}

	/**
	 * [getBasicDetail 获取基础的信息  包含中间站秘钥 跳转链接 API url 成功链接  回调地址等等的]
	 * @return [type] [description]
	 */
	public function getBasicDetail(){

		return $this->_detail;
	}


	/**
	 * [checkAmout 检查在线支付的时候的金额是否合法]
	 * 每种支付方式的允许的最大金额 或者 最小金额可能会不一致
	 * @param  [type] $amount [description]
	 * @return [type]         [description]
	 */
	public function checkAmout($amount){
		
	}


	/**
	 * [isAvaribale 判断当前支付类型目前是否支持]
	 * @return boolean [description]
	 */
	public function isAvaribale(){

	}

	/**
	 * [getWhiteList 根据ID/英文 别称 获取 IP 白名单]
	 * @param  [type] $type [description]
	 * @return [string]       [description]
	 */
	public function getWhiteList($type){

		if($this->_detail['white_list']){
			return $this->_detail['white_list'];
		}

		if($type){
			$id = $type;
			if(!is_numeric($type)){ // SHUNFENG / HNAPAY
				$this->_current_method = $type;
				$id = $this->currentPayMethod();
			}

			$row = $this->selectById($id);
			return $row['white_list'];

		}else{
			return false;
		}
	}

	/**
	 * [getRequestIP 获得IP]
	 * @return [type] [description]
	 */
	public function getRequestIP(){

		$client  = @$_SERVER['HTTP_CLIENT_IP'];
		$forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
		$remote  = $_SERVER['REMOTE_ADDR'];

		if(filter_var($client, FILTER_VALIDATE_IP)){
			$ip = $client;
		}
		elseif(filter_var($forward, FILTER_VALIDATE_IP)){
			$ip = $forward;
		}else{
			$ip = $remote;
		}

		return $ip;
	}


	/**
	 * [geOnlinePay 获取可用的第三方支付]
	 * 返回各种第三方支付的 id 最大充值金额 最小充值金额 以及 银行列表 
	 * @return [type] [description]
	 */
	public function getOnlinePay($user_id=false){
		$sql = "SELECT  
					distinct g.merchant AS title,
					m.payment_method_id
					FROM  payment_group AS g 
					INNER JOIN payment_method AS m 
					on g.payment_group_id = m.payment_group_id 
					WHERE g.type = 1 and g.`status` = 1 and m.`status` = 1";

		return $this->querySql($sql);
	}

	/**
	 * [getAliPay 获取可用的支付宝]
	 * @return [type] [description]
	 */
	public function getAliPay($user_id=false){

		$sql = "SELECT  
					distinct g.merchant AS title,
					m.payment_method_id
					FROM  payment_group AS g 
					INNER JOIN payment_method AS m 
					on g.payment_group_id = m.payment_group_id 
					WHERE g.type = 3 and g.`status` = 1 and m.`status` = 1";

		return $this->querySql($sql);
	}

	/**
	 * [getWechatPay 获取可用的微信支付]
	 * @return [type] [description]
	 */
	public function getWechatPay($user_id=false){

		$sql = "SELECT  
					distinct g.merchant AS title,
					m.payment_method_id
					FROM  payment_group AS g 
					INNER JOIN payment_method AS m 
					on g.payment_group_id = m.payment_group_id 
					WHERE g.type = 2 and g.`status` = 1 and m.`status` = 1";

		return $this->querySql($sql);
	}
	

	/**
	 * [getTransferPay 获取可用的转账用的银行信息]
	 * @return [type] [description]
	 */
	public function getTransferPay($user_id=false){
		
		$sql = "SELECT  
					distinct g.merchant AS title,
					m.title AS bank_address,
					m.secret_key AS account_no,
					m.company_id AS name,
					m.payment_method_id  
					FROM  payment_group AS g 
					INNER JOIN payment_method AS m 
					on g.payment_group_id = m.payment_group_id 
					WHERE g.type = 4 and g.`status` = 1 and m.`status` = 1";

		return $this->querySql($sql);
	}

	


}