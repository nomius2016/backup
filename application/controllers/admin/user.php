<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User extends Basecontroller {

	public function __construct(){
		parent::__construct();
		$this->load->model('users');
	}

	/**
	 * [list 用户列表]
	 * @return [type] [description]
	 */
	public function lists(){
		if(!isset($_GET['getdata'])){
			$ret = $this->users->teamHtml();
			$this->adminview('hplus_normal',$ret);
			return;
		}

		$params = $this->input->get();
		$ret = $this->users->getList($params);
		$_list = $ret['rows'];
		foreach ((array)$_list AS $k => $v) {
		    $restrict = $this->users->restrict($v['user_id']);
		    $v = array_merge($v,$restrict);
		    $v['account_name'] = "<a href=\"/admin/user/info?user_id={$v['user_id']}\"  class=\"cof\">{$v['account_name']}</a>";
		    $v['parent_name'] = $v['parent_id']>0 ? $this->users->getAccountName($v['parent_id']) : '无';
		    $v['profit'] = sprintf("%.2f",($v['total_deposit']-$v['total_withdraw'])/1000);
		    $v['total_deposit'] = sprintf("%.2f",$v['total_deposit']/1000);
		    $v['total_withdraw'] = sprintf("%.2f",$v['total_withdraw']/1000);
		    $v['total_bet'] = sprintf("%.2f",$v['total_bet']/1000);
		    $v['balance'] = sprintf("%.2f",$v['balance']/1000);
		    $v['frozon_balance'] = sprintf("%.2f",$v['frozon_balance']/1000);
		    $v['ag_balance'] = sprintf("%.2f",$v['ag_balance']/1000);
		    $v['sb_balance'] = sprintf("%.2f",$v['sb_balance']/1000);
		    $v['pt_balance'] = sprintf("%.2f",$v['withdrawal_day_max']/1000);
		    $v['withdrawal_day_max'] = sprintf("%.2f",$v['withdrawal_day_max']/1000);
		    $v['withdrawal_min'] = sprintf("%.2f",$v['withdrawal_min']/1000);
		    $v['withdrawal_max'] = sprintf("%.2f",$v['withdrawal_max']/1000);
		    $v['status_text'] = $v['status']==1 ? '正常' : '冻结';
		    $ret['rows'][$k] = $v;
		}
		//导出的时候用
		if($params['export']){
			if($ret['rows']){
				$this->load->library ( "phpexcel/bomaexcel");
				$this->bomaexcel->output($ret['rows'],array('ID','菜单名称','等级','父级ID','排序','控制器','行为器'),'admin_menu',
														array('id','title','level','parent_id','display_sort','controller','action'));
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
	 * [menu_op 后台菜单配置操作权限]
	 * @return [type] [description]
	 */
	public function lists_op(){
        $op = $this->input->post();
		switch ($op['oper']) {
			case 'edit': //修改组别
			    $aField = array();
			    if (isset($op['status'])) {
			        $aField['status'] = $op['status'];
			    }

				$status = $this->users->update(array('user_id' => $op['user_id']),$aField);
				break;
		}

		if ($status>0){
		    $this->log("改变user id={$op['user_id']},账号状态status={$op['status']}");
			exit(json_encode(array('status'=>true,'msg'=>'操作成功')));
		} else {
			exit(json_encode(array('status'=>false,'msg'=>'操作失败')));
		}

	}
	
	public function set_restrict() {
	    $aParam = $this->input->post();
	    $aField = array();
	    if ($aParam['field']=='extra') {
	        $aExtra = $this->users->restrict($aParam['user_id']);
	        if ($aParam['group']=='transfer') {
	            $aExtra['extra']['transfer'][$aParam['gaming_id']][$aParam['op']] = $aParam['val']; 
	        } else {
	            $aExtra['extra'][$aParam['op']] = $aParam['val'];
	        }
	        $aField['extra'] = json_encode($aExtra['extra']);
	    } else {
	        if (strstr($aParam['field'], 'withdraw')) {
	            $aParam['val'] *= 1000;
	        }
	        $aField[$aParam['field']] = $aParam['val'];
	    }
	    $this->log("改变user id={$aParam['user_id']}账号限制,{$aParam['field']}={$aParam['val']}");
	    echo $this->users->set_restrict($aParam['user_id'], $aField);
	}

	public function contact_export(){
		if(!isset($_GET['getdata'])){
			$ret = $this->users->teamContactHtml();
			$this->adminview('hplus_normal',$ret);
			return;
		}

		$params = $this->input->get();
		$ret = $this->users->getList($params);
		
		//导出的时候用
		if($params['export']){
			if($ret['rows']){
				$this->load->library ( "phpexcel/bomaexcel");
				$this->bomaexcel->output($ret['rows'],array('用户名','姓名','手机号码','注册时间'),'用户联系方式',
														array('account_name','name','phone','regiester_time'));
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
		$ret = $this->user_messages->getList($params);
		$_list = $ret['rows'];
		foreach ((array)$_list AS $k => $v) {
		    $v['account_name'] = "<a href=\"/admin/user/info?user_id={$v['user_id']}\"  class=\"cof\">".$this->getUserName($v['user_id'])."</a>";
		    $v['message_type'] = $v['type']==0 ? '后台发送' : '系统发送';
		    $v['is_readed'] = $v['is_read']==0 ? 'N' : 'Y';
		    $ret['rows'][$k] = $v;
		}
		echo json_encode($ret);
		exit;

	}

	/**
	 * [info 会员概况]
	 * @return [type] [description]
	 */
	public function info(){
	    $iUserid = intval($this->input->get('user_id'));
	    
	    $profile  = $this->users->profile($iUserid);
	    $restrict = $this->users->restrict($iUserid);
	    $aUser = $this->users->getUserInfo($iUserid);
	    $aUser['bal'] = $this->users->balance($iUserid);
	    
	    $this->load->model('transation');
	    
	    $aUser = array_merge($aUser,$profile,$restrict);
	    $aAssign = array();
	    $aUser['online'] = '离线';
	    if ($aUser['parent_path']=='') {
	        $aUser['parent_path'] = '/';
	    } else if (is_int(parent_path)) {
	        $aUser['parent_path'] = $this->users->getAccountName($aUser['parent_path']);
	    } else if (strstr($aUser['parent_path'], ',')) {
	        $_tmp = array();
	        $_us = explode(',', $aUser['parent_path']);
	        foreach ($_us AS $u) {
	            $_tmp[] = $this->users->getAccountName($u);
	        }
	        $aUser['parent_path'] = implode(',', $_tmp);
	    }
	    $aUser['parent_id'] = $aUser['parent_id']>0 ? $this->users->getAccountName($aUser['parent_id']) : '无';
	    $aUser['profit'] = sprintf("%.2f",($aUser['total_deposit']-$aUser['total_withdraw'])/1000);
	    $aUser['total_deposit'] = sprintf("%.2f",$aUser['total_deposit']/1000);
	    $aUser['total_withdraw'] = sprintf("%.2f",$aUser['total_withdraw']/1000);
	    $aUser['total_bet'] = sprintf("%.2f",$aUser['total_bet']/1000);
	    $aUser['balance'] = sprintf("%.2f",$aUser['balance']/1000);
	    $aUser['frozon_balance'] = sprintf("%.2f",$aUser['frozon_balance']/1000);
	    $aUser['balance-100'] = sprintf("%.2f",$aUser['bal'][100]/1000);
	    $aUser['balance-101'] = sprintf("%.2f",$aUser['bal'][101]/1000);
	    $aUser['balance-102'] = sprintf("%.2f",$aUser['bal'][102]/1000);
	    $aUser['withdrawal_day_max'] = sprintf("%.2f",$aUser['withdrawal_day_max']/1000);
	    $aUser['withdrawal_min'] = sprintf("%.2f",$aUser['withdrawal_min']/1000);
	    $aUser['withdrawal_max'] = sprintf("%.2f",$aUser['withdrawal_max']/1000);
	    $aAssign['user'] = $aUser;
	    /*
    	try {
	      $this->db->trans_begin();
	      // 先进常规的业务逻辑,业务逻辑完成以后到改变用户余额哪一步开始代用事务 
	      //$depositid = $this->fund_deposit->insert($array);
	      if ($depositid<1) {
	          //throw new Exception('插入失败，报异常，必须抛出异常！！！！！！！！！！！！');
	      } 
	      //////////////////////////////
	      $a = 300*1000;
	      $this->transation->make(3,2,$a,0,1,'提现失败返还');
	     //////////////////////////////
	      $this->db->trans_commit();
	  } catch (Exception $e) {
	     $this->db->trans_rollback ();
	  }*/
	    $this->adminview('user_info',$aAssign);
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

