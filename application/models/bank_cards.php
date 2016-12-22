<?php

/**
 * bank_cards
 */
class bank_cards extends Base_Model{
	
	public function __construct() {
		$this->setTableName("bank_cards");
		parent::__construct ();

		$this->_bank_list = array(
			'ICBC'=>'工商银行',
			'ABC' =>'农业银行',
			'CCB' =>'建设银行',
			'CGB' =>'广发银行',
			'ECITIC'=>'中信银行',
			'PINGAN'=>'平安银行',
			'CMB' =>'招商银行',
			'CMBC'=>'民生银行',
			'CIB' =>'兴业银行',
			'HXB'=>'华夏银行',
			'BEIJING'=>'北京银行',
			'COMM'=>'交通银行',
			'CEB'=>'光大银行',
			'BOC'=>'中国银行',
			'PSBC'=>'邮政储蓄',
			'SPDB'=>'浦发银行',
			'HKBEA'=>'东亚银行',
			'SHANGHAI'=>'上海银行',
			'TCCB'=>'天津银行',
			'NBCB'=>'宁波银行',
			'NJCB'=>'南京银行'
		);
	}

	/**
	 * [teamHtml 生成前台模板需要的 js 以及 搜索用的HTML]
	 * @return [type] [description]
	 */
	public function teamHtml(){

		$field = array(
            //字段名/显示名称/能否修改/是否显示/宽度/类型/值
			array('user_id','用户ID'),
			array('name','姓名'),
			array('bank_name','银行名称',TRUE,FALSE,60,'select',$this->_bank_list),
		    array('account_no','银行卡号',TRUE),
			array('display_name','显示别称',TRUE),
			array('branch_name','银行分支名称',TRUE),
			array('create_time','创建时间',false),
		);

		$search = array(
		    array('user_id','text','请输入用户ID'),
			array('name','text','姓名')
		);
		$data = array();
		$data['field'] = $field;
		$data['search'] = $search;
		$data['add'] = true;
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
		if($params['user_id'])  $where['user_id'] = $params['user_id'];
		if($params['name'])     $where['name'] = $params['name'];
		$page = $params['page'] ? $params['page'] : 1;
		$pageSize =  $params['rows'] ? $params['rows'] : 20;
		$start = ($page - 1) * $pageSize; 
		
		$limit = isset($params['export']) ? array() : array($start,$pageSize);
		
		$count = $this->count($where);
		$list = $this->selectByWhere($where,'*',$limit);

		return array(
				'rows'  => $list,
				'total' => ceil($count/$pageSize),
				'page'  => $page
			);
	}

	public function b_insert($data){
		$data['bank_name'] = $this->_bank_list[$data['bank_code']];
		return $this->insert($data);
	}

	/**
	 * [getCardsByUserId 根据用户ID 来获取提款卡]
	 * @param  boolean $user_id [description]
	 * @return [type]           [description]
	 */
	public function getCardsByUserId($user_id = false){
		$where = array('user_id'=>$user_id,'status'=>1);
		return $this->selectByWhere($where,'*');
	}


}