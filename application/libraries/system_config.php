<?php

	/**
	 * 初始各个基础配置
	 */
	class system_config{

		private $CI;
		private $_table;
		public function __construct(){
			$this->CI = &get_instance();
			$this->_table = 'system_setting';
		}

		/**
		 * [get description]
		 * @param  [type] $key [根据键值冲redis获取值]
		 * @return [type]      [description]
		 */
		public function get($key){
			$t = $this->CI->hredis->get($key);
			if(!$t){
				//从数据库里面获取
				$w = array(
					'variable'=>$key
				);
				$this->CI->db->where($w);
				$query = $this->CI->db->get($this->_table);
				$row = $query->row();
				if(!$row) return false;
				$this->CI->hredis->setex($key,$row->ttl,$row->content);
				return $row->content;
			}else{
				return $t;
			}
		}

		/**
		 * [del description]
		 * @param  [type] $key [根据键值从redis里面销毁]
		 * @return [type]      [description]
		 */
		public function del($key){
			$this->CI->hredis->del($key);
		}


	}	
