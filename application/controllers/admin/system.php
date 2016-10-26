<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class System extends Basecontroller {

	public function __construct(){
		parent::__construct();
	}

	public function index()
	{	
		$this->load->view('welcome_message');
	}

	/**
	 * [menu 后台菜单配置]
	 * @return [type] [description]
	 */
	public function menu(){
		
		$this->load->model('admin_menu');
		if(!isset($_GET['getdata'])){
			$ret = $this->admin_menu->teamHtml();
			$this->adminview('hplus_normal',$ret);
			return;
		}
		
		$params = $this->input->get();
		$ret = $this->admin_menu->getList($params);
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
	public function menu_op(){

		$op = $_POST['oper'];
		$this->load->model('admin_menu');
		switch ($op) {
			case 'add':  //添加一个组别
				$data = array('level'=>$_POST['level'],'parent_id'=>$_POST['parent_id'],'title'=>$_POST['title'],
					          'display_sort'=>$_POST['display_sort'],'controller'=>$_POST['controller'],'action'=>$_POST['action']);
				$status = $this->admin_menu->insert($data);
				break;
			case 'edit': //修改组别
				$status = $this->admin_menu->update(array('id'=>$_POST['id']),array('group_name'=>$_POST['group_name']));
				break;
			case 'del':  //删除一个组
				$status = $this->admin_menu->delete(array('id'=>$_POST['id']));
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

