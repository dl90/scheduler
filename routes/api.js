const express = require("express"),
  router = express.Router();

module.exports = function (db) {
  // checks for jwt verification problems
  const problemChecker = res => {
    if (res.problem) {
      res.render("pages/error", { msg: res.problem });
      return;
    }
  };

  const undefinedChecker = arg => {
    if (arg !== undefined && arg !== null) {
      return arg;
    } else {
      return "n/a"
    }
  };

  // get all meetings by user
  router.get("/meetings", (req, res, next) => {
    problemChecker(res);
    const user = req.payload.username; // username from jwt
    db.getMeetingsByUser((err, meetings) => {
      if (err) {
        res.render("pages/error", { msg: "Database error" });
      } else {
        res.send(meetings);
      }
    }, user);
  });

  // single meeting by id not used for now ***
  router.get("/meeting", (req, res) => {
    console.log(req.body); // parse specific meeting id
    const id = 1;

    db.getMeetingById((err, meeting) => {
      if (err) {
        res.render("pages/error", { msg: "Database error" });
      } else {
        res.send(meeting);
      }
    }, id);
  });

  // meeting_obj = { user_id: 1, start_time: null, end_time: null, detail: "New test meeting" }
  router.post("/new_meeting", (req, res) => {
    problemChecker(res);
    const username = req.payload.username;
    db.getUserID((err, id) => {
      if (err) {
        res.render("pages/error", { msg: "Database error" });
      } else {
        if (id[0].id > 0) {
          const start_time = undefinedChecker(req.body.start_time),
            end_time = undefinedChecker(req.body.end_time),
            detail = undefinedChecker(req.body.detail),
            meeting_obj = {
              user_id: id[0].id,
              start_time,
              end_time,
              detail
            };

          db.addMeeting((err, result) => {
            if (err) {
              res.render("pages/error", { msg: "Database error" });
            } else {
              res.send("Meeting added" + result.insertId);
            }
          }, meeting_obj);
        }
      }
    }, username)
  });

  router.post("/update_meeting", (req, res) => {
    console.log(req.body); // parse meeting_obj from req
    const meeting_obj = {
      id: 1, // must have
      user_id: 1, // ensure meeting belongs to user (can fk be changed?)
      start_time: null,
      end_time: null,
      details: "Test Meeting" // must have
    };

    db.updateMeeting((err, result) => {
      if (err) {
        res.render("pages/error", { msg: "Database error" });
      } else {
        res.send("Updated " + result.affectedRows + " rows");
      }
    }, meeting_obj);
  });

  router.post("/delete_meeting", (req, res) => {
    console.log(req.body); // parse meeting_id from req
    const id = 1;

    db.deleteMeeting((err, result) => {
      if (err) {
        res.render("pages/error", { msg: "Database error" });
      } else {
        res.send("Deleted " + result.affectedRows + " rows");
      }
    }, id);
  });

  return router;
};
