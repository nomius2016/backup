<?php

/**
 * user_profile
 */
class User_Profile extends Base_Model{
	
	public function __construct() {
		$this->setTableName("user_profile");
		parent::__construct ();
	}
	
	public function getInfoByUserId($user_id){
		$row = $this->selectByWhere(array('user_id'=>$user_id));
		return $row ? $row['0'] : array();
	}
	
	public function set(array $aFields) {
	    $aFileds_allow = array('real_name', 'sex', 'phone', 'email', 'birthday');
	    $aFields2 = array();
	    foreach ($aFields AS $k => $v) {
	        if (in_array($k, $aFileds_allow)) {
	            $aFields2[$k] = $v;
	        }
	    }
	    
	    return $this->update(array('user_id' => $this->user_id), $aFields2);
	}

}