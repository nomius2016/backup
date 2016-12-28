<?php

/**
 * user_balance
 */
class User_Balance extends Base_Model{
	
	public function __construct() {
		$this->setTableName("user_balance");
		parent::__construct ();
	}
	
}