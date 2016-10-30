<?php

/**
 * admins
 */
class Admins extends Base_Model{
	
	public function __construct() {
		$this->setTableName("admins");
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
			array('username','用户名'),
			array('name','姓名'),
			array('group_id','组别ID'),
			array('email','邮箱'),
			array('status','状态',false),
			array('create_admin_id','创建者ID',false),
			array('create_time','创建时间',false)
		);

		$search = array(
			array('username','text','请输入用户名'),
			array('name','text','请输入姓名')
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
		if($params['username']) $where['username'] = $params['username'];
		if($params['name']) $where['name'] = $params['name'];

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