
ALTER TABLE `gaming`
ADD COLUMN `status`  tinyint(1) NULL DEFAULT 1 COMMENT '状态 1 正常,2中心到平台,3平台到中心,4不能转账,5不能访问且不能转账 ' AFTER `name`;

DROP TRIGGER `afeter_insert_users`;
delimiter $
CREATE TRIGGER `afeter_insert_users` AFTER INSERT ON `users` FOR EACH ROW BEGIN
	INSERT INTO user_restrict (user_id) VALUES (NEW.user_id);
	INSERT INTO user_profile (user_id) VALUES (NEW.user_id);
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
$
delimiter ;
