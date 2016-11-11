<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class BaseController extends CI_Controller {
    private $_adminname = array();
    private $_username = array();
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

	/**
	 * @desc 取得用户的账号名，在任何数据表中只记录user_id做用户名映射，方便任何地方使用
	 * @param int $id
	 * @return String
	 */
	public function getUserName($id) {
	    if (!$this->_username[$id]) {
	       // 这个方法有待改进，应该先从memcache或redis里查询 //
	       $this->load->model('users');
	       $this->_username[$id] = $this->users->getAccountName($id);
	    }
	    return $this->_username[$id];
	}
    
	/**
	 * @desc 取得用户的账号名，在任何数据表中只记录user_id做用户名映射，方便任何地方使用
	 * @param int $id
	 * @return String
	 */
	public function getAdminName($id) {
	    if (!$this->_adminname[$id]) {
	        // 这个方法有待改进，应该先从memcache或redis里查询 //
	        $this->load->model('admins');
	        $this->_adminname[$id] = $this->admins->getAdminName($id);
	    }
	    return $this->_adminname[$id];
	}
}
