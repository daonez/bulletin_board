const mongoose = require("mongoose")

const postsSchema = mongoose.Schema({
  postId: mongoose.SchemaTypes.ObjectId,
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
})

module.exports = mongoose.model("Posts", postsSchema)
