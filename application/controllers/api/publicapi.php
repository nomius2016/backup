<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class publicapi extends Basecontroller {

	public function __construct(){
		parent::__construct();
	}

	/**
	 * [getmaingames 获取当前所有的游戏]
	 * @return [type] [description]
	 */
	public function getmaingames(){
		$redis_key = 'publicapi_getmaingames';
		$tmp_data = $this->hredis->get($redis_key);
		$ret['status'] = true;
		$ret['code'] = 1;
		$ret['msg'] = '返回成功';
		if($tmp_data && 0){
			$ret['result'] = json_decode($tmp_data,true);
		} else {
			$this->load->model('users');
			$games = $this->users->getGames();
			
			$aBalance = $this->users->balance($this->user_id);
			
			$data = array();
			foreach ($games as $game) {
			    $game['balance'] = $this->f(intval($aBalance[$game['gaming_id']]));
				$data[] = $game;
			}
			$ret['result'] = $data;
			$this->hredis->setex($redis_key,86400,json_encode($data));
		}

		$this->teamapi($ret);
	}

}

