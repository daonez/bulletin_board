const mongoose = require("mongoose")

const connect = () => {
  mongoose.connect(
    "mongodb://test:test@localhost:27017/nodejsw1",
    { ignoreUndefined: true },
    (error) => {
      if (error) {
        console.log("mongodb error", error)
      } else {
        console.log("connected")
      }
    }
  )
}

module.exports = connect
