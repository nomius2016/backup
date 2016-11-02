<?php

/**
 * user_bonus
 */
class user_bonus extends Base_Model{
	
	public function __construct() {
		$this->setTableName("user_bonus");
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
			array('user_id','用户ID'),
			array('status','状态',true,false,60,'select',array('1'=>'申请中','2'=>'一审成功','3'=>'一审失败','4'=>'二审成功','5'=>'二审失败')),
			array('amount','金额'),
			array('createtime','创建时间',false)
		);

		$search = array(
			array('user_id','text','请输入用户ID'),
		);
		$data = array();
		$data['export'] = true;
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
		if($params['user_id']) $where['user_id'] = $params['user_id'];

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
	 * [addUserBonus 给单个用户直接添加红利]
	 * @param [type] $user_id [description]
	 * @param [type] $amount  [description]
	 */
	public function addUserBonus($user_id,$amount,$remark){
		$user_id = intval($user_id);
		$amount = sprintf("%01.2f",$amount);
		$now = date('Y-m-d H:i:s');
		//获取当前管理ID
		$this->load->model('admins');
		$this->load->model('users');
		$admininfo = $this->admins->getLoginInfo();
		$bonus_data = array(
				'user_id'=>$user_id,
				'createtime'=>$now,
				'first_deal_time'=>$now,
				'second_deal_time'=>$now,
				'first_deal_adminid'=>$admininfo['id'],
				'second_deal_adminid'=>$admininfo['id'],
				'remark'=>$remark,
				'amount'=>$amount,
				'first_remark'=>$remark,
				'second_remark'=>$remark,
				'status'=>4
			);
		$this->trans_begin();
		$this->insert($bonus_data);
		$user_status = $this->users->changeUserBalance($user_id,$amount,IN,BONUS);

	}

}