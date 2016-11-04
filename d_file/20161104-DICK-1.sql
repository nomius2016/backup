ALTER TABLE `users`
MODIFY COLUMN `regiester_time`  timestamp NULL DEFAULT NULL COMMENT '注册时间' AFTER `agent_tree`,
MODIFY COLUMN `updatetime`  timestamp NULL DEFAULT NULL COMMENT '修改时间' AFTER `regiester_time`,
MODIFY COLUMN `last_login_time`  timestamp NULL DEFAULT NULL COMMENT '上次登录时间' AFTER `last_login_ip`;

