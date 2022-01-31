const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  updatedAt: {
    type: Date,
    default: () => new Date(),
  },
})

UserSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "owner",
})

module.exports = mongoose.model("User", UserSchema)
