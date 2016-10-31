<?php

if (! defined ( 'BASEPATH' ))
	exit ( 'No direct script access allowed' );

if (ENVIRONMENT === 'development' || ENVIRONMENT === 'production') {
	//写日志文件
	$hook ['post_controller_constructor'][] = array(
		'class' => 'LocalFileLog',
		'function' => 'write',
		'filename' => 'localfilelog.php',
		'filepath' => 'hooks'
	); 
	
	$hook ['post_controller_constructor'][] = array (
		'class' => 'Aop',
		'function' => 'filter',
		'filename' => 'aop.php',
		'filepath' => 'hooks',
		'params' => array () 
);
}
