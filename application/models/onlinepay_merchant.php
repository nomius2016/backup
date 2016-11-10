<?php

/**
 * onlinepay_merchant
 */
class onlinepay_merchant extends Base_Model{
	
	public function __construct() {
		$this->setTableName("onlinepay_merchant");
		parent::__construct ();
	}
	

	/**
	 * [teamHtml 生成前台模板需要的 js 以及 搜索用的HTML]
	 * @return [type] [description]
	 */
	public function teamHtml(){

		//获取商户类型
		$this->load->model('onlinepay');
		$ret = $this->onlinepay->selectAll();
		$merchants = array();
		foreach ($ret as  $value) {
			$merchants[$value['id']] = $value['nickname'];
		}
		$field = array(
                //字段名/显示名称/能否修改/是否显示/宽度/类型/值
			array('title','标题'),
			array('merchat_id','商户类型',TRUE,FALSE,60,'select',$merchants),
			array('secret_key','密钥'),
			array('company_id','商户ID'),
		);

		$search = array(
			array('merchat_id','select',$merchants),
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
		if($params['merchat_id']) $where['merchat_id'] = $params['merchat_id'];

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