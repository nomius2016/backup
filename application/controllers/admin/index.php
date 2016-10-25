<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Index extends Basecontroller {

	public function __construct(){
		parent::__construct();
	}

	public function index()
	{	
		$this->load->model('admin_menu');
		$menu_data = $this->admin_menu->genHplusMenu();	
		$this->adminview('index_index',array('menu_data'=>$menu_data));
	}
}

