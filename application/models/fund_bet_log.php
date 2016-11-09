<?php

/**
 * user_bet_log
 */
class fund_bet_log extends Base_Model{
	
	public function __construct() {
		$this->setTableName("fund_bet_log");
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
			array('account','游戏帐号',false),
			array('user_id','用户ID',false),
			array('platform','游戏平台',false),
			array('amount','金额',false),
			array('aviamount','有效投注金额',false),
			array('winloss','净输赢',false),
			array('bettime','投注时间',false)
		);

		$search = array(
			array('account','text','请输入游戏帐号'),
			array('user_id','text','请输入用户ID'),
			array('platform','text','游戏平台'),
			array('bettime','datetime','投注'),
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
		if($params['account']) $where['account'] = $params['account'];
		if($params['user_id']) $where['user_id'] = $params['user_id'];
		if($params['platform']) $where['platform'] = $params['platform'];
		if($params['bettime_start']) $where['bettime >='] = $params['bettime_start'];
		if($params['bettime_end']) $where['bettime <='] = $params['bettime_end'];

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