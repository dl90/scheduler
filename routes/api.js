const express = require("express");
const router = express.Router();

module.exports = function(db) {
  // all meetings by user
  router.get("/meetings", (req, res, next) => {
    const user = req.payload.username; // username from jwt
    db.getMeetingsByUser((err, meetings) => {
      if (err) {
        res.render("pages/error", { msg: "Database error" });
      } else {
        res.send(meetings);
      }
    }, user); // hard-coded user for now
  });

  // single meeting by id not used for now
  // router.get("/meeting", (req, res) => {
  //   console.log(req.body); // parse specific meeting id
  //   const id = 1;

  //   db.getMeetingById((err, meeting) => {
  //     if (err) {
  //       res.render("pages/error", { msg: "Database error" });
  //     } else {
  //       res.send(meeting);
  //     }
  //   }, id);
  // });

  // meeting_obj = { user_id: 1, start_time: null, end_time: null, detail: "New test meeting" }
  router.post("/new_meeting", (req, res) => {
    console.log(req.body); // parse meeting_obj from req
    const meeting_obj = {
      user_id: 1, // must have
      start_time: null,
      end_time: null,
      details: "Test Meeting" // must have
    };

    db.addMeeting((err, result) => {
      if (err) {
        res.render("pages/error", { msg: "Database error" });
      } else {
        res.send("Meeting added" + result.insertId);
      }
    }, meeting_obj);
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
