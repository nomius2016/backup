<?php

/**
 * user_profile
 */
class User_Profile extends Base_Model{
	
	public function __construct() {
		$this->setTableName("user_profile");
		parent::__construct ();
	}

}