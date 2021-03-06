<?php

/**
 * user_deposit
 */
class fund_deposit extends Base_Model{
	
	public function __construct() {
		$this->setTableName("fund_deposit");
		parent::__construct ();
	}
	

	/**
	 * [teamHtml 生成前台模板需要的 js 以及 搜索用的HTML]
	 * @return [type] [description]
	 */
	public function teamHtml($op = false){

		$field = array(
            //字段名/显示名称/能否修改/是否显示/宽度/类型/值
			array('id','ID',false,false,40),
			array('account_name','账号',false,false,50),
		    array('pay_method','存款方式',false,false),
		    array('amount','金额',false,false,40),
		    array('first_deal','初审',false,false,100),
		    array('second_deal','复审',false,false,100),
			array('status','状态',false,false,30),
		    array('reark','备注',false),
			array('createtime','时间',false,false,53),
		);

		if($op) $field[] = array('op','操作',false,false,30);
		$search = array(
			array('user_id','text','请输入用户ID'),
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
		if($params['rej']) $where['status <'] = 0;
		if($params['status']) $where['status'] = $params['status'];
		$page = $params['page'] ? $params['page'] : 1;
		$pageSize =  $params['rows'] ? $params['rows'] : 20;
		$start = ($page - 1) * $pageSize; 
		
		$limit = isset($params['export']) ? array() : array($start,$pageSize);

		$list = $this->selectByWhere($where,'*',$limit,array('id','desc'));
		
		if($params['status'] == 1){
			foreach ($list as $key => &$value) {
				$value['op']  = "<a  href='javascript:;' onclick='first_check({$value['id']})'> 初审 </a>";
			}
		}

		if($params['status'] == 2){
			foreach ($list as $key => &$value) {
				$value['op'] = "<a  href='javascript:;' onclick='sec_check({$value['id']})'> 复审 </a>";
			}
		}

		$count = $this->count($where);

		return array(
				'rows'=>$list,
				'total'=>ceil($count/$pageSize),
				'page'=>$page
			);
	}

	/*存审核*/
	/*状态 (1 申请中 2 一审成功 -2一审失败 3二审成功 -3二审失败)'*/
	public function verify($step,$params){
		//初审核
		$remark = $params['remark'];
		$status = $params['status'];
		$id = $params['id'];
		if($step == 1 && $status == 2)  $scene = 1; //一审成功  改变状态
		if($step == 1 && $status ==-2)  $scene = 2; //一审失败  改变状态
		if($step == 2 && $status == 3)  $scene = 3; //二审成功  改变状态 增加中心钱包金额
		if($step == 2 && $status ==-3)  $scene = 4; //二审失败  改变状态  
		if(!$scene) return array('status'=>false,'msg'=>'参数不对!');
		if(!$remark) return array('status'=>false,'msg'=>'请填写备注!');
		$this->load->model('transation');
		$this->load->model('admins');
		$order = $this->selectById($id);
		$user_id = $order['user_id'];
		$amount = $order['amount'];

		$admin_id = $this->admins->getLoginAdminId();
		$this->trans_begin();
		switch ($scene) {
			case 1:  //一审通过
				$deposit_data = array(
						'first_deal_adminid'=>$admin_id,
						'first_remark'=>$remark,
						'first_deal_time'=>date('Y-m-d H:i:s'),
						'status'=>$status
					);
				$this->update(array('id'=>$id),$deposit_data);
				break;
			case 2: //一审失败
				$deposit_data = array(
						'first_deal_adminid'=>$admin_id,
						'first_remark'=>$remark,
						'first_deal_time'=>date('Y-m-d H:i:s'),
						'status'=>$status
					);
				$this->update(array('id'=>$id),$deposit_data);
				# code...
				break;
			case 3: //二审通过
				$deposit_data = array(
						'second_deal_adminid'=>$admin_id,
						'second_remark'=>$remark,
						'second_deal_time'=>date('Y-m-d H:i:s'),
						'status'=>$status
					);
				$this->update(array('id'=>$id),$deposit_data);
				// $this->users->changeUserBalance($user_id,$amount,IN,DEPOSIT);
				$this->transation->changeMoney($user_id,FUND_DEPOSIT_SUCCESS,$amount,'',$remark);
				# code...
				break;
			case 4: //二审失败
				$deposit_data = array(
						'second_deal_adminid'=>$admin_id,
						'second_remark'=>$remark,
						'second_deal_time'=>date('Y-m-d H:i:s'),
						'status'=>$status
					);
				$this->update(array('id'=>$id),$deposit_data);
				# code...
				break;
			
		}
		$this->trans_commit();

		return array('status'=>true,'msg'=>'操作成功');
	}

	/**
	 * 
	 * @desc 统计符合记录的行数
	 * @return int
	 */
    public function total(int $iStatus) {
        $aCond = array();
        $aCond['status'] = $iStatus;
        return $this->count($aCond);
    }
}