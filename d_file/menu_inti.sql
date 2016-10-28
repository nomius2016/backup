CREATE TABLE `admin_menu` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `level` tinyint(2) unsigned NOT NULL COMMENT '菜单层级 0:顶级 1:一级 2:二级 3:三级',
  `parent_id` int(11) unsigned NOT NULL COMMENT '父菜单id',
  `title` varchar(30) NOT NULL COMMENT '菜单名',
  `is_reload` tinyint(1) NOT NULL DEFAULT '0' COMMENT '点击tab页是否自动reload 0:不自动reload 1:重新reload',
  `is_active` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否有效 1:有效 2:无效',
  `display_sort` tinyint(2) unsigned NOT NULL COMMENT '菜单显示排序',
  `controller` varchar(20) NOT NULL DEFAULT '' COMMENT '控制器名',
  `action` varchar(30) NOT NULL DEFAULT '' COMMENT '行为名',
  PRIMARY KEY (`id`),
  KEY `is_top` (`level`,`display_sort`) USING BTREE,
  KEY `idx_ac` (`controller`,`action`) USING BTREE,
  KEY `id` (`id`,`controller`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='后台菜单表';

TRUNCATE admin_menu;
##一级菜单
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(1,0,'会员管理',1,'','');  
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(1,0,'红利管理',2,'','');    
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(1,0,'提款模块',3,'','');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(1,0,'存款模块',4,'','');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(1,0,'消息管理',5,'','');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(1,0,'系统设定',6,'','');
##会员概况
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,1,'会员概况',1,'user','info');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,1,'用户列表',2,'user','lists');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,1,'联系方式导出',3,'user','contact_export');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,1,'投注记录查询',4,'user','betlog');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,1,'转账状态查询',5,'user','transfer_check');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,1,'会员帐变详情',6,'user','changelog');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,1,'转账记录',7,'user','transfer_list');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,1,'站内信记录',8,'user','message');
##红利管理
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,2,'红利记录',1,'bonus','list');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,2,'批量添加红利',2,'bonus','batch');
##提款模块
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,3,'提款初审',1,'withdrawal','first_list');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,3,'提款复审',2,'withdrawal','sec_list');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,3,'拒绝列表',3,'withdrawal','suc_list');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,3,'成功列表',4,'withdrawal','rej_list');
##存款模块
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,4,'存款初审',1,'deposit','first_list');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,4,'存款复审',2,'deposit','sec_list');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,4,'拒绝列表',3,'deposit','suc_list');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,4,'成功列表',4,'deposit','rej_list');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,4,'第三方',5,'deposit','online_list');
##消息管理
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,5,'前台公告',1,'msg','notice');
##系统设定
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,6,'管理员',1,'','');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,6,'后台菜单配置',2,'','');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,6,'邮件池',3,'','');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,6,'在线支付',4,'','');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,6,'系统常规配置',5,'system','basic_config');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,6,'平台相关设定',6,'','');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,6,'后台操作日志',7,'system','admin_log');
##运营数据
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,7,'概要数据',1,'marketdata','important_data');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,7,'存款记录',2,'marketdata','deposit');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,7,'提款记录',3,'marketdata','withdrawal');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,7,'红利记录',4,'marketdata','bonus');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,7,'第三方充值',5,'marketdata','online');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(2,7,'转账记录',6,'marketdata','transfer');
##三级菜单
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(3,27,'更换密码',1,'system','admin_pass');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(3,27,'用户列表',2,'system','admin_list');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(3,27,'用户权限管理',3,'system','admin_auth');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(3,27,'组别管理',4,'system','admin_group');

INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(3,28,'菜单列表',1,'system','menu');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(3,28,'菜单辅助功能',2,'system','menu_auth');

INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(3,29,'邮箱管理',1,'system','email');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(3,29,'邮箱列表',2,'system','email_list');

INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(3,30,'商户设置',1,'system','pay_merchant');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(3,30,'支付设置',2,'system','pay_config');

INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(3,32,'沙巴投注限额设置',1,'system','sb_limit');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(3,32,'AG盘口设置',2,'system','ag_setting');
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) VALUE(3,32,'平台转账访问设置',3,'system','platform_config');

##创建users表
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `account_name` varchar(30) NOT NULL DEFAULT '' COMMENT '用户名',
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '姓名',
  `sex` tinyint(4) NOT NULL DEFAULT '3' COMMENT '性别 1男 2女 3保密',
  `password` char(32) DEFAULT '' COMMENT '登录密码',
  `fund_password` char(32) DEFAULT '' COMMENT '资金密码',
  `withdrawal_day_max` decimal(12,0) NOT NULL DEFAULT '500000' COMMENT '当天累计最大提款金额',
  `withdrawal_min` decimal(12,0) NOT NULL DEFAULT '50' COMMENT '单次提款最低金额',
  `withdrawal_max` decimal(12,0) NOT NULL DEFAULT '200000' COMMENT '单次最大提款金额',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '1 未激活 2激活 3 冻结',
  `phone` char(11) DEFAULT '' COMMENT '手机号码',
  `email` varchar(100) DEFAULT '' COMMENT '邮箱地址',
  `agent_tree` varchar(50) DEFAULT '' COMMENT '上级代理号',
  `regiester_time` timestamp NULL DEFAULT '0000-00-00 00:00:00' COMMENT '注册时间',
  `updatetime` timestamp NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `balance` decimal(12,0) NOT NULL DEFAULT '0' COMMENT '中心钱包余额',
  `frozon_balance` decimal(12,0) NOT NULL DEFAULT '0' COMMENT '冻结金额',
  `ag_balance` decimal(12,0) NOT NULL DEFAULT '0' COMMENT 'AG余额',
  `sb_balance` decimal(12,0) NOT NULL DEFAULT '0' COMMENT 'SB余额',
  `pt_balance` decimal(12,0) NOT NULL DEFAULT '0' COMMENT 'PT余额',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_accountname` (`account_name`) USING BTREE,
  UNIQUE KEY `users_agenttree` (`agent_tree`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `users` VALUES ('1', 'zhangsan', '张三', '3', '', '', '500000', '50', '200000', '1', '13111111111', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0', '0', '0', '0');
