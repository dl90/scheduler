require("dotenv").config();
const mysql = require("mysql");

// db creds
const conn = mysql.createConnection({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_pw,
  database: process.env.db_db
});

// establish connection
function connect(callback) {
  conn.connect(function(err) {
    if (err) {
      callback(err);
    } else {
      console.log("Connected to DB");
    }
  });
}

// ---------------------------------- // auth

function getUser(callback, username) {
  const query = "SELECT `username` FROM `users` WHERE `username` = ?";
  conn.query(query, [username], callback);
}

function getUserID(callback, username) {
  const query = "SELECT `id` FROM `users` WHERE `username` = ?";
  conn.query(query, [username], callback);
}

function getPassword(callback, username) {
  const query = "SELECT `password` FROM `users` WHERE `username` = ?";
  conn.query(query, [username], callback);
}

function createUser(callback, username, password, email) {
  // const query = 'INSERT INTO `users` (`username`, `password`, `email`) VALUES ( ?, ?, ?)';
  // conn.query(query, [username, password, email], callback);

  // MySQL only
  const user = { username, password, email };
  const query_ = "INSERT INTO `users` SET ?";
  conn.query(query_, user, callback);
}

// ---------------------------------- // meeting

function getMeetingsByUser(callback, username) {
  const query =
    "SELECT `detail`, `start_time`, `end_time` FROM `meetings` JOIN `users` ON meetings.user_id = users.id WHERE users.username = ?";
  conn.query(query, [username], callback);
}

// meeting id (may not use)
function getMeetingById(callback, meeting_id) {
  const query =
    "SELECT `detail`, `start_time`, `end_time` FROM `meetings` WHERE `id` = ?";
  conn.query(query, [meeting_id], callback);
}

// meeting_obj = { user_id: 1, start_time: null, end_time: null, detail: "New test meeting" }
function addMeeting(callback, meeting_obj) {
  const query = "INSERT INTO `meetings` SET ?";
  console.log(meeting_obj)
  conn.query(query, meeting_obj, callback);
}

function updateMeeting(callback, meeting_obj) {
  if (meeting_obj.detail.trim().length > 0) {
    const query =
      "UPDATE `meetings` SET `start_time` = ?, `end_time` = ?, `detail` = ? WHERE `id` = ?";
    conn.query(query, meeting_obj, callback);
  }
}

function deleteMeeting(callback, meeting_id) {
  const query = "DELETE FROM `meetings` WHERE `id` = ?";
  conn.query(query, [meeting_id], callback);
}

// ---------------------------------- // contacts

module.exports = {
  connect,
  getUser,
  getUserID,
  getPassword,
  createUser,
  getMeetingsByUser,
  getMeetingById,
  addMeeting,
  updateMeeting,
  deleteMeeting
};
