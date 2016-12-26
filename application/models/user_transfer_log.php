<?php

/**
 * user_transfer
 */
class user_transfer_log extends Base_Model{
	

	protected $gaming_api;
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
		
		if($io !== CTP && $io !== PTC){
			$ret['msg'] = '转账类型不对';
			return $ret;
		}	
		$this->load->model('users');
		$userinfo = $this->users->getUserInfo($user_id);
		if($io === CTP){
			$balance = $this->f($userinfo['balance']);
			if($amount > $balance){
				$ret['msg'] = '中心钱包余额不足';
				return $ret;
			}
		}

		//开始转账
		$orderNo = $this->getTradeNo($user_id);
		$this->load->model('gaming_adapter');
		try {
			$this->gaming_adapter->trans_begin();
			if($io == PTC){
				$afterBalance = $userinfo['balance'] + $amount * 1000;
				$s = '+';
			}else{
				$afterBalance = $userinfo['balance'] - $amount * 1000;
				$s = '-';
			}
			$change_amount = $amount * 1000;
			$log = array(
					'user_id'=>$user_id,
					'parent_id'=>$userinfo['parent_id'],
					'parent_path'=>$userinfo['parent_path'],
					'transfer_type_id'=>$gaming_id,
					'before_balance'=>$userinfo['balance'],
					'income'=>$io,
					'amount'=>$amount * 1000,
					'after_balance'=>$afterBalance,
					'remark'=>$orderNo,
					'dateline'=>time()
				);
			$row = $this->users->update_field_by_exp(array('user_id'=>$user_id),array('balance'=>"balance $s $change_amount"));
			
			if($row != 1){
				$this->gaming_adapter->trans_rollback();
				$ret['msg'] = '修改用户资金出错';
				return $ret;
			}
			
			$trans_ret = $this->gaming_adapter->transfer($user_id,$amount,$gaming_id,$io,$orderNo);
			
			if($trans_ret['status'] === true){
				$log['status'] = 1;
				$this->insert($log);
				$ret['status'] = true;
				$ret['code'] = 1;
				$ret['msg'] = '转账成功';
				$this->gaming_adapter->trans_commit();
				return $ret;
			}else{
				$ret['msg'] = $trans_ret['msg'];
				if($io == CTP){
					$log['status'] = 0;
					$this->insert($log);
					$this->trans_commit();
					return $ret;
				}else{
					$this->trans_rollback();
					return $ret;
				} 
			}
		} catch (Exception $e) {
			$this->trans_rollback();
			$ret['msg'] = '未知错误';
			return $ret;
		}
		

	}

	/*
	
	`id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0' COMMENT '用户ID',
  `parent_id` int(10) unsigned DEFAULT '0' COMMENT '上级ID',
  `parent_path` varchar(255) DEFAULT NULL COMMENT '上级路径',
  `transfer_type_id` smallint(4) DEFAULT '0' COMMENT '和fund_transfer_type对应',
  `before_balance` bigint(20) DEFAULT '0' COMMENT '变动前金额',
  `income` tinyint(1) DEFAULT '1' COMMENT '0支出1收入',
  `amount` bigint(20) NOT NULL DEFAULT '0' COMMENT '变动金额',
  `after_balance` bigint(20) DEFAULT '0' COMMENT '变动后金额',
  `op_user_id` tinyint(4) DEFAULT '0' COMMENT '操作人员id，主要针对不是本人操作',
  `relation_id` bigint(20) unsigned DEFAULT '0' COMMENT ' 关联其他的id，例如投注',
  `remark` text COMMENT '备注',
  `status` tinyint(1) unsigned DEFAULT '0' COMMENT '状态0未完成1完成',
  `dateline` int(10) unsigned DEFAULT '0',


	 */




	/**
	 * 生成订单号
	 */
	public function getTradeNo($account_id){
		$dt = new DateTime('NOW');
		$time8 = dechex($dt->format('U'));// 8bit
		$user6 = sprintf("%08s", substr(dechex($account_id), 0,8)); // 8bit
		$fs = explode('.', microtime(true));
		$fsend = end($fs);
		$haomiao4 =sprintf("%04d", $fsend);// 4bit

		return substr($user6.$time8.$haomiao4, 0, 20);//BM平台 订单号生成规则
	}

}