-- phpMyAdmin SQL Dump
-- version 3.2.3
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 14, 2012 at 11:48 PM
-- Server version: 5.1.40
-- PHP Version: 5.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

-- --------------------------------------------------------

DROP TABLE IF EXISTS `activate`;
CREATE TABLE `activate`  (
  `code` char(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `exp_time` datetime NOT NULL,
  `type` int(1) NOT NULL COMMENT '1-        ,2-              ',
  PRIMARY KEY (`code`) USING BTREE,
  UNIQUE INDEX `user_id`(`user_id`, `type`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of activate
-- ----------------------------

-- ----------------------------
-- Table structure for adminmenu
-- ----------------------------
DROP TABLE IF EXISTS `adminmenu`;
CREATE TABLE `adminmenu`  (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `title` char(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `path` char(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `dostup` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '-1',
  `show` int(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 19 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of adminmenu
-- ----------------------------
INSERT INTO `adminmenu` VALUES (1, 'aming Accounts', 'users', '1|4', 1);
INSERT INTO `adminmenu` VALUES (2, 'Tournaments', 'tournament', '1', 1);
INSERT INTO `adminmenu` VALUES (3, 'Offers', 'bonus', '1', 1);
INSERT INTO `adminmenu` VALUES (4, 'Jackpots', 'jp', '1', 1);
INSERT INTO `adminmenu` VALUES (5, 'Game categories', 'game_cat', '1', 1);
INSERT INTO `adminmenu` VALUES (6, 'Setting Up Games', 'game', '1', 1);
INSERT INTO `adminmenu` VALUES (7, 'System Setup', 'settings', '1', 1);
INSERT INTO `adminmenu` VALUES (8, 'VIP - glasses', 'gamer_rating', '1', 1);
INSERT INTO `adminmenu` VALUES (9, 'Reports', 'report', '1|4', 1);
INSERT INTO `adminmenu` VALUES (10, 'PIN codes', 'pin', '1', 1);
INSERT INTO `adminmenu` VALUES (11, 'Templates E-MAIL', 'email', '1', 1);
INSERT INTO `adminmenu` VALUES (12, 'Sending messages', 'mailing', '1', 1);
INSERT INTO `adminmenu` VALUES (13, 'Pages', 'pages', '1', 1);
INSERT INTO `adminmenu` VALUES (14, 'Outgoing payment', 'outpay_detail', '1|4', 0);
INSERT INTO `adminmenu` VALUES (15, 'Edit page', 'edit_content', '1', 0);
INSERT INTO `adminmenu` VALUES (16, 'Adding a page', 'add_page', '1', 0);
INSERT INTO `adminmenu` VALUES (17, 'Editing the game', 'edit_game', '1', 0);
INSERT INTO `adminmenu` VALUES (18, 'Add a category of games', 'add_game_cat', '1', 0);

-- ----------------------------
-- Table structure for auth_log
-- ----------------------------
DROP TABLE IF EXISTS `auth_log`;
CREATE TABLE `auth_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ip` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `date_time` datetime NOT NULL,
  `browser` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `os` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userAgent` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of auth_log
-- ----------------------------

-- ----------------------------
-- Table structure for bonus
-- ----------------------------
DROP TABLE IF EXISTS `bonus`;
CREATE TABLE `bonus`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` set('reg','dep','nondep','vip','return','freespin') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `is_reg` int(1) NOT NULL DEFAULT 0,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `desc` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `min_deposit` int(11) NOT NULL DEFAULT 0,
  `perc` int(11) NULL DEFAULT NULL,
  `max_bon` int(11) NULL DEFAULT NULL,
  `koef` int(11) NULL DEFAULT NULL,
  `wager` int(11) NULL DEFAULT NULL,
  `activate_time` int(11) NULL DEFAULT NULL,
  `live_time` int(11) NULL DEFAULT NULL,
  `pic` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `num_deposit` int(11) NULL DEFAULT NULL,
  `start_date` date NULL DEFAULT NULL,
  `end_date` date NULL DEFAULT NULL,
  `start_time` time NULL DEFAULT NULL,
  `end_time` time NULL DEFAULT NULL,
  `is_loop` int(1) NULL DEFAULT NULL,
  `users` int(1) NOT NULL DEFAULT 0 COMMENT '0-      , 1-          , 2-             ',
  `g_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of bonus
-- ----------------------------
INSERT INTO `bonus` VALUES (1, 'dep', 1, '250% Deposit Bonus', 'Get 3.5 times more money to 50 00 point for the game in your favorite slots', 100, 250, 5000, NULL, 1, 3, NULL, '250.png', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL);
INSERT INTO `bonus` VALUES (2, 'vip', 1, '2   VIP points', 'Advance on VIP-levels twice faster and win more prizes', 200, NULL, NULL, 2, NULL, 3, 2, '2x.png', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL);
INSERT INTO `bonus` VALUES (3, 'return', 1, '15% Return', 'Insure your deposit and get a return in case of losing', 300, 15, NULL, NULL, NULL, 3, 2, '15.png', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL);
INSERT INTO `bonus` VALUES (4, 'dep', 0, '100% on Second Deposit Bonus', 'Who said that there should be little good? We adhere to a completely different rule. There must be a lot of good things. Refill your account and get a 100% bonus up to 40 00 point.', 500, 100, 40000, NULL, 10, 5, NULL, '40000.png', 2, '2017-04-01', '2020-04-01', NULL, NULL, NULL, 0, NULL);
INSERT INTO `bonus` VALUES (5, 'dep', 0, '50% on Third Deposit Bonus', 'What could be better than a gift? Only 3 gifts! Refill your account and get another 50% extra. Now, practically nothing separates you from the big winnings. Make money, get ahead and go to your favorite games!', 1000, 50, 30000, NULL, 10, 7, NULL, '30000.png', 3, '2017-04-01', '2020-04-01', NULL, NULL, NULL, 0, NULL);
INSERT INTO `bonus` VALUES (6, 'dep', 0, '30% on Fourth Deposit Bonus', 'We appreciate our regular players and share one more bonus. Take your 30% off for the next replenishment. But do not forget, that you have limited time to activate it. Do not delay, enjoy great games!', 2000, 30, 20000, NULL, 10, 9, NULL, '20000.png', 4, '2017-04-01', '2020-04-01', NULL, NULL, NULL, 0, NULL);
INSERT INTO `bonus` VALUES (7, 'dep', 0, '20% on fifth deposit Bonus', 'Five is an excellent number! And if so, then it should be properly noted. This can be done, for example, by making your fifth deposit in the Grand Casino and receiving a 20% bonus up to 100 00 points.', 3000, 20, 10000, NULL, 10, 11, NULL, '10000.png', 5, '2017-04-01', '2020-04-01', NULL, NULL, NULL, 0, NULL);

-- ----------------------------
-- Table structure for bonus_stat_bot
-- ----------------------------
DROP TABLE IF EXISTS `bonus_stat_bot`;
CREATE TABLE `bonus_stat_bot`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bonus_id` int(11) NOT NULL,
  `login` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `win` int(11) NOT NULL,
  `date_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `bonus_id`(`bonus_id`, `login`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 37 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bonus_stat_bot
-- ----------------------------
INSERT INTO `bonus_stat_bot` VALUES (29, 2, ' Appon93', 800, '2023-10-18 12:38:36');
INSERT INTO `bonus_stat_bot` VALUES (28, 2, ' Aily82', 500, '2023-10-18 12:38:36');
INSERT INTO `bonus_stat_bot` VALUES (27, 2, ' Lamiya', 700, '2023-10-18 12:38:36');
INSERT INTO `bonus_stat_bot` VALUES (26, 2, ' ANTON47', 5500, '2023-10-18 12:38:36');
INSERT INTO `bonus_stat_bot` VALUES (25, 2, ' Ruslan2292', 2500, '2023-10-18 12:38:36');
INSERT INTO `bonus_stat_bot` VALUES (24, 2, ' Andifulated', 2000, '2023-10-18 12:38:36');
INSERT INTO `bonus_stat_bot` VALUES (23, 2, ' serhio771', 600, '2023-10-18 12:38:36');
INSERT INTO `bonus_stat_bot` VALUES (22, 2, ' Nounkilthe', 800, '2023-10-18 12:38:36');
INSERT INTO `bonus_stat_bot` VALUES (21, 2, ' Swence', 2500, '2023-10-18 12:38:36');
INSERT INTO `bonus_stat_bot` VALUES (20, 2, ' Gionly', 600, '2023-10-18 12:38:36');
INSERT INTO `bonus_stat_bot` VALUES (19, 2, 'mainer', 15000, '2023-10-18 12:38:36');
INSERT INTO `bonus_stat_bot` VALUES (18, 2, ' Whowerromed91', 2000, '2023-10-18 12:38:36');
INSERT INTO `bonus_stat_bot` VALUES (30, 2, ' Ruence', 4000, '2023-10-18 12:38:36');
INSERT INTO `bonus_stat_bot` VALUES (31, 2, ' Sofirina48', 700, '2023-10-18 12:38:36');
INSERT INTO `bonus_stat_bot` VALUES (32, 2, ' maria26', 3500, '2023-10-18 12:38:36');
INSERT INTO `bonus_stat_bot` VALUES (33, 2, ' Prooma7', 700, '2023-10-18 12:38:36');
INSERT INTO `bonus_stat_bot` VALUES (34, 2, ' Hateplould91', 12000, '2023-10-18 12:38:36');
INSERT INTO `bonus_stat_bot` VALUES (35, 2, ' tanya', 14000, '2023-10-18 12:39:35');
INSERT INTO `bonus_stat_bot` VALUES (36, 2, ' Feweake', 1000, '2023-10-18 12:39:53');

-- ----------------------------
-- Table structure for bonus_user
-- ----------------------------
DROP TABLE IF EXISTS `bonus_user`;
CREATE TABLE `bonus_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bonus_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `start_time` datetime NOT NULL,
  `status` enum('0','1','2','3','4') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '0-                , 1-                            , 2-             (                                        ), 3-          , 4-                  ',
  `enter_id` char(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `spin` int(11) NULL DEFAULT NULL,
  `win` decimal(12, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `bonus_id_2`(`bonus_id`, `user_id`, `start_time`) USING BTREE,
  UNIQUE INDEX `enter_id`(`enter_id`) USING BTREE,
  INDEX `bonus_id`(`bonus_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of bonus_user
-- ----------------------------

-- ----------------------------
-- Table structure for enter
-- ----------------------------
DROP TABLE IF EXISTS `enter`;
CREATE TABLE `enter`  (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `inv_code` char(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `login` char(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `sum` decimal(9, 2) NOT NULL DEFAULT 0.00,
  `date` int(10) NOT NULL DEFAULT 0,
  `status` int(1) NOT NULL DEFAULT 0,
  `paysys` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `returned` int(1) NOT NULL DEFAULT 1,
  `ip` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `inv_code`(`inv_code`) USING BTREE,
  INDEX `login`(`login`) USING BTREE,
  INDEX `date`(`date`) USING BTREE,
  INDEX `ip`(`ip`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of enter
-- ----------------------------

-- ----------------------------
-- Table structure for game_cat
-- ----------------------------
DROP TABLE IF EXISTS `game_cat`;
CREATE TABLE `game_cat`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pos` int(5) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `lang` varchar(3) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'eu',
  `href` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `parent` int(11) NOT NULL,
  `view` int(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `href`(`href`, `lang`) USING BTREE,
  INDEX `parent`(`parent`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 93 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of game_cat
-- ----------------------------
INSERT INTO `game_cat` VALUES (1, 0, 'Popular', 'eu', '', 0, 1);
INSERT INTO `game_cat` VALUES (2, 1, 'Slots', 'eu', 'slots', 0, 1);
INSERT INTO `game_cat` VALUES (3, 2, 'Jackpots', 'eu', 'jp', 0, 1);
INSERT INTO `game_cat` VALUES (4, 3, 'Tabletop', 'eu', 'table', 0, 1);
INSERT INTO `game_cat` VALUES (5, 3, 'Amatic', 'eu', 'slots/amatic', 2, 1);
INSERT INTO `game_cat` VALUES (18, 3, 'EGT', 'eu', 'slots/egt', 2, 1);
INSERT INTO `game_cat` VALUES (21, 500, 'favorites', 'eu', 'favorites', 0, 1);
INSERT INTO `game_cat` VALUES (22, 0, 'Popular', 'us', '', 0, 1);
INSERT INTO `game_cat` VALUES (23, 1, 'Slots', 'us', 'slots', 0, 1);
INSERT INTO `game_cat` VALUES (24, 2, 'JackPot', 'us', 'jp', 0, 1);
INSERT INTO `game_cat` VALUES (25, 3, 'Table', 'us', 'table', 0, 1);
INSERT INTO `game_cat` VALUES (26, 3, 'Amatic', 'us', 'slots/amatic', 23, 1);
INSERT INTO `game_cat` VALUES (39, 3, 'EGT', 'us', 'slots/egt', 23, 1);
INSERT INTO `game_cat` VALUES (42, 500, 'Favorites', 'us', 'favorites', 0, 1);
INSERT INTO `game_cat` VALUES (43, 0, 'Popular', 'es', '', 0, 1);
INSERT INTO `game_cat` VALUES (44, 1, 'Slots', 'es', 'slots', 0, 1);
INSERT INTO `game_cat` VALUES (45, 2, 'JackPot', 'es', 'jp', 0, 1);
INSERT INTO `game_cat` VALUES (46, 3, 'Table', 'es', 'table', 0, 1);
INSERT INTO `game_cat` VALUES (47, 3, 'Amatic', 'es', 'slots/amatic', 44, 1);
INSERT INTO `game_cat` VALUES (60, 3, 'EGT', 'es', 'slots/egt', 44, 1);
INSERT INTO `game_cat` VALUES (63, 500, 'Favorites', 'es', 'favorites', 0, 1);
INSERT INTO `game_cat` VALUES (64, 0, 'Popular', 'fr', '', 0, 1);
INSERT INTO `game_cat` VALUES (65, 1, 'Slots', 'fr', 'slots', 0, 1);
INSERT INTO `game_cat` VALUES (66, 2, 'JackPot', 'fr', 'jp', 0, 1);
INSERT INTO `game_cat` VALUES (67, 3, 'Table', 'fr', 'table', 0, 1);
INSERT INTO `game_cat` VALUES (68, 3, 'Amatic', 'fr', 'slots/amatic', 65, 1);
INSERT INTO `game_cat` VALUES (92, 3, 'Pragmatic', 'fr', 'slots/pragmatic', 65, 1);
INSERT INTO `game_cat` VALUES (91, 3, 'Pragmatic', 'es', 'slots/pragmatic', 44, 1);
INSERT INTO `game_cat` VALUES (90, 3, 'Pragmatic', 'us', 'slots/pragmatic', 23, 1);
INSERT INTO `game_cat` VALUES (81, 3, 'EGT', 'fr', 'slots/egt', 65, 1);
INSERT INTO `game_cat` VALUES (89, 3, 'Pragmatic', 'eu', 'slots/pragmatic', 2, 1);
INSERT INTO `game_cat` VALUES (84, 500, 'Favorites', 'fr', 'favorites', 0, 1);
INSERT INTO `game_cat` VALUES (85, 3, 'Endorphina', 'eu', 'slots/endorphine', 2, 1);
INSERT INTO `game_cat` VALUES (86, 3, 'Endorphina', 'us', 'slots/endorphine', 23, 1);
INSERT INTO `game_cat` VALUES (87, 3, 'Endorphina', 'es', 'slots/endorphine', 44, 1);
INSERT INTO `game_cat` VALUES (88, 3, 'Endorphina', 'fr', 'slots/endorphine', 65, 1);

-- ----------------------------
-- Table structure for game_cat_rel
-- ----------------------------
DROP TABLE IF EXISTS `game_cat_rel`;
CREATE TABLE `game_cat_rel`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `g_id` int(11) NOT NULL,
  `cat_href` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `g_id_2`(`g_id`, `cat_href`) USING BTREE,
  INDEX `g_id`(`g_id`, `cat_href`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 173 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of game_cat_rel
-- ----------------------------
INSERT INTO `game_cat_rel` VALUES (1, 200, 'slots');
INSERT INTO `game_cat_rel` VALUES (2, 200, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (3, 201, 'slots');
INSERT INTO `game_cat_rel` VALUES (4, 201, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (5, 202, 'slots');
INSERT INTO `game_cat_rel` VALUES (6, 202, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (7, 203, 'slots');
INSERT INTO `game_cat_rel` VALUES (8, 203, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (9, 204, 'slots');
INSERT INTO `game_cat_rel` VALUES (10, 204, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (11, 205, 'slots');
INSERT INTO `game_cat_rel` VALUES (12, 205, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (13, 206, 'slots');
INSERT INTO `game_cat_rel` VALUES (14, 206, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (15, 207, 'slots');
INSERT INTO `game_cat_rel` VALUES (16, 207, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (17, 208, 'slots');
INSERT INTO `game_cat_rel` VALUES (18, 208, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (19, 209, 'slots');
INSERT INTO `game_cat_rel` VALUES (20, 209, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (21, 210, 'slots');
INSERT INTO `game_cat_rel` VALUES (22, 210, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (23, 211, 'slots');
INSERT INTO `game_cat_rel` VALUES (24, 211, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (25, 212, 'slots');
INSERT INTO `game_cat_rel` VALUES (26, 212, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (27, 213, 'slots');
INSERT INTO `game_cat_rel` VALUES (28, 213, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (29, 214, 'slots');
INSERT INTO `game_cat_rel` VALUES (30, 214, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (31, 215, 'slots');
INSERT INTO `game_cat_rel` VALUES (32, 215, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (33, 216, 'slots');
INSERT INTO `game_cat_rel` VALUES (34, 216, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (35, 217, 'slots');
INSERT INTO `game_cat_rel` VALUES (36, 217, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (37, 218, 'slots');
INSERT INTO `game_cat_rel` VALUES (38, 218, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (39, 219, 'slots');
INSERT INTO `game_cat_rel` VALUES (40, 219, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (41, 220, 'slots');
INSERT INTO `game_cat_rel` VALUES (42, 220, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (43, 221, 'slots');
INSERT INTO `game_cat_rel` VALUES (44, 221, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (45, 222, 'slots');
INSERT INTO `game_cat_rel` VALUES (46, 222, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (47, 223, 'slots');
INSERT INTO `game_cat_rel` VALUES (48, 223, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (49, 224, 'slots');
INSERT INTO `game_cat_rel` VALUES (50, 224, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (51, 225, 'slots');
INSERT INTO `game_cat_rel` VALUES (52, 225, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (53, 226, 'slots');
INSERT INTO `game_cat_rel` VALUES (54, 226, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (55, 227, 'slots');
INSERT INTO `game_cat_rel` VALUES (56, 227, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (57, 228, 'slots');
INSERT INTO `game_cat_rel` VALUES (58, 228, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (59, 229, 'slots');
INSERT INTO `game_cat_rel` VALUES (60, 229, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (61, 230, 'slots');
INSERT INTO `game_cat_rel` VALUES (62, 230, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (63, 231, 'slots');
INSERT INTO `game_cat_rel` VALUES (64, 231, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (65, 232, 'slots');
INSERT INTO `game_cat_rel` VALUES (66, 232, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (67, 233, 'slots');
INSERT INTO `game_cat_rel` VALUES (68, 233, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (69, 234, 'slots');
INSERT INTO `game_cat_rel` VALUES (70, 234, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (71, 235, 'slots');
INSERT INTO `game_cat_rel` VALUES (72, 235, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (73, 236, 'slots');
INSERT INTO `game_cat_rel` VALUES (74, 236, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (75, 237, 'slots');
INSERT INTO `game_cat_rel` VALUES (76, 237, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (77, 238, 'slots');
INSERT INTO `game_cat_rel` VALUES (78, 238, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (79, 239, 'slots');
INSERT INTO `game_cat_rel` VALUES (80, 239, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (81, 240, 'slots');
INSERT INTO `game_cat_rel` VALUES (82, 240, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (83, 241, 'slots');
INSERT INTO `game_cat_rel` VALUES (84, 241, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (85, 242, 'slots');
INSERT INTO `game_cat_rel` VALUES (86, 242, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (87, 243, 'slots');
INSERT INTO `game_cat_rel` VALUES (88, 243, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (89, 244, 'slots');
INSERT INTO `game_cat_rel` VALUES (90, 244, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (91, 245, 'slots');
INSERT INTO `game_cat_rel` VALUES (92, 245, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (93, 246, 'slots');
INSERT INTO `game_cat_rel` VALUES (94, 246, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (95, 247, 'slots');
INSERT INTO `game_cat_rel` VALUES (96, 247, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (97, 248, 'slots');
INSERT INTO `game_cat_rel` VALUES (98, 248, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (99, 249, 'slots');
INSERT INTO `game_cat_rel` VALUES (100, 249, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (101, 250, 'slots');
INSERT INTO `game_cat_rel` VALUES (102, 250, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (103, 251, 'slots');
INSERT INTO `game_cat_rel` VALUES (104, 251, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (105, 252, 'slots');
INSERT INTO `game_cat_rel` VALUES (106, 252, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (107, 253, 'slots');
INSERT INTO `game_cat_rel` VALUES (108, 253, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (109, 254, 'slots');
INSERT INTO `game_cat_rel` VALUES (110, 254, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (111, 255, 'slots');
INSERT INTO `game_cat_rel` VALUES (112, 255, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (113, 256, 'slots');
INSERT INTO `game_cat_rel` VALUES (114, 256, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (115, 257, 'slots');
INSERT INTO `game_cat_rel` VALUES (116, 257, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (117, 258, 'slots');
INSERT INTO `game_cat_rel` VALUES (118, 258, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (119, 259, 'slots');
INSERT INTO `game_cat_rel` VALUES (120, 259, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (121, 260, 'slots');
INSERT INTO `game_cat_rel` VALUES (122, 260, 'slots/amatic');
INSERT INTO `game_cat_rel` VALUES (123, 265, 'slots');
INSERT INTO `game_cat_rel` VALUES (124, 265, 'slots/egt');
INSERT INTO `game_cat_rel` VALUES (125, 266, 'slots');
INSERT INTO `game_cat_rel` VALUES (126, 266, 'slots/egt');
INSERT INTO `game_cat_rel` VALUES (127, 267, 'slots');
INSERT INTO `game_cat_rel` VALUES (128, 267, 'slots/egt');
INSERT INTO `game_cat_rel` VALUES (129, 268, 'slots');
INSERT INTO `game_cat_rel` VALUES (130, 268, 'slots/egt');
INSERT INTO `game_cat_rel` VALUES (131, 269, 'slots');
INSERT INTO `game_cat_rel` VALUES (132, 269, 'slots/egt');
INSERT INTO `game_cat_rel` VALUES (133, 270, 'slots');
INSERT INTO `game_cat_rel` VALUES (134, 270, 'slots/egt');
INSERT INTO `game_cat_rel` VALUES (135, 271, 'slots');
INSERT INTO `game_cat_rel` VALUES (136, 271, 'slots/egt');
INSERT INTO `game_cat_rel` VALUES (137, 272, 'slots');
INSERT INTO `game_cat_rel` VALUES (138, 272, 'slots/egt');
INSERT INTO `game_cat_rel` VALUES (139, 273, 'slots');
INSERT INTO `game_cat_rel` VALUES (140, 273, 'slots/egt');
INSERT INTO `game_cat_rel` VALUES (141, 274, 'slots');
INSERT INTO `game_cat_rel` VALUES (142, 274, 'slots/egt');
INSERT INTO `game_cat_rel` VALUES (143, 275, 'slots');
INSERT INTO `game_cat_rel` VALUES (144, 275, 'slots/egt');
INSERT INTO `game_cat_rel` VALUES (145, 276, 'slots');
INSERT INTO `game_cat_rel` VALUES (146, 276, 'slots/egt');
INSERT INTO `game_cat_rel` VALUES (147, 277, 'slots');
INSERT INTO `game_cat_rel` VALUES (148, 277, 'slots/egt');
INSERT INTO `game_cat_rel` VALUES (149, 278, 'slots');
INSERT INTO `game_cat_rel` VALUES (150, 278, 'slots/egt');
INSERT INTO `game_cat_rel` VALUES (151, 279, 'slots');
INSERT INTO `game_cat_rel` VALUES (152, 279, 'slots/egt');
INSERT INTO `game_cat_rel` VALUES (153, 280, 'slots');
INSERT INTO `game_cat_rel` VALUES (154, 280, 'slots/endorphine');
INSERT INTO `game_cat_rel` VALUES (155, 281, 'slots');
INSERT INTO `game_cat_rel` VALUES (156, 281, 'slots/endorphine');
INSERT INTO `game_cat_rel` VALUES (157, 282, 'slots');
INSERT INTO `game_cat_rel` VALUES (158, 282, 'slots/endorphine');
INSERT INTO `game_cat_rel` VALUES (159, 283, 'slots');
INSERT INTO `game_cat_rel` VALUES (160, 283, 'slots/endorphine');
INSERT INTO `game_cat_rel` VALUES (161, 284, 'slots');
INSERT INTO `game_cat_rel` VALUES (162, 284, 'slots/endorphine');
INSERT INTO `game_cat_rel` VALUES (163, 285, 'slots');
INSERT INTO `game_cat_rel` VALUES (164, 285, 'slots/pragmatic');
INSERT INTO `game_cat_rel` VALUES (165, 286, 'slots');
INSERT INTO `game_cat_rel` VALUES (166, 286, 'slots/pragmatic');
INSERT INTO `game_cat_rel` VALUES (167, 287, 'slots');
INSERT INTO `game_cat_rel` VALUES (168, 287, 'slots/pragmatic');
INSERT INTO `game_cat_rel` VALUES (169, 288, 'slots');
INSERT INTO `game_cat_rel` VALUES (170, 288, 'slots/pragmatic');
INSERT INTO `game_cat_rel` VALUES (171, 289, 'slots');
INSERT INTO `game_cat_rel` VALUES (172, 289, 'slots/pragmatic');

-- ----------------------------
-- Table structure for game_favorites
-- ----------------------------
DROP TABLE IF EXISTS `game_favorites`;
CREATE TABLE `game_favorites`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `g_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `g_id`(`g_id`, `user_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of game_favorites
-- ----------------------------

-- ----------------------------
-- Table structure for game_group
-- ----------------------------
DROP TABLE IF EXISTS `game_group`;
CREATE TABLE `game_group`  (
  `gr_id` int(2) NOT NULL AUTO_INCREMENT,
  `position` int(11) NOT NULL DEFAULT 0 COMMENT '               at                       ',
  `gr_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `start_path` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`gr_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of game_group
-- ----------------------------
INSERT INTO `game_group` VALUES (1, 0, 'ADDITIONAL BANKS', NULL);
INSERT INTO `game_group` VALUES (15, 15, 'AMATIC', 'amatic');
INSERT INTO `game_group` VALUES (17, 17, 'EGT', 'egt');
INSERT INTO `game_group` VALUES (18, 18, 'ENDORPHINE', 'endorphine');
INSERT INTO `game_group` VALUES (19, 19, 'PRAGMATIC', 'pragmatic');

-- ----------------------------
-- Table structure for game_log
-- ----------------------------
DROP TABLE IF EXISTS `game_log`;
CREATE TABLE `game_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `g_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `game_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `ip` char(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `post` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `str` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of game_log
-- ----------------------------
INSERT INTO `game_log` VALUES (1, '2023-10-18 17:57:14', 270, 2, '::1', '', 'action=bet##reelString=5, 4, 1, 3, 6, 2, 1, 4, 8, 4, 9, 0, 5, 1, 7, 5, 8, 7, 2, 1, 6, 5, 7, 2, 7##winAmount=0##gameState=idle##ws=##freespins=0##freespinsUsed=0##scatters=##exp=-1##freespinScatters=##');
INSERT INTO `game_log` VALUES (2, '2023-10-18 17:57:16', 270, 2, '::1', '', 'action=bet##reelString=5, 0, 6, 3, 6, 2, 4, 7, 2, 4, 9, 6, 7, 4, 7, 5, 8, 9, 4, 1, 6, 0, 1, 4, 7##winAmount=0##gameState=idle##ws=##freespins=0##freespinsUsed=0##scatters=##exp=-1##freespinScatters=##');
INSERT INTO `game_log` VALUES (3, '2023-10-18 17:57:18', 270, 2, '::1', '', 'action=bet##reelString=5, 5, 8, 0, 6, 2, 1, 9, 7, 4, 9, 3, 0, 7, 7, 5, 5, 1, 6, 1, 6, 7, 1, 8, 7##winAmount=0##gameState=idle##ws=##freespins=0##freespinsUsed=0##scatters=##exp=-1##freespinScatters=##');
INSERT INTO `game_log` VALUES (4, '2023-10-18 17:57:22', 270, 2, '::1', '', 'action=bet##reelString=5, 1, 6, 8, 6, 2, 2, 6, 0, 4, 9, 5, 2, 1, 7, 5, 3, 4, 6, 1, 6, 1, 3, 0, 7##winAmount=0##gameState=idle##ws=##freespins=0##freespinsUsed=0##scatters=##exp=-1##freespinScatters=##');
INSERT INTO `game_log` VALUES (5, '2023-10-18 21:24:12', 232, 2, '::1', 'betline=1:lines=10:action2=', '10301062bca6e101821621321522c000a10101010101010101010100b101010101010101010101005350203430353140101010#&st=spin&0&1821621321522c&00&&&&62bca6e&&&jackpots=36.82|118.92|336.60|36.82|118.92|336.60&curdenom=1.00');
INSERT INTO `game_log` VALUES (6, '2023-10-18 22:36:41', 230, 2, '::1', 'betline=1:lines=10:action2=', '10301062b552031f423c21c24d22c256000a10101010101010101010100b10101010101510101010100000000000000000150000015000001500000#&st=gamble&5&23c21c24d22c256&00&&&&62b5520&jackpots=36.96|119.06|336.72|36.96|119.06|336.72&curdenom=1.00');
INSERT INTO `game_log` VALUES (7, '2023-10-18 22:36:55', 224, 2, '::1', 'betline=1:lines=10:action2=', '10301062b532c101115213121e000a10101010101010101010100b101010101010101010101052211440152015250101010101010101010101010101010#&st=spin&0&1115213121e&00&&&&62b532c&jackpots=36.99|119.09|336.75|36.99|119.09|336.75&curdenom=1.00');
INSERT INTO `game_log` VALUES (8, '2023-10-18 22:37:13', 274, 2, '::1', '', 'action=bet##reelString=5, 4, 2, 3, 6, 2, 9, 2, 6, 4, 9, 4, 3, 1, 7, 5, 7, 9, 1, 1, 6, 7, 8, 0, 7##winAmount=10##gameState=gamble##ws={\"line\": 1, \"cells\": [0, 0, 1, 0, 2, 0], \"card\": 0, \"winAmount\": 10}##freespins=0##freespinsUsed=0##scatters=##exp=-1##freespinScatters=##');
INSERT INTO `game_log` VALUES (9, '2023-10-18 22:37:14', 274, 2, '::1', '', 'action=collect##reelString=5, 4, 2, 3, 6, 2, 9, 2, 6, 4, 9, 4, 3, 1, 7, 5, 7, 9, 1, 1, 6, 7, 8, 0, 7##winAmount=0##gameState=idle##');
INSERT INTO `game_log` VALUES (10, '2023-10-18 22:37:15', 274, 2, '::1', '', 'action=bet##reelString=5, 2, 3, 1, 6, 2, 7, 6, 0, 4, 9, 2, 5, 3, 7, 5, 6, 9, 4, 1, 6, 7, 2, 0, 7##winAmount=0##gameState=idle##ws=##freespins=0##freespinsUsed=0##scatters=##exp=-1##freespinScatters=##');
INSERT INTO `game_log` VALUES (11, '2023-10-18 22:37:16', 274, 2, '::1', '', 'action=bet##reelString=5, 4, 9, 8, 6, 2, 7, 0, 2, 4, 9, 0, 8, 6, 7, 5, 6, 7, 1, 1, 6, 0, 4, 2, 7##winAmount=0##gameState=idle##ws=##freespins=0##freespinsUsed=0##scatters=##exp=-1##freespinScatters=##');
INSERT INTO `game_log` VALUES (12, '2023-10-18 22:37:18', 274, 2, '::1', '', 'action=bet##reelString=5, 4, 0, 3, 6, 2, 0, 5, 9, 4, 9, 3, 8, 7, 7, 5, 1, 8, 4, 1, 6, 6, 3, 4, 7##winAmount=0##gameState=idle##ws=##freespins=0##freespinsUsed=0##scatters=##exp=-1##freespinScatters=##');
INSERT INTO `game_log` VALUES (13, '2023-10-18 22:37:19', 274, 2, '::1', '', 'action=bet##reelString=5, 0, 1, 5, 6, 2, 1, 4, 2, 4, 9, 1, 4, 5, 7, 5, 7, 3, 1, 1, 6, 0, 2, 4, 7##winAmount=10##gameState=gamble##ws={\"line\": 8, \"cells\": [0, 1, 1, 0, 2, 0], \"card\": 0, \"winAmount\": 10}##freespins=0##freespinsUsed=0##scatters=##exp=-1##freespinScatters=##');
INSERT INTO `game_log` VALUES (14, '2023-10-18 22:37:21', 274, 2, '::1', '', 'action=collect##reelString=5, 0, 1, 5, 6, 2, 1, 4, 2, 4, 9, 1, 4, 5, 7, 5, 7, 3, 1, 1, 6, 0, 2, 4, 7##winAmount=0##gameState=idle##');
INSERT INTO `game_log` VALUES (15, '2023-10-18 22:37:21', 274, 2, '::1', '', 'action=bet##reelString=5, 1, 6, 3, 6, 2, 9, 5, 3, 4, 9, 8, 6, 5, 7, 5, 3, 2, 0, 1, 6, 5, 1, 4, 7##winAmount=0##gameState=idle##ws=##freespins=0##freespinsUsed=0##scatters=##exp=-1##freespinScatters=##');
INSERT INTO `game_log` VALUES (16, '2023-10-18 23:34:58', 228, 2, '::1', 'betline=1:lines=20:action2=', '1030106191ab810131f22922c225001410101010101010101010101510101010101010101010101010101010101010101043255103132111330101010101010101010101010101010#&st=spin&0&131f22922c225&00&&&&6191ab8&jackpots=38.08|120.18|337.68|38.08|120.18|337.68&curdenom=1.00');
INSERT INTO `game_log` VALUES (17, '2023-10-18 23:35:02', 228, 2, '::1', 'betline=1:lines=20:action2=', '10301061912e8102111b21e216223001410101010101010101010101510101010101010101010101010101010101010101043255103132111330101010101010101010101010101010#&st=spin&0&2111b21e216223&00&&&&61912e8&jackpots=38.15|120.25|337.74|38.15|120.25|337.74&curdenom=1.00');

-- ----------------------------
-- Table structure for game_page
-- ----------------------------
DROP TABLE IF EXISTS `game_page`;
CREATE TABLE `game_page`  (
  `g_id` int(11) NOT NULL,
  `title` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `keywords` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `txt` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`g_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of game_page
-- ----------------------------

-- ----------------------------
-- Table structure for game_settings
-- ----------------------------
DROP TABLE IF EXISTS `game_settings`;
CREATE TABLE `game_settings`  (
  `g_id` int(10) NOT NULL AUTO_INCREMENT,
  `gr_id` int(2) NOT NULL DEFAULT 0,
  `room_id` int(1) NOT NULL DEFAULT 1,
  `g_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `g_title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `g_reels` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `g_lines` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `g_bonus` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `g_freespins` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `g_double` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `g_bank` decimal(20, 2) NOT NULL DEFAULT 0.00,
  `g_in` double(20, 2) NOT NULL DEFAULT 0.00,
  `g_out` double(20, 2) NOT NULL DEFAULT 0.00,
  `g_rezerv` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0',
  `g_cask` int(10) NOT NULL DEFAULT 0,
  `g_bon1_1` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `g_bon1_2` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `g_bon1_3` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `g_bon1` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `g_bon2` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `g_bon3` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `g_view` tinyint(1) NOT NULL DEFAULT 0,
  `g_inslider` tinyint(1) NOT NULL DEFAULT 0,
  `g_counter` int(3) NOT NULL DEFAULT 0,
  `g_ver` int(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NULL DEFAULT NULL,
  `updatedAt` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`g_id`) USING BTREE,
  INDEX `gr_id`(`gr_id`) USING BTREE,
  INDEX `g_name`(`g_name`) USING BTREE,
  INDEX `g_view`(`g_view`) USING BTREE,
  INDEX `g_id`(`g_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 290 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of game_settings
-- ----------------------------
INSERT INTO `game_settings` VALUES (200, 15, 1, 'bells_on_fire', 'BELLS ON FIRE', '5', '40', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 50, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (201, 15, 1, 'bluedolphin', 'BLUE DOLPHIN', '5', '5', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 29, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (202, 15, 1, 'diamondsonfire', 'DIAMONDS ON FIRE', '5', '50', 'No', 'Yes', 'Yes', 0.00, 150.00, 80.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 22, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (203, 15, 1, 'fortunas_fruits', 'FORTUNAS FRUITS', '5', '50', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 54, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (204, 15, 1, 'hotstar', 'HOT STAR', '5', '10', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 84, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (205, 15, 1, 'ladyjoker', 'LADY JOKER', '5', '50', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 70, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (206, 15, 1, 'luckybells', 'LUCKY BELLS', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 79, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (207, 15, 1, 'magicforest', 'MAGIC FOREST', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 21, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (208, 15, 1, 'magicidol', 'MAGIC IDOL', '5', '10', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 89, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (209, 15, 1, 'merry_fruits', 'MERRY FRUITS', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 39, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (210, 15, 1, 'phoenix', 'ARISING PHOENIX', '5', '50', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 61, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (211, 15, 1, 'twenty_hot', 'HOT TWENTY', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 78, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (212, 15, 1, 'wild_dragon', 'WILD DRAGON', '5', '10', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 57, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (213, 15, 1, 'wild_respin', 'WILD RESPIN', '5', '40', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 83, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (214, 15, 1, 'wild_seven', 'WILD 7', '5', '10', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 11, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (215, 15, 1, 'mermaidsgold', 'MERMAIDS GOLD', '5', '10', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 72, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (216, 15, 1, 'bellsonfirehot', 'BELLS ON FIRE', '5', '100', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 22, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (217, 15, 1, 'cooldiamonds2', 'COOL DIAMONDS 2', '5', '10', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 21, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (218, 15, 1, 'dragonspearl', 'DRAGONS PEARL', '5', '50', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 86, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (219, 15, 1, 'hotdiamonds', 'HOT DIAMONDS', '5', '10', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 43, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (220, 15, 1, 'hotneon', 'HOT NEON', '5', '5', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 86, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (221, 15, 1, 'hotscatter', 'HOT SCATTER', '10', '10', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 86, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (222, 15, 1, 'lovelylady', 'LOVELY LADY', '5', '10', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 19, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (223, 15, 1, 'luckycoins', 'LUCKY COIN', '5', '10', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 28, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (224, 15, 1, 'magicscatter', 'MAGIC SCATTER', '5', '10', 'No', 'Yes', 'Yes', 0.00, 10.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 45, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (225, 15, 1, 'tweetybirds', 'TWEETY BIRDS', '5', '40', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 89, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (226, 15, 1, 'wildshark', 'WILD SHARK', '5', '50', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 30, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (227, 15, 1, 'admiralnelson', 'ADMIRAL NELSON', '5', '10', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 21, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (228, 15, 1, 'casinova', 'CASINOVA', '5', '20', 'No', 'Yes', 'Yes', 0.00, 40.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 52, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (229, 15, 1, 'wolfmoon', 'WOLF MOON', '5', '40', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 18, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (230, 15, 1, 'legion', 'ROMAN LEGION', '5', '10', 'No', 'Yes', 'Yes', 0.00, 10.00, 5.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 92, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (231, 15, 1, 'fireandice', 'FIRE AND ICE', '6', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 68, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (232, 15, 1, 'luckyzodiac', 'LUCKY ZODIAC', '5', '10', 'No', 'Yes', 'Yes', 0.00, 110.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 53, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (233, 15, 1, 'billyonaire', 'BILLYONAIR', '5', '40', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 22, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (234, 15, 1, 'dynamite7', 'DYNAMITE 7', '5', '10', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 13, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (235, 15, 1, 'diamondmonkey', 'DIAMON MONKEY', '5', '50', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 91, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (236, 15, 1, 'magicowl', 'MAGIC OWL', '5', '50', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 85, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (237, 15, 1, 'fantastico7', 'FANTASTICO 7', '5', '10', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 58, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (238, 15, 1, 'redchilli', 'RED CHILLI', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 7, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (239, 15, 1, 'dragonskingdom', 'DRAGONS KINGDOM', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 65, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (240, 15, 1, 'royalunicorn', 'ROYAL UNICORN', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 26, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (241, 15, 1, 'bigpanda', 'BIG PANDA', '5', '50', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 5, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (242, 15, 1, 'aztecsecret', 'AZTEC SECRET', '5', '10', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 13, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (243, 15, 1, 'bookofaztec', 'BOOK OF AZTEC', '5', '10', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 65, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (244, 15, 1, 'bookoffortune', 'BOOK OF FORTUNE', '5', '10', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 85, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (245, 15, 1, 'vampires', 'Vampires', '5', '50', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 91, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (246, 15, 1, 'lagran', 'LaGran Aventura', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 15, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (247, 15, 1, 'wilddiamonds', 'Wild Diamonds', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 90, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (248, 15, 1, 'diamondcats', 'Diamond Cats', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 25, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (249, 15, 1, 'hot7', 'Hot 7', '5', '5', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 78, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (250, 15, 1, 'casanova', 'Casanova', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 68, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (251, 15, 1, 'gemstar', 'Gem Star', '5', '100', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 65, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (252, 15, 1, 'allwaysfruits', 'Allways Fruits', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 11, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (253, 15, 1, 'partytime', 'Party Time', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 4, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (254, 15, 1, 'grandtiger', 'Grand Tiger', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 67, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (255, 15, 1, 'bellsonfirerombo', 'Bells On Fire Rombo', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 16, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (256, 15, 1, 'hot81', 'Hot 81', '4', '81', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 20, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (257, 15, 1, 'eyeofra', 'Eye Of Ra', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 18, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (258, 15, 1, 'billysgame', 'Billys Game', '5', '27', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 38, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (259, 15, 1, 'goldenbook', 'Golden Book', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 70, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (260, 15, 1, 'bingo', 'Bingo', 'No', 'No', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 58, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (265, 17, 1, 'burninghot', 'Burning Hot', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, '10|20|30|40|50', '0.24|0.22|0.20|0.18|0.16', NULL, NULL, NULL, NULL, 1, 0, 71, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (266, 17, 1, 'dragon_reels', 'Dragon Reels', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, '10|20|30|40|50', '0.24|0.22|0.20|0.18|0.16', NULL, NULL, NULL, NULL, 1, 0, 28, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (267, 17, 1, 'gameofluck', 'Game of Luck', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, '10|20|30|40|50', '0.24|0.22|0.20|0.18|0.16', NULL, NULL, NULL, NULL, 1, 0, 4, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (268, 17, 1, 'ageoftroy', 'Age of Troy', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, '10|20|30|40|50', '0.24|0.22|0.20|0.18|0.16', NULL, NULL, NULL, NULL, 1, 0, 82, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (269, 17, 1, 'burningdice', 'Burning Dice', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, '10|20|30|40|50', '0.24|0.22|0.20|0.18|0.16', NULL, NULL, NULL, NULL, 1, 0, 12, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (270, 17, 1, 'cleopatra', 'Cleopatra', '5', '20', 'No', 'Yes', 'Yes', 0.00, 80.00, 0.00, '2', 0, '10.00192|20.00176|30.0016|40.00144|50', '0.24|0.22|0.20|0.18|0.16', NULL, NULL, NULL, NULL, 1, 0, 75, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (271, 17, 1, 'flaminghot', 'Flaming Hot', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, '10|20|30|40|50', '0.24|0.22|0.20|0.18|0.16', NULL, NULL, NULL, NULL, 1, 0, 22, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (272, 17, 1, 'greategypt', 'Great Egypt', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, '10|20|30|40|50', '0.24|0.22|0.20|0.18|0.16', NULL, NULL, NULL, NULL, 1, 0, 14, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (273, 17, 1, 'greatempire', 'Great Empire', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, '10|20|30|40|50', '0.24|0.22|0.20|0.18|0.16', NULL, NULL, NULL, NULL, 1, 0, 74, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (274, 17, 1, 'olympus', 'Olympus', '5', '20', 'No', 'Yes', 'Yes', 0.00, 120.00, 0.20, '2', 0, '10.00288|20.00264|30.0024|40.00216|50', '0.24|0.22|0.20|0.18|0.16', NULL, NULL, NULL, NULL, 1, 0, 58, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (275, 17, 1, 'zodiac', 'Zodiac', '5', '20', 'No', 'Yes', 'Yes', 0.00, 30.00, 0.00, '2', 0, '10.00072|20.00066|30.0006|40.00054|50', '0.24|0.22|0.20|0.18|0.16', NULL, NULL, NULL, NULL, 1, 0, 60, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (276, 17, 1, 'diceofra', 'Dice of Ra', '5', '20', 'No', 'Yes', 'Yes', 0.00, 120.00, 0.70, '2', 0, '10.00288|20.00264|30.0024|40.00216|50', '0.24|0.22|0.20|0.18|0.16', NULL, NULL, NULL, NULL, 1, 0, 56, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (277, 17, 1, 'supremehot', 'Supreme Hot', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, '10|20|30|40|50', '0.24|0.22|0.20|0.18|0.16', NULL, NULL, NULL, NULL, 1, 0, 45, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (278, 17, 1, 'extremely', 'Extremely', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, '10|20|30|40|50', '0.24|0.22|0.20|0.18|0.16', NULL, NULL, NULL, NULL, 1, 0, 64, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (279, 17, 1, 'fruitskingdom', 'Fruits Kingdom', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, '10|20|30|40|50', '0.24|0.22|0.20|0.18|0.16', NULL, NULL, NULL, NULL, 1, 0, 90, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (280, 18, 1, '4ofking', '4 Of King', 'No', 'No', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 61, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (281, 18, 1, 'en_geisha', 'Geisha', 'No', 'No', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 56, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (282, 18, 1, 'pachamama', 'Pachamama', 'No', 'No', 'No', 'Yes', 'Yes', 0.00, 25.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 53, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (283, 18, 1, 'sparklingfresh', 'Sparkling Fresh', 'No', 'No', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 28, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (284, 18, 1, 'vikings', 'Vikings', 'No', 'No', 'No', 'Yes', 'Yes', 0.00, 80.00, 330.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 47, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (285, 19, 1, 'vs20doghouse', 'Dog House', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 69, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (286, 19, 1, 'vswaysdogs', 'Dog House Megaways', '5', '40', 'Yes', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 51, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (288, 19, 1, 'vs40pirate', 'Pirate Gold', '5', '40', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 69, 1, NULL, NULL);
INSERT INTO `game_settings` VALUES (289, 19, 1, 'vs20rhino', 'Great Rhino', '5', '20', 'No', 'Yes', 'Yes', 0.00, 0.00, 0.00, '2', 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 39, 1, NULL, NULL);

-- ----------------------------
-- Table structure for garant
-- ----------------------------
DROP TABLE IF EXISTS `garant`;
CREATE TABLE `garant`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gr_id` int(11) NOT NULL,
  `room_id` int(1) NOT NULL DEFAULT 1,
  `garant_win` varchar(5000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `garant_bon` varchar(5000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `gr_id_2`(`gr_id`, `room_id`) USING BTREE,
  INDEX `gr_id`(`gr_id`) USING BTREE,
  INDEX `room_id`(`room_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of garant
-- ----------------------------
INSERT INTO `garant` VALUES (1, 2, 1, '1|50,1|10,1|10,1|10,1|5,1|5,1|5,1|5,1|5,1|5,1|20,1|2,1|2,1|2,1|2,1|2,1|3,1|3,1|3,1|3,2|5,2|5,2|5,2|5,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|3,2|20,2|4,2|4,2|4,2|4,2|4,2|4,2|4,2|50,2|10,2|10,2|10,2|10,2|10,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|4,3|3,3|2,3|2,3|2,3|2,3|3,3|3,3|3,3|3,3|3,3|3,3|2,3|2,3|2,3|2,3|2,3|4,3|10,3|10,3|10,4|4,4|4,4|50,4|20,4|20,4|2,4|3,4|4,4|2,4|3,4|4,4|4,4|4,4|4,4|2,4|5,4|5,4|5,4|5,4|5,4|5,4|5,4|3,4|3,4|2,4|4,4|10,4|10,4|10,5|20,5|20,5|4,5|2,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|4,5|4,5|4,5|4,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|10,5|10,5|10,7|50,7|20,7|20,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|2,7|3,7|2,7|2,7|2,7|2,7|2,7|2,7|3,7|3,7|3,7|3,7|3,7|3,7|10,7|10,7|10,7|10,7|10,7|10,7|20,7|20,7|20,10|2,10|3,10|2,10|3,10|100,10|50,10|20,10|20,10|10,10|10,10|10,10|10,10|10,10|10,10|5,10|5,10|5,10|5,10|5,10|5,10|4,10|4,10|4,10|4,10|4,10|3,10|3,10|3,10|3,10|3,10|3,10|4,10|4,10|4,5|4,5|4,5|4,5|4,5|4,5|3,5|3,5|3,5|3,5|3,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,3|20,3|50,3|2,3|2,3|2,5|2,5|2,5|50,5|100,5|100,5|3,5|3,5|3,5|3,5|3,2|4,2|4,2|4,2|4,2|4', '100|50,250|100,350|100,500|500,500|50,100|500,250|100,350|150,500|100,550|100');
INSERT INTO `garant` VALUES (2, 3, 1, '1|50,1|10,1|10,1|10,1|5,1|5,1|5,1|5,1|5,1|5,1|20,1|2,1|2,1|2,1|2,1|2,1|3,1|3,1|3,1|3,2|5,2|5,2|5,2|5,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|3,2|20,2|4,2|4,2|4,2|4,2|4,2|4,2|4,2|50,2|10,2|10,2|10,2|10,2|10,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|4,3|3,3|2,3|2,3|2,3|2,3|3,3|3,3|3,3|3,3|3,3|3,3|2,3|2,3|2,3|2,3|2,3|4,3|10,3|10,3|10,4|4,4|4,4|50,4|20,4|20,4|2,4|3,4|4,4|2,4|3,4|4,4|4,4|4,4|4,4|2,4|5,4|5,4|5,4|5,4|5,4|5,4|5,4|3,4|3,4|2,4|4,4|10,4|10,4|10,5|20,5|20,5|4,5|2,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|4,5|4,5|4,5|4,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|10,5|10,5|10,7|50,7|20,7|20,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|2,7|3,7|2,7|2,7|2,7|2,7|2,7|2,7|3,7|3,7|3,7|3,7|3,7|3,7|10,7|10,7|10,7|10,7|10,7|10,7|20,7|20,7|20,10|2,10|3,10|2,10|3,10|100,10|50,10|20,10|20,10|10,10|10,10|10,10|10,10|10,10|10,10|5,10|5,10|5,10|5,10|5,10|5,10|4,10|4,10|4,10|4,10|4,10|3,10|3,10|3,10|3,10|3,10|3,10|4,10|4,10|4,5|4,5|4,5|4,5|4,5|4,5|3,5|3,5|3,5|3,5|3,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,3|20,3|50,3|2,3|2,3|2,5|2,5|2,5|50,5|100,5|100,5|3,5|3,5|3,5|3,5|3,2|4,2|4,2|4,2|4,2|4', '100|50,250|100,350|100,500|500,500|50,100|500,250|100,350|150,500|100,550|100');
INSERT INTO `garant` VALUES (3, 5, 1, '1|50,1|10,1|10,1|10,1|5,1|5,1|5,1|5,1|5,1|5,1|20,1|2,1|2,1|2,1|2,1|2,1|3,1|3,1|3,1|3,2|5,2|5,2|5,2|5,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|3,2|20,2|4,2|4,2|4,2|4,2|4,2|4,2|4,2|50,2|10,2|10,2|10,2|10,2|10,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|4,3|3,3|2,3|2,3|2,3|2,3|3,3|3,3|3,3|3,3|3,3|3,3|2,3|2,3|2,3|2,3|2,3|4,3|10,3|10,3|10,4|4,4|4,4|50,4|20,4|20,4|2,4|3,4|4,4|2,4|3,4|4,4|4,4|4,4|4,4|2,4|5,4|5,4|5,4|5,4|5,4|5,4|5,4|3,4|3,4|2,4|4,4|10,4|10,4|10,5|20,5|20,5|4,5|2,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|4,5|4,5|4,5|4,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|10,5|10,5|10,7|50,7|20,7|20,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|2,7|3,7|2,7|2,7|2,7|2,7|2,7|2,7|3,7|3,7|3,7|3,7|3,7|3,7|10,7|10,7|10,7|10,7|10,7|10,7|20,7|20,7|20,10|2,10|3,10|2,10|3,10|100,10|50,10|20,10|20,10|10,10|10,10|10,10|10,10|10,10|10,10|5,10|5,10|5,10|5,10|5,10|5,10|4,10|4,10|4,10|4,10|4,10|3,10|3,10|3,10|3,10|3,10|3,10|4,10|4,10|4,5|4,5|4,5|4,5|4,5|4,5|3,5|3,5|3,5|3,5|3,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,3|20,3|50,3|2,3|2,3|2,5|2,5|2,5|50,5|100,5|100,5|3,5|3,5|3,5|3,5|3,2|4,2|4,2|4,2|4,2|4', '100|50,250|100,350|100,500|500,500|50,100|500,250|100,350|150,500|100,550|100');
INSERT INTO `garant` VALUES (4, 6, 1, '1|50,1|10,1|10,1|10,1|5,1|5,1|5,1|5,1|5,1|5,1|20,1|2,1|2,1|2,1|2,1|2,1|3,1|3,1|3,1|3,2|5,2|5,2|5,2|5,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|3,2|20,2|4,2|4,2|4,2|4,2|4,2|4,2|4,2|50,2|10,2|10,2|10,2|10,2|10,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|4,3|3,3|2,3|2,3|2,3|2,3|3,3|3,3|3,3|3,3|3,3|3,3|2,3|2,3|2,3|2,3|2,3|4,3|10,3|10,3|10,4|4,4|4,4|50,4|20,4|20,4|2,4|3,4|4,4|2,4|3,4|4,4|4,4|4,4|4,4|2,4|5,4|5,4|5,4|5,4|5,4|5,4|5,4|3,4|3,4|2,4|4,4|10,4|10,4|10,5|20,5|20,5|4,5|2,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|4,5|4,5|4,5|4,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|10,5|10,5|10,7|50,7|20,7|20,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|2,7|3,7|2,7|2,7|2,7|2,7|2,7|2,7|3,7|3,7|3,7|3,7|3,7|3,7|10,7|10,7|10,7|10,7|10,7|10,7|20,7|20,7|20,10|2,10|3,10|2,10|3,10|100,10|50,10|20,10|20,10|10,10|10,10|10,10|10,10|10,10|10,10|5,10|5,10|5,10|5,10|5,10|5,10|4,10|4,10|4,10|4,10|4,10|3,10|3,10|3,10|3,10|3,10|3,10|4,10|4,10|4,5|4,5|4,5|4,5|4,5|4,5|3,5|3,5|3,5|3,5|3,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,3|20,3|50,3|2,3|2,3|2,5|2,5|2,5|50,5|100,5|100,5|3,5|3,5|3,5|3,5|3,2|4,2|4,2|4,2|4,2|4', '100|50,250|100,350|100,500|500,500|50,100|500,250|100,350|150,500|100,550|100');
INSERT INTO `garant` VALUES (5, 7, 1, '1|50,1|10,1|10,1|10,1|5,1|5,1|5,1|5,1|5,1|5,1|20,1|2,1|2,1|2,1|2,1|2,1|3,1|3,1|3,1|3,2|5,2|5,2|5,2|5,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|3,2|20,2|4,2|4,2|4,2|4,2|4,2|4,2|4,2|50,2|10,2|10,2|10,2|10,2|10,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|4,3|3,3|2,3|2,3|2,3|2,3|3,3|3,3|3,3|3,3|3,3|3,3|2,3|2,3|2,3|2,3|2,3|4,3|10,3|10,3|10,4|4,4|4,4|50,4|20,4|20,4|2,4|3,4|4,4|2,4|3,4|4,4|4,4|4,4|4,4|2,4|5,4|5,4|5,4|5,4|5,4|5,4|5,4|3,4|3,4|2,4|4,4|10,4|10,4|10,5|20,5|20,5|4,5|2,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|4,5|4,5|4,5|4,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|10,5|10,5|10,7|50,7|20,7|20,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|2,7|3,7|2,7|2,7|2,7|2,7|2,7|2,7|3,7|3,7|3,7|3,7|3,7|3,7|10,7|10,7|10,7|10,7|10,7|10,7|20,7|20,7|20,10|2,10|3,10|2,10|3,10|100,10|50,10|20,10|20,10|10,10|10,10|10,10|10,10|10,10|10,10|5,10|5,10|5,10|5,10|5,10|5,10|4,10|4,10|4,10|4,10|4,10|3,10|3,10|3,10|3,10|3,10|3,10|4,10|4,10|4,5|4,5|4,5|4,5|4,5|4,5|3,5|3,5|3,5|3,5|3,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,3|20,3|50,3|2,3|2,3|2,5|2,5|2,5|50,5|100,5|100,5|3,5|3,5|3,5|3,5|3,2|4,2|4,2|4,2|4,2|4', '100|50,250|100,350|100,500|500,500|50,100|500,250|100,350|150,500|100,550|100');
INSERT INTO `garant` VALUES (6, 8, 1, '1|50,1|10,1|10,1|10,1|5,1|5,1|5,1|5,1|5,1|5,1|20,1|2,1|2,1|2,1|2,1|2,1|3,1|3,1|3,1|3,2|5,2|5,2|5,2|5,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|3,2|20,2|4,2|4,2|4,2|4,2|4,2|4,2|4,2|50,2|10,2|10,2|10,2|10,2|10,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|4,3|3,3|2,3|2,3|2,3|2,3|3,3|3,3|3,3|3,3|3,3|3,3|2,3|2,3|2,3|2,3|2,3|4,3|10,3|10,3|10,4|4,4|4,4|50,4|20,4|20,4|2,4|3,4|4,4|2,4|3,4|4,4|4,4|4,4|4,4|2,4|5,4|5,4|5,4|5,4|5,4|5,4|5,4|3,4|3,4|2,4|4,4|10,4|10,4|10,5|20,5|20,5|4,5|2,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|4,5|4,5|4,5|4,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|10,5|10,5|10,7|50,7|20,7|20,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|2,7|3,7|2,7|2,7|2,7|2,7|2,7|2,7|3,7|3,7|3,7|3,7|3,7|3,7|10,7|10,7|10,7|10,7|10,7|10,7|20,7|20,7|20,10|2,10|3,10|2,10|3,10|100,10|50,10|20,10|20,10|10,10|10,10|10,10|10,10|10,10|10,10|5,10|5,10|5,10|5,10|5,10|5,10|4,10|4,10|4,10|4,10|4,10|3,10|3,10|3,10|3,10|3,10|3,10|4,10|4,10|4,5|4,5|4,5|4,5|4,5|4,5|3,5|3,5|3,5|3,5|3,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,3|20,3|50,3|2,3|2,3|2,5|2,5|2,5|50,5|100,5|100,5|3,5|3,5|3,5|3,5|3,2|4,2|4,2|4,2|4,2|4', '100|50,250|100,350|100,500|500,500|50,100|500,250|100,350|150,500|100,550|100');
INSERT INTO `garant` VALUES (7, 10, 1, '1|50,1|10,1|10,1|10,1|5,1|5,1|5,1|5,1|5,1|5,1|20,1|2,1|2,1|2,1|2,1|2,1|3,1|3,1|3,1|3,2|5,2|5,2|5,2|5,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|3,2|20,2|4,2|4,2|4,2|4,2|4,2|4,2|4,2|50,2|10,2|10,2|10,2|10,2|10,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|4,3|3,3|2,3|2,3|2,3|2,3|3,3|3,3|3,3|3,3|3,3|3,3|2,3|2,3|2,3|2,3|2,3|4,3|10,3|10,3|10,4|4,4|4,4|50,4|20,4|20,4|2,4|3,4|4,4|2,4|3,4|4,4|4,4|4,4|4,4|2,4|5,4|5,4|5,4|5,4|5,4|5,4|5,4|3,4|3,4|2,4|4,4|10,4|10,4|10,5|20,5|20,5|4,5|2,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|4,5|4,5|4,5|4,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|10,5|10,5|10,7|50,7|20,7|20,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|2,7|3,7|2,7|2,7|2,7|2,7|2,7|2,7|3,7|3,7|3,7|3,7|3,7|3,7|10,7|10,7|10,7|10,7|10,7|10,7|20,7|20,7|20,10|2,10|3,10|2,10|3,10|100,10|50,10|20,10|20,10|10,10|10,10|10,10|10,10|10,10|10,10|5,10|5,10|5,10|5,10|5,10|5,10|4,10|4,10|4,10|4,10|4,10|3,10|3,10|3,10|3,10|3,10|3,10|4,10|4,10|4,5|4,5|4,5|4,5|4,5|4,5|3,5|3,5|3,5|3,5|3,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,3|20,3|50,3|2,3|2,3|2,5|2,5|2,5|50,5|100,5|100,5|3,5|3,5|3,5|3,5|3,2|4,2|4,2|4,2|4,2|4', '100|50,250|100,350|100,500|500,500|50,100|500,250|100,350|150,500|100,550|100');
INSERT INTO `garant` VALUES (8, 11, 1, '1|50,1|10,1|10,1|10,1|5,1|5,1|5,1|5,1|5,1|5,1|20,1|2,1|2,1|2,1|2,1|2,1|3,1|3,1|3,1|3,2|5,2|5,2|5,2|5,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|3,2|20,2|4,2|4,2|4,2|4,2|4,2|4,2|4,2|50,2|10,2|10,2|10,2|10,2|10,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|4,3|3,3|2,3|2,3|2,3|2,3|3,3|3,3|3,3|3,3|3,3|3,3|2,3|2,3|2,3|2,3|2,3|4,3|10,3|10,3|10,4|4,4|4,4|50,4|20,4|20,4|2,4|3,4|4,4|2,4|3,4|4,4|4,4|4,4|4,4|2,4|5,4|5,4|5,4|5,4|5,4|5,4|5,4|3,4|3,4|2,4|4,4|10,4|10,4|10,5|20,5|20,5|4,5|2,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|4,5|4,5|4,5|4,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|10,5|10,5|10,7|50,7|20,7|20,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|2,7|3,7|2,7|2,7|2,7|2,7|2,7|2,7|3,7|3,7|3,7|3,7|3,7|3,7|10,7|10,7|10,7|10,7|10,7|10,7|20,7|20,7|20,10|2,10|3,10|2,10|3,10|100,10|50,10|20,10|20,10|10,10|10,10|10,10|10,10|10,10|10,10|5,10|5,10|5,10|5,10|5,10|5,10|4,10|4,10|4,10|4,10|4,10|3,10|3,10|3,10|3,10|3,10|3,10|4,10|4,10|4,5|4,5|4,5|4,5|4,5|4,5|3,5|3,5|3,5|3,5|3,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,3|20,3|50,3|2,3|2,3|2,5|2,5|2,5|50,5|100,5|100,5|3,5|3,5|3,5|3,5|3,2|4,2|4,2|4,2|4,2|4', '100|50,250|100,350|100,500|500,500|50,100|500,250|100,350|150,500|100,550|100');
INSERT INTO `garant` VALUES (9, 12, 1, '1|50,1|10,1|10,1|10,1|5,1|5,1|5,1|5,1|5,1|5,1|20,1|2,1|2,1|2,1|2,1|2,1|3,1|3,1|3,1|3,2|5,2|5,2|5,2|5,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|3,2|20,2|4,2|4,2|4,2|4,2|4,2|4,2|4,2|50,2|10,2|10,2|10,2|10,2|10,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|4,3|3,3|2,3|2,3|2,3|2,3|3,3|3,3|3,3|3,3|3,3|3,3|2,3|2,3|2,3|2,3|2,3|4,3|10,3|10,3|10,4|4,4|4,4|50,4|20,4|20,4|2,4|3,4|4,4|2,4|3,4|4,4|4,4|4,4|4,4|2,4|5,4|5,4|5,4|5,4|5,4|5,4|5,4|3,4|3,4|2,4|4,4|10,4|10,4|10,5|20,5|20,5|4,5|2,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|4,5|4,5|4,5|4,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|10,5|10,5|10,7|50,7|20,7|20,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|2,7|3,7|2,7|2,7|2,7|2,7|2,7|2,7|3,7|3,7|3,7|3,7|3,7|3,7|10,7|10,7|10,7|10,7|10,7|10,7|20,7|20,7|20,10|2,10|3,10|2,10|3,10|100,10|50,10|20,10|20,10|10,10|10,10|10,10|10,10|10,10|10,10|5,10|5,10|5,10|5,10|5,10|5,10|4,10|4,10|4,10|4,10|4,10|3,10|3,10|3,10|3,10|3,10|3,10|4,10|4,10|4,5|4,5|4,5|4,5|4,5|4,5|3,5|3,5|3,5|3,5|3,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,3|20,3|50,3|2,3|2,3|2,5|2,5|2,5|50,5|100,5|100,5|3,5|3,5|3,5|3,5|3,2|4,2|4,2|4,2|4,2|4', '100|50,250|100,350|100,500|500,500|50,100|500,250|100,350|150,500|100,550|100');
INSERT INTO `garant` VALUES (10, 13, 1, '1|50,1|10,1|10,1|10,1|5,1|5,1|5,1|5,1|5,1|5,1|20,1|2,1|2,1|2,1|2,1|2,1|3,1|3,1|3,1|3,2|5,2|5,2|5,2|5,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|3,2|20,2|4,2|4,2|4,2|4,2|4,2|4,2|4,2|50,2|10,2|10,2|10,2|10,2|10,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|4,3|3,3|2,3|2,3|2,3|2,3|3,3|3,3|3,3|3,3|3,3|3,3|2,3|2,3|2,3|2,3|2,3|4,3|10,3|10,3|10,4|4,4|4,4|50,4|20,4|20,4|2,4|3,4|4,4|2,4|3,4|4,4|4,4|4,4|4,4|2,4|5,4|5,4|5,4|5,4|5,4|5,4|5,4|3,4|3,4|2,4|4,4|10,4|10,4|10,5|20,5|20,5|4,5|2,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|4,5|4,5|4,5|4,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|10,5|10,5|10,7|50,7|20,7|20,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|2,7|3,7|2,7|2,7|2,7|2,7|2,7|2,7|3,7|3,7|3,7|3,7|3,7|3,7|10,7|10,7|10,7|10,7|10,7|10,7|20,7|20,7|20,10|2,10|3,10|2,10|3,10|100,10|50,10|20,10|20,10|10,10|10,10|10,10|10,10|10,10|10,10|5,10|5,10|5,10|5,10|5,10|5,10|4,10|4,10|4,10|4,10|4,10|3,10|3,10|3,10|3,10|3,10|3,10|4,10|4,10|4,5|4,5|4,5|4,5|4,5|4,5|3,5|3,5|3,5|3,5|3,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,3|20,3|50,3|2,3|2,3|2,5|2,5|2,5|50,5|100,5|100,5|3,5|3,5|3,5|3,5|3,2|4,2|4,2|4,2|4,2|4', '100|50,250|100,350|100,500|500,500|50,100|500,250|100,350|150,500|100,550|100');
INSERT INTO `garant` VALUES (11, 15, 1, '1|50,1|10,1|10,1|10,1|5,1|5,1|5,1|5,1|5,1|5,1|20,1|2,1|2,1|2,1|2,1|2,1|3,1|3,1|3,1|3,2|5,2|5,2|5,2|5,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|3,2|20,2|4,2|4,2|4,2|4,2|4,2|4,2|4,2|50,2|10,2|10,2|10,2|10,2|10,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|4,3|3,3|2,3|2,3|2,3|2,3|3,3|3,3|3,3|3,3|3,3|3,3|2,3|2,3|2,3|2,3|2,3|4,3|10,3|10,3|10,4|4,4|4,4|50,4|20,4|20,4|2,4|3,4|4,4|2,4|3,4|4,4|4,4|4,4|4,4|2,4|5,4|5,4|5,4|5,4|5,4|5,4|5,4|3,4|3,4|2,4|4,4|10,4|10,4|10,5|20,5|20,5|4,5|2,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|4,5|4,5|4,5|4,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|10,5|10,5|10,7|50,7|20,7|20,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|2,7|3,7|2,7|2,7|2,7|2,7|2,7|2,7|3,7|3,7|3,7|3,7|3,7|3,7|10,7|10,7|10,7|10,7|10,7|10,7|20,7|20,7|20,10|2,10|3,10|2,10|3,10|100,10|50,10|20,10|20,10|10,10|10,10|10,10|10,10|10,10|10,10|5,10|5,10|5,10|5,10|5,10|5,10|4,10|4,10|4,10|4,10|4,10|3,10|3,10|3,10|3,10|3,10|3,10|4,10|4,10|4,5|4,5|4,5|4,5|4,5|4,5|3,5|3,5|3,5|3,5|3,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,3|20,3|50,3|2,3|2,3|2,5|2,5|2,5|50,5|100,5|100,5|3,5|3,5|3,5|3,5|3,2|4,2|4,2|4,2|4,2|4', '100|50,250|100,350|100,500|500,500|50,100|500,250|100,350|150,500|100,550|100');
INSERT INTO `garant` VALUES (12, 16, 1, '1|50,1|10,1|10,1|10,1|5,1|5,1|5,1|5,1|5,1|5,1|20,1|2,1|2,1|2,1|2,1|2,1|3,1|3,1|3,1|3,2|5,2|5,2|5,2|5,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|3,2|20,2|4,2|4,2|4,2|4,2|4,2|4,2|4,2|50,2|10,2|10,2|10,2|10,2|10,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|4,3|3,3|2,3|2,3|2,3|2,3|3,3|3,3|3,3|3,3|3,3|3,3|2,3|2,3|2,3|2,3|2,3|4,3|10,3|10,3|10,4|4,4|4,4|50,4|20,4|20,4|2,4|3,4|4,4|2,4|3,4|4,4|4,4|4,4|4,4|2,4|5,4|5,4|5,4|5,4|5,4|5,4|5,4|3,4|3,4|2,4|4,4|10,4|10,4|10,5|20,5|20,5|4,5|2,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|4,5|4,5|4,5|4,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|10,5|10,5|10,7|50,7|20,7|20,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|2,7|3,7|2,7|2,7|2,7|2,7|2,7|2,7|3,7|3,7|3,7|3,7|3,7|3,7|10,7|10,7|10,7|10,7|10,7|10,7|20,7|20,7|20,10|2,10|3,10|2,10|3,10|100,10|50,10|20,10|20,10|10,10|10,10|10,10|10,10|10,10|10,10|5,10|5,10|5,10|5,10|5,10|5,10|4,10|4,10|4,10|4,10|4,10|3,10|3,10|3,10|3,10|3,10|3,10|4,10|4,10|4,5|4,5|4,5|4,5|4,5|4,5|3,5|3,5|3,5|3,5|3,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,3|20,3|50,3|2,3|2,3|2,5|2,5|2,5|50,5|100,5|100,5|3,5|3,5|3,5|3,5|3,2|4,2|4,2|4,2|4,2|4', '100|50,250|100,350|100,500|500,500|50,100|500,250|100,350|150,500|100,550|100');
INSERT INTO `garant` VALUES (13, 17, 1, '1|50,1|10,1|10,1|10,1|5,1|5,1|5,1|5,1|5,1|5,1|20,1|2,1|2,1|2,1|2,1|2,1|3,1|3,1|3,1|3,2|5,2|5,2|5,2|5,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|3,2|20,2|4,2|4,2|4,2|4,2|4,2|4,2|4,2|50,2|10,2|10,2|10,2|10,2|10,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|4,3|3,3|2,3|2,3|2,3|2,3|3,3|3,3|3,3|3,3|3,3|3,3|2,3|2,3|2,3|2,3|2,3|4,3|10,3|10,3|10,4|4,4|4,4|50,4|20,4|20,4|2,4|3,4|4,4|2,4|3,4|4,4|4,4|4,4|4,4|2,4|5,4|5,4|5,4|5,4|5,4|5,4|5,4|3,4|3,4|2,4|4,4|10,4|10,4|10,5|20,5|20,5|4,5|2,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|4,5|4,5|4,5|4,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|10,5|10,5|10,7|50,7|20,7|20,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|2,7|3,7|2,7|2,7|2,7|2,7|2,7|2,7|3,7|3,7|3,7|3,7|3,7|3,7|10,7|10,7|10,7|10,7|10,7|10,7|20,7|20,7|20,10|2,10|3,10|2,10|3,10|100,10|50,10|20,10|20,10|10,10|10,10|10,10|10,10|10,10|10,10|5,10|5,10|5,10|5,10|5,10|5,10|4,10|4,10|4,10|4,10|4,10|3,10|3,10|3,10|3,10|3,10|3,10|4,10|4,10|4,5|4,5|4,5|4,5|4,5|4,5|3,5|3,5|3,5|3,5|3,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,3|20,3|50,3|2,3|2,3|2,5|2,5|2,5|50,5|100,5|100,5|3,5|3,5|3,5|3,5|3,2|4,2|4,2|4,2|4,2|4', '100|50,250|100,350|100,500|500,500|50,100|500,250|100,350|150,500|100,550|100');
INSERT INTO `garant` VALUES (14, 18, 1, '1|50,1|10,1|10,1|10,1|5,1|5,1|5,1|5,1|5,1|5,1|20,1|2,1|2,1|2,1|2,1|2,1|3,1|3,1|3,1|3,2|5,2|5,2|5,2|5,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|3,2|20,2|4,2|4,2|4,2|4,2|4,2|4,2|4,2|50,2|10,2|10,2|10,2|10,2|10,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|4,3|3,3|2,3|2,3|2,3|2,3|3,3|3,3|3,3|3,3|3,3|3,3|2,3|2,3|2,3|2,3|2,3|4,3|10,3|10,3|10,4|4,4|4,4|50,4|20,4|20,4|2,4|3,4|4,4|2,4|3,4|4,4|4,4|4,4|4,4|2,4|5,4|5,4|5,4|5,4|5,4|5,4|5,4|3,4|3,4|2,4|4,4|10,4|10,4|10,5|20,5|20,5|4,5|2,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|4,5|4,5|4,5|4,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|10,5|10,5|10,7|50,7|20,7|20,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|2,7|3,7|2,7|2,7|2,7|2,7|2,7|2,7|3,7|3,7|3,7|3,7|3,7|3,7|10,7|10,7|10,7|10,7|10,7|10,7|20,7|20,7|20,10|2,10|3,10|2,10|3,10|100,10|50,10|20,10|20,10|10,10|10,10|10,10|10,10|10,10|10,10|5,10|5,10|5,10|5,10|5,10|5,10|4,10|4,10|4,10|4,10|4,10|3,10|3,10|3,10|3,10|3,10|3,10|4,10|4,10|4,5|4,5|4,5|4,5|4,5|4,5|3,5|3,5|3,5|3,5|3,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,3|20,3|50,3|2,3|2,3|2,5|2,5|2,5|50,5|100,5|100,5|3,5|3,5|3,5|3,5|3,2|4,2|4,2|4,2|4,2|4', '100|50,250|100,350|100,500|500,500|50,100|500,250|100,350|150,500|100,550|100');

-- ----------------------------
-- Table structure for histories
-- ----------------------------
DROP TABLE IF EXISTS `histories`;
CREATE TABLE `histories`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `gameCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `agentCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `roundID` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `bet` double NOT NULL DEFAULT 0,
  `win` double NOT NULL DEFAULT 0,
  `balance` double NOT NULL DEFAULT 0,
  `data` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of histories
-- ----------------------------

-- ----------------------------
-- Table structure for jack_history
-- ----------------------------
DROP TABLE IF EXISTS `jack_history`;
CREATE TABLE `jack_history`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `jack_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `txt` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `jack_id`(`jack_id`, `user_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of jack_history
-- ----------------------------

-- ----------------------------
-- Table structure for jack_pay
-- ----------------------------
DROP TABLE IF EXISTS `jack_pay`;
CREATE TABLE `jack_pay`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jack_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `suma` decimal(16, 2) NOT NULL,
  `date_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int(11) NOT NULL,
  `kassir_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `jack_id`(`jack_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of jack_pay
-- ----------------------------

-- ----------------------------
-- Table structure for jackpots
-- ----------------------------
DROP TABLE IF EXISTS `jackpots`;
CREATE TABLE `jackpots`  (
  `id` int(1) NOT NULL AUTO_INCREMENT,
  `room_id` int(1) NOT NULL DEFAULT 1,
  `pos` enum('1','2','3') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `date_time` datetime NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `min_jp` decimal(16, 5) NOT NULL DEFAULT 0.00000,
  `balance` decimal(16, 5) NOT NULL DEFAULT 0.00000,
  `pay_sum` decimal(14, 2) NOT NULL DEFAULT 0.00,
  `min_sum` decimal(14, 2) NOT NULL DEFAULT 0.00,
  `chance_prepay` int(11) NOT NULL DEFAULT 10,
  `mast_win` int(11) NULL DEFAULT NULL,
  `percent` decimal(5, 2) NOT NULL,
  `coment` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `start_timeofday` time NOT NULL DEFAULT '00:00:00',
  `end_timeofday` time NOT NULL DEFAULT '23:59:59',
  `gamer_count` int(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `room_id`(`room_id`, `pos`) USING BTREE,
  INDEX `room_id_index`(`room_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of jackpots
-- ----------------------------
INSERT INTO `jackpots` VALUES (1, 1, '1', '2016-09-23 23:10:00', 'Jack Pot 1', 0.00000, 38.22000, 111.08, 110.00, 5, NULL, 0.35, 'Jack Pot 1', '00:00:00', '23:59:59', 0);
INSERT INTO `jackpots` VALUES (2, 1, '2', '2016-09-23 23:10:00', 'Jack Pot 2', 0.00000, 120.32000, 498.99, 310.00, 5, NULL, 0.35, 'Jack Pot 2', '00:00:00', '23:59:59', 0);
INSERT INTO `jackpots` VALUES (3, 1, '3', '2016-09-23 23:10:00', 'Jack Pot 3', 0.00000, 337.80000, 1001.54, 1010.00, 5, NULL, 0.30, 'Jack Pot 3', '00:00:00', '23:59:59', 0);

-- ----------------------------
-- Table structure for logip
-- ----------------------------
DROP TABLE IF EXISTS `logip`;
CREATE TABLE `logip`  (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `user_id` int(5) NOT NULL DEFAULT 0,
  `date` int(10) NOT NULL DEFAULT 0,
  `ip` char(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of logip
-- ----------------------------

-- ----------------------------
-- Table structure for mail_tmp
-- ----------------------------
DROP TABLE IF EXISTS `mail_tmp`;
CREATE TABLE `mail_tmp`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lang` char(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'us',
  `title` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `subj` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `body` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`, `lang`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of mail_tmp
-- ----------------------------
INSERT INTO `mail_tmp` VALUES (1, 'eu', 'check in', '{%cas_name%} - check in', '<p>Hello <strong>{%login%}</strong></p>\n\n<p>------------------------------------------------<br>Your login information: <strong>{%cas_name%}</strong><br>\n------------------------------------------------</p>\n\n<p>Login: <strong>{%login%}</strong><br>\n Password: <strong>{%password%}</strong></p><p>------------------------------------------------<br><b>Registration and activation bonus</b><br><br>By registering with our online casino, you automatically receive a bonus in the amount<b>5 credits</b>. Activating your <b>e-mail</b>, you will get more <b>10 credits for activation</b>.<br>Inviting your friends to our online casino, You will also receive a reward for their registration, in total <b>5 credits</b>. For activation <b>e-mail</b> your friends, you will get more <b>10 credits</b>.<br><br><b>Inviting just 1 friend, you can get 15 credits ! For 100 friends, you can get 1500 credits !</b><br>------------------------------------------------<strong><br></strong></p>\n\n<p><strong>Refill</strong>: {%url%}/enter<br>\n<strong>With drawing money</strong>: {%url%}/out<br>\n<strong>Your profile</strong>: {%url%}/profile<br>\n<strong>Your statistics</strong>: {%url%}/history<br>\n<strong>Affiliate program</strong>: {%url%}/partner<b> - draw friends, get money !</b><br>\n<strong>Site Policy</strong>: {%url%}/rules</p>\n\n<p>------------------------------------------------</p>\n\n<p>&nbsp;</p>\n\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>');
INSERT INTO `mail_tmp` VALUES (2, 'eu', 'New password', '{%cas_name%} - New password', '<p>Hello <strong>{%login%}</strong></p>\r\n\r\n<p>------------------------------------------------<br />\rYour login information: <strong>{%cas_name%}</strong><br />\r\n------------------------------------------------</p>\r\n\r\n<p>Login: <strong>{%login%}</strong><br />\r\n                       : <strong>{%newpass%}</strong></p>\r\n\r\n<p><br />\r\n<strong>Refill</strong>: {%url%}/enter<br />\r\n<strong>With drawing money</strong>: {%url%}/out<br />\r\n<strong>Your profile</strong>: {%url%}/profile<br />\r\n<strong>Your statistics</strong>: {%url%}/history<br />\r\n<strong>Affiliate program</strong>: {%url%}/partner<br />\r\n<strong>Site Policy</strong>: {%url%}/rules</p>\r\n\r\n<p>------------------------------------------------</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>\r\n');
INSERT INTO `mail_tmp` VALUES (4, 'eu', 'Replenishment', '{%cas_name%} - Replenishment', '<p>Hello <strong>{%login%}</strong></p>\r\n\r\n<p>Your balance is full on the sum <strong>{%sum%}       </strong>.</p>\r\n\r\n<p>[     : <strong>{%ps%}</strong> - invoice: <strong>{%inv_code%}</strong> ]</p>\r\n\r\n<p>------------------------------------------------</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>\r\n');
INSERT INTO `mail_tmp` VALUES (5, 'eu', 'The bill is paid', '{%cas_name%} - the bill is paid', '<p>Hello <strong>{%login%}</strong></p>\r\n\r\n<p>Your application has been processed, cash is credited to your account.</p>\r\n\r\n<p>------------------------------------------------</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>\r\n');
INSERT INTO `mail_tmp` VALUES (7, 'eu', 'Refusal to pay', '{%cas_name%} - Refusal to pay', '<p>Hello <strong>{%login%}</strong></p>\r\n\r\n<p>Your application has been processed and frozen until verification and account verification<strong>.</strong></p>\r\n\r\n<p>------------------------------------------------</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>\r\n');
INSERT INTO `mail_tmp` VALUES (8, 'eu', 'account activation', '{%cas_name%} - account activation', '<p>Hello <strong>{%login%}</strong></p>\r\n\r\n<p>------------------------------------------------<br />\r\n Check <strong>e-mail</strong> in the online casino: <strong>{%cas_name%}</strong><br />\r\n------------------------------------------------</p>\r\n\r\n<p><strong>Enter the activation code in your profile: </strong>{%activate%}</p>\r\n\r\n<p><br />\r\n<strong>Refill</strong>: {%url%}/enter<br />\r\n<strong>With drawing money</strong>: {%url%}/out<br />\r\n<strong>Your profile</strong>: {%url%}/profile<br />\r\n<strong>Your statistics</strong>: {%url%}/history<br />\r\n<strong>Affiliate program</strong>: {%url%}/partner<br />\r\n<strong>Site Policy</strong>: {%url%}/rules</p>\r\n\r\n<p>------------------------------------------------</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>\r\n');
INSERT INTO `mail_tmp` VALUES (9, 'eu', 'Support', '{%cas_name%} - Support', '<p>This letter sent you <strong>{%username%}</strong></p>\r\n\r\n<p>E-mail <strong>{%usermail%}</strong></p>\r\n\r\n<p>------------------------------------------------<br />\r\n The subject of the message: <strong>{%subj%}</strong><br />\r\n------------------------------------------------</p>\r\n\r\n<p>{%text%}</p>\r\n\r\n<p><br />\r\n<strong>Refill</strong>: {%url%}/enter<br />\r\n<strong>With drawing money</strong>: {%url%}/out<br />\r\n<strong>Your profile</strong>: {%url%}/profile<br />\r\n<strong>Your statistics</strong>: {%url%}/history<br />\r\n<strong>Affiliate program</strong>: {%url%}/partner<br />\r\n<strong>Site Policy</strong>: {%url%}/rules</p>\r\n\r\n<p>------------------------------------------------</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>\r\n');
INSERT INTO `mail_tmp` VALUES (10, 'eu', 'Start Tournament', '{%cas_name%} - the tournament started', 'here substitutions of the form {%field%}, Where field  - field name from the tournament table');
INSERT INTO `mail_tmp` VALUES (11, 'eu', 'End of the tournament', '{%cas_name%} - the tournament is over', 'here substitutions of the form {%field%}, Where field  - field name from the tournament table');
INSERT INTO `mail_tmp` VALUES (1, 'us', 'check in', '{%cas_name%} - check in', '<p>Hello <strong>{%login%}</strong></p>\n\n<p>------------------------------------------------<br>Your login information: <strong>{%cas_name%}</strong><br>\n------------------------------------------------</p>\n\n<p>Login: <strong>{%login%}</strong><br>\n Password: <strong>{%password%}</strong></p><p>------------------------------------------------<br><b>Registration and activation bonus</b><br><br>By registering with our online casino, you automatically receive a bonus in the amount <b>5 credits</b>. Activating your <b>e-mail</b>, you will get more <b>10 credits for activation</b>.<br>Inviting your friends to our online casino, You will also receive a reward for their registration, in total <b>5 credits</b>. For activation <b>e-mail</b> your friends, you will get more <b>10 credits</b>.<br><br><b>Inviting just 1 friend, you can get 15 credits ! For 100 friends, you can get 1500 credits !</b><br>------------------------------------------------<strong><br></strong></p>\n\n<p><strong>Refill</strong>: {%url%}/enter<br>\n<strong>With drawing money</strong>: {%url%}/out<br>\n<strong>Your profile</strong>: {%url%}/profile<br>\n<strong>Your statistics</strong>: {%url%}/history<br>\n<strong>Affiliate program</strong>: {%url%}/partner<b> - draw friends, get money !</b><br>\n<strong>Site Policy</strong>: {%url%}/rules</p>\n\n<p>------------------------------------------------</p>\n\n<p>&nbsp;</p>\n\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>');
INSERT INTO `mail_tmp` VALUES (2, 'us', 'New password', '{%cas_name%} - New password', '<p>Hello <strong>{%login%}</strong></p>\r\n\r\n<p>------------------------------------------------<br />\rYour login information: <strong>{%cas_name%}</strong><br />\r\n------------------------------------------------</p>\r\n\r\n<p>Login: <strong>{%login%}</strong><br />\r\n                       : <strong>{%newpass%}</strong></p>\r\n\r\n<p><br />\r\n<strong>Refill</strong>: {%url%}/enter<br />\r\n<strong>With drawing money</strong>: {%url%}/out<br />\r\n<strong>Your profile</strong>: {%url%}/profile<br />\r\n<strong>Your statistics</strong>: {%url%}/history<br />\r\n<strong>Affiliate program</strong>: {%url%}/partner<br />\r\n<strong>Site Policy</strong>: {%url%}/rules</p>\r\n\r\n<p>------------------------------------------------</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>\r\n');
INSERT INTO `mail_tmp` VALUES (4, 'us', 'Replenishment', '{%cas_name%} - Replenishment', '<p>Hello <strong>{%login%}</strong></p>\r\n\r\n<p>Your balance is full on the sum <strong>{%sum%}       </strong>.</p>\r\n\r\n<p>[     : <strong>{%ps%}</strong> - invoice: <strong>{%inv_code%}</strong> ]</p>\r\n\r\n<p>------------------------------------------------</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>\r\n');
INSERT INTO `mail_tmp` VALUES (5, 'us', 'The bill is paid', '{%cas_name%} - the bill is paid', '<p>Hello <strong>{%login%}</strong></p>\r\n\r\n<p>Your application has been processed, cash is credited to your account.</p>\r\n\r\n<p>------------------------------------------------</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>\r\n');
INSERT INTO `mail_tmp` VALUES (7, 'us', 'Refusal to pay', '{%cas_name%} - Refusal to pay', '<p>Hello <strong>{%login%}</strong></p>\r\n\r\n<p>Your application has been processed and frozen until verification and account verification<strong>.</strong></p>\r\n\r\n<p>------------------------------------------------</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>\r\n');
INSERT INTO `mail_tmp` VALUES (8, 'us', 'account activation', '{%cas_name%} - account activation', '<p>Hello <strong>{%login%}</strong></p>\r\n\r\n<p>------------------------------------------------<br />\r\n Check <strong>e-mail</strong> in the online casino: <strong>{%cas_name%}</strong><br />\r\n------------------------------------------------</p>\r\n\r\n<p><strong>Enter the activation code in your profile: </strong>{%activate%}</p>\r\n\r\n<p><br />\r\n<strong>Refill</strong>: {%url%}/enter<br />\r\n<strong>With drawing money</strong>: {%url%}/out<br />\r\n<strong>Your profile</strong>: {%url%}/profile<br />\r\n<strong>Your statistics</strong>: {%url%}/history<br />\r\n<strong>Affiliate program</strong>: {%url%}/partner<br />\r\n<strong>Site Policy</strong>: {%url%}/rules</p>\r\n\r\n<p>------------------------------------------------</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>\r\n');
INSERT INTO `mail_tmp` VALUES (9, 'us', 'Support', '{%cas_name%} - Support', '<p>This letter sent you <strong>{%username%}</strong></p>\r\n\r\n<p>E-mail <strong>{%usermail%}</strong></p>\r\n\r\n<p>------------------------------------------------<br />\r\n The subject of the message: <strong>{%subj%}</strong><br />\r\n------------------------------------------------</p>\r\n\r\n<p>{%text%}</p>\r\n\r\n<p><br />\r\n<strong>Refill</strong>: {%url%}/enter<br />\r\n<strong>With drawing money</strong>: {%url%}/out<br />\r\n<strong>Your profile</strong>: {%url%}/profile<br />\r\n<strong>Your statistics</strong>: {%url%}/history<br />\r\n<strong>Affiliate program</strong>: {%url%}/partner<br />\r\n<strong>Site Policy</strong>: {%url%}/rules</p>\r\n\r\n<p>------------------------------------------------</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>\r\n');
INSERT INTO `mail_tmp` VALUES (10, 'us', 'Start Tournament', '{%cas_name%} - the tournament started', 'here substitutions of the form {%field%}, Where field  - field name from the tournament table');
INSERT INTO `mail_tmp` VALUES (11, 'us', 'End of the tournament', '{%cas_name%} - the tournament is over', 'here substitutions of the form {%field%}, Where field  - field name from the tournament table');
INSERT INTO `mail_tmp` VALUES (1, 'fr', 'check in', '{%cas_name%} - check in', '<p>Hello <strong>{%login%}</strong></p>\n\n<p>------------------------------------------------<br>Your login information: <strong>{%cas_name%}</strong><br>\n------------------------------------------------</p>\n\n<p>Login: <strong>{%login%}</strong><br>\n Password: <strong>{%password%}</strong></p><p>------------------------------------------------<br><b>Registration and activation bonus</b><br><br>                           at                             casino,                                                               in total <b>5 credits</b>. Activating your <b>e-mail</b>, you will get more <b>10 credits for activation</b>.<br>Inviting your friends to our online casino, You will also receive a reward for their registration, in total <b>5 credits</b>. For activation <b>e-mail</b> your friends, you will get more <b>10 credits</b>.<br><br><b>Inviting just 1 friend, you can get 15 credits ! For 100 friends, you can get 1500 credits !</b><br>------------------------------------------------<strong><br></strong></p>\n\n<p><strong>Refill</strong>: {%url%}/enter<br>\n<strong>With drawing money</strong>: {%url%}/out<br>\n<strong>Your profile</strong>: {%url%}/profile<br>\n<strong>Your statistics</strong>: {%url%}/history<br>\n<strong>Affiliate program</strong>: {%url%}/partner<b> - draw friends, get money !</b><br>\n<strong>Site Policy</strong>: {%url%}/rules</p>\n\n<p>------------------------------------------------</p>\n\n<p>&nbsp;</p>\n\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>');
INSERT INTO `mail_tmp` VALUES (2, 'fr', 'New password', '{%cas_name%} - New password', '<p>Hello <strong>{%login%}</strong></p>\r\n\r\n<p>------------------------------------------------<br />\rYour login information: <strong>{%cas_name%}</strong><br />\r\n------------------------------------------------</p>\r\n\r\n<p>Login: <strong>{%login%}</strong><br />\r\n                       : <strong>{%newpass%}</strong></p>\r\n\r\n<p><br />\r\n<strong>Refill</strong>: {%url%}/enter<br />\r\n<strong>With drawing money</strong>: {%url%}/out<br />\r\n<strong>Your profile</strong>: {%url%}/profile<br />\r\n<strong>Your statistics</strong>: {%url%}/history<br />\r\n<strong>Affiliate program</strong>: {%url%}/partner<br />\r\n<strong>Site Policy</strong>: {%url%}/rules</p>\r\n\r\n<p>------------------------------------------------</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>\r\n');
INSERT INTO `mail_tmp` VALUES (4, 'fr', 'Replenishment', '{%cas_name%} - Replenishment', '<p>Hello <strong>{%login%}</strong></p>\r\n\r\n<p>Your balance is full on the sum <strong>{%sum%}       </strong>.</p>\r\n\r\n<p>[     : <strong>{%ps%}</strong> - invoice: <strong>{%inv_code%}</strong> ]</p>\r\n\r\n<p>------------------------------------------------</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>\r\n');
INSERT INTO `mail_tmp` VALUES (5, 'fr', 'The bill is paid', '{%cas_name%} - the bill is paid', '<p>Hello <strong>{%login%}</strong></p>\r\n\r\n<p>Your application has been processed, cash is credited to your account.</p>\r\n\r\n<p>------------------------------------------------</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>\r\n');
INSERT INTO `mail_tmp` VALUES (7, 'fr', 'Refusal to pay', '{%cas_name%} - Refusal to pay', '<p>Hello <strong>{%login%}</strong></p>\r\n\r\n<p>Your application has been processed and frozen until verification and account verification<strong>.</strong></p>\r\n\r\n<p>------------------------------------------------</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>\r\n');
INSERT INTO `mail_tmp` VALUES (8, 'fr', 'account activation', '{%cas_name%} - account activation', '<p>Hello <strong>{%login%}</strong></p>\r\n\r\n<p>------------------------------------------------<br />\r\n Check <strong>e-mail</strong> in the online casino: <strong>{%cas_name%}</strong><br />\r\n------------------------------------------------</p>\r\n\r\n<p><strong>Enter the activation code in your profile: </strong>{%activate%}</p>\r\n\r\n<p><br />\r\n<strong>Refill</strong>: {%url%}/enter<br />\r\n<strong>With drawing money</strong>: {%url%}/out<br />\r\n<strong>Your profile</strong>: {%url%}/profile<br />\r\n<strong>Your statistics</strong>: {%url%}/history<br />\r\n<strong>Affiliate program</strong>: {%url%}/partner<br />\r\n<strong>Site Policy</strong>: {%url%}/rules</p>\r\n\r\n<p>------------------------------------------------</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>\r\n');
INSERT INTO `mail_tmp` VALUES (9, 'fr', 'Support', '{%cas_name%} - Support', '<p>This letter sent you <strong>{%username%}</strong></p>\r\n\r\n<p>E-mail <strong>{%usermail%}</strong></p>\r\n\r\n<p>------------------------------------------------<br />\r\n The subject of the message: <strong>{%subj%}</strong><br />\r\n------------------------------------------------</p>\r\n\r\n<p>{%text%}</p>\r\n\r\n<p><br />\r\n<strong>Refill</strong>: {%url%}/enter<br />\r\n<strong>With drawing money</strong>: {%url%}/out<br />\r\n<strong>Your profile</strong>: {%url%}/profile<br />\r\n<strong>Your statistics</strong>: {%url%}/history<br />\r\n<strong>Affiliate program</strong>: {%url%}/partner<br />\r\n<strong>Site Policy</strong>: {%url%}/rules</p>\r\n\r\n<p>------------------------------------------------</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>\r\n');
INSERT INTO `mail_tmp` VALUES (10, 'fr', 'Start Tournament', '{%cas_name%} - the tournament started', 'here substitutions of the form {%field%}, Where field  - field name from the tournament table');
INSERT INTO `mail_tmp` VALUES (11, 'fr', 'End of the tournament', '{%cas_name%} - the tournament is over', 'here substitutions of the form {%field%}, Where field  - field name from the tournament table');
INSERT INTO `mail_tmp` VALUES (1, 'es', 'check in', '{%cas_name%} - check in', '<p>Hello <strong>{%login%}</strong></p>\n\n<p>------------------------------------------------<br>Your login information: <strong>{%cas_name%}</strong><br>\n------------------------------------------------</p>\n\n<p>Login: <strong>{%login%}</strong><br>\n Password: <strong>{%password%}</strong></p><p>------------------------------------------------<br><b>Registration and activation bonus</b><br><br>                           at                             casino,                                                               in total <b>5 credits</b>. Activating your <b>e-mail</b>, you will get more <b>10 credits for activation</b>.<br>Inviting your friends to our online casino, You will also receive a reward for their registration, in total <b>5 credits</b>. For activation <b>e-mail</b> your friends, you will get more <b>10 credits</b>.<br><br><b>Inviting just 1 friend, you can get 15 credits ! For 100 friends, you can get 1500 credits !</b><br>------------------------------------------------<strong><br></strong></p>\n\n<p><strong>Refill</strong>: {%url%}/enter<br>\n<strong>With drawing money</strong>: {%url%}/out<br>\n<strong>Your profile</strong>: {%url%}/profile<br>\n<strong>Your statistics</strong>: {%url%}/history<br>\n<strong>Affiliate program</strong>: {%url%}/partner<b> - draw friends, get money !</b><br>\n<strong>Site Policy</strong>: {%url%}/rules</p>\n\n<p>------------------------------------------------</p>\n\n<p>&nbsp;</p>\n\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>');
INSERT INTO `mail_tmp` VALUES (2, 'es', 'New password', '{%cas_name%} - New password', '<p>Hello <strong>{%login%}</strong></p>\r\n\r\n<p>------------------------------------------------<br />\rYour login information: <strong>{%cas_name%}</strong><br />\r\n------------------------------------------------</p>\r\n\r\n<p>Login: <strong>{%login%}</strong><br />\r\n                       : <strong>{%newpass%}</strong></p>\r\n\r\n<p><br />\r\n<strong>Refill</strong>: {%url%}/enter<br />\r\n<strong>With drawing money</strong>: {%url%}/out<br />\r\n<strong>Your profile</strong>: {%url%}/profile<br />\r\n<strong>Your statistics</strong>: {%url%}/history<br />\r\n<strong>Affiliate program</strong>: {%url%}/partner<br />\r\n<strong>Site Policy</strong>: {%url%}/rules</p>\r\n\r\n<p>------------------------------------------------</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>\r\n');
INSERT INTO `mail_tmp` VALUES (4, 'es', 'Replenishment', '{%cas_name%} - Replenishment', '<p>Hello <strong>{%login%}</strong></p>\r\n\r\n<p>Your balance is full on the sum <strong>{%sum%}       </strong>.</p>\r\n\r\n<p>[     : <strong>{%ps%}</strong> - invoice: <strong>{%inv_code%}</strong> ]</p>\r\n\r\n<p>------------------------------------------------</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>\r\n');
INSERT INTO `mail_tmp` VALUES (5, 'es', 'The bill is paid', '{%cas_name%} - the bill is paid', '<p>Hello <strong>{%login%}</strong></p>\r\n\r\n<p>Your application has been processed, cash is credited to your account.</p>\r\n\r\n<p>------------------------------------------------</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>\r\n');
INSERT INTO `mail_tmp` VALUES (7, 'es', 'Refusal to pay', '{%cas_name%} - Refusal to pay', '<p>Hello <strong>{%login%}</strong></p>\r\n\r\n<p>Your application has been processed and frozen until verification and account verification<strong>.</strong></p>\r\n\r\n<p>------------------------------------------------</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>\r\n');
INSERT INTO `mail_tmp` VALUES (8, 'es', 'account activation', '{%cas_name%} - account activation', '<p>Hello <strong>{%login%}</strong></p>\r\n\r\n<p>------------------------------------------------<br />\r\n Check <strong>e-mail</strong> in the online casino: <strong>{%cas_name%}</strong><br />\r\n------------------------------------------------</p>\r\n\r\n<p><strong>Enter the activation code in your profile: </strong>{%activate%}</p>\r\n\r\n<p><br />\r\n<strong>Refill</strong>: {%url%}/enter<br />\r\n<strong>With drawing money</strong>: {%url%}/out<br />\r\n<strong>Your profile</strong>: {%url%}/profile<br />\r\n<strong>Your statistics</strong>: {%url%}/history<br />\r\n<strong>Affiliate program</strong>: {%url%}/partner<br />\r\n<strong>Site Policy</strong>: {%url%}/rules</p>\r\n\r\n<p>------------------------------------------------</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>\r\n');
INSERT INTO `mail_tmp` VALUES (9, 'es', 'Support', '{%cas_name%} - Support', '<p>This letter sent you <strong>{%username%}</strong></p>\r\n\r\n<p>E-mail <strong>{%usermail%}</strong></p>\r\n\r\n<p>------------------------------------------------<br />\r\n The subject of the message: <strong>{%subj%}</strong><br />\r\n------------------------------------------------</p>\r\n\r\n<p>{%text%}</p>\r\n\r\n<p><br />\r\n<strong>Refill</strong>: {%url%}/enter<br />\r\n<strong>With drawing money</strong>: {%url%}/out<br />\r\n<strong>Your profile</strong>: {%url%}/profile<br />\r\n<strong>Your statistics</strong>: {%url%}/history<br />\r\n<strong>Affiliate program</strong>: {%url%}/partner<br />\r\n<strong>Site Policy</strong>: {%url%}/rules</p>\r\n\r\n<p>------------------------------------------------</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely, the project administration <strong>{%cas_name%}</strong></p>\r\n');
INSERT INTO `mail_tmp` VALUES (10, 'es', 'Start Tournament', '{%cas_name%} - the tournament started', 'here substitutions of the form {%field%}, Where field  - field name from the tournament table');
INSERT INTO `mail_tmp` VALUES (11, 'es', 'End of the tournament', '{%cas_name%} - the tournament is over', 'here substitutions of the form {%field%}, Where field  - field name from the tournament table');

-- ----------------------------
-- Table structure for mailing
-- ----------------------------
DROP TABLE IF EXISTS `mailing`;
CREATE TABLE `mailing`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `mail_id` int(11) NOT NULL,
  `status` int(1) NOT NULL,
  `date_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `mail_id`(`mail_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of mailing
-- ----------------------------

-- ----------------------------
-- Table structure for mailing_text
-- ----------------------------
DROP TABLE IF EXISTS `mailing_text`;
CREATE TABLE `mailing_text`  (
  `mail_id` int(11) NOT NULL AUTO_INCREMENT,
  `subj` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `text` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`mail_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of mailing_text
-- ----------------------------

-- ----------------------------
-- Table structure for output
-- ----------------------------
DROP TABLE IF EXISTS `output`;
CREATE TABLE `output`  (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `inv_code` char(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `login` char(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `ps` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` smallint(1) NOT NULL DEFAULT 0,
  `date` int(10) NOT NULL DEFAULT 0,
  `sum` decimal(7, 2) NOT NULL DEFAULT 0.00,
  `sum_out` decimal(7, 2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of output
-- ----------------------------

-- ----------------------------
-- Table structure for output_history
-- ----------------------------
DROP TABLE IF EXISTS `output_history`;
CREATE TABLE `output_history`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `output_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date_time` datetime NOT NULL,
  `status` int(1) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `output_id`(`output_id`, `user_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of output_history
-- ----------------------------

-- ----------------------------
-- Table structure for pages
-- ----------------------------
DROP TABLE IF EXISTS `pages`;
CREATE TABLE `pages`  (
  `id` smallint(1) NOT NULL AUTO_INCREMENT,
  `lang` char(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'eu',
  `title` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `sub_title` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `keywords` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `description` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `GE` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `path` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `type` smallint(1) NOT NULL DEFAULT 0,
  `part` smallint(1) NOT NULL DEFAULT 0,
  `view` smallint(1) NOT NULL DEFAULT 0,
  `body` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `ge`(`GE`, `lang`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 69 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pages
-- ----------------------------
INSERT INTO `pages` VALUES (1, 'eu', 'Casino Global     play the best slot machines for free', '', 'global casino, casino global, slot machines, slot machines is free, free slot machines, play slot machines, slot machines play is free registration, roulette, roulette online, gambling games, gambling games online, card games, novomatic, gaminator , igrosoft, bonus casino', 'Casino Global     the best online slots Amatic, Deluxe, Igrosoft, BetSoft, Sheriff Gaming, NetEnt, Microgaming, Mega Jack and Pleytech! We can play is free and on money. Best gaming service     for you!', 'index', 'index', 0, 0, 1, '');
INSERT INTO `pages` VALUES (2, 'eu', 'Profile', '', '', '', 'profile', 'profile', 2, 0, 1, '');
INSERT INTO `pages` VALUES (3, 'eu', 'Refill', '', '', '', 'enter', 'enter', 2, 0, 1, '');
INSERT INTO `pages` VALUES (4, 'eu', 'Get winnings', '', '', '', 'out', 'out', 2, 0, 1, '');
INSERT INTO `pages` VALUES (5, 'eu', 'Statistics', '', '', '', 'history', 'history', 2, 0, 1, '');
INSERT INTO `pages` VALUES (6, 'eu', 'Referrals', '', '', '', 'partner', 'partner', 2, 0, 1, '');
INSERT INTO `pages` VALUES (7, 'eu', 'Login', '', '', '', 'login', 'login', 3, 0, 1, '');
INSERT INTO `pages` VALUES (8, 'eu', 'check in', '', '', '', 'registration', 'registration', 3, 0, 1, '');
INSERT INTO `pages` VALUES (9, 'eu', 'password reminder', '', '', '', 'reminder', 'reminder', 3, 0, 1, '');
INSERT INTO `pages` VALUES (10, 'eu', 'Contacts', '', '', '', 'contacts', 'contacts', 3, 0, 1, '');
INSERT INTO `pages` VALUES (11, 'eu', 'Points', '', '', '', 'exchange', 'exchange', 3, 0, 1, '');
INSERT INTO `pages` VALUES (12, 'eu', 'Tournaments', '', 'global casino, casino global, slot machines, slot machines is free, free slot machines, play slot machines, slot machines play is free registration, roulette, roulette online, gambling games, gambling games online, card games, novomatic, gaminator , igrosoft, bonus casino', '', 'tournament', 'tournament', 3, 0, 1, '');
INSERT INTO `pages` VALUES (13, 'eu', 'VIP club', '', 'global casino, casino global, slot machines, slot machines is free, free slot machines, play slot machines, slot machines play is free registration, roulette, roulette online, gambling games, gambling games online, card games, novomatic, gaminator , igrosoft, bonus casino', '', 'vip', 'vip', 0, 0, 1, 'Become part VIP-club from casino Global.                          from                                          at            VIP-                                   .                                         and                                                                       .                    VIP-         and                                                          !                                                                                                               .                                                                 .');
INSERT INTO `pages` VALUES (14, 'eu', '                ', '', 'global casino, casino global, slot machines, slot machines is free, free slot machines, play slot machines, slot machines play is free registration, roulette, roulette online, gambling games, gambling games online, card games, novomatic, gaminator , igrosoft, bonus casino', '', 'antifraud', 'antifraud', 0, 0, 1, '<p>Invicta Antifraud Tool is a powerful antifraud tool developed in order to prevent fraudulent transactions in online gambling sphere which permits us to dramatically downgrade the number of credit card fraud in our gambling establishments. In cooperation with the leading internet payment service providers we do our best to transact business securely online and to guarantee that our end users    details remain secure throughout the whole credit or debit card transaction process.</p>  <p>Our system benefits from dozens of years of positive database management experience in credit card transaction technology which makes Invicta Antifraud Tool truly powerful and handy remedy against credit card fraud.</p>  <h2>KEY FEATURES:</h2>  <ul> <li>All-around multistage customer verification (IP Location, device fingerprinting, proxy check);</li> <li>Customer phone number verification;</li> <li>Customer gambling manner analysis;</li> <li>Fraud management system with more than 100 filters designed for customer in-depth verification to check payment details, payment history and customer black lists;</li> <li>Customer final verification by our risk department at the money withdrawal stage.</li> </ul>');
INSERT INTO `pages` VALUES (15, 'eu', 'rules and conditions', '', 'global casino, casino global, slot machines, slot machines is free, free slot machines, play slot machines, slot machines play is free registration, roulette, roulette online, gambling games, gambling games online, card games, novomatic, gaminator , igrosoft, bonus casino', '', 'termsandconditions', 'termsandconditions', 0, 0, 1, '<p>                                                                   ,                                                                                  club (          ) and                                online-casino Global (at                                      ).            registration                                                                                                               and                   .                                                                                            at                                 ,                                                   ,                                                              ,                                     .</p>  <p>                                                                                                                                                                                          . Casino Global                                                              ,                                                                                .</p>  <h2>check in at            Global</h2>  <p>                                                                                                 ,                                      18-           .                                                             ,                                                                                                          ,                                                                                       .                                                              ,        play at             ,        and                                   at                 ,             ,                  and                                       club.                    , check in                   :</p>  <ul> <li>                     club Global;</li> <li>                                                            ;</li> <li>                                                                    ;</li> <li>                                                              .</li> </ul>  <p>                                                                                                                                                            club                     .</p>  <p>                                            ,        at                     gambling                        at                                      .                                                                                       ,                                 ,                                                                                                  .                                                                                                                                          registration                .</p>  <p>           registration at                                                                                                        , Where                                                          :</p>  <ul> <li>              ,       ;</li> <li>                         ;</li> <li>                                  ;</li> <li>                                            .</li> </ul>  <p>                                                                                                                                                                                                                                     , casino                                                                                                   and                                                                                                  ,                                   .</p>  <p>                                                                                                   and                                                                                                  .                           ,                                                                                                                            .                                                                                          ,                                                                                     ,              and                                                   ,                                                                                                               .</p>  <h2>             -            ,                and                    online-casino Global</h2>  <p>                    at                              -                    ,                                                         ,                                                                                                                                                          ,                                                                                                  .                                                                                                                    at                                .                                  ,                                                                                                                                                                                                                                                                         .</p>  <p>                                                                                                                  online-casino.                                                           ,                                                                              .               ,                                                                    ,                                                             conditions           .                                                                                                                                                                         at                        -          .                                                                             ,                                                                   and                           .</p>  <h2>                                      ?</h2>  <p>                                                                                                              ,                        at                                    .                                      at                                                         .                                                   at                                        and                 .</p>  <h2>                 and                       </h2>  <p>                                                                                             e-mail.                      ,                                                                                            and                   ,                                and                                                  .                                                                                                                          .                                           ,                                                                     -                                           and       .                ,                                                         from                                                 ,                                                                    at                                </p>  <h2>                                                                 1-Click at casino Global</h2>  <p>                                              club                      at                           1-Click.                            ,                                                                                                                                                                       .</p>  <p>Replenishment                             at                              .                                                                                                                                                .                                ,                                                                                    ,                                    at           , and                                                                  (            ,                and     .),                                       .</p>  <p>                                                                                    (              ,              and     .)                                                            .</p>  <p>                             ,                                                                                                                                                                         ,                                         .                    ,                                                                                                                                                               .</p>  <p>                                           ,                    ,                                                                                                                                       .                                                                                                                                                  and                                       .                                                                            from           -                                                                ,                                                  ,            at                                     .</p>  <p>                                                                                                          ,                                                                              .        and                                                                            -                                                                                                      .                                                                                                      ,                                                                                       club.</p>  <h2>                                     and                  online-casino Global</h2>  <p>                                                                                                                                                          .                                                            .                          club                                     ,                                                                                                                                      .</p>  <p>                      ,                                                                                      at                                ,                                                                                                                                               .          at                                                                                              ,                                 .</p>  <p>         at                                                              casino                                -or                                                       -                                                                                                                                       ,                     club Global                                                                                            and               ,                                                                                                           .</p>  <p>                                          ,        and                                                                                                                                                            and                          .                                                                                                                  .                                                                                                     or                              ,                                                            .                                                                ,                                                                                        .                                                                                                                                                                                 .</p>  <h2>                                                 for                                    :</h2>  <ul> <li>                                                                           ,        and                          ;</li> <li>                                                                                                                             ;</li> <li>                       amount output                                                               for                                 systems.                                                                                    ;</li> <li>         amount                                              100                                  ,      casino                                                                                                                        .                                                for                                                                        .</li> </ul>  <p>                                                                for                      and                                                                              .                                                                                          at                                                  club Global.</p>  <p>                                                                                                                    conditions                                 ,                           3 * amount                 .                                                                                                                      conditions,      at                       casino                                                                               at                20% from                               .</p>  <p>                                                                    at                                     24         .                     ,                                                                                              .</p>  <h2>                       at                            </h2>  <p>                                                                                                                                                    .                                                 from                                                                              .</p>  <p>1.                                        60       .             :</p>  <ul> <li>at                              30 000             ;</li> <li>at                                  90 000             ;</li> <li>at                     600 000             .</li> </ul>  <p>2.                                   from 60      300       .             :</p>  <ul> <li>at                              45 000             ;</li> <li>at                                  300 000 &nbsp;            ;</li> <li>at                     900 000             .</li> </ul>  <p>3.                           and                                                                                               .</p>');
INSERT INTO `pages` VALUES (16, 'eu', '                                 ', '', 'global casino, casino global, slot machines, slot machines is free, free slot machines, play slot machines, slot machines play is free registration, roulette, roulette online, gambling games, gambling games online, card games, novomatic, gaminator , igrosoft, bonus casino', '', 'privacypolicy', 'privacypolicy', 0, 0, 1, '<p>                                                                   at                                                                                      ,                                                                                       .</p>  <p>               ,                                                                                                                   and               .                                                                                                                       for       .</p>  <p>                                                     ,                   ,                                                                                                                                  .</p>  <p>               ,                            , e-mail           ,                                ,                          ,      , IP            and                                                                       and                                  and                                       ,                and                                                         .</p>  <p>Joycasino                                      -                         .                    ,                                                                                                                    ,                                                                                                              at casino and                                                   .                                                                                          and                         3            at           .</p>  <p>                                                                                from                  - at                                                                                     online                    or                      at                      ,                                                                                      .</p>  <p>                                                      and                                                                                                                          and                  at                                        . Joycasino                                                                                               ,                                                                                                                                                 from                                        .</p>  <p>                at online slots,                                               NetEnt,                  at                                                                                 NetEnt,                                                                                     www.netent.com/en/netent-privacy-policy-eu/ </p>  <p>                                                                                                         ,                     ,                      at              online                    or                                                   <a href=\"mailto:%contact_mail%\">%contact_mail%</a>.                                             .</p>');
INSERT INTO `pages` VALUES (17, 'eu', '                                   ', '', 'global casino, casino global, slot machines, slot machines is free, free slot machines, play slot machines, slot machines play is free registration, roulette, roulette online, gambling games, gambling games online, card games, novomatic, gaminator , igrosoft, bonus casino', '', 'responsiblegaming', 'responsiblegaming', 0, 0, 1, '<p>Casino Global                                                                                                                               .                                                                                                                    ,                                ,                     ,                                                                             ,                                                                                                                               and                                ,                                                                   .</p>  <h2>                                     </h2>  <p>                 games                                                                                                         ,                                 for                                .                                                                                                                ,                        and                                               ,                                            , for                                                                        .                ,                                                                                                                      ,                          ,                                                                                           :</p>  <ul> <li>                 games                                            and                                                                        ,                                                                  </li> <li>                                                                                                                       at                    </li> <li>                                    ,                                                         </li> <li>                                     and                                                      ,                                   </li> <li>                                   at                  from                        ,                               at              online                    and                                             </li> </ul>  <p>                                    -                                                          ,                                              at                                 ,                     ,                                                                                            .</p>  <h2>                                        ?</h2>  <p>                                           ,        gambling games                                                                                            or                          ,                                                                                          .</p>  <ul> <li>                               gambling games from                                 or           ?</li> <li>                        ,                                                     or                            ?</li> <li>                         at                        at                                                                    ?</li> <li>                                       -or           -or                                                                 ?</li> <li>                                                  ,                or                -                            ?</li> <li>               -                       ,                                               or                                                                                                  ?</li> <li>               ,            or                  at                                             ?</li> <li>                                     \"                           \"            -                   ?</li> <li>                        ,                                                              ?</li> <li>                                                                                                                                                                                          ?</li> <li>                                                                    and                 ,                                                                              at gambling games?</li> <li>                          -or                   ,                          or                                                                   play?</li> <li>                             gambling games                       and                                         ?</li> </ul>  <p>                                    ,                                           \"    \",                                                    ,                                                                                        .                                          -    ,                                              and                                  ,                     ,                                                             ,                            .</p>  <h2>                            </h2>  <p>                                                        from                        ,                                                                           ,                        at                                 .                                               ,                                                                                              at                                      3               , and                                                                                                                                         .                                                                                                                                                 7         .</p>  <p>                                                                                      ,                     ,                                                                                                 , at                                              and                   ,                                                                      and       .                                                                                                                                          ,                                                                                                                    at                   .     .                                   at                                                  .</p>  <h2>                                                                             at                                   </h2>  <p>* GamCare,                                                                                                                       ,              and                                       at                                                                                    at                             ,                                              : www.gamcare.net.uk.                                                         : 0845 6000 133.</p>  <p>*                                                                            and             ,                                         for                                                                ,                                                       and                                                                                          .                                                                                                          .                                                                                                              : www.gamblersanonymous.net.uk.</p>  <p>* Gambling Therapy                                             and                          for       ,                           from                        .                                                                                        at                              and                    .                                                                                              : www.gamblingtherapy.net</p>  <h2>                                                 </h2>  <p>                            and          at casino Global                                         for       ,                         18                                . Casino Global                                                    at                                                        .                                                                                  ,                                                                          ,                         18        and                                                                                                                    ,                                                                                                   .                     ,                                  ,                       -or at                       18                           at                                      ,                                                          .</p>  <h2>                                   </h2>  <p>                                                                                                 at                 ,                                                        .                                                                    ,                                                       from                                                                  .                                                                                                 or                 ,                                                     check in and                                        , or       -or                                                                                                                 ,                     ,                                                                                      and                                            :</p>  <p>Net Nanny    www.netnanny.com</p>  <p>CyberPatrol www.cyberpatrol.com</p>');
INSERT INTO `pages` VALUES (18, 'us', 'Casino Global - play the best slot Game..!', '', 'volcano casino, casino volcano, slot machines, slot machines free of charge, free slot machines, play slot machines, slot machines play free of charge registrations, roulette, roulette online, gambling, online gambling, card games, novomatik, gaminators, igrosoft, casino bonus ', ' Casino Volcano - the best online slots Amatic, Deluxe, Igrosoft, BetSoft, Sheriff Gaming, NetEnt, Microgaming, Mega Jack and Pleytech! We can play for free and for money. The best gaming service is for you!', 'index', 'index', 0, 0, 1, '');
INSERT INTO `pages` VALUES (19, 'us', 'Profile', '', '', '', 'profile', 'profile', 2, 0, 1, '');
INSERT INTO `pages` VALUES (20, 'us', 'Refill', '', '', '', 'enter', 'enter', 2, 0, 1, '');
INSERT INTO `pages` VALUES (21, 'us', 'Get winnings', '', '', '', 'out', 'out', 2, 0, 1, '');
INSERT INTO `pages` VALUES (22, 'us', 'Statistics', '', '', '', 'history', 'history', 2, 0, 1, '');
INSERT INTO `pages` VALUES (23, 'us', 'Referrals', '', '', '', 'partner', 'partner', 2, 0, 1, '');
INSERT INTO `pages` VALUES (24, 'us', 'Login', '', '', '', 'login', 'login', 3, 0, 1, '');
INSERT INTO `pages` VALUES (25, 'us', 'check in', '', '', '', 'registration', 'registration', 3, 0, 1, '');
INSERT INTO `pages` VALUES (26, 'us', 'password reminder', '', '', '', 'reminder', 'reminder', 3, 0, 1, '');
INSERT INTO `pages` VALUES (27, 'us', 'Contacts', '', '', '', 'contacts', 'contacts', 3, 0, 1, '');
INSERT INTO `pages` VALUES (28, 'us', 'Points', '', '', '', 'exchange', 'exchange', 3, 0, 1, '');
INSERT INTO `pages` VALUES (29, 'us', 'Tournaments', '', 'global casino, casino global, slot machines, slot machines is free, free slot machines, play slot machines, slot machines play is free registration, roulette, roulette online, gambling games, gambling games online, card games, novomatic, gaminator , igrosoft, bonus casino', '', 'tournament', 'tournament', 3, 0, 1, '');
INSERT INTO `pages` VALUES (30, 'us', 'VIP club', '', 'volcano casino, casino volcano, slot machines, slot machines free of charge, free slot machines, play slot machines, slot machines play free of charge registrations, roulette, roulette online, gambling, online gambling, card games, novomatik, gaminators, igrosoft, casino bonus', '', 'vip', 'vip', 0, 0, 1, 'Become a part of the VIP club from the Vulcan Casino. Moving from level to level, no other VIP club was easier. You are waiting for new bonuses and profitable offers at every level. Collect VIP points and get a higher status! The higher the level, the more reward you will get. You will find a detailed description below.');
INSERT INTO `pages` VALUES (31, 'us', '                ', '', 'global casino, casino global, slot machines, slot machines is free, free slot machines, play slot machines, slot machines play is free registration, roulette, roulette online, gambling games, gambling games online, card games, novomatic, gaminator , igrosoft, bonus casino', '', 'antifraud', 'antifraud', 0, 0, 1, '<p>Invicta Antifraud Tool is a powerful antifraud tool developed in order to prevent fraudulent transactions in online gambling sphere which permits us to dramatically downgrade the number of credit card fraud in our gambling establishments. In cooperation with the leading internet payment service providers we do our best to transact business securely online and to guarantee that our end users    details remain secure throughout the whole credit or debit card transaction process.</p>  <p>Our system benefits from dozens of years of positive database management experience in credit card transaction technology which makes Invicta Antifraud Tool truly powerful and handy remedy against credit card fraud.</p>  <h2>KEY FEATURES:</h2>  <ul> <li>All-around multistage customer verification (IP Location, device fingerprinting, proxy check);</li> <li>Customer phone number verification;</li> <li>Customer gambling manner analysis;</li> <li>Fraud management system with more than 100 filters designed for customer in-depth verification to check payment details, payment history and customer black lists;</li> <li>Customer final verification by our risk department at the money withdrawal stage.</li> </ul>');
INSERT INTO `pages` VALUES (32, 'us', 'rules and conditions', '', 'global casino, casino global, slot machines, slot machines is free, free slot machines, play slot machines, slot machines play is free registration, roulette, roulette online, gambling games, gambling games online, card games, novomatic, gaminator , igrosoft, bonus casino', '', 'termsandconditions', 'termsandconditions', 0, 0, 1, '<p>                                                                   ,                                                                                  club (          ) and                                online-casino Global (at                                      ).            registration                                                                                                               and                   .                                                                                            at                                 ,                                                   ,                                                              ,                                     .</p>  <p>                                                                                                                                                                                          . Casino Global                                                              ,                                                                                .</p>  <h2>check in at            Global</h2>  <p>                                                                                                 ,                                      18-           .                                                             ,                                                                                                          ,                                                                                       .                                                              ,        play at             ,        and                                   at                 ,             ,                  and                                       club.                    , check in                   :</p>  <ul> <li>                     club Global;</li> <li>                                                            ;</li> <li>                                                                    ;</li> <li>                                                              .</li> </ul>  <p>                                                                                                                                                            club                     .</p>  <p>                                            ,        at                     gambling                        at                                      .                                                                                       ,                                 ,                                                                                                  .                                                                                                                                          registration                .</p>  <p>           registration at                                                                                                        , Where                                                          :</p>  <ul> <li>              ,       ;</li> <li>                         ;</li> <li>                                  ;</li> <li>                                            .</li> </ul>  <p>                                                                                                                                                                                                                                     , casino                                                                                                   and                                                                                                  ,                                   .</p>  <p>                                                                                                   and                                                                                                  .                           ,                                                                                                                            .                                                                                          ,                                                                                     ,              and                                                   ,                                                                                                               .</p>  <h2>             -            ,                and                    online-casino Global</h2>  <p>                    at                              -                    ,                                                         ,                                                                                                                                                          ,                                                                                                  .                                                                                                                    at                                .                                  ,                                                                                                                                                                                                                                                                         .</p>  <p>                                                                                                                  online-casino.                                                           ,                                                                              .               ,                                                                    ,                                                             conditions           .                                                                                                                                                                         at                        -          .                                                                             ,                                                                   and                           .</p>  <h2>                                      ?</h2>  <p>                                                                                                              ,                        at                                    .                                      at                                                         .                                                   at                                        and                 .</p>  <h2>                 and                       </h2>  <p>                                                                                             e-mail.                      ,                                                                                            and                   ,                                and                                                  .                                                                                                                          .                                           ,                                                                     -                                           and       .                ,                                                         from                                                 ,                                                                    at                                </p>  <h2>                                                                 1-Click at casino Global</h2>  <p>                                              club                      at                           1-Click.                            ,                                                                                                                                                                       .</p>  <p>Replenishment                             at                              .                                                                                                                                                .                                ,                                                                                    ,                                    at           , and                                                                  (            ,                and     .),                                       .</p>  <p>                                                                                    (              ,              and     .)                                                            .</p>  <p>                             ,                                                                                                                                                                         ,                                         .                    ,                                                                                                                                                               .</p>  <p>                                           ,                    ,                                                                                                                                       .                                                                                                                                                  and                                       .                                                                            from           -                                                                ,                                                  ,            at                                     .</p>  <p>                                                                                                          ,                                                                              .        and                                                                            -                                                                                                      .                                                                                                      ,                                                                                       club.</p>  <h2>                                     and                  online-casino Global</h2>  <p>                                                                                                                                                          .                                                            .                          club                                     ,                                                                                                                                      .</p>  <p>                      ,                                                                                      at                                ,                                                                                                                                               .          at                                                                                              ,                                 .</p>  <p>         at                                                              casino                                -or                                                       -                                                                                                                                       ,                     club Global                                                                                            and               ,                                                                                                           .</p>  <p>                                          ,        and                                                                                                                                                            and                          .                                                                                                                  .                                                                                                     or                              ,                                                            .                                                                ,                                                                                        .                                                                                                                                                                                 .</p>  <h2>                                                 for                                    :</h2>  <ul> <li>                                                                           ,        and                          ;</li> <li>                                                                                                                             ;</li> <li>                       amount output                                                               for                                 systems.                                                                                    ;</li> <li>         amount                                              100                                  ,      casino                                                                                                                        .                                                for                                                                        .</li> </ul>  <p>                                                                for                      and                                                                              .                                                                                          at                                                  club Global.</p>  <p>                                                                                                                    conditions                                 ,                           3 * amount                 .                                                                                                                      conditions,      at                       casino                                                                               at                20% from                               .</p>  <p>                                                                    at                                     24         .                     ,                                                                                              .</p>  <h2>                       at                            </h2>  <p>                                                                                                                                                    .                                                 from                                                                              .</p>  <p>1.                                        60       .             :</p>  <ul> <li>at                              30 000             ;</li> <li>at                                  90 000             ;</li> <li>at                     600 000             .</li> </ul>  <p>2.                                   from 60      300       .             :</p>  <ul> <li>at                              45 000             ;</li> <li>at                                  300 000 &nbsp;            ;</li> <li>at                     900 000             .</li> </ul>  <p>3.                           and                                                                                               .</p>');
INSERT INTO `pages` VALUES (33, 'us', '                                 ', '', 'global casino, casino global, slot machines, slot machines is free, free slot machines, play slot machines, slot machines play is free registration, roulette, roulette online, gambling games, gambling games online, card games, novomatic, gaminator , igrosoft, bonus casino', '', 'privacypolicy', 'privacypolicy', 0, 0, 1, '<p>                                                                   at                                                                                      ,                                                                                       .</p>  <p>               ,                                                                                                                   and               .                                                                                                                       for       .</p>  <p>                                                     ,                   ,                                                                                                                                  .</p>  <p>               ,                            , e-mail           ,                                ,                          ,      , IP            and                                                                       and                                  and                                       ,                and                                                         .</p>  <p>Joycasino                                      -                         .                    ,                                                                                                                    ,                                                                                                              at casino and                                                   .                                                                                          and                         3            at           .</p>  <p>                                                                                from                  - at                                                                                     online                    or                      at                      ,                                                                                      .</p>  <p>                                                      and                                                                                                                          and                  at                                        . Joycasino                                                                                               ,                                                                                                                                                 from                                        .</p>  <p>                at online slots,                                               NetEnt,                  at                                                                                 NetEnt,                                                                                     www.netent.com/en/netent-privacy-policy-eu/ </p>  <p>                                                                                                         ,                     ,                      at              online                    or                                                   <a href=\"mailto:%contact_mail%\">%contact_mail%</a>.                                             .</p>');
INSERT INTO `pages` VALUES (34, 'us', '                                   ', '', 'global casino, casino global, slot machines, slot machines is free, free slot machines, play slot machines, slot machines play is free registration, roulette, roulette online, gambling games, gambling games online, card games, novomatic, gaminator , igrosoft, bonus casino', '', 'responsiblegaming', 'responsiblegaming', 0, 0, 1, '<p>Casino Global                                                                                                                               .                                                                                                                    ,                                ,                     ,                                                                             ,                                                                                                                               and                                ,                                                                   .</p>  <h2>                                     </h2>  <p>                 games                                                                                                         ,                                 for                                .                                                                                                                ,                        and                                               ,                                            , for                                                                        .                ,                                                                                                                      ,                          ,                                                                                           :</p>  <ul> <li>                 games                                            and                                                                        ,                                                                  </li> <li>                                                                                                                       at                    </li> <li>                                    ,                                                         </li> <li>                                     and                                                      ,                                   </li> <li>                                   at                  from                        ,                               at              online                    and                                             </li> </ul>  <p>                                    -                                                          ,                                              at                                 ,                     ,                                                                                            .</p>  <h2>                                        ?</h2>  <p>                                           ,        gambling games                                                                                            or                          ,                                                                                          .</p>  <ul> <li>                               gambling games from                                 or           ?</li> <li>                        ,                                                     or                            ?</li> <li>                         at                        at                                                                    ?</li> <li>                                       -or           -or                                                                 ?</li> <li>                                                  ,                or                -                            ?</li> <li>               -                       ,                                               or                                                                                                  ?</li> <li>               ,            or                  at                                             ?</li> <li>                                     \"                           \"            -                   ?</li> <li>                        ,                                                              ?</li> <li>                                                                                                                                                                                          ?</li> <li>                                                                    and                 ,                                                                              at gambling games?</li> <li>                          -or                   ,                          or                                                                   play?</li> <li>                             gambling games                       and                                         ?</li> </ul>  <p>                                    ,                                           \"    \",                                                    ,                                                                                        .                                          -    ,                                              and                                  ,                     ,                                                             ,                            .</p>  <h2>                            </h2>  <p>                                                        from                        ,                                                                           ,                        at                                 .                                               ,                                                                                              at                                      3               , and                                                                                                                                         .                                                                                                                                                 7         .</p>  <p>                                                                                      ,                     ,                                                                                                 , at                                              and                   ,                                                                      and       .                                                                                                                                          ,                                                                                                                    at                   .     .                                   at                                                  .</p>  <h2>                                                                             at                                   </h2>  <p>* GamCare,                                                                                                                       ,              and                                       at                                                                                    at                             ,                                              : www.gamcare.net.uk.                                                         : 0845 6000 133.</p>  <p>*                                                                            and             ,                                         for                                                                ,                                                       and                                                                                          .                                                                                                          .                                                                                                              : www.gamblersanonymous.net.uk.</p>  <p>* Gambling Therapy                                             and                          for       ,                           from                        .                                                                                        at                              and                    .                                                                                              : www.gamblingtherapy.net</p>  <h2>                                                 </h2>  <p>                            and          at casino Global                                         for       ,                         18                                . Casino Global                                                    at                                                        .                                                                                  ,                                                                          ,                         18        and                                                                                                                    ,                                                                                                   .                     ,                                  ,                       -or at                       18                           at                                      ,                                                          .</p>  <h2>                                   </h2>  <p>                                                                                                 at                 ,                                                        .                                                                    ,                                                       from                                                                  .                                                                                                 or                 ,                                                     check in and                                        , or       -or                                                                                                                 ,                     ,                                                                                      and                                            :</p>  <p>Net Nanny    www.netnanny.com</p>  <p>CyberPatrol www.cyberpatrol.com</p>');
INSERT INTO `pages` VALUES (35, 'fr', 'Casino Global     play the best slot machines for free', '', 'global casino, casino global, slot machines, slot machines is free, free slot machines, play slot machines, slot machines play is free registration, roulette, roulette online, gambling games, gambling games online, card games, novomatic, gaminator , igrosoft, bonus casino', 'Casino Global     the best online slots Amatic, Deluxe, Igrosoft, BetSoft, Sheriff Gaming, NetEnt, Microgaming, Mega Jack and Pleytech! We can play is free and on money. Best gaming service     for you!', 'index', 'index', 0, 0, 1, '');
INSERT INTO `pages` VALUES (36, 'fr', 'Profile', '', '', '', 'profile', 'profile', 2, 0, 1, '');
INSERT INTO `pages` VALUES (37, 'fr', 'Refill', '', '', '', 'enter', 'enter', 2, 0, 1, '');
INSERT INTO `pages` VALUES (38, 'fr', 'Get winnings', '', '', '', 'out', 'out', 2, 0, 1, '');
INSERT INTO `pages` VALUES (39, 'fr', 'Statistics', '', '', '', 'history', 'history', 2, 0, 1, '');
INSERT INTO `pages` VALUES (40, 'fr', 'Referrals', '', '', '', 'partner', 'partner', 2, 0, 1, '');
INSERT INTO `pages` VALUES (41, 'fr', 'Login', '', '', '', 'login', 'login', 3, 0, 1, '');
INSERT INTO `pages` VALUES (42, 'fr', 'check in', '', '', '', 'registration', 'registration', 3, 0, 1, '');
INSERT INTO `pages` VALUES (43, 'fr', 'password reminder', '', '', '', 'reminder', 'reminder', 3, 0, 1, '');
INSERT INTO `pages` VALUES (44, 'fr', 'Contacts', '', '', '', 'contacts', 'contacts', 3, 0, 1, '');
INSERT INTO `pages` VALUES (45, 'fr', 'Points', '', '', '', 'exchange', 'exchange', 3, 0, 1, '');
INSERT INTO `pages` VALUES (46, 'fr', 'Tournaments', '', 'global casino, casino global, slot machines, slot machines is free, free slot machines, play slot machines, slot machines play is free registration, roulette, roulette online, gambling games, gambling games online, card games, novomatic, gaminator , igrosoft, bonus casino', '', 'tournament', 'tournament', 3, 0, 1, '');
INSERT INTO `pages` VALUES (47, 'fr', 'VIP club', '', 'global casino, casino global, slot machines, slot machines is free, free slot machines, play slot machines, slot machines play is free registration, roulette, roulette online, gambling games, gambling games online, card games, novomatic, gaminator , igrosoft, bonus casino', '', 'vip', 'vip', 0, 0, 1, 'Become part VIP-club from casino Global.                          from                                          at            VIP-                                   .                                         and                                                                       .                    VIP-         and                                                          !                                                                                                               .                                                                 .');
INSERT INTO `pages` VALUES (48, 'fr', '                ', '', 'global casino, casino global, slot machines, slot machines is free, free slot machines, play slot machines, slot machines play is free registration, roulette, roulette online, gambling games, gambling games online, card games, novomatic, gaminator , igrosoft, bonus casino', '', 'antifraud', 'antifraud', 0, 0, 1, '<p>Invicta Antifraud Tool is a powerful antifraud tool developed in order to prevent fraudulent transactions in online gambling sphere which permits us to dramatically downgrade the number of credit card fraud in our gambling establishments. In cooperation with the leading internet payment service providers we do our best to transact business securely online and to guarantee that our end users    details remain secure throughout the whole credit or debit card transaction process.</p>  <p>Our system benefits from dozens of years of positive database management experience in credit card transaction technology which makes Invicta Antifraud Tool truly powerful and handy remedy against credit card fraud.</p>  <h2>KEY FEATURES:</h2>  <ul> <li>All-around multistage customer verification (IP Location, device fingerprinting, proxy check);</li> <li>Customer phone number verification;</li> <li>Customer gambling manner analysis;</li> <li>Fraud management system with more than 100 filters designed for customer in-depth verification to check payment details, payment history and customer black lists;</li> <li>Customer final verification by our risk department at the money withdrawal stage.</li> </ul>');
INSERT INTO `pages` VALUES (49, 'fr', 'rules and conditions', '', 'global casino, casino global, slot machines, slot machines is free, free slot machines, play slot machines, slot machines play is free registration, roulette, roulette online, gambling games, gambling games online, card games, novomatic, gaminator , igrosoft, bonus casino', '', 'termsandconditions', 'termsandconditions', 0, 0, 1, '<p>                                                                   ,                                                                                  club (          ) and                                online-casino Global (at                                      ).            registration                                                                                                               and                   .                                                                                            at                                 ,                                                   ,                                                              ,                                     .</p>  <p>                                                                                                                                                                                          . Casino Global                                                              ,                                                                                .</p>  <h2>check in at            Global</h2>  <p>                                                                                                 ,                                      18-           .                                                             ,                                                                                                          ,                                                                                       .                                                              ,        play at             ,        and                                   at                 ,             ,                  and                                       club.                    , check in                   :</p>  <ul> <li>                     club Global;</li> <li>                                                            ;</li> <li>                                                                    ;</li> <li>                                                              .</li> </ul>  <p>                                                                                                                                                            club                     .</p>  <p>                                            ,        at                     gambling                        at                                      .                                                                                       ,                                 ,                                                                                                  .                                                                                                                                          registration                .</p>  <p>           registration at                                                                                                        , Where                                                          :</p>  <ul> <li>              ,       ;</li> <li>                         ;</li> <li>                                  ;</li> <li>                                            .</li> </ul>  <p>                                                                                                                                                                                                                                     , casino                                                                                                   and                                                                                                  ,                                   .</p>  <p>                                                                                                   and                                                                                                  .                           ,                                                                                                                            .                                                                                          ,                                                                                     ,              and                                                   ,                                                                                                               .</p>  <h2>             -            ,                and                    online-casino Global</h2>  <p>                    at                              -                    ,                                                         ,                                                                                                                                                          ,                                                                                                  .                                                                                                                    at                                .                                  ,                                                                                                                                                                                                                                                                         .</p>  <p>                                                                                                                  online-casino.                                                           ,                                                                              .               ,                                                                    ,                                                             conditions           .                                                                                                                                                                         at                        -          .                                                                             ,                                                                   and                           .</p>  <h2>                                      ?</h2>  <p>                                                                                                              ,                        at                                    .                                      at                                                         .                                                   at                                        and                 .</p>  <h2>                 and                       </h2>  <p>                                                                                             e-mail.                      ,                                                                                            and                   ,                                and                                                  .                                                                                                                          .                                           ,                                                                     -                                           and       .                ,                                                         from                                                 ,                                                                    at                                </p>  <h2>                                                                 1-Click at casino Global</h2>  <p>                                              club                      at                           1-Click.                            ,                                                                                                                                                                       .</p>  <p>Replenishment                             at                              .                                                                                                                                                .                                ,                                                                                    ,                                    at           , and                                                                  (            ,                and     .),                                       .</p>  <p>                                                                                    (              ,              and     .)                                                            .</p>  <p>                             ,                                                                                                                                                                         ,                                         .                    ,                                                                                                                                                               .</p>  <p>                                           ,                    ,                                                                                                                                       .                                                                                                                                                  and                                       .                                                                            from           -                                                                ,                                                  ,            at                                     .</p>  <p>                                                                                                          ,                                                                              .        and                                                                            -                                                                                                      .                                                                                                      ,                                                                                       club.</p>  <h2>                                     and                  online-casino Global</h2>  <p>                                                                                                                                                          .                                                            .                          club                                     ,                                                                                                                                      .</p>  <p>                      ,                                                                                      at                                ,                                                                                                                                               .          at                                                                                              ,                                 .</p>  <p>         at                                                              casino                                -or                                                       -                                                                                                                                       ,                     club Global                                                                                            and               ,                                                                                                           .</p>  <p>                                          ,        and                                                                                                                                                            and                          .                                                                                                                  .                                                                                                     or                              ,                                                            .                                                                ,                                                                                        .                                                                                                                                                                                 .</p>  <h2>                                                 for                                    :</h2>  <ul> <li>                                                                           ,        and                          ;</li> <li>                                                                                                                             ;</li> <li>                       amount output                                                               for                                 systems.                                                                                    ;</li> <li>         amount                                              100                                  ,      casino                                                                                                                        .                                                for                                                                        .</li> </ul>  <p>                                                                for                      and                                                                              .                                                                                          at                                                  club Global.</p>  <p>                                                                                                                    conditions                                 ,                           3 * amount                 .                                                                                                                      conditions,      at                       casino                                                                               at                20% from                               .</p>  <p>                                                                    at                                     24         .                     ,                                                                                              .</p>  <h2>                       at                            </h2>  <p>                                                                                                                                                    .                                                 from                                                                              .</p>  <p>1.                                        60       .             :</p>  <ul> <li>at                              30 000             ;</li> <li>at                                  90 000             ;</li> <li>at                     600 000             .</li> </ul>  <p>2.                                   from 60      300       .             :</p>  <ul> <li>at                              45 000             ;</li> <li>at                                  300 000 &nbsp;            ;</li> <li>at                     900 000             .</li> </ul>  <p>3.                           and                                                                                               .</p>');
INSERT INTO `pages` VALUES (50, 'fr', '                                 ', '', 'global casino, casino global, slot machines, slot machines is free, free slot machines, play slot machines, slot machines play is free registration, roulette, roulette online, gambling games, gambling games online, card games, novomatic, gaminator , igrosoft, bonus casino', '', 'privacypolicy', 'privacypolicy', 0, 0, 1, '<p>                                                                   at                                                                                      ,                                                                                       .</p>  <p>               ,                                                                                                                   and               .                                                                                                                       for       .</p>  <p>                                                     ,                   ,                                                                                                                                  .</p>  <p>               ,                            , e-mail           ,                                ,                          ,      , IP            and                                                                       and                                  and                                       ,                and                                                         .</p>  <p>Joycasino                                      -                         .                    ,                                                                                                                    ,                                                                                                              at casino and                                                   .                                                                                          and                         3            at           .</p>  <p>                                                                                from                  - at                                                                                     online                    or                      at                      ,                                                                                      .</p>  <p>                                                      and                                                                                                                          and                  at                                        . Joycasino                                                                                               ,                                                                                                                                                 from                                        .</p>  <p>                at online slots,                                               NetEnt,                  at                                                                                 NetEnt,                                                                                     www.netent.com/en/netent-privacy-policy-eu/ </p>  <p>                                                                                                         ,                     ,                      at              online                    or                                                   <a href=\"mailto:%contact_mail%\">%contact_mail%</a>.                                             .</p>');
INSERT INTO `pages` VALUES (51, 'fr', '                                   ', '', 'global casino, casino global, slot machines, slot machines is free, free slot machines, play slot machines, slot machines play is free registration, roulette, roulette online, gambling games, gambling games online, card games, novomatic, gaminator , igrosoft, bonus casino', '', 'responsiblegaming', 'responsiblegaming', 0, 0, 1, '<p>Casino Global                                                                                                                               .                                                                                                                    ,                                ,                     ,                                                                             ,                                                                                                                               and                                ,                                                                   .</p>  <h2>                                     </h2>  <p>                 games                                                                                                         ,                                 for                                .                                                                                                                ,                        and                                               ,                                            , for                                                                        .                ,                                                                                                                      ,                          ,                                                                                           :</p>  <ul> <li>                 games                                            and                                                                        ,                                                                  </li> <li>                                                                                                                       at                    </li> <li>                                    ,                                                         </li> <li>                                     and                                                      ,                                   </li> <li>                                   at                  from                        ,                               at              online                    and                                             </li> </ul>  <p>                                    -                                                          ,                                              at                                 ,                     ,                                                                                            .</p>  <h2>                                        ?</h2>  <p>                                           ,        gambling games                                                                                            or                          ,                                                                                          .</p>  <ul> <li>                               gambling games from                                 or           ?</li> <li>                        ,                                                     or                            ?</li> <li>                         at                        at                                                                    ?</li> <li>                                       -or           -or                                                                 ?</li> <li>                                                  ,                or                -                            ?</li> <li>               -                       ,                                               or                                                                                                  ?</li> <li>               ,            or                  at                                             ?</li> <li>                                     \"                           \"            -                   ?</li> <li>                        ,                                                              ?</li> <li>                                                                                                                                                                                          ?</li> <li>                                                                    and                 ,                                                                              at gambling games?</li> <li>                          -or                   ,                          or                                                                   play?</li> <li>                             gambling games                       and                                         ?</li> </ul>  <p>                                    ,                                           \"    \",                                                    ,                                                                                        .                                          -    ,                                              and                                  ,                     ,                                                             ,                            .</p>  <h2>                            </h2>  <p>                                                        from                        ,                                                                           ,                        at                                 .                                               ,                                                                                              at                                      3               , and                                                                                                                                         .                                                                                                                                                 7         .</p>  <p>                                                                                      ,                     ,                                                                                                 , at                                              and                   ,                                                                      and       .                                                                                                                                          ,                                                                                                                    at                   .     .                                   at                                                  .</p>  <h2>                                                                             at                                   </h2>  <p>* GamCare,                                                                                                                       ,              and                                       at                                                                                    at                             ,                                              : www.gamcare.net.uk.                                                         : 0845 6000 133.</p>  <p>*                                                                            and             ,                                         for                                                                ,                                                       and                                                                                          .                                                                                                          .                                                                                                              : www.gamblersanonymous.net.uk.</p>  <p>* Gambling Therapy                                             and                          for       ,                           from                        .                                                                                        at                              and                    .                                                                                              : www.gamblingtherapy.net</p>  <h2>                                                 </h2>  <p>                            and          at casino Global                                         for       ,                         18                                . Casino Global                                                    at                                                        .                                                                                  ,                                                                          ,                         18        and                                                                                                                    ,                                                                                                   .                     ,                                  ,                       -or at                       18                           at                                      ,                                                          .</p>  <h2>                                   </h2>  <p>                                                                                                 at                 ,                                                        .                                                                    ,                                                       from                                                                  .                                                                                                 or                 ,                                                     check in and                                        , or       -or                                                                                                                 ,                     ,                                                                                      and                                            :</p>  <p>Net Nanny    www.netnanny.com</p>  <p>CyberPatrol www.cyberpatrol.com</p>');
INSERT INTO `pages` VALUES (52, 'es', 'Casino Global     play the best slot machines for free', '', 'global casino, casino global, slot machines, slot machines is free, free slot machines, play slot machines, slot machines play is free registration, roulette, roulette online, gambling games, gambling games online, card games, novomatic, gaminator , igrosoft, bonus casino', 'Casino Global     the best online slots Amatic, Deluxe, Igrosoft, BetSoft, Sheriff Gaming, NetEnt, Microgaming, Mega Jack and Pleytech! We can play is free and on money. Best gaming service     for you!', 'index', 'index', 0, 0, 1, '');
INSERT INTO `pages` VALUES (53, 'es', 'Profile', '', '', '', 'profile', 'profile', 2, 0, 1, '');
INSERT INTO `pages` VALUES (54, 'es', 'Refill', '', '', '', 'enter', 'enter', 2, 0, 1, '');
INSERT INTO `pages` VALUES (55, 'es', 'Get winnings', '', '', '', 'out', 'out', 2, 0, 1, '');
INSERT INTO `pages` VALUES (56, 'es', 'Statistics', '', '', '', 'history', 'history', 2, 0, 1, '');
INSERT INTO `pages` VALUES (57, 'es', 'Referrals', '', '', '', 'partner', 'partner', 2, 0, 1, '');
INSERT INTO `pages` VALUES (58, 'es', 'Login', '', '', '', 'login', 'login', 3, 0, 1, '');
INSERT INTO `pages` VALUES (59, 'es', 'check in', '', '', '', 'registration', 'registration', 3, 0, 1, '');
INSERT INTO `pages` VALUES (60, 'es', 'password reminder', '', '', '', 'reminder', 'reminder', 3, 0, 1, '');
INSERT INTO `pages` VALUES (61, 'es', 'Contacts', '', '', '', 'contacts', 'contacts', 3, 0, 1, '');
INSERT INTO `pages` VALUES (62, 'es', 'Points', '', '', '', 'exchange', 'exchange', 3, 0, 1, '');
INSERT INTO `pages` VALUES (63, 'es', 'Tournaments', '', 'global casino, casino global, slot machines, slot machines is free, free slot machines, play slot machines, slot machines play is free registration, roulette, roulette online, gambling games, gambling games online, card games, novomatic, gaminator , igrosoft, bonus casino', '', 'tournament', 'tournament', 3, 0, 1, '');
INSERT INTO `pages` VALUES (64, 'es', 'VIP club', '', 'global casino, casino global, slot machines, slot machines is free, free slot machines, play slot machines, slot machines play is free registration, roulette, roulette online, gambling games, gambling games online, card games, novomatic, gaminator , igrosoft, bonus casino', '', 'vip', 'vip', 0, 0, 1, 'Become part VIP-club from casino Global.                          from                                          at            VIP-                                   .                                         and                                                                       .                    VIP-         and                                                          !                                                                                                               .                                                                 .');
INSERT INTO `pages` VALUES (65, 'es', '                ', '', 'global casino, casino global, slot machines, slot machines is free, free slot machines, play slot machines, slot machines play is free registration, roulette, roulette online, gambling games, gambling games online, card games, novomatic, gaminator , igrosoft, bonus casino', '', 'antifraud', 'antifraud', 0, 0, 1, '<p>Invicta Antifraud Tool is a powerful antifraud tool developed in order to prevent fraudulent transactions in online gambling sphere which permits us to dramatically downgrade the number of credit card fraud in our gambling establishments. In cooperation with the leading internet payment service providers we do our best to transact business securely online and to guarantee that our end users    details remain secure throughout the whole credit or debit card transaction process.</p>  <p>Our system benefits from dozens of years of positive database management experience in credit card transaction technology which makes Invicta Antifraud Tool truly powerful and handy remedy against credit card fraud.</p>  <h2>KEY FEATURES:</h2>  <ul> <li>All-around multistage customer verification (IP Location, device fingerprinting, proxy check);</li> <li>Customer phone number verification;</li> <li>Customer gambling manner analysis;</li> <li>Fraud management system with more than 100 filters designed for customer in-depth verification to check payment details, payment history and customer black lists;</li> <li>Customer final verification by our risk department at the money withdrawal stage.</li> </ul>');
INSERT INTO `pages` VALUES (66, 'es', 'rules and conditions', '', 'global casino, casino global, slot machines, slot machines is free, free slot machines, play slot machines, slot machines play is free registration, roulette, roulette online, gambling games, gambling games online, card games, novomatic, gaminator , igrosoft, bonus casino', '', 'termsandconditions', 'termsandconditions', 0, 0, 1, '<p>                                                                   ,                                                                                  club (          ) and                                online-casino Global (at                                      ).            registration                                                                                                               and                   .                                                                                            at                                 ,                                                   ,                                                              ,                                     .</p>  <p>                                                                                                                                                                                          . Casino Global                                                              ,                                                                                .</p>  <h2>check in at            Global</h2>  <p>                                                                                                 ,                                      18-           .                                                             ,                                                                                                          ,                                                                                       .                                                              ,        play at             ,        and                                   at                 ,             ,                  and                                       club.                    , check in                   :</p>  <ul> <li>                     club Global;</li> <li>                                                            ;</li> <li>                                                                    ;</li> <li>                                                              .</li> </ul>  <p>                                                                                                                                                            club                     .</p>  <p>                                            ,        at                     gambling                        at                                      .                                                                                       ,                                 ,                                                                                                  .                                                                                                                                          registration                .</p>  <p>           registration at                                                                                                        , Where                                                          :</p>  <ul> <li>              ,       ;</li> <li>                         ;</li> <li>                                  ;</li> <li>                                            .</li> </ul>  <p>                                                                                                                                                                                                                                     , casino                                                                                                   and                                                                                                  ,                                   .</p>  <p>                                                                                                   and                                                                                                  .                           ,                                                                                                                            .                                                                                          ,                                                                                     ,              and                                                   ,                                                                                                               .</p>  <h2>             -            ,                and                    online-casino Global</h2>  <p>                    at                              -                    ,                                                         ,                                                                                                                                                          ,                                                                                                  .                                                                                                                    at                                .                                  ,                                                                                                                                                                                                                                                                         .</p>  <p>                                                                                                                  online-casino.                                                           ,                                                                              .               ,                                                                    ,                                                             conditions           .                                                                                                                                                                         at                        -          .                                                                             ,                                                                   and                           .</p>  <h2>                                      ?</h2>  <p>                                                                                                              ,                        at                                    .                                      at                                                         .                                                   at                                        and                 .</p>  <h2>                 and                       </h2>  <p>                                                                                             e-mail.                      ,                                                                                            and                   ,                                and                                                  .                                                                                                                          .                                           ,                                                                     -                                           and       .                ,                                                         from                                                 ,                                                                    at                                </p>  <h2>                                                                 1-Click at casino Global</h2>  <p>                                              club                      at                           1-Click.                            ,                                                                                                                                                                       .</p>  <p>Replenishment                             at                              .                                                                                                                                                .                                ,                                                                                    ,                                    at           , and                                                                  (            ,                and     .),                                       .</p>  <p>                                                                                    (              ,              and     .)                                                            .</p>  <p>                             ,                                                                                                                                                                         ,                                         .                    ,                                                                                                                                                               .</p>  <p>                                           ,                    ,                                                                                                                                       .                                                                                                                                                  and                                       .                                                                            from           -                                                                ,                                                  ,            at                                     .</p>  <p>                                                                                                          ,                                                                              .        and                                                                            -                                                                                                      .                                                                                                      ,                                                                                       club.</p>  <h2>                                     and                  online-casino Global</h2>  <p>                                                                                                                                                          .                                                            .                          club                                     ,                                                                                                                                      .</p>  <p>                      ,                                                                                      at                                ,                                                                                                                                               .          at                                                                                              ,                                 .</p>  <p>         at                                                              casino                                -or                                                       -                                                                                                                                       ,                     club Global                                                                                            and               ,                                                                                                           .</p>  <p>                                          ,        and                                                                                                                                                            and                          .                                                                                                                  .                                                                                                     or                              ,                                                            .                                                                ,                                                                                        .                                                                                                                                                                                 .</p>  <h2>                                                 for                                    :</h2>  <ul> <li>                                                                           ,        and                          ;</li> <li>                                                                                                                             ;</li> <li>                       amount output                                                               for                                 systems.                                                                                    ;</li> <li>         amount                                              100                                  ,      casino                                                                                                                        .                                                for                                                                        .</li> </ul>  <p>                                                                for                      and                                                                              .                                                                                          at                                                  club Global.</p>  <p>                                                                                                                    conditions                                 ,                           3 * amount                 .                                                                                                                      conditions,      at                       casino                                                                               at                20% from                               .</p>  <p>                                                                    at                                     24         .                     ,                                                                                              .</p>  <h2>                       at                            </h2>  <p>                                                                                                                                                    .                                                 from                                                                              .</p>  <p>1.                                        60       .             :</p>  <ul> <li>at                              30 000             ;</li> <li>at                                  90 000             ;</li> <li>at                     600 000             .</li> </ul>  <p>2.                                   from 60      300       .             :</p>  <ul> <li>at                              45 000             ;</li> <li>at                                  300 000 &nbsp;            ;</li> <li>at                     900 000             .</li> </ul>  <p>3.                           and                                                                                               .</p>');
INSERT INTO `pages` VALUES (67, 'es', '                                 ', '', 'global casino, casino global, slot machines, slot machines is free, free slot machines, play slot machines, slot machines play is free registration, roulette, roulette online, gambling games, gambling games online, card games, novomatic, gaminator , igrosoft, bonus casino', '', 'privacypolicy', 'privacypolicy', 0, 0, 1, '<p>                                                                   at                                                                                      ,                                                                                       .</p>  <p>               ,                                                                                                                   and               .                                                                                                                       for       .</p>  <p>                                                     ,                   ,                                                                                                                                  .</p>  <p>               ,                            , e-mail           ,                                ,                          ,      , IP            and                                                                       and                                  and                                       ,                and                                                         .</p>  <p>Joycasino                                      -                         .                    ,                                                                                                                    ,                                                                                                              at casino and                                                   .                                                                                          and                         3            at           .</p>  <p>                                                                                from                  - at                                                                                     online                    or                      at                      ,                                                                                      .</p>  <p>                                                      and                                                                                                                          and                  at                                        . Joycasino                                                                                               ,                                                                                                                                                 from                                        .</p>  <p>                at online slots,                                               NetEnt,                  at                                                                                 NetEnt,                                                                                     www.netent.com/en/netent-privacy-policy-eu/ </p>  <p>                                                                                                         ,                     ,                      at              online                    or                                                   <a href=\"mailto:%contact_mail%\">%contact_mail%</a>.                                             .</p>');
INSERT INTO `pages` VALUES (68, 'es', '                                   ', '', 'global casino, casino global, slot machines, slot machines is free, free slot machines, play slot machines, slot machines play is free registration, roulette, roulette online, gambling games, gambling games online, card games, novomatic, gaminator , igrosoft, bonus casino', '', 'responsiblegaming', 'responsiblegaming', 0, 0, 1, '<p>Casino Global                                                                                                                               .                                                                                                                    ,                                ,                     ,                                                                             ,                                                                                                                               and                                ,                                                                   .</p>  <h2>                                     </h2>  <p>                 games                                                                                                         ,                                 for                                .                                                                                                                ,                        and                                               ,                                            , for                                                                        .                ,                                                                                                                      ,                          ,                                                                                           :</p>  <ul> <li>                 games                                            and                                                                        ,                                                                  </li> <li>                                                                                                                       at                    </li> <li>                                    ,                                                         </li> <li>                                     and                                                      ,                                   </li> <li>                                   at                  from                        ,                               at              online                    and                                             </li> </ul>  <p>                                    -                                                          ,                                              at                                 ,                     ,                                                                                            .</p>  <h2>                                        ?</h2>  <p>                                           ,        gambling games                                                                                            or                          ,                                                                                          .</p>  <ul> <li>                               gambling games from                                 or           ?</li> <li>                        ,                                                     or                            ?</li> <li>                         at                        at                                                                    ?</li> <li>                                       -or           -or                                                                 ?</li> <li>                                                  ,                or                -                            ?</li> <li>               -                       ,                                               or                                                                                                  ?</li> <li>               ,            or                  at                                             ?</li> <li>                                     \"                           \"            -                   ?</li> <li>                        ,                                                              ?</li> <li>                                                                                                                                                                                          ?</li> <li>                                                                    and                 ,                                                                              at gambling games?</li> <li>                          -or                   ,                          or                                                                   play?</li> <li>                             gambling games                       and                                         ?</li> </ul>  <p>                                    ,                                           \"    \",                                                    ,                                                                                        .                                          -    ,                                              and                                  ,                     ,                                                             ,                            .</p>  <h2>                            </h2>  <p>                                                        from                        ,                                                                           ,                        at                                 .                                               ,                                                                                              at                                      3               , and                                                                                                                                         .                                                                                                                                                 7         .</p>  <p>                                                                                      ,                     ,                                                                                                 , at                                              and                   ,                                                                      and       .                                                                                                                                          ,                                                                                                                    at                   .     .                                   at                                                  .</p>  <h2>                                                                             at                                   </h2>  <p>* GamCare,                                                                                                                       ,              and                                       at                                                                                    at                             ,                                              : www.gamcare.net.uk.                                                         : 0845 6000 133.</p>  <p>*                                                                            and             ,                                         for                                                                ,                                                       and                                                                                          .                                                                                                          .                                                                                                              : www.gamblersanonymous.net.uk.</p>  <p>* Gambling Therapy                                             and                          for       ,                           from                        .                                                                                        at                              and                    .                                                                                              : www.gamblingtherapy.net</p>  <h2>                                                 </h2>  <p>                            and          at casino Global                                         for       ,                         18                                . Casino Global                                                    at                                                        .                                                                                  ,                                                                          ,                         18        and                                                                                                                    ,                                                                                                   .                     ,                                  ,                       -or at                       18                           at                                      ,                                                          .</p>  <h2>                                   </h2>  <p>                                                                                                 at                 ,                                                        .                                                                    ,                                                       from                                                                  .                                                                                                 or                 ,                                                     check in and                                        , or       -or                                                                                                                 ,                     ,                                                                                      and                                            :</p>  <p>Net Nanny    www.netnanny.com</p>  <p>CyberPatrol www.cyberpatrol.com</p>');

-- ----------------------------
-- Table structure for partners
-- ----------------------------
DROP TABLE IF EXISTS `partners`;
CREATE TABLE `partners`  (
  `user_id` int(5) NOT NULL DEFAULT 0,
  `sum1` decimal(12, 2) NOT NULL DEFAULT 0.00,
  `sum2` decimal(12, 2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of partners
-- ----------------------------

-- ----------------------------
-- Table structure for partners_pay
-- ----------------------------
DROP TABLE IF EXISTS `partners_pay`;
CREATE TABLE `partners_pay`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_time` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `ref_id` int(5) NOT NULL,
  `suma` decimal(12, 2) NOT NULL,
  `status` int(1) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`, `ref_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of partners_pay
-- ----------------------------

-- ----------------------------
-- Table structure for payments
-- ----------------------------
DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `paytime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `suma` decimal(16, 2) NOT NULL,
  `pay_system` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'adm',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of payments
-- ----------------------------

-- ----------------------------
-- Table structure for players
-- ----------------------------
DROP TABLE IF EXISTS `players`;
CREATE TABLE `players`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `userCode` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gameCode` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `agentCode` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `txnID` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `connected` tinyint(4) NOT NULL DEFAULT 0,
  `gameMode` tinyint(4) NULL DEFAULT 0 COMMENT '0:                         , 1:                ',
  `patRequested` int(11) NOT NULL DEFAULT 0,
  `curIndex` bigint(20) NOT NULL DEFAULT 0,
  `lastJackpotIndex` bigint(20) NOT NULL DEFAULT 0,
  `nextJackpot` int(11) NOT NULL DEFAULT 100,
  `totalDebit` double(50, 2) NOT NULL DEFAULT 0.00,
  `totalCredit` double(50, 2) NOT NULL DEFAULT 0.00,
  `realRtp` double(10, 2) NOT NULL DEFAULT 0.00,
  `callHistId` int(11) NOT NULL DEFAULT -1,
  `settings` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `totalBet` double(20, 2) NOT NULL DEFAULT 0.00 COMMENT '         bet per line   ',
  `virtualBet` double(20, 2) NOT NULL DEFAULT 0.00 COMMENT '//                                          (               )',
  `callStatus` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `jackpotCome` int(11) NULL DEFAULT 100,
  `baseWinCome` int(11) NULL DEFAULT 7,
  `highBaseCome` int(11) NULL DEFAULT 5,
  `jackpotLimit` int(11) NULL DEFAULT 50,
  `highBaseLimit` int(11) NULL DEFAULT 15,
  `machine` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `lastPattern` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `betPerLine` double(10, 2) NOT NULL DEFAULT 0.00,
  `viewStack` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `fsStack` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `viewHistory` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `replayLogList` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `callPattern` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `purchaseCallPattern` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `index`(`token`) USING BTREE,
  INDEX `token`(`token`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of players
-- ----------------------------

-- ----------------------------
-- Table structure for promos
-- ----------------------------
DROP TABLE IF EXISTS `promos`;
CREATE TABLE `promos`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `host` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `token` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `active` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `raceDetails` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `tournamentScores` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `racePrizes` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `raceWinners` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `tournamentDetails` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `tournamentV2Leaderboard` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `tournamentPlayerChoiceOPTIN` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of promos
-- ----------------------------

-- ----------------------------
-- Table structure for replays
-- ----------------------------
DROP TABLE IF EXISTS `replays`;
CREATE TABLE `replays`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `agentCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `userCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `gameCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `roundID` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `bet` double(20, 2) NULL DEFAULT NULL,
  `win` double(20, 0) NULL DEFAULT NULL,
  `rtp` double(10, 2) NULL DEFAULT NULL,
  `playedDate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0',
  `lang` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'en',
  `currency` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'USD',
  `data` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `sharedLink` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `agentCode`(`agentCode`) USING BTREE,
  INDEX `userCode`(`userCode`) USING BTREE,
  INDEX `gameCode`(`gameCode`) USING BTREE,
  INDEX `roundID`(`roundID`) USING BTREE,
  INDEX `sharedLink`(`sharedLink`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of replays
-- ----------------------------

-- ----------------------------
-- Table structure for report_menu
-- ----------------------------
DROP TABLE IF EXISTS `report_menu`;
CREATE TABLE `report_menu`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `dostup` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of report_menu
-- ----------------------------
INSERT INTO `report_menu` VALUES (1, 'Total information', '1');
INSERT INTO `report_menu` VALUES (2, 'Payments', '1|4');
INSERT INTO `report_menu` VALUES (5, 'Active players', '1');
INSERT INTO `report_menu` VALUES (6, 'Player History', '1|4');
INSERT INTO `report_menu` VALUES (7, 'Logging Games', '1|4');
INSERT INTO `report_menu` VALUES (11, 'Settings log', '1');

-- ----------------------------
-- Table structure for return
-- ----------------------------
DROP TABLE IF EXISTS `return`;
CREATE TABLE `return`  (
  `id` int(1) NOT NULL AUTO_INCREMENT,
  `room_id` int(1) NOT NULL,
  `range_min` int(11) NOT NULL,
  `range_max` int(11) NOT NULL,
  `percent` decimal(5, 2) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of return
-- ----------------------------
INSERT INTO `return` VALUES (1, 1, 0, 499, 5.00);
INSERT INTO `return` VALUES (2, 1, 500, 9999, 10.00);
INSERT INTO `return` VALUES (3, 1, 10000, 1000000, 15.00);

-- ----------------------------
-- Table structure for room_banks
-- ----------------------------
DROP TABLE IF EXISTS `room_banks`;
CREATE TABLE `room_banks`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) NOT NULL,
  `from_bet` decimal(14, 2) NOT NULL,
  `to_bet` decimal(14, 2) NOT NULL,
  `spin_bank` decimal(14, 4) NOT NULL,
  `bonus_bank` decimal(14, 4) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `room_id`(`room_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of room_banks
-- ----------------------------
INSERT INTO `room_banks` VALUES (1, 1, 0.00, 0.10, 200.0000, 200.0000);
INSERT INTO `room_banks` VALUES (2, 1, 0.10, 0.30, 200.0000, 200.0000);
INSERT INTO `room_banks` VALUES (3, 1, 0.30, 0.50, 200.0000, 200.0000);
INSERT INTO `room_banks` VALUES (4, 1, 0.50, 1.00, 200.0000, 200.0000);
INSERT INTO `room_banks` VALUES (5, 1, 1.00, 3.00, 200.0000, 200.0000);
INSERT INTO `room_banks` VALUES (6, 1, 3.00, 5.00, 200.0000, 200.0000);
INSERT INTO `room_banks` VALUES (7, 1, 5.00, 10.00, 211.2000, 207.5000);
INSERT INTO `room_banks` VALUES (8, 1, 10.00, 20.00, 122.9000, 317.5000);
INSERT INTO `room_banks` VALUES (9, 1, 20.00, 50.00, 174.0000, 225.0000);
INSERT INTO `room_banks` VALUES (10, 1, 50.00, 100.00, 200.0000, 200.0000);
INSERT INTO `room_banks` VALUES (11, 1, 100.00, 1000.00, 200.0000, 200.0000);
INSERT INTO `room_banks` VALUES (12, 1, -1.00, -1.00, 0.0000, 0.0000);
INSERT INTO `room_banks` VALUES (13, 1, -2.00, -2.00, 0.0000, 0.0000);
INSERT INTO `room_banks` VALUES (14, 1, -3.00, -3.00, 0.0000, 0.0000);

-- ----------------------------
-- Table structure for rooms
-- ----------------------------
DROP TABLE IF EXISTS `rooms`;
CREATE TABLE `rooms`  (
  `id` int(1) NOT NULL AUTO_INCREMENT,
  `name` char(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ip` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `balance` decimal(20, 2) NOT NULL DEFAULT 0.00,
  `pay_in` decimal(15, 2) NOT NULL DEFAULT 0.00,
  `pay_out` decimal(15, 2) NOT NULL DEFAULT 0.00,
  `income` decimal(15, 5) NOT NULL DEFAULT 0.00000,
  `creator` int(11) NOT NULL DEFAULT 1,
  `status` int(11) NOT NULL DEFAULT 1,
  `is_selfIP` int(1) NOT NULL DEFAULT 0,
  `deny_multilogin` int(1) NOT NULL DEFAULT 0,
  `is_return` int(1) NOT NULL DEFAULT 0,
  `is_jack_realsum` int(1) NOT NULL DEFAULT 1,
  `is_return_room` int(1) NOT NULL DEFAULT 0,
  `return_perc` decimal(5, 2) NULL DEFAULT NULL,
  `return_balance` decimal(7, 2) NULL DEFAULT NULL,
  `return_winsum` decimal(7, 2) NULL DEFAULT NULL,
  `return_login` char(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `point_on` int(1) NOT NULL DEFAULT 0,
  `point_endtime` datetime NULL DEFAULT NULL,
  `point_k_betcount` decimal(5, 4) NOT NULL DEFAULT 0.0100,
  `point_k_betsum` decimal(5, 4) NOT NULL DEFAULT 0.0010,
  `point_k_paysum` decimal(5, 4) NOT NULL DEFAULT 0.0001,
  `point_paypoint` int(6) NOT NULL DEFAULT 100000,
  `point_paysum` int(6) NOT NULL DEFAULT 10000,
  `point_downpercent` int(3) NOT NULL DEFAULT 100,
  `point_winers_count` int(2) NOT NULL DEFAULT 3,
  `point_win_next_perc` int(3) NOT NULL DEFAULT 50,
  `checksum` decimal(15, 5) NOT NULL DEFAULT 0.00000,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `creator`(`creator`) USING BTREE,
  INDEX `status`(`status`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of rooms
-- ----------------------------
INSERT INTO `rooms` VALUES (1, 'GLOBAL', '', 100000000000000000.00, 0.00, 0.00, 120.00000, 1, 1, 0, 0, 1, 1, 0, 0.00, 0.00, 0.00, '', 0, NULL, 0.0100, 0.0010, 0.0001, 100000, 10000, 100, 3, 50, 0.00000);

-- ----------------------------
-- Table structure for sessionkeys
-- ----------------------------
DROP TABLE IF EXISTS `sessionkeys`;
CREATE TABLE `sessionkeys`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userAgent` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sessionKey` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sessionkeys
-- ----------------------------

-- ----------------------------
-- Table structure for settings
-- ----------------------------
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) NOT NULL DEFAULT 1,
  `is_global` int(1) NOT NULL DEFAULT 0,
  `sett_group` int(11) NOT NULL DEFAULT 0,
  `sett_subgroup` int(2) NOT NULL DEFAULT 0,
  `position` int(11) NOT NULL DEFAULT 0 COMMENT '               at                       ',
  `key_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `val` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `opis` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'text',
  `checker` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `key`(`key_name`, `room_id`) USING BTREE,
  INDEX `sett_group`(`sett_group`) USING BTREE,
  INDEX `sett_subgroup`(`sett_subgroup`) USING BTREE,
  INDEX `key_name`(`key_name`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 112 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of settings
-- ----------------------------
INSERT INTO `settings` VALUES (1, 1, 0, 1, 0, 1, 'cas_name', '  GLOBAL   Casino Management System', '', 'Name systems', 'text', NULL);
INSERT INTO `settings` VALUES (2, 1, 0, 1, 0, 2, 'url', 'localhost', NULL, 'URL or IP systems', 'text', NULL);
INSERT INTO `settings` VALUES (3, 1, 0, 1, 0, 2, 'amatic_port', '9216', NULL, 'Port for games amatic', 'text', NULL);
INSERT INTO `settings` VALUES (4, 1, 0, 1, 0, 2, 'egt_port', '9666', NULL, 'Port for games egt', 'text', NULL);
INSERT INTO `settings` VALUES (5, 1, 0, 1, 0, 2, 'endorphine_port', '9681', NULL, 'Port for games endorphina', 'text', NULL);
INSERT INTO `settings` VALUES (6, 1, 0, 1, 0, 3, 'balance_preset', '10|20|50|100', NULL, 'Amounts for the buttons for changing the balance', 'array', NULL);
INSERT INTO `settings` VALUES (7, 1, 0, 1, 0, 3, 'num', '50', NULL, 'Number of pins per page', 'text', NULL);
INSERT INTO `settings` VALUES (8, 1, 0, 3, 0, 4, 'spin_koef', '1', NULL, '                                                                         1               ', 'text', '');
INSERT INTO `settings` VALUES (9, 1, 0, 3, 0, 5, 'win_koef', '1', NULL, '                                                                            ', 'text', NULL);
INSERT INTO `settings` VALUES (10, 1, 0, 3, 0, 6, 'payed_spins_fixed', '1', NULL, '                                          ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (11, 1, 0, 3, 0, 7, 'payed_spins_val', '1000', NULL, '                               ', 'text', NULL);
INSERT INTO `settings` VALUES (12, 1, 0, 3, 0, 9, 'spin_bank_perc', '55', NULL, '                                            SB Bank', 'text', NULL);
INSERT INTO `settings` VALUES (13, 1, 0, 3, 0, 10, 'bonus_bank_perc', '25', NULL, 'Interest in BB Bank', 'text', NULL);
INSERT INTO `settings` VALUES (14, 1, 0, 3, 100, 11, 'double_bank_perc', '0', NULL, 'Interest in DB Bank', 'text', NULL);
INSERT INTO `settings` VALUES (15, 1, 0, 1, 100, 12, 'online_timeout', '10', NULL, '                                                                                ,           ', 'text', NULL);
INSERT INTO `settings` VALUES (16, 1, 0, 1, 100, 13, 'refresh_timeout', '100', NULL, '                                                        ', 'text', '/^\\d+$/');
INSERT INTO `settings` VALUES (17, 1, 0, 100, 0, 14, 'denomination', '1', NULL, 'denomination', 'text', NULL);
INSERT INTO `settings` VALUES (18, 1, 0, 4, 0, 15, 'bets_include', 'bets.php', NULL, 'Possible bets', 'include', NULL);
INSERT INTO `settings` VALUES (19, 1, 0, 100, 0, 16, 'can_game', '5|6', NULL, '                                                                             ', 'text', NULL);
INSERT INTO `settings` VALUES (20, 1, 0, 1, 100, 17, 'debug', '0', NULL, '                                                      ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (21, 1, 0, 100, 0, 18, 'jack_nal', '0', NULL, 'Give out a jackpot in cash', 'checkbox', NULL);
INSERT INTO `settings` VALUES (22, 1, 0, 100, 0, 19, 'prize_nal', '0', NULL, '                             ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (23, 1, 0, 100, 0, 20, 'return_nal', '0', NULL, 'Issue Cash Back', 'checkbox', NULL);
INSERT INTO `settings` VALUES (24, 1, 0, 100, 0, 24, 'templ_theme', 'default', NULL, NULL, 'text', NULL);
INSERT INTO `settings` VALUES (25, 1, 0, 100, 0, 26, 'garant_win_on', '1', NULL, 'Guaranteed win included', 'checkbox', NULL);
INSERT INTO `settings` VALUES (26, 1, 0, 100, 0, 27, 'garant_win_opt', '1|50,1|10,1|10,1|10,1|5,1|5,1|5,1|5,1|5,1|5,1|20,1|2,1|2,1|2,1|2,1|2,1|3,1|3,1|3,1|3,2|5,2|5,2|5,2|5,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|2,2|3,2|20,2|4,2|4,2|4,2|4,2|4,2|4,2|4,2|50,2|10,2|10,2|10,2|10,2|10,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|5,3|4,3|3,3|2,3|2,3|2,3|2,3|3,3|3,3|3,3|3,3|3,3|3,3|2,3|2,3|2,3|2,3|2,3|4,3|10,3|10,3|10,4|4,4|4,4|50,4|20,4|20,4|2,4|3,4|4,4|2,4|3,4|4,4|4,4|4,4|4,4|2,4|5,4|5,4|5,4|5,4|5,4|5,4|5,4|3,4|3,4|2,4|4,4|10,4|10,4|10,5|20,5|20,5|4,5|2,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|3,5|4,5|4,5|4,5|4,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|5,5|10,5|10,5|10,7|50,7|20,7|20,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|5,7|2,7|3,7|2,7|2,7|2,7|2,7|2,7|2,7|3,7|3,7|3,7|3,7|3,7|3,7|10,7|10,7|10,7|10,7|10,7|10,7|20,7|20,7|20,10|2,10|3,10|2,10|3,10|100,10|50,10|20,10|20,10|10,10|10,10|10,10|10,10|10,10|10,10|5,10|5,10|5,10|5,10|5,10|5,10|4,10|4,10|4,10|4,10|4,10|3,10|3,10|3,10|3,10|3,10|3,10|4,10|4,10|4,5|4,5|4,5|4,5|4,5|4,5|3,5|3,5|3,5|3,5|3,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,4|4,3|20,3|50,3|2,3|2,3|2,5|2,5|2,5|50,5|100,5|100,5|3,5|3,5|3,5|3,5|3,2|4,2|4,2|4,2|4,2|4', NULL, '                                          ,        1|5', 'text', NULL);
INSERT INTO `settings` VALUES (27, 1, 0, 100, 0, 28, 'garant_bon_opt', '100|50,250|100,350|100,500|500,500|50,100|500,250|100,350|150,500|100,550|100', NULL, '                                            ,        1|50', 'text', NULL);
INSERT INTO `settings` VALUES (28, 1, 0, 100, 0, 31, 'kassir_outpay_after_collect', '1', NULL, '                                                                                                                 ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (29, 1, 0, 4, 0, 8, 'float_bet', '1', NULL, '                      0 or 0.00', 'checkbox', NULL);
INSERT INTO `settings` VALUES (30, 1, 0, 4, 0, 32, 'game_use_logo', '1', NULL, 'Use                                        games', 'checkbox', NULL);
INSERT INTO `settings` VALUES (31, 1, 0, 4, 0, 33, 'game_use_bg', '1', NULL, 'Use                                games', 'checkbox', NULL);
INSERT INTO `settings` VALUES (32, 1, 0, 4, 100, 34, 'game_bg_color', '000000', NULL, '                                          games', 'text', '/[0-9a-f]{6}/i');
INSERT INTO `settings` VALUES (33, 1, 0, 4, 100, 35, 'game_use_jacks', '1', NULL, '                                     ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (34, 1, 0, 4, 100, 36, 'game_use_exit1', '1', NULL, '                                  select game', 'checkbox', NULL);
INSERT INTO `settings` VALUES (35, 1, 0, 4, 100, 37, 'game_use_exit2', '1', NULL, '                                            ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (36, 1, 0, 4, 100, 38, 'game_use_collect', '1', NULL, '                                  collect', 'checkbox', NULL);
INSERT INTO `settings` VALUES (37, 1, 0, 4, 100, 39, 'game_use_denom', '0', NULL, '                                           ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (38, 1, 0, 4, 100, 40, 'game_use_update', '0', NULL, '                                                               ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (39, 1, 0, 4, 100, 41, 'game_denom_mode', '0', NULL, '                             ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (40, 1, 0, 4, 100, 42, 'game_win_mode', '1', NULL, '       display                 ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (41, 1, 0, 4, 100, 43, 'game_use_faststop', '0', NULL, 'Use                        ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (42, 1, 0, 4, 100, 44, 'game_stretch_mode', '1', NULL, '                 games', 'checkbox', NULL);
INSERT INTO `settings` VALUES (43, 1, 0, 4, 100, 45, 'game_use_stretch', '0', NULL, '                                                                      games', 'checkbox', NULL);
INSERT INTO `settings` VALUES (44, 1, 0, 4, 0, 46, 'game_use_fullscreen', '1', NULL, '                                                      ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (45, 1, 0, 4, 0, 47, 'game_use_sound', '1', NULL, '                                          ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (46, 1, 0, 4, 100, 48, 'game_hide_buttons', '0', NULL, '                                        ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (47, 1, 0, 4, 100, 49, 'game_use_bonus_stop', '1', NULL, '                                                                                ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (48, 1, 0, 4, 100, 50, 'game_use_win_stop', '0', NULL, '                                                                                    ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (49, 1, 0, 4, 100, 51, 'game_use_jack_stop', '1', NULL, '                                                                                    ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (50, 1, 0, 4, 100, 52, 'game_use_return_stop', '1', NULL, '                                                                                    ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (51, 1, 0, 4, 100, 53, 'game_use_prize_stop', '1', NULL, '                                                                  at                   ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (52, 1, 0, 4, 100, 54, 'view_keys', '0', NULL, '                               ,              or             ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (53, 1, 0, 4, 100, 55, 'view_keys2', '0', NULL, '                             ,              or             ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (54, 1, 0, -1, 0, 0, 'pin_use', '1', NULL, 'Use       -        ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (55, 1, 0, 2, 15, 65, 'trioApi_use', '1', NULL, 'Use Pay-Trio', 'checkbox', NULL);
INSERT INTO `settings` VALUES (56, 1, 0, 2, 15, 66, 'trioApi_shop_id', '302859', NULL, 'Shop_id', 'text', NULL);
INSERT INTO `settings` VALUES (57, 1, 0, 2, 15, 66, 'trioApi_key', 'YNfGKWgNyBKRll0g5Q80uklGZU3DnRf1p', NULL, 'Secret', 'text', NULL);
INSERT INTO `settings` VALUES (58, 1, 0, 2, 15, 70, 'trioApi_card_rub', '1', NULL, 'Use card_rub', 'checkbox', NULL);
INSERT INTO `settings` VALUES (59, 1, 0, 2, 15, 70, 'trioApi_qiwi_rub', '1', NULL, 'Use qiwi_rub', 'checkbox', NULL);
INSERT INTO `settings` VALUES (60, 1, 0, 2, 15, 70, 'trioApi_yamoney_rub', '1', NULL, 'Use yamoney_rub', 'checkbox', NULL);
INSERT INTO `settings` VALUES (61, 1, 0, 2, 15, 70, 'trioApi_okpay_rub', '1', NULL, 'Use okpay_rub', 'checkbox', NULL);
INSERT INTO `settings` VALUES (62, 1, 0, 2, 15, 70, 'trioApi_perfectmoney_usd', '1', NULL, 'Use perfectmoney_usd', 'checkbox', NULL);
INSERT INTO `settings` VALUES (63, 1, 0, 2, 15, 70, 'trioApi_payeer_rub', '1', NULL, 'Use payeer_rub', 'checkbox', NULL);
INSERT INTO `settings` VALUES (64, 1, 0, 2, 5, 80, 'out_trioApi_card_rub', '1', NULL, '           card_rub', 'checkbox', NULL);
INSERT INTO `settings` VALUES (65, 1, 0, 2, 5, 80, 'out_trioApi_qiwi_rub', '1', NULL, '           qiwi_rub', 'checkbox', NULL);
INSERT INTO `settings` VALUES (66, 1, 0, 2, 5, 80, 'out_trioApi_yamoney_rub', '1', NULL, '           yamoney_rub', 'checkbox', NULL);
INSERT INTO `settings` VALUES (67, 1, 0, 2, 5, 80, 'out_trioApi_webmoney', '1', NULL, '           webmoney', 'checkbox', NULL);
INSERT INTO `settings` VALUES (68, 1, 0, 1, 0, 69, 'use_ulogin', '1', '', 'Use <b>ulogin.eu</b>', 'checkbox', NULL);
INSERT INTO `settings` VALUES (69, 1, 0, 4, 100, 73, 'denome_mode', '1', NULL, '                             ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (70, 1, 0, 4, 100, 74, 'exit_mode', '0', NULL, '                   ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (71, 1, 0, 4, 100, 75, 'pay_mode', '1', NULL, '                         ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (72, 1, 0, 2, 5, 80, 'outpay_tax_perc', '10', '', '                                                                      ', 'text', NULL);
INSERT INTO `settings` VALUES (73, 1, 0, 2, 5, 81, 'outpay_tax_sum', '25', '', '                                                                  ', 'text', NULL);
INSERT INTO `settings` VALUES (74, 1, 0, 8, 8, 82, 'botstat_timeout', '500', NULL, '               for                    -                    ', 'text', NULL);
INSERT INTO `settings` VALUES (75, 1, 0, 8, 8, 83, 'botstat_logins', 'mainer, ANTON47, MASTER12, maria26, somaki125, Olga39, mike24, Wher81, Falown, Appon93, Gionly, Whowerromed91, Andifulated, Prooma7, Feweake, Hateplould91, sashiko, tanya, Sofirina48, TGM6A, Andrii, serhio771, Ruslan2292, Lamiya, digitalis, SergeySe, Swence, Texed96, Ruence, Lostower, Whistamed, Aily82, Cousitony, Attims, Nounkilthe, Patern', NULL, '             for display at statistics', 'text', NULL);
INSERT INTO `settings` VALUES (76, 1, 0, 8, 8, 84, 'botstat_stav', '5,10,25,50,100,200,300,400,500,600,700,800,900,1000', NULL, 'Betting for display at statistics', 'text', NULL);
INSERT INTO `settings` VALUES (77, 1, 0, 8, 8, 85, 'botstat_win', '100,500,600,700,800,900,1000,1500,2000,2500,3000,3500,4000,4500,5000,5500,10000,11000,12000,13000,14000,15000', NULL, '               for display at statistics', 'text', NULL);
INSERT INTO `settings` VALUES (78, 1, 0, 2, 5, 86, 'minout', '200', NULL, 'The minimum amount output', 'text', NULL);
INSERT INTO `settings` VALUES (79, 1, 0, 2, 5, 87, 'maxout', '15000', NULL, '                         amount output', 'text', NULL);
INSERT INTO `settings` VALUES (80, 1, 0, 2, 15, 90, 'enter_from', '200', NULL, '                            ', 'text', NULL);
INSERT INTO `settings` VALUES (81, 1, 0, 2, 15, 91, 'enter_to', '15000', NULL, '                              ', 'text', NULL);
INSERT INTO `settings` VALUES (82, 1, 0, -1, 0, 0, 'points_pay', '1.00', NULL, 'Points      Replenishment', 'text', NULL);
INSERT INTO `settings` VALUES (83, 1, 0, 1, 0, 105, 'activate_mail', '0', NULL, '                        email', 'checkbox', NULL);
INSERT INTO `settings` VALUES (84, 1, 0, 1, 0, 107, 'reg_ip_check', '100', NULL, '                                                            IP', 'text', NULL);
INSERT INTO `settings` VALUES (85, 1, 0, 9, 0, 108, 'contact_phone', '+44 (056) 55-315138', NULL, '              ', 'text', NULL);
INSERT INTO `settings` VALUES (86, 1, 0, 9, 0, 109, 'contact_mail', 'admin@global.net', NULL, 'e-mail', 'text', NULL);
INSERT INTO `settings` VALUES (87, 1, 0, 9, 0, 110, 'contact_icq', '458352', NULL, 'icq', 'text', NULL);
INSERT INTO `settings` VALUES (88, 1, 0, 16, 0, 112, 'adm_email', 'admin@global.net', '', '                   E-MAIL:', 'text', '/[-0-9a-z_]+@[-0-9a-z_]+\\.[a-z]{2,6}/i');
INSERT INTO `settings` VALUES (89, 1, 0, 16, 0, 113, 'mail_from', 'GLOBAL <admin@global.net>', '', '             ', 'text', NULL);
INSERT INTO `settings` VALUES (90, 1, 0, 16, 0, 114, 'mail_reply', 'admin@global.net', '', '                ', 'text', NULL);
INSERT INTO `settings` VALUES (91, 1, 0, 16, 0, 115, 'mail_type', '0|PHP mail()|SMTP', NULL, '                           ', 'select', NULL);
INSERT INTO `settings` VALUES (92, 1, 0, 16, 0, 115, 'mail_text_type', '0|text|html', NULL, '                     ', 'select', NULL);
INSERT INTO `settings` VALUES (93, 1, 0, 16, 0, 116, 'mail_count', '5', NULL, 'Letters per connection', 'text', NULL);
INSERT INTO `settings` VALUES (94, 1, 0, 16, 0, 117, 'mail_period', '60', NULL, '                         ', 'text', NULL);
INSERT INTO `settings` VALUES (95, 1, 0, 16, 0, 118, 'mail_period_count', '100', NULL, '                     ', 'text', NULL);
INSERT INTO `settings` VALUES (96, 1, 0, 16, 0, 119, 'mail_smtp_host', 'mail.megawin88.eu', NULL, '         SMTP', 'text', NULL);
INSERT INTO `settings` VALUES (97, 1, 0, 16, 0, 120, 'mail_smtp_port', '25', NULL, '         SMTP', 'text', NULL);
INSERT INTO `settings` VALUES (98, 1, 0, 16, 0, 121, 'mail_smtp_auth', '1', NULL, 'SMTP                       ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (99, 1, 0, 16, 0, 122, 'mail_smtp_user', 'admin@megawin88.eu', NULL, '                                SMTP', 'text', NULL);
INSERT INTO `settings` VALUES (100, 1, 0, 16, 0, 123, 'mail_smtp_pass', 'XXXXXXXXXX', NULL, '             SMTP', 'text', NULL);
INSERT INTO `settings` VALUES (101, 1, 0, 1, 0, 124, 'default_lang', 'us', 'us or eu', '                            ', 'text', NULL);
INSERT INTO `settings` VALUES (102, 1, 0, 100, 0, 0, 'use_gamer_raiting', '1', NULL, '                             ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (103, 1, 0, 1, 0, 130, 'game_block_count', '18|10|3', NULL, '                            at                        ', 'text', NULL);
INSERT INTO `settings` VALUES (104, 1, 1, 0, 0, 0, 'g_counter_time', '1697770176', NULL, NULL, 'text', NULL);
INSERT INTO `settings` VALUES (105, 1, 1, 1, 0, 1000, 'is_block', '0', NULL, '                                   ', 'checkbox', NULL);
INSERT INTO `settings` VALUES (106, 1, 1, 1, 0, 1001, 'block_reason', '', NULL, 'Reason blocking           ', 'text', NULL);
INSERT INTO `settings` VALUES (107, 1, 0, 2, 14, 1, 'btc_use', '1', NULL, 'Use Bitcoin', 'checkbox', NULL);
INSERT INTO `settings` VALUES (108, 1, 0, 2, 14, 2, 'btc_xpub', 'CHANGE_TO_XPUB_KEY', 'You should create a new account inside your wallet exclusively for transactions facilitated by this API. When making API calls, use the xPub for this account (located in Settings -> Addresses -> Manage -> More Options -> Show xPub)', 'Your xPub (where you would like the payment to be sent)', 'text', NULL);
INSERT INTO `settings` VALUES (109, 1, 0, 2, 14, 3, 'btc_secret', 'CHANGE_TO_RANDOM_SECRET', NULL, '                 Bitcoin', 'text', NULL);
INSERT INTO `settings` VALUES (110, 1, 0, 2, 14, 4, 'btc_api_key', 'CHANGE_TO_API_KEY', NULL, 'Your blockchain.info receive payments v2 api key', 'text', NULL);
INSERT INTO `settings` VALUES (111, 1, 0, 2, 14, 5, 'btc_callback', 'http://your_domain.com/engine/dir/pay/btc/callback.php', NULL, 'The callback URL to be notified when a payment is received', 'text', NULL);

-- ----------------------------
-- Table structure for settings_group
-- ----------------------------
DROP TABLE IF EXISTS `settings_group`;
CREATE TABLE `settings_group`  (
  `gr_id` int(2) NOT NULL AUTO_INCREMENT,
  `gr_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`gr_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of settings_group
-- ----------------------------
INSERT INTO `settings_group` VALUES (1, 'General settings');
INSERT INTO `settings_group` VALUES (2, 'Payment systems');
INSERT INTO `settings_group` VALUES (3, 'percentage return');
INSERT INTO `settings_group` VALUES (4, 'Game interface');
INSERT INTO `settings_group` VALUES (5, 'Input and Output');
INSERT INTO `settings_group` VALUES (7, 'Bonus for players');
INSERT INTO `settings_group` VALUES (8, 'Bots of statistics');
INSERT INTO `settings_group` VALUES (9, 'Contacts');
INSERT INTO `settings_group` VALUES (13, 'PIN code');
INSERT INTO `settings_group` VALUES (15, 'Pay-Trio');
INSERT INTO `settings_group` VALUES (16, 'SMTP Mail');
INSERT INTO `settings_group` VALUES (17, 'Configuring SMTP');

-- ----------------------------
-- Table structure for settings_history
-- ----------------------------
DROP TABLE IF EXISTS `settings_history`;
CREATE TABLE `settings_history`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `key_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `val_new` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `val_old` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `room_id`(`room_id`, `user_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of settings_history
-- ----------------------------

-- ----------------------------
-- Table structure for stat_game
-- ----------------------------
DROP TABLE IF EXISTS `stat_game`;
CREATE TABLE `stat_game`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  `balans` decimal(16, 2) NOT NULL DEFAULT 0.00,
  `real_balance` decimal(16, 2) NOT NULL DEFAULT 0.00,
  `stav` decimal(10, 2) NOT NULL DEFAULT 0.00,
  `win` decimal(10, 2) NOT NULL DEFAULT 0.00,
  `game` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `room_id` int(11) NOT NULL DEFAULT 1,
  `denomination` decimal(4, 2) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `room_id`(`room_id`) USING BTREE,
  INDEX `game_id`(`game`) USING BTREE,
  INDEX `date_time`(`date_time`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of stat_game
-- ----------------------------

-- ----------------------------
-- Table structure for stat_game_bot
-- ----------------------------
DROP TABLE IF EXISTS `stat_game_bot`;
CREATE TABLE `stat_game_bot`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `login` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `balans` decimal(10, 2) NOT NULL DEFAULT 0.00,
  `stav` int(3) NOT NULL DEFAULT 0,
  `win` int(6) NOT NULL DEFAULT 0,
  `game` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`login`) USING BTREE,
  INDEX `date_time`(`date_time`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1106 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of stat_game_bot
-- ----------------------------
INSERT INTO `stat_game_bot` VALUES (992, '2023-10-19 11:03:29', ' Appon93', 0.00, 400, 15000, 'hotstar');
INSERT INTO `stat_game_bot` VALUES (993, '2023-10-19 11:00:16', ' Lamiya', 0.00, 100, 5500, 'hot7');
INSERT INTO `stat_game_bot` VALUES (991, '2023-10-19 11:05:09', ' Lostower', 0.00, 5, 13000, 'hot81');
INSERT INTO `stat_game_bot` VALUES (990, '2023-10-19 11:05:55', ' Andifulated', 0.00, 10, 500, 'wolfmoon');
INSERT INTO `stat_game_bot` VALUES (907, '2023-10-18 23:17:31', ' Feweake', 0.00, 700, 900, 'luckyzodiac');
INSERT INTO `stat_game_bot` VALUES (908, '2023-10-18 23:13:41', ' Ruslan2292', 0.00, 1000, 100, 'allwaysfruits');
INSERT INTO `stat_game_bot` VALUES (989, '2023-10-19 11:07:07', ' serhio771', 0.00, 10, 700, 'dragonskingdom');
INSERT INTO `stat_game_bot` VALUES (988, '2023-10-19 11:06:07', ' Wher81', 0.00, 500, 500, 'hot81');
INSERT INTO `stat_game_bot` VALUES (987, '2023-10-19 11:04:29', ' Ruslan2292', 0.00, 900, 600, 'hot7');
INSERT INTO `stat_game_bot` VALUES (986, '2023-10-19 11:01:47', ' SergeySe', 0.00, 700, 12000, 'ageoftroy');
INSERT INTO `stat_game_bot` VALUES (910, '2023-10-18 23:17:09', ' Whowerromed91', 0.00, 100, 11000, 'hotscatter');
INSERT INTO `stat_game_bot` VALUES (911, '2023-10-18 23:16:02', ' Andifulated', 0.00, 5, 3000, 'extremely');
INSERT INTO `stat_game_bot` VALUES (912, '2023-10-18 23:25:08', ' MASTER12', 0.00, 200, 1000, 'hotdiamonds');
INSERT INTO `stat_game_bot` VALUES (913, '2023-10-18 23:19:14', ' Whowerromed91', 0.00, 200, 1500, 'vs20doghouse');
INSERT INTO `stat_game_bot` VALUES (914, '2023-10-18 23:18:25', ' Feweake', 0.00, 500, 600, 'extremely');
INSERT INTO `stat_game_bot` VALUES (915, '2023-10-18 23:16:17', ' Feweake', 0.00, 700, 5000, 'greategypt');
INSERT INTO `stat_game_bot` VALUES (916, '2023-10-19 07:48:25', ' MASTER12', 0.00, 50, 5000, 'fortunas_fruits');
INSERT INTO `stat_game_bot` VALUES (917, '2023-10-19 09:06:05', ' Sofirina48', 0.00, 50, 700, 'fruitskingdom');
INSERT INTO `stat_game_bot` VALUES (918, '2023-10-19 08:11:46', ' MASTER12', 0.00, 10, 14000, 'hot7');
INSERT INTO `stat_game_bot` VALUES (919, '2023-10-19 08:59:57', ' Sofirina48', 0.00, 1000, 800, 'luckyzodiac');
INSERT INTO `stat_game_bot` VALUES (920, '2023-10-19 08:10:37', 'mainer', 0.00, 10, 900, 'wild_seven');
INSERT INTO `stat_game_bot` VALUES (921, '2023-10-19 09:00:20', ' Gionly', 0.00, 300, 15000, 'sparklingfresh');
INSERT INTO `stat_game_bot` VALUES (922, '2023-10-19 08:17:00', ' Sofirina48', 0.00, 5, 12000, 'hotscatter');
INSERT INTO `stat_game_bot` VALUES (923, '2023-10-19 09:04:13', ' Aily82', 0.00, 600, 600, 'diamondcats');
INSERT INTO `stat_game_bot` VALUES (924, '2023-10-19 07:48:19', ' serhio771', 0.00, 10, 2000, 'burningdice');
INSERT INTO `stat_game_bot` VALUES (925, '2023-10-19 07:59:21', ' Cousitony', 0.00, 50, 700, 'diamondmonkey');
INSERT INTO `stat_game_bot` VALUES (926, '2023-10-19 09:10:02', ' Appon93', 0.00, 100, 800, 'ladyjoker');
INSERT INTO `stat_game_bot` VALUES (927, '2023-10-19 09:07:29', ' Hateplould91', 0.00, 500, 3000, 'twenty_hot');
INSERT INTO `stat_game_bot` VALUES (928, '2023-10-19 09:17:29', ' Feweake', 0.00, 50, 100, 'luckycoins');
INSERT INTO `stat_game_bot` VALUES (929, '2023-10-19 09:10:09', ' Ruence', 0.00, 300, 14000, 'extremely');
INSERT INTO `stat_game_bot` VALUES (930, '2023-10-19 09:10:53', ' Swence', 0.00, 900, 1000, 'casanova');
INSERT INTO `stat_game_bot` VALUES (931, '2023-10-19 09:15:50', ' Appon93', 0.00, 25, 600, 'pachamama');
INSERT INTO `stat_game_bot` VALUES (932, '2023-10-19 09:16:41', ' Andifulated', 0.00, 800, 5500, 'pachamama');
INSERT INTO `stat_game_bot` VALUES (933, '2023-10-19 09:12:10', ' Hateplould91', 0.00, 300, 2000, 'ladyjoker');
INSERT INTO `stat_game_bot` VALUES (934, '2023-10-19 09:16:24', ' serhio771', 0.00, 10, 5500, 'zodiac');
INSERT INTO `stat_game_bot` VALUES (935, '2023-10-19 09:09:38', ' Lostower', 0.00, 100, 900, 'sparklingfresh');
INSERT INTO `stat_game_bot` VALUES (936, '2023-10-19 09:31:04', ' serhio771', 0.00, 200, 900, 'diamondmonkey');
INSERT INTO `stat_game_bot` VALUES (937, '2023-10-19 09:35:08', ' mike24', 0.00, 1000, 3500, 'bookoffortune');
INSERT INTO `stat_game_bot` VALUES (938, '2023-10-19 09:39:14', ' digitalis', 0.00, 800, 3000, 'bookoffortune');
INSERT INTO `stat_game_bot` VALUES (939, '2023-10-19 09:17:54', ' digitalis', 0.00, 50, 15000, 'luckybells');
INSERT INTO `stat_game_bot` VALUES (940, '2023-10-19 09:38:54', ' Nounkilthe', 0.00, 600, 100, 'royalunicorn');
INSERT INTO `stat_game_bot` VALUES (941, '2023-10-19 09:32:09', ' TGM6A', 0.00, 700, 1500, 'hot81');
INSERT INTO `stat_game_bot` VALUES (942, '2023-10-19 09:26:11', ' Lamiya', 0.00, 200, 500, 'redchilli');
INSERT INTO `stat_game_bot` VALUES (943, '2023-10-19 09:48:28', ' Gionly', 0.00, 600, 500, 'pachamama');
INSERT INTO `stat_game_bot` VALUES (944, '2023-10-19 09:48:20', ' Whowerromed91', 0.00, 100, 4000, 'cooldiamonds2');
INSERT INTO `stat_game_bot` VALUES (945, '2023-10-19 09:28:08', ' digitalis', 0.00, 800, 2000, 'billysgame');
INSERT INTO `stat_game_bot` VALUES (946, '2023-10-19 09:54:43', ' Aily82', 0.00, 5, 13000, 'hot7');
INSERT INTO `stat_game_bot` VALUES (947, '2023-10-19 09:54:13', ' TGM6A', 0.00, 200, 600, 'tweetybirds');
INSERT INTO `stat_game_bot` VALUES (948, '2023-10-19 09:57:51', ' somaki125', 0.00, 900, 1000, 'partytime');
INSERT INTO `stat_game_bot` VALUES (949, '2023-10-19 09:54:43', ' Sofirina48', 0.00, 400, 3500, 'dragonspearl');
INSERT INTO `stat_game_bot` VALUES (950, '2023-10-19 09:53:11', ' Lamiya', 0.00, 100, 4500, 'dynamite7');
INSERT INTO `stat_game_bot` VALUES (951, '2023-10-19 10:00:24', ' mike24', 0.00, 300, 4000, 'grandtiger');
INSERT INTO `stat_game_bot` VALUES (952, '2023-10-19 09:57:13', ' Patern', 0.00, 400, 2500, 'aztecsecret');
INSERT INTO `stat_game_bot` VALUES (953, '2023-10-19 09:56:18', ' Sofirina48', 0.00, 200, 14000, 'casanova');
INSERT INTO `stat_game_bot` VALUES (954, '2023-10-19 09:50:40', ' TGM6A', 0.00, 600, 13000, 'diamondcats');
INSERT INTO `stat_game_bot` VALUES (955, '2023-10-19 09:51:20', ' Texed96', 0.00, 700, 3500, 'grandtiger');
INSERT INTO `stat_game_bot` VALUES (956, '2023-10-19 10:01:57', ' Feweake', 0.00, 25, 4500, 'hotscatter');
INSERT INTO `stat_game_bot` VALUES (957, '2023-10-19 10:23:00', ' somaki125', 0.00, 25, 100, 'magicidol');
INSERT INTO `stat_game_bot` VALUES (958, '2023-10-19 10:06:45', ' Andifulated', 0.00, 200, 3000, 'redchilli');
INSERT INTO `stat_game_bot` VALUES (959, '2023-10-19 10:00:59', ' Aily82', 0.00, 600, 14000, 'redchilli');
INSERT INTO `stat_game_bot` VALUES (960, '2023-10-19 10:38:31', ' Swence', 0.00, 300, 15000, 'magicscatter');
INSERT INTO `stat_game_bot` VALUES (961, '2023-10-19 10:35:49', ' Cousitony', 0.00, 25, 4000, 'magicscatter');
INSERT INTO `stat_game_bot` VALUES (962, '2023-10-19 10:18:34', ' Cousitony', 0.00, 900, 4500, 'aztecsecret');
INSERT INTO `stat_game_bot` VALUES (963, '2023-10-19 10:17:59', ' Ruence', 0.00, 1000, 4500, 'gemstar');
INSERT INTO `stat_game_bot` VALUES (964, '2023-10-19 10:07:24', ' Andifulated', 0.00, 800, 500, 'diamondmonkey');
INSERT INTO `stat_game_bot` VALUES (965, '2023-10-19 10:25:28', ' MASTER12', 0.00, 25, 3500, 'bluedolphin');
INSERT INTO `stat_game_bot` VALUES (966, '2023-10-19 10:41:15', ' Texed96', 0.00, 600, 600, 'eyeofra');
INSERT INTO `stat_game_bot` VALUES (967, '2023-10-19 10:44:23', ' mike24', 0.00, 200, 11000, 'legion');
INSERT INTO `stat_game_bot` VALUES (968, '2023-10-19 10:44:10', ' Wher81', 0.00, 400, 12000, 'hotneon');
INSERT INTO `stat_game_bot` VALUES (969, '2023-10-19 10:43:54', ' SergeySe', 0.00, 800, 13000, 'magicscatter');
INSERT INTO `stat_game_bot` VALUES (970, '2023-10-19 10:44:18', ' Whistamed', 0.00, 900, 3000, 'vswaysdogs');
INSERT INTO `stat_game_bot` VALUES (971, '2023-10-19 10:47:44', ' Appon93', 0.00, 600, 1000, 'hotstar');
INSERT INTO `stat_game_bot` VALUES (972, '2023-10-19 10:39:01', ' Andifulated', 0.00, 500, 1000, 'hot7');
INSERT INTO `stat_game_bot` VALUES (973, '2023-10-19 10:42:19', ' Falown', 0.00, 500, 3500, 'greatempire');
INSERT INTO `stat_game_bot` VALUES (974, '2023-10-19 10:41:27', ' Cousitony', 0.00, 600, 800, 'billysgame');
INSERT INTO `stat_game_bot` VALUES (975, '2023-10-19 10:43:13', ' Ruence', 0.00, 25, 3000, 'twenty_hot');
INSERT INTO `stat_game_bot` VALUES (976, '2023-10-19 10:59:05', ' Ruence', 0.00, 1000, 3500, 'hotneon');
INSERT INTO `stat_game_bot` VALUES (977, '2023-10-19 10:56:49', ' sashiko', 0.00, 600, 700, 'extremely');
INSERT INTO `stat_game_bot` VALUES (978, '2023-10-19 10:50:38', ' sashiko', 0.00, 100, 5000, 'billysgame');
INSERT INTO `stat_game_bot` VALUES (979, '2023-10-19 10:49:58', ' Andrii', 0.00, 10, 800, 'bookoffortune');
INSERT INTO `stat_game_bot` VALUES (980, '2023-10-19 10:52:52', ' Nounkilthe', 0.00, 10, 4000, 'grandtiger');
INSERT INTO `stat_game_bot` VALUES (981, '2023-10-19 10:55:06', ' Attims', 0.00, 600, 1500, 'gameofluck');
INSERT INTO `stat_game_bot` VALUES (982, '2023-10-19 10:51:47', ' Andrii', 0.00, 200, 500, 'hotdiamonds');
INSERT INTO `stat_game_bot` VALUES (983, '2023-10-19 10:59:22', ' Sofirina48', 0.00, 10, 800, 'casanova');
INSERT INTO `stat_game_bot` VALUES (984, '2023-10-19 10:52:09', 'mainer', 0.00, 600, 12000, 'wild_seven');
INSERT INTO `stat_game_bot` VALUES (985, '2023-10-19 10:56:14', ' Aily82', 0.00, 200, 5500, 'magicowl');
INSERT INTO `stat_game_bot` VALUES (909, '2023-10-18 23:27:43', ' Hateplould91', 0.00, 10, 14000, '4ofking');
INSERT INTO `stat_game_bot` VALUES (889, '2023-10-18 22:47:24', ' Falown', 0.00, 400, 800, 'bellsonfirehot');
INSERT INTO `stat_game_bot` VALUES (890, '2023-10-18 22:52:19', ' sashiko', 0.00, 900, 2000, 'hot81');
INSERT INTO `stat_game_bot` VALUES (891, '2023-10-18 22:53:41', ' Nounkilthe', 0.00, 700, 12000, 'gemstar');
INSERT INTO `stat_game_bot` VALUES (892, '2023-10-18 22:48:49', ' ANTON47', 0.00, 100, 1500, 'hotstar');
INSERT INTO `stat_game_bot` VALUES (893, '2023-10-18 22:47:52', 'mainer', 0.00, 600, 600, 'zodiac');
INSERT INTO `stat_game_bot` VALUES (894, '2023-10-18 22:47:16', ' Lostower', 0.00, 400, 10000, 'wild_dragon');
INSERT INTO `stat_game_bot` VALUES (895, '2023-10-18 22:48:46', ' Whistamed', 0.00, 900, 500, 'fireandice');
INSERT INTO `stat_game_bot` VALUES (896, '2023-10-18 22:59:55', ' ANTON47', 0.00, 300, 500, 'sparklingfresh');
INSERT INTO `stat_game_bot` VALUES (897, '2023-10-18 23:09:54', ' Attims', 0.00, 100, 100, 'diamondmonkey');
INSERT INTO `stat_game_bot` VALUES (898, '2023-10-18 23:00:15', ' Sofirina48', 0.00, 200, 13000, 'hot7');
INSERT INTO `stat_game_bot` VALUES (899, '2023-10-18 22:55:13', ' Olga39', 0.00, 800, 15000, 'wolfmoon');
INSERT INTO `stat_game_bot` VALUES (900, '2023-10-18 23:00:00', ' tanya', 0.00, 400, 500, 'greategypt');
INSERT INTO `stat_game_bot` VALUES (901, '2023-10-18 23:02:06', ' Wher81', 0.00, 700, 800, 'vswaysdogs');
INSERT INTO `stat_game_bot` VALUES (902, '2023-10-18 23:05:09', ' Prooma7', 0.00, 900, 600, 'dragonskingdom');
INSERT INTO `stat_game_bot` VALUES (903, '2023-10-18 23:02:25', ' Lostower', 0.00, 200, 4500, 'dragonskingdom');
INSERT INTO `stat_game_bot` VALUES (874, '2023-10-18 22:37:14', ' Cousitony', 0.00, 600, 5500, 'flaminghot');
INSERT INTO `stat_game_bot` VALUES (875, '2023-10-18 22:37:28', ' maria26', 0.00, 100, 800, 'bookoffortune');
INSERT INTO `stat_game_bot` VALUES (876, '2023-10-18 22:42:50', ' Whistamed', 0.00, 800, 1000, 'eyeofra');
INSERT INTO `stat_game_bot` VALUES (877, '2023-10-18 22:41:29', ' ANTON47', 0.00, 500, 3000, 'extremely');
INSERT INTO `stat_game_bot` VALUES (878, '2023-10-18 22:43:29', ' Patern', 0.00, 5, 500, 'diamondcats');
INSERT INTO `stat_game_bot` VALUES (879, '2023-10-18 22:38:47', ' Attims', 0.00, 25, 100, 'gameofluck');
INSERT INTO `stat_game_bot` VALUES (840, '2023-10-18 20:56:27', ' TGM6A', 0.00, 600, 10000, 'vampires');
INSERT INTO `stat_game_bot` VALUES (841, '2023-10-18 21:06:15', ' serhio771', 0.00, 50, 13000, 'dragonskingdom');
INSERT INTO `stat_game_bot` VALUES (838, '2023-10-18 20:56:40', ' Patern', 0.00, 10, 1500, 'olympus');
INSERT INTO `stat_game_bot` VALUES (839, '2023-10-18 21:06:51', ' Cousitony', 0.00, 100, 10000, 'diamondcats');
INSERT INTO `stat_game_bot` VALUES (836, '2023-10-18 20:59:28', ' sashiko', 0.00, 200, 500, 'fantastico7');
INSERT INTO `stat_game_bot` VALUES (835, '2023-10-18 20:53:36', ' Appon93', 0.00, 100, 11000, 'royalunicorn');
INSERT INTO `stat_game_bot` VALUES (834, '2023-10-18 20:52:45', ' Olga39', 0.00, 900, 500, 'wild_seven');
INSERT INTO `stat_game_bot` VALUES (826, '2023-10-18 20:45:40', ' Texed96', 0.00, 900, 4500, 'greatempire');
INSERT INTO `stat_game_bot` VALUES (824, '2023-10-18 20:43:21', ' SergeySe', 0.00, 800, 3000, 'bigpanda');
INSERT INTO `stat_game_bot` VALUES (825, '2023-10-18 20:44:19', ' Hateplould91', 0.00, 600, 12000, 'burningdice');
INSERT INTO `stat_game_bot` VALUES (1090, '2023-10-19 19:57:52', ' Aily82', 0.00, 600, 14000, 'lovelylady');
INSERT INTO `stat_game_bot` VALUES (1089, '2023-10-19 20:02:42', ' Andifulated', 0.00, 200, 3000, 'zodiac');
INSERT INTO `stat_game_bot` VALUES (1088, '2023-10-19 20:16:19', ' somaki125', 0.00, 25, 100, 'magicforest');
INSERT INTO `stat_game_bot` VALUES (905, '2023-10-18 23:00:27', ' Sofirina48', 0.00, 50, 4000, 'twenty_hot');
INSERT INTO `stat_game_bot` VALUES (906, '2023-10-18 23:22:51', ' Swence', 0.00, 50, 1500, 'extremely');
INSERT INTO `stat_game_bot` VALUES (904, '2023-10-18 23:10:28', ' Ruence', 0.00, 700, 1000, 'diamondcats');
INSERT INTO `stat_game_bot` VALUES (888, '2023-10-18 22:48:55', ' Wher81', 0.00, 900, 15000, 'bluedolphin');
INSERT INTO `stat_game_bot` VALUES (886, '2023-10-18 22:50:41', ' Appon93', 0.00, 400, 15000, 'mermaidsgold');
INSERT INTO `stat_game_bot` VALUES (887, '2023-10-18 22:47:32', ' Lamiya', 0.00, 100, 5500, 'bellsonfirehot');
INSERT INTO `stat_game_bot` VALUES (885, '2023-10-18 22:42:03', ' Texed96', 0.00, 10, 5500, 'supremehot');
INSERT INTO `stat_game_bot` VALUES (883, '2023-10-18 22:40:58', ' Cousitony', 0.00, 5, 4000, 'magicowl');
INSERT INTO `stat_game_bot` VALUES (884, '2023-10-18 22:41:00', ' Andrii', 0.00, 300, 12000, 'zodiac');
INSERT INTO `stat_game_bot` VALUES (882, '2023-10-18 22:43:06', ' tanya', 0.00, 500, 600, 'tweetybirds');
INSERT INTO `stat_game_bot` VALUES (881, '2023-10-18 22:45:35', ' Wher81', 0.00, 600, 15000, 'bookofaztec');
INSERT INTO `stat_game_bot` VALUES (880, '2023-10-18 22:46:39', ' Attims', 0.00, 700, 2000, 'royalunicorn');
INSERT INTO `stat_game_bot` VALUES (873, '2023-10-18 22:37:41', ' TGM6A', 0.00, 100, 11000, 'billysgame');
INSERT INTO `stat_game_bot` VALUES (872, '2023-10-18 22:37:33', ' Aily82', 0.00, 400, 100, 'gemstar');
INSERT INTO `stat_game_bot` VALUES (870, '2023-10-18 22:37:01', ' Andrii', 0.00, 300, 1500, 'lagran');
INSERT INTO `stat_game_bot` VALUES (871, '2023-10-18 22:38:17', ' Falown', 0.00, 700, 13000, 'hotneon');
INSERT INTO `stat_game_bot` VALUES (869, '2023-10-18 22:36:56', ' Feweake', 0.00, 10, 2500, 'hot7');
INSERT INTO `stat_game_bot` VALUES (868, '2023-10-18 22:36:59', ' tanya', 0.00, 600, 5500, 'dragon_reels');
INSERT INTO `stat_game_bot` VALUES (867, '2023-10-18 22:37:57', ' Hateplould91', 0.00, 10, 800, 'dragonspearl');
INSERT INTO `stat_game_bot` VALUES (866, '2023-10-18 22:36:57', ' Wher81', 0.00, 200, 800, 'sparklingfresh');
INSERT INTO `stat_game_bot` VALUES (865, '2023-10-18 21:25:57', ' Lamiya', 0.00, 25, 1000, 'greategypt');
INSERT INTO `stat_game_bot` VALUES (864, '2023-10-18 22:02:32', ' Lamiya', 0.00, 50, 15000, 'redchilli');
INSERT INTO `stat_game_bot` VALUES (860, '2023-10-18 22:30:00', ' Lostower', 0.00, 900, 2500, 'wilddiamonds');
INSERT INTO `stat_game_bot` VALUES (861, '2023-10-18 22:29:28', ' digitalis', 0.00, 500, 11000, 'wildshark');
INSERT INTO `stat_game_bot` VALUES (862, '2023-10-18 21:59:00', ' Ruslan2292', 0.00, 800, 5500, 'fireandice');
INSERT INTO `stat_game_bot` VALUES (863, '2023-10-18 21:32:18', ' serhio771', 0.00, 100, 11000, 'bingo');
INSERT INTO `stat_game_bot` VALUES (858, '2023-10-18 21:53:51', ' Prooma7', 0.00, 1000, 5500, 'vampires');
INSERT INTO `stat_game_bot` VALUES (859, '2023-10-18 22:00:51', ' ANTON47', 0.00, 500, 2000, 'tweetybirds');
INSERT INTO `stat_game_bot` VALUES (857, '2023-10-18 21:39:09', ' digitalis', 0.00, 700, 13000, 'bookofaztec');
INSERT INTO `stat_game_bot` VALUES (856, '2023-10-18 22:25:03', ' Ruence', 0.00, 500, 3500, 'lagran');
INSERT INTO `stat_game_bot` VALUES (855, '2023-10-18 21:18:33', ' Lostower', 0.00, 5, 13000, '4ofking');
INSERT INTO `stat_game_bot` VALUES (852, '2023-10-18 21:20:31', ' Wher81', 0.00, 500, 500, 'twenty_hot');
INSERT INTO `stat_game_bot` VALUES (853, '2023-10-18 21:22:32', ' serhio771', 0.00, 10, 700, 'tweetybirds');
INSERT INTO `stat_game_bot` VALUES (854, '2023-10-18 21:20:06', ' Andifulated', 0.00, 10, 500, 'legion');
INSERT INTO `stat_game_bot` VALUES (851, '2023-10-18 21:17:13', ' maria26', 0.00, 900, 600, 'gameofluck');
INSERT INTO `stat_game_bot` VALUES (850, '2023-10-18 21:19:47', ' Patern', 0.00, 700, 12000, 'bluedolphin');
INSERT INTO `stat_game_bot` VALUES (849, '2023-10-18 21:22:22', ' MASTER12', 0.00, 1000, 15000, 'phoenix');
INSERT INTO `stat_game_bot` VALUES (847, '2023-10-18 21:12:56', ' Andifulated', 0.00, 400, 5500, 'hotstar');
INSERT INTO `stat_game_bot` VALUES (848, '2023-10-18 21:11:05', ' TGM6A', 0.00, 25, 13000, 'dynamite7');
INSERT INTO `stat_game_bot` VALUES (846, '2023-10-18 21:22:34', ' Lostower', 0.00, 100, 10000, 'bookofaztec');
INSERT INTO `stat_game_bot` VALUES (845, '2023-10-18 21:04:12', ' Nounkilthe', 0.00, 10, 11000, 'casanova');
INSERT INTO `stat_game_bot` VALUES (843, '2023-10-18 21:06:03', ' Swence', 0.00, 100, 2500, 'hotneon');
INSERT INTO `stat_game_bot` VALUES (844, '2023-10-18 21:01:30', ' Ruslan2292', 0.00, 900, 700, 'bookofaztec');
INSERT INTO `stat_game_bot` VALUES (842, '2023-10-18 21:06:13', ' MASTER12', 0.00, 5, 500, 'legion');
INSERT INTO `stat_game_bot` VALUES (1087, '2023-10-19 19:58:41', ' Feweake', 0.00, 25, 4500, 'burningdice');
INSERT INTO `stat_game_bot` VALUES (1097, '2023-10-19 20:35:28', ' MASTER12', 0.00, 300, 4000, 'magicidol');
INSERT INTO `stat_game_bot` VALUES (1098, '2023-10-19 20:31:20', ' Hateplould91', 0.00, 5, 5500, 'fortunas_fruits');
INSERT INTO `stat_game_bot` VALUES (1099, '2023-10-19 20:32:48', ' TGM6A', 0.00, 10, 500, 'billysgame');
INSERT INTO `stat_game_bot` VALUES (1100, '2023-10-19 20:32:06', ' Hateplould91', 0.00, 50, 12000, 'bookofaztec');
INSERT INTO `stat_game_bot` VALUES (1101, '2023-10-19 20:30:23', ' Lostower', 0.00, 5, 100, 'gemstar');
INSERT INTO `stat_game_bot` VALUES (1102, '2023-10-19 20:34:49', ' somaki125', 0.00, 5, 4000, 'sparklingfresh');
INSERT INTO `stat_game_bot` VALUES (1103, '2023-10-19 20:41:27', ' Lamiya', 0.00, 300, 11000, 'vampires');
INSERT INTO `stat_game_bot` VALUES (1104, '2023-10-19 20:33:18', ' Falown', 0.00, 200, 1500, 'burningdice');
INSERT INTO `stat_game_bot` VALUES (1105, '2023-10-19 20:42:02', ' somaki125', 0.00, 10, 1000, 'hot81');
INSERT INTO `stat_game_bot` VALUES (833, '2023-10-18 20:53:52', ' somaki125', 0.00, 600, 900, 'vs20doghouse');
INSERT INTO `stat_game_bot` VALUES (1034, '2023-10-19 12:27:14', ' Nounkilthe', 0.00, 10, 2500, 'admiralnelson');
INSERT INTO `stat_game_bot` VALUES (1005, '2023-10-19 11:52:38', ' Hateplould91', 0.00, 10, 14000, 'bellsonfirehot');
INSERT INTO `stat_game_bot` VALUES (1004, '2023-10-19 11:15:37', ' Ruslan2292', 0.00, 1000, 100, 'gameofluck');
INSERT INTO `stat_game_bot` VALUES (832, '2023-10-18 20:55:06', ' maria26', 0.00, 300, 800, 'twenty_hot');
INSERT INTO `stat_game_bot` VALUES (1003, '2023-10-19 11:25:43', ' Feweake', 0.00, 700, 900, 'bells_on_fire');
INSERT INTO `stat_game_bot` VALUES (1001, '2023-10-19 11:22:21', ' Whistamed', 0.00, 900, 500, 'greatempire');
INSERT INTO `stat_game_bot` VALUES (831, '2023-10-18 20:54:40', ' Gionly', 0.00, 900, 14000, 'bellsonfirehot');
INSERT INTO `stat_game_bot` VALUES (1002, '2023-10-19 11:39:46', ' Swence', 0.00, 50, 1500, 'fireandice');
INSERT INTO `stat_game_bot` VALUES (1096, '2023-10-19 20:37:54', ' MASTER12', 0.00, 25, 3500, 'magicidol');
INSERT INTO `stat_game_bot` VALUES (1094, '2023-10-19 20:12:07', ' Ruence', 0.00, 1000, 4500, 'lagran');
INSERT INTO `stat_game_bot` VALUES (1095, '2023-10-19 20:03:14', ' Andifulated', 0.00, 800, 500, 'greategypt');
INSERT INTO `stat_game_bot` VALUES (1093, '2023-10-19 20:12:36', ' Cousitony', 0.00, 900, 4500, 'hot81');
INSERT INTO `stat_game_bot` VALUES (1091, '2023-10-19 20:29:19', ' Swence', 0.00, 300, 15000, 'eyeofra');
INSERT INTO `stat_game_bot` VALUES (1092, '2023-10-19 20:27:03', ' Cousitony', 0.00, 25, 4000, 'luckycoins');
INSERT INTO `stat_game_bot` VALUES (1086, '2023-10-19 20:05:22', ' Texed96', 0.00, 700, 3500, 'wolfmoon');
INSERT INTO `stat_game_bot` VALUES (1085, '2023-10-19 19:56:27', ' SergeySe', 0.00, 800, 13000, 'wilddiamonds');
INSERT INTO `stat_game_bot` VALUES (1084, '2023-10-19 19:56:51', ' Wher81', 0.00, 400, 12000, 'luckybells');
INSERT INTO `stat_game_bot` VALUES (1082, '2023-10-19 19:52:45', ' Texed96', 0.00, 600, 600, 'hot7');
INSERT INTO `stat_game_bot` VALUES (1083, '2023-10-19 19:57:08', ' mike24', 0.00, 200, 11000, 'greatempire');
INSERT INTO `stat_game_bot` VALUES (1081, '2023-10-19 19:52:15', ' Feweake', 0.00, 700, 5000, 'wild_respin');
INSERT INTO `stat_game_bot` VALUES (1079, '2023-10-19 19:53:58', ' Whowerromed91', 0.00, 200, 1500, 'vampires');
INSERT INTO `stat_game_bot` VALUES (1080, '2023-10-19 19:53:30', ' Feweake', 0.00, 500, 600, 'casanova');
INSERT INTO `stat_game_bot` VALUES (1078, '2023-10-19 19:57:23', ' MASTER12', 0.00, 200, 1000, 'en_geisha');
INSERT INTO `stat_game_bot` VALUES (1077, '2023-10-19 19:52:07', ' Andifulated', 0.00, 5, 3000, 'vs20rhino');
INSERT INTO `stat_game_bot` VALUES (1076, '2023-10-19 19:52:45', ' Whowerromed91', 0.00, 100, 11000, 'vampires');
INSERT INTO `stat_game_bot` VALUES (1075, '2023-10-19 19:42:09', ' Hateplould91', 0.00, 10, 14000, 'greatempire');
INSERT INTO `stat_game_bot` VALUES (1074, '2023-10-19 18:50:29', ' Ruslan2292', 0.00, 1000, 100, 'wild_seven');
INSERT INTO `stat_game_bot` VALUES (1073, '2023-10-19 19:04:34', ' Feweake', 0.00, 700, 900, 'lagran');
INSERT INTO `stat_game_bot` VALUES (1072, '2023-10-19 19:24:12', ' Swence', 0.00, 50, 1500, 'bigpanda');
INSERT INTO `stat_game_bot` VALUES (1071, '2023-10-19 18:59:53', ' Whistamed', 0.00, 900, 500, 'allwaysfruits');
INSERT INTO `stat_game_bot` VALUES (1070, '2023-10-19 18:44:46', ' Lostower', 0.00, 400, 10000, 'hotneon');
INSERT INTO `stat_game_bot` VALUES (1068, '2023-10-19 19:00:19', ' ANTON47', 0.00, 100, 1500, 'bluedolphin');
INSERT INTO `stat_game_bot` VALUES (1069, '2023-10-19 18:50:52', 'mainer', 0.00, 600, 600, 'grandtiger');
INSERT INTO `stat_game_bot` VALUES (830, '2023-10-18 20:50:28', ' TGM6A', 0.00, 10, 4500, 'billysgame');
INSERT INTO `stat_game_bot` VALUES (817, '2023-10-18 20:43:50', ' Patern', 0.00, 1000, 2000, 'vikings');
INSERT INTO `stat_game_bot` VALUES (829, '2023-10-18 20:56:11', ' Appon93', 0.00, 700, 14000, 'grandtiger');
INSERT INTO `stat_game_bot` VALUES (828, '2023-10-18 20:47:49', ' Nounkilthe', 0.00, 300, 5500, 'bells_on_fire');
INSERT INTO `stat_game_bot` VALUES (837, '2023-10-18 20:58:24', ' tanya', 0.00, 700, 13000, 'casanova');
INSERT INTO `stat_game_bot` VALUES (827, '2023-10-18 20:53:14', ' tanya', 0.00, 200, 4500, 'partytime');
INSERT INTO `stat_game_bot` VALUES (1000, '2023-10-19 11:11:32', ' Lostower', 0.00, 400, 10000, 'vikings');
INSERT INTO `stat_game_bot` VALUES (999, '2023-10-19 11:15:53', 'mainer', 0.00, 600, 600, 'diamondmonkey');
INSERT INTO `stat_game_bot` VALUES (998, '2023-10-19 11:22:40', ' ANTON47', 0.00, 100, 1500, 'goldenbook');
INSERT INTO `stat_game_bot` VALUES (1033, '2023-10-19 12:18:40', ' tanya', 0.00, 500, 500, 'billyonaire');
INSERT INTO `stat_game_bot` VALUES (997, '2023-10-19 11:57:27', ' Nounkilthe', 0.00, 700, 12000, 'redchilli');
INSERT INTO `stat_game_bot` VALUES (1032, '2023-10-19 12:18:28', ' serhio771', 0.00, 300, 5500, 'twenty_hot');
INSERT INTO `stat_game_bot` VALUES (1031, '2023-10-19 12:15:51', ' Ruslan2292', 0.00, 700, 5000, 'aztecsecret');
INSERT INTO `stat_game_bot` VALUES (1030, '2023-10-19 12:20:02', ' Aily82', 0.00, 10, 600, 'legion');
INSERT INTO `stat_game_bot` VALUES (1038, '2023-10-19 12:37:49', ' somaki125', 0.00, 700, 500, 'merry_fruits');
INSERT INTO `stat_game_bot` VALUES (1037, '2023-10-19 12:31:46', ' Appon93', 0.00, 800, 10000, 'magicidol');
INSERT INTO `stat_game_bot` VALUES (1029, '2023-10-19 12:26:21', ' Hateplould91', 0.00, 300, 14000, 'greatempire');
INSERT INTO `stat_game_bot` VALUES (1028, '2023-10-19 12:23:10', ' sashiko', 0.00, 25, 3000, 'hotdiamonds');
INSERT INTO `stat_game_bot` VALUES (1027, '2023-10-19 12:31:16', ' Andrii', 0.00, 700, 700, 'royalunicorn');
INSERT INTO `stat_game_bot` VALUES (1067, '2023-10-19 19:48:53', ' Nounkilthe', 0.00, 700, 12000, 'wild_respin');
INSERT INTO `stat_game_bot` VALUES (994, '2023-10-19 11:01:41', ' Wher81', 0.00, 900, 15000, 'dragonskingdom');
INSERT INTO `stat_game_bot` VALUES (995, '2023-10-19 11:00:08', ' Falown', 0.00, 400, 800, 'diamondmonkey');
INSERT INTO `stat_game_bot` VALUES (996, '2023-10-19 11:47:40', ' sashiko', 0.00, 900, 2000, 'fireandice');
INSERT INTO `stat_game_bot` VALUES (1006, '2023-10-19 11:57:53', ' Ruence', 0.00, 300, 12000, 'sparklingfresh');
INSERT INTO `stat_game_bot` VALUES (1007, '2023-10-19 12:03:18', ' Olga39', 0.00, 200, 1500, 'cleopatra');
INSERT INTO `stat_game_bot` VALUES (1008, '2023-10-19 12:03:53', ' digitalis', 0.00, 600, 3500, 'pachamama');
INSERT INTO `stat_game_bot` VALUES (1009, '2023-10-19 12:01:22', ' SergeySe', 0.00, 100, 14000, 'wolfmoon');
INSERT INTO `stat_game_bot` VALUES (1010, '2023-10-19 11:57:34', ' MASTER12', 0.00, 10, 13000, 'billyonaire');
INSERT INTO `stat_game_bot` VALUES (1011, '2023-10-19 12:03:27', ' Nounkilthe', 0.00, 600, 100, 'gemstar');
INSERT INTO `stat_game_bot` VALUES (1012, '2023-10-19 12:01:34', ' TGM6A', 0.00, 700, 1500, 'greatempire');
INSERT INTO `stat_game_bot` VALUES (1013, '2023-10-19 11:59:53', ' Lamiya', 0.00, 200, 500, 'legion');
INSERT INTO `stat_game_bot` VALUES (1014, '2023-10-19 12:06:09', ' Gionly', 0.00, 600, 500, 'diamondmonkey');
INSERT INTO `stat_game_bot` VALUES (1015, '2023-10-19 12:06:06', ' Whowerromed91', 0.00, 100, 4000, 'hotneon');
INSERT INTO `stat_game_bot` VALUES (1016, '2023-10-19 12:09:01', ' digitalis', 0.00, 800, 2000, 'eyeofra');
INSERT INTO `stat_game_bot` VALUES (1017, '2023-10-19 12:10:51', ' Aily82', 0.00, 5, 13000, 'gemstar');
INSERT INTO `stat_game_bot` VALUES (1018, '2023-10-19 12:10:29', ' TGM6A', 0.00, 200, 600, 'lovelylady');
INSERT INTO `stat_game_bot` VALUES (1019, '2023-10-19 12:13:13', ' somaki125', 0.00, 900, 1000, 'luckyzodiac');
INSERT INTO `stat_game_bot` VALUES (1020, '2023-10-19 12:10:51', ' Sofirina48', 0.00, 400, 3500, 'cleopatra');
INSERT INTO `stat_game_bot` VALUES (1021, '2023-10-19 12:09:42', ' Lamiya', 0.00, 100, 4500, 'eyeofra');
INSERT INTO `stat_game_bot` VALUES (1022, '2023-10-19 12:15:08', ' mike24', 0.00, 300, 4000, 'magicscatter');
INSERT INTO `stat_game_bot` VALUES (1023, '2023-10-19 12:12:44', ' Patern', 0.00, 400, 2500, 'bigpanda');
INSERT INTO `stat_game_bot` VALUES (1024, '2023-10-19 12:12:03', ' Sofirina48', 0.00, 200, 14000, 'diamondcats');
INSERT INTO `stat_game_bot` VALUES (1025, '2023-10-19 12:07:49', ' TGM6A', 0.00, 600, 13000, 'vikings');
INSERT INTO `stat_game_bot` VALUES (1026, '2023-10-19 12:17:08', ' Whowerromed91', 0.00, 5, 600, 'fruitskingdom');
INSERT INTO `stat_game_bot` VALUES (1035, '2023-10-19 12:26:35', ' Feweake', 0.00, 900, 1500, 'supremehot');
INSERT INTO `stat_game_bot` VALUES (1036, '2023-10-19 12:38:03', ' Attims', 0.00, 700, 3000, 'lovelylady');
INSERT INTO `stat_game_bot` VALUES (1039, '2023-10-19 12:34:13', ' Andrii', 0.00, 200, 1000, 'vampires');
INSERT INTO `stat_game_bot` VALUES (1040, '2023-10-19 12:39:00', ' maria26', 0.00, 50, 1000, 'diamondsonfire');
INSERT INTO `stat_game_bot` VALUES (1041, '2023-10-19 12:34:19', ' serhio771', 0.00, 400, 800, 'redchilli');
INSERT INTO `stat_game_bot` VALUES (1042, '2023-10-19 12:37:37', ' Falown', 0.00, 500, 4000, 'magicidol');
INSERT INTO `stat_game_bot` VALUES (1043, '2023-10-19 12:35:06', ' Andifulated', 0.00, 700, 1000, 'bingo');
INSERT INTO `stat_game_bot` VALUES (1044, '2023-10-19 12:32:56', ' Prooma7', 0.00, 200, 14000, 'luckybells');
INSERT INTO `stat_game_bot` VALUES (1045, '2023-10-19 12:34:46', ' Andifulated', 0.00, 600, 4500, 'dynamite7');
INSERT INTO `stat_game_bot` VALUES (1046, '2023-10-19 15:03:25', ' Patern', 0.00, 700, 12000, 'zodiac');
INSERT INTO `stat_game_bot` VALUES (1047, '2023-10-19 14:51:03', ' maria26', 0.00, 900, 600, 'fruitskingdom');
INSERT INTO `stat_game_bot` VALUES (1048, '2023-10-19 15:07:00', ' Wher81', 0.00, 500, 500, 'bingo');
INSERT INTO `stat_game_bot` VALUES (1049, '2023-10-19 15:16:46', ' serhio771', 0.00, 10, 700, 'merry_fruits');
INSERT INTO `stat_game_bot` VALUES (1050, '2023-10-19 15:04:59', ' Andifulated', 0.00, 10, 500, 'luckybells');
INSERT INTO `stat_game_bot` VALUES (1051, '2023-10-19 14:57:32', ' Lostower', 0.00, 5, 13000, 'hotdiamonds');
INSERT INTO `stat_game_bot` VALUES (1052, '2023-10-19 14:41:12', ' Appon93', 0.00, 400, 15000, 'allwaysfruits');
INSERT INTO `stat_game_bot` VALUES (1053, '2023-10-19 14:09:45', ' Lamiya', 0.00, 100, 5500, 'wild_seven');
INSERT INTO `stat_game_bot` VALUES (1054, '2023-10-19 14:23:41', ' Wher81', 0.00, 900, 15000, 'wolfmoon');
INSERT INTO `stat_game_bot` VALUES (1055, '2023-10-19 14:08:29', ' Falown', 0.00, 400, 800, 'magicidol');
INSERT INTO `stat_game_bot` VALUES (1056, '2023-10-19 15:35:25', ' Andifulated', 0.00, 900, 3500, 'greatempire');
INSERT INTO `stat_game_bot` VALUES (1057, '2023-10-19 15:33:02', ' Sofirina48', 0.00, 400, 2000, 'casanova');
INSERT INTO `stat_game_bot` VALUES (1058, '2023-10-19 15:32:24', ' sashiko', 0.00, 50, 3500, 'hot7');
INSERT INTO `stat_game_bot` VALUES (1059, '2023-10-19 15:37:31', ' Olga39', 0.00, 5, 2500, 'wild_respin');
INSERT INTO `stat_game_bot` VALUES (1060, '2023-10-19 15:30:42', 'mainer', 0.00, 800, 100, 'diamondmonkey');
INSERT INTO `stat_game_bot` VALUES (1061, '2023-10-19 15:17:38', ' sashiko', 0.00, 50, 1000, 'lagran');
INSERT INTO `stat_game_bot` VALUES (1062, '2023-10-19 15:16:55', ' MASTER12', 0.00, 800, 800, 'greatempire');
INSERT INTO `stat_game_bot` VALUES (1063, '2023-10-19 15:29:35', ' mike24', 0.00, 10, 5500, 'bellsonfirerombo');
INSERT INTO `stat_game_bot` VALUES (1064, '2023-10-19 15:20:07', ' Whistamed', 0.00, 400, 900, 'aztecsecret');
INSERT INTO `stat_game_bot` VALUES (1065, '2023-10-19 15:20:00', ' Gionly', 0.00, 200, 11000, 'gameofluck');
INSERT INTO `stat_game_bot` VALUES (1066, '2023-10-19 19:35:14', ' sashiko', 0.00, 900, 2000, 'lovelylady');

-- ----------------------------
-- Table structure for statistics
-- ----------------------------
DROP TABLE IF EXISTS `statistics`;
CREATE TABLE `statistics`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `agentCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `gameCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `betCount` int(11) NOT NULL DEFAULT 0,
  `betAmount` double(20, 2) NOT NULL DEFAULT 0.00,
  `winCount` int(11) NOT NULL DEFAULT 0,
  `winAmount` double(20, 2) NOT NULL DEFAULT 0.00,
  `spendingAmount` double(20, 2) NOT NULL DEFAULT 0.00,
  `freeCount` int(11) NOT NULL DEFAULT 0,
  `freeBetAmount` double(20, 2) NOT NULL DEFAULT 0.00,
  `freeWinAmount` double(20, 2) NOT NULL DEFAULT 0.00,
  `buyCount` int(11) NOT NULL DEFAULT 0,
  `buyBetAmount` double(20, 2) NOT NULL DEFAULT 0.00,
  `buyWinAmount` double(20, 2) NOT NULL DEFAULT 0.00,
  `callCount` int(11) NOT NULL DEFAULT 0,
  `callBetAmount` double(20, 2) NOT NULL DEFAULT 0.00,
  `callWinAmount` double(20, 2) NOT NULL DEFAULT 0.00,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `Index`(`createdAt`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of statistics
-- ----------------------------

-- ----------------------------
-- Table structure for syslog
-- ----------------------------
DROP TABLE IF EXISTS `syslog`;
CREATE TABLE `syslog`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  `text` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of syslog
-- ----------------------------

-- ----------------------------
-- Table structure for tour_bot
-- ----------------------------
DROP TABLE IF EXISTS `tour_bot`;
CREATE TABLE `tour_bot`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tour_id` int(11) NOT NULL,
  `user` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `result` decimal(14, 2) NOT NULL,
  `limit` int(11) NOT NULL,
  `countup` decimal(10, 2) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `tour_id_2`(`tour_id`, `user`) USING BTREE,
  INDEX `tour_id`(`tour_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 37 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tour_bot
-- ----------------------------
INSERT INTO `tour_bot` VALUES (1, 1, ' somaki125', 553.00, 44517, 20.00);
INSERT INTO `tour_bot` VALUES (2, 1, ' Sofirina48', 618.00, 38983, 20.00);
INSERT INTO `tour_bot` VALUES (3, 1, ' TGM6A', 513.00, 40627, 20.00);
INSERT INTO `tour_bot` VALUES (4, 1, ' Andrii', 581.00, 55173, 20.00);
INSERT INTO `tour_bot` VALUES (5, 1, ' SergeySe', 565.00, 41595, 20.00);
INSERT INTO `tour_bot` VALUES (6, 1, 'mainer', 552.00, 96940, 20.00);
INSERT INTO `tour_bot` VALUES (7, 1, ' MASTER12', 596.00, 89483, 20.00);
INSERT INTO `tour_bot` VALUES (8, 1, ' tanya', 560.00, 78430, 20.00);
INSERT INTO `tour_bot` VALUES (9, 1, ' Ruslan2292', 506.00, 87974, 20.00);
INSERT INTO `tour_bot` VALUES (10, 1, ' digitalis', 565.00, 21683, 20.00);
INSERT INTO `tour_bot` VALUES (11, 1, ' ANTON47', 601.00, 47228, 20.00);
INSERT INTO `tour_bot` VALUES (12, 1, ' maria26', 541.00, 5166, 20.00);
INSERT INTO `tour_bot` VALUES (13, 1, ' sashiko', 548.00, 51370, 20.00);
INSERT INTO `tour_bot` VALUES (14, 1, ' serhio771', 501.00, 34967, 20.00);
INSERT INTO `tour_bot` VALUES (15, 1, ' Lamiya', 533.00, 83071, 20.00);
INSERT INTO `tour_bot` VALUES (16, 1, ' Olga39', 494.00, 60499, 20.00);
INSERT INTO `tour_bot` VALUES (17, 1, ' Gionly', 466.00, 48274, 20.00);
INSERT INTO `tour_bot` VALUES (18, 1, ' Prooma7', 447.00, 26845, 20.00);
INSERT INTO `tour_bot` VALUES (19, 1, ' Swence', 400.00, 31928, 20.00);
INSERT INTO `tour_bot` VALUES (20, 1, ' Texed96', 418.00, 39620, 20.00);
INSERT INTO `tour_bot` VALUES (21, 1, ' Whistamed', 465.00, 30058, 20.00);
INSERT INTO `tour_bot` VALUES (22, 1, ' Wher81', 394.00, 46843, 20.00);
INSERT INTO `tour_bot` VALUES (23, 1, ' Andifulated', 331.00, 61726, 20.00);
INSERT INTO `tour_bot` VALUES (24, 1, ' Feweake', 394.00, 10970, 20.00);
INSERT INTO `tour_bot` VALUES (25, 1, ' Aily82', 370.00, 63824, 20.00);
INSERT INTO `tour_bot` VALUES (26, 1, ' Patern', 372.00, 76530, 20.00);
INSERT INTO `tour_bot` VALUES (27, 1, ' mike24', 372.00, 43182, 20.00);
INSERT INTO `tour_bot` VALUES (28, 1, ' Falown', 401.00, 35099, 20.00);
INSERT INTO `tour_bot` VALUES (29, 1, ' Whowerromed91', 399.00, 79019, 20.00);
INSERT INTO `tour_bot` VALUES (30, 1, ' Cousitony', 424.00, 96787, 20.00);
INSERT INTO `tour_bot` VALUES (31, 1, ' Attims', 358.00, 65077, 20.00);
INSERT INTO `tour_bot` VALUES (32, 1, ' Appon93', 375.00, 26935, 20.00);
INSERT INTO `tour_bot` VALUES (33, 1, ' Hateplould91', 330.00, 69460, 20.00);
INSERT INTO `tour_bot` VALUES (34, 1, ' Ruence', 409.00, 58323, 20.00);
INSERT INTO `tour_bot` VALUES (35, 1, ' Lostower', 440.00, 52537, 20.00);
INSERT INTO `tour_bot` VALUES (36, 1, ' Nounkilthe', 414.00, 8190, 20.00);

-- ----------------------------
-- Table structure for tour_games
-- ----------------------------
DROP TABLE IF EXISTS `tour_games`;
CREATE TABLE `tour_games`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tour_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `game_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `tour_id`(`tour_id`, `game_id`) USING BTREE,
  INDEX `game_name`(`game_name`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 55 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tour_games
-- ----------------------------
INSERT INTO `tour_games` VALUES (1, 1, 81, 'alchemist');
INSERT INTO `tour_games` VALUES (2, 1, 82, 'lordofoceans');
INSERT INTO `tour_games` VALUES (3, 1, 83, 'sizzlinghot_dx');
INSERT INTO `tour_games` VALUES (4, 1, 84, 'mermaids');
INSERT INTO `tour_games` VALUES (5, 1, 85, 'justjewels_dx');
INSERT INTO `tour_games` VALUES (6, 1, 86, 'magicprincess');
INSERT INTO `tour_games` VALUES (7, 1, 87, 'luckylady_dx');
INSERT INTO `tour_games` VALUES (8, 1, 88, 'bookofra_dx');
INSERT INTO `tour_games` VALUES (9, 1, 89, 'dolphins_dx');
INSERT INTO `tour_games` VALUES (10, 1, 90, 'pharaoh_ring');
INSERT INTO `tour_games` VALUES (11, 1, 91, 'columbus_dx');
INSERT INTO `tour_games` VALUES (12, 1, 92, 'jolly_fruits');
INSERT INTO `tour_games` VALUES (13, 1, 93, 'ultrahot_dx');
INSERT INTO `tour_games` VALUES (14, 1, 94, 'golden_cobras');
INSERT INTO `tour_games` VALUES (15, 1, 95, 'sand');
INSERT INTO `tour_games` VALUES (16, 1, 96, 'horses');
INSERT INTO `tour_games` VALUES (17, 1, 97, 'diamond7');
INSERT INTO `tour_games` VALUES (18, 1, 98, 'holydays');
INSERT INTO `tour_games` VALUES (19, 1, 99, 'mystery_star');
INSERT INTO `tour_games` VALUES (20, 1, 100, 'plenty');
INSERT INTO `tour_games` VALUES (21, 1, 101, 'ramses2');
INSERT INTO `tour_games` VALUES (22, 1, 102, 'seasirenes');
INSERT INTO `tour_games` VALUES (23, 1, 103, 'goldenark');
INSERT INTO `tour_games` VALUES (24, 1, 104, 'katana');
INSERT INTO `tour_games` VALUES (25, 1, 105, 'chicago');
INSERT INTO `tour_games` VALUES (26, 1, 106, 'redlady');
INSERT INTO `tour_games` VALUES (27, 1, 107, 'penguin');
INSERT INTO `tour_games` VALUES (28, 1, 108, 'luckyclover');
INSERT INTO `tour_games` VALUES (29, 1, 109, 'purplehot2');
INSERT INTO `tour_games` VALUES (30, 1, 110, 'milady2');
INSERT INTO `tour_games` VALUES (31, 1, 111, 'duckofluck');
INSERT INTO `tour_games` VALUES (32, 1, 112, 'sizzling6');
INSERT INTO `tour_games` VALUES (33, 1, 113, 'reelking4');
INSERT INTO `tour_games` VALUES (34, 1, 114, 'reelking');
INSERT INTO `tour_games` VALUES (35, 1, 115, 'secret_elixir');
INSERT INTO `tour_games` VALUES (36, 1, 116, 'gorilla');
INSERT INTO `tour_games` VALUES (37, 1, 117, 'orca');
INSERT INTO `tour_games` VALUES (38, 1, 118, 'mystic_secret');
INSERT INTO `tour_games` VALUES (39, 1, 119, 'zeus2');
INSERT INTO `tour_games` VALUES (40, 1, 120, 'gigolo');
INSERT INTO `tour_games` VALUES (41, 1, 121, 'fortunefish');
INSERT INTO `tour_games` VALUES (42, 1, 122, 'bookofra_dx6');
INSERT INTO `tour_games` VALUES (43, 1, 123, 'bookofstars');
INSERT INTO `tour_games` VALUES (44, 1, 124, 'bigcatch');
INSERT INTO `tour_games` VALUES (45, 1, 125, 'fairy_queen');
INSERT INTO `tour_games` VALUES (46, 1, 126, 'flamenco');
INSERT INTO `tour_games` VALUES (47, 1, 127, 'shooting_stars');
INSERT INTO `tour_games` VALUES (48, 1, 128, 'templecats');
INSERT INTO `tour_games` VALUES (49, 1, 129, 'dragonsdeep');
INSERT INTO `tour_games` VALUES (50, 1, 130, 'fusionfruit');
INSERT INTO `tour_games` VALUES (51, 1, 131, 'inferno');
INSERT INTO `tour_games` VALUES (52, 1, 132, 'reelking_potty');
INSERT INTO `tour_games` VALUES (53, 1, 133, 'sizzlinghot4');
INSERT INTO `tour_games` VALUES (54, 1, 134, 'trident');

-- ----------------------------
-- Table structure for tour_prize
-- ----------------------------
DROP TABLE IF EXISTS `tour_prize`;
CREATE TABLE `tour_prize`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tour_id` int(11) NOT NULL,
  `suma` int(11) NOT NULL,
  `wager` int(5) NOT NULL,
  `winner_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `result` decimal(14, 2) NULL DEFAULT NULL,
  `order_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `tour_id`(`tour_id`, `winner_id`) USING BTREE,
  INDEX `order_id`(`order_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tour_prize
-- ----------------------------
INSERT INTO `tour_prize` VALUES (1, 1, 30000, 0, NULL, NULL, NULL);
INSERT INTO `tour_prize` VALUES (2, 1, 17000, 0, NULL, NULL, NULL);
INSERT INTO `tour_prize` VALUES (3, 1, 10000, 0, NULL, NULL, NULL);
INSERT INTO `tour_prize` VALUES (4, 1, 8000, 0, NULL, NULL, NULL);
INSERT INTO `tour_prize` VALUES (5, 1, 5000, 0, NULL, NULL, NULL);
INSERT INTO `tour_prize` VALUES (6, 1, 3000, 0, NULL, NULL, NULL);
INSERT INTO `tour_prize` VALUES (7, 1, 3000, 0, NULL, NULL, NULL);
INSERT INTO `tour_prize` VALUES (8, 1, 3000, 0, NULL, NULL, NULL);
INSERT INTO `tour_prize` VALUES (9, 1, 3000, 0, NULL, NULL, NULL);
INSERT INTO `tour_prize` VALUES (10, 1, 3000, 0, NULL, NULL, NULL);
INSERT INTO `tour_prize` VALUES (11, 1, 2000, 0, NULL, NULL, NULL);
INSERT INTO `tour_prize` VALUES (12, 1, 2000, 0, NULL, NULL, NULL);
INSERT INTO `tour_prize` VALUES (13, 1, 2000, 0, NULL, NULL, NULL);
INSERT INTO `tour_prize` VALUES (14, 1, 2000, 0, NULL, NULL, NULL);
INSERT INTO `tour_prize` VALUES (15, 1, 2000, 0, NULL, NULL, NULL);
INSERT INTO `tour_prize` VALUES (16, 1, 1000, 0, NULL, NULL, NULL);
INSERT INTO `tour_prize` VALUES (17, 1, 1000, 0, NULL, NULL, NULL);
INSERT INTO `tour_prize` VALUES (18, 1, 1000, 0, NULL, NULL, NULL);
INSERT INTO `tour_prize` VALUES (19, 1, 1000, 0, NULL, NULL, NULL);
INSERT INTO `tour_prize` VALUES (20, 1, 1000, 0, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for tournaments
-- ----------------------------
DROP TABLE IF EXISTS `tournaments`;
CREATE TABLE `tournaments`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `is_loop` int(1) NOT NULL DEFAULT 0,
  `type` int(1) NOT NULL,
  `prizes_sum` int(11) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 0,
  `pic` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pic_2` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `min_stav` int(11) NOT NULL,
  `spin_count` int(11) NOT NULL,
  `bot_limit` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `txt` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `mailing_status` int(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tournaments
-- ----------------------------
INSERT INTO `tournaments` VALUES (1, '                                         ', '                                         ', '2017-02-01 00:00:00', '2018-04-30 23:59:00', 0, 1, 100000, 0, 'monday.jpg', 'monday_2.jpg', 5, 20, '100000|1500|20', '                                                               ?              casino Global                                       !                      at                                                              and                                                       and                   .                                           .       ,                                       -&nbsp; play                                        and                                                        .                          club                                                         ,      and                                                               .<br><br>rules                                                                                        <br><br>                                                                         00.00                 23.59                                                    ;<br><br>                                 ,                   play on money at                                                 ;<br><br>                                               100 000              and                                               20                                             ;<br><br>                                  at                                                       1  <br><br>                                          at         ,                                 at                                  .                        amount                  at                        .       ,                                                                                            !<br><br>                                    Global                                               .<br><br>                                                         -                                       ,                                     .                                          Global                        .           !<br>', 0);

-- ----------------------------
-- Table structure for ulogin
-- ----------------------------
DROP TABLE IF EXISTS `ulogin`;
CREATE TABLE `ulogin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `network` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `uid` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `network`(`network`, `uid`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ulogin
-- ----------------------------

-- ----------------------------
-- Table structure for useragent
-- ----------------------------
DROP TABLE IF EXISTS `useragent`;
CREATE TABLE `useragent`  (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `user_id` int(5) NOT NULL DEFAULT 0,
  `date` int(10) NOT NULL DEFAULT 0,
  `useragent` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of useragent
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `login` char(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `pass` char(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `pin` char(4) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `mail_active_status` tinyint(1) NOT NULL DEFAULT 0,
  `fio` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `wmr` char(13) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `qiwi` varchar(18) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `balance` decimal(14, 2) NULL DEFAULT 0.00,
  `balance_bonus` decimal(14, 2) NULL DEFAULT 0.00,
  `wager` int(11) NOT NULL DEFAULT 0,
  `wager_bonus` int(11) NOT NULL DEFAULT 0,
  `pay_points` decimal(14, 2) NULL DEFAULT 0.00,
  `can_outpay` tinyint(1) NOT NULL DEFAULT 0,
  `demobalance` decimal(14, 2) NULL DEFAULT 0.00,
  `demomode` int(1) NULL DEFAULT 0,
  `creator` int(1) NOT NULL DEFAULT 1,
  `ref_id` int(11) NULL DEFAULT NULL COMMENT 'id                                                              ',
  `reg_time` int(10) NOT NULL DEFAULT 0,
  `go_time` int(10) NOT NULL DEFAULT 0,
  `ip` char(15) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0',
  `useragent` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `os` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `last_ge` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'root',
  `status` smallint(1) NOT NULL DEFAULT 5,
  `action` int(2) NOT NULL DEFAULT 0,
  `room_id` int(10) NOT NULL DEFAULT 1,
  `comment` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `graf_kind` enum('low','medium','high') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'high',
  `denomination` decimal(5, 2) NOT NULL DEFAULT 1.00,
  `spin_bank` decimal(13, 3) NULL DEFAULT 100.000,
  `bonus_bank` decimal(13, 3) NULL DEFAULT 50.000,
  `double_bank` decimal(13, 3) NULL DEFAULT 0.000,
  `sound` int(1) NULL DEFAULT 1,
  `preset_id` int(10) NULL DEFAULT 0,
  `point_on` int(1) NOT NULL DEFAULT 0,
  `point` decimal(14, 2) NULL DEFAULT 0.00,
  `lang` char(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'eu',
  `payed_spins` int(11) NOT NULL DEFAULT 0,
  `curspin` int(5) NOT NULL DEFAULT 0,
  `garant` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `curspin_bonus` int(5) NOT NULL DEFAULT 0,
  `garant_bonus` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `payin` decimal(12, 2) NULL DEFAULT 0.00,
  `payin_total` decimal(12, 2) NULL DEFAULT 0.00,
  `gift` int(1) NULL DEFAULT NULL COMMENT '1-        , 2-                  ,3-                           ',
  `rating` int(3) NOT NULL DEFAULT 1,
  `firstname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `lastname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `birthday` date NULL DEFAULT NULL,
  `token` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `realRtp` float NULL DEFAULT NULL,
  `targetRtp` float NULL DEFAULT NULL,
  `totalDebit` float NULL DEFAULT NULL,
  `totalCredit` float NULL DEFAULT NULL,
  `createdAt` datetime NULL DEFAULT NULL,
  `updatedAt` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `login`(`login`) USING BTREE,
  UNIQUE INDEX `qiwi`(`qiwi`) USING BTREE,
  UNIQUE INDEX `email`(`email`) USING BTREE,
  INDEX `point_on`(`point_on`) USING BTREE,
  INDEX `status`(`status`) USING BTREE,
  INDEX `action`(`action`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------

-- ----------------------------
-- Table structure for users_rate_range
-- ----------------------------
DROP TABLE IF EXISTS `users_rate_range`;
CREATE TABLE `users_rate_range`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lang` char(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'eu',
  `bonus_sum` decimal(10, 0) NOT NULL DEFAULT 0,
  `title` char(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `description` varchar(5000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `level` int(11) NOT NULL DEFAULT 1,
  `point_cours` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '1',
  `name` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `range` int(11) NOT NULL,
  `color` char(7) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pic` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `lang`(`lang`, `level`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 25 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users_rate_range
-- ----------------------------
INSERT INTO `users_rate_range` VALUES (1, 'eu', 0, 'VIP-               1.', '<p>             casino Global                                !</p><p>                                                                         ,                                      club Global, Where                the best slots from                                            .                                                                                                                  ,                              at                                  ,                      for                                                          ,              VIP-        .</p><p>                                                                     VIP-            .                                                                                                                    and             ,                     at casino Global                                        and                     !</p><p>                        and                                  !</p>', 1, '1|0', '              ', 0, '000000', 'newbie.png');
INSERT INTO `users_rate_range` VALUES (2, 'eu', 100, 'VIP-               2.', '<p>                                                                                        at            Global                             VIP-                             .</p><p>                                            ,                             ,                         at                and                   .        and                                   ,                from casino Global               :</p><ul><li>500                           ,</li><li>                           2   VIP-            .</li></ul><p>                                at                                                                                               .                                                                           at                                             ,                                                                                    for                                                       , Where                                                  and                                         from               !</p>', 2, '1.2|0', '            ', 2500, '000000', 'bronze.png');
INSERT INTO `users_rate_range` VALUES (3, 'eu', 300, 'VIP-               3.', '<p>                              at            Global                                      !</p><p>                                     VIP-                               ,                       ,                                                                       <strong>1500             ,</strong>                                         play at                           games                           .</p><p>           for                                           <strong>  2   VIP-            </strong>,                                                                                                                               VIP-              . </p><p>                                      ,                      for                     gambling                        and                                                              .</p><p>                                                  casino Global                for you                                                                                 !</p>', 3, '1.4|0', '              ', 7500, '000000', 'silver.png');
INSERT INTO `users_rate_range` VALUES (4, 'eu', 500, 'VIP-               4.', '<p>                              and                                                                                      !</p><p>                                                                      at            Global     VIP-                                 !</p><p>         and       ,                                                                                                                        ,                          ,                                                          5000                           .                                                     ,                                for                                                                           casino.</p><p>                   ,                         and                     2   VIP-            .                         and                           .                                        and                                        VIP-        ,                                          and                                            from casino Global!</p><p>                                        at                                                   ,                          ,                                                          .               ,                                           !</p>', 4, '1.6|0', '            ', 15000, '000000', 'gold.png');
INSERT INTO `users_rate_range` VALUES (5, 'eu', 1000, 'VIP-               5.', '<p>                                      ,                                                          at casino Global!</p><p>                                                                                                                    !</p><p>                           and                                                                                             club.                                                                      and                     ,                                              15000             . </p><p>                                        at casino Global                                             ,                                                                                   and                and,               ,                                                   ! </p><p>                2   VIP-                                                                                       for                                        ,                              , VIP-              .                                                                   -                                            and                          -                       !</p>', 5, '1.8|0', '              ', 30000, '000000', 'platinum.png');
INSERT INTO `users_rate_range` VALUES (6, 'eu', 3000, 'VIP-               6.', '<p>                    ! </p><p>                                                    casino Global,                                                                      VIP-                                       ! </p><p>                                                                                                                         at          50 000             .                      ,               ,            ,                  for                                                                  casino Global,                                    ,                                                                           at                                  . </p><p>                                      ,                                                       ,                                       !</p><p>                                                                                      and                                          and             ,                                                                                                  ! </p>', 6, '2|0', '          ', 100000, '000000', 'diamond.png');
INSERT INTO `users_rate_range` VALUES (7, 'us', 0, 'VIP level 1.', '<p>             casino Global                                !</p><p>                                                                         ,                                      club Global, Where                the best slots from                                            .                                                                                                                  ,                              at                                  ,                      for                                                          ,              VIP-        .</p><p>                                                                     VIP-            .                                                                                                                    and             ,                     at casino Global                                        and                     !</p><p>                        and                                  !</p>', 1, '1|0', '              ', 0, '000000', 'newbie.png');
INSERT INTO `users_rate_range` VALUES (8, 'us', 100, 'VIP-               2.', '<p>                                                                                        at            Global                             VIP-                             .</p><p>                                            ,                             ,                         at                and                   .        and                                   ,                from casino Global               :</p><ul><li>500                           ,</li><li>                           2   VIP-            .</li></ul><p>                                at                                                                                               .                                                                           at                                             ,                                                                                    for                                                       , Where                                                  and                                         from               !</p>', 2, '1.2|0', '            ', 2500, '000000', 'bronze.png');
INSERT INTO `users_rate_range` VALUES (9, 'us', 300, 'VIP-               3.', '<p>                              at            Global                                      !</p><p>                                     VIP-                               ,                       ,                                                                       <strong>1500             ,</strong>                                         play at                           games                           .</p><p>           for                                           <strong>  2   VIP-            </strong>,                                                                                                                               VIP-              . </p><p>                                      ,                      for                     gambling                        and                                                              .</p><p>                                                  casino Global                for you                                                                                 !</p>', 3, '1.4|0', '              ', 7500, '000000', 'silver.png');
INSERT INTO `users_rate_range` VALUES (10, 'us', 500, 'VIP-               4.', '<p>                              and                                                                                      !</p><p>                                                                      at            Global     VIP-                                 !</p><p>         and       ,                                                                                                                        ,                          ,                                                          5000                           .                                                     ,                                for                                                                           casino.</p><p>                   ,                         and                     2   VIP-            .                         and                           .                                        and                                        VIP-        ,                                          and                                            from casino Global!</p><p>                                        at                                                   ,                          ,                                                          .               ,                                           !</p>', 4, '1.6|0', '            ', 15000, '000000', 'gold.png');
INSERT INTO `users_rate_range` VALUES (11, 'us', 1000, 'VIP-               5.', '<p>                                      ,                                                          at casino Global!</p><p>                                                                                                                    !</p><p>                           and                                                                                             club.                                                                      and                     ,                                              15000             . </p><p>                                        at casino Global                                             ,                                                                                   and                and,               ,                                                   ! </p><p>                2   VIP-                                                                                       for                                        ,                              , VIP-              .                                                                   -                                            and                          -                       !</p>', 5, '1.8|0', '              ', 30000, '000000', 'platinum.png');
INSERT INTO `users_rate_range` VALUES (12, 'us', 3000, 'VIP-               6.', '<p>                    ! </p><p>                                                    casino Global,                                                                      VIP-                                       ! </p><p>                                                                                                                         at          50 000             .                      ,               ,            ,                  for                                                                  casino Global,                                    ,                                                                           at                                  . </p><p>                                      ,                                                       ,                                       !</p><p>                                                                                      and                                          and             ,                                                                                                  ! </p>', 6, '2|0', '          ', 100000, '000000', 'diamond.png');
INSERT INTO `users_rate_range` VALUES (13, 'fr', 0, 'VIP-               1.', '<p>             casino Global                                !</p><p>                                                                         ,                                      club Global, Where                the best slots from                                            .                                                                                                                  ,                              at                                  ,                      for                                                          ,              VIP-        .</p><p>                                                                     VIP-            .                                                                                                                    and             ,                     at casino Global                                        and                     !</p><p>                        and                                  !</p>', 1, '1|0', '              ', 0, '000000', 'newbie.png');
INSERT INTO `users_rate_range` VALUES (14, 'fr', 100, 'VIP-               2.', '<p>                                                                                        at            Global                             VIP-                             .</p><p>                                            ,                             ,                         at                and                   .        and                                   ,                from casino Global               :</p><ul><li>500                           ,</li><li>                           2   VIP-            .</li></ul><p>                                at                                                                                               .                                                                           at                                             ,                                                                                    for                                                       , Where                                                  and                                         from               !</p>', 2, '1.2|0', '            ', 2500, '000000', 'bronze.png');
INSERT INTO `users_rate_range` VALUES (15, 'fr', 300, 'VIP-               3.', '<p>                              at            Global                                      !</p><p>                                     VIP-                               ,                       ,                                                                       <strong>1500             ,</strong>                                         play at                           games                           .</p><p>           for                                           <strong>  2   VIP-            </strong>,                                                                                                                               VIP-              . </p><p>                                      ,                      for                     gambling                        and                                                              .</p><p>                                                  casino Global                for you                                                                                 !</p>', 3, '1.4|0', '              ', 7500, '000000', 'silver.png');
INSERT INTO `users_rate_range` VALUES (16, 'fr', 500, 'VIP-               4.', '<p>                              and                                                                                      !</p><p>                                                                      at            Global     VIP-                                 !</p><p>         and       ,                                                                                                                        ,                          ,                                                          5000                           .                                                     ,                                for                                                                           casino.</p><p>                   ,                         and                     2   VIP-            .                         and                           .                                        and                                        VIP-        ,                                          and                                            from casino Global!</p><p>                                        at                                                   ,                          ,                                                          .               ,                                           !</p>', 4, '1.6|0', '            ', 15000, '000000', 'gold.png');
INSERT INTO `users_rate_range` VALUES (17, 'fr', 1000, 'VIP-               5.', '<p>                                      ,                                                          at casino Global!</p><p>                                                                                                                    !</p><p>                           and                                                                                             club.                                                                      and                     ,                                              15000             . </p><p>                                        at casino Global                                             ,                                                                                   and                and,               ,                                                   ! </p><p>                2   VIP-                                                                                       for                                        ,                              , VIP-              .                                                                   -                                            and                          -                       !</p>', 5, '1.8|0', '              ', 30000, '000000', 'platinum.png');
INSERT INTO `users_rate_range` VALUES (18, 'fr', 3000, 'VIP-               6.', '<p>                    ! </p><p>                                                    casino Global,                                                                      VIP-                                       ! </p><p>                                                                                                                         at          50 000             .                      ,               ,            ,                  for                                                                  casino Global,                                    ,                                                                           at                                  . </p><p>                                      ,                                                       ,                                       !</p><p>                                                                                      and                                          and             ,                                                                                                  ! </p>', 6, '2|0', '          ', 100000, '000000', 'diamond.png');
INSERT INTO `users_rate_range` VALUES (19, 'es', 0, 'VIP-               1.', '<p>             casino Global                                !</p><p>                                                                         ,                                      club Global, Where                the best slots from                                            .                                                                                                                  ,                              at                                  ,                      for                                                          ,              VIP-        .</p><p>                                                                     VIP-            .                                                                                                                    and             ,                     at casino Global                                        and                     !</p><p>                        and                                  !</p>', 1, '1|0', '              ', 0, '000000', 'newbie.png');
INSERT INTO `users_rate_range` VALUES (20, 'es', 100, 'VIP-               2.', '<p>                                                                                        at            Global                             VIP-                             .</p><p>                                            ,                             ,                         at                and                   .        and                                   ,                from casino Global               :</p><ul><li>500                           ,</li><li>                           2   VIP-            .</li></ul><p>                                at                                                                                               .                                                                           at                                             ,                                                                                    for                                                       , Where                                                  and                                         from               !</p>', 2, '1.2|0', '            ', 2500, '000000', 'bronze.png');
INSERT INTO `users_rate_range` VALUES (21, 'es', 300, 'VIP-               3.', '<p>                              at            Global                                      !</p><p>                                     VIP-                               ,                       ,                                                                       <strong>1500             ,</strong>                                         play at                           games                           .</p><p>           for                                           <strong>  2   VIP-            </strong>,                                                                                                                               VIP-              . </p><p>                                      ,                      for                     gambling                        and                                                              .</p><p>                                                  casino Global                for you                                                                                 !</p>', 3, '1.4|0', '              ', 7500, '000000', 'silver.png');
INSERT INTO `users_rate_range` VALUES (22, 'es', 500, 'VIP-               4.', '<p>                              and                                                                                      !</p><p>                                                                      at            Global     VIP-                                 !</p><p>         and       ,                                                                                                                        ,                          ,                                                          5000                           .                                                     ,                                for                                                                           casino.</p><p>                   ,                         and                     2   VIP-            .                         and                           .                                        and                                        VIP-        ,                                          and                                            from casino Global!</p><p>                                        at                                                   ,                          ,                                                          .               ,                                           !</p>', 4, '1.6|0', '            ', 15000, '000000', 'gold.png');
INSERT INTO `users_rate_range` VALUES (23, 'es', 1000, 'VIP-               5.', '<p>                                      ,                                                          at casino Global!</p><p>                                                                                                                    !</p><p>                           and                                                                                             club.                                                                      and                     ,                                              15000             . </p><p>                                        at casino Global                                             ,                                                                                   and                and,               ,                                                   ! </p><p>                2   VIP-                                                                                       for                                        ,                              , VIP-              .                                                                   -                                            and                          -                       !</p>', 5, '1.8|0', '              ', 30000, '000000', 'platinum.png');
INSERT INTO `users_rate_range` VALUES (24, 'es', 3000, 'VIP-               6.', '<p>                    ! </p><p>                                                    casino Global,                                                                      VIP-                                       ! </p><p>                                                                                                                         at          50 000             .                      ,               ,            ,                  for                                                                  casino Global,                                    ,                                                                           at                                  . </p><p>                                      ,                                                       ,                                       !</p><p>                                                                                      and                                          and             ,                                                                                                  ! </p>', 6, '2|0', '          ', 100000, '000000', 'diamond.png');

-- ----------------------------
-- Table structure for users_tmp
-- ----------------------------
DROP TABLE IF EXISTS `users_tmp`;
CREATE TABLE `users_tmp`  (
  `sid` char(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `demobalance` decimal(14, 2) NULL DEFAULT 0.00,
  `bonus_data` decimal(14, 2) NULL DEFAULT 0.00,
  `balance_bonus` decimal(14, 2) NULL DEFAULT 0.00,
  `reg_time` int(10) NOT NULL DEFAULT 0,
  `go_time` int(10) NOT NULL DEFAULT 0,
  `ip` char(15) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0',
  `useragent` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `os` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `last_ge` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'root',
  `action` int(2) NOT NULL DEFAULT 0,
  `comment` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `graf_kind` enum('low','medium','high') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'high',
  `denomination` decimal(5, 2) NOT NULL DEFAULT 1.00,
  `spin_bank` decimal(13, 3) NULL DEFAULT 0.000,
  `bonus_bank` decimal(13, 3) NULL DEFAULT 0.000,
  `sound` int(1) NULL DEFAULT 1,
  `payed_spins` int(11) NOT NULL DEFAULT 0,
  `curspin` int(5) NOT NULL DEFAULT 0,
  `garant` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `curspin_bonus` int(5) NOT NULL DEFAULT 0,
  `garant_bonus` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `payin` decimal(12, 2) NULL DEFAULT 0.00,
  PRIMARY KEY (`sid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users_tmp
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
