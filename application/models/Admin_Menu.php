<?php
/**
 * 管理员导航
 * @version 1.0
 * @license 
 * @copyright boma8.com
 * @link 
 * @author david
 */
class Admin_Menu extends Base_Model {
	public function __construct() {
		$this->setTableName("admin_menu");
		parent::__construct ();
	}
	
	/**
	 * 过滤菜单中不需要显示的
	 *
	 * @param string $menus
	 * @return boolean string
	 */
	private function __filterHiddenGroupTreeMenus($menus = NULL) {
		if (! is_array ( $menus ) || empty ( $menus )) {
			return false;
		}
		$menus;//????????下面这段代码是啥意思
		foreach ( $menus as $key => $menu ) {
			if (! ($menu ['hide'] === true)) {
				if (is_array ( $menu ['subMenus'] ) && ! empty ( $menu ['subMenus'] )) {
					foreach ( $menu as $sub_key => $sub_menu ) {
					}
				} else {
					// TOP级
					$tmp_menus [$key] = $menu;
				}
			}
		}
		$tmp_menus = $menus;
		foreach ( $menus as $menu_id => $menu ) {
			if (isset ( $menu ['hide'] ) && $menu ['hide'] === true) {
				unset ( $tmp_menus [$menu_id] );
			}
			foreach ( ( array ) $menu ['subMenus'] as $sub_menu_id => $sub_menu ) {
				if (isset ( $sub_menu ['hide'] ) && $sub_menu ['hide'] === true) {
					unset ( $tmp_menus [$menu_id] ['subMenus'] [$sub_menu_id] );
				}
				foreach ( ( array ) $sub_menu ['subMenus'] as $ss_menu_id => $ss_sub_menu ) {
					if (isset ( $ss_sub_menu ['hide'] ) && $ss_sub_menu ['hide'] === true) {
						unset ( $tmp_menus [$menu_id] ['subMenus'] [$sub_menu_id] ['subMenus'] [$ss_menu_id] );
					}
				}
			}
		}
		return $tmp_menus;
	}
	
	/**
	 * 为当前登录者渲染菜单
	 *
	 * @param string $admin_id
	 * @return NULL
	 */
	public function generateUserMenuContent($admin_id = NULL, $group_id = NULL) {
		//检查传入的参数
		$admin_id = intval ( $admin_id );
		$group_id = intval ( $group_id );
		if ($admin_id < 1 || $group_id < 1) {
			return null;
		}
		//根据组权限获取目录
		$menus = $this->getGroupTreeMenus ( $group_id );
		//过滤掉不显示的目录。。这段代码写的简直我都醉了
		$menus = $this->__filterHiddenGroupTreeMenus ( $menus );
		if (! is_array ( $menus ) || empty ( $menus )) {
			return null;
		}
		//循环输出内容
		$load_menus = array ();
		$content = "<ul class=\"main\">";
		foreach ( $menus as $menu_id => $menu ) {
			
			if (! empty ( $menu ['controller'] )) {
				$load_menus [$menu ['id']] = $menu;
			}
			$content .= "<li>";
			if (is_array ( $menu ['subMenus'] ) && ! empty ( $menu ['subMenus'] )) {

				$content .= "<h5><a href=\"javascript:;\">{$menu['title']}</a></h5>";
			} else {

				$url = "/admin/".$menu ['controller']."/".$menu ['action']."?_r=get";

				$content .= "<h5><a href=\"{$url}\" index=\"{$menu['id']}\" reload=\"{$menu['is_reload']}\">{$menu['title']}</a></h5>";
			}
			$content .= "<ul>";
			foreach ( ( array ) $menu ['subMenus'] as $sub_menu_id => $sub_menu ) {
				if (! empty ( $sub_menu ['controller'] )) {
					$load_menus [$sub_menu ['id']] = $sub_menu;
				}
				$content .= "<li>";
				if (is_array ( $sub_menu ['subMenus'] ) && ! empty ( $sub_menu ['subMenus'] )) {

					$content .= "<h6><a href=\"javascript:;\">{$sub_menu['title']}</a></h6>";
				} else {
					$url = "/admin/".$sub_menu ['controller']."/".$sub_menu ['action']."?_r=get";

					$content .= "<a href=\"{$url}\" index=\"{$sub_menu['id']}\" reload=\"{$sub_menu['is_reload']}\">{$sub_menu['title']}</a>";
				}
				$content .= "<ul>";
				foreach ( ( array ) $sub_menu ['subMenus'] as $ss_menu_id => $ss_sub_menu ) {
					if (! empty ( $ss_sub_menu ['controller'] )) {
						$load_menus [$ss_sub_menu ['id']] = $ss_sub_menu;
					}

					$url = "/admin/".$ss_sub_menu ['controller']."/".$ss_sub_menu ['action']."?_r=get";

					$content .= "<li><a href=\"{$url}\" index=\"{$ss_sub_menu['id']}\" reload=\"{$ss_sub_menu['is_reload']}\">{$ss_sub_menu['title']}</a></li>";
				}
				$content .= "</ul></li>";
			}
			$content .= "</ul></li>";
		}
		$content .= "</ul>";
		return array (
				'content' => $content,
				'load_tabs' => $load_menus 
		);
	}
	
