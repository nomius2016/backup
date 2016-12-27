<?php
	
define('SB_MERCHANT_ID', 'WWSSAP1C');
define('SB_MERCHANT_KEY', 'GseJwxiQ9LY8f9HKeEhg');
define('SB_API_URL', 'http://s.pi.spr.ww365.club/');

/**
 * SB 平台的类文件
 */
class gaming_sb extends base_gaming{
	
	public function __construct() {
		parent::__construct ();
		$this->_platform = SB;
	}

	/*获取登录连接*/
	public function getUrl($userid){}

	/*获取平台余额*/
	public function getBalance($userid){}

	/*获取创建平台帐号*/
	public function createAccount($userid){
		$data = array();
		$data['agentId']  = SB_MERCHANT_ID;
		$data['userId']   = SB_MERCHANT_ID;
		$data['password'] = SB_MERCHANT_ID;
		$data['hash']     = md5(SB_MERCHANT_KEY."agentid=".SB_MERCHANT_ID."&userid={$user_id}");
	}

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

	public function send_request($url,$data){

	}

// 	$agent_id = 'WWSSAP1C';
// $s_key = 'GseJwxiQ9LY8f9HKeEhg';
// $user_id = $agent_id.'dick';
// $password = '123qwert';
// $hash = md5("{$s_key}agentid={$agent_id}&userid={$user_id}");
// $lang = "zh-cn";
// $login_url = "http://s.pi.spr.ww365.club/api/SportMember/{$user_id}/Login?agentId=$agent_id&hash=$hash&lang=$lang";
// // echo $login_url;exit;
// $data = array();
// $data['hash'] = $hash;
// $data['agentId'] = $agent_id;
// $data['userId'] = $user_id;
// // $data['password'] = $password;
// $data['amount'] = 10;
// $data['serialNo'] = date('YmdHis');;
// // $url = 'http://s.pi.spr.ww365.club/api/SportMember/'.$user_id;
// $url = 'http://s.pi.spr.ww365.club/api/SportMember/'.$user_id.'/TransferFund';

// $post_data = json_encode($data);
// // echo $post_data;
// $ch = curl_init();
// curl_setopt($ch,CURLOPT_URL,$url);
// curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
// curl_setopt($ch,CURLOPT_HTTPHEADER,array(
// 		'Content-Type: application/json;charset=utf-8'
// 	));
// curl_setopt($ch,CURLOPT_POST,TRUE);
// curl_setopt($ch,CURLOPT_POSTFIELDS,$post_data);
// curl_setopt($ch,CURLOPT_TIMEOUT,50);
// $exec = curl_exec($ch);
// $info = curl_getinfo($ch);
// curl_close($ch);
// echo $exec;
// exit;




}
?>