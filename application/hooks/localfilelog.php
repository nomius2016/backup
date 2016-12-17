<?php
/**
 * write log to local file log
 * @author jack
 *
 */
class LocalFileLog{
	
	public function write($params){
		$filePath ="/data/extdata/phplog/backup/";
		$fileName = 'phplog';
		$nowTimestamp = time();
		$nowDate = date('Y-m-d', $nowTimestamp);
		$nowTime = date('H:i:s', $nowTimestamp);
		$strIP = $_SERVER['REMOTE_ADDR'];
		$strDomain = $_SERVER['HTTP_HOST'];	
		$strURI = $_SERVER['REQUEST_URI'];
		$strUA = $_SERVER['HTTP_USER_AGENT'];
		$strPOST = var_export($_REQUEST,true);
		$strPOST = str_replace(array("\n", "\t", "\r"), '', $strPOST);
		$logContent = "date[${nowDate}] time[${nowTime}] IP[${strIP}]  domain[${strDomain}] URI[${strURI}] UA[${strUA}] SERVER[${strAddress}] POST[${strPOST}]";

		if ( !is_dir($filePath)) {
			if ( !mkdir($filePath, 0755, true)){
				return;
			}
		}
		$file = $filePath .$fileName . '-' . date('Ymd') . '.log';
		$handle = fopen($file, 'a');
		if ($handle != null) {
			fwrite($handle, $logContent . "\n");
		}
	}
}