<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Message extends Basecontroller {

	public function __construct(){
		parent::__construct();
		$this->load->model('user_messages');
	}
	
	public function get() {
	    $aRS = array();
	    $ret = array();
	    $ret['code'] = 1;
	    
	    $g =  $this->getApiParams();
	    
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
	        $p = $this->getApiParams();
	        $aMSG = $this->user_messages->detail(intval($p['id']));
	        if ($aMSG['id']<1) {
	            $aRS = array('msg' => '记录不存在');
	        } else if (0 && $aMSG['user_id']!=$this->user_id) {
	            $aRS = array('msg' => '拒绝查看');
	        } else {
	            $ret['result'] = $aMSG;
	        }
	        $ret['code'] = 1;
	    } else {
	        $ret['code']   = -1;
	    }
	    $this->teamapi($ret);
	}

}