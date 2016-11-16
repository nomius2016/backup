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
		    $v['account_name'] = "<a href=\"/admin/user/info?user_id={$v['user_id']}\"  class=\"cof\">".$this->getUserName($v['user_id'])."</a>";
		    $v['op_user_name']       = $v['user_id']>0 ? $this->getAdminName($v['user_id']) : '自己';
		    $v['fund_transfer_type'] = $aType[$v['transfer_type_id']];
		    $v['dateline']           = date('Y-m-d H:i:s',$v['dateline']);
		    $v['status']             = $v['status']==1 ? '完成' : '未完成';
		    $v['before_balance']     = sprintf("%.2f",$v['before_balance']/1000);
		    $v['amount']             = sprintf("%.2f",$v['amount']/1000);
		    $v['amount']             = $v['amount']<0 ? '<span style="color:red">'.$v['amount'].'</span>' : $v['amount'];
		    $v['after_balance']      = sprintf("%.2f",$v['after_balance']/1000);
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
	
	public function transation_test() {
	    $this->load->model('transation');
	    $p = $this->input->post();
	    if ($p['act']=='do') {
	        $aRS = array();
	        $aRS['err_no'] = 0;
	        $aRS['err_msg'] = '';
	        try {
	            $p['amount'] *= 1000;
	            $this->db->trans_begin();
	            // 先进常规的业务逻辑,业务逻辑完成以后到改变用户余额哪一步开始代用事务
	            //$depositid = $this->fund_deposit->insert($array);
	            if ($p['transfer_type_id']==1) {
	                $aField = array();
	                $aField['user_id'] = $p['user_id'];
	                $aField['amount'] = $p['amount'];
	                $aField['remark'] = $p['remark'];
	                $aField['createtime'] = date('Y-m-d H:i:s');
	                $this->db->set($aField)->insert('fund_deposit');
	                if ($this->db->insert_id()<1) {
	                    throw new Exception('failed to insert deposit ',10002);
	                }
	            }
	            
    	        if ($p['transfer_type_id']==2) {
    	            $aField = array();
    	            $aField['user_id'] = $p['user_id'];
    	            $aField['amount'] = $p['amount'];
    	            $aField['remark'] = $p['remark'];
    	            $aField['createtime'] = date('Y-m-d H:i:s');
    	            $this->db->set($aField)->insert('fund_withdraw');
    	            if ($this->db->insert_id()<1) {
    	                throw new Exception('failed to insert withdraw ',10002);
    	            }
    	        }
	            
	            $this->transation->make($p['user_id'],$p['transfer_type_id'],$p['amount'],0,1,$p['remark']);
	            //////////////////////////////
	            $this->db->trans_commit();
	        } catch (Exception $e) {
	            $this->db->trans_rollback();
	            $aRS['err_no'] = $e->getCode();
	            $aRS['err_msg'] = $e->getMessage();
    	    }
    	    echo json_encode($aRS);
	    } else {
	        $this->adminview('transation_test');
	    }
	}
}