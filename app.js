const express = require('express');
const app = express();

module.exports = function (db) {

  app.use(express.json()) // for parsing application/json
  app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
  app.set('view engine', 'ejs')

  app.get('/', (req, res) => {
    // db.getMessages(function (x, message) {
    //   res.status(200).send(message);
    // });
    res.status(200).send("Homepage")
  });

  app.get('/api/messages', (req, res) => {
    // db.getMessages(console.log)
    db.getMessages(function (err, message) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.status(200).json(message);
      }
    })
  })

  app.get('/messages', (req, res) => {
    db.getMessages((err, messages) => {
      if (err) {
        // Handle the error case, maybe use an error.ejs file or something
        res.render('error');
        return
      }
      res.render('messages', { messages });
    })
  })

  app.get('/test', (req, res) => {
    res.status(200).send("TEST OK");
  });

  return app
}