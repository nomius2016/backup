<?php
	
	/**
	 *  平台类使用的抽象方法 
	 */
abstract class base_gaming extends Base_Model {

	protected $_platform;  //初始化 必须包含平台信息

	protected $_userid;

	
	public function __constaruct(){
		parent::__construct ();
	}
	

	/*获取登录连接*/
	abstract public function getUrl($userid);

	/*获取平台余额*/
	abstract public function getBalance($userid);

	/*获取创建平台帐号*/
	abstract public function createAccount($userid);

	/*中心钱包转账到平台*/
	abstract public function ctp($userid,$amount);

	/*平台转账到中心钱包*/
	abstract public function ptc($userid,$amount);

	/*获取投注记录*/
	abstract public function getBetLog($params = array());

	/*获取投注获取转账状态*/
	abstract public function getTransterStatus($params = array());

	/**
	 * [getUserInfo 获取用户的相关信息]
	 * 1 包含基本的用户信息
	 * 2 包含各个平台的帐号
	 * @return [type] [description]
	 */
	protected function getUserInfo($userid){

		return array(
				'info' => array(),      //基本信息
				'platform' => array(),  //平台对应的信息
			);
	}


}	


?>
	
