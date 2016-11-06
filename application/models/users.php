<?php

/**
 * user
 */
class Users extends Base_Model{
	
	public function __construct() {
		$this->setTableName("users");
		parent::__construct ();
	}
	

	/**
	 * [teamHtml 生成前台模板需要的 js 以及 搜索用的HTML]
	 * @return [type] [description]
	 */
	public function teamHtml(){

		$field = array(
            //字段名/显示名称/能否修改/是否显示/宽度/类型/值
			array('id','U-ID',false,false,30),
			array('account_name','用户名'),
		    array('regiester_time','注册时间',false),
		    array('regiester_ip','注册IP',false),
		    array('parent_name','上级',false),
		    array('balance','余额',false),
		    array('total_deposit','总存款',false),
		    array('total_withdraw','总提款',false),
		    array('total_bet','总投注',false),
		    array('total_profit','平台盈利',false),
		    array('withdrawal_day_max','单日最大提款'),
		    array('withdrawal_min','最低提款'),
		    array('withdrawal_max','最高存款'),
			array('status','状态',true,false,30,'select',array('1'=>'激活','2'=>'冻结')),
		    array('last_login_time','最后登录时间',false),
		    array('last_login_ip','最后登录IP',false),
		    array('op','操作',false),
		);

		$search = array(
			array('account_name','text','请输入用户名'),
			array('name','text','请输入姓名')
		);
		$data = array();
		$data['export'] = true;
		$data['field'] = $field;
		$data['search'] = $search;
		// $data['add'] = true;
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
		if($params['account_name']) $where['account_name'] = $params['account_name'];
		if($params['name']) $where['name'] = $params['name'];

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
	 * [teamHtml 生成前台模板需要的 js 以及 搜索用的HTML]
	 * @return [type] [description]
	 */
	public function teamContactHtml(){

		$field = array(
                //字段名/显示名称/能否修改/是否显示/宽度/类型/值
			array('id','ID',false),
			array('account_name','用户名'),
			array('name','姓名'),
			array('phone','手机号码'),
			array('regiester_time','注册时间'),
		);

		$search = array(
			array('account_name','text','请输入用户名'),
			array('name','text','请输入姓名')
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
	 * [getLoginUserinfo 获取登录的用户信息]
	 * @return [type] [description]
	 */
	public function getLoginInfo(){
		return $this->session->all_userdata();
	}

	/**
	 * [loginUser 前台用户登录]
	 * @return [type] [description]
	 */
	public function loginUser($params){
		$account_name = trim($params['account_name']);
		$password = md5(trim($params['password']));
		$row = $this->selectByWhere(array('account_name'=>$account_name,'password'=>$password));
		if(!$row){
			return array('status'=>false,'msg'=>'用户名或密码不正确!');
		}
		
		//开始写COOKIE
		$row = $row['0'];
		$this->session->set_userdata($row);
		return array(
				'status'=>true,
				'msg'=>'登录成功!'
			);
	}
	
	/**
	 * @desc 取得用户名
	 * @param int $id
	 * @return String
	 */
	public function getAccountName($id) {
	    $row = $this->selectById($id);
	    return $row['account_name'];
	}

	/**
	 * [changeUserBalance 更新中心钱包金额 并且记录日志]
	 * @param  [type] $user_id [用户ID]
	 * @param  [type] $amount  [description]
	 * @param  [type] $io      [进/出]
	 * @param  [type] $type    [类型]
	 * @return [type]          [description]
	 */
	public function changeUserBalance($user_id,$amount,$io,$type){
		
		$amount = sprintf("%01.2f", $amount);
		//首先判断钱包金额是否足够
		//获取用户当前金额
		$userinfo = $this->selectById($user_id);
		
		if($userinfo['status'] != 2){
			return array('status'=>false,'msg'=>'用户状态不对!');
		}

		if($io === OUT){
			if($userinfo['balance'] < $amount){
				return array('status'=>false,'msg'=>'中心钱包金额不足!');
			}
		}

		$wirte_log = TRUE;
		$op = ($io === IN) ? '+' : '-';
		$this->trans_begin();
		//修改中心钱包金额
		switch ($type) {
			
			case BONUS: //添加红利
				$ret = $this->update_field_by_exp(array('id'=>$user_id),array('balance'=>"balance $op $amount"));
				break;
			case WITHDRAWAL_APPLY:  //提款申请
				//frozon_balance
				$ret = $this->update_field_by_exp(array('id'=>$user_id),array('balance'=>"balance - $amount",'frozon_balance'=>"frozon_balance + $amount"));
				break;
			case WITHDRAWAL_REFUSE:  //提款拒绝
				$ret = $this->update_field_by_exp(array('id'=>$user_id),array('balance'=>"balance + $amount",'frozon_balance'=>"frozon_balance - $amount"));
				break;
			case WITHDRAWAL_SUCCESS: //提款通过
				$ret = $this->update_field_by_exp(array('id'=>$user_id),array('frozon_balance'=>"frozon_balance - $amount"));
				$wirte_log = false;
				break;	
			case DEPOSIT: //存款通过
				$ret = $this->update_field_by_exp(array('id'=>$user_id),array('balance'=>"balance + $amount"));
				break;	
		}

		if($wirte_log){
			$userinfo_after = $this->selectById($user_id);
			//插入资金变动表
			$this->load->model('money_log');
			$this->money_log->insert(array(
					      'user_id'=>$user_id,'amount'=>$amount,'type'=>$type,'io'=>$io,
					      'createtime'=>date('Y-m-d H:i:s'),
					      'before_balance'=>$userinfo['balance'],
					      'after_balance'=>$userinfo_after['balance']
					      )
						);
		}
		$this->trans_commit();

		return array('status'=>true,'msg'=>'操作成功!');
	}


}