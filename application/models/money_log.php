<?php

/**
 * money_log  资金流水表
 */
class money_log extends Base_Model{
	
	public function __construct() {
		$this->setTableName("money_log");
		parent::__construct ();
	}

}