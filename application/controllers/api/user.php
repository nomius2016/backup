<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User extends Basecontroller {

	public function __construct(){
		parent::__construct();
	}

	/**用户登录**/
	public function login(){
		$params = $this->getApiParams();
		$this->load->model('users');
		$ret = $this->users->loginUser($params);
		$this->teamapi($ret);
	}
	
	/**
	 * [register 用户注册]
	 * username,password,confirm_password,phone,agent_code
	 * 用户名,密码,确认密码,电话号码,代理编号
	 * @return [type] [description]
	 */
	public function register(){
		$params = $this->getApiParams();
		$this->load->model('users');
		$ret = $this->users->register($params);
		$this->teamapi($ret);
	}

	/**
	 * [basic_info 用户基本信息]
	 * @return [type] [description]
	 */
	public function basic_info(){
		if(!$this->islogin){
			$ret['status'] = false;
			$ret['code'] = 1;
			$ret['msg'] = '用户状态丢失';
			$this->teamapi($ret);
		}

		$this->load->model('users');
		$userinfo = $this->users->getLoginInfo();
		
		$data = array(
				'username'=>$userinfo['account_name'],
				'last_login_time'=>$userinfo['last_login_time'],
				'last_login_ip'=>$userinfo['last_login_ip'],
				'total_balance'=>$this->f($userinfo['balance'] + $userinfo['balance_locked']), //总资金 = 中心 + 冻结
				'can_withdrawal'=>$this->f($userinfo['balance']), //中心
				'email_checked'=>false,
				'id_checked'=>false,
				'phone_checked'=>false,
				'profile_percent'=>60  //资料完善度
			);

		$ret = array(
			'status'=>true,
			'msg'=>'获取成功', 
			'code'=>1,
			'result'=>array($data)
		);

		$this->teamapi($ret);

	}  

	/**
	 * [logout 登出]
	 * @return [type] [description]
	 */
	public function logout(){
		
		$this->session->sess_destroy();
		$ret = array(
			'status'=>true,
			'msg'=>'成功登出', 
			'code'=>1
		);

		$this->teamapi($ret);
	}

	/**
	 * [balance 获取用户余额]
	 * @return [type] [description]
	 */
	public function balance(){
		$this->load->model('users');
		$sessions = $this->session->all_userdata();
		// print_r($sessions);exit;
		$ret = array();
		$ret['status'] = false;
		$ret['code']   = -1;
		$ret['msg']    = '登录状态丢失!';

		if($sessions['account_name']){
			$user = $this->users->getUserinfoByAccountName($sessions['account_name']);
			$ret['status'] = true;
			$ret['code'] = 1;
			$ret['msg'] = '获取成功';
			$ret['result'] = array(array(
						'balance'=> $this->f($user['balance']),
						'balance_locked'=>$this->f($user['balance_locked']),
				));
		}

		$this->teamapi($ret);
		
	}

	/**
	 * [vippoint VIP 积分相关]
	 * @return [type] [description]
	 */
	// public function vippoint(){
	// 	$ret = array();
	// 	$ret['status'] = true;
	// 	$ret['code'] = 1;
	// 	$ret['msg'] = '获取成功';
	// 	$ret['result'] = array(array(
	// 				'monthPoint'=>0,
	// 				'yearPoint'=>0,
	// 				'vipName'=>'VIP1',
	// 				'LevelUpBonus'=>'168.00',
	// 		));
	// 	$this->teamapi($ret);
	// }

	/**
	 * [login_info 登录信息]
	 * @return [type] [description]
	 */
	// public function login_info(){

	// 	if ($this->islogin) {
	// 	    $ret = array('status' => true,'code' => 1,'msg'=>'获取成功');
	// 		$this->load->model('users');
	// 		$this->load->model('user_profile');
	// 		$login_info = $this->users->getLoginInfo();
	// 		$ext_info = $this->user_profile->getInfoByUserId($login_info['user_id']);
	// 		$ret['status'] = true;
	// 		$ret['code'] = 1;
	// 		$info = array();
	// 		$info['MainAccountID'] = $login_info['account_name'];   //
	// 		$info['FirstName']     = $ext_info['name']; 
	// 		$info['BalanceAmount'] = $login_info['balance']; 
	// 		$info['ContactNumber'] = $ext_info['phone']; 
	// 		$info['EMail']         = $ext_info['email']; 
	// 		$info['Birthday']      = '1990-11-11'; 
	// 		$info['Gender']        = ($ext_info['sex'] == 1) ? 'male' : (($ext_info['sex'] == 2) ? 'female' : 'secret') ;   //'性别 1男 2女 3保密',
	// 		$info['CountryID']     = ''; 
	// 		$info['AreaCode']      = "86";
	// 		$info['ZipCode']= null;
	// 		$info['City']= null;
	// 		$info['Address']= null;
	// 		$info['CountryName']= "中国";
	// 		$info['IDVerifiedNumber']= "";
	// 		$info['CurrencyID']= 2;
	// 		$info['LanguageCode']= "zh-cn";
	// 		$info['MiddleName']= "";
	// 		$info['LastName']= "";
	// 		$info['HandicapID']= 2;
	// 		$info['Region']= null;
	// 		$info['NewsLetter']= 1;
	// 		$info['LevelTypeID']= "2";
	// 		$info['MainAccountSN']= "d3c1ec19-2748-4a03-9f68-7e5379d46007";
	// 		$info['SecurityQuestionID']= null;
	// 		$info['SecurityAnswer']= null;
	// 		$info['LastLoginTime'] = $login_info['last_login_time'];
	// 		$info['LastLoginIP']   = $login_info['last_login_ip'];
	// 		$info['CreateTime']    = $login_info['register_time'];
	// 		$info['PromotionID']= 134496;
	// 		$info['MainAccountType']= 1;
	// 		$ret['result'] = array($info);
	// 	} else {
	// 	    $ret = array('status'=>false,'code'=>-1,'msg'=>'用户未登录');
	// 	}

	// 	$this->teamapi($ret);
	// }

	/**
	 * [check_username 验证用户名是否存在]
	 * @return [type] [description]
	 */
	public function check_username(){
		
		$username = trim($this->getApiParams('username'));
		$this->load->model('users');
		$info = $this->users->getUserinfoByAccountName($username);
		
		$ret = array('status'=>false,'code'=>-1,'msg'=>'帐号不存在');
		if($info){
			$ret = array('status'=>true,'code'=>1,'msg'=>'帐号存在');
		}

		$this->teamapi($ret);
	}

	/**
	 * [check_fundpassword 检查用户资金密码]
	 * @return [type] [description]
	 */
	public function check_fundpassword(){
		
		$ret = array('status'=>false,'code'=>-1,'msg'=>'资金密码格式不对!');
		$fund_password = trim($this->getApiParams('fund_password'));
		if(!$fund_password){
			$this->teamapi($ret);
		}

		
		if(!$this->islogin){
			$ret['msg'] = '用户未登录!';
			$this->teamapi($ret);
		}

		$login_info = $this->users->getLoginInfo();
		$this->load->model('users');
		$user = $this->users->getUserInfo($login_info['user_id']);
		if($user['fund_password'] === $fund_password){
			$ret = array('status'=>TRUE,'code'=>1,'msg'=>'资金密码正确!');
		}else{
			$ret['msg'] = '资金密码错误!';
		}

		$this->teamapi($ret);
	}

}

