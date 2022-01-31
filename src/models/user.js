const mongoose = require("mongoose")

const UsersSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
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
