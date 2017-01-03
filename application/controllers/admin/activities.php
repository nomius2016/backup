<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Activities extends Basecontroller {

	public function __construct(){
		parent::__construct();
		$this->load->model('activity');
	}

	public function index(){
		
		$id = $this->input->get('id');
		$ret = $this->activity->selectById($id);
		$this->adminview('activities_index',$ret);
	}


	/**
	 * 上传图片
	 * return_type
	 * 
	 * @author 2013-12-22 下午3:04:32
	 */
	public function saveActivityImg() {
		$targetFolder = 'uploads';
		$result = array (
				'status' => 0,
				'msg' => '上传失败' 
		);
		if (! empty ( $_FILES )) {
			if ($_FILES ['file'] ['error'] == 0) {
				$tempFile = $_FILES ['file'] ['tmp_name'];
				$targetPath = $targetFolder;
				// Validate the file type
				$fileTypes = array (
						'jpg',
						'jpeg',
						'gif',
						'png' 
				); // File extensions
				$fileParts = pathinfo($_FILES['file']['name'] );
				if (in_array ( $fileParts ['extension'], $fileTypes )) {
					$newFileName =microtime ( true ) . '-' . rand ( 100000, 999999 ) . '.' . $fileParts ['extension'];
					$targetFile = rtrim ( $targetPath, '/' ) . '/' . $newFileName;
					move_uploaded_file ( $tempFile, $targetFile );
					$result = array (
							'status' => 1,
							'msg' => '文件上传成功',
							'img_url' => $targetFolder."/".$newFileName, 
					);
				} else {
					$result = array (
							'status' => 0,
							'msg' => '文件类型不匹配，只能上传(jpg,jpeg,gif,png)' 
					);
				}
			} else {
				$result = array (
						'status' => 0,
						'msg' => '文件上传失败' 
				);
			}
		} else {
			$result = array (
					'status' => 0,
					'msg' => '请选择要上传的文件' 
			);
		}
		
		echo json_encode ( $result );
	}

	/**
	 * [save 保存活动]
	 * @return [type] [description]
	 */
	public function save(){
		$params = $this->input->post();
		$data = array();
		$data['main_title'] = trim($params['main_title']);
		$data['main_title_desc'] = trim($params['main_title_desc']);
		$data['type'] = intval($params['type']);
		$data['status'] = intval($params['status']);
		$data['amount'] = trim($params['amount']);
		$data['amount_desc'] = trim($params['amount_desc']);
		$data['start_time'] = trim($params['start_time']);
		$data['end_time'] = trim($params['end_time']);
		$data['img'] = trim($params['img']);
		$data['rule'] = trim($params['rule']);
		$data['create_time'] = date('Y-m-d H:i:s');
			
		$continue = true;
		
		if(!$data['main_title']){
			$str = '主标题不能为空!';
			$continue = false;
		}

		if(!$data['main_title_desc']){
			$str = '副标题不能为空!';
			$continue = false;
		}

		if(!$data['type']){
			$str = '类型不能为空!';
			$continue = false;
		}

		if(!$data['status']){
			$str = '请选择状态!';
			$continue = false;
		}

		if(!$data['amount']){
			$str = '金额不能为空!';
			$continue = false;
		}

		if(!$data['amount_desc']){
			$str = '金额描述不能为空!';
			$continue = false;
		}

		if(!$data['start_time']){
			$str = '开始时间不能为空!';
			$continue = false;
		}

		if(!$data['end_time']){
			$str = '结束时间不能为空!';
			$continue = false;
		}

		if(!$data['rule']){
			$str = '活动规则不能为空!';
			$continue = false;
		}


		$id = $this->input->get('id');
		if($continue){
			if($id){
				unset($data['create_time']);
				if(!$data['img']) unset($data['img']);
				$ret = $this->activity->update(array('id'=>$id),$data);
			}else{
				$ret = $this->activity->insert($data);
			}

			$str = $ret ? '操作成功!' : '操作失败!';
		}


		header("Content-type: text/html; charset=utf-8");
		$s =  '<script>';
		$s.= 'alert("'.$str.'");';
		$s.= 'window.location.href="/admin/activities/index?id='.$id.'";';
		$s.= '</script>';
		exit($s);
	}

	/**
	 * [list 活动列表]
	 * @return [type] [description]
	 */
	public function lists(){
		
		if(!isset($_GET['getdata'])){
			$ret = $this->activity->teamHtml(); //获取菜单用的 js 以及需要生成的查询条件
			$this->adminview('hplus_normal',$ret);
			return;
		}

		$params = $this->input->get();
		$ret = $this->activity->getList($params);
		exit(json_encode($ret));
	}

}