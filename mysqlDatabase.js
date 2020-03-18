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
    console.log("Connected to DB");
  });
};

// ---------------------------------- //

// get username
function getUser(callback, username) {
  const query = "SELECT `username` FROM `users` WHERE `username` = ?";
  conn.query(query, [username], callback);
}

// get password
function getPassword(callback, username) {
  const query = "SELECT `password` FROM `users` WHERE `username` = ?";
  conn.query(query, [username], callback);
}

// create new user
function createUser(callback, username, password, email) {
  const query = "INSERT INTO `users` (`username`, `password`, `email`) VALUES ( ?, ?, ?)";
  conn.query(query, [username, password, email], callback);
}

// get meeting with username
function getMeetings(callback, username) {
  const query = "SELECT `detail`, `start_time`, `end_time` FROM `meetings` JOIN `users` ON meetings.user_id = users.id WHERE users.username = ?";
  conn.query(query, [username], callback);
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

module.exports = { connect, getUser, getPassword, createUser, getMeetings, getUserInfo, addMeeting }
