<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Token extends Basecontroller {

	public function __construct(){
		parent::__construct();
	}

	/**
	 * [valid_token 验证token]
	 * @return [type] [description]
	 */
	public function valid_token(){
		$params = $this->getApiParams();
		$sessions = $this->session->all_userdata();
		$ret = array();
		$ret['code']   =-1;

		// if(($params['token'] == $sessions['session_id']) && isset($sessions['account_name']) && $sessions['account_name']){
		if(isset($sessions['account_name']) && $sessions['account_name']){
			$ret['code']   = 1;
			$ret['result'] = array(array(
					'Token'=>$sessions['session_id'],
					'AccountId'=>$sessions['account_name'],
					'Status'=>1
				));
		}
		$this->teamapi($ret);
	}

}

