<?php
class Transation extends CI_Model {
    // 这里列出所有的事务类型，防止提价无效数据 //
    protected $allTransationType = array();
    // 做减法的类型 //
    protected $decTransationType = array();
	
	public function __construct() {
		parent::__construct ();
	}
	
	/**
	 * @desc 进行全站金额操作封装，为了数据的准确性，必须在事务处理内部使用
	 * @param int $userid
	 * @param int $typeid
	 * @param int $amount
	 * @param int $relationid 关系到那个业务的ID，可以是投注id，提款id，存款id，红利id等等。。。。
	 * @param int $opuserid  是谁操作的，如果>0表示由管理员进行操作
	 * @param string $remark 备注
	 * @throws Exception
	 * @return boolean
	 * @example // 用户充值5000块钱
	 * try {
	 *     $this->db->trans_begin();
	 *     // 先进常规的业务逻辑,业务逻辑完成以后到改变用户余额哪一步开始代用事务 
	 *     $depositid = $this->fund_deposit->insert($array);
	 *     if ($depositid<1) {
	 *         throw new Exception('插入失败，报异常，必须抛出异常！！！！！！！！！！！！');
	 *     } 
	 *     //////////////////////////////
	 *     $this->stransation->make($userid,1,5000*1000,$depositid,$userid,'支付宝充值');
	 *     //////////////////////////////
	 *     $this->db->trans_commit();
	 * } catch (Exception $e) {
	 *     $this->db->trans_rollback ();
	 * }
	 */
	public function make(int $userid, int $typeid, int $amount, $relationid=0, $opuserid=0, $remark='') {
	    // 先保证事务类型是有效的  //
	    if (!$this->isValid($typeid)) {
	        throw new Exception('invalid transation type',10001);
	    } else if (abs($amount)<1) {
	        throw new Exception('invalid amount value',10002);
	    } else {
	        // 检查有没有传错userid //
	        $this->load->model('users');
	        $aUser = $this->users->getUserInfo($userid);
	        if ($aUser['user_id']>0) {
	            $aCond  = array();
	            $aField = array();
	            $status = 1;
	            $aCond['user_id'] = $userid;
	            if ($this->income($typeid)) {
	                if ($amount<0) {
	                    // 在加钱操作中如果加负的钱，其实上是进行减钱,需要判断钱包的钱大于等于操作数额 //
	                    $aCond['balance >='] = $amount*-1;
	                }
	                // 加法运算不需要判定balance值 //
	                $this->db->set('balance',"balance+{$amount}",false)->where($aCond)->update('users');
	                $newbalance = $aUser['balance']+$amount;
	            } else {
	                if ($amount>0) {
    	                // 如果是做减法，必须保证被减少的值大于等于造作值  //
    	                if ($typeid==2 || $typeid==10) {
    	                    $this->db->set('balance_locked',"balance_locked+{$amount}",false);
    	                    $aUser['balance_locked'] = $aUser['balance_locked']+$amount;
    	                }
    	                $aCond['balance >='] = $amount;
	                } else {
	                    // $typeid==2和10都是对钱包进行减钱，对锁定金额进行加钱的操作，当锁定金额中加负数的时候，实际上是在对其进行减钱，需要判断锁定余额的钱大于等于操作数额 //
	                    if ($typeid==2 || $typeid==10) {
	                        $this->db->set('balance_locked',"balance_locked+{$amount}",false);
	                        $aCond['balance_locked >='] = $amount*-1;
	                        $aUser['balance_locked'] = $aUser['balance_locked']+$amount;
	                    }
	                }
	                $this->db->set('balance',"balance-{$amount}",false)->where($aCond)->update('users');
	                $newbalance = $aUser['balance']-$amount;
	            }
	            // 如果更新成功，开始记录账变日志 //
	            if ($this->db->affected_rows()>0) {
	                $aField = array();
	                $aField['user_id']          = $userid;
	                $aField['parent_id']        = $aUser['parent_id'];
	                $aField['parent_path']      = $aUser['parent_path'];
	                $aField['transfer_type_id'] = $typeid;
	                $aField['income']           = $this->income($typeid);
	                $aField['before_balance']   = $aUser['balance'];
	                $aField['amount']           = $amount;
	                $aField['after_balance']    = $newbalance;
	                $aField['op_user_id']       = $opuserid;
	                $aField['relation_id']      = $relationid;
	                $aField['remark']           = $remark;
	                $aField['status']           = $status;
	                $aField['dateline']         = time();
	                $this->db->set($aField)->insert('fund_transfer_log');
	            } else {
	                throw new Exception('failed to update user balance',10003);
	            }
	        } else {
	            throw new Exception('have not userid='.$userid,10004);
	        }
	    }
	    return array(
	        'balance' => $newbalance,
	        'balance_locked' => $aUser['balance_locked']
	    );
	}


