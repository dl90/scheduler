require("dotenv").config();
const mysql = require("mysql"),
  conn = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_pw,
    database: process.env.db_db
  });

function connect(callback) {
  conn.connect(function (err) {
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
    "SELECT meetings.id, `detail`, `start_time`, `end_time`, `contacts` FROM `meetings` JOIN `users` ON meetings.user_id = users.id WHERE users.username = ?";
  conn.query(query, [username], callback);
}

// meeting id (may not use) ***
function getMeetingById(callback, meeting_id) {
  const query =
    "SELECT `detail`, `start_time`, `end_time` FROM `meetings` WHERE `id` = ?";
  conn.query(query, [meeting_id], callback);
}

function addMeeting(callback, meeting_obj) {
  const query = "INSERT INTO `meetings` SET ?";
  console.log(meeting_obj)
  conn.query(query, meeting_obj, callback);
}

function updateMeeting(callback, meeting_obj) {
  if (meeting_obj.detail.trim().length > 0) {
    const query = "UPDATE `meetings` SET ? WHERE `id` = ?";
    conn.query(query, [meeting_obj, meeting_obj.id], callback);
  }
}

function deleteMeeting(callback, meeting_id) {
  const query = "DELETE FROM `meetings` WHERE `id` = ?";
  conn.query(query, [meeting_id], callback);
}

// ---------------------------------- // contacts
function createContact(callback, user_id, first_name, last_name, email) {
  const contact = { user_id, first_name, last_name, email }
  const query = "INSERT INTO `contacts` SET ?";
  conn.query(query, contact, callback);
}

function getContactsByUsername(callback, username) {
  const query = "SELECT contacts.id, contacts.first_name, contacts.last_name, contacts.email FROM `contacts` JOIN `users` ON contacts.user_id = users.id WHERE users.username = ?";
  conn.query(query, username, callback)
}

function updateContactById(callback, contact_obj, contact_id) {
  const query = "UPDATE `contacts` SET ? WHERE `id` = ?";
  conn.query(query, [contact_obj, contact_id], callback);
}

function deleteContactByID(callback, contact_id) {
  const query = "DELETE FROM `contacts` WHERE `id` = ?";
  conn.query(query, [contact_id], callback);
}

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
  deleteMeeting,
  createContact,
  getContactsByUsername,
  updateContactById,
  deleteContactByID
};
