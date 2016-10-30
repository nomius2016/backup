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
			$ret = $this->admin_menu->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
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
			case 'add':  //添加菜单
				$data = array('level'=>$_POST['level'],'parent_id'=>$_POST['parent_id'],'title'=>$_POST['title'],
					          'display_sort'=>$_POST['display_sort'],'controller'=>$_POST['controller'],'action'=>$_POST['action']);
				$status = $this->admin_menu->insert($data);
				break;
			case 'edit': //修改菜单
				$status = $this->admin_menu->update(array('id'=>$_POST['id']),
												array(
													'title'=>$_POST['title'],
													'level'=>$_POST['level'],
													'display_sort'=>$_POST['display_sort'],
													'controller'=>$_POST['controller'],
													'action'=>$_POST['action'],
												)
											);
				break;
			case 'del':  //删除一个菜单
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

	/**
	 * [admin_list 管理员列表]
	 * @return [type] [description]
	 */
	public function admin_list(){

		$this->load->model('admins');
		if(!isset($_GET['getdata'])){
			$ret = $this->admins->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('hplus_normal',$ret);
			return;
		}
		
		$params = $this->input->get();
		$ret = $this->admins->getList($params);

		echo json_encode($ret);
		exit;

	}

	/**
	 * [admin_list_op 管理员列表操作权限]
	 * @return [type] [description]
	 */
	public function admin_list_op(){

		$op = $_POST['oper'];
		$this->load->model('admins');
		switch ($op) {
			case 'add':  //添加一个组别
				$data = array('name'=>$_POST['name'],'username'=>$_POST['username'],'group_id'=>$_POST['group_id'],
					          'email'=>$_POST['email'],'create_admin_id'=>1,'create_time'=>date('Y-m-d H:i:s'));
				$status = $this->admins->insert($data);
				break;
			case 'edit': //修改组别
				$status = $this->admins->update(array('id'=>$_POST['id']),
												array(
													'title'=>$_POST['title'],
													'level'=>$_POST['level'],
													'display_sort'=>$_POST['display_sort'],
													'controller'=>$_POST['controller'],
													'action'=>$_POST['action'],
												)
											);
				break;
			case 'del':  //删除一个组
				$status = $this->admins->delete(array('id'=>$_POST['id']));
				# code...
				break;
		}

		if($status){
			exit(json_encode(array('status'=>true,'msg'=>'操作成功')));
		}else{
			exit(json_encode(array('status'=>false,'msg'=>'操作失败')));
		}	
	}
	
	/**
	 * [admin_group 组别管理]
	 * @return [type] [description]
	 */
	public function admin_group(){
		$this->load->model('admin_group');
		if(!isset($_GET['getdata'])){
			$ret = $this->admin_group->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('hplus_normal',$ret);
			return;
		}
		
		$params = $this->input->get();
		$ret = $this->admin_group->getList($params);
		echo json_encode($ret);
		exit;
	}


	/**
	 * [admin_group_op 组别管理操作权限]
	 * @return [type] [description]
	 */
	public function admin_group_op(){

		$op = $_POST['oper'];
		$this->load->model('admin_group');
		switch ($op) {
			case 'add':  //添加一个组别
				$data = array('group_name'=>$_POST['group_name'],'display_sort'=>$_POST['display_sort']);
				$status = $this->admin_group->insert($data);
				break;
			case 'edit': //修改组别
				$status = $this->admin_group->update(array('id'=>$_POST['id']),
												array(
													'group_name'=>$_POST['group_name'],
													'display_sort'=>$_POST['display_sort']
												)
											);
				break;
			case 'del':  //删除一个组
				$status = $this->admin_group->delete(array('id'=>$_POST['id']));
				# code...
				break;
		}

		if($status){
			exit(json_encode(array('status'=>true,'msg'=>'操作成功')));
		}else{
			exit(json_encode(array('status'=>false,'msg'=>'操作失败')));
		}	

	}

	/**
	 * [email_list 邮箱列表]
	 * @return [type] [description]
	 */            
	public function email_list(){

		$this->load->model('email_list');
		if(!isset($_GET['getdata'])){
			$ret = $this->email_list->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('hplus_normal',$ret);
			return;
		}
		
		$params = $this->input->get();
		$ret = $this->email_list->getList($params);
		echo json_encode($ret);
		exit;
	}

		/**
	 * [admin_group_op 邮箱列表操作权限]
	 * @return [type] [description]
	 */
	public function email_list_op(){

		$op = $_POST['oper'];
		$this->load->model('email_list');
		switch ($op) {
			case 'add':  //添加一个组别
				$data = array('username'=>$_POST['username'],'password'=>$_POST['password'],'type'=>$_POST['type'],'status'=>$_POST['status'],'createtime'=>date('Y-m-d H:i:s'),'admin_id'=>0);
				$status = $this->email_list->insert($data);
				break;
			case 'edit': //修改组别
				$status = $this->email_list->update(array('id'=>$_POST['id']),
												array(
													'username'=>$_POST['username'],
													'password'=>$_POST['password'],
													'type'=>$_POST['type'],
													'status'=>$_POST['status'],
												)
											);
				break;
			case 'del':  //删除一个组
				$status = $this->email_list->delete(array('id'=>$_POST['id']));
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

