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

}