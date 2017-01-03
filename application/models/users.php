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
			array('user_id','U-ID',false,false,30),
			array('account_name','用户名',false),
		    array('register_time','注册时间',false),
		    array('register_ip','注册IP',false),
		    array('parent_name','上级',false),
		    array('balance','余额',false),
		    array('total_deposit','总存款',false),
		    array('total_withdraw','总提款',false),
		    array('total_bet','总投注',false),
		    array('profit','平台盈利',false),
		    array('withdrawal_day_max','单日最大提款'),
		    array('withdrawal_min','最低提款'),
		    array('withdrawal_max','单笔最大提款'),
			array('status_text','状态',true,false,28),
		    array('last_login_time','最后登录时间',false),
		    array('last_login_ip','最后登录IP',false)
		);

		$search = array(
			array('account_name','text','请输入用户名'),
		    array('status','select',array(0 => '账号状态', 1 => '正常',2 => '冻结')),
		);
		$data = array();
		$data['export'] = false;
		$data['field']  = $field;
		$data['search'] = $search;
		// $data['add'] = true;
		// $data['del'] = true;
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
		if ($params['account_name']) {
		    $where['account_name'] = $params['account_name'];
		}
		if ($params['status']>0) {
		    $where['status'] = $params['status'];
		}
		$page = $params['page'] ? $params['page'] : 1;
		$pageSize =  $params['rows'] ? $params['rows'] : 20;
		$start = ($page - 1) * $pageSize; 
		
		$limit = isset($params['export']) ? array() : array($start,$pageSize);

		$list = $this->selectByWhere($where,'*',$limit,array('user_id','DESC'));
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
			array('user_id','ID',false),
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
	 * @desc 用户资料信息
	 * @param int $userid
	 * @return array
	 */
	public function profile(int $userid) {
	    return $this->db->from('user_profile')->where('user_id', $userid)->get()->row_array();
	}
	
	public function create_profile(int $userid) {
	    return $this->db->from('user_profile')->set('user_id',$userid)->insert();
	}

	/**
	 * @desc 用户转账提款等限制
	 * @param int $userid
	 * @return array
	 */
	public function restrict(int $userid,$field='') {
	    $aRestrict = $this->db->from('user_restrict')->where('user_id', $userid)->get()->row_array();
	    if (!$aRestrict['extra']) {
	        $aRestrict['extra'] = '[]';
	    }
	    $aRestrict['extra'] = json_decode($aRestrict['extra'],true);
	    return $field ? $aRestrict[$field] : $aRestrict;
	}
	
	public function set_restrict(int $userid, array $field) {
	    $affected_rows = $this->db->update ('user_restrict', $field, array('user_id' => $userid) );
	    return $affected_rows;
	}
	
	/**
	 * @desc 用户其他平台余额
	 * @param int $userid
	 * @param int $gamingid 其他游戏平台ID
	 * @return array or int
	 */
	public function balance(int $userid, $gamingid=0) {
	    $_balance = $this->db->where('user_id',$userid)->get('user_balance')->result_array();
	    $aBalance = array();
	    foreach ((array)$_balance AS $b) {
	        $aBalance[$b['gaming_id']] = $b['balance'];
	    }
	    return $gamingid>=100 ? $aBalance[$gamingid] : $aBalance;
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
		$account_name = trim($params['username']);
		$password = trim($params['password']);
		$row = $this->selectByWhere(array('account_name'=>$account_name,'password'=>$password));
		if(!$row){
			return array('code'=>-1014);
		}
		//更新最新一次登录时间
		$user = array();
		$user['last_login_ip']   = $this->getRequestIP();
		$user['last_login_time'] = date('Y-m-d H:i:s');
		$this->update(array('user_id'=>$row['0']['user_id']),$user);
		//开始写COOKIE
		$row = $row['0'];
		$this->session->set_userdata($row);
		$sessions = $this->getLoginInfo();
		return array(
				'code'=>1,
				'result'=>array(array(
					'Token'=>$sessions['session_id'],
					'LoginSuccess'=>1,
					'AuditStatus'=>'',
					'MainAccountType'=>"1",
					'last_login_ip'=>$row['last_login_ip'],
					'last_login_time'=>$row['last_login_time'],
				)),
			);
	}
	
	/**
	 * [register 用户注册]
	 * username,password,confirm_password,phone,agent_code
	 * @return [type] [description]
	 */
	public function register($params){
		$user = $user_profile = array();
		$user['account_name']  = trim($params['username']);
		$user['password']      = trim($params['password']);
		if($params['phone'])      $user_profile['phone'] = trim($params['phone']);
		if($params['agent_code']) $user['parent_id']     = trim($params['agent_code']);
		if(!($user['account_name']&&$user['password'])){
			return array(
					'code'=>-1015
				);
			;
		}

		if(strlen($user['password'])!==32){
			return array(
					'code'=>-1002,
				);
			;
		}

		if($this->getUserinfoByAccountName($user['account_name'])){
			return array(
					'code'=>-1016,
				);
			;
		}

		try {
			$this->trans_begin();
			//其他信息
			$user['register_ip']     = $this->getRequestIP();
			$user['register_time']   = date('Y-m-d H:i:s');
			$user['last_login_ip']   = $user['register_ip'];
			$user['last_login_time'] = $user['register_time'];
			$user['last_update_time']= $user['register_time'];
			$user['status'] = 1;
			$user_id = $this->insert($user);
			if($user_id && $user_profile){
				$this->load->model('user_profile');
				$return_id = $this->user_profile->update(array('user_id'=>$user_id),$user_profile);
				if(!$return_id){
					$this->trans_rollback();
					return array(
							'code'=>-3
						);
				}
			}

			$this->trans_commit();
			return array(
					'code'=>1
				);
		} catch (Exception $e) {
			$this->trans_rollback();
			return array(
					'code'=>-3
				);
		}

	}

	/**
	 * @desc 取得用户名
	 * @param int $id
	 * @return String
	 */
	public function getAccountName(int $userid) {
	    $row = $this->selectByCons(array('user_id' => $userid));
	    return $row['account_name'];
	}
	
	/**
	 * [getUserinfoByAccountName description]
	 * @param  [type] $account_name [description]
	 * @return [type]               [description]
	 */
	public function getUserinfoByAccountName($account_name){
		$row = $this->selectByCons(array('account_name' => $account_name));
	    return $row;
	}

	/**
	 * @desc 取得用户名
	 * @param int $id
	 * @return String
	 */
	public function getUserInfo(int $userid) {
	    $row = $this->selectByCons(array('user_id' => $userid));
	    return $row;
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

	public function isLogin(){
		
		$info = $this->session->all_userdata();
		if($info['account_name']){
			return true;
		}
		return false;

	}

}