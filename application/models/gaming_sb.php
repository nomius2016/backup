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
		$this->_gaming_id = SB_GAMING_ID;

	}

	/*获取登录连接*/
	public function getUrl($userid,$params=array()){
		
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
	public function ctp($userid,$amount,$orderNo){
		
		$data = array();
		$data['agentId']  = SB_MERCHANT_ID;
		$data['userId']   = SB_MERCHANT_ID.$userid;
		$data['hash']     = md5(SB_MERCHANT_KEY."agentid=".SB_MERCHANT_ID."&userid={$data['userId']}");
		$data['amount'] = $amount;
		$data['serialNo'] = $orderNo;
		$ret = $this->send_request("api/SportMember/{$data['userId']}/TransferFund",$data);
		if($ret['status'] == 'success'){
			return array('status'=>true,'code'=>1,'msg'=>'转账成功!');
		}else{
			return array('status'=>false,'code'=>1,'msg'=>'转账失败!');
		}

	}

	/*平台转账到中心钱包*/
	public function ptc($userid,$amount,$orderNo){
		$data = array();
		$data['agentId']  = SB_MERCHANT_ID;
		$data['userId']   = SB_MERCHANT_ID.$userid;
		$data['hash']     = md5(SB_MERCHANT_KEY."agentid=".SB_MERCHANT_ID."&userid={$data['userId']}");
		$data['amount'] = 0 - $amount;
		$data['serialNo'] = $orderNo;
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
	public function getTransterStatus($params = array()){
		
		return array('status'=>false,'code'=>-1,'msg'=>'接口目前未开放');
		// $orderNo = $params['orderNo'];
		// $data = array();
		// $data['hash']    = md5(SB_MERCHANT_KEY."agentid=".SB_MERCHANT_ID);
		// $data['lang']    = 'zh-cn';
		// $ret = $this->send_request("api/SportAgent/".SB_MERCHANT_ID."/Parlay/{$orderNo}",$data,'GET');
		// if($ret['status'] == 'success'){
		// 	return array('status'=>true,'code'=>1,'msg'=>'转账成功!');
		// }else{
		// 	return array('status'=>false,'code'=>1,'msg'=>'转账失败!');
		// }


	}
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

}
?>