<?php

/**
 * Fund_transfer_log
 */
class Fund_transfer_log extends Base_Model {
    private $_types = array();
	
	public function __construct() {
		$this->setTableName("fund_transfer_log");
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
			array('user_name','用户名',false),
			array('fund_transfer_type','类型',false),
		    array('before_balance','账变前余额',false),
			array('amount','变动金额',false),
		    array('after_balance','账变后余额',false),
		    array('remark','备注',false),
		    array('op_user_name','操作人',false),
		    array('status','状态',false),
			array('dateline','发生时间',false)
		);

		$search = array(
			array('user_id','text','请输入用户ID'),
			array('date','date','')
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

	/**
	 * [getList 根据条件获取数据]
	 * @param  [type] $params [description]
	 * @return [type]         [description]
	 */
	public function getList($params){
		$where = array();
		if($params['user_id']) $where['user_id'] = $params['user_id'];
		if($params['platform']) $where['platform'] = $params['platform'];

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