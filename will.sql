DELETE FROM payment_group where merchant = '银行转账';

ALTER TABLE `payment_group`
MODIFY COLUMN `type`  tinyint(4) NULL DEFAULT 1 COMMENT '1 代表在线支付 2 代表支付宝3 代表微信 4代表银行' AFTER `mobile`;

UPDATE payment_group SET type = 4 WHERE merchant in ('工商银行','招商银行','中国银行','农业银行','建设银行');