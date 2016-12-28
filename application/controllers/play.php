<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Play extends Basecontroller {

	public function __construct(){
		parent::__construct();
	}

	
	public function sb(){
		
		if($this->islogin){
			$this->load->model('gaming_adapter');
			$ret = $this->gaming_adapter->getGameUrl($this->user_id,SB_GAMING_ID);
			header('Location: '.$ret['url']);
		}else{
			exit('请登录!'); 
		}
	}

	public function test(){
		$this->load->model('gaming_adapter');
		// $ret = $this->gaming_adapter->getTransferStatus('2016122811264253417',SB_GAMING_ID);
		$ret = $this->gaming_adapter->getGameBanlance($this->user_id,SB_GAMING_ID);
		print_r($ret);exit;
	}
	

}

