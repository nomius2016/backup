<?php

/**
 * Fund_transfer_log
 */
class Fund_transfer_type extends Base_Model {
    private $_types = array();
	
	public function __construct() {
		$this->setTableName("fund_transfer_type");
		parent::__construct ();
	}
	

    public function getType() {
        if (!$this->_types) {
            $_rs = $this->selectAll();
            foreach ((array)$_rs AS $V) {
                $this->_types[$V['type_id']] = $V['type_name'];
            }
        }
        return $this->_types;
    }


}