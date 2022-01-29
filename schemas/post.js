const mongoose = require("mongoose")

const postsSchema = new mongoose.Schema({
  postNum: {
    type: Number,
  },

  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
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

postsSchema.pre("save", function (next) {
  this.updatedAt = Date.now()

  next()
})

postsSchema.virtual("userId").get(function () {
  return this._id.toHexString()
})
postsSchema.set("toJSON", {
  virtuals: true,
})

module.exports = mongoose.model("Posts", postsSchema)
