<?php

/**
 * admin_group
 */
class admin_group extends Base_Model{
    private $_groupname = array();
	
	public function __construct() {
		$this->setTableName("admin_group");
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
			array('group_name','组名'),
			array('display_sort','排序'),
		    array('op','操作')
		);

		$search = array(
			array('group_name','text','请输入组名'),
		);
		$data = array();
		// $data['export'] = true;
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
		if($params['group_name']) $where['group_name'] = $params['group_name'];

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

    
	public function getGroupName($id) {
	    if (!$this->_groupname[$id]) {
	        $row = $this->selectById($id);
	        $this->_groupname[$id] = $row['group_name'];
	    }
	    return $this->_groupname[$id];
	}
}