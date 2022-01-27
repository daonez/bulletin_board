const mongoose = require("mongoose")

const connect = () => {
  mongoose.connect(
    "mongodb://13.125.234.195:27017/nodejsw1",
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
