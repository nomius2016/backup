ALTER TABLE `user_profile` ADD `security_question_id` INT NOT NULL DEFAULT '0' COMMENT '安全问题ID' AFTER `email`, ADD `security_answer` VARCHAR(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '安全问题答案' AFTER `security_question_id`;

INSERT INTO admin_menu_actions (admin_menu_id,controller,`action`,`desc`) VALUES (8,'user','set_password','重置用户密码');


CREATE TABLE `user_security_question` (
  `question_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '问题ID',
  `question` varchar(128) CHARACTER SET utf8 NOT NULL COMMENT '问题',
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COMMENT='安全问题模板';
INSERT INTO `user_security_question` VALUES (1,'最喜欢的动物？'),(2,'您的宠物名字？'),(3,'最喜欢吃得水果是什么？'),(4,'您的车的品牌名是什么？'),(5,'您最崇拜的人是谁？'),(6,'您最喜欢的电影是什么？'),(7,'您最喜欢的歌曲是？'),(8,'您最喜欢的运动是什么？');
