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
			case 'add':  //添加一个组别
				// $data = array('account_name'=>$_POST['account_name'],'name'=>$_POST['name'],'sex'=>$_POST['sex'],
				// 	          'status'=>$_POST['status'],'phone'=>$_POST['phone'],'regiester_time'=>date('Y-m-d H:i:s'));
				// $status = $this->users->insert($data);
				// break;
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
			case 'del':  //删除一个组
				$status = $this->users->delete(array('id'=>$_POST['id']));
				# code...
				break;
		}

		if($status){
			exit(json_encode(array('status'=>true,'msg'=>'操作成功')));
		}else{
			exit(json_encode(array('status'=>false,'msg'=>'操作失败')));
		}

	}
	
}

