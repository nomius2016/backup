ALTER TABLE `user_profile`
CHANGE COLUMN `name` `real_name`  varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '姓名' AFTER `user_id`,
ADD COLUMN `birthday`  date NULL AFTER `sex`;

-- MySQL dump 10.13  Distrib 5.7.12-5, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: hdb
-- ------------------------------------------------------
-- Server version       5.7.12-5

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `gaming`
--

DROP TABLE IF EXISTS `gaming`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gaming` (
  `gaming_id` smallint(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '转账类型ID',
  `code` varchar(16) DEFAULT NULL COMMENT '平台简称，如BBIN',
  `name` varchar(24) CHARACTER SET utf8 DEFAULT NULL COMMENT '类型名称',
  `status` tinyint(1) DEFAULT '1' COMMENT '状态 1 正常,2中心到平台,3平台到中心,4不能转账,5不能访问且不能转账 ',
  PRIMARY KEY (`gaming_id`),
  KEY `type_id` (`gaming_id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=latin1 COMMENT='第三方游戏平台表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gaming`
--

LOCK TABLES `gaming` WRITE;
/*!40000 ALTER TABLE `gaming` DISABLE KEYS */;
INSERT INTO `gaming` VALUES (100,'AG','AG平台',1),(101,'SB','沙巴体育平台',1),(102,'PT','PT平台',1),(103,'EA','EA平台',1),(104,'BBIN','BBIN平台',1),(105,'HG','HG平台',1),(106,'OPUS','OPUS平台',1),(107,'MG','MG平台',1),(108,'GD','GD平台',1),(109,'EA','EG平台',1),(110,'CROW','皇冠体育',1);
/*!40000 ALTER TABLE `gaming` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fund_transfer_type`
--

DROP TABLE IF EXISTS `fund_transfer_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fund_transfer_type` (
  `type_id` smallint(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '转账类型ID',
  `type_name` varchar(24) CHARACTER SET utf8 DEFAULT NULL COMMENT '类型名称',
  `income` tinyint(1) unsigned DEFAULT '1' COMMENT '对balance的操作，0支出1收入',
  PRIMARY KEY (`type_id`),
  KEY `type_id` (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fund_transfer_type`
--

LOCK TABLES `fund_transfer_type` WRITE;
/*!40000 ALTER TABLE `fund_transfer_type` DISABLE KEYS */;
INSERT INTO `fund_transfer_type` VALUES (1,'充值',1),(2,'提现',0),(3,'投注',0),(4,'追号',0),(5,'派奖',1),(6,'返点',1),(7,'分红',1),(8,'佣金 ',1),(9,'活动奖金/励',1),(10,'冻结金额',0),(11,'U2U转账',0),(12,'扣款',0),(100,'AG转账',0),(101,'沙巴体育转账',0),(102,'PT转账',0),(103,'EA转账',0),(104,'BBIN转账',0),(105,'HG转账',0),(106,'OPUS转账',0),(107,'MG转账',0),(108,'GD转账',0),(109,'EG转账',0),(110,'皇冠体育转账',0);
/*!40000 ALTER TABLE `fund_transfer_type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-27 23:52:13