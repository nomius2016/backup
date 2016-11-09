<?php
/**
 * 管理员导航
 */
class Admin_Menu extends Base_Model {
		
	private $_group_id ;
	private $_getallmenu;
	public function __construct() {
		$this->setTableName("admin_menu");
		parent::__construct ();
		$this->_getallmenu = false;  //是否获取所有的菜单
		$this->load->model('admins');
		$admininfo = $this->admins->getLoginInfo();
		$this->_group_id = isset($admininfo['group_id']) ? $admininfo['group_id'] :0;
	}
	
	
	/**
	 * 获取用户能有权限的菜单
	 *
	 * @return
	 */
	public function getSystemMenus() {
		
		$tmp_menus = $this->selectAll ();
		//转换数据结构 将key名改为menu_id (估计是为了后面取值方便)
		$menus = array ();
		if(!$this->_getallmenu) $auth_ids = $this->getAuthMenu();
		if (is_array ( $tmp_menus ) && ! empty ( $tmp_menus )) {
			foreach ( $tmp_menus as $k => $val ) {
				if($this->_getallmenu){
					$menus [$val ['id']] = $val;
				}else{
					if(in_array($val['id'],$auth_ids) ){
						$menus [$val ['id']] = $val;
					}
				}
				
			}
		}
		return $menus;
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
	 * [getHideMenu 获取授权的菜单的ID]
	 * @return [type] [description]
	 */
	private function getAuthMenu(){
		
		//获取所有的菜单
		$all_menus = $this->selectAll();
		$all_menus_by_menuid = array();
		foreach ($all_menus as $value){
			$all_menus_by_menuid[$value['id']] = $value;
		}
		
		//查询 能看见能操作以及能查看的菜单
		$this->load->model('admin_menu_authority');
		$auth_menus = $this->admin_menu_authority->selectByWhere(array('group_id'=>$this->_group_id,'op >'=>1));
		
		$menu_auth_ids = array();
		foreach ($auth_menus as  $value) {
			$menu_auth_ids[] = $value['menu_id'];
		}

		//因为最多只有三个等级  所以 只需要累加两次就能把自己的父级全部添加进来
		foreach ($menu_auth_ids as  $menu_id) {
			$menu_auth_ids[] = $all_menus_by_menuid[$menu_id]['parent_id'];
		}

		$menu_auth_ids = array_unique($menu_auth_ids);

		foreach ($menu_auth_ids as  $menu_id) {
			$menu_auth_ids[] = $all_menus_by_menuid[$menu_id]['parent_id'];
		}

		$menu_auth_ids = array_unique($menu_auth_ids);

		return $menu_auth_ids;

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
				$html.='<a href="#" class="'.$tree_first_level['icon'].'"> <span class="nav-label">'.$tree_first_level['title'].'</span><span class="fa arrow"></span></a>';
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

	public function getAuthPageHtml(){
		$this->_getallmenu = true;
		$html = '';
		$treeMenu = $this->getSystemTreeMenus();

		foreach ($treeMenu as  $tree_first_level) { //第一层
			
			if(isset($tree_first_level['subMenus']) && $tree_first_level['subMenus']){  //有二级目录的情况
				$html.= $this->genTr($tree_first_level,TRUE);
				
				foreach ($tree_first_level['subMenus'] as $tree_second_level){ //第二层
					
					if(isset($tree_second_level['subMenus']) && $tree_second_level['subMenus']){//第三层
						$html.= $this->genTr($tree_second_level,TRUE);
						foreach ($tree_second_level['subMenus'] as $tree_third_level) {
							$html.= $this->genTr($tree_third_level);
						}
					}else{ //只有二级菜单没有三级菜单的情况
						$html.= $this->genTr($tree_second_level);
					}
				}
				
			}else{ //只有一级菜单的情况
				$html.= $this->genTr($tree_first_level);
			}
		}
		return $html;
	}

	private function genTr($data,$noradio = false){
		$name_id = $data['id'].'_auth_op';
		switch ($data['level']) {
			case 1:
				$ext = '';
				break;
			case 2:
				$ext = '<i class="fa fa-long-arrow-down"></i>';
				$ext.= '<i class="fa fa-minus"></i>';
				$ext.= '<i class="fa fa-minus"></i>';
				$ext.= '<i class="fa fa-minus"></i>';
				$ext.= '<i class="fa fa-minus"></i>';
				$ext.= '<i class="fa fa-minus"></i>';
				break;
			case 3:
				$ext = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
				$ext.= '<i class="fa fa-long-arrow-down"></i>';
				$ext.= '<i class="fa fa-minus"></i>';
				$ext.= '<i class="fa fa-minus"></i>';
				$ext.= '<i class="fa fa-minus"></i>';
				$ext.= '<i class="fa fa-minus"></i>';
				$ext.= '<i class="fa fa-minus"></i>';
				break;
		}

		if($noradio){
			$html=' <tr>
	                    <td>'.$ext.$data['title'].'</td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                </tr>';
		}else{
			$this->load->model('admin_menu_authority');
			$auth = $this->admin_menu_authority->selectByWhere(array('group_id'=>$this->_group_id,'menu_id'=>$data['id']));
			//判断那一个选中
			$op = $auth['0']['op'];
			$check = array('','','','');
			$check[$op] = "checked='checked'";
			// echo $op;exit;
			// echo $check[$op];exit;
			$html=' <tr>
	                    <td>'.$ext.$data['title'].'</td>
	                    <td><input type="radio" '.$check['1'].' value="1" name="'.$name_id.'"></td>
	                    <td><input type="radio" '.$check['2'].' value="2" name="'.$name_id.'"></td>
	                    <td><input type="radio" '.$check['3'].' value="3" name="'.$name_id.'"></td>
	                </tr>';
        }
        return $html;
	}

	/**
	 * [teamHtml 生成前台模板需要的 js 以及 搜索用的HTML]
	 * @return [type] [description]
	 */
	public function teamHtml(){

		$field = array(
                //字段名/显示名称/能否修改/是否隐藏/宽度/字段类型/参数
			array('id','ID',false),
			array('title','菜单名称'),
			array('level','等级',true,false,60,'select',array('1'=>'等级1','2'=>'等级2','3'=>'等级3')),
			array('parent_id','父级ID'),
			array('display_sort','排序'),
			array('controller','控制器'),
			array('action','行为器')
		);

		$search = array(
			array('title','text','请输入菜单名称'),
			array('controller','text','请输入控制器名称'),
			array('action','text','请输入行为器'),
			array('level','select',array('全部','等级1','等级2','等级3')),
		);
		$data = array();
		$data['export'] = true;
		$data['field'] = $field;
		$data['search'] = $search;
		$data['add'] = true;
		$data['del'] = true;
		$data['edit'] = true;
		return $this->teamHplus($data);

	}

	/**
	 * [getList 根据条件获取数据]
	 * @param  [type] $params [description]
	 * @return [type]         [description]
	 */
	function getList($params){
		$where = array();
		if($params['title']) $where['title'] = $params['title'];
		if($params['controller']) $where['controller'] = $params['controller'];
		if($params['action']) $where['action'] = $params['action'];
		if($params['level']) $where['level'] = $params['level'];

		$page = $params['page'] ? $params['page'] : 1;
		$pageSize =  $params['rows'] ? $params['rows'] : 20;
		$start = ($page - 1) * $pageSize; 
		
		$limit = isset($params['export']) ? array() : array($start,$pageSize);

		$list = $this->selectByWhere($where,'*',$limit,array('id','asc'));
		$count = $this->count($where);

		return array(
				'rows'=>$list,
				'total'=>ceil($count/$pageSize),
				'page'=>$page
			);
	}

}