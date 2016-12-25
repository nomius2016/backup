<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class transfer extends Basecontroller {

	public function __construct(){
		parent::__construct();
	}

	/**
	 * [index 转账接口]
	 * 游戏ID,金额,转向
	 * @return [type] [description]
	 */
	public function index(){
		$ret = array('status'=>false,'code'=>-1,'msg'=>'用户未登陆');
		if(!$this->islogin){
			$this->teamapi($ret);
		}

		$this->load->model('users');
		$userinfo = $this->users->getLoginInfo();
		$params = $this->getApiParams();
		$amount = sprintf("%.2f", $params['amount']);
		$gaming_id = intval($params['gaming_id']);
		$io  = $params['io'] == '0' ? 0 : 1;
		$this->load->model('user_transfer_log');
		$ret = $this->user_transfer_log->transfer($userinfo['user_id'],$amount,$gaming_id,$io);
		$this->teamapi($ret);
	}


}

