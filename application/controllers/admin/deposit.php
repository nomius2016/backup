<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Deposit extends Basecontroller {

	public function __construct(){
		parent::__construct();
	}


	/**
	 * [初审列表]
	 * @return [type] [description]
	 */
	public function first_list(){
		
		$this->load->model('user_deposit');
		if(!isset($_GET['getdata'])){
			$ret = $this->user_deposit->teamHtml(true); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('deposit_first_list',$ret);
			return;
		}
		
		$params = $this->input->get();
		$params['status']  = 1;
		$ret = $this->user_deposit->getList($params);

		echo json_encode($ret);
		exit;

	}


	/* 存初审列表审核*/
	public function first_list_op(){

		$this->load->model('user_deposit');
		$ret = $this->user_deposit->verify(1,$this->input->post());
		exit(json_encode($ret));

	}


	/**
	 * [复审列表]
	 * @return [type] [description]
	 */
	public function sec_list(){
		$this->load->model('user_deposit');
		if(!isset($_GET['getdata'])){
			$ret = $this->user_deposit->teamHtml(true); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('deposit_sec_list',$ret);
			return;
		}
		
		$params = $this->input->get();
		$params['status']  = 2;
		$ret = $this->user_deposit->getList($params);

		echo json_encode($ret);
		exit;

	}


	/* 存复审列表审核*/
	public function sec_list_op(){

		$this->load->model('user_deposit');
		$ret = $this->user_deposit->verify(2,$this->input->post());
		exit(json_encode($ret));

	}

	/**
	 * [成功列表]
	 * @return [type] [description]
	 */
	public function suc_list(){
		
		$this->load->model('user_deposit');
		if(!isset($_GET['getdata'])){
			$ret = $this->user_deposit->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('hplus_normal',$ret);
			return;
		}
		
		$params = $this->input->get();
		$params['status']  = 3;
		$ret = $this->user_deposit->getList($params);

		echo json_encode($ret);
		exit;

	}

	/**
	 * [拒绝列表]
	 * @return [type] [description]
	 */
	public function rej_list(){
		
		$this->load->model('user_deposit');
		if(!isset($_GET['getdata'])){
			$ret = $this->user_deposit->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('hplus_normal',$ret);
			return;
		}
		
		$params = $this->input->get();
		$params['rej']  = true;
		$ret = $this->user_deposit->getList($params);

		echo json_encode($ret);
		exit;

	}


	public function online_list(){
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
	
}

