<?php

/**
 * general_report
 */
class Stat_summary extends Base_Model{
	
	public function __construct() {
		$this->setTableName("stat_summary_daily");
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
		    array('bonus','总中奖',false),
			array('fandian','返点',false),
		    array('activity_cost','活动费用',false),
		    array('commission','佣金',false),
		    array('profit_bet','注面盈利',false),
		    array('profit_cash','现金盈利',false),
		    array('profit_real','实际盈利',false),
		    array('cash_bet_rate','充值流水比例',false),
		);


		$search = array(
		    array('date','date','统计'),
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
		if ($params['date_start']) {
		    $where['date >='] = $params['date_start'];
		}
		if ($params['date_end']) {
		    $where['date <='] = $params['date_end'];
		}
		$page = $params['page'] ? $params['page'] : 1;
		$pageSize =  $params['rows'] ? $params['rows'] : 20;
		$start = ($page - 1) * $pageSize; 
		
		$limit = isset($params['export']) ? array() : array($start,$pageSize);
		$count = $this->count($where);
		if ($count>0) {
		    $list = $this->selectByWhere($where,'*',$limit,array('date',$params['orderby'] ? $params['orderby']: 'desc'));
		    //echo $this->db->last_query();
		}

		return array(
				'rows'=>$list,
				'total'=>ceil($count/$pageSize),
				'page'=>$page
			);
	}

	public function summary(string $date) {
	    $aSummary = $this->stat_summary->selectByCons(array('date' => $date));
	    if ($aSummary['id']<1) {
	        $aSummary = array(
	            'date' => $date,
	            'dau' => 0,
	            'user_new_reg'  => 0,
	            'user_have_bet' => 0,
	            'deposit'       => 0,
	            'deposit_user'  => 0,
	            'withdraw'      => 0,
	            'withdraw_user' => 0,
	            'bet'           => 0,
	            'bonus'         => 0,
	            'fandian'       => 0,
	            'activity_cost' => 0,
	            'commission'    => 0,
	        );
	        $this->stat_summary->insert($aSummary);
	    }
	    return $aSummary;
	}

}