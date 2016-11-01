/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50515
Source Host           : localhost:3306
Source Database       : backup

Target Server Type    : MYSQL
Target Server Version : 50515
File Encoding         : 65001

Date: 2016-11-01 16:42:08
*/

SET FOREIGN_KEY_CHECKS=0;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='菜单操作权限表';

-- ----------------------------
-- Records of admin_menu_actions
-- ----------------------------
INSERT INTO `admin_menu_actions` VALUES ('1', '42', 'system', 'admin_auth_formop', '授权管理操作权限');
INSERT INTO `admin_menu_actions` VALUES ('2', '45', 'system', 'menu_auth_op', '菜单辅助功能操作权限');
INSERT INTO `admin_menu_actions` VALUES ('3', '41', 'system', 'admin_list_op', '管理员用户列表操作权限');

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
) ENGINE=InnoDB AUTO_INCREMENT=432 DEFAULT CHARSET=utf8 COMMENT='后台权限控制表';

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
INSERT INTO `admin_menu_auth` VALUES ('394', 'user', 'info', '1');
INSERT INTO `admin_menu_auth` VALUES ('395', 'user', 'betlog', '1');
INSERT INTO `admin_menu_auth` VALUES ('396', 'bonus', 'lists', '1');
INSERT INTO `admin_menu_auth` VALUES ('397', 'bonus', 'batch', '1');
INSERT INTO `admin_menu_auth` VALUES ('398', 'withdrawal', 'first_list', '1');
INSERT INTO `admin_menu_auth` VALUES ('399', 'withdrawal', 'sec_list', '1');
INSERT INTO `admin_menu_auth` VALUES ('400', 'withdrawal', 'rej_list', '1');
INSERT INTO `admin_menu_auth` VALUES ('401', 'withdrawal', 'suc_list', '1');
INSERT INTO `admin_menu_auth` VALUES ('402', 'deposit', 'first_list', '1');
INSERT INTO `admin_menu_auth` VALUES ('403', 'deposit', 'sec_list', '1');
INSERT INTO `admin_menu_auth` VALUES ('404', 'deposit', 'rej_list', '1');
INSERT INTO `admin_menu_auth` VALUES ('405', 'deposit', 'suc_list', '1');
INSERT INTO `admin_menu_auth` VALUES ('406', 'deposit', 'online_list', '1');
INSERT INTO `admin_menu_auth` VALUES ('407', 'msg', 'notice', '1');
INSERT INTO `admin_menu_auth` VALUES ('408', 'system', 'admin_pass', '1');
INSERT INTO `admin_menu_auth` VALUES ('409', 'system', 'admin_list', '1');
INSERT INTO `admin_menu_auth` VALUES ('410', 'system', 'admin_list_op', '1');
INSERT INTO `admin_menu_auth` VALUES ('411', 'system', 'admin_auth', '1');
INSERT INTO `admin_menu_auth` VALUES ('412', 'system', 'admin_auth_formop', '1');
INSERT INTO `admin_menu_auth` VALUES ('413', 'system', 'admin_group', '1');
INSERT INTO `admin_menu_auth` VALUES ('414', 'system', 'menu', '1');
INSERT INTO `admin_menu_auth` VALUES ('415', 'system', 'menu_auth', '1');
INSERT INTO `admin_menu_auth` VALUES ('416', 'system', 'menu_auth_op', '1');
INSERT INTO `admin_menu_auth` VALUES ('417', 'system', 'email', '1');
INSERT INTO `admin_menu_auth` VALUES ('418', 'system', 'email_list', '1');
INSERT INTO `admin_menu_auth` VALUES ('419', 'system', 'pay_merchant', '1');
INSERT INTO `admin_menu_auth` VALUES ('420', 'system', 'pay_config', '1');
INSERT INTO `admin_menu_auth` VALUES ('421', 'system', 'basic_config', '1');
INSERT INTO `admin_menu_auth` VALUES ('422', 'system', 'sb_limit', '1');
INSERT INTO `admin_menu_auth` VALUES ('423', 'system', 'ag_setting', '1');
INSERT INTO `admin_menu_auth` VALUES ('424', 'system', 'platform_config', '1');
INSERT INTO `admin_menu_auth` VALUES ('425', 'system', 'admin_log', '1');
INSERT INTO `admin_menu_auth` VALUES ('426', 'marketdata', 'important_data', '1');
INSERT INTO `admin_menu_auth` VALUES ('427', 'marketdata', 'deposit', '1');
INSERT INTO `admin_menu_auth` VALUES ('428', 'marketdata', 'withdrawal', '1');
INSERT INTO `admin_menu_auth` VALUES ('429', 'marketdata', 'bonus', '1');
INSERT INTO `admin_menu_auth` VALUES ('430', 'marketdata', 'online', '1');
INSERT INTO `admin_menu_auth` VALUES ('431', 'marketdata', 'transfer', '1');

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
) ENGINE=InnoDB AUTO_INCREMENT=410 DEFAULT CHARSET=utf8 COMMENT='后台用户权限设置表';

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
INSERT INTO `admin_menu_authority` VALUES ('369', '1', '8', '1');
INSERT INTO `admin_menu_authority` VALUES ('370', '1', '7', '2');
INSERT INTO `admin_menu_authority` VALUES ('371', '1', '9', '1');
INSERT INTO `admin_menu_authority` VALUES ('372', '1', '10', '3');
INSERT INTO `admin_menu_authority` VALUES ('373', '1', '11', '1');
INSERT INTO `admin_menu_authority` VALUES ('374', '1', '12', '1');
INSERT INTO `admin_menu_authority` VALUES ('375', '1', '13', '1');
INSERT INTO `admin_menu_authority` VALUES ('376', '1', '14', '1');
INSERT INTO `admin_menu_authority` VALUES ('377', '1', '15', '3');
INSERT INTO `admin_menu_authority` VALUES ('378', '1', '16', '3');
INSERT INTO `admin_menu_authority` VALUES ('379', '1', '17', '3');
INSERT INTO `admin_menu_authority` VALUES ('380', '1', '18', '3');
INSERT INTO `admin_menu_authority` VALUES ('381', '1', '19', '3');
INSERT INTO `admin_menu_authority` VALUES ('382', '1', '20', '3');
INSERT INTO `admin_menu_authority` VALUES ('383', '1', '21', '3');
INSERT INTO `admin_menu_authority` VALUES ('384', '1', '22', '3');
INSERT INTO `admin_menu_authority` VALUES ('385', '1', '23', '3');
INSERT INTO `admin_menu_authority` VALUES ('386', '1', '24', '3');
INSERT INTO `admin_menu_authority` VALUES ('387', '1', '25', '3');
INSERT INTO `admin_menu_authority` VALUES ('388', '1', '26', '3');
INSERT INTO `admin_menu_authority` VALUES ('389', '1', '40', '3');
INSERT INTO `admin_menu_authority` VALUES ('390', '1', '41', '3');
INSERT INTO `admin_menu_authority` VALUES ('391', '1', '42', '3');
INSERT INTO `admin_menu_authority` VALUES ('392', '1', '43', '3');
INSERT INTO `admin_menu_authority` VALUES ('393', '1', '44', '3');
INSERT INTO `admin_menu_authority` VALUES ('394', '1', '45', '3');
INSERT INTO `admin_menu_authority` VALUES ('395', '1', '46', '3');
INSERT INTO `admin_menu_authority` VALUES ('396', '1', '47', '3');
INSERT INTO `admin_menu_authority` VALUES ('397', '1', '48', '3');
INSERT INTO `admin_menu_authority` VALUES ('398', '1', '49', '3');
INSERT INTO `admin_menu_authority` VALUES ('399', '1', '31', '3');
INSERT INTO `admin_menu_authority` VALUES ('400', '1', '50', '3');
INSERT INTO `admin_menu_authority` VALUES ('401', '1', '51', '3');
INSERT INTO `admin_menu_authority` VALUES ('402', '1', '52', '3');
INSERT INTO `admin_menu_authority` VALUES ('403', '1', '33', '3');
INSERT INTO `admin_menu_authority` VALUES ('404', '1', '34', '3');
INSERT INTO `admin_menu_authority` VALUES ('405', '1', '35', '3');
INSERT INTO `admin_menu_authority` VALUES ('406', '1', '36', '3');
INSERT INTO `admin_menu_authority` VALUES ('407', '1', '37', '3');
INSERT INTO `admin_menu_authority` VALUES ('408', '1', '38', '3');
INSERT INTO `admin_menu_authority` VALUES ('409', '1', '39', '3');
