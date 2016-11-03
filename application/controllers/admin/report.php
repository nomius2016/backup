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
		
		$this->load->model('user_withdrawal');
		if(!isset($_GET['getdata'])){
			$ret = $this->user_withdrawal->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('hplus_normal',$ret);
			return;
		}
		
		$params = $this->input->get();
		$params['status']  = 3;
		$ret = $this->user_withdrawal->getList($params);

		echo json_encode($ret);
		exit;
	}

	/**
	 * [important_data 概要数据]
	 * @return [type] [description]
	 */
	public function summary(){

		$this->load->model('stat_summary');
		if(!isset($_GET['getdata'])){
			$ret = $this->stat_summary->teamHtml();
			$this->adminview('hplus_normal',$ret);
			return;
		}

		$params = $this->input->get();
		$params['type'] = 1;
		$ret = $this->stat_summary->getList($params);
		echo json_encode($ret);
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
	    $ret = $this->agent->getList($params);
	    echo json_encode($ret);
	    exit;
	}
	
	/**
	 * [withdrawal 提款记录]
	 * @return [type] [description]
	 */
	public function withdrawal(){
		$this->load->model('user_withdrawal');
		if(!isset($_GET['getdata'])){
			$ret = $this->user_withdrawal->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('hplus_normal',$ret);
			return;
		}
		
		$params = $this->input->get();
		$params['status']  = 2;
		$ret = $this->user_withdrawal->getList($params);

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
	 * [online 第三方充值]
	 * @return [type] [description]
	 */
	public function online(){
		$this->load->model('user_withdrawal');
		if(!isset($_GET['getdata'])){
			$ret = $this->user_withdrawal->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('hplus_normal',$ret);
			return;
		}
		
		$params = $this->input->get();
		$ret = $this->user_withdrawal->getList($params);

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

