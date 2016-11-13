<?php
/**
 * model基类，主要定义了基本的db操作
 * @version 1.0
 * @license 
 * @copyright 
 * @link 
 * @author  2013-12-5 下午9:59:44
 */
class Base_Model extends CI_Model {
	
	private $_tableName;
	
	/**
	 * 获取tableName
	 *
	 * @author 2013-12-5 下午9:54:24
	 */
	public function getTableName() {
		return $this->_tableName;
	}
	
	/**
	 * 设置tableName
	 *
	 * @param unknown $tableName        	
	 *
	 * @author 2013-12-5 下午9:55:06
	 */
	public function setTableName($tableName) {
		$this->_tableName = $tableName;
	}
	
	/**
	 * 构造函数
	 *
	 * @author 2013-12-5 下午9:18:15
	 */
	public function __construct() {
		parent::__construct ();
	}
	
	/**
	 * 开始事务(PASSED)
	 */
	public function trans_begin() {
		$this->db->trans_begin ();
	}
	
	/**
	 * 事务提交(PASSED)
	 */
	public function trans_commit() {
		$this->db->trans_commit ();
	}
	
	/**
	 * 事务回滚(PASSED)
	 */
	public function trans_rollback() {
		$this->db->trans_rollback ();
	}
	
	/**
	 * 获取唯一的字段列表
	 * return_type
	 *
	 * @author 2013-12-8 下午8:19:17
	 */
	public function distinct($filed, $where = array()) {
		return $this->db->from ( $this->_tableName )->where ( $where )->distinct ( $filed )->result_array ();
	}
	
	/**
	 * 插入数据(PASSED)
	 *
	 * @param unknown $insertArray        	
	 *
	 * @author 2013-12-5 下午9:09:44
	 */
	public function insert($insertArray = NULL) {
		$this->db->set ( $insertArray )->insert ( $this->_tableName );
		return $this->db->insert_id ();
	}
	
	/**
	 * 更新数据记录(PASSED)
	 *
	 * @param unknown $where        	
	 * @param unknown $update        	
	 *
	 * @author 2013-12-5 下午9:16:24
	 */
	public function update($where = NULL, $update = NULL) {
		$this->db->update ( $this->_tableName, $update, $where );
		$affected_rows = $this->db->affected_rows();
		return $affected_rows;
	}
	
	/**
	 * 删除数据(PASSED)
	 *
	 * @param unknown $where        	
	 *
	 * @author 2013-12-5 下午9:34:23
	 */
	public function delete($where = NULL) {
		return $this->db->delete ( $this->_tableName, $where );
	}
	
	/**
	 * 清理表数据（PASSED）
	 *
	 * @author 2013-12-5 下午9:36:21
	 */
	public function truncate() {
		return $this->db->truncate ( $this->_tableName );
	}
	
	/**
	 * 数据替换(PASSED)
	 *
	 * @param unknown $set        	
	 *
	 * @author 2013-12-5 下午9:38:16
	 */
	public function replace($sets = NULL) {
		return $this->db->from ( $this->_tableName )->set ( $sets )->replace ();
	}
	
	/**
	 * 获取全表数据(PASSED)
	 */
	public function selectAll() {
		return $this->db->get ( $this->_tableName )->result_array ();
	}
	
	/**
	 * 获取某一条件下的所有数据(PASSED)
	 * return_type
	 *
	 * @author 2013-12-11 下午11:26:14
	 */
	public function selectAllByWhere($where = NULL, $fields = "*", $order = array()) {
		$db = $this->db->from ( $this->_tableName )->where ( $where );
		if (is_array ( $order ) && ! empty ( $order )) {
			if (is_array ( $order [0] )) {
				foreach ( $order as $od ) {
					$db->order_by ( $od [0], $od [1] );
				}
			} else {
				$db->order_by ( $order [0], $order [1] );
			}
		}
		return $db->get ()->result_array ();
	}
	
