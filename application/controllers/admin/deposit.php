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
		
		$this->load->model('user_withdrawal');
		if(!isset($_GET['getdata'])){
			$ret = $this->user_withdrawal->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('hplus_normal',$ret);
			return;
		}
		
		$params = $this->input->get();
		$params['status']  = 1;
		$ret = $this->user_withdrawal->getList($params);

		echo json_encode($ret);
		exit;

	}


	/**
	 * [复审列表]
	 * @return [type] [description]
	 */
	public function sec_list(){
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
	 * [成功列表]
	 * @return [type] [description]
	 */
	public function suc_list(){
		
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
	 * [拒绝列表]
	 * @return [type] [description]
	 */
	public function rej_list(){
		
		$this->load->model('user_withdrawal');
		if(!isset($_GET['getdata'])){
			$ret = $this->user_withdrawal->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('hplus_normal',$ret);
			return;
		}
		
		$params = $this->input->get();
		$params['rej']  = true;
		$ret = $this->user_withdrawal->getList($params);

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

