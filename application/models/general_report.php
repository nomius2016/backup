<?php

/**
 * general_report
 */
class general_report extends Base_Model{
	
	public function __construct() {
		$this->setTableName("general_report");
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
			array('stat_date','统计日期',false),
			array('register_user','新注册',false),
			array('dau','到访用户数',false),
			array('deposit_user_count','存款用户数',false),
			array('deposit_total','存款总额',false),
			array('onlinepay_user_count','在线支付人数',false),
			array('onlinepay_total','在线支付总额',false),
			array('withdraw_user_count','提款用户数',false),
			array('withdraw_total','提款总额',false),
			array('bouns_user_count','申请红利人数',false),
			array('bouns_total','bouns_total',false),
		);

		$search = array(
			array('stat_date','text','统计日期')
		);
		$data = array();
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
		if($params['stat_date']) $where['stat_date'] = $params['stat_date'];

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