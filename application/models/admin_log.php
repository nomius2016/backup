<?php

/**
 * Fund_transfer_log
 */
class Admin_log extends Base_Model {
    private $_types = array();
	
	public function __construct() {
		$this->setTableName("admin_log");
		parent::__construct ();
	}

	/**
	 * [teamHtml 生成前台模板需要的 js 以及 搜索用的HTML]
	 * @return [type] [description]
	 */
	public function teamHtml(){
		$field = array(
                //字段名/显示名称/能否修改/是否显示/宽度/类型/值
			array('id','流水ID',false,false,30),
			array('admin_name','管理员',false,false,30),
		    array('description','行为描述',false),
			array('dateline','发生时间',false,false,30)
		);

		$search = array(
			array('admin_id','text','管理员ID'),
			array('date','date','')
		    
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
		if ($params['admin_id']) {
		    $where['admin_id'] = $params['admin_id'];
		}
	    if ($params['date_start']) {
		    $where['dateline >='] = strtotime($params['date_start']);
		}
		if ($params['date_end']) {
		    $where['dateline <='] = strtotime($params['date_end']);
		}
            
		$page = $params['page'] ? $params['page'] : 1;
		$pageSize =  $params['rows'] ? $params['rows'] : 30;
		$start = ($page - 1) * $pageSize; 
		
		$limit = isset($params['export']) ? array() : array($start,$pageSize);

		$list = $this->selectByWhere($where,'*',$limit,array('dateline','DESC'));
		$count = $this->count($where);

		return array(
				'rows'=>$list,
				'total'=>ceil($count/$pageSize),
				'page'=>$page
			);
	}


}