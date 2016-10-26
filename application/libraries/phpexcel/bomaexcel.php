<?php 
ini_set('memory_limit', '2048M');
class bomaexcel{
	
	private $phpexcel; 
	
	/**
	 * @desc  导出EXCEL
	 * @param array $list 		导出的二维数组
	 * @param array $field  	excel 里面显示的字段
	 * @param string $title  	导出的excel的名称
	 * @param array $arfield    对应字段的键值,如果没有则默认是0,1,2...
	 * @return excel
	 */
	function output($list,$field,$title,$arfield = array(),$set_field_string = false){
		
		if(!($list&&$field&&$title)) return array('status'=>false,'msg'=>'参数缺少');

		if($arfield){
			if(count($field) != count($arfield)) return array('status'=>false,'msg'=>'键值的数量和字段的数量不相等');
		}

		//大于1W条导出csv
		// if(count($list)>10000){
			$this->outputCsv($field,$list,$title,$arfield);
			exit;
		// }
			
		require_once 'PHPExcel.php';
		
		$this->phpexcel = new PHPExcel();
		//print_r($this->phpexcel);
		$this->phpexcel->getProperties ()->setCreator ( "Boma365 System" )
		->setLastModifiedBy ( "Boma365 System" )
		->setTitle ( "Boma365 Market Users Export Data" )
		->setSubject ( "Boma365 Market Users Export Data" )
		->setDescription ( "The document is supposed to only be kept whithin company" )
		->setKeywords ( "Boma365 Market" )
		->setCategory ( "Export Data" );
		//set excel data table titles
		$a = array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
		foreach($field as $key=>$value){
			$this->phpexcel->setActiveSheetIndex(0)->setCellValue($a[$key].'1', $value);
		}
		
		//insert  data
		$row = 2;
		if(is_array($list) && sizeof($list) > 0){
			foreach ($list as $userData){
				foreach($field as $key=>$value){
					$k = $key;
					if($arfield){
						$k = $arfield[$key];
					}

					// 添加参数,如果 是否将 字符串设置成字符串,如果是的话 则 纯数字字符串将不会显示成科学计数法
					if($set_field_string){
						$this->phpexcel->setActiveSheetIndex(0)->setCellValueExplicit($a[$key].$row, $userData[$k],PHPExcel_Cell_DataType::TYPE_STRING);
					}else{
						$this->phpexcel->setActiveSheetIndex(0)->setCellValue($a[$key].$row, $userData[$k]);
					}

				}
				$row++;
			}
		}
		ob_end_clean();
		ob_start();
		// Redirect output to a client��s web browser (Excel5)
		header('Content-Type: application/vnd.ms-excel');
		header('Content-Disposition: attachment;filename="'.$title.'.xls"');
		header('Cache-Control: max-age=0');
		// If you're serving to IE 9, then the following may be needed
		header('Cache-Control: max-age=1');
		// If you're serving to IE over SSL, then the following may be needed
		header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
		header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
		header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
		header ('Pragma: public'); // HTTP/1.0
		//create writer based on $this->PHPExcel and write the prepared data to php output for download
		PHPExcel_IOFactory::createWriter($this->phpexcel, 'Excel5')->save('php://output');
		exit ();	
		
	}
	

	public function outputCsv($head, $data, $filename,$arfield = array()) {
		header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment;filename="'.$filename.'.csv"');
        header('Cache-Control: max-age=0');

        $fp = fopen('php://output', 'a');

        foreach ($head as $i=>$v) {
			$head[$i] = iconv('utf-8', 'gbk', $v);
		}

		fputcsv($fp, $head);
		$cnt = 0;
		$limit = 10000;
		if($arfield) $isteam = true;
		try {
			foreach ($data as $value) {
				$cnt++;

				if ($limit == $cnt) {
					ob_flush();
					flush();
					$cnt = 0;
				}

				if($isteam){

					foreach ($arfield as $i=>$v_t) {
						$row[$i] = iconv('utf-8', 'gbk', $value[$v_t]);
					}

				}else{
					foreach ($value as $i=>$v) {
						$row[$i] = iconv('utf-8', 'gbk', $v);
					}
				}

				

				fputcsv($fp, $row);
			}
		} catch (Exception $e) {
			die($e);
		}

		return true;
	}
}