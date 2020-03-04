// users
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

// meetings
const meetings = [
  {
    id: 123,
    user_id: 1,
    start_time: Date(2020, 4, 1, 8, 30),
    end_time: Date(2020, 4, 1, 10, 30),
    details: "April Fools!"
  },
  {
    id: 124,
    user_id: 2,
    start_time: Date(2020, 4, 2, 8, 30),
    end_time: Date(2020, 4, 2, 10, 30),
    details: "Fools!"
  }
]

// contacts
const contacts = [
  {
    id: 11,
    user_id: 1,
    first_name: "test",
    last_name: "test",
    email: "test1@test.com"
  },
  {
    id: 12,
    user_id: 2,
    first_name: "test",
    last_name: "test",
    email: "tes2t@test.com"
  }
]

function getUser(callback, id) {
  setTimeout(() => {
    if (exports.shouldFail) {
      callback(Error("🤷‍♂️"));
      return
    } else {
      const user = users.find(user => {
        if (user.id === parseInt(id)) {
          return user
        }
      })
      if (user) {
        callback(null, user);
        return
      } else {
        callback(Error("None found"));
      }
    }
  }, 0)
}

function createUser(callback, id, username, creation_time = Date.now(), email, subscription = 1) {
  setTimeout(() => {
    if (exports.shouldFail) {
      callback(Error("🤷‍♂️"));
      return
    } else {
      const user = users.find(user => {
        user.id === parseInt(id)
        return user
      })

      if (!user) {
        const newUser = {
          id: id,
          username: username,
          creation_time: creation_time,
          email: email,
          subscription: subscription
        }
        users.push(newUser);
        callback(null, { status: "USER CREATED" });
      } else {
        callback(Error("Create failed"));
      }
    }
  }, 0)
}

function deleteUser(callback, id) {
  setTimeout(() => {
    if (exports.shouldFail) {
      callback(Error("🤷‍♂️"));
      return
    } else {
      const user = users.find(user => {
        user.id === parseInt(id)
        return user
      })

      userIndex = users.indexOf(user);
      if (user) {
        users.splice(userIndex, 1);
        callback(null, { status: "DELETE SUCCESS" });
      } else {
        callback(Error("Delete failed"))
      }
    }
  }, 0)
}

exports.shouldFail = false

exports.getUser = getUser
exports.createUser = createUser
exports.deleteUser = deleteUser