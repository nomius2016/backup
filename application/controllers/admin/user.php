<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User extends Basecontroller {

	public function __construct(){
		parent::__construct();
	}

	/**
	 * [list 用户列表]
	 * @return [type] [description]
	 */
	public function lists(){
		$this->load->model('users');
		if(!isset($_GET['getdata'])){
			$ret = $this->users->teamHtml();
			$this->adminview('hplus_normal',$ret);
			return;
		}

		$params = $this->input->get();
		$ret = $this->users->getList($params);
		$_list = $ret['rows'];
		foreach ((array)$_list AS $k => $v) {
		    $v['account_name'] = "<a href=\"/admin/user/info?user_id={$v['id']}\"  class=\"cof\">{$v['account_name']}</a>";
		    $v['parent_name'] = $v['parent_id']>0 ? $this->users->getAccountName($v['parent_id']) : '无';
		    $v['profit'] = $v['total_deposit']-$v['total_withdraw'];
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

		$op = $_POST['oper'];
		$this->load->model('users');
		switch ($op) {
			case 'edit': //修改组别
				$status = $this->users->update(array('id'=>$_POST['id']),
										array(
											'account_name'=>$_POST['account_name'],
											'name'=>$_POST['name'],
											'sex'=>$_POST['sex'],
											'status'=>$_POST['status'],
											'phone'=>$_POST['phone']
											)

										);
				break;
		}

		if($status){
			exit(json_encode(array('status'=>true,'msg'=>'操作成功')));
		}else{
			exit(json_encode(array('status'=>false,'msg'=>'操作失败')));
		}

	}

	public function contact_export(){

		$this->load->model('users');
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


	public function transfer_list(){

		$this->load->model('user_transfer');
		if(!isset($_GET['getdata'])){
			$ret = $this->user_transfer->teamHtml();
			$this->adminview('hplus_normal',$ret);
			return;
		}

		$params = $this->input->get();
		$ret = $this->user_transfer->getList($params);
		
		//导出的时候用
		if($params['export']){
			if($ret['rows']){
				$this->load->library ( "phpexcel/bomaexcel");
				$this->bomaexcel->output($ret['rows'],array('用户ID','转账平台','转账金额','转账时间'),'用户转账记录',
														array('user_id','platform','amount','create_time'));
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
	    $this->load->model('users');
	    $aUser = $this->users->getUserInfo(intval($this->input->get('user_id')));
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
	    $aAssign['user'] = $aUser;
	    $this->adminview('user_info',$aAssign);
		//exit("给力开发中......");
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

