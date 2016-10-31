<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class BaseController extends CI_Controller {

	public $islogin = false;

	public function __construct(){
		parent::__construct();
		//获取登录状态
		$this->islogin = $this->checklogin();
	}
	

	/**
	 * [adminview 渲染后台view 的公共方法]
	 * @param  [type] $file [description]
	 * @param  array  $data [description]
	 * @return [type]       [description]
	 */
	public function adminview($file,$data = array()){
		$this->load->view('admin/'.$file,$data);
	}

	/**
	 * [checklogin 检查是否已经登录]
	 * @return [type] [description]
	 */
	public function checklogin(){
		
		if(BACKSTAGE){
			$this->load->model('admins');
			return $this->admins->isLogin();
		}else{
			$this->load->model('users');
			return $this->users->isLogin();
		}
	}


}
