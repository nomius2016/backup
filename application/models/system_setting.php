<?php

/**
 * onlinepay
 */
class System_setting extends Base_Model{
	
	private $_type;
	

	public function __construct() {
		$this->setTableName('system_setting');
		parent::__construct ();
		$this->_type = array('1'=>'私有变量','-1'=>'公共变量');
	}
	

	/**
	 * [teamHtml 生成前台模板需要的 js 以及 搜索用的HTML]
	 * @return [type] [description]
	 */
	public function teamHtml(){

		$field = array(
                //字段名/显示名称/能否修改/是否显示/宽度/类型/值
			array('id','id',false),
			array('variable','变量名'),
			array('type','变量类型',TRUE,FALSE,60,'select',$this->_type),
			array('content','值'),
			array('label','备注'),
			array('ttl','生存时间'),
		);

		$search = array(
			array('variable','text','变量名')
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
		if ($params['variable']) {
		    $where['variable'] = $params['variable'];
		}

		$page = $params['page'] ? $params['page'] : 1;
		$pageSize =  $params['rows'] ? $params['rows'] : 20;
		$start = ($page - 1) * $pageSize; 
		
		$limit = isset($params['export']) ? array() : array($start,$pageSize);

		$list = $this->selectByWhere($where,'*',$limit,array('id','asc'));
		foreach ($list as $key => &$value) {
			$value['type'] = $this->_type[$value['type']];
		}

		$count = $this->count($where);

		return array(
				'rows'=>$list,
				'total'=>ceil($count/$pageSize),
				'page'=>$page
			);
	}


}