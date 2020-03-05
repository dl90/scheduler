const mysql = require("mysql")

// db creds
const conn = mysql.createConnection({
  host: "192.168.55.10",
  user: "root",
  password: "root",
  database: "sampoll"
});

// establish connection
function connect (callback) {
  conn.connect(function (err) {
    callback(err)
  });
};

// get meeting with name
function getMeetings(callback, name) {
  conn.query(`
  SELECT detail FROM meetings
  JOIN users
  ON meetings.user_id = users.id
  WHERE users.username = "${name}"
  `, callback)
};

// meeting_obj = {
//   user_id: 1,
//   start_time: null,
//   end_time: null,
//   detail: "New test meeting"
// }
function addMeeting(callback, meeting_obj) {
  conn.query(`
  INSERT INTO meetings (user_id, start_time, end_time, detail)
  VALUES
  (${meeting_obj.user_id}, ${meeting_obj.start_time}, ${meeting_obj.end_time}, ${meeting_obj.detail})
  `, callback)
};

// get user info
function getUserInfo(callback, name) {
  conn.query(`
  SELECT * FROM users
  WHERE user.username = "${name}"
  `, callback);
};

// exports.getMeetings = getMeetings;
module.exports = { connect, getMeetings, getUserInfo, addMeeting }