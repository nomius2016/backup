<?php

/**
 * onlinepay
 */
class onlinepay extends Base_Model{
	
	public function __construct() {
		$this->setTableName("onlinepay");
		parent::__construct ();
	}
	

	/**
	 * [teamHtml 生成前台模板需要的 js 以及 搜索用的HTML]
	 * @return [type] [description]
	 */
	public function teamHtml(){

		$bank_list = array(
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

		$field = array(
                //字段名/显示名称/能否修改/是否显示/宽度/类型/值
			array('merchant','商户名称'),
			array('nickname','商户别称'),
			array('white_list','IP白名单'),
			array('api_url','API请求地址'),
			array('notice_url','商家异步通知地址'),
			array('success_url','支付成功后跳转地址'),
			array('bank_list','银行列表',TRUE,FALSE,60,'select_multiple',$bank_list),
			array('mobile','是否支持手机',TRUE,FALSE,60,'select',array('1'=>'WEB和手机','2'=>'支持手机','3'=>'支持WEB')),
			array('type','支付类型',TRUE,FALSE,60,'select',array('1'=>'在线支付','2'=>'支付宝','3'=>'微信')),
			array('middle_jump_url','中转域名'),
		);

		$search = array(
			array('merchant','text','商户名称'),
			array('nickname','text','商户别称'),
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
		if($params['group_name']) $where['group_name'] = $params['group_name'];

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