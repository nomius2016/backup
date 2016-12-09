<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Index extends CI_Controller {

	public function __construct(){
		parent::__construct();
	}

	
	public function index(){
			
		$this->load->view('v1/index.html');
	}

	public function login(){

		$this->load->model('users');
		$params = array('account_name'=>'zhangsan','password'=>'123qwert');
		$ret = $this->users->loginUser($params);
	}

	public function test(){
		//$this->load->library('email');
		$this->email->sendemail('测试','测试发送邮件','nomius@126.com');
		//$this->hemail->send();
	}

	public function echarts(){
		$this->load->view('echarts');
	}

}

