<?php

/**
 * admin_menu_authority
 */
class admin_menu_authority extends Base_Model{
	
	public function __construct() {
		$this->setTableName("admin_menu_authority");
		parent::__construct ();
	}
	
}