<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Log extends Basecontroller {

	public function __construct(){
		parent::__construct();
	}

	/**
	 * [betlog 投注记录查询]
	 * @return [type] [description]
	 */
	public function betlog(){

		$this->load->model('user_bet_log');
		if(!isset($_GET['getdata'])){
			$ret = $this->user_bet_log->teamHtml();
			$this->adminview('hplus_normal',$ret);
			return;
		}

		$params = $this->input->get();
		$ret = $this->user_bet_log->getList($params);
		
		//导出的时候用
		if($params['export']){
			if($ret['rows']){
				$this->load->library ( "phpexcel/bomaexcel");
				$this->bomaexcel->output($ret['rows'],array('ID','用户ID','游戏帐号','游戏平台','投注金额','净输赢','投注时间'),'用户投注记录',
														array('id','user_id','account','platform','amount','winloss','bettime'));
				exit;
			}else{
				echo '<script>';
				echo "alert('数据为空');";
				echo "window.history.go(-1)";
				echo '</script>';
				exit;
			}		
		}

		echo json_encode($ret);
		exit;

	}

	public function fund(){

		$this->load->model('fund_transfer_log','fund');
		$this->load->model('fund_transfer_type');
		if(!isset($_GET['getdata'])){
			$ret = $this->fund->teamHtml();
			$this->adminview('hplus_normal',$ret);
			return;
		}

		$aType = $this->fund_transfer_type->getType();
		$params = $this->input->get();
		$ret = $this->fund->getList($params);
		$_list = $ret['rows'];
		foreach ((array)$_list AS $k => $v) {
		    $v['user_name'] = $this->getUserName($v['user_id']);
		    $v['op_user_name'] = $this->getUserName($v['user_id']);
		    $v['fund_transfer_type'] = $aType[$v['transfer_type_id']];
		    $v['dateline'] = date('Y-m-d H:i:s',$v['dateline']);
		    $v['status'] = $v['status']==1 ? '完成' : '未完成';
		    $v['before_balance'] = sprintf("%.2f",$v['before_balance']/1000);
		    $v['amount'] = sprintf("%.2f",$v['amount']/1000);
		    $v['after_balance'] = sprintf("%.2f",$v['after_balance']/1000);
		    $ret['rows'][$k] = $v;
		}
		
		//导出的时候用
		if($params['export']){
			if ($ret['rows']){
				$this->load->library ( "phpexcel/bomaexcel");
				$this->bomaexcel->output($ret['rows'],array('用户ID','转账平台','转账金额','转账时间'),'用户转账记录',
														array('user_id','platform','amount','create_time'));
				exit;
			} else{
				echo '<script>';
				echo "alert('数据为空');";
				echo "window.history.go(-1)";
				echo '</script>';
				exit;
			}		
		}

		echo json_encode($ret);
		exit;
		
	}


	/**
	 * [message 站内信列表]
	 * @return [type] [description]
	 */
	function message(){

		$this->load->model('user_messages');
		if(!isset($_GET['getdata'])){
			$ret = $this->user_messages->teamHtml();
			$this->adminview('hplus_normal',$ret);
			return;
		}

		$params = $this->input->get();
		$params['type'] = 0;
		$ret = $this->user_messages->getList($params);
		

		echo json_encode($ret);
		exit;

	}

	/**
	 * [betlog 投注记录查询]
	 * @return [type] [description]
	 */
	public function bet(){
	
	    $this->load->model('fund_bet_log');
	    if(!isset($_GET['getdata'])){
	        $ret = $this->fund_bet_log->teamHtml();
	        $this->adminview('hplus_normal',$ret);
	        return;
	    }
	
	    $params = $this->input->get();
	    $ret = $this->fund_bet_log->getList($params);
	
	    //导出的时候用
	    if($params['export']){
	        if($ret['rows']){
	            $this->load->library ( "phpexcel/bomaexcel");
	            $this->bomaexcel->output($ret['rows'],array('ID','用户ID','游戏帐号','游戏平台','投注金额','净输赢','投注时间'),'用户投注记录',
	                array('id','user_id','account','platform','amount','winloss','bettime'));
	            exit;
	        }else{
	            echo '<script>';
	            echo "alert('数据为空');";
	            echo "window.history.go(-1)";
	            echo '</script>';
	            exit;
	        }
	    }
	    echo json_encode($ret);
	    exit;
	}
	
	/**
	 * [transfer_check 转账状态查询]
	 * @return [type] [description]
	 */
	public function transfer_check(){
		exit("给力开发中......");
	}

	/**
	 * [changelog 帐变详情]
	 * @return [type] [description]
	 */
	public function changelog(){
		exit("给力开发中......");
	}
}