	/**
	 * 获取菜单
	 *
	 * @return multitype:unknown
	 */
	public function getSystemMenus() {
		
		$tmp_menus = $this->selectAll ();
		//转换数据结构 将key名改为menu_id (估计是为了后面取值方便)
		$menus = array ();
		if (is_array ( $tmp_menus ) && ! empty ( $tmp_menus )) {
			foreach ( $tmp_menus as $k => $val ) {
				$menus [$val ['id']] = $val;
			}
		}
		return $menus;
	}
	
	/**
	 * 获取某个Group的菜单Tree
	 *
	 * @param string $group_id        	
	 * @return multitype:
	 */
	public function getGroupTreeMenus($group_id = NULL) {
		//返回值
		$group_menus = array ();
		//检查传入的参数
		$group_id = intval ( $group_id );
		if ($group_id < 1) {
			return $group_menus;
		}
		//执行查询
		//admin_menu_authority表
		/*[0] => Array
        (
            [id] => 15966
            [group_id] => 1 //组ID
            [menu_id] => 15 //菜单ID
            [is_readonly] => 0 // 0=只显示 1=只操作
        )*/
		$auth_menus = $this->menu_auth->selectAllByWhere ( array (
				"group_id" => $group_id 
		) );
		if (! is_array ( $auth_menus ) || empty ( $auth_menus )) {
			return $group_menus;
		};
		//转换数组格式 将数组的key 转为 menu_id 
		/*[15](中括号中的15是menu_id) => Array
        (
            [id] => 15966
            [group_id] => 1 //组ID
            [menu_id] => 15 //菜单ID
            [is_readonly] => 0 // 0=只显示 1=只操作
        )*/
		$menus_auth = array ();
		foreach ( $auth_menus as $v ) {
			$menus_auth [$v ['menu_id']] = $v;
		}
		///////////////////////////////////////
		//获取所有系统目录(树形结构)
		$system_tree_menus = $this->getSystemTreeMenus ();
		if (! is_array ( $system_tree_menus ) || empty ( $system_tree_menus )) {
			return $group_menus;
		}
		//获取所有系统目录(非树形结构)
		$system_menus = $this->getSystemMenus ();
		//我靠。这个变量是个啥意思？？？
		$linked_menu_ids = array ();
		//循环未修改数据结构的 根据组权限获取的目录ID
		foreach ( $auth_menus as $k => $auth_config ) {
			$tmp_linked_menu_ids = $this->processLinkedMenuIds ( $auth_config ['menu_id'], $system_menus );
			$linked_menu_ids = array_merge ( $tmp_linked_menu_ids, $linked_menu_ids );
		}
		if (empty ( $linked_menu_ids )) {
			return $group_menus;
		}
		/*这个变量 $linked_menu_ids 
		数据结构 [0] => 116
			    [1] => 111
			    [2] => 25
			    [3] => 115
			    [4] => 111
			    [5] => 25
			    [6] => 112.........真心没看懂啥意思
		*/
		//返回值 = 树形结构的所有目录
		$group_menus = $system_tree_menus;
		for($i = 0; $i < count ( $system_tree_menus ); $i ++) {
			// 处理权限
			//如果树形结构的menu(level1)的id存在于group_id已登记的目录中
			if (array_key_exists ( $system_tree_menus [$i] ['id'], $menus_auth )) {
				//增加一个字段 auth 值 = $menus_auth的一个关联数组(数据结构前面有)
				$group_menus [$i] ['auth'] = $menus_auth [$system_tree_menus [$i] ['id']];
				//增加一个字段 menus_auth里面的只读字段
				$group_menus [$i] ['is_readonly'] = $menus_auth [$system_tree_menus [$i] ['id']] ['is_readonly'];
			}
			//如果顶级菜单的id不在linked_menu_ids变量中出现
			if (! in_array ( $system_tree_menus [$i] ['id'], $linked_menu_ids )) {
				//增加一个字段 hide (大概是控制显示的字段 如果不出现 就hide)
				$group_menus [$i] ['hide'] = true;
				// unset ( $group_menus [$i] );
			//如果顶级菜单的id在linked_menu_ids变量中出现
			//对二级菜单和三级菜单做相同处理
			} else if (is_array ( $system_tree_menus [$i] ['subMenus'] ) && ! empty ( $system_tree_menus [$i] ['subMenus'] )) {
				// 二级菜单处理
				for($j = 0; $j < count ( $system_tree_menus [$i] ['subMenus'] ); $j ++) {
					
					// 处理权限
					if (array_key_exists ( $system_tree_menus [$i] ['subMenus'] [$j] ['id'], $menus_auth )) {
						$group_menus [$i] ['subMenus'] [$j] ['auth'] = $menus_auth [$system_tree_menus [$i] ['subMenus'] [$j] ['id']];
						$group_menus [$i] ['subMenus'] [$j] ['is_readonly'] = $menus_auth [$system_tree_menus [$i] ['subMenus'] [$j] ['id']] ['is_readonly'];
					}
					
					if (! in_array ( $system_tree_menus [$i] ['subMenus'] [$j] ['id'], $linked_menu_ids )) {
						// unset ( $group_menus [$i] ['subMenus'] [$j] );
						$group_menus [$i] ['subMenus'] [$j] ['hide'] = true;
					} else if (is_array ( $system_tree_menus [$i] ['subMenus'] [$j] ['subMenus'] ) && ! empty ( $system_tree_menus [$i] ['subMenus'] [$j] ['subMenus'] )) {
						// 三级菜单处理
						for($k = 0; $k < count ( $system_tree_menus [$i] ['subMenus'] [$j] ['subMenus'] ); $k ++) {
							
							// 处理权限
							if (array_key_exists ( $system_tree_menus [$i] ['subMenus'] [$j] ['subMenus'] [$k] ['id'], $menus_auth )) {
								$group_menus [$i] ['subMenus'] [$j] ['subMenus'] [$k] ['auth'] = $menus_auth [$system_tree_menus [$i] ['subMenus'] [$j] ['subMenus'] [$k] ['id']];
								$group_menus [$i] ['subMenus'] [$j] ['subMenus'] [$k] ['is_readonly'] = $menus_auth [$system_tree_menus [$i] ['subMenus'] [$j] ['subMenus'] [$k] ['id']] ['is_readonly'];
							}
							
							if (! in_array ( $system_tree_menus [$i] ['subMenus'] [$j] ['subMenus'] [$k] ['id'], $linked_menu_ids )) {
								// unset ( $group_menus [$i] ['subMenus'] [$j] ['subMenus'] [$k] );
								$group_menus [$i] ['subMenus'] [$j] ['subMenus'] [$k] ['hide'] = true;
							}
						}
					}
				}
			}
		}
		// print_r ( $group_menus );
		return $group_menus;
	}
	
