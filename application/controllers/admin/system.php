<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class System extends Basecontroller {

	public function __construct(){
		parent::__construct();
	}

	public function index()
	{	
		$this->load->view('welcome_message');
	}

	/**
	 * [menu 后台菜单配置]
	 * @return [type] [description]
	 */
	public function menu(){
		
		$this->load->model('admin_menu');
		if(!isset($_GET['getdata'])){
			$ret = $this->admin_menu->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('hplus_normal',$ret);
			return;
		}
		
		$params = $this->input->get();
		$ret = $this->admin_menu->getList($params);
		if($params['export']){
			if($ret['rows']){
				$this->load->library ( "phpexcel/bomaexcel");
				$this->bomaexcel->output($ret['rows'],array('ID','菜单名称','等级','父级ID','排序','控制器','行为器'),'admin_menu',
														array('id','title','level','parent_id','display_sort','controller','action'));
				exit;
			}else{
				echo '<script>';
				echo "alert('数据为空');";
				echo "window.history.go(-1)";
				echo '</script>';
				exit;
			}		
		}

		echo json_encode($ret);
		exit;

	}

	/**
	 * [menu_op 后台菜单配置操作权限]
	 * @return [type] [description]
	 */
	public function menu_op(){

		$op = $_POST['oper'];
		$this->load->model('admin_menu');
		switch ($op) {
			case 'add':  //添加菜单
				$data = array('level'=>$_POST['level'],'parent_id'=>$_POST['parent_id'],'title'=>$_POST['title'],'type'=>$_POST['type'],
					          'display_sort'=>$_POST['display_sort'],'controller'=>$_POST['controller'],'action'=>$_POST['action']);
				$status = $this->admin_menu->insert($data);
				break;
			case 'edit': //修改菜单
				$status = $this->admin_menu->update(array('id'=>$_POST['id']),
												array(
													'title'=>$_POST['title'],
													'type'=>$_POST['type'],
													'parent_id'=>$_POST['parent_id'],
													'level'=>$_POST['level'],
													'display_sort'=>$_POST['display_sort'],
													'controller'=>$_POST['controller'],
													'action'=>$_POST['action'],
												)
											);
				break;
			case 'del':  //删除一个菜单
				$status = $this->admin_menu->delete(array('id'=>$_POST['id']));
				# code...
				break;
		}

		if($status){
			exit(json_encode(array('status'=>true,'msg'=>'操作成功')));
		}else{
			exit(json_encode(array('status'=>false,'msg'=>'操作失败')));
		}

	}

	/**
	 * [admin_list 管理员列表]
	 * @return [type] [description]
	 */
	public function admin_list(){

		$this->load->model('admins');
		$this->load->model('admin_group');
		if(!isset($_GET['getdata'])){
			$ret = $this->admins->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('hplus_normal',$ret);
			return;
		}
		
		$params = $this->input->get();
		$ret = $this->admins->getList($params);
		$_list = $ret['rows'];
		foreach ((array)$_list AS $k => $v) {
		    $v['group_name']    = $this->admin_group->getGroupName($v['group_id']);
		    $v['op_admin_name'] = $this->getAdminName($v['create_admin_id']);
		    $v['status_text']        = $v['status']==1 ? '正常' : '冻结';
		    $ret['rows'][$k]    = $v;
		}
		echo json_encode($ret);
		exit;

	}

	/**
	 * [admin_list_op 管理员列表操作权限]
	 * @return [type] [description]
	 */
	public function admin_list_op(){


		$op = $_POST['oper'];
		$this->load->model('admins');
		switch ($op) {
			case 'add':  //添加一个组别
				$userinfo = $this->admins->getLoginInfo();
				$data = array('name'=>$_POST['name'],'username'=>$_POST['username'],'group_id'=>$_POST['group_id'],'password'=>md5($_POST['password']),
					          'email'=>$_POST['email'],'create_admin_id'=>$userinfo['id'],'create_time'=>date('Y-m-d H:i:s'));
				$status = $this->admins->insert($data);
				break;
			case 'edit': //修改组别
				$update_date = array(
										'name'=>$_POST['name'],
										'username'=>$_POST['username'],
										'group_id'=>$_POST['group_id'],
										'email'=>$_POST['email'],
									);
				$status = $this->admins->update(array('id'=>$_POST['id']),$update_date);
												
											
				break;
			case 'del':  //删除一个组
				$status = $this->admins->delete(array('id'=>$_POST['id']));
				# code...
				break;
		}

		if($status){
			exit(json_encode(array('status'=>true,'msg'=>'操作成功')));
		}else{
			exit(json_encode(array('status'=>false,'msg'=>'操作失败')));
		}	
	}
	
	/**
	 * [admin_group 组别管理]
	 * @return [type] [description]
	 */
	public function admin_group(){
		$this->load->model('admin_group');
		if(!isset($_GET['getdata'])){
			$ret = $this->admin_group->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('hplus_normal',$ret);
			return;
		}
		
		$params = $this->input->get();
		$ret = $this->admin_group->getList($params);
		$_list = $ret['rows'];
		foreach ((array)$_list AS $k => $v) {
		    $v['op'] = "<a href=\"/admin/system/admin_auth?group_id={$v['id']}\"  class=\"cof\">权限分配</a>";
		    $ret['rows'][$k] = $v;
		}
		echo json_encode($ret);
		exit;
	}


	/**
	 * [admin_group_op 组别管理操作权限]
	 * @return [type] [description]
	 */
	public function admin_group_op(){

		$op = $_POST['oper'];
		$this->load->model('admin_group');
		switch ($op) {
			case 'add':  //添加一个组别
				$data = array('group_name'=>$_POST['group_name'],'display_sort'=>$_POST['display_sort']);
				$status = $this->admin_group->insert($data);
				break;
			case 'edit': //修改组别
				$status = $this->admin_group->update(array('id'=>$_POST['id']),
												array(
													'group_name'=>$_POST['group_name'],
													'display_sort'=>$_POST['display_sort']
												)
											);
				break;
			case 'del':  //删除一个组
				$status = $this->admin_group->delete(array('id'=>$_POST['id']));
				# code...
				break;
		}

		if($status){
			exit(json_encode(array('status'=>true,'msg'=>'操作成功')));
		}else{
			exit(json_encode(array('status'=>false,'msg'=>'操作失败')));
		}	

	}

	/**
	 * [email_list 邮箱列表]
	 * @return [type] [description]
	 */            
	public function email_list(){

		$this->load->model('email_list');
		if(!isset($_GET['getdata'])){
			$ret = $this->email_list->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('hplus_normal',$ret);
			return;
		}
		
		$params = $this->input->get();
		$ret = $this->email_list->getList($params);
		echo json_encode($ret);
		exit;
	}

		/**
	 * [admin_group_op 邮箱列表操作权限]
	 * @return [type] [description]
	 */
	public function email_list_op(){

		$op = $_POST['oper'];
		$this->load->model('email_list');
		switch ($op) {
			case 'add':  //添加一个组别
				$data = array('username'=>$_POST['username'],'password'=>$_POST['password'],'type'=>$_POST['type'],'status'=>$_POST['status'],'createtime'=>date('Y-m-d H:i:s'),'admin_id'=>0);
				$status = $this->email_list->insert($data);
				break;
			case 'edit': //修改组别
				$status = $this->email_list->update(array('id'=>$_POST['id']),
												array(
													'username'=>$_POST['username'],
													'password'=>$_POST['password'],
													'type'=>$_POST['type'],
													'status'=>$_POST['status'],
												)
											);
				break;
			case 'del':  //删除一个组
				$status = $this->email_list->delete(array('id'=>$_POST['id']));
				# code...
				break;
		}

		if($status){
			exit(json_encode(array('status'=>true,'msg'=>'操作成功')));
		}else{
			exit(json_encode(array('status'=>false,'msg'=>'操作失败')));
		}	

	}



	/**
	 * [admin_auth 权限管理]
	 * @return [type] [description]
	 */
	public function admin_auth(){
		//获取多有的菜单
		$this->load->model('admin_menu');
		$menu_html = $this->admin_menu->getAuthPageHtml();
		$ext_menu = $this->admin_menu->getExtPageHtml();
		//获取所有的组
		$this->load->model('admin_group');
		$groups = $this->admin_group->selectAll();
		$cur_group_id = $this->input->get('group_id') ? $this->input->get('group_id') : 1;

		$this->adminview('admin_auth',array('menu_html'=>$menu_html,'groups'=>$groups,'cur_group_id'=>$cur_group_id,'ext_menu'=>$ext_menu));
		return;
	}

		/**
	 * [admin_auth 权限管理]
	 * @return [type] [description]
	 */
	public function admin_auth_formop(){
		
		$group_id = $this->input->post('group');
		$post_data = $this->input->post();
		unset($post_data['group']);
		$data = array();
		foreach ($post_data as $key => $value) {
			$k = str_replace('_auth_op', '', $key);
			$data[$k] = $value;
		}
		$this->load->model('admin_menu_auth');
		$ret = $this->admin_menu_auth->updateGroupAuth($group_id,$data);
		header("Location: /admin/system/admin_auth?group_id={$group_id}");
	}

	/**
	 * [menu_auth 菜单操作权限管理]
	 * @return [type] [description]
	 */
	// public function menu_auth(){

	// 	$this->load->model('admin_menu_actions');
	// 	if(!isset($_GET['getdata'])){
	// 		$ret = $this->admin_menu_actions->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
	// 		$this->adminview('hplus_normal',$ret);
	// 		return;
	// 	}
		
	// 	$params = $this->input->get();
	// 	$ret = $this->admin_menu_actions->getList($params);
	// 	echo json_encode($ret);
	// 	exit;
	// }

	/**
	 * [menu_auth_op 菜单授权管理 操作权限]
	 * @return [type] [description]
	 */
	// public function menu_auth_op(){
	// 	$op = $_POST['oper'];
	// 	$this->load->model('admin_menu_actions');
	// 	switch ($op) {
	// 		case 'add':  //添加一个组别
	// 			$data = array('admin_menu_id'=>$_POST['admin_menu_id'],'controller'=>$_POST['controller'],'action'=>$_POST['action'],'desc'=>$_POST['desc']);
	// 			$status = $this->admin_menu_actions->insert($data);
	// 			break;
	// 		case 'edit': //修改组别
	// 			$status = $this->admin_menu_actions->update(array('id'=>$_POST['id']),
	// 											array(
	// 												'admin_menu_id'=>$_POST['admin_menu_id'],
	// 												'controller'=>$_POST['controller'],
	// 												'action'=>$_POST['action'],
	// 												'desc'=>$_POST['desc'],
	// 											)
	// 										);
	// 			break;
	// 		case 'del':  //删除一个组
	// 			$status = $this->admin_menu_actions->delete(array('id'=>$_POST['id']));
	// 			# code...
	// 			break;
	// 	}

	// 	if($status){
	// 		exit(json_encode(array('status'=>true,'msg'=>'操作成功')));
	// 	}else{
	// 		exit(json_encode(array('status'=>false,'msg'=>'操作失败')));
	// 	}	
	// }

	/**
	 * [email 邮箱类型管理]
	 * @return [type] [description]
	 */
	public function email(){
		$this->load->model('email_type');
		if(!isset($_GET['getdata'])){
			$ret = $this->email_type->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('hplus_normal',$ret);
			return;
		}
		
		$params = $this->input->get();
		$ret = $this->email_type->getList($params);
		echo json_encode($ret);
		exit;
	}

	/**
	 * [pay_merchant_op 邮箱类型管理 操作权限]
	 * @return [type] [description]
	 */
	public function email_op(){
		
		$this->load->model('email_type');
		$post = $this->input->post();
		$op = $post['oper'];
		switch ($op) {
			case 'add':  //添加一个组别
				$data = array(
						'title'=>trim($post['title']),
						'host'=>trim($post['host']),
						'port'=>trim($post['port']),
						'protocol'=>trim($post['protocol']),
						'crypto'=>trim($post['crypto']),
						'url'=>trim($post['url']),
						);
				$status = $this->email_type->insert($data);
				break;
			case 'edit': //修改组别
				$status = $this->email_type->update(array('id'=>$_POST['id']),
												array(
														'title'=>trim($post['title']),
														'host'=>trim($post['host']),
														'port'=>trim($post['port']),
														'protocol'=>trim($post['protocol']),
														'crypto'=>trim($post['crypto']),
														'url'=>trim($post['url']),
													)
											);
				break;
			case 'del':  //删除一个组
				$status = $this->email_type->delete(array('id'=>$_POST['id']));
				# code...
				break;
		}

		if($status){
			exit(json_encode(array('status'=>true,'msg'=>'操作成功')));
		}else{
			exit(json_encode(array('status'=>false,'msg'=>'操作失败')));
		}	
	}

	/**
	 * [pay_merchant 商户设置]
	 * @return [type] [description]
	 */
	public function pay_merchant(){
		$this->load->model('payment_method');
		if(!isset($_GET['getdata'])){
			$ret = $this->payment_method->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('system_pay_config',$ret);
			return;
		}
		
		$params = $this->input->get();
		$ret = $this->payment_method->getList($params);
		echo json_encode($ret);
		exit;
	}

	/**
	 * [pay_merchant_op 商户设置 操作权限]
	 * @return [type] [description]
	 */
	public function pay_merchant_op(){
		$this->load->model('payment_method');
		$post = $this->input->post();
		$op = $post['oper'];
		switch ($op) {
			case 'add':  //添加一个组别
				$data = array(
						'title'=>$post['title'],
						'payment_group_id'=>$post['payment_group_id'],
						'secret_key'=>$post['secret_key'],
						'company_id'=>$post['company_id'],
						);
				// print_r($data);
				$status = $this->payment_method->insert($data);
				break;
			case 'edit': //修改组别
				$status = $this->payment_method->update(array('payment_method_id'=>$_POST['id']),
												array(
													'title'=>$post['title'],
													'payment_group_id'=>$post['payment_group_id'],
													'secret_key'=>$post['secret_key'],
													'company_id'=>$post['company_id'],
												)
											);
				break;
			case 'del':  //删除一个组
				$status = $this->payment_method->delete(array('payment_method_id'=>$_POST['id']));
				# code...
				break;
		}

		if($status){
			exit(json_encode(array('status'=>true,'msg'=>'操作成功')));
		}else{
			exit(json_encode(array('status'=>false,'msg'=>'操作失败')));
		}	
	}

	/**
	 * [pay_config 支付设置]
	 * @return [type] [description]
	 */
	public function pay_config(){
		$this->load->model('payment_group');
		if(!isset($_GET['getdata'])){
			$ret = $this->payment_group->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('system_pay_config',$ret);
			return;
		}
		
		$params = $this->input->get();
		$ret = $this->payment_group->getList($params);
		echo json_encode($ret);
		exit;
	}

	/**
	 * [pay_config_op 支付设置操作权限]
	 * @return [type] [description]
	 */
	public function pay_config_op(){
		
		$this->load->model('payment_group');
		$post = $this->input->post();
		$op = $post['oper'];
		switch ($op) {
			case 'add':  //添加一个组别
				$data = array(
						'merchant'=>$post['merchant'],
						'nickname'=>$post['nickname'],
						'white_list'=>$post['white_list'],
						'api_url'=>$post['api_url'],
						'notice_url'=>$post['notice_url'],
						'success_url'=>$post['success_url'],
						'bank_list'=>$post['bank_list'],
						'mobile'=>$post['mobile'],
						'type'=>$post['type'],
						'middle_jump_url'=>$post['middle_jump_url'],
						);
				// print_r($data);
				$status = $this->payment_group->insert($data);
				break;
			case 'edit': //修改组别
				$status = $this->payment_group->update(array('payment_group_id'=>$_POST['id']),
												array(
													'merchant'=>$post['merchant'],
													'nickname'=>$post['nickname'],
													'white_list'=>$post['white_list'],
													'api_url'=>$post['api_url'],
													'notice_url'=>$post['notice_url'],
													'success_url'=>$post['success_url'],
													'bank_list'=>$post['bank_list'],
													'mobile'=>$post['mobile'],
													'type'=>$post['type'],
													'middle_jump_url'=>$post['middle_jump_url'],
												)
											);
				break;
			case 'del':  //删除一个组
				$status = $this->payment_group->delete(array('payment_group_id'=>$_POST['id']));
				# code...
				break;
		}

		if($status){
			exit(json_encode(array('status'=>true,'msg'=>'操作成功')));
		}else{
			exit(json_encode(array('status'=>false,'msg'=>'操作失败')));
		}	
	}
	
	public function password() {
	    $this->load->model('admins');
	    $p = $this->input->post();
	    if ($p['act']=='do') {
	        $aRS = array();
	        $aRS['err_no']  = 0;
	        $aRS['err_msg'] = '';
	        try {
	            $aAdmin = $this->admins->selectByCons(array('id' => $p['admin_id']));
	            if ($aAdmin['id']>0) {
	                if ($p['cur_pass']=="" || $aAdmin['password']!=md5($p['cur_pass'])) {
	                    throw new Exception('当前密码不正确',1002);
	                } else if ($p['new_pass']=="") {
	                    throw new Exception('新密码不能为空',1004);
	                } else if ($p['new_pass']!=$p['con_pass']) {
	                    throw new Exception('新密码前后不一致',1005);
	                } else {
	                    $status = $this->admins->update(array('id'=>$p['admin_id']),array('password' => md5($p['new_pass'])));
	                    if ($status<1) {
	                        throw new Exception('更改密码失败',1006);
	                    }
	                }
	            } else {
	                throw new Exception('用户不存在',1001);
	            }
	        } catch (Exception $e) {
	            $aRS['err_no']  = $e->getCode();
	            $aRS['err_msg'] = $e->getMessage();
	        }
	        echo json_encode($aRS);
	    } else {
	        $admin_id = intval($this->input->get('admin_id'));
	        if ($admin_id<1) {
	            $admin_id = $this->admins->getLoginAdminId();
	        }
	        $aAdmin = $this->admins->selectByCons(array('id' => $admin_id));
	        $this->load->view('admin/password',array('admin' => $aAdmin));
	    }
	}


	/**
	 * [basic_config 系统常规设置]
	 * @return [type] [description]
	 */
	public function setting(){
		$this->load->model('system_setting');
		if(!isset($_GET['getdata'])){
			$ret = $this->system_setting->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('system_pay_config',$ret);
			return;
		}
		
		$params = $this->input->get();
		$ret = $this->system_setting->getList($params);
		echo json_encode($ret);
		exit;
	}
	
	public function setting_op() {
	    $this->load->model('system_setting');
	    $post = $this->input->post();
	    $op = $post['oper'];
	    switch ($op) {
	        case 'add':  //添加一个组别
	            $data = array(
    	            'variable' => $post['variable'],
    	            'content'    => $post['content'],
    	            'label'    => $post['label']
	            );
	            $status = $this->system_setting->insert($data);
	            break;
	        case 'edit': 
	            $status = $this->system_setting->update(array('id' => $post['id']),
    	            array(
        	            'variable' => $post['variable'],
        	            'content'    => $post['content'],
        	            'label'    => $post['label']
    	            )
	            );
	            break;
	        case 'del':  //删除一个组
	            $status = $this->system_setting->delete(array('id' => $post['id']));
	            break;
	    }
	    exit(json_encode(array('status'=>true,'msg'=>'操作成功')));
	}

	/**
	 * [sb_limit 沙巴投限额设置]
	 * @return [type] [description]
	 */
	public function sb_limit(){
		exit("给力开发中......");
	}

	/**
	 * [ag_setting AG 设置]
	 * @return [type] [description]
	 */
	public function ag_setting(){
		exit("给力开发中......");
	}

	/**
	 * [platform_config 平台设置]
	 * @return [type] [description]
	 */
	public function platform_config(){
		exit("给力开发中......");
	}	

	/**
	 * [admin_log 后台操作日志]
	 * @return [type] [description]
	 */
	public function cplog(){
	    //$this->wlog('查看后台操作日志');
	    $this->load->model('admin_log');
	    $this->load->model('admins');
	    if(!isset($_GET['getdata'])){
	        $ret = $this->admin_log->teamHtml();
	        $this->adminview('hplus_normal',$ret);
	        return;
	    }
	    
	    $params = $this->input->get();
	    $ret = $this->admin_log->getList($params);
	    foreach ($ret['rows'] as $k => &$v) {
	        $ret['rows'][$k]['admin_name'] = $this->admins->getAdminName($v['admin_id']);
	        $ret['rows'][$k]['dateline']   = date('Y-m-d H:i:s',$v['dateline']);
	    }
	    
	    echo json_encode($ret);
	    exit;
	}

}

