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
	    $aFileds_allow = array('name', 'sex', 'phone', 'email');
	    foreach ($aFields AS $f) {
	        if (!in_array($f, $aFileds_allow)) {
	            unset($aFields[$f]);
	        }
	    }
	    
	    return $this->update_field_by_exp(array('user_id' => $this->user_id), $aFields);
	}

}