	/**
	 * 通过ID获取某一条记录(PASSED)
	 *
	 * @param unknown $id        	
	 *
	 * @author 2013-12-5 下午9:11:14
	 */
	public function selectById($id) {
		return $this->db->from($this->_tableName)->where('id', $id)->get()->row_array();
	}
	
	/**
	 * 根据指定的Cons搜索(PASSED)
	 */
	public function selectByCons($cons = array()) {
		if (empty ( $cons )) {
			return false;
		}

		$rs = $this->db->from ( $this->_tableName )->where ( $cons )->get ()->result_array ();
		if(count($rs) >= 1)
			return $rs[0];
		else
			return null;
	}
	
	/**
	 * JOIN查询（PASSED）
	 * $join = array(
	 * array(
	 * 'table' => 'xxx', 连接的表
	 * 'on' => '', 条件
	 * 'join' => '' 连接类型，可选项包括：left, right, outer, inner, left outer, 以及 right outer.
	 * )
	 * )
	 * return_type
	 *
	 * @author 2013-12-6 下午11:43:54
	 */
	public function selectJoinById($id, $joins = array()) {
		$id = intval ( $id );
		if ($id < 0)
			return false;
		$joins = "";
		if (is_array ( $joins )) {
			foreach ( $joins as $join ) {
				if (isset ( $join ['join'] )) {
					$joins .= "{$join ['join']} JOIN `{$join ['table']}` ON {$join ['on']} ";
				} else {
					$joins .= "LEFT JOIN `{$join ['table']}` ON {$join ['on']} ";
				}
			}
		}
		$sql = "SELECT * FROM `{$this->_tableName}` {$joins}  WHERE {$this->_tableName}.id={$id}";
		return $this->fetchRow ( $sql );
	}
	
	/**
	 * 直接执行SQL(PASSED)
	 *
	 * @param string $sql        	
	 * @return boolean multitype:unknown
	 */
	public function fetchRow($sql = NULL) {
		if (empty ( $sql )) {
			return false;
		}
		return $this->db->query ( $sql )->row_array ();
	}
	
	/**
	 * 直接执行SQL(PASSED)
	 *
	 * @param string $sql        	
	 * @return boolean multitype:unknown
	 */
	public function querySql($sql = NULL) {
		if (empty ( $sql )) {
			return false;
		}
		return $this->db->query ( $sql )->result_array ();
	}
	
	/**
	 * 直接执行SQL 更新/删除/插入(PASSED)
	 *
	 * @param string $sql        	
	 * @return affecterow
	 */
	public function executeSql($sql = NULL) {
		$result = $this->db->query ( $sql );
		return $this->db->affected_rows ();
	}
	
	/**
	 * 获取多条记录(PASSED)
	 *
	 * @param unknown $where        	
	 * @param unknown $limit        	
	 * @param unknown $order        	
	 *
	 * @author 2013-12-5 下午9:15:02
	 */
	public function selectByWhereIn($where_in_field = NULL, $where_in_array = array(), $filed = "*", $limit = NULL, $order = array()) {
		$db = $this->db->from ( $this->_tableName );
		$db->where_in ( $where_in_field, $where_in_array );
		if (is_array ( $order ) && ! empty ( $order )) {
			if (is_array ( $order [0] )) {
				foreach ( $order as $od ) {
					$db->order_by ( $od [0], $od [1] );
				}
			} else {
				$db->order_by ( $order [0], $order [1] );
			}
		}
		if ($limit) {
			if (is_array ( $limit )) {
				$db->limit ( $limit [1], $limit [0] );
			} else {
				$db->limit ( $limit );
			}
		}
		return $db->get ()->result_array ();
	}
	
