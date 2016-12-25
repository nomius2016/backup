DROP TABLE IF EXISTS `user_platform_accounts`;
DROP TABLE IF EXISTS `user_platform_balance`;
DROP TABLE IF EXISTS `user_gaming_account`;
CREATE TABLE `user_gaming_account` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `gaming_id` int(11) NOT NULL DEFAULT '0' COMMENT '平台ID',
  `account` varchar(30) DEFAULT '' COMMENT '平台账号',
  `password` varchar(30) DEFAULT '' COMMENT '密码',
  PRIMARY KEY (`id`),
  KEY `uga_u` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COMMENT='用户平台账号密码表';

DROP TRIGGER `afeter_insert_users`;
delimiter $
CREATE TRIGGER `afeter_insert_users` AFTER INSERT ON `users` FOR EACH ROW BEGIN
  INSERT INTO user_restrict (user_id) VALUES (NEW.user_id);
  INSERT INTO user_profile (user_id) VALUES (NEW.user_id);
  INSERT INTO user_balance (`user_id`,`gaming_id`,`last_update_time`)  select NEW.user_id,gaming_id,NEW.register_time from gaming;
  INSERT INTO user_gaming_account (`user_id`,`gaming_id`)  select NEW.user_id,gaming_id from gaming;
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
delimiter ;

