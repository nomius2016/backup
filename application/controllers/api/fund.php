<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Fund extends Basecontroller {
    
    public function __construct(){
        parent::__construct();
    }
    
    public function log() {
        $aCond = array();
        $aCond['user_id'] = $this->user_id;
         
        $params = $this->getApiParams();
        
        $ret = array();
        if ($this->user_id>0){
            $aCond = array_merge($aCond,(array)$params);
            
            $this->load->model('fund_transfer_log','fund');
            $this->load->model('fund_transfer_type');
            
            $aType = $this->fund_transfer_type->getType();

            $aList = $this->fund->getList($aCond);
            foreach ($aList['rows'] AS $k => &$v) {
                $v['op_user_name']       = $v['user_id']>0 ? $this->getAdminName($v['user_id']) : '自己';
                $v['fund_transfer_type'] = $aType[$v['transfer_type_id']];
                $v['dateline']           = date('Y-m-d H:i:s',$v['dateline']);
                $v['status']             = $v['status']==1 ? '完成' : '未完成';
                $v['before_balance']     = $this->f($v['before_balance']);
                $v['amount']             = $this->f($v['amount']);
                $v['amount']             = $v['amount']<0 ? '<span style="color:red">'.$v['amount'].'</span>' : $v['amount'];
                $v['after_balance']      = $this->f($v['after_balance']);
            }
             
            $ret['status'] = true;
            $ret['code'] = 1;
            $ret['msg'] = '获取成功';
            $ret['result'] = $aList;
        } else {
            $ret['status'] = false;
            $ret['code']   = -1;
            $ret['msg']    = '登录状态丢失!';
        }
        $this->teamapi($ret);
    }
    
    public function transfer() {
        $aCond = array();
        $aCond['user_id'] = $this->user_id;
         
        $params = $this->getApiParams();
        
        $ret = array();
        if ($this->user_id>0){
            $this->load->model('transation');
            $aRS = array();
            $aRS['err_no'] = 0;
            $aRS['err_msg'] = '';
            try {
                $this->db->trans_begin();
                
                $aStatus = $this->transation->make($this->user_id,100,$p['amount']*1000,0,0,$p['remark']);
                $aRS['balance'] = $this->f($aStatus['balance']);
                $aRS['balance_locked'] = $this->f($aStatus['balance_locked']);
                
                $this->db->trans_commit();
            } catch (Exception $e) {
                $this->db->trans_rollback();
                $aRS['err_no'] = $e->getCode();
                $aRS['err_msg'] = $e->getMessage();
            }
             
            $ret['status'] = true;
            $ret['code'] = 1;
            $ret['msg'] = '获取成功';
            $ret['result'] = $aRS;
        } else {
            $ret['status'] = false;
            $ret['code']   = -1;
            $ret['msg']    = '登录状态丢失!';
        }
        $this->teamapi($ret);
    }
}