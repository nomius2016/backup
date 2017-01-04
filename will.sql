/*添加字段*/
ALTER TABLE `admin_menu`
ADD COLUMN `type`  tinyint(1) NULL DEFAULT 1 COMMENT '1 菜单  2 辅助功能' AFTER `title`;

