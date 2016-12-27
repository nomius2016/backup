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
		$this->_gaming_id = 101;

	}

	/*获取登录连接*/
	public function getUrl($userid){
		
		$this->load->model('user_gaming_account');
		$account_exist = $this->user_gaming_account->isexist($this->_gaming_id,$userid);
		if(!$account_exist){
			$account_info = $this->createAccount($userid);
			if(!$account_info['status']){
				return $account_info;
			}
		}
		$data = array();
		$data['agentId']  = SB_MERCHANT_ID;
		$data['userId']   = SB_MERCHANT_ID.$userid;
		$data['hash']     = md5(SB_MERCHANT_KEY."agentid=".SB_MERCHANT_ID."&userid={$data['userId']}");
		$data['lang']   = 'zh-cn';
		$ret = $this->send_request("api/SportMember/{$data['userId']}/Login",$data,'GET');
		if($ret['status'] == 'success'){
			return array('status'=>true,'url'=>$ret['data']['loginUrl']);
		}else{
			return array('status'=>false,'url'=>'获取链接失败');
		}

	}

	/*获取平台余额*/
	public function getBalance($userid){

		$data = array();
		$data['agentId']  = SB_MERCHANT_ID;
		$new_id   = SB_MERCHANT_ID.$userid;
		$data['hash']     = md5(SB_MERCHANT_KEY."agentid=".SB_MERCHANT_ID."&userid={$new_id}");
		$ret = $this->send_request("api/SportMember/{$new_id}/Balance",$data,'GET');
		if($ret['status'] == 'success'){
			return array('status'=>true,'balance'=>$ret['data']['balance']);
		}else{
			return array('status'=>false,'url'=>'获取链接失败');
		}

	}

	/*获取创建平台帐号*/
	public function createAccount($userid){

		$data = array();
		$data['agentId']  = SB_MERCHANT_ID;
		$data['userId']   = SB_MERCHANT_ID.$userid;
		$data['password'] = substr(md5(time()), 0,10);
		$data['hash']     = md5(SB_MERCHANT_KEY."agentid=".SB_MERCHANT_ID."&userid={$data['userId']}");
		$ret = $this->send_request("/api/SportMember/{$data['userId']}",$data);
		//将生成的账号存入数据库
		if($ret['status'] == 'success'){
			$this->load->model('user_gaming_account');
			$gaming_account = array('gaming_id'=>$this->_gaming_id,'user_id'=>$userid,'account'=>$data['userId'],'password'=>$data['password']);
			$this->user_gaming_account->insert($gaming_account);
			return array('status'=>true,'msg'=>$ret['message']);
		}else{
			return array('status'=>false,'msg'=>$ret['message']);
		}
		

	}

	/*中心钱包转账到平台*/
	public function ctp($userid,$amount){
			
		$data = array();
		$data['agentId']  = SB_MERCHANT_ID;
		$data['userId']   = SB_MERCHANT_ID.$userid;
		$data['hash']     = md5(SB_MERCHANT_KEY."agentid=".SB_MERCHANT_ID."&userid={$data['userId']}");
		$data['amount'] = $amount;
		$ret = $this->send_request("api/SportMember/{$data['userId']}/TransferFund",$data);
		if($ret['status'] == 'success'){
			return array('status'=>true,'code'=>1,'msg'=>'转账成功!');
		}else{
			return array('status'=>false,'code'=>1,'msg'=>'转账失败!');
		}

	}

	/*平台转账到中心钱包*/
	public function ptc($userid,$amount){
		$data = array();
		$data['agentId']  = SB_MERCHANT_ID;
		$data['userId']   = SB_MERCHANT_ID.$userid;
		$data['hash']     = md5(SB_MERCHANT_KEY."agentid=".SB_MERCHANT_ID."&userid={$data['userId']}");
		$data['amount'] = 0 - $amount;
		$ret = $this->send_request("api/SportMember/{$data['userId']}/TransferFund",$data);
		if($ret['status'] == 'success'){
			return array('status'=>true,'code'=>1,'msg'=>'转账成功!');
		}else{
			return array('status'=>false,'code'=>1,'msg'=>'转账失败!');
		}
	}
	/*获取投注记录*/
	public function getBetLog($params = array()){}

	/*获取投注获取转账状态*/
	public function getTransterStatus($params = array()){}
	/*发送请求*/
	public function send_request($url,$data,$method='POST'){
		
		$request_url = SB_API_URL.$url;

		if($method == 'GET'){
			$request_url = $request_url.'?'.http_build_query($data);
			$content = file_get_contents($request_url);
			return json_decode($content,TRUE);
		}else{
			$post_str = json_encode($data);
			$ch = curl_init();
			curl_setopt($ch,CURLOPT_URL,$request_url);
			curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
			curl_setopt($ch,CURLOPT_HTTPHEADER,array(
					'Content-Type: application/json;charset=utf-8'
				));
			curl_setopt($ch,CURLOPT_POST,TRUE);
			curl_setopt($ch,CURLOPT_POSTFIELDS,$post_str);
			curl_setopt($ch,CURLOPT_TIMEOUT,50);
			$content = curl_exec($ch);
			$info = curl_getinfo($ch);
			return json_decode($content,true);
		}
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