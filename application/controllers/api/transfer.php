<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class transfer extends Basecontroller {

	public function __construct(){
		parent::__construct();
		$this->load->model('users');
		$this->load->model('transation');
		$this->load->model('gaming_adapter');
	}

	/**
	 * [index 转账接口]
	 * 游戏ID,金额,转向
	 * @return [type] [description]
	 */
	public function index(){
	    
		if ($this->user_id>0) {
		    $p = $this->getApiParams();
		    if ($p['amount']>0) {
    		    $p['amount'] = intval($p['amount']*1000);
    		    
    		    $transfer_type_id = 0;
    		    if ($p['from']==10000) {
    		        $transfer_type_id = $p['to'];
    		        $p['io'] = OUT;
    		    } else {
    		        $transfer_type_id = $p['from'];
    		        $p['io'] = IN;
    		    }
    		    // 取得用户的余额 //
    		    $aUser = $this->users->getUserInfo($this->user_id);
    		    
    		    if ($p['from']!=10000 && $p['to']!=10000) {
    		        $ret = array('code' => -1015 );
    		    } else if (!($transfer_type_id>=100 && $transfer_type_id<200)) {
    		        $ret = array('code' => -1018 );
    		    } else if ($p['from']==10000 && $p['amount']>$aUser['balance']) {
    		        $ret = array('code' => -1019 );
    		    } else if ($p['from']==10000 && $p['amount']>$aUser['balance']) {
    		        throw new Exception('转出和转入目标有错误',10201);
    		    } else {
    		        try {
    		            $this->db->trans_begin();
    		            
    		            ////////////////////////////////////////////////////////////////////////////////////////
    		            // 形成交易码  //
    		            $orderNo = $this->transation->getTradeNo($this->user_id, $transfer_type_id);
    		            // 对中户中心钱包进行操作，写日志  , 这个方法里面已经回自己抛异常 //
                        // $this->transation->make($this->user_id, $transfer_type_id, $p['amount'], 0, 0, $orderNo);
    		            $this->transation->changeMoney($this->user_id, $transfer_type_id, $p['amount'], $p['io'], $orderNo);
    		            // 对游戏平台余额进行操作 //
    		            $trans_ret = $this->gaming_adapter->transfer($this->user_id, abs($p['amount']/1000), $transfer_type_id, $p['io'], $orderNo);
                        $this->gaming_adapter->getGameBanlance($this->user_id,$transfer_type_id);
    		            if (!$trans_ret['status']) {
    		                throw new Exception('第三平台操作失败',10200);
    		            }
    		            ////////////////////////////////////////////////////////////////////////////////////////
    		            
    		            $this->db->trans_commit();
    		            $ret = array('code' => 1);
		            } catch (Exception $e) {
		                $this->db->trans_rollback();
		                if ($e->getCode()>0) {
		                    $ret = array('code' => -2, 'f_error' => $e->getMessage() );
		                }
		            }
    		    }
		    } else {
		        $ret = array('code' => -1021 );
		    }
		} else {
			$ret = array('code' =>-1 );
		}
		$this->teamapi($ret);
	}
}

