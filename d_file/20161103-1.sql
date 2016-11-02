CREATE TABLE `money_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0' COMMENT '用户ID',
  `amount` decimal(12,0) NOT NULL DEFAULT '0' COMMENT '变动金额',
  `before_balance` decimal(10,2) DEFAULT '0.00' COMMENT '变动前金额',
  `after_balance` decimal(10,2) DEFAULT '0.00' COMMENT '变动后金额',
  `type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '1 红利 2存款 3转入中心钱包  6 提款 7 转入平台',
  `io` tinyint(4) NOT NULL DEFAULT '1' COMMENT '1 中心钱包增加前 -1 中心钱包扣钱',
  `createtime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;