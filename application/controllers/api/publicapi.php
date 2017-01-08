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
		
		$ret = array();
		if(!$this->user_id){
			$ret['code'] = -1;
			$this->teamapi($ret);
		}

		$ret['code'] = 1;

		$this->load->model('users');
		$games = $this->users->getGames();
		$aBalance = $this->users->balance($this->user_id);
		$userInfo = $this->users->getUserInfo($this->user_id);

		$data = array();
		$data[] = array(
				'gaming_id'=> 10000,
				'code'=>'CENTER',
				'name'=>'主账户',
				'status'=>1, 
				'balance'=>$this->f($userInfo['balance'])
			);
		foreach ($games as $game) {
		    $game['balance'] = $this->f(intval($aBalance[$game['gaming_id']]));
			$data[] = $game;
		}


		$ret['result'] = $data;

		$this->teamapi($ret);
	}

	/**
	 * [getpromotions 获取优惠活动]
	 * @return [type] [description]
	 */
	public function getpromotions(){
		
		$this->load->model('activity');
		$where = array(
				'status'=>1,
				'end_time >='=>date('Y-m-d H:i:s'),
				'start_time <='=>date('Y-m-d H:i:s'),
			);
		$list = $this->activity->selectByWhere($where,'*',$limit,array('id','DESC'));
		$ret['code']   = $list ? 1 : 1001;
		$ret['result'] = $list;
		$this->teamapi($ret);
	}

	/**
	 * [get_system_config 获取后台配置]
	 * @return [type] [description]
	 */
	public function get_system_config(){

		$redis_key = 'publicapi_system_config';;
		$cache = $this->hredis->get($redis_key);
		
		if($cache){
			$cache = json_decode($cache,TRUE);
			$ret['code'] = 1;
			$ret['result'] = $cache;
			$this->teamapi($ret);
		}

		$this->load->model('system_setting');
		$data = $this->system_setting->selectByWhere(array('type'=>-1),'variable,content');
		$data_json = json_encode($data);
		$this->hredis->setex($redis_key,86400,$data_json);
		$ret['code'] = 1;
		$ret['result'] = $data;
		$this->teamapi($ret);
	}

}

