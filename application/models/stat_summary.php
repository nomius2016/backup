<?php

/**
 * general_report
 */
class Stat_summary extends Base_Model{
	
	public function __construct() {
		$this->setTableName("stat_summer_daily");
		parent::__construct ();
	}
	

	/**
	 * [teamHtml 生成前台模板需要的 js 以及 搜索用的HTML]
	 * @return [type] [description]
	 */
	public function teamHtml(){

		$field = array(
                //字段名/显示名称/能否修改/是否显示/宽度/类型/值
			array('date','日期',false),
		    array('dau','到访用户数',false),
			array('user_new_reg','注册人数',false),
			array('user_have_bet','投注人数',false),
		    array('deposit','存款',false),
			array('deposit_user','存款用户数',false),
			array('withdraw','提款',false),
			array('withdraw_user','提款用户数',false),
			array('bet','总投注',false),
			array('fandian','返点',false),
		    array('bonus','活动费用',false),
		    array('commission','佣金',false),
		    array('profit_bet','注面盈利',false),
		    array('profit_cash','现金盈利',false),
		    array('profit_real','实际盈利',false),
		    array('cash_bet_rate','充值流水比例',false),
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
		if($params['date']) $where['date'] = $params['date'];

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