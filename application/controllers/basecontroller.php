<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class BaseController extends CI_Controller {
    private $_adminname = array();
    private $_username = array();
	public $islogin = false;
	public $user_id = 0;

	public function __construct(){
		parent::__construct();
		//获取登录状态
		$this->islogin = $this->checklogin();
		$sessions = $this->session->all_userdata();
		$this->user_id = $sessions['user_id'];
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
	
	/**
	 * @desc 后台专用管理员操作日志
	 * @param String $desc 文字面上的做日子内容
	 */
	public function wlog(String $desc) {
	    $this->load->model('admin_log');
	    $this->admin_log->insert(array(
	        'admin_id'    => $this->admins->getLoginAdminId(),
	        'request'     => json_encode(array(
	            'URI'  => $_SERVER['REQUEST_URI'],
	            'POST' => str_replace(array("\n","\t","\r" ), '', var_export($this->input->post(), true))
	        )),
	        'description' => $desc,
	        'dateline'    => time()
	    ));
	}
	
	/**
	 * @desc 将存储的金额转化为元模式
	 * @param int $n 原始数据
	 * @return string
	 */
	public function f(int $n) {
	    return sprintf('%.2f',$n/1000);
	}

	/*包装前台需要返回的数据
	 * {Success: false, Code: "0.2", Message: "密码错误，您还可以输入4次！", Result: [{TotalErrorCount: 4, LockMinute: 0}]}
	 * {Success: true, Code: "1.0", Message: "Unknown", Result: [,…]}
	*/
	public function teamapi($data){
		header('Content-Type:application/json; charset=utf-8');
		$response = array();
		$response['Success'] = $data['status'] === true ? true : false; 
		$response['Code']    = isset($data['code']) ? $data['code'] : 'undefined';
		if(isset($data['msg']) && $data['msg']) $response['Message'] = $data['msg'];
		if(isset($data['message']) && $data['message']) $response['Message'] = $data['message'];

		if(isset($data['result'])){
			if(is_array($data['result'])){
			 	$response['Result'] = $data['result'];
			}else{
				$tmp = json_decode($data['result'],TRUE);
				if(is_array($tmp)){
					$response['Result'] = $tmp;
				}else{
					$response['Result'] = array();
				}
			}
		}else{
			$response['Result'] = array();
		}
		// $sessions = $this->session->all_userdata();
		// $response['token'] = $sessions['session_id'];
		exit(json_encode($response));

	}

	public function getApiParams(){
		$data = file_get_contents('php://input'); 
		$data = json_decode($data,TRUE);
		if(!$data){
			$data = $_POST;
		}
		
		return $data;
	}


}
