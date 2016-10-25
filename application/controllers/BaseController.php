<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class BaseController extends CI_Controller {

	public function __construct(){
		parent::__construct();
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


}
