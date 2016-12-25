/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : backup

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2016-12-25 21:56:59
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `user_platform_accounts`
-- ----------------------------
DROP TABLE IF EXISTS `user_platform_accounts`;
CREATE TABLE `user_platform_accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0' COMMENT '用户ID',
  `ag_account` varchar(30) DEFAULT '' COMMENT 'AG平台账号',
  `ag_password` varchar(30) DEFAULT '' COMMENT 'AG密码',
  `pt_account` varchar(30) DEFAULT '' COMMENT 'PT平台账号',
  `pt_password` varchar(30) DEFAULT '' COMMENT 'AG密码',
  `sb_account` varchar(30) DEFAULT '' COMMENT '沙巴平台账号',
  `sb_password` varchar(30) DEFAULT '' COMMENT '沙巴密码',
  PRIMARY KEY (`id`),
  UNIQUE KEY `upa_u` (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户平台账号密码表';

-- ----------------------------
-- Records of user_platform_accounts
-- ----------------------------

-- ----------------------------
-- Table structure for `user_platform_balance`
-- ----------------------------
DROP TABLE IF EXISTS `user_platform_balance`;
CREATE TABLE `user_platform_balance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0' COMMENT '用户ID',
  `ag` bigint(20) NOT NULL DEFAULT '0' COMMENT 'AG账户余额',
  `sb` bigint(20) NOT NULL DEFAULT '0' COMMENT '沙巴账户余额',
  `pt` bigint(20) NOT NULL DEFAULT '0' COMMENT 'PT账户余额',
  PRIMARY KEY (`id`),
  UNIQUE KEY `upb_u` (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户平台余额表';

-- ----------------------------
-- Records of user_platform_balance
-- ----------------------------
-- 初始化数据
INSERT INTO user_platform_accounts (`user_id`) SELECT user_id from users;
INSERT INTO user_platform_balance (`user_id`) SELECT user_id from users;
DROP TRIGGER `afeter_insert_users`;
-- 修改触发器
CREATE DEFINER=`root`@`localhost` TRIGGER `afeter_insert_users` AFTER INSERT ON `users`
FOR EACH ROW BEGIN
	INSERT INTO user_restrict (user_id) VALUES (NEW.user_id);
	INSERT INTO user_profile (user_id) VALUES (NEW.user_id);
    INSERT INTO user_platform_accounts (user_id) VALUES (NEW.user_id);
    INSERT INTO user_platform_balance (user_id) VALUES (NEW.user_id);
	UPDATE stat_summary_daily SET user_new_reg=user_new_reg+1 WHERE date=LEFT(NEW.register_time,10);
	IF ((SELECT ROW_COUNT())<1) THEN
		INSERT INTO stat_summary_daily (date,user_new_reg) VALUES (LEFT(NEW.register_time,10),1);
	END IF;
	IF (NEW.parent_id>0) THEN
		UPDATE stat_user_daily SET user_new_reg=user_new_reg+1 WHERE date=LEFT(NEW.register_time,10) AND user_id=NEW.parent_id;
		IF ((SELECT ROW_COUNT())<1) THEN
			INSERT INTO stat_user_daily (date,user_id,parent_id,parent_path,user_new_reg) VALUES (LEFT(NEW.register_time,10),NEW.parent_id,(SELECT parent_id FROM users WHERE user_id=NEW.parent_id),(SELECT parent_path FROM users WHERE user_id=NEW.parent_id),1);
		END IF;
    END IF;
END;

