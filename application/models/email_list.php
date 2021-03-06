<?php

/**
 * email_list
 */
class email_list extends Base_Model{
	
	private $_email_type = array();
	private $_status;
	public function __construct() {
		$this->setTableName("email_list");
		parent::__construct ();
		$this->load->model('email_type');
		$type = $this->email_type->selectAll();

		foreach ($type as $key => $value) {
			$this->_email_type[$value['id']] = $value['title'];
		}
		$this->_status = array('1'=>'未启用','2'=>'启用');

	}
	

	/**
	 * [teamHtml 生成前台模板需要的 js 以及 搜索用的HTML]
	 * @return [type] [description]
	 */
	public function teamHtml(){

		$field = array(
                //字段名/显示名称/能否修改/是否显示/宽度/类型/值
			array('id','ID',false),
			array('username','邮箱地址'),
			array('password','密码'),
			array('type','邮箱类型',TRUE,FALSE,60,'select',$this->_email_type),
			array('status','状态',TRUE,FALSE,60,'select',$this->_status),
			array('admin_id','创建者ID',false),
			array('createtime','创建时间',false)
		);

		$search = array(
			array('username','text','请输入用户名')
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