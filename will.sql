UPDATE payment_group set nickname='GOPAY' where payment_group_id = 3;
INSERT INTO system_setting (`variable`,`content`,`label`,`last_update`) value('min_deposit','50.00','单次最低存款金额',NOW());
INSERT INTO system_setting (`variable`,`content`,`label`,`last_update`) value('max_deposit','50000.00','单次最大存款金额',NOW());