	/**
	 * 获取多条记录(PASSED)
	 *
	 * @param unknown $where        	
	 * @param unknown $limit        	
	 * @param unknown $order        	
	 *
	 * @author 2013-12-5 下午9:15:02
	 */
	public function selectByWhereAndIn($where = array(), $where_in_field = NULL, $where_in_array = array(), $filed = "*", $limit = NULL, $order = array()) {
		$db = $this->db->from ( $this->_tableName )->where ( $where )->select($filed);
		$db->where_in ( $where_in_field, $where_in_array );
		if (is_array ( $order ) && ! empty ( $order )) {
			if (is_array ( $order [0] )) {
				foreach ( $order as $od ) {
					$db->order_by ( $od [0], $od [1] );
				}
			} else {
				$db->order_by ( $order [0], $order [1] );
			}
		}
		if ($limit) {
			if (is_array ( $limit )) {
				$db->limit ( $limit [1], $limit [0] );
			} else {
				$db->limit ( $limit );
			}
		}
		return $db->get ()->result_array ();
	}
	/**
	 * 获取多条记录(PASSED)
	 *
	 * @param unknown $where        	
	 * @param unknown $limit        	
	 * @param unknown $order        	
	 *
	 * @author 2013-12-5 下午9:15:02
	 */
	public function selectByWhere($where = array(), $fileds = "*", $limit = NULL, $order = array()) {
		$db = $this->db->from ( $this->_tableName )->where ( $where )->select($fileds);
		if (is_array ( $order ) && ! empty ( $order )) {
			if (is_array ( $order [0] )) {
				foreach ( $order as $od ) {
					$db->order_by ( $od [0], $od [1] );
				}
			} else {
				$db->order_by ( $order [0], $order [1] );
			}
		}
		if ($limit) {
			if (is_array ( $limit )) {
				$db->limit ( $limit [1], $limit [0] );
			} else {
				$db->limit ( $limit );
			}
		}
		return $db->get ()->result_array ();
	}
	
	/**
	 * 查询(PASSED)
	 * $join = array(
	 * array(
	 * 'table' => 'xxx', 连接的表
	 * 'on' => '', 条件
	 * 'join' => '' 连接类型，可选项包括：left, right, outer, inner, left outer, 以及 right outer.
	 * )
	 * )
	 * return_type
	 *
	 * @author 2013-12-6 下午11:36:21
	 */
	public function selectJoinByWhere($where, $fileds = "*", $joins = array(), $limit = null, $order = array()) {
		$db = $this->db->from ( $this->_tableName )->where ( $where )->select($fileds);
		if ($joins) {
			foreach ( $joins as $join ) {
				if (isset ( $join ['join'] )) {
					$db->join ( $join ['table'], $join ['on'], $join ['join'] );
				} else {
					$db->join ( $join ['table'], $join ['on'] );
				}
			}
		}
		if ($order) {
			if (stripos ( $order [0], "." ) === false) {
				$order_by_field = $this->_tableName . "." . $order [0];
			} else {
				$order_by_field = $order [0];
			}
			$db->order_by ( $order_by_field, $order [1] );
		}
		if ($limit) {
			if (is_array ( $limit )) {
				$db->limit ( $limit [1], $limit [0] );
			} else {
				$db->limit ( $limit );
			}
		}
		return $db->get ()->result_array ();
	}
	
	/**
	 * 查询(PASSED)
	 * $join = array(
	 * array(
	 * 'table' => 'xxx', 连接的表
	 * 'on' => '', 条件
	 * 'join' => '' 连接类型，可选项包括：left, right, outer, inner, left outer, 以及 right outer.
	 * )
	 * )
	 * return_type
	 *
	 * @author 2013-12-6 下午11:36:21
	 */
	public function selectJoinByWhereGroup($where, $fileds = "*", $joins = array(), $group = null, $limit = null, $order = array()) {
		$db = $this->db->from ( $this->_tableName )->where ( $where );
		if ($joins) {
			foreach ( $joins as $join ) {
				if (isset ( $join ['join'] )) {
					$db->join ( $join ['table'], $join ['on'], $join ['join'] );
				} else {
					$db->join ( $join ['table'], $join ['on'] );
				}
			}
		}
		if ($order) {
			if (stripos ( $order [0], "." ) === false) {
				$order_by_field = $this->_tableName . "." . $order [0];
			} else {
				$order_by_field = $order [0];
			}
			$db->order_by ( $order_by_field, $order [1] );
		}
		if ($group) {
			if (is_array ( $group )) {
				$xx = array ();
				foreach ( $group as $k => $group_xx ) {
					if (strripos ( $group_xx, "." ) === false) {
						$xx [] = $this->_tableName . "." . $group_xx;
					} else {
						$xx [] = $group_xx;
					}
				}
				$group_by = implode ( ",", $xx );
			} else {
				if (strripos ( $group, "." ) === false) {
					$group_by = $this->_tableName . "." . $group;
				} else {
					$group_by = $group;
				}
			}
			$db->group_by ( $group_by );
		}
		if ($limit) {
			if (is_array ( $limit )) {
				$db->limit ( $limit [1], $limit [0] );
			} else {
				$db->limit ( $limit );
			}
		}
		return $db->get ()->result_array ();
	}
	
