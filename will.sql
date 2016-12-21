/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : backup

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2016-12-21 23:49:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `bank_cards`
-- ----------------------------
DROP TABLE IF EXISTS `bank_cards`;
CREATE TABLE `bank_cards` (
  `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '卡主姓名',
  `bank_code` varchar(10) NOT NULL DEFAULT '' COMMENT 'ICBC ABC CMB CCB COMM BOC CEB CMBC CITIC SZPAB SPDB CIB',
  `bank_name` varchar(50) DEFAULT NULL COMMENT '银行名称',
  `account_no` varchar(30) NOT NULL DEFAULT '' COMMENT '银行卡号',
  `display_name` varchar(40) NOT NULL DEFAULT '' COMMENT '显示名称',
  `branch_name` varchar(50) DEFAULT NULL COMMENT '银行分支名称',
  `create_time` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户银行卡';

-- ----------------------------
-- Records of bank_cards
-- ----------------------------

-- ----------------------------
-- Table structure for `payment_group`
-- ----------------------------
DROP TABLE IF EXISTS `payment_group`;
CREATE TABLE `payment_group` (
  `payment_group_id` int(11) NOT NULL AUTO_INCREMENT,
  `merchant` varchar(50) DEFAULT '' COMMENT '商户名称',
  `nickname` varchar(50) DEFAULT '' COMMENT '商户别称',
  `white_list` text COMMENT '白名单IP',
  `api_url` varchar(100) DEFAULT '' COMMENT 'api 请求的URL',
  `notice_url` varchar(100) DEFAULT '' COMMENT '商家异步通知地址',
  `success_url` varchar(100) DEFAULT '' COMMENT '支付成功后跳转地址',
  `bank_list` varchar(255) DEFAULT '' COMMENT '支持的银行列表',
  `mobile` tinyint(4) DEFAULT '0' COMMENT '1 代表都支持 2 代表支持 3代表都不支持 ',
  `type` tinyint(4) DEFAULT '1' COMMENT '1 代表在线支付 2 代表支付宝3 代表微信',
  `middle_jump_url` varchar(100) DEFAULT '' COMMENT '中转域名',
  `ext` varchar(255) DEFAULT '' COMMENT '扩展字段',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态 1 禁用 2启用',
  PRIMARY KEY (`payment_group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of payment_group
-- ----------------------------
INSERT INTO `payment_group` VALUES ('3', '国付宝', 'GOUPAY', '', 'www.guopay.com', '-', '-', 'ICBC,ABC,CCB,CGB,ECITIC,PINGAN,CMB,CMBC,CIB,HXB', '1', '1', '-', '', '1');
INSERT INTO `payment_group` VALUES ('4', '顺丰支付', 'SHUNFENG', '127.0.0.1', 'www.shunfeng.com', 'www.bbb.com/shunfeng.php', 'www.bbb.com/shunfeng.php', 'ICBC,CGB,PINGAN,CMBC', '1', '1', 'www.baidu.com', '', '1');
INSERT INTO `payment_group` VALUES ('5', '银行转账', 'TRANSFER', '-', '-', '-', '-', 'ICBC', '1', '1', '-', '', '1');
INSERT INTO `payment_group` VALUES ('6', '工商银行', '工商银行', '-', '-', '-', '-', 'ICBC', '1', '1', '-', '', '1');
INSERT INTO `payment_group` VALUES ('7', '招商银行', '招商银行', '-', '-', '-', '-', 'CMB', '1', '1', '-', '', '1');
INSERT INTO `payment_group` VALUES ('8', '中国银行', '中国银行', '-', '-', '-', '-', 'BOC', '1', '1', '-', '', '1');
INSERT INTO `payment_group` VALUES ('9', '农业银行', '农业银行', '-', '-', '-', '-', 'ICBC', '1', '1', '-', '', '1');
INSERT INTO `payment_group` VALUES ('10', '建设银行', '建设银行', '-', '-', '-', '-', 'CCB', '1', '1', '-', '', '1');

-- ----------------------------
-- Table structure for `payment_method`
-- ----------------------------
DROP TABLE IF EXISTS `payment_method`;
CREATE TABLE `payment_method` (
  `payment_method_id` int(11) NOT NULL AUTO_INCREMENT,
  `payment_group_id` int(11) DEFAULT '0' COMMENT '对应的商户类型',
  `title` varchar(50) DEFAULT '' COMMENT '标题',
  `secret_key` text COMMENT '商户密钥',
  `company_id` varchar(100) DEFAULT '' COMMENT '商户ID',
  `status` tinyint(4) DEFAULT '1' COMMENT '1禁用 2 启用',
  PRIMARY KEY (`payment_method_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of payment_method
-- ----------------------------
INSERT INTO `payment_method` VALUES ('2', '3', '国付宝1号', 'secret', '1111111', '1');
INSERT INTO `payment_method` VALUES ('3', '5', '招行卡-1', '6226 8888 8888 8888', '张三', '1');
INSERT INTO `payment_method` VALUES ('4', '5', '农行卡1号', '6555555555555555555', '11111112', '1');
INSERT INTO `payment_method` VALUES ('5', '5', '建行卡-1', '6226 8888 8888 8866', '王五', '1');
INSERT INTO `payment_method` VALUES ('6', '6', '中国工商一行福建支行', '6222084402005312444', '张三', '1');
INSERT INTO `payment_method` VALUES ('7', '9', '中国农业银行北京支行', '6222084402005312445', '李四', '1');
INSERT INTO `payment_method` VALUES ('8', '8', '中国银行湖北支行', '62220844020053124446', '王麻子', '1');
INSERT INTO `payment_method` VALUES ('9', '10', '建设银行陕西支行', '6222084402005312447', '乾隆', '1');
INSERT INTO `payment_method` VALUES ('10', '7', '招商银行天津支行', '6222084402005312449', '康熙', '1');
