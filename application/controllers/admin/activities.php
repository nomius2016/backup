<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Activities extends Basecontroller {

	public function __construct(){
		parent::__construct();
	}

	public function index(){
		$this->adminview('activities_index');
	}


	/**
	 * 上传图片
	 * return_type
	 * 
	 * @author 2013-12-22 下午3:04:32
	 */
	public function saveActivityImg() {
		$targetFolder = '/uploads';
		$result = array (
				'status' => 0,
				'msg' => '上传失败' 
		);
		if (! empty ( $_FILES )) {
			if ($_FILES ['file'] ['error'] == 0) {
				$tempFile = $_FILES ['file'] ['tmp_name'];
				$targetPath = '/data/extdata/boma/' . $targetFolder;
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
}