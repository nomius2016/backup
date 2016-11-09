<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Data extends Basecontroller {

	public function __construct(){
		parent::__construct();
	}
	
	/**
	 * @desc 用户后台顶部信息提示
	 * @return JsonSerializable
	 */
	public function notify() {
	    $this->load->model('fund_deposit');
	    $this->load->model('fund_withdraw');
	   $aRS = array(
	       'deposit_total'     => 0, // 存款总数
	       'deposit_new'       => $this->fund_deposit->total(1), //待审存款
	       'withdraw_total'    => 0,
	       'withdraw_new'      => $this->fund_withdraw->total(1),
	   );
	   echo json_encode($aRS);
	}
	
}