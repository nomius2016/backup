<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Message extends Basecontroller {

	public function __construct(){
		parent::__construct();
		$this->load->model('user_messages');
	}
	
	public function get() {
	    $aRS = array();
	    $ret = array();
	    $ret['status'] = true;
	    $ret['code'] = 1;
	    $ret['msg'] = '获取成功';
	    
	    $g = $this->input->get();
	    
	    if (intval($g['type'])==0) {
	        $params['user_id'] = $this->user_id;
	    } else {
	        $params['user_id'] = 0;
	    }
	    
	    $aRS = $this->user_messages->getList($params);
	    $ret['result'] = $aRS;
	    $this->teamapi($ret);
	}
	
	public function detail() {
	    $aRS = array();
	    $ret = array();
	    if ($this->user_id>0){
	        $aMSG = $this->user_messages->detail(intval($this->input->get('id')));
	        $aRestrict = $this->users->restrict($this->user_id,'extra');
	        if ($aMSG['id']<1) {
	            $aRS = array('msg' => '记录不存在');
	        } else if (0 && $aMSG['user_id']!=$this->user_id) {
	            $aRS = array('msg' => '拒绝查看');
	        } else {
	            $ret['result'] = $aMSG;
	        }
	        $ret['status'] = true;
	        $ret['code'] = 1;
	        $ret['msg'] = '获取成功';
	    } else {
	        $ret['status'] = false;
	        $ret['code']   = -1;
	        $ret['msg']    = '登录状态丢失!';
	    }
	    $this->teamapi($ret);
	}

}