	/**
	 * [changeMoney 更改用户资金]
	 * @param  [type] $user_id [用户ID]
	 * @param  [type] $amount  [金额 / 只能正数  此处金额 需要传入已经倍乘过以后的金额(*1000)]
	 * @param  [type] $io      [资金进出  IN(中心钱包+) / OUT(中心钱包-) /INOUT(无变化) ]
	 * @param  [type] $type    [类型]
	 * @param  [type] $remark  [备注]
	 * @return [type]          [description]
	 */
	public function changeMoney($user_id,$type,$amount,$io,$remark=''){

		$user_id = intval($user_id);
		$amount  = intval($amount);
		
		if($user_id<=0){
			throw new Exception('用户ID不符合规范',10001);
		}

		if($amount<=0){
			throw new Exception('金额不符合规范',10002);
		}
		$this->load->model('users');
		$this->load->model('fund_transfer_log');
		$userinfo = $this->users->getUserInfo($user_id);
		$fund = array();

		try {
				switch ($type) {   //快捷变量适配区
			
				case FUND_DEPOSIT_SUCCESS:  //成功存款 -->增加balance
					$affected_rows = $this->users->update_field_by_exp(array('user_id'=>$user_id),array('balance'=>"balance + $amount"));
					$fund[] = array('transfer_type_id'=>1,'amount'=>$amount,'before_balance'=>$userinfo['balance'],'after_balance'=>$userinfo['balance']+$amount,'income'=>1);
					break;
				
				case FUND_WITHDRAW_APPLY:   //提款申请 --> 冻结金额 ,插入一条提款数据 一条解冻数据
					$affected_rows = $this->users->update_field_by_exp(array('user_id'=>$user_id,'balance >='=>$amount),array('balance'=>"balance - $amount",'balance_locked'=>"balance_locked + $amount"));
					$fund[] = array('transfer_type_id'=>2,'amount'=>$amount,'before_balance'=>$userinfo['balance'],'after_balance'=>$userinfo['balance'],'income'=>0);
					$fund[] = array('transfer_type_id'=>10,'amount'=>$amount*(-1),'before_balance'=>$userinfo['balance'],'after_balance'=>$userinfo['balance']-$amount,'income'=>-1);
					break;
				case FUND_WITHDRAW_REFUSE:  //提款拒绝 --> 解冻金额 ,插入一条提款数据 一条解冻数据
					$affected_rows = $this->users->update_field_by_exp(array('user_id'=>$user_id,'balance_locked >='=>$amount),array('balance'=>"balance + $amount",'balance_locked'=>"balance_locked - $amount"));
					$fund[] = array('transfer_type_id'=>2,'amount'=>$amount*(-1),'before_balance'=>$userinfo['balance'],'after_balance'=>$userinfo['balance'],'income'=>0);
					$fund[] = array('transfer_type_id'=>10,'amount'=>$amount,'before_balance'=>$userinfo['balance'],'after_balance'=>$userinfo['balance']+$amount,'income'=>1);
					break;
				case FUND_WITHDRAW_SUCCESS: //提款通过  -->解冻金额 
					$affected_rows = $this->users->update_field_by_exp(array('user_id'=>$user_id,'balance_locked >='=>$amount),array('balance_locked'=>"balance_locked - $amount"));
					break;
				
				case 100:   //AG转账
				case 101:   //沙巴转账
				case 102:   //PT转账
				case 103:   //EA转账
				case 104:   //BBIN转账
				case 105:   //HG转账
				case 106:   //OPUS转账
				case 107:   //MG转账
				case 108:   //GD转账
				case 109:   //EG转账
				case 110:   //皇冠体育转账
					if($io == IN){
						$affected_rows = $this->users->update_field_by_exp(array('user_id'=>$user_id),array('balance'=>"balance + $amount"));
						$fund[] = array('transfer_type_id'=>$type,'amount'=>$amount,'before_balance'=>$userinfo['balance'],'after_balance'=>$userinfo['balance']+$amount,'income'=>1);
					}else{
						$affected_rows = $this->users->update_field_by_exp(array('user_id'=>$user_id,'balance >='=>$amount),array('balance'=>"balance - $amount"));
						$fund[] = array('transfer_type_id'=>$type,'amount'=>$amount,'before_balance'=>$userinfo['balance'],'after_balance'=>$userinfo['balance'] - $amount,'income'=>-1);
					}
					break;
			}

			if(!$affected_rows){
				throw new Exception('更新用户表失败',10004);
			}

			//插入资金变动记录表
			if($fund){
				$data = array();
				foreach ($fund as $key => $value) {
					$aField = array();
	                $aField['user_id']          = $user_id;
	                $aField['parent_id']        = $userinfo['parent_id'];
	                $aField['parent_path']      = $userinfo['parent_path'];
	                $aField['transfer_type_id'] = $value['transfer_type_id'];
	                $aField['income']           = $value['income'];
	                $aField['before_balance']   = $value['before_balance'];
	                $aField['amount']           = $value['amount'];
	                $aField['after_balance']    = $value['after_balance'];
	                $aField['remark']           = $remark;
	                $aField['status']           = 1;
	                $aField['dateline']         = time();
	                $data[] = $aField;
				}
				$rows = $this->fund_transfer_log->insert_batch($data);

				if(!$rows){
					throw new Exception('插入资金明细表失败',10003);
				}
			}
			$userinfo = $this->users->getUserInfo($user_id);
			return array(
			        'balance' => $userinfo['balance'],
			        'balance_locked' => $userinfo['balance_locked']
			    );

		} catch (Exception $e) {
			throw new Exception('操作失败',10005);
		}

	}





	
	/**
	 * @desc 根据类型判断是否为有效事务请求
	 * @param int $typeid
	 * @return boolean
	 */
	private function isValid(int $typeid) {
	    $this->getAllTransferType();
	    return array_key_exists($typeid, $this->allTransationType);
	}
	
	/**
	 * @desc 根据类型判断是否做减法操作
	 * @param int $typeid
	 * @return boolean
	 */
	private function income(int $typeid) {
	    $this->getAllTransferType();
	    return $this->allTransationType[$typeid]['income'];
	}
	
	/**
	 * @desc 得到被定义的事务类型，
	 */
	private function getAllTransferType() {
	    if (!$this->allTransationType) {
	        $_type = $this->db->get('fund_transfer_type')->result_array();
	        foreach ((array)$_type AS $t) {
	            $this->allTransationType[$t['type_id']] = $t;
	        }
	    }
	}
	
	
	public function getTradeNo(int $account_id, int $gaming_id){
		if ($gaming_id == SB_GAMING_ID) {
			$orderNo = date('YmdHis').rand(10000,99999);
		} else {
			$dt = new DateTime('NOW');
			$time8 = dechex($dt->format('U'));// 8bit
			$user6 = sprintf("%08s", substr(dechex($account_id), 0,8)); // 8bit
			$fs = explode('.', microtime(true));
			$fsend = end($fs);
			$haomiao4 =sprintf("%04d", $fsend);// 4bit
			$orderNo = substr($user6.$time8.$haomiao4, 0, 20);
		}
		return $orderNo;
	}
}