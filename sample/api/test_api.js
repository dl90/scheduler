const express = require('express');
const app = express();

// module.exports = function (db) {

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  // app.set('view engine', 'ejs')

  app.get('/', (req, res) => {
    // db.getMessages(function (x, message) {
    //   res.status(200).send(message);
    // });
    res.status(200).send("Homepage")
  });

  // /channels
  // /channels/1
  // /channels/1/users
  // /channels/1/messages?search=term&channel=1


  const users = [
    {
      id: 1,
      username: "test1",
      creation_time: Date.now(),
      email: "test@test.com",
      subscription: 1
    },
    {
      id: 2,
      username: "test2",
      creation_time: Date.now(),
      email: "test@test.com",
      subscription: 2
    }
  ]

  const meetings = [
    {
      id: 123,
      user_id: 1,
      start_time: Date(2020,4,1,8,30),
      end_time: Date(2020,4,1,10,30),
      details: "April Fools!"
    },
    {
      id: 124,
      user_id: 1,
      start_time: Date(2020,4,2,8,30),
      end_time: Date(2020,4,2,10,30),
      details: "Fools!"
    }
  ]

  // user profile
  app.get('/api/v1/user/:id', (req, res) => {
    const user = users.find( user => {
      user.id === parseInt(req.query.id)
      return user
    })

    if(user) {
      res.status(200).send(user);
    } else {
      res.status(500).send('Error');
    }
  })

  // users meetings
  app.get('/api/v1/users/:username/meetings', (req, res) => {

    const user = users.find( user => {
      user.username === (req.query.username)
      return user
    })

    const met = [];
    for(let meeting of meetings) {
      if(meeting.user_id === user.id) {
        // console.log(user)
        // console.log(meeting)
        met.push(meeting);
      }
    }

    if(met.length > 0) {
      res.status(200).send(met);
    } else {
      res.status(500).send('Error');
    }
  })

  // all users
  app.get('/api/v1/users/', (req, res) => {

  })


  app.get('/api/v1/channels/:id', (req, res) => {
    req.query
    const ch = ch.find(channel => channel.name == req.query.name)
    res.send(db[req.params.id])
  })

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

  // return app
// }

const PORT = 9999;

app.listen(PORT, () => console.log(`Running on : http://localhost:${PORT}`))