<?php
/**
 * gaming_adapter
 * 平台调度器
 */
class gaming_adapter extends Base_Model{
	

	protected $gaming_api;
	protected $gaming_id;
	public function __construct() {
		$this->setTableName("user_gaming_account");
		parent::__construct ();
	}
	
	/**
	 * [transter 转账接口]
	 * @param  [type] $amount    [description]
	 * @param  [type] $gaming_id [description]
	 * @param  [type] $io        [description]
	 * @return [type]            [description]
	 */
	public function transfer($user_id,$amount,$gaming_id,$io,$orderNo=''){

		$this->gaming_id = $gaming_id;
		$this->init();
		if($io === CTP){
			return $this->gaming_api->ctp($user_id,$amount);
		}else{
			return $this->gaming_api->ptc($user_id,$amount);
		}
	}

	
	protected function init(){
		$game = $this->getGames($this->gaming_id);
		$code = $game['code'];
		$file = strtolower('gaming_'.$code);
		$this->load->model($file);
		$this->gaming_api = $this->$file;
	}


}