	/**
	 * 根据menuId处理链式关系
	 *
	 * @param string $search_menu_id
	 * @param string $system_menus
	 * @return multitype:
	 */
	private function processLinkedMenus($search_menu_id = NULL, $system_menus = NULL) {
		$linked_menus = array ();
		$search_menu_id = intval ( $search_menu_id );
		if ($search_menu_id < 1) {
			return $linked_menus;
		}
		if (! is_array ( $system_menus ) || empty ( $system_menus )) {
			return $linked_menus;
		}
		if (array_key_exists ( $search_menu_id, $system_menus )) {
			// 三级菜单
			$three_menu = $system_menus [$search_menu_id];
			// 二级菜单
			if (intval ( $three_menu ['parent_id'] ) > 0 && array_key_exists ( $three_menu ['parent_id'], $system_menus )) {
				$second_menu = $system_menus [$three_menu ['parent_id']];
				if (intval ( $second_menu ['parent_id'] ) > 0 && array_key_exists ( $second_menu ['parent_id'], $system_menus )) {
					// 一级菜单
					$top_menu = $system_menus [$second_menu ['parent_id']];
					print_r ( $top_menu );
					$second_menu ['subMenus'] [] = $three_menu;
					$top_menu ['subMenus'] [] = $second_menu;
					$linked_menus = $top_menu;
				} else {
					$second_menu ['subMenus'] [] = $three_menu;
					$linked_menus = $second_menu;
				}
			} else {
				// 属一级菜单
				$linked_menus = $three_menu;
			}
		}
		return $linked_menus;
	}
	
