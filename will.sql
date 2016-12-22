/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : backup

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2016-12-23 01:13:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin_menu`
-- ----------------------------
DROP TABLE IF EXISTS `admin_menu`;
CREATE TABLE `admin_menu` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `level` tinyint(2) unsigned NOT NULL COMMENT '菜单层级 0:顶级 1:一级 2:二级 3:三级',
  `parent_id` int(11) unsigned NOT NULL COMMENT '父菜单id',
  `title` varchar(30) DEFAULT NULL COMMENT '菜单名',
  `is_reload` tinyint(1) DEFAULT '0' COMMENT '点击tab页是否自动reload 0:不自动reload 1:重新reload',
  `display_sort` tinyint(2) unsigned DEFAULT NULL COMMENT '菜单显示排序',
  `controller` varchar(20) DEFAULT '' COMMENT '控制器名',
  `action` varchar(30) DEFAULT '' COMMENT '行为名',
  `icon` varchar(32) DEFAULT NULL COMMENT 'icon图标',
  PRIMARY KEY (`id`),
  KEY `is_top` (`level`,`display_sort`) USING BTREE,
  KEY `idx_ac` (`controller`,`action`) USING BTREE,
  KEY `id` (`id`,`controller`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8 COMMENT='后台菜单表';

-- ----------------------------
-- Records of admin_menu
-- ----------------------------
INSERT INTO `admin_menu` VALUES ('1', '1', '0', '会员管理', '0', '1', '', '', 'fa fa-user');
INSERT INTO `admin_menu` VALUES ('2', '1', '0', '活动管理', '0', '5', '', '', 'fa fa-calendar-check-o');
INSERT INTO `admin_menu` VALUES ('3', '1', '0', '提款模块', '0', '3', '', '', 'fa fa-euro');
INSERT INTO `admin_menu` VALUES ('4', '1', '0', '存款模块', '0', '2', '', '', 'fa fa-cny');
INSERT INTO `admin_menu` VALUES ('5', '1', '0', '交易查询', '0', '4', '', '', 'fa fa-btc');
INSERT INTO `admin_menu` VALUES ('6', '1', '0', '系统设定', '0', '6', '', '', 'fa fa-gear');
INSERT INTO `admin_menu` VALUES ('8', '2', '1', '用户列表', '0', '1', 'user', 'lists', null);
INSERT INTO `admin_menu` VALUES ('9', '2', '1', '联系方式导出', '0', '3', 'user', 'contact_export', null);
INSERT INTO `admin_menu` VALUES ('10', '2', '5', '投注记录', '0', '1', 'log', 'bet', null);
INSERT INTO `admin_menu` VALUES ('11', '2', '5', '转账状态查询', '0', '3', 'user', 'transfer_check', null);
INSERT INTO `admin_menu` VALUES ('13', '2', '5', '账变记录', '0', '2', 'log', 'fund', null);
INSERT INTO `admin_menu` VALUES ('14', '2', '1', '站内信记录', '0', '8', 'user', 'message', null);
INSERT INTO `admin_menu` VALUES ('15', '2', '2', '红利记录', '0', '1', 'bonus', 'lists', null);
INSERT INTO `admin_menu` VALUES ('16', '2', '2', '批量添加红利', '0', '2', 'bonus', 'batch', null);
INSERT INTO `admin_menu` VALUES ('17', '2', '3', '提款初审', '0', '1', 'withdrawal', 'first_list', null);
INSERT INTO `admin_menu` VALUES ('18', '2', '3', '提款复审', '0', '2', 'withdrawal', 'sec_list', null);
INSERT INTO `admin_menu` VALUES ('19', '2', '3', '拒绝列表', '0', '3', 'withdrawal', 'rej_list', null);
INSERT INTO `admin_menu` VALUES ('20', '2', '3', '成功列表', '0', '4', 'withdrawal', 'suc_list', null);
INSERT INTO `admin_menu` VALUES ('21', '2', '4', '存款初审', '0', '1', 'deposit', 'first_list', null);
INSERT INTO `admin_menu` VALUES ('22', '2', '4', '存款复审', '0', '2', 'deposit', 'sec_list', null);
INSERT INTO `admin_menu` VALUES ('23', '2', '4', '拒绝列表', '0', '3', 'deposit', 'rej_list', null);
INSERT INTO `admin_menu` VALUES ('24', '2', '4', '成功列表', '0', '4', 'deposit', 'suc_list', null);
INSERT INTO `admin_menu` VALUES ('26', '2', '2', '公告管理', '0', '1', 'msg', 'notice', null);
INSERT INTO `admin_menu` VALUES ('27', '2', '6', '后台权限管理', '0', '2', '', '', null);
INSERT INTO `admin_menu` VALUES ('28', '2', '6', '后台菜单配置', '0', '2', '', '', null);
INSERT INTO `admin_menu` VALUES ('29', '2', '6', '邮件池管理', '0', '3', '', '', null);
INSERT INTO `admin_menu` VALUES ('30', '2', '6', '充值支付管理', '0', '4', '', '', null);
INSERT INTO `admin_menu` VALUES ('31', '2', '6', '系统常规配置', '0', '1', 'system', 'setting', null);
INSERT INTO `admin_menu` VALUES ('32', '2', '6', '平台相关设定', '0', '6', '', '', null);
INSERT INTO `admin_menu` VALUES ('33', '2', '6', '后台操作日志', '0', '7', 'system', 'cplog', null);
INSERT INTO `admin_menu` VALUES ('34', '2', '54', '概要数据', '0', '1', 'report', 'summary', null);
INSERT INTO `admin_menu` VALUES ('35', '2', '54', '存款记录', '0', '2', 'deposit', 'suc_list', null);
INSERT INTO `admin_menu` VALUES ('36', '2', '54', '提款记录', '0', '3', 'withdrawal', 'suc_list', null);
INSERT INTO `admin_menu` VALUES ('38', '2', '54', '代理数据', '0', '2', 'report', 'agent', null);
INSERT INTO `admin_menu` VALUES ('41', '3', '27', '后台账号', '0', '2', 'system', 'admin_list', null);
INSERT INTO `admin_menu` VALUES ('43', '3', '27', '权限分组', '0', '4', 'system', 'admin_group', null);
INSERT INTO `admin_menu` VALUES ('44', '3', '28', '菜单列表', '0', '1', 'system', 'menu', null);
INSERT INTO `admin_menu` VALUES ('45', '3', '28', '菜单辅助功能', '0', '2', 'system', 'menu_auth', null);
INSERT INTO `admin_menu` VALUES ('46', '3', '29', '邮箱管理', '0', '1', 'system', 'email', null);
INSERT INTO `admin_menu` VALUES ('47', '3', '29', '邮箱列表', '0', '2', 'system', 'email_list', null);
INSERT INTO `admin_menu` VALUES ('48', '3', '30', '支付方式', '0', '1', 'system', 'pay_merchant', null);
INSERT INTO `admin_menu` VALUES ('49', '3', '30', '支付通道', '0', '2', 'system', 'pay_config', null);
INSERT INTO `admin_menu` VALUES ('50', '3', '32', '沙巴投注限额设置', '0', '1', 'system', 'sb_limit', null);
INSERT INTO `admin_menu` VALUES ('51', '3', '32', 'AG盘口设置', '0', '2', 'system', 'ag_setting', null);
INSERT INTO `admin_menu` VALUES ('52', '3', '32', '平台转账访问设置', '0', '3', 'system', 'platform_config', null);
INSERT INTO `admin_menu` VALUES ('54', '1', '0', '运营数据', '0', '7', '', '', 'fa fa-line-chart');
INSERT INTO `admin_menu` VALUES ('56', '2', '5', '交易测试', '0', '4', 'log', 'transation_test', null);
INSERT INTO `admin_menu` VALUES ('57', '2', '1', '用户提款卡管理', '0', '2', 'user', 'user_withdrawal_bankcards', null);

-- ----------------------------
-- Table structure for `admin_menu_actions`
-- ----------------------------
DROP TABLE IF EXISTS `admin_menu_actions`;
CREATE TABLE `admin_menu_actions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `admin_menu_id` tinyint(2) unsigned NOT NULL COMMENT '菜单ID',
  `controller` varchar(20) NOT NULL DEFAULT '' COMMENT '控制器名',
  `action` varchar(30) NOT NULL DEFAULT '' COMMENT '行为名',
  `desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `is_amid` (`admin_menu_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COMMENT='菜单操作权限表';

