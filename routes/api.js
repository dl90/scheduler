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
        res.sendStatus(500);
      } else {
        res.send(meetings);
      }
    }, user);
  });

  // single meeting by id not used for now *** TODO change
  router.get("/meeting", (req, res) => {
    const id = 1;

    db.getMeetingById((err, meeting) => {
      if (err) {
        res.sendStatus(500);
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
        res.sendStatus(500);
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
              res.sendStatus(500);
            } else {
              res.status(200).send(`id: ${result.insertId}`);
            }
          }, meeting_obj);
        } else {
          res.render("pages/error", { msg: "Database error" });
        }
      }
    }, username)
  });

  router.post("/update_meeting", (req, res) => {
    problemChecker(res);
    const username = req.payload.username;
    db.getUserID((err, id) => {
      if (err) {
        res.sendStatus(500);
      } else {
        if (id[0].id > 0) {
          const start_time = undefinedChecker(req.body.start_time),
            end_time = undefinedChecker(req.body.end_time),
            detail = undefinedChecker(req.body.detail),
            meetingId = undefinedChecker(req.body.id),
            meeting_obj = {
              id: meetingId,
              user_id: id[0].id,
              start_time: start_time,
              end_time: end_time,
              detail: detail
            };

          db.updateMeeting((err, result) => {
            if (err) {
              res.sendStatus(500);
            } else {
              res.send("updated " + result.affectedRows + " row");
            }
          }, meeting_obj);
        } else {
          res.render("pages/error", { msg: "Database error" });
        }
      }
    }, username)


  });

  router.post("/delete_meeting", (req, res) => {
    problemChecker(res);
    const id = req.body.id;
    db.deleteMeeting((err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send("Deleted " + result.affectedRows + " rows");
      }
    }, id);
  });

  router.get("/get_contacts", (req, res) => {
    problemChecker(res);
    const username = req.payload.username;
    db.getContactsByUsername((err, contacts) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send(contacts);
      }
    }, username)
  })

  router.post("/new_contact", (req, res) => {
    problemChecker(res);
    const username = req.payload.username;

    db.getUserID((err, id) => {
      if (err) {
        res.sendStatus(500);
      } else {
        if (id[0].id > 0) {
          const { first_name, last_name, email } = req.body
          db.createContact((err, result) => {
            if (err) {
              res.sendStatus(500);
            } else {
              res.sendStatus(200);
            }
          }, id[0].id, first_name, last_name, email)
        }
      }
    }, username)
  });

  router.post("/update_contact", (req, res) => {
    problemChecker(res);
    const { id, first_name, last_name, email } = req.body
    const contact = {
      first_name,
      last_name,
      email
    }
    db.updateContactById((err, r) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }, contact, id)
  })

  router.post("/delete_contact", (req, res) => {
    problemChecker(res);
    const id = req.body.id;
    db.deleteContactByID((err, r) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }, id)
  })

  return router;
};
