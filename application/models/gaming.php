<?php

/**
 * 游戏平台  
 * 状态 1 正常,2中心到平台,3平台到中心,4不能转账,5不能访问且不能转账
 */
class gaming extends Base_Model{
	
	public function __construct() {
		$this->setTableName("gaming");
		parent::__construct ();
	}

}