-- ----------------------------
-- Records of admin_menu_actions
-- ----------------------------
INSERT INTO `admin_menu_actions` VALUES ('1', '43', 'system', 'admin_auth_formop', '授权管理操作权限');
INSERT INTO `admin_menu_actions` VALUES ('2', '45', 'system', 'menu_auth_op', '菜单辅助功能操作权限');
INSERT INTO `admin_menu_actions` VALUES ('3', '41', 'system', 'admin_list_op', '管理员用户列表操作权限');
INSERT INTO `admin_menu_actions` VALUES ('4', '44', 'system', 'menu_op', '菜单列表操作权限');
INSERT INTO `admin_menu_actions` VALUES ('5', '16', 'bonus', 'batch_upload', '批量添加红利操作权限');
INSERT INTO `admin_menu_actions` VALUES ('6', '17', 'withdrawal', 'first_list_op', '提款初审操作权限');
INSERT INTO `admin_menu_actions` VALUES ('7', '18', 'withdrawal', 'sec_list_op', '提款复审操作权限');
INSERT INTO `admin_menu_actions` VALUES ('8', '22', 'deposit', 'sec_list_op', '存款复审操作权限');
INSERT INTO `admin_menu_actions` VALUES ('9', '21', 'deposit', 'first_list_op', '存款初审操作权限');
INSERT INTO `admin_menu_actions` VALUES ('10', '8', 'user', 'info', '用户概况页面');
INSERT INTO `admin_menu_actions` VALUES ('12', '43', 'system', 'admin_auth', '授权管理页面');
INSERT INTO `admin_menu_actions` VALUES ('13', '48', 'system', 'pay_config_op', '添加支付渠道');
INSERT INTO `admin_menu_actions` VALUES ('14', '48', 'system', 'pay_merchant_op', '添加支付商户号');
INSERT INTO `admin_menu_actions` VALUES ('15', '8', 'user', 'set_restrict', '设置用户限制/约束接口');
INSERT INTO `admin_menu_actions` VALUES ('16', '8', 'user', 'lists_op', '编制账号信息');
INSERT INTO `admin_menu_actions` VALUES ('17', '55', 'system', 'bank_cards_op', '银行卡列表操作权限');
INSERT INTO `admin_menu_actions` VALUES ('18', '43', 'system', 'admin_auth', '授权管理页面');
INSERT INTO `admin_menu_actions` VALUES ('19', '46', 'system', 'email_op', '邮箱管理操作全系');
INSERT INTO `admin_menu_actions` VALUES ('20', '34', 'report', 'dashboard', '仪表盘');
INSERT INTO `admin_menu_actions` VALUES ('21', '48', 'system', 'password', '管理员改密码');
INSERT INTO `admin_menu_actions` VALUES ('22', '8', 'user', 'set_balance', '表变用户余额');
INSERT INTO `admin_menu_actions` VALUES ('23', '31', 'system', 'setting_op', '更改全局变量值');
INSERT INTO `admin_menu_actions` VALUES ('24', '57', 'user', 'user_withdrawal_bankcards_op', '用户提款卡操作权限');

