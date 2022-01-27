const mongoose = require("mongoose")

const postsSchema = new mongoose.Schema({
  postId: mongoose.SchemaTypes.ObjectId,
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
    minlength: 5,
    maxlength: 10,
  },
  author: {
    type: String,
    required: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
})

postsSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

module.exports = mongoose.model("Posts", postsSchema)
