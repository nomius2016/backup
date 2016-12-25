<?php

/**
 * user_transfer
 */
class user_transfer_log extends Base_Model{
	

	protected $gaming_api;
	public function __construct() {
		$this->setTableName("user_transfer");
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
			array('user_id','用户ID',false),
			array('platform','游戏平台',false),
			array('amount','金额',false),
			array('create_time','转账时间',false)
		);

		$search = array(
			array('user_id','text','请输入用户ID'),
			array('platform','text','游戏平台')
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
		if($params['user_id']) $where['user_id'] = $params['user_id'];
		if($params['platform']) $where['platform'] = $params['platform'];

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
	 * [transfer 用户转账操作]
	 * @param  [type] $amount    [金额]
	 * @param  [type] $gaming_id [游戏ID]
	 * @param  [type] $io        [进/出]
	 * @return [type]            [description]
	 */
	public function transfer($user_id,$amount,$gaming_id,$io){
		
		$ret = array('status'=>false,'code'=>-1);
		if($amount<=0){
			$ret['msg'] = '转账金额不合法';
			return $ret;
		}

		$game = $this->getGames($gaming_id);
		if(!$game){
			$ret['msg'] = '游戏ID 不合法';
			return $ret;
		}
		// echo CTP;exit;
		if($io !== CTP && $io !== PTC){
			$ret['msg'] = '转账类型不对';
			return $ret;
		}	

		if($io === CTP){
			$this->load->model('users');
			
		}

		$this->load->model('gaming_adapter');
		$ret = $this->gaming_adapter->transfer($user_id,$amount,$gaming_id,$io);
		


	}


}