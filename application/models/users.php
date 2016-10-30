<?php

/**
 * user
 */
class Users extends Base_Model{
	
	public function __construct() {
		$this->setTableName("users");
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
			array('account_name','用户名'),
			array('name','姓名'),
			array('sex','性别',true,false,60,'select',array('1'=>'男','2'=>'女','3'=>'保密')),
			array('status','状态',true,false,60,'select',array('1'=>'激活','2'=>'冻结')),
			array('phone','手机号码'),
			array('withdrawal_day_max','单日最大提款'),
			array('withdrawal_min','最低提款'),
			array('withdrawal_max','最高存款'),
			array('regiester_time','注册时间',false)
		);

		$search = array(
			array('account_name','text','请输入用户名'),
			array('name','text','请输入姓名')
		);
		$data = array();
		$data['export'] = true;
		$data['field'] = $field;
		$data['search'] = $search;
		// $data['add'] = true;
		// $data['del'] = true;
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
		if($params['account_name']) $where['account_name'] = $params['account_name'];
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

		/**
	 * [teamHtml 生成前台模板需要的 js 以及 搜索用的HTML]
	 * @return [type] [description]
	 */
	public function teamContactHtml(){

		$field = array(
                //字段名/显示名称/能否修改/是否显示/宽度/类型/值
			array('id','ID',false),
			array('account_name','用户名'),
			array('name','姓名'),
			array('phone','手机号码'),
			array('regiester_time','注册时间'),
		);

		$search = array(
			array('account_name','text','请输入用户名'),
			array('name','text','请输入姓名')
		);
		$data = array();
		$data['export'] = true;
		$data['field'] = $field;
		$data['search'] = $search;
		// $data['add'] = true;
		// $data['del'] = true;
		// $data['edit'] = true;
		return $this->teamHplus($data);

	}


}