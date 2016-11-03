ALTER TABLE `users`
MODIFY COLUMN `balance`  decimal(12,0) NOT NULL DEFAULT 0 COMMENT '中心钱包余额' AFTER `fund_password`,
MODIFY COLUMN `frozon_balance`  decimal(12,0) NOT NULL DEFAULT 0 COMMENT '冻结金额' AFTER `balance`,
MODIFY COLUMN `ag_balance`  decimal(12,0) NOT NULL DEFAULT 0 COMMENT 'AG余额' AFTER `frozon_balance`,
MODIFY COLUMN `sb_balance`  decimal(12,0) NOT NULL DEFAULT 0 COMMENT 'SB余额' AFTER `ag_balance`,
MODIFY COLUMN `pt_balance`  decimal(12,0) NOT NULL DEFAULT 0 COMMENT 'PT余额' AFTER `sb_balance`,
MODIFY COLUMN `regiester_time`  int UNSIGNED NULL DEFAULT 0 COMMENT '注册时间' AFTER `agent_tree`,
MODIFY COLUMN `updatetime`  int UNSIGNED NULL DEFAULT 0 COMMENT '修改时间' AFTER `regiester_time`,
ADD COLUMN `parent_id`  int(10) UNSIGNED NULL DEFAULT 0 COMMENT '上级ID' AFTER `id`,
ADD COLUMN `parent_path`  varchar(255) NULL COMMENT '上级路径' AFTER `parent_id`,
ADD COLUMN `total_deposit`  decimal(12,2) NULL DEFAULT 0 COMMENT '总存款' AFTER `fund_password`,
ADD COLUMN `total_withdraw`  decimal(12,2) UNSIGNED NULL DEFAULT 0 COMMENT '总提款' AFTER `total_deposit`,
ADD COLUMN `total_bet`  decimal(12,2) UNSIGNED NULL DEFAULT 0 COMMENT '总投注' AFTER `total_withdraw`,
ADD COLUMN `last_login_ip`  varchar(15) NULL COMMENT '上次登录IP' AFTER `updatetime`,
ADD COLUMN `last_login_time`  int(10) UNSIGNED NULL DEFAULT 0 COMMENT '上次登录时间' AFTER `last_login_ip`;

CREATE TABLE `stat_user_daily` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '统计表ID',
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `date` date DEFAULT NULL COMMENT '日期',
  `parent_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '上级ID',
  `parent_path` varchar(256) NOT NULL COMMENT '上级路径',
  `user_new_reg` int(10) unsigned DEFAULT '0' COMMENT '新注册用户数',
  `user_have_bet` int(10) unsigned DEFAULT '0' COMMENT '有投注用户数',
  `deposit` bigint(20) unsigned DEFAULT '0' COMMENT '充值总额',
  `withdraw` bigint(20) unsigned DEFAULT '0' COMMENT '提现总额',
  `bet` bigint(20) unsigned DEFAULT '0' COMMENT '投注总额',
  `fandian` bigint(20) unsigned DEFAULT '0' COMMENT '返点总额',
  `bonus` bigint(20) unsigned DEFAULT '0' COMMENT '奖金总额,包括活动奖励',
  `commission` int(11) DEFAULT '0' COMMENT '代理佣金',
  `dataline` int(20) DEFAULT '0' COMMENT '分红红利',
  PRIMARY KEY (`id`),
  UNIQUE KEY `date` (`date`,`user_id`,`parent_path`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='用户每日统计数据';


CREATE TABLE `stat_summary_daily` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `date` date NOT NULL COMMENT '统计时间',
  `dau` int(10) unsigned DEFAULT '0' COMMENT '到访用户数',
  `user_new_reg` int(11) NOT NULL DEFAULT '0' COMMENT '注册人数',
  `user_have_bet` int(11) NOT NULL DEFAULT '0' COMMENT '有投注人数',
  `deposit` bigint(20) unsigned DEFAULT '0' COMMENT '充值总额',
  `deposit_user` int(10) unsigned DEFAULT '0' COMMENT '充值人数',
  `withdraw` bigint(20) unsigned DEFAULT '0' COMMENT '提现总额',
  `withdraw_user` int(10) unsigned DEFAULT '0' COMMENT '提款人数',
  `bet` bigint(20) unsigned DEFAULT '0' COMMENT '投注总额',
  `fandian` bigint(20) unsigned DEFAULT '0' COMMENT '返点总额',
  `bonus` bigint(20) unsigned DEFAULT '0' COMMENT '奖金总额,包括活动奖励',
  `commission` bigint(11) DEFAULT '0' COMMENT '代理佣金',
  `dataline` int(20) DEFAULT '0' COMMENT '分红红利',
  PRIMARY KEY (`id`),
  UNIQUE KEY `date` (`date`)
) ENGINE=InnoDB AUTO_INCREMENT=211 DEFAULT CHARSET=utf8 COMMENT='平台汇总表表';