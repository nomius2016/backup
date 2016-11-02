<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Bonus extends Basecontroller {

	public function __construct(){
		parent::__construct();
	}


	/**
	 * [menu 后台菜单配置]
	 * @return [type] [description]
	 */
	public function lists(){
		
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
	 * [menu_op 后台菜单配置操作权限]
	 * @return [type] [description]
	 */
	public function lists_op(){

		$op = $_POST['oper'];
		$this->load->model('user_bonus');
		switch ($op) {
			case 'add':  //添加一个组别
				$data = array('user_id'=>$_POST['user_id'],'status'=>$_POST['status'],'amount'=>$_POST['amount'],
					          'createtime'=>date('Y-m-d H:i:s'));
				$status = $this->user_bonus->insert($data);
				break;
			case 'edit': //修改组别
				$status = $this->user_bonus->update(array('id'=>$_POST['id']),
												array(
													'user_id'=>$_POST['user_id'],
													'amount'=>$_POST['amount'],
													'status'=>$_POST['status'],
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
	
	/**
	 * [batch 批量添加红利]
	 * @return [type] [description]
	 */
	public function batch(){
		$this->load->model('user_bonus');
		$this->user_bonus->addUserBonus(1,100,'你好啊');
		echo 'over';exit;
	}

}