	/**
	 * 根据menuId获得MenuIds
	 *
	 * @param string $search_menu_id
	 * @param string $system_menus
	 * @return multitype:
	 */
	private function processLinkedMenuIds($search_menu_id = NULL, $system_menus = NULL) {
		$linked_menu_ids = array ();
		$search_menu_id = intval ( $search_menu_id );
		if ($search_menu_id < 1) {
			return $linked_menu_ids;
		}
		if (! is_array ( $system_menus ) || empty ( $system_menus )) {
			return $linked_menu_ids;
		}
		$linked_menu_ids [$search_menu_id] = $search_menu_id;
		if (array_key_exists ( $search_menu_id, $system_menus )) {
			// 三级菜单
			$three_menu = $system_menus [$search_menu_id];
			$linked_menu_ids [$three_menu ['id']] = $three_menu ['id'];
			// 二级菜单
			if (intval ( $three_menu ['parent_id'] ) > 0 && array_key_exists ( $three_menu ['parent_id'], $system_menus )) {
				$second_menu = $system_menus [$three_menu ['parent_id']];
				$linked_menu_ids [$second_menu ['id']] = $second_menu ['id'];
				if (intval ( $second_menu ['parent_id'] ) > 0 && array_key_exists ( $second_menu ['parent_id'], $system_menus )) {
					// 一级菜单
					$top_menu = $system_menus [$second_menu ['parent_id']];
					$linked_menu_ids [$top_menu ['id']] = $top_menu ['id'];
				}
			}
		}
		return $linked_menu_ids;
	}
	
	/**
	 * 取得树状菜单
	 *
	 * @return multitype:
	 */
	public function getSystemTreeMenus() {
		//返回值
		$tree_menus = array ();
		//获取所有目录
		$all_menus = $this->getSystemMenus ();
		//如果获取失败。返回空
		if (! is_array ( $all_menus ) || empty ( $all_menus )) {
			return $tree_menus;
		}
		//将子目录递归处理后，再按照display_sort排序
		$menus = $this->recurseMenus ( 0, $all_menus );
		if (is_array ( $menus ) && ! empty ( $menus )) {
			foreach ( $menus as $k => $v ) {
				if (is_array ( $v ['subMenus'] ) && ! empty ( $v ['subMenus'] )) {
					// $v ['subNums'] = count ( $v ['subMenus'] );
					foreach ( $v ['subMenus'] as $sk => $sv ) {
						$v ['subNums'] ++;
						$v ['subTotalNums'] ++;
						if (is_array ( $sv ['subMenus'] ) && ! empty ( $sv ['subMenus'] )) {
							$sv ['subNums'] = count ( $sv ['subMenus'] );
							$v ['subTotalNums'] += count ( $sv ['subMenus'] );
						} else {
							$sv ['subNums'] = 0;
						}
						$v ['subMenus'] [$sk] = $sv;
					}
				} else {
					$v ['subNums'] = 0;
					$v ['subTotalNums'] = 0;
				}
				$menus [$k] = $v;
			}
		}
		// print_r ( $menus );
		return $menus;
	}
	
