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

		$userinfo = json_decode('{"MainAccountSN":"d3c1ec19-2748-4a03-9f68-7e5379d46007","LanguageCode":"zh-cn","CurrencyID":2,"HandicapID":2,"FirstName":"","MiddleName":"","LastName":"","IDVerifiedNumber":null,"Birthday":null,"Gender":null,"EMail":null,"AreaCode":"86","ContactNumber":"3snd5EsUzaVOqehdl4IUkQ==","CountryID":2,"City":null,"Region":null,"ZipCode":null,"Address":null,"SecurityQuestionID":null,"SecurityAnswer":null,"NewsLetter":1,"Image":null,"PromotionType":1,"PromotionCode":"308","QQAccount":null,"SkypeAccount":null,"PromotionChannel":null,"PromotionExperience":null,"URL":null,"URL_Previous":null,"PromotionID":134496,"Audittype":0,"IsApply":1}');

		$ret = array(
			'status'=>true,
			'msg'=>'获取成功', 
			'code'=>1,
			'result'=>array($userinfo)
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
						'balance'=>$user['balance'],
						'balance_locked'=>$user['balance_locked'],
				));
		}

		$this->teamapi($ret);
		
	}

}

