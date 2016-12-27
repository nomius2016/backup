ALTER TABLE `user_gaming_account`
DROP INDEX `uga_u` ,
ADD UNIQUE INDEX `uga_u` (`user_id`, `gaming_id`) USING BTREE ;