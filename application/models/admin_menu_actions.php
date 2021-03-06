<?php

/**
 * admin_menu_actions
 */
class admin_menu_actions extends Base_Model{
	
	public function __construct() {
		$this->setTableName("admin_menu_actions");
		parent::__construct ();
	}
	

	/**
	 * [teamHtml 生成前台模板需要的 js 以及 搜索用的HTML]
	 * @return [type] [description]
	 */
	public function teamHtml(){

		$field = array(
                //字段名/显示名称/能否修改/是否显示/宽度/类型/值
			array('id','ID',false),
			array('admin_menu_id','菜单ID'),
			array('controller','控制器'),
			array('action','行为器'),
			array('desc','描述')
		);

		$search = array(
			array('admin_menu_id','text','菜单ID'),
			array('controller','text','控制器'),
			array('action','text','行为器')
		);
		$data = array();
		$data['field'] = $field;
		$data['search'] = $search;
		$data['add'] = true;
		$data['del'] = true;
		$data['edit'] = true;
		return $this->teamHplus($data);

	}

	/**
	 * [getList 根据条件获取数据]
	 * @param  [type] $params [description]
	 * @return [type]         [description]
	 */
	public function getList($params){
		$where = array();
		if($params['admin_menu_id']) $where['admin_menu_id'] = $params['admin_menu_id'];
		if($params['controller']) $where['controller'] = $params['controller'];
		if($params['action']) $where['action'] = $params['action'];

		$page = $params['page'] ? $params['page'] : 1;
		$pageSize =  $params['rows'] ? $params['rows'] : 20;
		$start = ($page - 1) * $pageSize; 
		
		$limit = isset($params['export']) ? array() : array($start,$pageSize);

		$list = $this->selectByWhere($where,'*',$limit,array('id','asc'));
		$count = $this->count($where);

		return array(
				'rows'=>$list,
				'total'=>ceil($count/$pageSize),
				'page'=>$page
			);
	}


}