-- ----------------------------
-- Table structure for `admin_menu_auth`
-- ----------------------------
DROP TABLE IF EXISTS `admin_menu_auth`;
CREATE TABLE `admin_menu_auth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `controller` varchar(20) NOT NULL COMMENT '控制器名称',
  `action` varchar(30) NOT NULL COMMENT '行为器',
  `group_id` int(11) NOT NULL DEFAULT '0' COMMENT '组id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2153 DEFAULT CHARSET=utf8 COMMENT='后台权限控制表';

-- ----------------------------
-- Records of admin_menu_auth
-- ----------------------------
INSERT INTO `admin_menu_auth` VALUES ('85', 'user', 'lists', '3');
INSERT INTO `admin_menu_auth` VALUES ('86', 'user', 'info', '3');
INSERT INTO `admin_menu_auth` VALUES ('87', 'user', 'contact_export', '3');
INSERT INTO `admin_menu_auth` VALUES ('88', 'user', 'betlog', '3');
INSERT INTO `admin_menu_auth` VALUES ('89', 'user', 'transfer_check', '3');
INSERT INTO `admin_menu_auth` VALUES ('90', 'user', 'changelog', '3');
INSERT INTO `admin_menu_auth` VALUES ('91', 'user', 'transfer_list', '3');
INSERT INTO `admin_menu_auth` VALUES ('92', 'user', 'message', '3');
INSERT INTO `admin_menu_auth` VALUES ('93', 'bonus', 'lists', '3');
INSERT INTO `admin_menu_auth` VALUES ('94', 'bonus', 'batch', '3');
INSERT INTO `admin_menu_auth` VALUES ('95', 'withdrawal', 'first_list', '3');
INSERT INTO `admin_menu_auth` VALUES ('96', 'withdrawal', 'sec_list', '3');
INSERT INTO `admin_menu_auth` VALUES ('97', 'withdrawal', 'rej_list', '3');
INSERT INTO `admin_menu_auth` VALUES ('98', 'withdrawal', 'suc_list', '3');
INSERT INTO `admin_menu_auth` VALUES ('99', 'deposit', 'first_list', '3');
INSERT INTO `admin_menu_auth` VALUES ('100', 'deposit', 'sec_list', '3');
INSERT INTO `admin_menu_auth` VALUES ('101', 'deposit', 'rej_list', '3');
INSERT INTO `admin_menu_auth` VALUES ('102', 'deposit', 'suc_list', '3');
INSERT INTO `admin_menu_auth` VALUES ('103', 'deposit', 'online_list', '3');
INSERT INTO `admin_menu_auth` VALUES ('104', 'msg', 'notice', '3');
INSERT INTO `admin_menu_auth` VALUES ('105', 'system', 'admin_pass', '3');
INSERT INTO `admin_menu_auth` VALUES ('106', 'system', 'admin_list', '3');
INSERT INTO `admin_menu_auth` VALUES ('107', 'system', 'admin_auth', '3');
INSERT INTO `admin_menu_auth` VALUES ('108', 'system', 'admin_group', '3');
INSERT INTO `admin_menu_auth` VALUES ('109', 'system', 'menu', '3');
INSERT INTO `admin_menu_auth` VALUES ('110', 'system', 'menu_auth', '3');
INSERT INTO `admin_menu_auth` VALUES ('111', 'system', 'menu_auth_op', '3');
INSERT INTO `admin_menu_auth` VALUES ('112', 'system', 'email', '3');
INSERT INTO `admin_menu_auth` VALUES ('113', 'system', 'email_list', '3');
INSERT INTO `admin_menu_auth` VALUES ('114', 'system', 'pay_merchant', '3');
INSERT INTO `admin_menu_auth` VALUES ('115', 'system', 'pay_config', '3');
INSERT INTO `admin_menu_auth` VALUES ('116', 'system', 'basic_config', '3');
INSERT INTO `admin_menu_auth` VALUES ('117', 'system', 'sb_limit', '3');
INSERT INTO `admin_menu_auth` VALUES ('118', 'system', 'ag_setting', '3');
INSERT INTO `admin_menu_auth` VALUES ('119', 'system', 'platform_config', '3');
INSERT INTO `admin_menu_auth` VALUES ('120', 'system', 'admin_log', '3');
INSERT INTO `admin_menu_auth` VALUES ('121', 'marketdata', 'important_data', '3');
INSERT INTO `admin_menu_auth` VALUES ('122', 'marketdata', 'deposit', '3');
INSERT INTO `admin_menu_auth` VALUES ('123', 'marketdata', 'withdrawal', '3');
INSERT INTO `admin_menu_auth` VALUES ('124', 'marketdata', 'bonus', '3');
INSERT INTO `admin_menu_auth` VALUES ('125', 'marketdata', 'online', '3');
INSERT INTO `admin_menu_auth` VALUES ('126', 'marketdata', 'transfer', '3');
INSERT INTO `admin_menu_auth` VALUES ('2095', 'user', 'lists', '1');
INSERT INTO `admin_menu_auth` VALUES ('2096', 'user', 'info', '1');
INSERT INTO `admin_menu_auth` VALUES ('2097', 'user', 'set_restrict', '1');
INSERT INTO `admin_menu_auth` VALUES ('2098', 'user', 'lists_op', '1');
INSERT INTO `admin_menu_auth` VALUES ('2099', 'user', 'set_balance', '1');
INSERT INTO `admin_menu_auth` VALUES ('2100', 'user', 'user_withdrawal_bankcards', '1');
INSERT INTO `admin_menu_auth` VALUES ('2101', 'user', 'user_withdrawal_bankcards_op', '1');
INSERT INTO `admin_menu_auth` VALUES ('2102', 'user', 'contact_export', '1');
INSERT INTO `admin_menu_auth` VALUES ('2103', 'user', 'message', '1');
INSERT INTO `admin_menu_auth` VALUES ('2104', 'deposit', 'first_list', '1');
INSERT INTO `admin_menu_auth` VALUES ('2105', 'deposit', 'first_list_op', '1');
INSERT INTO `admin_menu_auth` VALUES ('2106', 'deposit', 'sec_list', '1');
INSERT INTO `admin_menu_auth` VALUES ('2107', 'deposit', 'sec_list_op', '1');
INSERT INTO `admin_menu_auth` VALUES ('2108', 'deposit', 'rej_list', '1');
INSERT INTO `admin_menu_auth` VALUES ('2109', 'deposit', 'suc_list', '1');
INSERT INTO `admin_menu_auth` VALUES ('2110', 'withdrawal', 'first_list', '1');
INSERT INTO `admin_menu_auth` VALUES ('2111', 'withdrawal', 'first_list_op', '1');
INSERT INTO `admin_menu_auth` VALUES ('2112', 'withdrawal', 'sec_list', '1');
INSERT INTO `admin_menu_auth` VALUES ('2113', 'withdrawal', 'sec_list_op', '1');
INSERT INTO `admin_menu_auth` VALUES ('2114', 'withdrawal', 'rej_list', '1');
INSERT INTO `admin_menu_auth` VALUES ('2115', 'withdrawal', 'suc_list', '1');
INSERT INTO `admin_menu_auth` VALUES ('2116', 'log', 'bet', '1');
INSERT INTO `admin_menu_auth` VALUES ('2117', 'log', 'fund', '1');
INSERT INTO `admin_menu_auth` VALUES ('2118', 'user', 'transfer_check', '1');
INSERT INTO `admin_menu_auth` VALUES ('2119', 'log', 'transation_test', '1');
INSERT INTO `admin_menu_auth` VALUES ('2120', 'bonus', 'lists', '1');
INSERT INTO `admin_menu_auth` VALUES ('2121', 'msg', 'notice', '1');
INSERT INTO `admin_menu_auth` VALUES ('2122', 'bonus', 'batch', '1');
INSERT INTO `admin_menu_auth` VALUES ('2123', 'bonus', 'batch_upload', '1');
INSERT INTO `admin_menu_auth` VALUES ('2124', 'system', 'setting', '1');
INSERT INTO `admin_menu_auth` VALUES ('2125', 'system', 'setting_op', '1');
INSERT INTO `admin_menu_auth` VALUES ('2126', 'system', 'admin_list', '1');
INSERT INTO `admin_menu_auth` VALUES ('2127', 'system', 'admin_list_op', '1');
INSERT INTO `admin_menu_auth` VALUES ('2128', 'system', 'admin_group', '1');
INSERT INTO `admin_menu_auth` VALUES ('2129', 'system', 'admin_auth_formop', '1');
INSERT INTO `admin_menu_auth` VALUES ('2130', 'system', 'admin_auth', '1');
INSERT INTO `admin_menu_auth` VALUES ('2131', 'system', 'admin_auth', '1');
INSERT INTO `admin_menu_auth` VALUES ('2132', 'system', 'menu', '1');
INSERT INTO `admin_menu_auth` VALUES ('2133', 'system', 'menu_op', '1');
INSERT INTO `admin_menu_auth` VALUES ('2134', 'system', 'menu_auth', '1');
INSERT INTO `admin_menu_auth` VALUES ('2135', 'system', 'menu_auth_op', '1');
INSERT INTO `admin_menu_auth` VALUES ('2136', 'system', 'email', '1');
INSERT INTO `admin_menu_auth` VALUES ('2137', 'system', 'email_op', '1');
INSERT INTO `admin_menu_auth` VALUES ('2138', 'system', 'email_list', '1');
INSERT INTO `admin_menu_auth` VALUES ('2139', 'system', 'pay_merchant', '1');
INSERT INTO `admin_menu_auth` VALUES ('2140', 'system', 'pay_config_op', '1');
INSERT INTO `admin_menu_auth` VALUES ('2141', 'system', 'pay_merchant_op', '1');
INSERT INTO `admin_menu_auth` VALUES ('2142', 'system', 'password', '1');
INSERT INTO `admin_menu_auth` VALUES ('2143', 'system', 'pay_config', '1');
INSERT INTO `admin_menu_auth` VALUES ('2144', 'system', 'sb_limit', '1');
INSERT INTO `admin_menu_auth` VALUES ('2145', 'system', 'ag_setting', '1');
INSERT INTO `admin_menu_auth` VALUES ('2146', 'system', 'platform_config', '1');
INSERT INTO `admin_menu_auth` VALUES ('2147', 'system', 'cplog', '1');
INSERT INTO `admin_menu_auth` VALUES ('2148', 'report', 'summary', '1');
INSERT INTO `admin_menu_auth` VALUES ('2149', 'report', 'dashboard', '1');
INSERT INTO `admin_menu_auth` VALUES ('2150', 'deposit', 'suc_list', '1');
INSERT INTO `admin_menu_auth` VALUES ('2151', 'report', 'agent', '1');
INSERT INTO `admin_menu_auth` VALUES ('2152', 'withdrawal', 'suc_list', '1');

-- ----------------------------
-- Table structure for `admin_menu_authority`
-- ----------------------------
DROP TABLE IF EXISTS `admin_menu_authority`;
CREATE TABLE `admin_menu_authority` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '后台组id',
  `menu_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '菜单id',
  `op` smallint(1) unsigned NOT NULL DEFAULT '0' COMMENT '1 隐藏 2查看 3操作',
  PRIMARY KEY (`id`),
  KEY `idx_gm` (`group_id`,`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1677 DEFAULT CHARSET=utf8 COMMENT='后台用户权限设置表';

-- ----------------------------
-- Records of admin_menu_authority
-- ----------------------------
INSERT INTO `admin_menu_authority` VALUES ('42', '3', '8', '3');
INSERT INTO `admin_menu_authority` VALUES ('43', '3', '7', '3');
INSERT INTO `admin_menu_authority` VALUES ('44', '3', '9', '3');
INSERT INTO `admin_menu_authority` VALUES ('45', '3', '10', '3');
INSERT INTO `admin_menu_authority` VALUES ('46', '3', '11', '3');
INSERT INTO `admin_menu_authority` VALUES ('47', '3', '12', '3');
INSERT INTO `admin_menu_authority` VALUES ('48', '3', '13', '3');
INSERT INTO `admin_menu_authority` VALUES ('49', '3', '14', '3');
INSERT INTO `admin_menu_authority` VALUES ('50', '3', '15', '3');
INSERT INTO `admin_menu_authority` VALUES ('51', '3', '16', '3');
INSERT INTO `admin_menu_authority` VALUES ('52', '3', '17', '3');
INSERT INTO `admin_menu_authority` VALUES ('53', '3', '18', '3');
INSERT INTO `admin_menu_authority` VALUES ('54', '3', '19', '3');
INSERT INTO `admin_menu_authority` VALUES ('55', '3', '20', '3');
INSERT INTO `admin_menu_authority` VALUES ('56', '3', '21', '3');
INSERT INTO `admin_menu_authority` VALUES ('57', '3', '22', '3');
INSERT INTO `admin_menu_authority` VALUES ('58', '3', '23', '3');
INSERT INTO `admin_menu_authority` VALUES ('59', '3', '24', '3');
INSERT INTO `admin_menu_authority` VALUES ('60', '3', '25', '3');
INSERT INTO `admin_menu_authority` VALUES ('61', '3', '26', '3');
INSERT INTO `admin_menu_authority` VALUES ('62', '3', '40', '3');
INSERT INTO `admin_menu_authority` VALUES ('63', '3', '41', '3');
INSERT INTO `admin_menu_authority` VALUES ('64', '3', '42', '3');
INSERT INTO `admin_menu_authority` VALUES ('65', '3', '43', '3');
INSERT INTO `admin_menu_authority` VALUES ('66', '3', '44', '3');
INSERT INTO `admin_menu_authority` VALUES ('67', '3', '45', '3');
INSERT INTO `admin_menu_authority` VALUES ('68', '3', '46', '3');
INSERT INTO `admin_menu_authority` VALUES ('69', '3', '47', '3');
INSERT INTO `admin_menu_authority` VALUES ('70', '3', '48', '3');
INSERT INTO `admin_menu_authority` VALUES ('71', '3', '49', '3');
INSERT INTO `admin_menu_authority` VALUES ('72', '3', '31', '3');
INSERT INTO `admin_menu_authority` VALUES ('73', '3', '50', '3');
INSERT INTO `admin_menu_authority` VALUES ('74', '3', '51', '3');
INSERT INTO `admin_menu_authority` VALUES ('75', '3', '52', '3');
INSERT INTO `admin_menu_authority` VALUES ('76', '3', '33', '3');
INSERT INTO `admin_menu_authority` VALUES ('77', '3', '34', '3');
INSERT INTO `admin_menu_authority` VALUES ('78', '3', '35', '3');
INSERT INTO `admin_menu_authority` VALUES ('79', '3', '36', '3');
INSERT INTO `admin_menu_authority` VALUES ('80', '3', '37', '3');
INSERT INTO `admin_menu_authority` VALUES ('81', '3', '38', '3');
INSERT INTO `admin_menu_authority` VALUES ('82', '3', '39', '3');
INSERT INTO `admin_menu_authority` VALUES ('1641', '1', '8', '3');
INSERT INTO `admin_menu_authority` VALUES ('1642', '1', '57', '3');
INSERT INTO `admin_menu_authority` VALUES ('1643', '1', '9', '3');
INSERT INTO `admin_menu_authority` VALUES ('1644', '1', '14', '3');
INSERT INTO `admin_menu_authority` VALUES ('1645', '1', '21', '3');
INSERT INTO `admin_menu_authority` VALUES ('1646', '1', '22', '3');
INSERT INTO `admin_menu_authority` VALUES ('1647', '1', '23', '3');
INSERT INTO `admin_menu_authority` VALUES ('1648', '1', '24', '3');
INSERT INTO `admin_menu_authority` VALUES ('1649', '1', '17', '3');
INSERT INTO `admin_menu_authority` VALUES ('1650', '1', '18', '3');
INSERT INTO `admin_menu_authority` VALUES ('1651', '1', '19', '3');
INSERT INTO `admin_menu_authority` VALUES ('1652', '1', '20', '3');
INSERT INTO `admin_menu_authority` VALUES ('1653', '1', '10', '3');
INSERT INTO `admin_menu_authority` VALUES ('1654', '1', '13', '3');
INSERT INTO `admin_menu_authority` VALUES ('1655', '1', '11', '3');
INSERT INTO `admin_menu_authority` VALUES ('1656', '1', '56', '3');
INSERT INTO `admin_menu_authority` VALUES ('1657', '1', '15', '3');
INSERT INTO `admin_menu_authority` VALUES ('1658', '1', '26', '3');
INSERT INTO `admin_menu_authority` VALUES ('1659', '1', '16', '3');
INSERT INTO `admin_menu_authority` VALUES ('1660', '1', '31', '3');
INSERT INTO `admin_menu_authority` VALUES ('1661', '1', '41', '3');
INSERT INTO `admin_menu_authority` VALUES ('1662', '1', '43', '3');
INSERT INTO `admin_menu_authority` VALUES ('1663', '1', '44', '3');
INSERT INTO `admin_menu_authority` VALUES ('1664', '1', '45', '3');
INSERT INTO `admin_menu_authority` VALUES ('1665', '1', '46', '3');
INSERT INTO `admin_menu_authority` VALUES ('1666', '1', '47', '3');
INSERT INTO `admin_menu_authority` VALUES ('1667', '1', '48', '3');
INSERT INTO `admin_menu_authority` VALUES ('1668', '1', '49', '3');
INSERT INTO `admin_menu_authority` VALUES ('1669', '1', '50', '3');
INSERT INTO `admin_menu_authority` VALUES ('1670', '1', '51', '3');
INSERT INTO `admin_menu_authority` VALUES ('1671', '1', '52', '3');
INSERT INTO `admin_menu_authority` VALUES ('1672', '1', '33', '3');
INSERT INTO `admin_menu_authority` VALUES ('1673', '1', '34', '3');
INSERT INTO `admin_menu_authority` VALUES ('1674', '1', '35', '3');
INSERT INTO `admin_menu_authority` VALUES ('1675', '1', '38', '3');
INSERT INTO `admin_menu_authority` VALUES ('1676', '1', '36', '3');

-- ----------------------------
-- Table structure for `bank_cards`
-- ----------------------------
DROP TABLE IF EXISTS `bank_cards`;
CREATE TABLE `bank_cards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '卡主姓名',
  `bank_code` varchar(10) NOT NULL DEFAULT '' COMMENT 'ICBC ABC CMB CCB COMM BOC CEB CMBC CITIC SZPAB SPDB CIB',
  `bank_name` varchar(50) DEFAULT NULL COMMENT '银行名称',
  `account_no` varchar(30) NOT NULL DEFAULT '' COMMENT '银行卡号',
  `display_name` varchar(40) NOT NULL DEFAULT '' COMMENT '显示名称',
  `branch_name` varchar(50) DEFAULT NULL COMMENT '银行分支名称',
  `create_time` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态 1 启用 -1禁用 ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8 COMMENT='用户银行卡';

-- ----------------------------
-- Records of bank_cards
-- ----------------------------
INSERT INTO `bank_cards` VALUES ('124', '22', '昂山', 'ICBC', '工商银行', '123341234134', '工行一', '福建支行', '2016-12-23 00:45:43', '1');
