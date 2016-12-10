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
	

}

