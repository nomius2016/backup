<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Deposit extends Basecontroller {

	public function __construct(){
		parent::__construct();
		$this->load->model('fund_deposit');
		$this->load->model('payment_method');
	}


	/**
	 * [初审列表]
	 * @return [type] [description]
	 */
	public function first_list(){
		if(!isset($_GET['getdata'])){
			$ret = $this->fund_deposit->teamHtml(true); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('deposit_first_list',$ret);
			return;
		}
		
		$params = $this->input->get();
		$params['status']  = 1;
		$ret = $this->fund_deposit->getList($params);
		$_list = $ret['rows'];
		foreach ((array)$_list AS $k => $v) {
		    $v['pay_method'] = $this->payment_method->getPaymentMethodName($v['payment_method_id']);
		    $v['account_name'] = "<a href=\"/admin/user/info?user_id={$v['user_id']}\"  class=\"cof\">".$this->getUserName($v['user_id'])."</a>";
		    $v['first_deal'] = "-";
		    $v['second_deal'] = "-";
		    $v['status'] = $this->statusText($v['status']);
		    $v['amount'] = sprintf("%.2f",$v['amount']/1000);
		    $ret['rows'][$k] = $v;
		}
		echo json_encode($ret);
		exit;

	}


	/* 存初审列表审核*/
	public function first_list_op(){
		$ret = $this->fund_deposit->verify(1,$this->input->post());
		exit(json_encode($ret));

	}


	/**
	 * [复审列表]
	 * @return [type] [description]
	 */
	public function sec_list(){
		if(!isset($_GET['getdata'])){
			$ret = $this->fund_deposit->teamHtml(true); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('deposit_sec_list',$ret);
			return;
		}
		
		$params = $this->input->get();
		$params['status']  = 2;
		$ret = $this->fund_deposit->getList($params);
		$_list = $ret['rows'];
		foreach ((array)$_list AS $k => $v) {
		    $v['pay_method'] = $this->payment_method->getPaymentMethodName($v['payment_method_id']);
		    $v['account_name'] = "<a href=\"/admin/user/info?user_id={$v['user_id']}\"  class=\"cof\">".$this->getUserName($v['user_id'])."</a>";
		    if ($v['first_deal_adminid']>0) {
		        $v['first_deal'] = $this->getAdminName($v['first_deal_adminid']).'@'.$v['first_deal_time'];
		    } else {
		      $v['first_deal'] = "-";
		    }
		    if ($v['second_deal_adminid']>0) {
		        $v['second_deal'] = $this->getAdminName($v['second_deal_adminid']).'@'.$v['second_deal_time'];
		    } else {
		        $v['second_deal'] = "-";
		    }
		    $v['amount'] = sprintf("%.2f",$v['amount']/1000);
		    $v['status'] = $this->statusText($v['status']);
		    $ret['rows'][$k] = $v;
		}
		echo json_encode($ret);
		exit;

	}


	/* 存复审列表审核*/
	public function sec_list_op(){
		$ret = $this->fund_deposit->verify(2,$this->input->post());
		exit(json_encode($ret));

	}

	/**
	 * [成功列表]
	 * @return [type] [description]
	 */
	public function suc_list(){
		if(!isset($_GET['getdata'])){
			$ret = $this->fund_deposit->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('hplus_normal',$ret);
			return;
		}
		
		$params = $this->input->get();
		$params['status']  = 3;
		$ret = $this->fund_deposit->getList($params);
		$_list = $ret['rows'];
		foreach ((array)$_list AS $k => $v) {
		    $v['pay_method'] = $this->payment_method->getPaymentMethodName($v['payment_method_id']);
		    $v['account_name'] = "<a href=\"/admin/user/info?user_id={$v['user_id']}\"  class=\"cof\">".$this->getUserName($v['user_id'])."</a>";
		    if ($v['first_deal_adminid']>0) {
		        $v['first_deal'] = $this->getAdminName($v['first_deal_adminid']).'@'.$v['first_deal_time'];
		    } else {
		        $v['first_deal'] = "-";
		    }
		    if ($v['second_deal_adminid']>0) {
		        $v['second_deal'] = $this->getAdminName($v['second_deal_adminid']).'@'.$v['second_deal_time'];
		    } else {
		        $v['second_deal'] = "-";
		    }
		    $v['amount'] = sprintf("%.2f",$v['amount']/1000);
		    $v['status'] = $this->statusText($v['status']);
		    $ret['rows'][$k] = $v;
		}
		echo json_encode($ret);
		exit;

	}

	/**
	 * [拒绝列表]
	 * @return [type] [description]
	 */
	public function rej_list(){
		if(!isset($_GET['getdata'])){
			$ret = $this->fund_deposit->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('hplus_normal',$ret);
			return;
		}
		
		$params = $this->input->get();
		$params['rej']  = true;
		$ret = $this->fund_deposit->getList($params);
		$_list = $ret['rows'];
		foreach ((array)$_list AS $k => $v) {
		    $v['pay_method'] = $this->payment_method->getPaymentMethodName($v['payment_method_id']);
		    $v['account_name'] = "<a href=\"/admin/user/info?user_id={$v['user_id']}\"  class=\"cof\">".$this->getUserName($v['user_id'])."</a>";
		    if ($v['first_deal_adminid']>0) {
		        $v['first_deal'] = $this->getAdminName($v['first_deal_adminid']).'@'.$v['first_deal_time'];
		    } else {
		        $v['first_deal'] = "-";
		    }
		    if ($v['second_deal_adminid']>0) {
		        $v['second_deal'] = $this->getAdminName($v['second_deal_adminid']).'@'.$v['second_deal_time'];
		    } else {
		        $v['second_deal'] = "-";
		    }
		    $v['amount'] = sprintf("%.2f",$v['amount']/1000);
		    $v['status'] = $this->statusText($v['status']);
		    $ret['rows'][$k] = $v;
		}
		echo json_encode($ret);
		exit;

	}

	
	private function statusText($i) {
	    if ($i==1) {//$i = '待初审';状态 (1 申请中 2 一审成功 -2一审失败 3二审成功 -3二审失败)
	        $i = '待初审';
	    } else if ($i==2) {
	        $i = '一审通过 ';
	    } else if ($i==-2) {
	        $i = '一审拒绝 ';
	    } else if ($i==3) {
	        $i = '二审通过 ';
	    } else if ($i==-2) {
	        $i = '二审拒绝';
	    }
	    return $i;
	}
}