	/**
	 * 搜索子菜单（递归）
	 *
	 * @param string $parent_menu_id
	 * @param string $menus
	 * @return multitype:
	 */
	private function recurseMenus($parent_menu_id = NULL, $menus = NULL) {
		//检查参数
		$parent_menu_id = intval ( $parent_menu_id );
		if ($parent_menu_id < 0 || ! is_array ( $menus ) || empty ( $menus )) {
			return array ();
		}
		//递归处理
		foreach ( $menus as $k => $v ) {
			if (intval ( $v ['parent_id'] ) == intval ( $parent_menu_id )) {
				$v ['subMenus'] = $this->recurseMenus ( $v ['id'], $menus );
				$sub_menus [] = $v;
			}
		}
		//根据display_sort排序后返回
		return $this->treeSort ( $sub_menus );
	}
	
	/**
	 * 排序菜单
	 *
	 * @param unknown $menus        	
	 * @return unknown
	 */
	private function treeSort($menus) {
		if (! is_array ( $menus ) || empty ( $menus )) {
			return $menus;
		}
		foreach ( $menus as $k => $v ) {
			$sort_array [] = $v ['display_sort'];
		}
		array_multisort ( $sort_array, SORT_ASC, $menus );
		return $menus;
	}
	
	/**
	 * 渲染成模板
	 *
	 * @param string $menus        	
	 * @return NULL
	 */
	public function renderMenusContent($menus = NULL) {
		if (! is_array ( $menus ) || empty ( $menus )) {
			return null;
		}
		$table_header = <<<EOF
		<table width="100%" border="0">
		    <thead>
		      <tr>
		        <td colspan="3">功能模块划分</td>
		        <td width="50%">选择权限</td>
		      </tr>
		    </thead>
			<tbody>
EOF;
		$table_end = <<<EOF
		  </tbody>
		</table>
EOF;
		$table_body = "";
		foreach ( $menus as $k => $v ) {
			if ($v ['subTotalNums'] == 0) {
				// 直接一级菜单
				$auth = $this->renderAuthHtml ( $v ['id'], $v ['auth'] );
				$table_body .= <<<EOF
				      <tr>
					        <td colspan="3">{$v['title']}</td>
					        <td width="50%">{$auth}</td>
      				  </tr>
EOF;
			} else {
				// 拥有二菜单
				$sub_index = 1;
				foreach ( $v ['subMenus'] as $sk => $sv ) {
					$three_content = "";
					$auth_content = "";
					if (is_array ( $sv ['subMenus'] ) && ! empty ( $sv ['subMenus'] )) {
						$three_content = "<div class=\"table_list\"><table width=\"100%\" border=\"0\">";
						foreach ( $sv ['subMenus'] as $kk ) {
							$three_content .= "<tr><td>{$kk['title']}</td></tr>";
						}
						$three_content .= "</table></div>";
						
						$auth_content = "<div class=\"table_list\"><table width=\"100%\" border=\"0\">";
						foreach ( $sv ['subMenus'] as $kk ) {
							$auth = $this->renderAuthHtml ( $kk ['id'], $kk ['auth'] );
							$auth_content .= "<tr><td>{$auth}</td></tr>";
						}
						$auth_content .= "</table></div>";
					} else {
						$auth_content = $this->renderAuthHtml ( $sv ['id'], $sv ['auth'] );
					}
					// print_r($sv['subMenus']);
					// 二级菜单 不拥有三级菜单 需要判断是否第一个
					if ($sub_index == 1) {
						$table_body .= <<<EOF
								<tr>
							        <td rowspan="{$v['subNums']}">{$v['title']}</td>
							        <td>{$sv['title']}</td>
							        <td>{$three_content}</td>
							        <td width="50%">{$auth_content}</td>
								</tr>
EOF;
					} else {
						$table_body .= <<<EOF
						      <tr>
									<td>{$sv['title']}</td>
									<td>{$three_content}</td>
									<td>{$auth_content}</td>
						      </tr>
EOF;
					}
					
					++ $sub_index;
				}
			}
		}
		
		return $table_header . $table_body . $table_end;
	}
	
