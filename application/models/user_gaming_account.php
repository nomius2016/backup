<?php

/**
 * user_gaming_account
 */
class User_Gaming_Account extends Base_Model{
	
	public function __construct() {
		$this->setTableName("user_gaming_account");
		parent::__construct ();
	}

	/*检查指定平台的账号是否存在*/
	public function isexist($gaming_id,$user_id){
		
		$ret = $this->selectByCons(array('gaming_id'=>$gaming_id,'user_id'=>$user_id));

		return $ret ? true : false;
	}

}