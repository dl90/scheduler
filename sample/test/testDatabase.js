const messages = [
  {
    id: "1",
    content: "test message",
    username: "test user",
    avatarImage: "test.png"
  }
]

function getMessages(callback) {
  setTimeout(() => {
    if (exports.shouldFail) {
      callback(Error("🤷‍♂️"));
      return
    } else {
      callback(null, messages);
    }
  }, 0)
}

exports.shouldFail = false
exports.messages = messages
exports.getMessages = getMessages