	/**
	 * 渲染权限
	 *
	 * @param string $id
	 * @param string $auth
	 * @return boolean string
	 */
	private function renderAuthHtml($id = NULL, $auth = NULL) {
		if ($id < 1) {
			return false;
		}
		if (is_array ( $auth ) && ! empty ( $auth )) {
			$content_html = "<input type=\"checkbox\" id=\"id_show_{$id}\" name=\"id_show_{$id}\" onchange=\"id_show({$id})\" />不显示&nbsp;&nbsp;";
			if ($auth ['is_readonly'] == 1) {
				$content_html .= "<input type=\"radio\" id=\"id_r_{$id}\" name=\"id_auth_{$id}\" onchange=\"id_r({$id})\" checked value=\"read\" />查看&nbsp;&nbsp;";
				$content_html .= "<input type=\"radio\" id=\"id_w_{$id}\" name=\"id_auth_{$id}\" onchange=\"id_w({$id})\" value=\"write\" />操作&nbsp;&nbsp;";
			} else {
				$content_html .= "<input type=\"radio\" id=\"id_r_{$id}\" name=\"id_auth_{$id}\" onchange=\"id_r({$id})\" value=\"read\" />查看&nbsp;&nbsp;";
				$content_html .= "<input type=\"radio\" id=\"id_w_{$id}\" name=\"id_auth_{$id}\" onchange=\"id_w({$id})\"  checked value=\"write\" />操作&nbsp;&nbsp;";
			}
		} else {
			$content_html = "<input type=\"checkbox\" id=\"id_show_{$id}\" name=\"id_show_{$id}\" onchange=\"id_show({$id})\" checked />不显示&nbsp;&nbsp;";
			$content_html .= "<input type=\"radio\" id=\"id_r_{$id}\" name=\"id_auth_{$id}\" onchange=\"id_r({$id})\"  value=\"read\" />查看&nbsp;&nbsp;";
			$content_html .= "<input type=\"radio\" id=\"id_w_{$id}\" name=\"id_auth_{$id}\" onchange=\"id_w({$id})\"  value=\"write\" />操作&nbsp;&nbsp;";
		}
		return $content_html;
	}
	
	/**
	 * 更新群组权限
	 *
	 * @param string $data        	
	 * @return multitype:boolean string
	 */
	public function updateGroupAuth($data = NULL) {
		$group_id = intval($data ['group_id']);
		
		if ($group_id < 1) {
			return array('status' => false,'message' => '参数错误');
		}

		if (!is_array($data)||empty($data)){
			return array('status' => false,'message' => '没有权限数据');
		}

		unset($data ['group_id']);
		$will_auth = array ();
		$menu_ids = array ();
		foreach ( $data as $k => $v ) {
			$menu_id = intval(str_replace ( "id_auth_", "", $k ));
			if ($menu_id > 0 && $v != "on") {
				//将要设置的权限
				$will_auth [$menu_id] = array ('menu_id' => $menu_id,'is_readonly' => $v == "read" ? 1 : 0);
				$menu_ids[] = $menu_id;
			}
		}
		$init_auth_status = true;

		//
		$this->amae->delete(array('group_id' => $group_id));

		$this->trans_begin ();
		try {
			// 第一步清除权限
			$this->menu_auth->delete(array('group_id' => $group_id ) );
			// 第二步加权限
			if (is_array ( $will_auth ) && ! empty ( $will_auth )) {
				foreach ( $will_auth as $menu_id => $auth_config ) {
					$this->menu_auth->insert ( array ('group_id' => $group_id,'menu_id' => $menu_id,'is_readonly' => $auth_config ['is_readonly']) );
				}
			}
			
			if(count($menu_ids) > 0){			
				$ama_infos = $this->ama->selectByWhereIn('admin_menu_id',$menu_ids,'*',NULL,array('admin_menu_id','asc') );
				foreach($ama_infos as $ama_info) {
					if(!empty($will_auth[$ama_info['admin_menu_id']])){
						if($will_auth[$ama_info['admin_menu_id']]['is_readonly'] == "write"){
							//如果画面上选择的是‘操作’，那需要插入所有数据
							$this->amae->insert ( array ('controller' => $ama_info['controller'],'action' => $ama_info['action'],'group_id' => $group_id));
						}else{
							//如果画面上选择的是‘查看’，只需要插入读action
							if($ama_info['op'] != 1){
								$this->amae->insert ( array ('controller' => $ama_info['controller'],'action' => $ama_info['action'],'group_id' => $group_id));
							}
						}
					}
				}
			}
			
			//几个特殊权限，救急用 hand coding，以后需要改进
			if($group_id == 4){
				$this->amae->insert ( array ('controller' => 'activity','action' => 'updateActivityIsClosed','group_id' => $group_id));
				$this->amae->insert ( array ('controller' => 'activity','action' => 'updateActivityIsPublished','group_id' => $group_id));
				$this->amae->insert ( array ('controller' => 'activity','action' => 'updateActivity','group_id' => $group_id));
				$this->amae->insert ( array ('controller' => 'activity','action' => 'getActivityEditview','group_id' => $group_id));
				$this->amae->insert ( array ('controller' => 'activity','action' => 'add_fake','group_id' => $group_id));
			}

			//只有风控部门 和充值中心的人员才能解锁红利
			if(in_array($group_id, array(9,10,11,21,22))){

				$this->amae->insert ( array ('controller' => 'userinfo','action' => 'unlockTradeInfo','group_id' => $group_id));
			}

			$this->trans_commit ();
		} catch ( Exception $e ) {
			$this->trans_rollback ();
			$init_auth_status = false;
		}

		return array('status' => $init_auth_status,'message' => $init_auth_status ? "保存权限成功！" : "保存权限失败，请重试！");
	}

