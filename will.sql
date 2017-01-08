ALTER TABLE `system_setting`
ADD COLUMN `type`  tinyint NULL DEFAULT 1 COMMENT '1 代表隐私变量  -1 公共变量' AFTER `last_update`,
ADD COLUMN `ttl`  int NULL DEFAULT 86400 COMMENT '缓存时间' AFTER `type`;

UPDATE system_setting SET type = -1;