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
			$ret['code'] = -1;
			$this->teamapi($ret);
		}

		$this->load->model('users');
		$this->load->model('user_bank_card');
		
		$userinfo = $this->users->getLoginInfo();
		$current_info = $this->users->getUserInfo($userinfo['user_id']);
		$profile  = $this->users->profile($this->user_id);
		if ($profile['user_id']<1) {
		    $this->users->create_profile($this->user_id);
		}
		if(!$current_info['fund_password']){
			$fund_password_setted = false;
		}else{
			$fund_password_setted = true;
		}

		$data = array(
				'username'=>$userinfo['account_name'],
				'last_login_time'=>$userinfo['last_login_time'],
				'last_login_ip'=>$userinfo['last_login_ip'],
				'total_balance'=>$this->f($userinfo['balance'] + $userinfo['balance_locked']), //总资金 = 中心 + 冻结
				'balance_locked'      => $userinfo['balance_locked'],
				'can_withdrawal'      => $this->f($userinfo['balance']), //中心
				'email_checked'       => false,
				'id_checked'          => false,
				'phone_checked'       => false,
				'profile_percent'     => 60,  //资料完善度
				'fund_password_setted' => $fund_password_setted,
		        'real_name'           => $profile['real_name'],
		        'birthday'            => $profile['birthday'],
		        'email'               => $profile['email'],
		        'phone'               => $profile['phone'],
		        'register_time'       => $userinfo['register_time'],
		        'gender'              => $profile['sex'],
		        'binded_card_count'   => intval($this->user_bank_card->bindedCardCount($this->user_id)),
		        'security_question_id'=> $profile['security_question_id'],
		        'question_setted'     => ($profile['security_question_id']>0 && $profile['security_answer']!=""),
			);

		$ret = array(
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
		header("Location: /index");
	}

	/**
	 * [balance 获取用户余额]
	 * @return [type] [description]
	 */
	public function balance(){
		$this->load->model('users');
		$sessions = $this->session->all_userdata();
		$ret = array();
		$ret['code']   = -1;

		if($sessions['account_name']){
			$user = $this->users->getUserinfoByAccountName($sessions['account_name']);
			$ret['code'] = 1;
			$ret['result'] = array(array(
						'balance'=> $this->f($user['balance']),
						'balance_locked'=>$this->f($user['balance_locked']),
				));
		}

		$this->teamapi($ret);
		
	}


	/**
	 * [check_username 验证用户名是否存在]
	 * @return [type] [description]
	 */
	public function check_username(){
		
		$username = trim($this->getApiParams('username'));
		$this->load->model('users');
		$info = $this->users->getUserinfoByAccountName($username);
		
		$ret = array('code'=>-1001);
		if($info){
			$ret = array('code'=>1);
		}

		$this->teamapi($ret);
	}

	/**
	 * [check_fundpassword 检查用户资金密码]
	 * @return [type] [description]
	 */
	public function check_fundpassword(){
		
		$ret = array('code'=>-1002);
		$fund_password = trim($this->getApiParams('fund_password'));
		if(!$fund_password){
			$this->teamapi($ret);
		}

		
		if(!$this->islogin){
			$ret['code'] = -1;
			$this->teamapi($ret);
		}

		$login_info = $this->users->getLoginInfo();
		$this->load->model('users');
		$user = $this->users->getUserInfo($login_info['user_id']);
		if($user['fund_password'] === $fund_password){
			$ret = array('code'=>1);
		}else{
			$ret['code'] = -1003;
		}

		$this->teamapi($ret);
	}
	
	/**
	 * 
	 */
	public function update_profile() {
	    $aRS = array();
	    $ret = array();
	    if ($this->user_id>0){
	        $this->load->model('user_profile');
	        
	        $ret['code'] = 1;
	        $ret['result'] = $this->user_profile->set( $this->getApiParams());
	    } else {
	        $ret['code']   = -1;
	    }
	    $this->teamapi($ret);
	}
	
	/**
	 *
	 */
	public function update_password() {
	    $aRS = array();
	    $ret = array();
	    if ($this->user_id>0){
	        $this->load->model('users');
	        $aUser = $this->users->getUserInfo($this->user_id);
	        
	        $p = $this->getApiParams();
	        if ($p['curr_password'] == "") {
	            $ret['code'] = -1004;
	        } else if ($p['curr_password'] != $aUser['password']) {
	            $ret['code'] = -1005;
	        } else if ($p['new_password'] == $aUser['password']) {
                $ret['code'] = -1006;
	        } else if ($p['new_password'] == "" ) {
	            $ret['code'] = -1007;
	        } else {
	            $status = $this->users->update(array('user_id' => $this->user_id),array('password' => $p['new_password']));
	            if ($status!=1) {
	                $ret['code'] = -2;
	            } else {
	                $ret['code'] = 1;
	            }
	        }
	    } else {
	        $ret['code']   = -1;
	    }
	    $this->teamapi($ret);
	}

	/**
	 * [fundpassword_set 设置资金密码]
	 * @return [type] [description]
	 */
	public function  fundpassword_set(){
		$ret = array('code'=>-1);
		if(!$this->islogin){
			$this->teamapi($ret);
		}

		$params = $this->getApiParams();

		if(!(strlen($params['password'])==32 && strlen($params['fund_password'])==32)){
			$ret['code'] = -1002;
			$this->teamapi($ret);
		}

		$this->load->model('users');
		$user = $this->users->getUserInfo($this->user_id);

		if($params['password'] != $user['password']){
			$ret['code'] = -1008;
			$this->teamapi($ret);
		}

		// if($user['fund_password']){
		// 	$ret['msg'] = '资金密码已经存在';
		// 	$this->teamapi($ret);
		// }

		$row = $this->users->update(array('user_id'=>$this->user_id),array('fund_password'=>$params['fund_password'],'last_update_time'=>date('Y-m-d H:i:s')));

		if(!$row){
			$ret['code'] = -2;
			$this->teamapi($ret);
		}else{
			$ret['code'] = 1;
			$this->teamapi($ret);
		}

	}
	
	/**
	 * @desc 用户安全问题选题模板
	 */
	public function security_question_list() {
	    $aRS = array();
	    $ret = array();
	    if ($this->user_id>0){
	        $this->load->model('security_question');
	        $ret['code']   = 1;
	        $ret['result'] = $this->security_question->getList();
	    } else {
	        $ret['code']   = -1;
	    }
	    $this->teamapi($ret);
	}
	
	/**
	 * @desc 设置用户安全问题和答案
	 */
	public function security_question_set() {
	    $aRS = array();
	    $ret = array();
	    if ($this->user_id>0){
	        $this->load->model('user_profile');
	        $ret['code']   = 1;
	        $ret['result'] = $this->user_profile->set( $this->getApiParams());
	    } else {
	        $ret['code']   = -1;
	    }
	    $this->teamapi($ret);
	}
	
	/**
	 * @desc 判断用户安全问题是否正确
	 * @return json
	 */
	public function security_question_check() {
	    $aRS = array();
	    $ret = array();
	    if ($this->user_id>0){
	        $p = $this->getApiParams();
	        $aProfile = $this->users->profile($this->user_id);
	        if ($p['security_answer']==$aProfile['security_answer']) {
    	        $ret['code']   = 1002;
	        } else {
    	        $ret['code']   = -1009;
	        }
	    } else {
	        $ret['code']   = -1;
	    }
	    $this->teamapi($ret);
	}
	
	public function bind_card() {
	    $aRS = array();
	    $ret = array();
	    if ($this->user_id>0){
	        $this->load->model('user_bank_card');
	        
	        $p = $this->getApiParams();
	        $profile  = $this->users->profile($this->user_id);
	        
	        if (intval($this->user_bank_card->bindedCardCount($this->user_id))>2) {
	            $ret['code']   = -1017;
	        } else {
    	        $aFields = array();
    	        //银行     bank_code       [下拉选择]  详情见下面
    	       // 银行卡号  account_no
    	        //显示名称  display_name
    	       // 分支名称  branch_name
    	        $aFields['bank_code']     = $p['bank_code'];
    	        $aFields['account_no']    = $p['account_no'];
    	        $aFields['display_name']  = $p['display_name'];
    	        $aFields['branch_name']   = $p['branch_name'];
    	        $aFields['name']          = $profile['real_name'];
    	        $aFields['user_id']       = $this->user_id;
    	        $aFields['create_time']   = date('Y-m-d H:i:s');
    	        
    	        $_cid = $this->user_bank_card->b_insert($aFields);
    	        if ($_cid>1) {
    	            $ret['code']   = 1;
    	        } else {
    	            $ret['code']   = -2;
    	        }
	        }
	    } else {
	        $ret['code']   = -1;
	    }
	    $this->teamapi($ret);
	}

}

