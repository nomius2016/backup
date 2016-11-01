<?php

/**
 * admin_menu_auth
 */
class admin_menu_auth extends Base_Model{
	
	public function __construct() {
		$this->setTableName("admin_menu_auth");
		parent::__construct ();
	}
	

	/**
	 * [updateGroupAuth 修改组权限]
	 * @param  [type] $group_id [description]
	 * @param  [type] $menus    [description]
	 * @return [type]           [description]
	 */
	public function updateGroupAuth($group_id,$menus){
		// print_r($menus);exit;
		if(!$group_id || !$menus){
			return array('status'=>false,'msg'=>'参数错误');
		}

		try {
			
			// print_r($menus);exit;
			$this->trans_begin();
			//添加权限
			$this->load->model('admin_menu_actions');
			$this->load->model('admin_menu');
			$this->load->model('admin_menu_authority');
			//删除该组以前的权限
			$this->delete(array('group_id'=>$group_id));
			$this->admin_menu_authority->delete(array('group_id'=>$group_id));
			$insert_data = array();
			$authority_data = array();
			foreach ($menus as $menu_id => $op) {
				$authority_data[] = array('menu_id'=>$menu_id,'group_id'=>$group_id,'op'=>$op);
				switch ($op) {
						case '2':  //查看
							$menu = $this->admin_menu->selectById($menu_id);
							if($menu['controller'] && $menu['action']){
								$insert_data[] = array('controller'=>$menu['controller'],'action'=>$menu['action'],'group_id'=>$group_id);
							}
							break;
						case '3':  //操作
							$menu = $this->admin_menu->selectById($menu_id);
							$insert_data[] = array('controller'=>$menu['controller'],'action'=>$menu['action'],'group_id'=>$group_id);
							//获取 该菜单的操作权限
							$auth_menus = $this->admin_menu_actions->selectByWhere(array('admin_menu_id'=>$menu_id));
							if($auth_menus){
								foreach ($auth_menus as  $op_menu) {
									if($op_menu['controller'] && $op_menu['action']){
										$insert_data[] = array('controller'=>$op_menu['controller'],'action'=>$op_menu['action'],'group_id'=>$group_id);
									}
								}
							}
							break;
					}	
			}
			$ret = $this->insert_batch($insert_data);
			$ret = $this->admin_menu_authority->insert_batch($authority_data);
			$this->trans_commit();
		}catch ( Exception $e ) {
			$this->trans_rollback();
		}




	}


}