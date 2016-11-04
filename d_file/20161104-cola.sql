ALTER TABLE `stat_summary_daily`
MODIFY COLUMN `bonus`  bigint(20) UNSIGNED NULL DEFAULT 0 COMMENT '奖金/中奖金额' AFTER `bet`,
ADD COLUMN `activity_cost`  bigint(20) NULL DEFAULT 0 COMMENT '活动费用' AFTER `fandian`;

ALTER TABLE `stat_user_daily`
MODIFY COLUMN `bonus`  bigint(20) UNSIGNED NULL DEFAULT 0 COMMENT '奖金/中奖金额' AFTER `fandian`,
ADD COLUMN `activity_cost`  bigint(20) NULL DEFAULT 0 COMMENT '活动费用' AFTER `commission`,
ADD INDEX (`parent_id`, `date`) ;

CREATE TABLE `fund_transfer_type` (
  `type_id` smallint(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '转账类型ID',
  `type_name` varchar(24) CHARACTER SET utf8 DEFAULT NULL COMMENT '类型名称',
  KEY `type_id` (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
insert into fund_transfer_type (type_id,type_name) values (1,'充值'),(2,'用户提现'),(3,'投注'),(4,'返点'),(5,'派奖'),(6,'系统提款'),(8,'与他人转账'),(9,'撤消提款返回'),(10,'系统终止追号'),(11,'追号返款'),(12,'撤单返款'),(13,'撤消返点'),(14,'系统内互转'),(15,'追号扣款'),(16,'追号扣款'),(16,'追号冻结'),(17,'撤销奖金'),(18,'活动礼金'),(19,'契约分红'),(20,'消费佣金'),(21,'补单充值'),(22,'亏损佣金');

CREATE TABLE `fund_transfer_log` (
  `id` bigint(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0' COMMENT '用户ID',
  `parent_id` int(10) unsigned DEFAULT '0' COMMENT '上级ID',
  `parent_path` varchar(255) DEFAULT NULL COMMENT '上级路径',
  `before_balance` decimal(10,2) DEFAULT '0.00' COMMENT '变动前金额',
  `after_balance` decimal(10,2) DEFAULT '0.00' COMMENT '变动后金额',
  `transfer_type_id` smallint(4) DEFAULT '0' COMMENT '和fund_transfer_type对应',
  `amount` decimal(12,0) NOT NULL DEFAULT '0' COMMENT '变动金额',
  `op_user_id` tinyint(4) DEFAULT '0' COMMENT '操作人员id，主要针对不是本人操作',
  `bet_id` bigint(20) unsigned DEFAULT '0' COMMENT ' 关联注单id',
  `remark` text COMMENT '备注',
  `dateline` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`,`transfer_type_id`,`dateline`),
  KEY `dateline` (`dateline`,`transfer_type_id`,`user_id`,`parent_id`,`parent_path`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='资金变动记录表';