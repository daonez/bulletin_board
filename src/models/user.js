const mongoose = require("mongoose")

const UsersSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  updatedAt: {
    type: Date,
    default: () => new Date(),
  },
})

// UserSchema.virtual("posts", {
//   ref: "Post",
//   localField: "_id",
//   foreignField: "owner",
// })

module.exports = mongoose.model("Users", UsersSchema)
