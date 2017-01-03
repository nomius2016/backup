ALTER TABLE `activity`
MODIFY COLUMN `end_time`  timestamp NULL DEFAULT NULL COMMENT '结束时间' AFTER `start_time`;