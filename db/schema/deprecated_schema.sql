DROP DATABASE IF EXISTS sampoll;
CREATE DATABASE sampoll;
ALTER DATABASE sampoll CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

USE sampoll;

-- DROP TABLE IF EXISTS SurveyAnswer;
-- DROP TABLE IF EXISTS SurveyQuestion;
-- DROP TABLE IF EXISTS SurveySettings;
-- DROP TABLE IF EXISTS Survey;
-- DROP TABLE IF EXISTS SurveyList;
-- DROP TABLE IF EXISTS SurveyParticipantList;
-- DROP TABLE IF EXISTS Contact;
-- DROP TABLE IF EXISTS Booking;
-- DROP TABLE IF EXISTS `Availability`;
-- DROP TABLE IF EXISTS Calendar;
-- DROP TABLE IF EXISTS ContactList;
-- DROP TABLE IF EXISTS ScheduledMeetings;
-- DROP TABLE IF EXISTS Meeting;
-- DROP TABLE IF EXISTS Settings;
-- DROP TABLE IF EXISTS UserDetails;
-- DROP TABLE IF EXISTS UserAuthenticationHistory;
-- DROP TABLE IF EXISTS UserAuthentication;
-- DROP TABLE IF EXISTS User;


CREATE TABLE User (
  id                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  `username`              VARCHAR(255) UNIQUE NOT NULL,
  `password`              VARCHAR(255) NOT NULL,
  `creation_time`         TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE ScheduledMeetings (
  `id`                INTEGER PRIMARY KEY AUTO_INCREMENT,
  `user_id`           INTEGER,
  `meetingDate`       DATE,
  `meetingTime`       TIME,
  `number_of_people`  INTEGER
);

CREATE TABLE Meeting (
  `user_id`               INTEGER NOT NULL,
  `scheduled_meeting_id`  INTEGER NOT NULL,

  CONSTRAINT Meeting_PK                   -- the name of the PK constraint
    PRIMARY KEY (user_id, scheduled_meeting_id),

  CONSTRAINT User_Meeting_FK             -- the name of the FK constraint
    FOREIGN KEY (user_id) 
    REFERENCES User (id)
      ON UPDATE CASCADE                  -- the actions of the FK
      ON DELETE CASCADE,

  CONSTRAINT Scheduled_Meeting_FK        -- second FK
    FOREIGN KEY (scheduled_meeting_id) 
    REFERENCES ScheduledMeetings (id)
      ON UPDATE CASCADE
      ON DELETE RESTRICT
);

CREATE TABLE UserDetails (
  `id`                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  `user_id`                 INTEGER,
  `user_first_name` varchar(255),
  `user_last_name` varchar(255),
  `email` varchar(255) UNIQUE NOT NULL,
  `user_credit_card_number` INTEGER,
  `user_subscription_tir`   INTEGER
);

-- CREATE TABLE UserAuthentication (
--   `id`                            INTEGER PRIMARY KEY AUTO_INCREMENT,
--   `timestamp`                     TIMESTAMP,
--   `user_id`                       INTEGER NOT NULL,
--   `user_session`                  VARCHAR(255),
--   `user_cookie`                   VARCHAR(255)
-- );

CREATE TABLE UserAuthenticationHistory (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id`                  INTEGER NOT NULL,
  `user_authentication_id`   INTEGER,
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

CREATE TABLE Contact (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `email` varchar(255),
  `note` varchar(255)
);

CREATE TABLE ContactList (
  `id`          INTEGER PRIMARY KEY AUTO_INCREMENT,
  `user_id`     INTEGER,
  `contact_id`  INTEGER
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
  `answer_id` varchar(255)
);

CREATE TABLE SurveyParticipantList (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` INTEGER,
  `survey_id` int,
  `contact_id` int
);

CREATE TABLE SurveyQuestion (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `creation_time` timestamp DEFAULT NOW(),
  `type` VARCHAR(255),
  `question` varchar(255),
  survey_id INTEGER NOT NULL
);

CREATE TABLE SurveyAnswer (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `creation_time` timestamp,
  `type` int,
  `user_id`             INTEGER NOT NULL,
  `survey_question_id`    INTEGER NOT NULL,
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
ALTER TABLE `Settings` ADD FOREIGN KEY (user_id) REFERENCES `User` (id) ON DELETE CASCADE;
ALTER TABLE `ContactList` ADD FOREIGN KEY (contact_id) REFERENCES `Contact` (id) ON DELETE SET NULL;
ALTER TABLE `ContactList` ADD FOREIGN KEY (user_id) REFERENCES `User` (id) ON DELETE CASCADE;
ALTER TABLE `Booking` ADD FOREIGN KEY (contact_id) REFERENCES `ContactList` (id) ON DELETE CASCADE;
ALTER TABLE `SurveyParticipantList` ADD FOREIGN KEY (contact_id) REFERENCES `ContactList` (id) ON DELETE SET NULL;
ALTER TABLE `SurveyList` ADD FOREIGN KEY (survey_id) REFERENCES `Survey` (id) ON DELETE CASCADE;
ALTER TABLE `SurveyList` ADD FOREIGN KEY (user_id) REFERENCES `User` (id) ON DELETE CASCADE;
ALTER TABLE `SurveyQuestion` ADD FOREIGN KEY (survey_id) REFERENCES `Survey` (id) ON DELETE CASCADE;
ALTER TABLE `SurveyAnswer` ADD FOREIGN KEY (survey_question_id) REFERENCES `SurveyQuestion` (id) ON DELETE CASCADE;
ALTER TABLE `UserDetails` ADD FOREIGN KEY (user_id) REFERENCES `User` (id) ON DELETE CASCADE;
ALTER TABLE `UserAuthentication` ADD FOREIGN KEY (user_id) REFERENCES `User`(id) ON DELETE CASCADE;
ALTER TABLE `UserAuthenticationHistory` ADD FOREIGN KEY (user_authentication_id) REFERENCES `UserAuthentication` (id) ON DELETE SET NULL;
ALTER TABLE `SurveySettings` ADD FOREIGN KEY (survey_id) REFERENCES `Survey` (id) ON DELETE CASCADE;
ALTER TABLE `Calendar` ADD FOREIGN KEY (user_id) REFERENCES `User` (id) ON DELETE CASCADE;
ALTER TABLE `Calendar` ADD FOREIGN KEY (availability_id) REFERENCES `Availability` (id) ON DELETE SET NULL;
ALTER TABLE `Availability` ADD FOREIGN KEY (booking_id) REFERENCES `Booking` (id) ON DELETE CASCADE;
ALTER TABLE `SurveyParticipantList` ADD FOREIGN KEY (survey_id) REFERENCES `Survey` (id) ON DELETE CASCADE;