	/**
	 * 获取总记录数(PASSED)
	 *
	 * @param unknown $where        	
	 *
	 * @author 2013-12-5 下午9:12:29
	 */
	public function count($where,$column=NULL,$arr=array()) {
		if($column==NULL){
			return $this->db->from ( $this->_tableName )->where ( $where )->count_all_results ();
		}else{
			return $this->db->from ( $this->_tableName )->where ( $where )->where_in($column, $arr)->count_all_results ();
		}		
	}

	/**
	 * 获取总记录数(PASSED)
	 *
	 * @param unknown $where        	
	 *
	 * @author 2013-12-5 下午9:12:29
	 */
	public function distinct_count($where,$column='id') {

		$this->db->select($column);
		$this->db->distinct();
		$this->db->from($this->_tableName)->where($where);
		$query = $this->db->get();

		return $query->num_rows();		
	}
	
	/**
	 * 初始判断Page|PageInfo
	 *
	 * @param number $num        	
	 * @param number $default_value        	
	 * @return number
	 */
	protected function initPageInfo($num = 1, $default_value = 1) {
		return intval ( $num ) < 1 || intval ( $num ) > 65535 ? $default_value : intval ( $num );
	}
	
	/**
	 * 计算分页信息
	 *
	 * @param number $page        	
	 * @param number $pageSize        	
	 * @return boolean
	 */
	public function processLimitInfo($page = 1, $pageSize = 25) {
		$page = $this->initPageInfo ( $page, 1 );
		$pageSize = $this->initPageInfo ( $pageSize, 25 );
		$limitStart = ($page - 1) * $pageSize;
		if ($page == 1) {
			$limitStart = ($page - 1) * $pageSize;
		}
		return array (
				$limitStart,
				$pageSize 
		);
	}
	
	/**
	 * [insert_batch 批量插入]
	 * @return [type] [description]
	 */
	public function insert_batch($data){
		return $this->db->insert_batch($this->_tableName, $data); 
	}

	/**
	 * [update_field_by_exp 通过表单时更改某字段的值]
	 * @return [type] [description]
	 */
	public function update_field_by_exp($where,$fields){

		$this->db->where($where);
		foreach ($fields as $field => $op) {
			// $this->db->set('balance','balance + 100',FALSE);
			$this->db->set($field,$op,FALSE);
		}
		$this->db->update($this->_tableName);
		
		return $this->db->affected_rows();
	}

