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

}

