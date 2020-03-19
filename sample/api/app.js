const express = require('express');
const app = express();

module.exports = function (db) {

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  // app.set('view engine', 'ejs')

  app.get('/api/v1/user/:id', (req, res) => {
    db.getUser((err, user) => {
      if (err) {
        res.send("Error: " + err.message)
      } else {
        res.status(200).send(user);
      }
    }, req.params.id)
  })

  // Not a good idea to manually set id
  app.post('/api/v1/user/', (req, res) => {
    db.createUser((err, status) => {
      if (err) {
        res.send("Error: " + err.message)
      } else {

        res.status(200).send(status);
      }
    }, req.params.id, req.params.username )
  })



  // app.get('/api/messages', (req, res) => {
  //   db.getMessages(function (err, message) {
  //     if (err) {
  //       res.sendStatus(500);
  //     } else {
  //       res.status(200).json(message);
  //     }
  //   })
  // })

  // app.get('/messages', (req, res) => {
  //   db.getMessages((err, messages) => {
  //     if (err) {
  //       // Handle the error case, maybe use an error.ejs file or something
  //       res.render('error');
  //       return
  //     }
  //     res.render('messages', { messages });
  //   })
  // })

  // app.get('/test', (req, res) => {
  //   res.status(200).send("TEST OK");
  // });

  return app
}