	/**
	 * [genHplusMenu 生成HPLUS 的菜单]
	 * @return [type] [description]
	 */
	public function genHplusMenu(){
		$html = '';
		$treeMenu = $this->getSystemTreeMenus();
		foreach ($treeMenu as  $tree_first_level) { //第一层
			$html.='<li>';
			
			if(isset($tree_first_level['subMenus']) && $tree_first_level['subMenus']){  //有二级目录的情况
				$html.='<a href="#"><span class="nav-label">'.$tree_first_level['title'].'</span><span class="fa arrow"></span></a>';
				$html.='<ul class="nav nav-second-level">';

				foreach ($tree_first_level['subMenus'] as $tree_second_level){ //第二层
					
					if(isset($tree_second_level['subMenus']) && $tree_second_level['subMenus']){//第三层
						$html.= '<li><a href="#">'.$tree_second_level['title'].'<span class="fa arrow"></span></a><ul class="nav nav-third-level">';
						foreach ($tree_second_level['subMenus'] as $tree_third_level) {
							$url =  '/admin/'.$tree_third_level['controller'].'/'.$tree_third_level['action'];
							$html.='<li><a class="J_menuItem" href="'.$url.'">'.$tree_third_level['title'].'</a></li>';
						}
						$html.='</ul></li>';
						
					}else{ //只有二级菜单没有三级菜单的情况
						$url =  '/admin/'.$tree_second_level['controller'].'/'.$tree_second_level['action'];
						$html.='<li><a class="J_menuItem" href="'.$url.'">'.$tree_second_level['title'].'</a></li>';
					}
				
				}
				
				$html.='</ul>';
			}else{ //只有一级菜单的情况
				$url =  '/admin/'.$tree_first_level['controller'].'/'.$tree_first_level['action'];
				$html.='<a class="J_menuItem" href="'.$url.'" ><span class="nav-label">'.$tree_first_level['title'].'</span></span></a>';
			}

			$html.='</li>';

		}
		return $html;

	}

	/**
	 * [teamHtml 生成前台模板需要的 js 以及 搜索用的HTML]
	 * @return [type] [description]
	 */
	public function teamHtml(){

		$field = array(
                //字段名/显示名称/能否修改/是否显示/宽度
			array('id','ID'),
			array('title','菜单名称'),
			array('level','等级'),
			array('parent_id','父级ID'),
			array('display_sort','排序'),
			array('controller','控制器'),
			array('action','行为器')
		);

		$search = array(
			array('title','text','请输入菜单名称'),
			array('controller','text','请输入控制器名称'),
		);
		$data = array();
		$data['add'] = true;
		$data['edit'] = true;
		$data['del'] = true;
		$data['export'] = true;
		$data['field'] = $field;
		$data['search'] = $search;
		return $this->teamHplus($data);

	}

}