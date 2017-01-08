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
		$response['Success'] = $data['code'] >0 ? true : false; 
		$response['Code']    = isset($data['code']) ? $data['code'] : 'undefined';
		$response['Message'] = isset($data['f_error']) ? $data['f_error'] : $this->getMessageByCode($data['code']);
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

	/**
	 * [getApiParams 获取POST 提交的参数]
	 * @param  [type] $key [description]
	 * @return [type]      [description]
	 */
	public function getApiParams($key = NULL){
		$data = file_get_contents('php://input'); 
		$data = json_decode($data,TRUE);
		if(!$data){
			$data = $_POST;
		}
		if($key){
			if(isset($data[$key])) return $data[$key];
			return null;
		}
		
		return $data;
	}

	/**
	 * [getMessageByCode 根据code 返回错误对应的值]
	 * @param  [type] $code [description]
	 * @return [type]       [description]
	 */
	private function getMessageByCode($code){
		// 0以下 代表失败   0以上代表成功

		$codes = array(
		    '-1022'=>'存款金额不能超出范围',
		    '-1021'=>'操作金额不正确',
		    '-1020'=>'对游戏平台转账失败',
		    '-1019'=>'游戏平台错误',
		    '-1018'=>'转出资金余额不足',
		    '-1017'=>'最多只能绑定3张银行卡',
			'-1016'=>'帐号已存在',
			'-1015'=>'参数不全',
			'-1014'=>'用户名或者密码错误',
			'-1013'=>'当日最大提款总额不能大于单日限额',
			'-1012'=>'提款金额不能小于最小提款额',
			'-1011'=>'提款金额不能大于最大提款额',
			'-1010'=>'提款金额不能大于可用余额',
			'-1009'=>'答案错误',
			'-1008'=>'登录密码错误',
			'-1007'=>'新密码不能为空',
			'-1006'=>'新密码不能和当前密码相同',
			'-1005'=>'当前密码不正确',
			'-1004'=>'密码不能为空',
			'-1003'=>'资金密码错误',
			'-1002'=>'密码格式不对',
			'-1001'=>'帐号不存在',
			'-3'   =>'DB错误',
			'-2'   =>'操作失败',
			'-1'   =>'用户未登录/登录状态失效!',
			

			'1'    =>'操作成功',
			'1001' =>'无数据',
			'1002' =>'答案正确',
		);

		return $codes[$code] ? $codes[$code] : '';


	}


}
