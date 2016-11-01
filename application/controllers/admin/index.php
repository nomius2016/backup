<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Index extends Basecontroller {

	public function __construct(){
		parent::__construct();
	}

	public function index(){
		
		$this->load->model('admins');
		$info = $this->admins->getLoginInfo();
		if($this->islogin){
			header("Location: /admin/index/main");
		}else{
			$this->adminview('index_index');
		}
		
	}

	/**
	 * [login 用户登录]
	 * @return [type] [description]
	 */
	public function login(){
		$this->load->model('admins');
		$params = $this->input->post();
		$ret = $this->admins->loginAdmin($params);
		if($ret['status']){
			header("Location: /admin/index/main");
		}else{
			$this->adminview('index_index',array('errorMsg'=>$ret['msg']));
		}
	}

	public function main(){
		$this->load->model('admins');
		$userinfo = $this->admins->getLoginInfo();
		$this->load->model('admin_menu');
		$menu_data = $this->admin_menu->genHplusMenu();	
		$this->adminview('index_main',array('menu_data'=>$menu_data,'userinfo'=>$userinfo));
	}

	public function loginout(){
		$this->session->sess_destroy();
		header("Location: /admin/index/index");
	}

	public function page_403(){
		$this->adminview('403');
		return;
	}

}

