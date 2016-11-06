<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
|--------------------------------------------------------------------------
| File and Directory Modes
|--------------------------------------------------------------------------
|
| These prefs are used when checking and setting modes when working
| with the file system.  The defaults are fine on servers with proper
| security, but you may wish (or even need) to change the values in
| certain environments (Apache running a separate process for each
| user, PHP under CGI with Apache suEXEC, etc.).  Octal values should
| always be used to set the mode correctly.
|
*/
define('FILE_READ_MODE', 0644);
define('FILE_WRITE_MODE', 0666);
define('DIR_READ_MODE', 0755);
define('DIR_WRITE_MODE', 0777);

/*
|--------------------------------------------------------------------------
| File Stream Modes
|--------------------------------------------------------------------------
|
| These modes are used when working with fopen()/popen()
|
*/

define('FOPEN_READ',							'rb');
define('FOPEN_READ_WRITE',						'r+b');
define('FOPEN_WRITE_CREATE_DESTRUCTIVE',		'wb'); // truncates existing file data, use with care
define('FOPEN_READ_WRITE_CREATE_DESTRUCTIVE',	'w+b'); // truncates existing file data, use with care
define('FOPEN_WRITE_CREATE',					'ab');
define('FOPEN_READ_WRITE_CREATE',				'a+b');
define('FOPEN_WRITE_CREATE_STRICT',				'xb');
define('FOPEN_READ_WRITE_CREATE_STRICT',		'x+b');


//资金流进出
define('IN',1);   //中心钱包增加前  
define('OUT',-1); //中心钱包扣钱

//资金流类型常量定义  1 红利 2存款 3转入中心钱包  6 提款 7 转入平台
define('BONUS',1);   //红利
define('DEPOSIT',2); //存款
define('PTC',3);     //平台到中心钱包
//************中间的主要用来扩展************
define('WITHDRAWAL_APPLY',6);   //提款申请 (扣除中心钱包金额 增加冻结金额)
define('WITHDRAWAL_REFUSE',7);  //提款拒绝 (增加中心钱包金额 解冻金额) 
define('WITHDRAWAL_SUCCESS',8); //提款成功  解冻金额
define('PTC',9);        //转入平台


/* End of file constants.php */
/* Location: ./application/config/constants.php */