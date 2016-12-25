<?php

/**
 * PT 平台的类文件
 */
class gaming_pt extends base_gaming{
	
	public function __construct() {
		parent::__construct ();
		// $this->_platform = SB;
	}

	/*获取登录连接*/
	public function getUrl($userid){}

	/*获取平台余额*/
	public function getBalance($userid){}

	/*获取创建平台帐号*/
	public function createAccount($userid){}

	/*中心钱包转账到平台*/
	public function ctp($userid,$amount){
		return array('status'=>true,'code'=>1,'msg'=>'转账成功!');
	}

	/*平台转账到中心钱包*/
	public function ptc($userid,$amount){
		return array('status'=>true,'code'=>1,'msg'=>'转账成功!');
	}
	/*获取投注记录*/
	public function getBetLog($params = array()){}

	/*获取投注获取转账状态*/
	public function getTransterStatus($params = array()){}

}
?>