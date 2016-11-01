/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3308
Source Database       : backup

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2016-10-30 22:43:49
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
  `title` varchar(30) NOT NULL COMMENT '菜单名',
  `is_reload` tinyint(1) NOT NULL DEFAULT '0' COMMENT '点击tab页是否自动reload 0:不自动reload 1:重新reload',
  `display_sort` tinyint(2) unsigned NOT NULL COMMENT '菜单显示排序',
  `controller` varchar(20) NOT NULL DEFAULT '' COMMENT '控制器名',
  `action` varchar(30) NOT NULL DEFAULT '' COMMENT '行为名',
  PRIMARY KEY (`id`),
  KEY `is_top` (`level`,`display_sort`) USING BTREE,
  KEY `idx_ac` (`controller`,`action`) USING BTREE,
  KEY `id` (`id`,`controller`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8 COMMENT='后台菜单表';

-- ----------------------------
-- Records of admin_menu
-- ----------------------------
INSERT INTO `admin_menu` VALUES ('1', '1', '0', '会员管理', '0', '1', '', '');
INSERT INTO `admin_menu` VALUES ('2', '1', '0', '红利管理', '0', '2', '', '');
INSERT INTO `admin_menu` VALUES ('3', '1', '0', '提款模块', '0', '3', '', '');
INSERT INTO `admin_menu` VALUES ('4', '1', '0', '存款模块', '0', '4', '', '');
INSERT INTO `admin_menu` VALUES ('5', '1', '0', '消息管理', '0', '5', '', '');
INSERT INTO `admin_menu` VALUES ('6', '1', '0', '系统设定', '0', '6', '', '');
INSERT INTO `admin_menu` VALUES ('7', '2', '1', '会员概况', '0', '2', 'user', 'info');
INSERT INTO `admin_menu` VALUES ('8', '2', '1', '用户列表', '0', '1', 'user', 'lists');
INSERT INTO `admin_menu` VALUES ('9', '2', '1', '联系方式导出', '0', '3', 'user', 'contact_export');
INSERT INTO `admin_menu` VALUES ('10', '2', '1', '投注记录查询', '0', '4', 'user', 'betlog');
INSERT INTO `admin_menu` VALUES ('11', '2', '1', '转账状态查询', '0', '5', 'user', 'transfer_check');
INSERT INTO `admin_menu` VALUES ('12', '2', '1', '会员帐变详情', '0', '6', 'user', 'changelog');
INSERT INTO `admin_menu` VALUES ('13', '2', '1', '转账记录', '0', '7', 'user', 'transfer_list');
INSERT INTO `admin_menu` VALUES ('14', '2', '1', '站内信记录', '0', '8', 'user', 'message');
INSERT INTO `admin_menu` VALUES ('15', '2', '2', '红利记录', '0', '1', 'bonus', 'lists');
INSERT INTO `admin_menu` VALUES ('16', '2', '2', '批量添加红利', '0', '2', 'bonus', 'batch');
INSERT INTO `admin_menu` VALUES ('17', '2', '3', '提款初审', '0', '1', 'withdrawal', 'first_list');
INSERT INTO `admin_menu` VALUES ('18', '2', '3', '提款复审', '0', '2', 'withdrawal', 'sec_list');
INSERT INTO `admin_menu` VALUES ('19', '2', '3', '拒绝列表', '0', '3', 'withdrawal', 'rej_list');
INSERT INTO `admin_menu` VALUES ('20', '2', '3', '成功列表', '0', '4', 'withdrawal', 'suc_list');
INSERT INTO `admin_menu` VALUES ('21', '2', '4', '存款初审', '0', '1', 'deposit', 'first_list');
INSERT INTO `admin_menu` VALUES ('22', '2', '4', '存款复审', '0', '2', 'deposit', 'sec_list');
INSERT INTO `admin_menu` VALUES ('23', '2', '4', '拒绝列表', '0', '3', 'deposit', 'rej_list');
INSERT INTO `admin_menu` VALUES ('24', '2', '4', '成功列表', '0', '4', 'deposit', 'suc_list');
INSERT INTO `admin_menu` VALUES ('25', '2', '4', '第三方', '0', '5', 'deposit', 'online_list');
INSERT INTO `admin_menu` VALUES ('26', '2', '5', '前台公告', '0', '1', 'msg', 'notice');
INSERT INTO `admin_menu` VALUES ('27', '2', '6', '管理员', '0', '1', '', '');
INSERT INTO `admin_menu` VALUES ('28', '2', '6', '后台菜单配置', '0', '2', '', '');
INSERT INTO `admin_menu` VALUES ('29', '2', '6', '邮件池', '0', '3', '', '');
INSERT INTO `admin_menu` VALUES ('30', '2', '6', '在线支付', '0', '4', '', '');
INSERT INTO `admin_menu` VALUES ('31', '2', '6', '系统常规配置', '0', '5', 'system', 'basic_config');
INSERT INTO `admin_menu` VALUES ('32', '2', '6', '平台相关设定', '0', '6', '', '');
INSERT INTO `admin_menu` VALUES ('33', '2', '6', '后台操作日志', '0', '7', 'system', 'admin_log');
INSERT INTO `admin_menu` VALUES ('34', '2', '54', '概要数据', '0', '1', 'marketdata', 'important_data');
INSERT INTO `admin_menu` VALUES ('35', '2', '54', '存款记录', '0', '2', 'marketdata', 'deposit');
INSERT INTO `admin_menu` VALUES ('36', '2', '54', '提款记录', '0', '3', 'marketdata', 'withdrawal');
INSERT INTO `admin_menu` VALUES ('37', '2', '54', '红利记录', '0', '4', 'marketdata', 'bonus');
INSERT INTO `admin_menu` VALUES ('38', '2', '54', '第三方充值', '0', '5', 'marketdata', 'online');
INSERT INTO `admin_menu` VALUES ('39', '2', '54', '转账记录', '0', '6', 'marketdata', 'transfer');
INSERT INTO `admin_menu` VALUES ('40', '3', '27', '更换密码', '0', '1', 'system', 'admin_pass');
INSERT INTO `admin_menu` VALUES ('41', '3', '27', '用户列表', '0', '2', 'system', 'admin_list');
INSERT INTO `admin_menu` VALUES ('42', '3', '27', '用户权限管理', '0', '3', 'system', 'admin_auth');
INSERT INTO `admin_menu` VALUES ('43', '3', '27', '组别管理', '0', '4', 'system', 'admin_group');
INSERT INTO `admin_menu` VALUES ('44', '3', '28', '菜单列表', '0', '1', 'system', 'menu');
INSERT INTO `admin_menu` VALUES ('45', '3', '28', '菜单辅助功能', '0', '2', 'system', 'menu_auth');
INSERT INTO `admin_menu` VALUES ('46', '3', '29', '邮箱管理', '0', '1', 'system', 'email');
INSERT INTO `admin_menu` VALUES ('47', '3', '29', '邮箱列表', '0', '2', 'system', 'email_list');
INSERT INTO `admin_menu` VALUES ('48', '3', '30', '商户设置', '0', '1', 'system', 'pay_merchant');
INSERT INTO `admin_menu` VALUES ('49', '3', '30', '支付设置', '0', '2', 'system', 'pay_config');
INSERT INTO `admin_menu` VALUES ('50', '3', '32', '沙巴投注限额设置', '0', '1', 'system', 'sb_limit');
INSERT INTO `admin_menu` VALUES ('51', '3', '32', 'AG盘口设置', '0', '2', 'system', 'ag_setting');
INSERT INTO `admin_menu` VALUES ('52', '3', '32', '平台转账访问设置', '0', '3', 'system', 'platform_config');
INSERT INTO `admin_menu` VALUES ('54', '1', '0', '运营数据', '0', '7', '', '');

-- ----------------------------
-- Table structure for `general_report`
-- ----------------------------
DROP TABLE IF EXISTS `general_report`;
CREATE TABLE `general_report` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stat_date` date NOT NULL COMMENT '统计日期',
  `register_user` int(6) NOT NULL DEFAULT '0' COMMENT '新注册用户数',
  `dau` int(10) NOT NULL DEFAULT '0' COMMENT '每天到访用户数',
  `deposit_user_count` int(6) NOT NULL DEFAULT '0' COMMENT '提款用户数',
  `deposit_total` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '存款总额',
  `onlinepay_user_count` int(11) NOT NULL DEFAULT '0' COMMENT '使用在线支付人数',
  `onlinepay_total` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '使用在线支付总额',
  `withdraw_user_count` int(6) NOT NULL DEFAULT '0' COMMENT '提款用户数',
  `withdraw_total` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '提款总额',
  `bouns_user_count` int(6) NOT NULL DEFAULT '0' COMMENT '申请红利人数',
  `bouns_total` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '申请红利总额',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uni_stat_date` (`stat_date`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=289 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of general_report
-- ----------------------------
INSERT INTO `general_report` VALUES ('109', '2014-02-13', '32', '44', '4', '850.00', '2', '200.00', '3', '369.00', '0', '0.00');
INSERT INTO `general_report` VALUES ('110', '2014-02-14', '27', '33', '3', '410.00', '2', '400.00', '1', '310.20', '1', '100.00');
INSERT INTO `general_report` VALUES ('111', '2014-02-15', '38', '43', '4', '22200.00', '4', '22200.00', '1', '118.70', '0', '0.00');
INSERT INTO `general_report` VALUES ('112', '2014-02-16', '19', '28', '5', '62680.00', '4', '2680.00', '1', '400.00', '1', '500.00');
INSERT INTO `general_report` VALUES ('113', '2014-02-17', '29', '44', '6', '62300.00', '5', '2300.00', '4', '52398.26', '10', '34295.23');
INSERT INTO `general_report` VALUES ('114', '2014-02-18', '21', '36', '6', '81183.00', '5', '21183.00', '3', '148800.00', '1', '1832.00');
INSERT INTO `general_report` VALUES ('115', '2014-02-19', '32', '42', '5', '64867.00', '3', '4779.00', '2', '63190.00', '3', '21254.00');
INSERT INTO `general_report` VALUES ('116', '2014-02-20', '22', '32', '3', '77101.98', '1', '100.00', '2', '60901.00', '1', '1166.00');
INSERT INTO `general_report` VALUES ('117', '2014-02-21', '17', '30', '4', '32600.00', '3', '1600.00', '2', '3311.00', '1', '450.00');
INSERT INTO `general_report` VALUES ('118', '2014-02-22', '16', '29', '5', '22330.00', '4', '1630.00', '3', '37260.06', '1', '1.57');
INSERT INTO `general_report` VALUES ('119', '2014-02-23', '17', '25', '5', '35352.69', '4', '19290.00', '2', '13839.48', '0', '0.00');
INSERT INTO `general_report` VALUES ('120', '2014-02-24', '33', '46', '4', '10720.00', '3', '9220.00', '2', '22455.00', '12', '83263.66');
INSERT INTO `general_report` VALUES ('121', '2014-02-25', '87', '92', '42', '4816.00', '34', '3740.00', '22', '56813.98', '20', '2052.49');
INSERT INTO `general_report` VALUES ('122', '2014-02-26', '77', '108', '32', '20206.00', '27', '13301.00', '17', '32432.00', '12', '2565.00');
INSERT INTO `general_report` VALUES ('123', '2014-02-27', '72', '112', '52', '13765.00', '48', '6000.00', '37', '17249.00', '15', '1488.00');
INSERT INTO `general_report` VALUES ('124', '2014-02-28', '72', '117', '40', '38475.00', '36', '32775.00', '21', '32687.00', '21', '2328.00');
INSERT INTO `general_report` VALUES ('125', '2014-03-01', '69', '108', '48', '81105.00', '41', '55005.00', '32', '47356.00', '23', '2376.00');
INSERT INTO `general_report` VALUES ('126', '2014-03-02', '105', '144', '88', '67744.05', '76', '41880.00', '54', '67893.00', '31', '8100.00');
INSERT INTO `general_report` VALUES ('127', '2014-03-03', '100', '153', '81', '63883.11', '71', '28755.00', '43', '73926.20', '54', '41697.91');
INSERT INTO `general_report` VALUES ('128', '2014-03-04', '64', '134', '55', '70190.88', '41', '57279.00', '31', '247065.20', '26', '48036.66');
INSERT INTO `general_report` VALUES ('129', '2014-03-05', '74', '125', '48', '118473.25', '34', '74503.00', '26', '99090.00', '20', '6876.00');
INSERT INTO `general_report` VALUES ('130', '2014-03-06', '123', '200', '72', '97448.00', '55', '50075.00', '44', '95542.00', '35', '2967.10');
INSERT INTO `general_report` VALUES ('131', '2014-03-07', '109', '169', '86', '106706.50', '78', '49006.50', '60', '72747.34', '51', '10066.10');
INSERT INTO `general_report` VALUES ('132', '2014-03-08', '85', '142', '63', '130380.00', '56', '71780.00', '29', '91106.00', '31', '8304.60');
INSERT INTO `general_report` VALUES ('133', '2014-03-09', '88', '149', '64', '150891.75', '54', '84314.00', '40', '182819.50', '30', '9569.00');
INSERT INTO `general_report` VALUES ('134', '2014-03-10', '114', '191', '86', '191742.02', '72', '44146.00', '52', '116375.66', '54', '64198.09');
INSERT INTO `general_report` VALUES ('135', '2014-03-11', '101', '182', '73', '129632.58', '68', '65351.00', '52', '135669.68', '46', '28619.14');
INSERT INTO `general_report` VALUES ('136', '2014-03-12', '89', '174', '66', '161026.15', '60', '95640.00', '42', '141307.00', '40', '8455.32');
INSERT INTO `general_report` VALUES ('137', '2014-03-13', '88', '165', '63', '135149.00', '56', '74667.00', '39', '167137.00', '25', '3435.60');
INSERT INTO `general_report` VALUES ('138', '2014-03-14', '112', '187', '71', '119560.00', '62', '60211.00', '35', '98885.58', '15', '1798.52');
INSERT INTO `general_report` VALUES ('139', '2014-03-15', '88', '163', '78', '142474.21', '66', '51709.00', '39', '123687.00', '28', '3388.00');
INSERT INTO `general_report` VALUES ('140', '2014-03-16', '74', '150', '66', '126245.00', '55', '67450.00', '46', '120836.00', '15', '1720.00');
INSERT INTO `general_report` VALUES ('141', '2014-03-17', '52', '146', '46', '97706.00', '36', '16310.00', '26', '126918.03', '19', '6625.71');
INSERT INTO `general_report` VALUES ('142', '2014-03-18', '63', '142', '38', '101258.09', '33', '30360.00', '22', '119244.60', '36', '34311.47');
INSERT INTO `general_report` VALUES ('143', '2014-03-19', '50', '146', '38', '101298.00', '31', '49433.00', '28', '102887.00', '12', '1676.00');
INSERT INTO `general_report` VALUES ('144', '2014-03-20', '78', '136', '38', '101383.00', '33', '26278.00', '22', '77645.00', '20', '24530.36');
INSERT INTO `general_report` VALUES ('145', '2014-03-21', '52', '104', '51', '153125.04', '44', '69925.00', '31', '171171.26', '17', '3292.00');
INSERT INTO `general_report` VALUES ('147', '2014-03-22', '58', '113', '36', '147949.00', '28', '54954.00', '20', '139092.00', '11', '1566.95');
INSERT INTO `general_report` VALUES ('149', '2014-03-23', '42', '113', '41', '221813.00', '31', '90985.00', '18', '145285.22', '7', '1076.00');
INSERT INTO `general_report` VALUES ('151', '2014-03-24', '45', '119', '41', '188771.00', '30', '126958.00', '21', '202615.31', '25', '7207.79');
INSERT INTO `general_report` VALUES ('152', '2014-03-25', '78', '150', '39', '245092.36', '30', '149363.00', '23', '202038.21', '16', '37287.50');
INSERT INTO `general_report` VALUES ('153', '2014-03-26', '72', '182', '53', '103982.39', '41', '50552.00', '26', '161140.78', '16', '5265.92');
INSERT INTO `general_report` VALUES ('154', '2014-03-27', '81', '151', '31', '91835.00', '26', '18575.00', '17', '55707.40', '9', '3290.21');
INSERT INTO `general_report` VALUES ('155', '2014-03-28', '73', '166', '39', '141527.63', '35', '103603.00', '23', '113973.65', '5', '499.00');
INSERT INTO `general_report` VALUES ('156', '2014-03-29', '123', '296', '53', '137681.83', '42', '49655.00', '25', '146601.00', '126', '59760.57');
INSERT INTO `general_report` VALUES ('157', '2014-03-30', '141', '308', '67', '64213.00', '61', '47263.00', '28', '31856.00', '14', '2098.00');
INSERT INTO `general_report` VALUES ('158', '2014-03-31', '143', '313', '53', '72861.11', '48', '66786.00', '24', '130441.89', '32', '18447.08');
INSERT INTO `general_report` VALUES ('159', '2014-04-01', '259', '409', '55', '160891.25', '45', '98148.00', '15', '61740.65', '41', '25807.26');
INSERT INTO `general_report` VALUES ('160', '2014-04-02', '365', '531', '35', '17150.00', '27', '9551.00', '12', '61660.00', '14', '2082.00');
INSERT INTO `general_report` VALUES ('161', '2014-04-03', '183', '448', '40', '145625.00', '34', '73325.00', '15', '94291.00', '14', '3227.48');
INSERT INTO `general_report` VALUES ('162', '2014-04-04', '158', '433', '47', '59184.00', '38', '49130.00', '23', '16465.00', '62', '2614.00');
INSERT INTO `general_report` VALUES ('163', '2014-04-05', '140', '349', '45', '52581.00', '40', '49133.00', '17', '18931.60', '12', '1152.00');
INSERT INTO `general_report` VALUES ('164', '2014-04-06', '97', '326', '43', '23785.05', '37', '19232.00', '19', '56145.00', '16', '2860.00');
INSERT INTO `general_report` VALUES ('165', '2014-04-07', '132', '527', '51', '111229.60', '42', '49172.00', '30', '75280.38', '481', '44709.79');
INSERT INTO `general_report` VALUES ('166', '2014-04-08', '118', '530', '50', '56677.00', '41', '34479.00', '29', '52895.08', '1072', '31870.67');
INSERT INTO `general_report` VALUES ('167', '2014-04-09', '127', '388', '47', '115174.00', '43', '71284.00', '20', '160966.50', '13', '1442.00');
INSERT INTO `general_report` VALUES ('168', '2014-04-10', '120', '441', '44', '85920.00', '41', '84470.00', '17', '87704.86', '66', '3768.00');
INSERT INTO `general_report` VALUES ('169', '2014-04-11', '157', '468', '46', '52933.90', '40', '44794.00', '29', '19760.00', '14', '1542.00');
INSERT INTO `general_report` VALUES ('170', '2014-04-12', '186', '486', '72', '80208.00', '68', '63522.00', '29', '63318.00', '26', '2366.00');
INSERT INTO `general_report` VALUES ('171', '2014-04-13', '136', '451', '44', '110159.00', '41', '81871.00', '17', '65726.00', '26', '2227.00');
INSERT INTO `general_report` VALUES ('172', '2014-04-14', '172', '608', '57', '107841.07', '48', '41156.00', '27', '81598.82', '44', '32288.00');
INSERT INTO `general_report` VALUES ('173', '2014-04-15', '173', '625', '63', '193190.40', '55', '161068.00', '32', '199587.40', '895', '61332.21');
INSERT INTO `general_report` VALUES ('174', '2014-04-16', '157', '576', '62', '407978.80', '52', '203962.00', '33', '352731.00', '25', '32820.96');
INSERT INTO `general_report` VALUES ('175', '2014-04-17', '161', '494', '90', '364160.08', '78', '75872.00', '30', '159492.89', '39', '24470.00');
INSERT INTO `general_report` VALUES ('176', '2014-04-18', '133', '459', '65', '103943.00', '54', '53543.00', '26', '49150.60', '30', '23356.00');
INSERT INTO `general_report` VALUES ('177', '2014-04-19', '160', '480', '72', '47155.00', '67', '37447.00', '24', '32248.50', '27', '4584.00');
INSERT INTO `general_report` VALUES ('178', '2014-04-20', '165', '487', '52', '76648.00', '45', '30037.00', '21', '38220.00', '24', '23437.50');
INSERT INTO `general_report` VALUES ('179', '2014-04-21', '173', '598', '65', '107495.40', '54', '59083.00', '26', '207654.91', '75', '26578.86');
INSERT INTO `general_report` VALUES ('180', '2014-04-22', '173', '664', '80', '221411.00', '66', '155648.00', '32', '110055.70', '315', '104152.66');
INSERT INTO `general_report` VALUES ('181', '2014-04-23', '126', '614', '73', '181588.00', '65', '167204.00', '38', '243871.66', '665', '13683.40');
INSERT INTO `general_report` VALUES ('182', '2014-04-24', '131', '554', '71', '150223.00', '63', '117369.00', '31', '139103.72', '83', '9244.00');
INSERT INTO `general_report` VALUES ('183', '2014-04-25', '129', '501', '78', '226508.00', '64', '132562.00', '31', '127817.70', '30', '45294.00');
INSERT INTO `general_report` VALUES ('184', '2014-04-26', '164', '470', '73', '250980.75', '65', '234759.00', '30', '252715.20', '30', '4996.00');
INSERT INTO `general_report` VALUES ('185', '2014-04-27', '164', '576', '75', '144593.00', '70', '142755.00', '34', '136682.26', '67', '8574.00');
INSERT INTO `general_report` VALUES ('186', '2014-04-28', '141', '614', '71', '232495.00', '61', '114694.00', '39', '232596.00', '181', '45180.37');
INSERT INTO `general_report` VALUES ('187', '2014-04-29', '124', '655', '73', '202820.00', '68', '175050.00', '34', '186314.29', '806', '115584.72');
INSERT INTO `general_report` VALUES ('188', '2014-04-30', '121', '633', '79', '169757.00', '71', '151457.00', '23', '98160.00', '90', '6908.00');
INSERT INTO `general_report` VALUES ('189', '2014-05-01', '149', '594', '107', '118074.50', '91', '61397.00', '43', '56976.25', '31', '33100.00');
INSERT INTO `general_report` VALUES ('190', '2014-05-02', '120', '489', '67', '166486.00', '62', '159691.00', '26', '55701.00', '22', '2342.00');
INSERT INTO `general_report` VALUES ('191', '2014-05-03', '166', '601', '108', '162358.50', '99', '80491.00', '49', '56054.30', '100', '37868.50');
INSERT INTO `general_report` VALUES ('192', '2014-05-04', '164', '583', '87', '45100.00', '80', '37407.00', '44', '44517.00', '36', '5260.00');
INSERT INTO `general_report` VALUES ('193', '2014-05-05', '106', '542', '72', '126232.00', '62', '81858.00', '27', '56224.60', '29', '3720.00');
INSERT INTO `general_report` VALUES ('194', '2014-05-06', '110', '650', '74', '79247.12', '68', '50385.00', '35', '55804.15', '112', '73615.50');
INSERT INTO `general_report` VALUES ('195', '2014-05-07', '143', '643', '65', '63328.00', '50', '31025.00', '43', '111141.28', '873', '62871.57');
INSERT INTO `general_report` VALUES ('196', '2014-05-08', '121', '503', '80', '95261.84', '68', '44034.00', '25', '46382.10', '14', '22392.00');
INSERT INTO `general_report` VALUES ('197', '2014-05-09', '137', '559', '75', '83589.00', '69', '58346.00', '29', '36843.80', '65', '15328.00');
INSERT INTO `general_report` VALUES ('198', '2014-05-10', '109', '473', '81', '108420.00', '75', '52480.00', '39', '50863.50', '26', '23300.00');
INSERT INTO `general_report` VALUES ('199', '2014-05-11', '104', '415', '77', '48262.00', '71', '45766.00', '26', '60968.00', '18', '1362.00');
INSERT INTO `general_report` VALUES ('200', '2014-05-12', '123', '491', '75', '91710.50', '66', '57921.00', '27', '74220.90', '94', '7589.00');
INSERT INTO `general_report` VALUES ('201', '2014-05-13', '125', '457', '64', '112633.50', '59', '46173.50', '30', '39974.00', '52', '30255.30');
INSERT INTO `general_report` VALUES ('202', '2014-05-14', '131', '412', '62', '80104.00', '57', '27256.00', '20', '67523.00', '17', '2364.00');
INSERT INTO `general_report` VALUES ('203', '2014-05-15', '105', '500', '70', '156953.50', '64', '49991.50', '26', '140532.75', '67', '7283.00');
INSERT INTO `general_report` VALUES ('204', '2014-05-16', '129', '321', '88', '364106.00', '80', '65208.00', '34', '215322.70', '21', '3810.00');
INSERT INTO `general_report` VALUES ('205', '2014-05-17', '99', '550', '65', '208497.00', '56', '60200.00', '29', '180102.00', '23', '4412.00');
INSERT INTO `general_report` VALUES ('206', '2014-05-18', '179', '498', '60', '186319.00', '53', '60969.00', '25', '183275.00', '18', '2866.00');
INSERT INTO `general_report` VALUES ('207', '2014-05-19', '188', '571', '111', '169592.90', '101', '58181.00', '44', '252911.00', '23', '4435.00');
INSERT INTO `general_report` VALUES ('208', '2014-05-20', '92', '435', '92', '270632.32', '79', '81527.00', '47', '219757.00', '61', '32411.50');
INSERT INTO `general_report` VALUES ('209', '2014-05-21', '85', '382', '69', '140122.00', '61', '68277.00', '33', '117638.95', '22', '25177.00');
INSERT INTO `general_report` VALUES ('210', '2014-05-22', '57', '256', '60', '57963.00', '57', '30931.00', '25', '50494.65', '6', '948.00');
INSERT INTO `general_report` VALUES ('211', '2014-05-23', '54', '277', '59', '66424.00', '52', '28142.00', '16', '13355.00', '4', '632.00');
INSERT INTO `general_report` VALUES ('212', '2014-05-24', '73', '302', '47', '101236.00', '42', '43316.00', '23', '43173.30', '37', '16982.00');
INSERT INTO `general_report` VALUES ('213', '2014-05-25', '90', '336', '72', '147966.00', '63', '42403.00', '28', '114098.66', '16', '3516.00');
INSERT INTO `general_report` VALUES ('214', '2014-05-26', '153', '468', '85', '228397.00', '67', '42420.00', '33', '268231.50', '44', '27158.00');
INSERT INTO `general_report` VALUES ('215', '2014-05-27', '186', '450', '61', '199840.00', '54', '35641.00', '38', '177235.65', '67', '56600.00');
INSERT INTO `general_report` VALUES ('216', '2014-05-28', '135', '373', '68', '188933.00', '59', '38778.00', '34', '121699.65', '16', '4280.00');
INSERT INTO `general_report` VALUES ('217', '2014-05-29', '138', '483', '89', '149360.00', '80', '40717.00', '31', '119455.90', '84', '6620.80');
INSERT INTO `general_report` VALUES ('218', '2014-05-30', '136', '439', '90', '203887.00', '82', '57232.00', '49', '183056.90', '34', '3950.00');
INSERT INTO `general_report` VALUES ('219', '2014-05-31', '120', '354', '89', '198777.00', '80', '58910.00', '40', '145011.00', '22', '3718.00');
INSERT INTO `general_report` VALUES ('220', '2014-06-01', '140', '427', '79', '146238.00', '72', '40240.00', '29', '211460.00', '74', '5686.00');
INSERT INTO `general_report` VALUES ('221', '2014-06-02', '137', '453', '84', '209114.00', '73', '51811.00', '45', '181253.00', '55', '4674.00');
INSERT INTO `general_report` VALUES ('222', '2014-06-03', '142', '468', '99', '178303.00', '90', '70281.00', '50', '133343.50', '115', '36505.00');
INSERT INTO `general_report` VALUES ('223', '2014-06-04', '144', '524', '111', '201014.00', '107', '50953.00', '42', '135005.22', '121', '30004.00');
INSERT INTO `general_report` VALUES ('224', '2014-06-05', '182', '485', '115', '250265.00', '108', '64315.00', '56', '318499.50', '59', '5872.00');
INSERT INTO `general_report` VALUES ('225', '2014-06-06', '159', '440', '99', '202160.00', '91', '120362.00', '53', '161440.46', '50', '10967.12');
INSERT INTO `general_report` VALUES ('226', '2014-06-07', '113', '457', '82', '194902.02', '74', '87962.00', '43', '231502.10', '123', '9749.49');
INSERT INTO `general_report` VALUES ('227', '2014-06-08', '128', '398', '83', '143620.05', '76', '40579.05', '58', '168557.71', '28', '14252.00');
INSERT INTO `general_report` VALUES ('228', '2014-06-09', '151', '297', '97', '209089.00', '87', '70934.00', '43', '262492.19', '34', '24771.00');
INSERT INTO `general_report` VALUES ('229', '2014-06-10', '164', '626', '83', '198492.00', '76', '139915.00', '34', '377365.50', '154', '32645.20');
INSERT INTO `general_report` VALUES ('230', '2014-06-11', '126', '506', '90', '89789.00', '85', '63904.00', '39', '189079.00', '43', '25939.41');
INSERT INTO `general_report` VALUES ('231', '2014-06-12', '173', '504', '134', '309081.00', '126', '153803.00', '39', '224035.00', '48', '7225.00');
INSERT INTO `general_report` VALUES ('232', '2014-06-13', '158', '606', '167', '285114.50', '156', '223381.50', '45', '276511.69', '120', '9876.40');
INSERT INTO `general_report` VALUES ('233', '2014-06-14', '131', '520', '142', '491036.53', '131', '376697.00', '47', '330304.38', '55', '12488.20');
INSERT INTO `general_report` VALUES ('234', '2014-06-15', '149', '525', '155', '332293.00', '143', '311932.00', '43', '159982.00', '48', '5994.60');
INSERT INTO `general_report` VALUES ('235', '2014-06-16', '173', '643', '144', '262223.00', '132', '148658.00', '51', '502648.39', '128', '9128.60');
INSERT INTO `general_report` VALUES ('236', '2014-06-17', '159', '651', '143', '306534.00', '136', '205010.00', '54', '210895.00', '221', '59714.00');
INSERT INTO `general_report` VALUES ('237', '2014-06-18', '196', '593', '139', '473404.19', '123', '357640.00', '46', '403251.97', '59', '11695.51');
INSERT INTO `general_report` VALUES ('238', '2014-06-19', '170', '659', '149', '299895.01', '141', '194924.01', '35', '301535.00', '144', '10975.60');
INSERT INTO `general_report` VALUES ('239', '2014-06-20', '156', '602', '146', '249774.80', '138', '197343.80', '48', '204723.31', '55', '4793.36');
INSERT INTO `general_report` VALUES ('240', '2014-06-21', '164', '571', '165', '372668.00', '157', '208521.00', '52', '454527.00', '66', '7254.82');
INSERT INTO `general_report` VALUES ('241', '2014-06-22', '182', '666', '170', '464169.00', '159', '426379.00', '44', '297285.00', '181', '13923.90');
INSERT INTO `general_report` VALUES ('242', '2014-06-23', '197', '658', '185', '345745.60', '163', '202928.60', '64', '273367.80', '115', '13000.80');
INSERT INTO `general_report` VALUES ('243', '2014-06-24', '145', '644', '175', '412851.00', '160', '249874.50', '53', '312409.90', '171', '51942.00');
INSERT INTO `general_report` VALUES ('244', '2014-06-25', '213', '757', '178', '370627.00', '164', '222729.00', '65', '226303.00', '212', '11995.98');
INSERT INTO `general_report` VALUES ('245', '2014-06-26', '131', '664', '164', '371977.50', '151', '237445.00', '54', '280778.22', '181', '31576.00');
INSERT INTO `general_report` VALUES ('246', '2014-06-27', '212', '639', '167', '293301.75', '149', '139427.25', '67', '360022.80', '99', '7141.20');
INSERT INTO `general_report` VALUES ('247', '2014-06-28', '167', '557', '168', '548092.56', '157', '441935.06', '54', '368005.56', '59', '25561.60');
INSERT INTO `general_report` VALUES ('248', '2014-06-29', '153', '568', '160', '422513.00', '147', '301712.00', '56', '303502.63', '81', '6962.90');
INSERT INTO `general_report` VALUES ('249', '2014-06-30', '156', '623', '159', '516390.00', '144', '317196.00', '58', '348275.92', '86', '9925.90');
INSERT INTO `general_report` VALUES ('250', '2014-07-01', '147', '678', '163', '394133.01', '146', '263264.01', '53', '184239.70', '86', '8741.00');
INSERT INTO `general_report` VALUES ('251', '2014-07-02', '170', '670', '153', '272763.00', '137', '118387.00', '68', '255699.28', '290', '102867.44');
INSERT INTO `general_report` VALUES ('252', '2014-07-03', '129', '559', '143', '290433.40', '131', '128709.40', '58', '244814.08', '122', '10665.99');
INSERT INTO `general_report` VALUES ('253', '2014-07-04', '127', '587', '181', '578743.00', '153', '326789.00', '61', '353755.20', '68', '6842.00');
INSERT INTO `general_report` VALUES ('254', '2014-07-05', '135', '624', '165', '539099.00', '142', '436605.00', '71', '659088.30', '85', '9053.60');
INSERT INTO `general_report` VALUES ('255', '2014-07-06', '176', '631', '168', '400743.18', '150', '233063.00', '74', '267508.16', '94', '8876.00');
INSERT INTO `general_report` VALUES ('256', '2014-07-07', '158', '566', '143', '349397.14', '123', '141488.14', '52', '331162.00', '80', '8816.00');
INSERT INTO `general_report` VALUES ('257', '2014-07-08', '136', '640', '153', '308961.82', '134', '158444.61', '39', '188752.00', '353', '108046.85');
INSERT INTO `general_report` VALUES ('258', '2014-07-09', '149', '661', '176', '375800.80', '160', '195616.00', '57', '295716.50', '62', '7328.40');
INSERT INTO `general_report` VALUES ('259', '2014-07-10', '142', '639', '167', '286457.73', '143', '129687.23', '77', '254505.45', '102', '21740.80');
INSERT INTO `general_report` VALUES ('260', '2014-07-11', '148', '605', '165', '291075.24', '148', '145736.00', '66', '198841.50', '76', '8697.24');
INSERT INTO `general_report` VALUES ('261', '2014-07-12', '145', '591', '183', '292144.12', '165', '122652.00', '56', '175802.60', '86', '27735.00');
INSERT INTO `general_report` VALUES ('262', '2014-07-13', '132', '614', '183', '269715.67', '163', '173371.01', '66', '150327.00', '100', '7848.00');
INSERT INTO `general_report` VALUES ('263', '2014-07-14', '135', '588', '140', '193777.91', '108', '59597.00', '63', '161104.90', '53', '5860.00');
INSERT INTO `general_report` VALUES ('264', '2014-07-15', '138', '654', '173', '270044.00', '151', '117673.00', '56', '254594.40', '247', '16372.60');
INSERT INTO `general_report` VALUES ('265', '2014-07-16', '163', '731', '185', '321472.00', '170', '198513.00', '73', '438415.40', '303', '110670.87');
INSERT INTO `general_report` VALUES ('266', '2014-07-17', '157', '666', '191', '386783.00', '179', '217758.00', '70', '307675.52', '145', '31000.88');
INSERT INTO `general_report` VALUES ('267', '2014-07-18', '152', '615', '194', '164860.02', '177', '124432.00', '47', '173347.57', '100', '28149.70');
INSERT INTO `general_report` VALUES ('268', '2014-07-19', '149', '642', '204', '228170.00', '188', '154068.00', '41', '96635.26', '169', '19122.80');
INSERT INTO `general_report` VALUES ('269', '2014-07-20', '154', '658', '213', '361791.00', '194', '233599.00', '55', '348224.00', '87', '34219.20');
INSERT INTO `general_report` VALUES ('270', '2014-07-21', '152', '647', '226', '426588.00', '207', '269143.00', '48', '310495.05', '115', '32408.00');
INSERT INTO `general_report` VALUES ('271', '2014-07-22', '178', '787', '198', '548468.05', '175', '358340.94', '67', '595856.55', '361', '79878.69');
INSERT INTO `general_report` VALUES ('272', '2014-07-23', '195', '847', '224', '445759.00', '206', '264562.00', '71', '352814.00', '151', '35950.00');
INSERT INTO `general_report` VALUES ('279', '2014-07-24', '184', '751', '232', '386948.33', '212', '254639.33', '55', '309786.99', '141', '21377.93');
INSERT INTO `general_report` VALUES ('280', '2014-07-25', '159', '701', '224', '450467.91', '190', '290055.91', '63', '420501.50', '107', '33249.22');
INSERT INTO `general_report` VALUES ('281', '2014-07-26', '176', '730', '201', '268401.56', '184', '123229.55', '42', '209188.00', '142', '30794.00');
INSERT INTO `general_report` VALUES ('282', '2014-07-27', '187', '715', '231', '400652.31', '212', '327959.00', '69', '269174.60', '122', '31003.60');
INSERT INTO `general_report` VALUES ('283', '2014-07-28', '190', '694', '244', '439638.51', '226', '235423.01', '63', '229341.97', '154', '41059.20');
INSERT INTO `general_report` VALUES ('284', '2014-07-29', '211', '870', '266', '466685.17', '245', '333826.12', '78', '517975.00', '397', '132856.62');
INSERT INTO `general_report` VALUES ('285', '2014-07-30', '242', '931', '240', '342719.03', '219', '204463.00', '71', '279761.38', '199', '44935.75');
INSERT INTO `general_report` VALUES ('286', '2014-07-31', '236', '855', '239', '403410.52', '224', '222495.00', '64', '302859.00', '134', '20643.00');
INSERT INTO `general_report` VALUES ('287', '2014-08-01', '194', '765', '197', '587663.45', '180', '421735.39', '48', '200148.97', '115', '29700.89');
INSERT INTO `general_report` VALUES ('288', '2014-08-02', '127', '681', '184', '415154.50', '164', '240515.00', '51', '318140.97', '119', '25392.00');