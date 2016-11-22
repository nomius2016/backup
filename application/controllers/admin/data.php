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
	
	public function dashboard() {
	    $date = date('Y-m-d');
	    $this->load->model('stat_summary');
	    $_aSummary = $this->stat_summary->summary(date('Y-m-d',strtotime('-1 day')));
	    $aSummary = $this->stat_summary->summary($date);
	    $aProfit  = $this->profit();

	    echo json_encode(array(
	        'deposit' => array(
	            'y' => array('amount' => $this->f($_aSummary['deposit']),'users' => $_aSummary['deposit_user']),
	            't' => array('amount' => $this->f($aSummary['deposit']),'users' => $aSummary['deposit_user']),
	        ),
	        'withdraw' => array(
	            'y' => array('amount' => $this->f($_aSummary['withdraw']),'users' => $_aSummary['withdraw_user']),
	            't' => array('amount' => $this->f($aSummary['withdraw']),'users' => $aSummary['withdraw_user']),
	        ),
	        'bet' => array(
	            'y' => $this->f($_aSummary['bet']),
	            't' => array('amount' => $this->f($aSummary['bet']), 'users' => $aSummary['user_have_bet']),
	        ),
	        'bonus' => array(
	            'y' => $this->f($_aSummary['bonus']),
	            't' => $this->f($aSummary['bonus']),
	        ),
	        'profit_line' => array(
	            'labels'       => $aProfit['labels'],
	            'profit_gross' => $aProfit['profit_gross'],
	            'profit_net'   => $aProfit['profit_net'],
	            'profit_cash'  => $aProfit['profit_cash'],
	        )
	    ));
	}
	
	private function profit() {
	    $aRS = array();
	    $stat = $this->stat_summary->getList(array('rows' => 30,'orderby' => 'asc'));
	    foreach ((array)$stat['rows'] AS $v) {
	        $aRS['labels'][]       = substr($v['date'], -2);
	        $aRS['profit_gross'][] = $this->f(($v['bet']-$v['bonus'])/10000);
	        $aRS['profit_net'][]   = $this->f(($v['bet']-$v['bonus']-$v['fandian']-$v['activity_cost']-$v['commission'])/10000);
	        $aRS['profit_cash'][]  = $this->f(($v['deposit']-$v['withdraw'])/10000);
	    }
	    return $aRS;
	}
	
}