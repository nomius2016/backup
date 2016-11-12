<?php

/**
 * bank_cards
 */
class bank_cards extends Base_Model{
	
	private $_bank_list;

	public function __construct() {
		$this->setTableName("bank_cards");
		parent::__construct ();
		$this->_bank_list = array(
			'ICBC'=>'工商银行',
			'ABC' =>'农业银行',
			'CCB' =>'建设银行',
			'CMB' =>'招商银行',
			'BOC'=>'中国银行',
		);
	}
	

	/**
	 * [teamHtml 生成前台模板需要的 js 以及 搜索用的HTML]
	 * @return [type] [description]
	 */
	public function teamHtml(){

		$field = array(
            //字段名/显示名称/能否修改/是否显示/宽度/类型/值
			array('card_user_name','卡主姓名'),
			array('bank_code','银行名称',TRUE,FALSE,60,'select',$this->_bank_list),
			array('account_no','银行卡号'),
			array('display_name','显示名称'),
			array('branch_name','开户行'),
			array('remark','备注'),
		);

		$search = array(
			array('bank_code','select',$this->_bank_list),
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
		if($params['bank_code']) $where['bank_code'] = $params['bank_code'];

		$page = $params['page'] ? $params['page'] : 1;
		$pageSize =  $params['rows'] ? $params['rows'] : 20;
		$start = ($page - 1) * $pageSize; 
		
		$limit = isset($params['export']) ? array() : array($start,$pageSize);

		$list = $this->selectByWhere($where,'*',$limit,array('id','asc'));
		foreach ($list as $key => &$value) {
			$value['bank_code'] = $this->_bank_list[$value['bank_code']];
		}

		$count = $this->count($where);
		return array(
				'rows'=>$list,
				'total'=>ceil($count/$pageSize),
				'page'=>$page
			);
	}

	public function bank_list(){
		return $this->_bank_list;
	}


}