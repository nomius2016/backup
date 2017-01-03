<?php
/**
 * activities
 */
class Activity extends Base_Model{
	
	public function __construct() {
		parent::__construct ();
		$this->setTableName("activity");
		// 1 存提款 2体育 3娱乐场 4电子游戏 5 彩票
		$this->_type = array('1'=>'存提款','2'=>'体育','3'=>'娱乐场','4'=>'电子游戏','5'=>'彩票');
		$this->_status = array('-1'=>'禁用','1'=>'启用');
	}


	/**
	 * [teamHtml 生成前台模板需要的 js 以及 搜索用的HTML]
	 * @return [type] [description]
	 */
	public function teamHtml(){

		$field = array(
            //字段名/显示名称/能否修改/是否显示/宽度/类型/值
			array('id','id',false,false,30),
			array('main_title','主标题'),
		    array('main_title_desc','主标题描述'),
		    array('amount','活动金额'),
		    array('amount_desc','活动金额描述'),
		    array('img','图片地址',false,FALSE,100),
		    array('start_time','开始时间'),
		    array('end_time','结束时间'),
		    array('type','活动类型',TRUE,FALSE,60,'select',$this->_type),
			array('status','状态',TRUE,FALSE,60,'select',$this->_status),
			array('op','操作'),
		);

		$search = array(
			array('main_title','text','请输入主标题'),
		    array('type','select',$this->_type),
		);
		$data = array();
		$data['export'] = false;
		$data['field']  = $field;
		$data['search'] = $search;
		// $data['add'] = true;
		$data['del'] = true;
		//$data['edit'] = false;
		return $this->teamHplus($data);

	}

	/**
	 * [getList 根据条件获取数据]
	 * @param  [type] $params [description]
	 * @return [type]         [description]
	 */
	public function getList($params){
		$where = array();
		
		if($params['main_title']) $where['main_title'] = $params['main_title'];
		if($params['type']) $where['type'] = $params['type'];

		$page = $params['page'] ? $params['page'] : 1;
		$pageSize =  $params['rows'] ? $params['rows'] : 20;
		$start = ($page - 1) * $pageSize; 
		
		$limit = isset($params['export']) ? array() : array($start,$pageSize);

		$list = $this->selectByWhere($where,'*',$limit,array('id','asc'));
		$count = $this->count($where);

		foreach ($list as $key => &$value) {
			$value['op'] = "<a href='/admin/activities/index?id=".$value['id']."' class='cof' target='_blank'> 修改</a>";
			$value['status'] = $this->_status[$value['status']];
			$value['type'] = $this->_type[$value['type']];
			$value['img'] = "<img src='/{$value['img']}' width='50%' height='50%'>";
		}

		return array(
				'rows'=>$list,
				'total'=>ceil($count/$pageSize),
				'page'=>$page
			);
	}


}


?>