<?php
/**
 * AOP（ACL）
 * @author david
 */
class Aop {
	private $CI;
	private $s_auth;
	private $s_rtx;
	private $controller;
	private $action;
	private $user;
	public function __construct() {
		$this->CI = & get_instance ();
		$this->s_rtx = & load_class ( 'Router' );
		$this->controller = $this->s_rtx->fetch_class ();
		$this->action = $this->s_rtx->fetch_method ();

		//加载model
		$this->CI->load->model('admin_menu_auth');
	}
	
	/**
	 * 匹配原则
	 * 1. 匹配是否是全都可访问的
	 * 2  匹配用户是否有权限
	 * 3  通过行为器 判断是否是异步请求
	 *
	 */
	public function filter() {
		$controller_path = explode('/', $_SERVER['REQUEST_URI']);
		if(!BACKSTAGE){
			return;
		}
		//看看哪些控制器都可以访问
		$no_deny = array(
				'index' => array('index','login','main','page_403'),
		        'data'  => array('notify','dashboard','page_403'),
		        'activities'=> array('saveActivityImg','save','list'),
			);
		if (isset($no_deny[$this->controller]) && in_array($this->action,$no_deny[$this->controller])){
			return ;
		}
		$user = $this->CI->session->all_userdata();
		$group_id = intval ( $user ['group_id'] );
		if($group_id<1){
			header("Location: /admin/index/index");
		} else {
    		// print_r(array('controller'=>$this->controller,'action'=>$this->action,'group_id'=>$group_id));exit;
    		$ret = $this->CI->admin_menu_auth->selectByWhere(array('controller'=>$this->controller,'action'=>$this->action,'group_id'=>$group_id));
    		if($ret){
    			return ;
    		}else{
    			//判断是否是异步请求
    			$rev = strrev($this->action);
    			//_op  po_
    			if(strpos($rev, 'po_')===0){
    				echo json_encode ( array ("status" => false,"message" => "对不起，您没有权限，请联系管理员！","msg" => "对不起，您没有权限，请联系管理员！","error" => 'deny',"from" => "aop" ) );
    				exit;
    			}else{
    				header("Location: /admin/index/page_403"); //跳转到403 页面去
    			}
    		}
		}
	}
}
