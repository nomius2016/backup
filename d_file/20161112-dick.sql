CREATE TABLE `bank_cards` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `card_user_name` varchar(30) NOT NULL DEFAULT '' COMMENT '卡主姓名',
  `bank_code` varchar(10) NOT NULL DEFAULT '' COMMENT 'ICBC ABC CMB CCB COMM BOC CEB CMBC CITIC SZPAB SPDB CIB',
  `bank_name` varchar(40) NOT NULL DEFAULT '' COMMENT '银行名称',
  `account_no` varchar(30) NOT NULL DEFAULT '' COMMENT '银行卡号',
  `display_name` varchar(40) NOT NULL DEFAULT '' COMMENT '显示名称',
  `branch_name` varchar(50) DEFAULT NULL COMMENT '银行分支名称',
  `remark` varchar(50) DEFAULT NULL COMMENT '备注',
  `create_admin_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '管理员ID',
  `create_time` timestamp   NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='银行卡';

insert into admin_menu (`level`,`parent_id`,`title`,`display_sort`,`controller`,`action`) value('2','6','银行卡设定','8','system','bank_cards');
insert into admin_menu_actions (`admin_menu_id`,`controller`,`action`,`desc`) SELECT id,'system','bank_cards_op','银行卡列表操作权限' FROM admin_menu order by id desc limit 1;

####修复权限的bug
update admin_menu_actions set admin_menu_id = 43 where id = 1;
insert into admin_menu_actions (`admin_menu_id`,`controller`,`action`,`desc`) value('43','system','admin_auth','授权管理页面');
insert into admin_menu_auth (`controller`,`action`,`group_id`) value('system','admin_auth',1);
insert into admin_menu_auth (`controller`,`action`,`group_id`) value('system','admin_auth_formop',1);


CREATE TABLE `email_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL COMMENT '邮箱名称',
  `host` varchar(50) NOT NULL COMMENT 'host',
  `port` int(10) NOT NULL DEFAULT '465' COMMENT '端口号',
  `protocol` varchar(10) NOT NULL DEFAULT 'smtp' COMMENT '发送方式',
  `crypto` varchar(10) NOT NULL DEFAULT 'ssl' COMMENT '协议',
  `url` varchar(100) NOT NULL COMMENT '登陆的URL',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='邮箱类型管理表';

insert into admin_menu_actions (`admin_menu_id`,`controller`,`action`,`desc`) value('46','system','email_op','邮箱管理操作全系');