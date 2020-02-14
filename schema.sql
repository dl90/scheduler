DROP DATABASE IF EXISTS sampoll;
CREATE DATABASE sampoll;
ALTER DATABASE sampoll CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

USE sampoll;

DROP TABLE IF EXISTS SurveyAnswer;
DROP TABLE IF EXISTS SurveyQuestion;
DROP TABLE IF EXISTS SurveySettings;
DROP TABLE IF EXISTS Survey;
DROP TABLE IF EXISTS SurveyList;
DROP TABLE IF EXISTS SurveyParticipantList;
DROP TABLE IF EXISTS Contact;
DROP TABLE IF EXISTS Booking;
DROP TABLE IF EXISTS `Availability`;
DROP TABLE IF EXISTS Calendar;
DROP TABLE IF EXISTS ContactList;
DROP TABLE IF EXISTS ScheduledMeetings;
DROP TABLE IF EXISTS Meeting;
DROP TABLE IF EXISTS Settings;
DROP TABLE IF EXISTS UserDetails;
DROP TABLE IF EXISTS UserAuthenticationHistory;
DROP TABLE IF EXISTS UserAuthentication;
DROP TABLE IF EXISTS User;


CREATE TABLE User (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `creation_time` timestamp NOT NULL,
  `contact_list_id` int,
  `survey_list_id` int
);

CREATE TABLE ScheduledMeetings (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `meetingDate` date,
  `meetingTime` time,
  `number_of_people` int
);

CREATE TABLE Meeting (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `scheduledMeeting_id` int
);

CREATE TABLE UserDetails (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `user_first_name` varchar(255),
  `user_last_name` varchar(255),
  `email` varchar(255) UNIQUE NOT NULL,
  `user_credit_card_number` int,
  `user_subscription_tir` int
);

CREATE TABLE UserAuthentication (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `timestamp` timestamp,
  `user_id` int,
  `user_session` varchar(255),
  `user_cookie` varchar(255),
  `authentication_history_id` int
);

CREATE TABLE UserAuthenticationHistory (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `user_ip` varchar(255),
  `timestamp` timestamp
);

CREATE TABLE Settings (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `language` varchar(255),
  `country` varchar(255),
  `time_zone` int,
  `notification` varchar(255),
  `linked_account` varchar(255),
  `subscription` varchar(255)
);

CREATE TABLE ContactList (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `contact_id` int
);

CREATE TABLE Contact (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `email` varchar(255),
  `note` varchar(255)
);

CREATE TABLE SurveyList (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `survey_id` int
);

CREATE TABLE Survey (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `creation_time` timestamp,
  `title` varchar(255),
  `type` int,
  `location` varchar(255),
  `note` varchar(255),
  `participant_list_id` int,
  `question_id` varchar(255),
  `answer_id` varchar(255)
);

CREATE TABLE SurveyParticipantList (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `survey_id` int,
  `contact_id` int
);

CREATE TABLE SurveyQuestion (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `creation_time` timestamp,
  `type` int,
  `question` varchar(255)
);

CREATE TABLE SurveyAnswer (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `creation_time` timestamp,
  `type` int,
  `user_id` varchar(255),
  `answer` varchar(255)
);

CREATE TABLE SurveySettings (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `survey_id` int,
  `duration` datetime,
  `number_of_answers` int
);

CREATE TABLE Calendar (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `date` date,
  `availability_id` int
);

CREATE TABLE Booking (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `contact_id` int,
  `date` date,
  `time` time,
  `duration` time
);

CREATE TABLE `Availability` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `schedule` datetime,
  `date` date,
  `time` time,
  `booking_id` int
);

ALTER TABLE `Meeting` ADD FOREIGN KEY (user_id) REFERENCES `User`(id) ON DELETE CASCADE;
ALTER TABLE `Meeting` ADD FOREIGN KEY (scheduledMeeting_id) REFERENCES `ScheduledMeetings` (id) ON DELETE CASCADE;
ALTER TABLE `User` ADD FOREIGN KEY (id) REFERENCES `ScheduledMeetings` (id) ON DELETE CASCADE;
ALTER TABLE `Settings` ADD FOREIGN KEY (user_id) REFERENCES `User` (id) ON DELETE CASCADE;
ALTER TABLE `Contact` ADD FOREIGN KEY (id) REFERENCES `ContactList` (contact_id) ON DELETE CASCADE;
ALTER TABLE `SurveyList` ADD FOREIGN KEY (survey_id) REFERENCES `Survey` (id) ON DELETE CASCADE;
ALTER TABLE `SurveyList` ADD FOREIGN KEY (id) REFERENCES `User` (survey_list_id) ON DELETE CASCADE;
ALTER TABLE `ContactList` ADD FOREIGN KEY (user_id) REFERENCES `User` (contact_list_id) ON DELETE CASCADE;
ALTER TABLE `SurveyQuestion` ADD FOREIGN KEY (id) REFERENCES `Survey` (question_id) ON DELETE CASCADE;
ALTER TABLE `SurveyAnswer` ADD FOREIGN KEY (id) REFERENCES `Survey` (answer_id) ON DELETE CASCADE;
ALTER TABLE `ContactList` ADD FOREIGN KEY (contact_id) REFERENCES `SurveyParticipantList` (contact_id) ON DELETE CASCADE;
ALTER TABLE `User` ADD FOREIGN KEY (id) REFERENCES `UserDetails` (user_id) ON DELETE CASCADE;
ALTER TABLE `User` ADD FOREIGN KEY (id) REFERENCES `UserAuthentication` (user_id) ON DELETE CASCADE;
ALTER TABLE `UserAuthenticationHistory` ADD FOREIGN KEY (id) REFERENCES `UserAuthentication` (authentication_history_id) ON DELETE CASCADE;
ALTER TABLE `Survey` ADD FOREIGN KEY (id) REFERENCES `SurveySettings` (survey_id) ON DELETE CASCADE;
ALTER TABLE `User` ADD FOREIGN KEY (id) REFERENCES `Calendar` (user_id) ON DELETE CASCADE;
ALTER TABLE `ContactList` ADD FOREIGN KEY (contact_id) REFERENCES `Booking` (contact_id) ON DELETE CASCADE;
ALTER TABLE `Calendar` ADD FOREIGN KEY (availability_id) REFERENCES `Availability` (id) ON DELETE CASCADE;
ALTER TABLE `Booking` ADD FOREIGN KEY (id) REFERENCES `Availability` (booking_id) ON DELETE CASCADE;
ALTER TABLE `Survey` ADD FOREIGN KEY (participant_list_id) REFERENCES `SurveyParticipantList` (survey_id) ON DELETE CASCADE;