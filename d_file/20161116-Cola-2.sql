ALTER TABLE `fund_deposit` CHANGE  `pay_method_id` `payment_method_id` SMALLINT(5) UNSIGNED NULL DEFAULT '0' COMMENT '支付渠道';
update fund_deposit set payment_method_id=3; 