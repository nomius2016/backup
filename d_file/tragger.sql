DELIMITER $
DROP TRIGGER IF EXISTS afeter_insert_fund_transfer $
CREATE TRIGGER afeter_insert_fund_transfer
AFTER INSERT ON fund_transfer_log
FOR EACH ROW
BEGIN
    CASE 
	 /********** 充值  **************/
	 WHEN NEW.transfer_type_id=1 AND NEW.amount<>0 THEN
		UPDATE stat_user_daily SET deposit=deposit+NEW.amount WHERE date=FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d') AND user_id=NEW.user_id;
		IF ((SELECT ROW_COUNT())<1) THEN
			INSERT INTO stat_user_daily (date,user_id,parent_id,parent_path,deposit) VALUES (FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d'),NEW.user_id,NEW.parent_id,NEW.parent_path,NEW.amount);
		END IF;
		UPDATE stat_summary_daily SET deposit=deposit+NEW.amount WHERE date=FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d');
		IF ((SELECT ROW_COUNT())<1) THEN
			INSERT INTO stat_summary_daily (date,deposit) VALUES (FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d'),NEW.amount);
		END IF;

	 /********** 提款 **************/	
	 WHEN NEW.transfer_type_id=2 AND NEW.amount<>0 THEN
		UPDATE stat_user_daily SET withdraw=withdraw+NEW.amount WHERE date=FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d') AND user_id=NEW.user_id;
		IF ((SELECT ROW_COUNT())<1) THEN
			INSERT INTO stat_user_daily (date,user_id,parent_id,parent_path,withdraw) VALUES (FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d'),NEW.user_id,NEW.parent_id,NEW.parent_path,NEW.amount);
		END IF;
		UPDATE stat_summary_daily SET withdraw=withdraw+NEW.amount WHERE date=FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d');
		IF ((SELECT ROW_COUNT())<1) THEN
			INSERT INTO stat_summary_daily (date,withdraw) VALUES (FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d'),NEW.amount);
		END IF;

	 /********** 投注 **************/	
	 WHEN (NEW.transfer_type_id=3 OR NEW.transfer_type_id=4) AND NEW.amount<>0 THEN
		UPDATE stat_user_daily SET bet=bet+NEW.amount WHERE date=FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d') AND user_id=NEW.user_id;
		IF ((SELECT ROW_COUNT())<1) THEN
			INSERT INTO stat_user_daily (date,user_id,parent_id,parent_path,bet) VALUES (FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d'),NEW.user_id,NEW.parent_id,NEW.parent_path,NEW.amount);
		END IF;
		UPDATE stat_summary_daily SET bet=bet+NEW.amount WHERE date=FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d');
		IF ((SELECT ROW_COUNT())<1) THEN
			INSERT INTO stat_summary_daily (date,bet) VALUES (FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d'),NEW.amount);
		END IF;
	 

	 /********** 派奖 **************/	
	 WHEN NEW.transfer_type_id=5 AND NEW.amount<>0 THEN
		UPDATE stat_user_daily SET bonus=bonus+NEW.amount WHERE date=FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d') AND user_id=NEW.user_id;
		IF ((SELECT ROW_COUNT())<1) THEN
			INSERT INTO stat_user_daily (date,user_id,parent_id,parent_path,bonus) VALUES (FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d'),NEW.user_id,NEW.parent_id,NEW.parent_path,NEW.amount);
		END IF;
		UPDATE stat_summary_daily SET bonus=bonus+NEW.amount WHERE date=FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d');
		IF ((SELECT ROW_COUNT())<1) THEN
			INSERT INTO stat_summary_daily (date,bonus) VALUES (FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d'),NEW.amount);
		END IF;
		
	 /**********返点 **************/	
	 WHEN NEW.transfer_type_id=6 AND NEW.amount<>0 THEN
		UPDATE stat_user_daily SET fandian=fandian+NEW.amount WHERE date=FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d') AND user_id=NEW.user_id;
		IF ((SELECT ROW_COUNT())<1) THEN
			INSERT INTO stat_user_daily (date,user_id,parent_id,parent_path,fandian) VALUES (FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d'),NEW.user_id,NEW.parent_id,NEW.parent_path,NEW.amount);
		END IF;
		UPDATE stat_summary_daily SET fandian=fandian+NEW.amount WHERE date=FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d');
		IF ((SELECT ROW_COUNT())<1) THEN
			INSERT INTO stat_summary_daily (date,fandian) VALUES (FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d'),NEW.amount);
		END IF;
		
	 /********** 分红 **************/	
	 WHEN (NEW.transfer_type_id=7 OR NEW.transfer_type_id=8) AND NEW.amount<>0 THEN
		UPDATE stat_user_daily SET commission=commission+NEW.amount WHERE date=FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d') AND user_id=NEW.user_id;
		IF ((SELECT ROW_COUNT())<1) THEN
			INSERT INTO stat_user_daily (date,user_id,parent_id,parent_path,commission) VALUES (FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d'),NEW.user_id,NEW.parent_id,NEW.parent_path,NEW.amount);
		END IF;
		UPDATE stat_summary_daily SET commission=commission+NEW.amount WHERE date=FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d');
		IF ((SELECT ROW_COUNT())<1) THEN
			INSERT INTO stat_summary_daily (date,commission) VALUES (FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d'),NEW.amount);
		END IF;
		
	 /********** 活动费用 **************/	
	 WHEN NEW.transfer_type_id=9 AND NEW.amount<>0 THEN
		UPDATE stat_user_daily SET activity_cost=activity_cost+NEW.amount WHERE date=FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d') AND user_id=NEW.user_id;
		IF ((SELECT ROW_COUNT())<1) THEN
			INSERT INTO stat_user_daily (date,user_id,parent_id,parent_path,activity_cost) VALUES (FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d'),NEW.user_id,NEW.parent_id,NEW.parent_path,NEW.amount);
		END IF;
		UPDATE stat_summary_daily SET activity_cost=activity_cost+NEW.amount WHERE date=FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d');
		IF ((SELECT ROW_COUNT())<1) THEN
			INSERT INTO stat_summary_daily (date,activity_cost) VALUES (FROM_UNIXTIME(NEW.dateline,'%Y-%m-%d'),NEW.amount);
		END IF;

	ELSE
		BEGIN
		END;
    END CASE;
END$

DROP TRIGGER IF EXISTS afeter_insert_users $
CREATE TRIGGER afeter_insert_users
AFTER INSERT ON users
FOR EACH ROW
BEGIN
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
END$

DELIMITER ;