<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Play extends Basecontroller {

	public function __construct(){
		parent::__construct();
	}

	
	public function sb(){
		
		if($this->islogin){
			$this->load->model('gaming_adapter');
			$ret = $this->gaming_adapter->getGameUrl($this->user_id,101);
			header('Location: '.$ret['url']);
		}else{
			exit('请登录!'); 
		}
	}

	

}