	/**
	 * 根据结果进行分页处理
	 *
	 * @param number $count        	
	 * @param number $page        	
	 * @param number $pageSize        	
	 * @return multitype:number Ambigous <number, unknown, number>
	 */
	public function processPageInfo($count = 0, $page = 1, $pageSize = 25){
		$total = $count;
		$page = $this->initPageInfo ( $page, 1 );
		$pageSize = $this->initPageInfo ( $pageSize, 25 );
		$pages = intval ( ceil ( ($count / $pageSize) ) );
		$pageInfo = array ();
		
		$pageInfo ['pages'] = $pages;
		$prePage = ($page - 1) > 0 ? $page - 1 : 1;
		$pageInfo ['prePage'] = $prePage;
		
		$nextPage = ($page + 1) >= $pages ? $pages : $page + 1;
		$pageInfo ['nextPage'] = $nextPage;
		$currentPage = $page;
		$maxShowPages = 10;
		if ($page >= $pages) {
			$currentPage = $pages;
		} else if ($page < 1) {
			$currentPage = 1;
		}
		$pageInfo ['currentPage'] = $currentPage;
		
		$showStartPage = false;
		$showEndPage = false;
		$startPage = 1;
		$endPage = 1;
		if ($pages > $maxShowPages) {
			if ($currentPage <= 5) {
				$showEndPage = true;
				$endPage = $currentPage + ($maxShowPages - $currentPage);
			}
			if ($currentPage > 5) {
				if (($currentPage + 5) > $pages) {
					$startPage = $currentPage - ($maxShowPages - ($pages - $currentPage));
					$endPage = $pages;
					if ($pages != 11) {
						$showStartPage = true;
					}
					$showEndPage = false;
				} else {
					$startPage = $currentPage - 5;
					$endPage = $currentPage + 4;
					if ($pages != 11 && $currentPage != 6) {
						$showStartPage = true;
					}
					if ($currentPage < $pages) {
						$showEndPage = true;
					}
				}
			}
		} else {
			$startPage = 1;
			$endPage = $pages;
		}
		if ($pages > 1) {
			$pageInfo ['showPageInfo'] = true;
		}
		$pageInfo ['maxShowPages'] = $maxShowPages;
		$pageInfo ['page'] = $page;
		$pageInfo ['startPage'] = $startPage;
		$pageInfo ['endPage'] = $endPage;
		$pageInfo ['showStartPage'] = $showStartPage;
		$pageInfo ['showEndPage'] = $showEndPage;
		$pageInfo ['smartyPages'] = range ( $startPage, $endPage );
		return $pageInfo;
	}

	/**
	 * [teamHplus 生成后台模板需要的JS 内容 以及 搜索或者导出内容]
	 * @return [type] [description]
	 */
	public function teamHplus($param){

		//参数 
		$data_url = isset($param['url']) ?  $param['url'] : $_SERVER['REQUEST_URI'].'?getdata=true';  //数据请求的URL
		$op_url = isset($param['url']) ?  $param['op_url'] : $_SERVER['REQUEST_URI'].'_op';    //操作(增/删/改) 的URL
		$field = $param['field']; //需要展示的列 相关的信息  包含 1 是否隐藏 2是否可以修改 3列展示的名称 4列的宽度
		
		if(isset($param['add']) && $param['add']){
			$is_add = 'true';
			$add_js = ",{
                top:300,
                left:600,
                closeAfterAdd:true,
                afterSubmit:function(resposedata){
                    var data = JSON.parse(resposedata.responseText);
                    if(!data.status){
                        alert(data.msg);
                    }
                    return [true,''];
                }
            }";
		}else{
			$is_add = 'false';
			$add_js = ',{}';
		}

