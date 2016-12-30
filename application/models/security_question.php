<?php

/**
 * user_deposit
 */
class Security_question extends Base_Model{
	
	public function __construct() {
		$this->setTableName('user_security_question');
		parent::__construct ();
	}
	
	
	public function getList() {
	    return $this->selectAll();
	}
	
	public function check(int $userid, $answer) {
	    $this->load->model('users');
	    $aProfile = $this->users->profile($userid);
	    if (trim($answer)==$aProfile['security_answer']) {
	        return true;
	    } else {
	        return false;
	    }
	}
	
}