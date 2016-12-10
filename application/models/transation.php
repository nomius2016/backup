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
}