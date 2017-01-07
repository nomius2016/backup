<?php

/**
 * 新支付可以参考模板  bomapay_demo.php
 * 支付基础类,其它类基于此类
 * 正常接入一个支付的话 需要以下流程
 * 1 初始化后台的一些数据(支付类型,商户号,银行列表,中间站地址,支付成功跳转页面,回调地址)
 * 2 生成博马支付订单
 * 3 生成支付链接
 * 4 支付方回调进行上分
 * @date 20160809
 * @author dick.l@infinitesys.my 
 */
class base_pay extends Base_Model{
	
	
	public $detail = array();  //保存支付方式的一些常用信息
	
	public function __construct($method = false) {
		parent::__construct ();
		$this->_current_method = $method;
		$this->setTableName ( "payment_group" );
	}


	/**
	 * [createOrder 生成订单]
	 * @param  [type] $amount    [description]
	 * @param  [type] $bank_code [description]
	 * @return [type]            [description]
	 */
	public function createOrder($amount,$bank_code = null){
		
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
					g.merchant AS title,
					m.payment_method_id
					FROM  payment_group AS g 
					INNER JOIN payment_method AS m 
					on g.payment_group_id = m.payment_group_id 
					WHERE g.type = 1 and g.`status` = 1 and m.`status` = 1 GROUP BY g.merchant";

		return $this->querySql($sql);
	}

	/**
	 * [getAliPay 获取可用的支付宝]
	 * @return [type] [description]
	 */
	public function getAliPay($user_id=false){

		$sql = "SELECT  
					g.merchant AS title,
					m.payment_method_id
					FROM  payment_group AS g 
					INNER JOIN payment_method AS m 
					on g.payment_group_id = m.payment_group_id 
					WHERE g.type = 3 and g.`status` = 1 and m.`status` = 1 GROUP BY g.merchant";

		return $this->querySql($sql);
	}

	/**
	 * [getWechatPay 获取可用的微信支付]
	 * @return [type] [description]
	 */
	public function getWechatPay($user_id=false){

		$sql = "SELECT  
					g.merchant AS title,
					m.payment_method_id
					FROM  payment_group AS g 
					INNER JOIN payment_method AS m 
					on g.payment_group_id = m.payment_group_id 
					WHERE g.type = 2 and g.`status` = 1 and m.`status` = 1 GROUP BY g.merchant";

		return $this->querySql($sql);
	}
	

	/**
	 * [getTransferPay 获取可用的转账用的银行信息]
	 * @return [type] [description]
	 */
	public function getTransferPay($user_id=false){
		
		$sql = "SELECT  
					g.merchant AS title,
					m.title AS bank_address,
					m.secret_key AS account_no,
					m.company_id AS name,
					m.payment_method_id  
					FROM  payment_group AS g 
					INNER JOIN payment_method AS m 
					on g.payment_group_id = m.payment_group_id 
					WHERE g.type = 4 and g.`status` = 1 and m.`status` = 1 GROUP BY g.merchant";

		return $this->querySql($sql);
	}

	


}