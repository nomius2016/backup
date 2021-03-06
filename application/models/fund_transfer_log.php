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
			array('account_name','用户名',false),
		    array('before_balance','账变前余额',false),
		    array('fund_transfer_type','操作类型',false),
			array('amount','金额变动',false),
		    array('after_balance','账变后余额',false),
		    array('remark','备注',false),
		    array('op_user_name','操作人',false),
		    array('status','状态',false),
			array('dateline','发生时间',false)
		);

		$search = array(
			array('user_id','text','请输入用户ID'),
			array('date','date',''),
		    array('transfer_type_id','select',array_merge(array(0 => '账变类型'),$this->transferType())),
		);
		$data = array();
		$data['export'] = false;
		$data['field'] = $field;
		$data['search'] = $search;
		// $data['add'] = true;
		// $data['del'] = true;
		// $data['edit'] = true;
		return $this->teamHplus($data);
	}
	
	public function transferType() {
	    $this->load->model('fund_transfer_type');
	    return $this->fund_transfer_type->getType();
	}

	/**
	 * [getList 根据条件获取数据]
	 * @param  [type] $params [description]
	 * @return [type]         [description]
	 */
	public function getList($params){
		$where = array();
		if ($params['user_id']) $where['user_id'] = $params['user_id'];
		if ($params['platform']) $where['platform'] = $params['platform'];
		if ($params['transfer_type_id']>0) {
		    $where['transfer_type_id'] = $params['transfer_type_id'];
		}

		if($params['start_date']) $where['dateline >='] = strtotime($params['start_date']);
		if($params['end_date']) $where['dateline <='] = strtotime($params['end_date']);
		$page = $params['page'] ? $params['page'] : 1;
		$pageSize =  $params['rows'] ? $params['rows'] : 20;
		$start = ($page - 1) * $pageSize; 
		
		$limit = isset($params['export']) ? array() : array($start,$pageSize);

		$list = $this->selectByWhere($where,'*',$limit,array('id','DESC'));
		$count = $this->count($where);

		return array(
				'rows'=>$list,
				'total'=>ceil($count/$pageSize),
				'page'=>$page
			);
	}


}