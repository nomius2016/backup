/*添加字段*/
ALTER TABLE `admin_menu`
ADD COLUMN `type`  tinyint(1) NULL DEFAULT 1 COMMENT '1 菜单  2 辅助功能' AFTER `title`;

DELETE FROM admin_menu WHERE  controller = 'system' and action='menu_auth';
DELETE FROM admin_menu_actions WHERE controller = 'system' and action='menu_auth_op';

/*将以前的操作权限换成查看权限*/
UPDATE admin_menu_authority set op=2 where op=3;

DELETE FROM admin_menu WHERE type=2;
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`type`,`display_sort`,`controller`,`action`) value(3,0,'活动管理-活动列表-保存权限',2,10,'activities','save');
/*将以前的操作权限 写入menu 表*/
INSERT INTO admin_menu (`level`,`parent_id`,`title`,`type`,`display_sort`,`controller`,`action`)
select '3','0',`desc`,2,id,controller,action from admin_menu_actions;

TRUNCATE admin_menu_auth;
INSERT INTO admin_menu_auth (`controller`,`action`,`group_id`) select controller,action,1 from admin_menu;

TRUNCATE admin_menu_authority;
INSERT INTO admin_menu_authority (`group_id`,`menu_id`,`op`) SELECT '1',id,2 FROM admin_menu;