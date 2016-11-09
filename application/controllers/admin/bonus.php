<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Bonus extends Basecontroller {

	public function __construct(){
		parent::__construct();
	}


	/**
	 * [menu 后台菜单配置]
	 * @return [type] [description]
	 */
	public function lists(){
		
		$this->load->model('fund_bonus_log');
		if(!isset($_GET['getdata'])){
			$ret = $this->fund_bonus_log->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('hplus_normal',$ret);
			return;
		}
		
		$params = $this->input->get();
		$ret = $this->fund_bonus_log->getList($params);

		echo json_encode($ret);
		exit;

	}

	/**
	 * [menu_op 后台菜单配置操作权限]
	 * @return [type] [description]
	 */
	public function lists_op(){

		$op = $_POST['oper'];
		$this->load->model('fund_bonus_log');
		switch ($op) {
			case 'add':  //添加一个组别
				$data = array('user_id'=>$_POST['user_id'],'status'=>$_POST['status'],'amount'=>$_POST['amount'],
					          'createtime'=>date('Y-m-d H:i:s'));
				$status = $this->fund_bonus_log->insert($data);
				break;
			case 'edit': //修改组别
				$status = $this->fund_bonus_log->update(array('id'=>$_POST['id']),
												array(
													'user_id'=>$_POST['user_id'],
													'amount'=>$_POST['amount'],
													'status'=>$_POST['status'],
												)
											);
				break;
		}

		if($status){
			exit(json_encode(array('status'=>true,'msg'=>'操作成功')));
		}else{
			exit(json_encode(array('status'=>false,'msg'=>'操作失败')));
		}

	}
	
	/**
	 * [batch 批量添加红利]
	 * @return [type] [description]
	 */
	public function batch(){
		// $this->load->model('fund_bonus_log');
		// $this->fund_bonus_log->addUserBonus(1,100,'你好啊');
		// echo 'over';exit;
		$this->adminview('bonus_batch',$ret);
	}

	/**
	 * [batch_upload 批量添加红利 操作权限]
	 * @return [type] [description]
	 */
	public function batch_upload(){
		
		// print_r($_FILES);exit;
		if($_FILES){
			//此处添加 redis 重复提交校验机制
			
			//解析文件
			$f = $_FILES['f'];

			if(!(isset($f['tmp_name']) && $f['tmp_name'])){
				exit('数据不合法!');
			}

			$data = file_get_contents($f['tmp_name']);
			if(mb_detect_encoding($data, array('ASCII','GB2312','GBK','UTF-8')) == 'EUC-CN')
			{
				$data = iconv('gb2312', 'utf-8', $data); //对gb2312进行编码转换
			}
			$ar = explode("\n", $data);
			$new_data = array();
			foreach ($ar as $key => $value) {
				$tmp_ar =  explode(',', $value);
				$tmp = array();
				$tmp['user_id'] = intval($tmp_ar['0']);
				$tmp['amount'] = sprintf("%01.2f",$tmp_ar['1']);
				$tmp['remark'] = trim($tmp_ar['2']);
				if($tmp['user_id'] && $tmp['amount'] && $tmp['remark']){
					$new_data[$tmp['user_id']] = $tmp;
				}else{
					$msg = $value.'有问题!';
					$this->alert($msg);
				}
			}

			//检查所有的用户是否存在以及状态是否合法
			$user_ids = array_keys($new_data);
			$this->load->model('users');
			$ret = $this->users->selectByWhereAndIn(array('status'=>2),'id',$user_ids,'id');
			if(count($ret) != count($ar)){
				$msg = '上传的文件中有用户状态不对,或者用户不存在!';
				$this->alert($msg);
			}

			//开始进行派发
			$this->load->model('fund_bonus_log');
			$this->fund_bonus_log->trans_begin();
			foreach ($new_data as $key => $value) {
				$ret = $this->fund_bonus_log->addUserBonus($value['user_id'],$value['amount'],$value['remark']);
				if(!$ret['status']){
					$this->fund_bonus_log->trans_rollback();
					$this->alert('添加失败!');
				}
			}
			$this->fund_bonus_log->trans_commit();
			$this->alert('添加成功!');
		}


	}

	private function alert($msg){
		echo '<meta http-equiv="Content-Type" content="text/html;charset=utf-8">';
		echo '<script>';
		echo "alert('$msg');";
		echo "window.location = ('/admin/bonus/batch') ;";
		echo '</script>';
		exit;
	}

}

