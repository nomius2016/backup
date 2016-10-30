<?php

/**
 * user_messages
 */
class user_messages extends Base_Model{
	
	public function __construct() {
		$this->setTableName("user_messages");
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
			array('user_id','用户ID',false),
			array('title','标题',false),
			array('send_time','发送时间',false),
			array('admin_name','管理员名',false)
		);

		$search = array(
			array('user_id','text','请输入用户ID'),
			array('title','text','标题')
		);
		$data = array();
		$data['export'] = false;
		$data['field'] = $field;
		$data['search'] = $search;
		// $data['add'] = true;
		// $data['del'] = true;
		// $data['edit'] = true;
		return $this->teamHplus($data);

	}

	/**
	 * [getList 根据条件获取数据]
	 * @param  [type] $params [description]
	 * @return [type]         [description]
	 */
	public function getList($params){
		$where = array();
		if($params['user_id']) $where['user_id'] = $params['user_id'];
		if($params['title']) $where['title'] = $params['title'];
		if(isset($params['type'])) $where['type'] = $params['type'];

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

	/**
	 * [teamHtml 生成前台模板需要的 js 以及 搜索用的HTML]
	 * @return [type] [description]
	 */
	public function teamSystemHtml(){

		$field = array(
                //字段名/显示名称/能否修改/是否显示/宽度/类型/值
			array('id','ID',false),
			array('user_id','用户ID'),
			array('title','标题'),
			array('content','内容',true,false),
			array('send_time','发送时间',false),
			array('admin_name','管理员名',false)
		);

		$search = array(
			array('user_id','text','请输入用户ID'),
			array('title','text','标题')
		);
		$data = array();
		$data['export'] = false;
		$data['field'] = $field;
		$data['search'] = $search;
		$data['add'] = true;
		$data['del'] = true;
		// $data['edit'] = true;
		return $this->teamHplus($data);

	}


}