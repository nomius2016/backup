<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Msg extends Basecontroller {

	public function __construct(){
		parent::__construct();
	}

	/**
	 * [前台公告]
	 * @return [type] [description]
	 */
	public function notice(){
		
		$this->load->model('user_messages');
		if(!isset($_GET['getdata'])){
			$ret = $this->user_messages->teamSystemHtml();
			$this->adminview('hplus_normal',$ret);
			return;
		}

		$params = $this->input->get();
		$params['type'] = 1;
		$ret = $this->user_messages->getList($params);
		echo json_encode($ret);
		exit;
	}

	/**
	 * [前台公告操作权限]
	 * @return [type] [description]
	 */
	public function notice_op(){

		$op = $_POST['oper'];
		$this->load->model('user_messages');
		switch ($op) {
			case 'add':  //添加一个组别
				$data = array('user_id'=>$_POST['user_id'],'title'=>$_POST['title'],'content'=>$_POST['content'],
					          'create_time'=>date('Y-m-d H:i:s'),'type'=>1);
				$status = $this->user_messages->insert($data);
				break;
			case 'del':  //删除一个组
				$status = $this->user_messages->delete(array('id'=>$_POST['id']));
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

