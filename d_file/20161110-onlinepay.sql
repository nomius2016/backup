/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50515
Source Host           : localhost:3306
Source Database       : backup

Target Server Type    : MYSQL
Target Server Version : 50515
File Encoding         : 65001

Date: 2016-11-10 17:51:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `onlinepay`
-- ----------------------------
DROP TABLE IF EXISTS `onlinepay`;
CREATE TABLE `onlinepay` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of onlinepay
-- ----------------------------
INSERT INTO `onlinepay` VALUES ('3', '国付宝', 'GOPAY', '127.0.0.1,119.119.119.119,118.118.118', 'www.gopay.com', 'www.bbb.com/gopay.php', 'www.bbb.com/success.html', 'ICBC', '3', '2', 'www.baidu.com', '', '1');
INSERT INTO `onlinepay` VALUES ('4', '顺丰支付', 'SHUNFENG', '127.0.0.1', 'www.shunfeng.com', 'www.bbb.com/shunfeng.php', 'www.bbb.com/shunfeng.php', 'ICBC,CGB,PINGAN,CMBC', '1', '1', 'www.baidu.com', '', '1');

-- ----------------------------
-- Table structure for `onlinepay_merchant`
-- ----------------------------
DROP TABLE IF EXISTS `onlinepay_merchant`;
CREATE TABLE `onlinepay_merchant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT '' COMMENT '标题',
  `merchat_id` int(11) DEFAULT '0' COMMENT '对应的商户类型',
  `secret_key` text COMMENT '商户密钥',
  `company_id` varchar(100) DEFAULT '' COMMENT '商户ID',
  `status` tinyint(4) DEFAULT '1' COMMENT '1禁用 2 启用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of onlinepay_merchant
-- ----------------------------
INSERT INTO `onlinepay_merchant` VALUES ('2', '国付宝1号', '3', 'secret', '1111111', '1');
