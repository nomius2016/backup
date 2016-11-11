<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Report extends Basecontroller {

	public function __construct(){
		parent::__construct();
	}

	/**
	 * [存款记录]
	 * @return [type] [description]
	 */
	public function deposit(){
		
		$this->load->model('fund_deposit');
		if(!isset($_GET['getdata'])){
			$ret = $this->fund_deposit->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('hplus_normal',$ret);
			return;
		}
		
		$params = $this->input->get();
		$params['status']  = 3;
		$ret = $this->fund_deposit->getList($params);

		echo json_encode($ret);
		exit;
	}

	/**
	 * [important_data 概要数据]
	 * @return [type] [description]
	 */
	public function summary() {
		$this->load->model('stat_summary');
		if(!isset($_GET['getdata'])){
			$ret = $this->stat_summary->teamHtml();
			$this->adminview('hplus_normal',$ret);
			return;
		}

		$params = $this->input->get();
		$ret = $this->stat_summary->getList($params);
		foreach ((array)$ret['rows'] AS $k => $v) {
		    $v['cash_bet_rate']  = '1 : '.sprintf("%.1f",$v['bet']/$v['deposit']);
		    $v['fandian']        = sprintf("%.2f",$v['fandian']/1000);
		    $v['profit_bet']     = sprintf("%.2f",($v['bet']-$v['bonus'])/1000);
		    $v['profit_cash']    = sprintf("%.2f",($v['deposit']-$v['withdraw'])/1000);
		    $v['profit_real']    = sprintf("%.2f",($v['bet']-$v['bonus']-$v['fandian']-$v['activity_cost']-$v['commission'])/1000);
		    $v['deposit']        = sprintf("%.2f",$v['deposit']/1000);
		    $v['withdraw']       = sprintf("%.2f",$v['withdraw']/1000);
		    $v['bet']            = sprintf("%.2f",$v['bet']/1000);
		    $v['bonus']          = sprintf("%.2f",$v['bonus']/1000);
		    $v['activity_cost']  = sprintf("%.2f",$v['activity_cost']/1000);
		    $v['commission']     = sprintf("%.2f",$v['commission']/1000);
		    
		    $list['rows'][$k] = $v;
		}
		
		echo json_encode($list);
		exit;
	}
	
	/**
	 * [important_data 概要数据]
	 * @return [type] [description]
	 */
	public function agent() {
	    $this->load->model('agent');
	    if(!isset($_GET['getdata'])){
	        $ret = $this->agent->teamHtml();
	        $this->adminview('hplus_normal',$ret);
	        return;
	    }
	
	    $params = $this->input->get();
	    //print_r($params);
	    $ret = $this->agent->getList($params);
	    $list = array();
	    foreach ((array)$ret['rows'] AS $k => $v) {
	        $v['account_name']   = $this->getUserName($v['user_id']);
	        $v['cash_bet_rate']  = '1 : '.sprintf("%.1f",$v['bet']/($v['deposit']));
	        $v['profit_cash']    = sprintf("%.2f",($v['deposit']-$v['withdraw'])/1000);
	        $v['profit']         = sprintf("%.2f",($v['bet']-$v['bonus']-$v['fandian']-$v['activity_cost']-$v['commission'])/1000);
	        $v['profit_bet']     = sprintf("%.2f",($v['bet']-$v['bonus'])/1000);
	        $v['deposit']        = sprintf("%.2f",$v['deposit']/1000);
	        $v['withdraw']       = sprintf("%.2f",$v['withdraw']/1000);
	        $v['bet']            = sprintf("%.2f",$v['bet']/1000);
	        $v['bonus']          = sprintf("%.2f",$v['bonus']/1000);
	        $v['activity_cost']  = sprintf("%.2f",$v['activity_cost']/1000);
	        $v['commission']     = sprintf("%.2f",$v['commission']/1000);
	        $v['fandian']        = sprintf("%.2f",$v['fandian']/1000);
	        
	        $list['rows'][$k] = $v;
	    }
	    echo json_encode($list);
	    exit;
	}
	
	/**
	 * [withdrawal 提款记录]
	 * @return [type] [description]
	 */
	public function withdraw(){
		$this->load->model('fund_withdraw');
		if(!isset($_GET['getdata'])){
			$ret = $this->fund_withdraw->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('hplus_normal',$ret);
			return;
		}
		
		$params = $this->input->get();
		$params['status']  = 2;
		$ret = $this->fund_withdraw->getList($params);

		echo json_encode($ret);
		exit;
	}

	/**
	 * [bonus 红利记录]
	 * @return [type] [description]
	 */
	public function bonus(){
		$this->load->model('user_bonus');
		if(!isset($_GET['getdata'])){
			$ret = $this->user_bonus->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('hplus_normal',$ret);
			return;
		}
		
		$params = $this->input->get();
		$ret = $this->user_bonus->getList($params);

		echo json_encode($ret);
		exit;
	}


	/**
	 * [transfer 转账记录]
	 * @return [type] [description]
	 */
	public function transfer(){
		exit("给力开发中......");
	}	
}

