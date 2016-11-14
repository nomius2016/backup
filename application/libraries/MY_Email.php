<?php

//include BASEPATH.'/libraries/Email.php';
/**
 * extends CI Email to realize single point login
 * 
 */
class MY_Email extends CI_Email {

	private $CI;
    private $_config;
    public function __construct(){
        parent::__construct();
        //获取配置
        $this->CI = &get_instance();
        $DB = $this->CI->db;
        $DB->select('*');
        $DB->where('email_list.status',2);
        $DB->from('email_list');
        $DB->join('email_type','email_list.type = email_type.id');
        $config = $DB->get()->row_array();
		if($config) $this->_config = $config;
    }


    public function sendemail($subject,$message,$to,$config = array()){
    	
    	// phpinfo();exit;
    	if(!$config && !$this->_config){
    		return array('status'=>false,'msg'=>'没有有效的邮箱配置!');
    	}

    	if(!$config) $config = $this->_config;

    	$c['protocol'] = $config['protocol'];  
        $c['smtp_host'] = $config['host'];  
        $c['smtp_user'] = $config['username'];  
        $c['smtp_pass'] = $config['password'];  
        $c['smtp_port'] = $config['port'];  
        $c['smtp_crypto'] = $config['crypto'];  
        $c['charset'] = 'utf-8';  
        $c['wordwrap'] = TRUE;  
        $c['mailtype'] = 'html';  
        // echo EMAIL_FROM;
        print_r($c);
        $this->initialize($c); 

        $this->from('519509954@qq.com', 'haha');  
        // $this->from(EMAIL_FROM, EMAIL_SHOW);  
        $this->to($to);  
        $this->subject($subject);  
        $this->message($message);  
        // $this->email->attach('application\controllers\1.jpeg');           //相对于index.php的路径  
        echo $this->send();  
echo $this->print_debugger(); 
	exit(1111);

    }

}
		