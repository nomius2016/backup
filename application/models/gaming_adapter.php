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
			return $this->gaming_api->ctp($user_id,$amount,$orderNo);
		}else{
			return $this->gaming_api->ptc($user_id,$amount,$orderNo);
		}
	}

	
	protected function init(){
		$game = $this->getGames($this->gaming_id);
		$code = $game['code'];
		$file = strtolower('gaming_'.$code);
		$this->load->model($file);
		$this->gaming_api = $this->$file;
	}

	/**
	 * [getGameUrl 获取游戏的URL]
	 * @param  [type] $user_id   [description]
	 * @param  [type] $gaming_id [description]
	 * @return [type]            [description]
	 */
	public function getGameUrl($user_id,$gaming_id){
		$this->gaming_id = $gaming_id;
		$this->init();
		return $this->gaming_api->getUrl($user_id);
	}

	/**
	 * [getGameBanlance 获取平台的余额]
	 * @param  [type] $user_id   [description]
	 * @param  [type] $gaming_id [description]
	 * @return [type]            [description]
	 */
	public function getGameBanlance($user_id,$gaming_id){
		$this->gaming_id = $gaming_id;
		$this->init();
		$ret = $this->gaming_api->getBalance($user_id);
		
		if($ret['status']){
			$this->load->model('user_balance');
			$data = array('user_id'=>$user_id,'gaming_id'=>$gaming_id,'balance'=>$ret['balance'] * 1000,'last_update_time'=>date('Y-m-d H:i:s'));
			$this->user_balance->replace($data);
		}

		return $ret;

	}

	/**
	 * [getTransferStatus 获取转账订单的状态]
	 * @param  [type] $orderNo   [description]
	 * @param  [type] $gaming_id [description]
	 * @return [type]            [description]
	 */
	public function getTransferStatus($orderNo,$gaming_id){
		$this->gaming_id = $gaming_id;
		$this->init();
		return $this->gaming_api->getTransterStatus(array('orderNo'=>$orderNo));
	}

}