		if(isset($param['edit']) && $param['edit']){
			$is_edit = 'true';
			$edit_js = ",{  //修改(添加/删除)的时候的参数
                // height: 150,
                reloadAfterSubmit: true,
                top:300,
                left:600,
                afterSubmit:function(resposedata){
                    var data = JSON.parse(resposedata.responseText);
                    if(!data.status){
                        alert(data.msg);
                    }
                    return [true,''];   //必须要返回
                },
                closeAfterEdit:true
            }";
		}else{
			$is_edit = 'false';
			$edit_js = ',{}';
		}

		if(isset($param['del']) && $param['del']){
			$is_del = 'true';
			$del_js = ",{
                top:300,
                left:700,
                afterSubmit:function(resposedata){
                    var data = JSON.parse(resposedata.responseText);
                    if(!data.status){
                        alert(data.msg);
                    }
                    return [true,''];
                }
            }";
		}else{
			$is_del = 'false';
			$del_js = ',{}';
		}

		$ext_js = "   //日期范围限制
        

        ";
		$is_add = isset($param['add']) ?  'true' : 'false';  //是否增加
		$is_edit = isset($param['edit']) ?  'true' : 'false';  //是否修改
		$is_del = isset($param['del']) ?  'true' : 'false';   //是否删除 
		$is_export = isset($param['export']) ?  $param['export'] : false; ;  //是否导出
		$search =   isset($param['search']) ?  $param['search'] : array(); //搜索相关的参数
		
		//生成HTML 
		if($search){
			$search_js = "function gridReload(){"."\n";
			$middle_js = "var url = '{$data_url}';";
			$se = '<div role="form" class="form-inline">';
			$se.=      '<div class="form-group">';
			foreach ($search as  $value) {
				if(!in_array($value['1'], array('datetime'))) $middle_js.= "url+= '&{$value['0']}='+\$('#{$value['0']}').val();"."\n";
				switch ($value['1']) {
					case 'text':
						$se.='<span>&nbsp;&nbsp;&nbsp;&nbsp;</span><input type="'.$value['1'].'" placeholder="'.$value['2'].'"  class="form-control" id="'.$value['0'].'">';
						break;
					case 'select':
						$se.='<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>';
						$se.='<select id="'.$value['0'].'" aria-controls="editable" class="form-control">';
								foreach ($value['2'] as $select_k => $select_v){
									$se.='<option value="'.$select_k.'">'.$select_v.'</option>';
								}
						$se.='</select>';
						break;
					case 'datetime':
						$start_id = $value['0'].'_start';
						$end_id   = $value['0'].'_end';
						$se.='<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>';
						$se.='<input placeholder="'.$value['2'].'开始时间" class="form-control layer-date" id="'.$start_id.'">';
						$se.='<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>';
						$se.='<input placeholder="'.$value['2'].'结束时间" class="form-control layer-date" id="'.$end_id.'">';
						
						$middle_js.= "url+= '&{$start_id}='+\$('#{$start_id}').val();"."\n"; //拼装JS
						$middle_js.= "url+= '&{$end_id}='+\$('#{$end_id}').val();"."\n"; //拼装JS
						$ext_js = "
							var start = {elem: '#{$start_id}',format: 'YYYY-MM-DD hh:mm:ss',min:'2010-01-01 00:00:00', max:laydate.now(), istime: true,istoday: false,choose: function (datas) {end.min = datas; end.start = datas ;}};
laydate(start);            
var end = {elem: '#{$end_id}',format: 'YYYY-MM-DD hh:mm:ss',min:'2010-01-01 00:00:00', max:laydate.now(),istime: true,istoday: false,choose: function (datas) {start.max = datas; }};
laydate(end); 

						";
						break;
					case 'date':
						$start_id = $value['0'].'_start';
						$end_id   = $value['0'].'_end';
						$se.='<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>';
						$se.='<input placeholder="'.$value['2'].'开始时间" class="form-control layer-date" id="'.$start_id.'">';
						$se.='<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>';
						$se.='<input placeholder="'.$value['2'].'结束时间" class="form-control layer-date" id="'.$end_id.'">';
						
						$middle_js.= "url+= '&{$start_id}='+\$('#{$start_id}').val();"."\n"; //拼装JS
						$middle_js.= "url+= '&{$end_id}='+\$('#{$end_id}').val();"."\n"; //拼装JS
						$ext_js = "
							  laydate({elem: '#{$start_id}', event: 'focus' });
  							  laydate({elem: '#{$end_id}', event: 'focus' });
            
						";
						break;

					default:
						$se.='<span>&nbsp;&nbsp;&nbsp;&nbsp;</span><input type="'.$value['1'].'" placeholder="'.$value['2'].'"  class="form-control" id="'.$value['0'].'">';
						break;
				}
				
				
			}
			$se.=      '</div>';
			$se.='<span>&nbsp;&nbsp;&nbsp;&nbsp;</span><button class="btn btn-sm btn-primary" type="submit" onclick="gridReload()"><strong>查 询</strong></button>';
			if($is_export){
				$se.='<span>&nbsp;&nbsp;&nbsp;&nbsp;</span><button class="btn btn-sm btn-primary" type="submit" onclick="gridexport()"><strong>导 出 </strong></button>';
				
				$export_js = "function gridexport(){
						{$middle_js}
						window.open(url+'&export=true');
				}";
			}
			$se.= '</div>';

			//生成 对应的查询JS 和 导出JS
			
            $search_js .= $middle_js;
            $search_js .="jQuery('#grid_table').jqGrid('setGridParam',{url:url,page:1}).trigger('reloadGrid');"."\n";
            $search_js .="}";

		}

		$colNames = array();
		$colModel = array();
		// 包装插件的时候  editoptions 后面的值不能前后不能带引号  所以后期JSON 序列化之后进行替换
		$editoption = array();
		foreach ($field as  $value) {
			$colNames[] = $value['1'];
			$tmp = array();
			$tmp['name'] = $value['0'];
			$tmp['index'] = $value['0'];
			$tmp['editable'] = isset($value['2']) ? $value['2'] : true;
			$tmp['width'] = isset($value['4']) ? $value['4'] : 60;
			$tmp['hidden'] = isset($value['3']) ? $value['3'] : false;
			if(in_array($value['5'],array('select_multiple','select','textarea'))){
				$tmp['edittype'] = $value['5'];
				$con = '';
				foreach ($value['6'] as  $k => $v) {
					if($con){
						$con .= ';'.$k.':'.$v;
					}else{
						$con .= $k.':'.$v;
					}
				}
				if($value['5'] == 'select_multiple'){
					$tmp['edittype'] = 'select';
					$select_size = count($value['6']); 
					if($select_size>10) $select_size = 10;
					$con = "{value:'$con',multiple:'multiple',size:$select_size}";
				}elseif($value['5'] == 'select'){
					$con = "{value:'$con'}";
				}elseif($value['5'] == 'textarea'){
					if($value['6']){
						$row = $value['6']['0'];
						$col = $value['6']['1'];
						$con = "{rows:'{$row}',cols:'{$col}'}";
					}else{
						$con = "{rows:'2',cols:'15'}";
					}
				}
				$md5_key = md5(json_encode($value));
				$tmp['editoptions'] = $md5_key;
				// 保存下来 方便序列化之后替换使用
				$editoption[$md5_key] = $con;
			}
			$colModel[] = $tmp;
		}
		
		$colNames = json_encode($colNames);
		$colModel = json_encode($colModel);
		foreach ($editoption as $key => $value) {
			$colModel = str_replace('"'.$key.'"', $value, $colModel);
		}
		// print_r($colModel);exit;

		//生成JS
		$js  = "<script>"."\n";
		$js .= "$(document).ready(function () {"."\n";
		$js .= "$.jgrid.defaults.styleUI = 'Bootstrap';";
		$js .="$('#grid_table').jqGrid({
                url:'{$data_url}',
                datatype: 'json',
                height: 420,
                autowidth: true,
                shrinkToFit: true,
                // rowNum: 100,
                rowList: [10, 20, 30],
                colNames: {$colNames},
                colModel: {$colModel},
                pager: '#grid_page',
                viewrecords: true,
                // caption: '组列表',  列表名
                // multiselect:true,  //多选
                add: true,
                edit: true,
                addtext: '添加',
                edittext: '修改',
                hidegrid: false,
                editurl:'{$op_url}'
            });"."\n";

		$js .= " $('#grid_table').jqGrid('navGrid', '#grid_page', 
                {   //常规参数
                edit: {$is_edit},
                add: {$is_add},
                del: {$is_del},
                search:false
            }{$edit_js}{$add_js}{$del_js}
            );

            // Add responsive to jqGrid
            $(window).bind('resize', function () {
                var width = $('.jqGrid_wrapper').width();
                $('#table_list_2').setGridWidth(width);
            });
        });

		{$search_js}
		{$export_js}
		{$ext_js}
        "."\n";

		$js .= "</script>";


		return array(
				'se'=>$se,
				'script'=>$js
			);

	}

	
}