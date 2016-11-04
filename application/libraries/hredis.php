<?php

if (! class_exists ( "Redis" )) exit ( 'No php-redis extension, please install it, visit http://pecl.php.net got it!' );
	
class HRedis extends Redis {
	
	private $CI;

	public function __construct() {
		$this->CI = &get_instance ();
		$this->CI->load->config ( 'redis' );
		$redis_config = $this->CI->config->item ( 'redis' );
		$host = $redis_config ['host'];
		$port = $redis_config ['port'];
		parent::connect ( $host, $port );
	}


    //参见  http://www.cnblogs.com/weafer/archive/2011/09/21/2184059.html
	//常用方法
	//setex 带生存时间的写入值
	//$redis->setex('key', 3600, 'value'); // sets key → value, with 1h TTL.
	// delete  删除指定key的值
	// 返回已经删除key的个数（长整数）
	// $redis->delete('key1', 'key2');
	// $redis->delete(array('key3', 'key4', 'key5'));

	// $redis->ttl('key1'); //得到一个key 的生存时间
	// $redis->mset(array('key0' => 'value0', 'key1' => 'value1')); //同时给多个key赋值

	// $redis->exists('key1'); //判断key是否存在。存在 true 不在 false

	// incr, incrBy
	// key中的值进行自增1，如果填写了第二个参数，者自增第二个参数所填的值
	// $redis->incr('key1');
	// $redis->incrBy('key1', 10);

	// decr, decrBy
	// 做减法，使用方法同incr

	// append
	// string，名称为key的string的值在后面加上value
	// $redis->set('key', 'value1');
	// $redis->append('key', 'value2');
	// $redis->get('key');
	// strlen
	// 得到key的string的长度
	// $redis->strlen('key');

}