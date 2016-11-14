<?php

/**
 * email_type
 */
class email_type extends Base_Model{
	
	private $_crypto;

	public function __construct() {
		$this->setTableName("email_type");
		parent::__construct ();
		$this->_crypto = array('ssl'=>'SSL','tls'=>'TLS');
	}
	

	/**
	 * [teamHtml 生成前台模板需要的 js 以及 搜索用的HTML]
	 * @return [type] [description]
	 */
	public function teamHtml(){

		$field = array(
            //字段名/显示名称/能否修改/是否显示/宽度/类型/值
			array('title','邮箱名称'),
			array('host','发送HOST'),
			array('port','端口号'),
			array('protocol','发送方式'),
			array('crypto','协议',TRUE,FALSE,60,'select',$this->_crypto),
			array('url','登陆链接'),
		);

		$search = array(
			array('title','text','邮箱名称'),
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
		if($params['title']) $where['title'] = $params['title'];

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

	public function bank_list(){
		return $this->_bank_list;
	}


}