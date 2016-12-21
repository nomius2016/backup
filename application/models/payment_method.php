<?php

/**
 * onlinepay_merchant
 */
class payment_method extends Base_Model{
	

	public  $_mechants;

	public function __construct() {
		$this->setTableName("payment_method");
		parent::__construct ();

		$this->load->model('payment_group');
		$ret = $this->payment_group->selectAll();
		//获取商户类型
		$merchants = array();
		foreach ($ret as  $value) {
			$merchants[$value['payment_group_id']] = $value['nickname'];
		}
		$this->_merchants = $merchants;
	}
	

	/**
	 * [teamHtml 生成前台模板需要的 js 以及 搜索用的HTML]
	 * @return [type] [description]
	 */
	public function teamHtml(){
		$field = array(
                //字段名/显示名称/能否修改/是否显示/宽度/类型/值
			array('title','标题'),
			array('payment_group_id','商户类型',TRUE,FALSE,60,'select',$this->_merchants),
			array('secret_key','密钥'),
			array('company_id','商户ID'),
		);

		$search = array(
			array('payment_group_id','select',$this->_merchants),
		);
		$data = array();
		// $data['export'] = true;
		$data['field'] = $field;
		$data['search'] = $search;
		$data['add'] = true;
		$data['del'] = true;
		$data['edit'] = true;
		$this->teamHplus($data);
		return $this->teamHplus($data);
	}

	/**
	 * [getList 根据条件获取数据]
	 * @param  [type] $params [description]
	 * @return [type]         [description]
	 */
	public function getList($params){
		$where = array();
		if($params['payment_group_id']) $where['payment_group_id'] = $params['payment_group_id'];

		$page = $params['page'] ? $params['page'] : 1;
		$pageSize =  $params['rows'] ? $params['rows'] : 20;
		$start = ($page - 1) * $pageSize; 
		
		$limit = isset($params['export']) ? array() : array($start,$pageSize);

		$list = $this->selectByWhere($where,'*',$limit,array('payment_method_id','desc'));
		foreach ($list as $key => &$value) {
		    $value['id'] = $value['payment_method_id'];
			$value['payment_group_id'] = $this->_merchants[$value['payment_group_id']];
		}
		$count = $this->count($where);

		return array(
				'rows'=>$list,
				'total'=>ceil($count/$pageSize),
				'page'=>$page
			);
	}

    public function getPaymentMethodName(int $id) {
        $aMethod = $this->selectByCons(array('payment_method_id' => $id));
        return $this->_merchants[$aMethod['payment_group_id']].':'.$aMethod['title'];
    }
    
    /**
     * [getOnlineBank 获取转账的银行]
     * @return [type] [description]
     */
    public function getOnlineBank(){
    	
    	$sql = "SELECT g.merchant as bank_name,m.title AS bank_address,m.secret_key AS account_no,m.company_id AS name FROM payment_group AS g  INNER JOIN payment_method AS m 
    		ON g.payment_group_id = m.payment_group_id WHERE g.status = 1 and m.status = 1 
    		and g.payment_group_id in (6,7,8,9,10) GROUP BY g.payment_group_id
    	";
    	$banks = $this->querySql($sql);
    	return $banks;
    	
    }
}