const mongoose = require("mongoose")

const commentsSchema = new mongoose.Schema({
  comment_id: {
    type: String,
    default: mongoose.Types.ObjectId,
  },
  comment: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  updatedAt: {
    type: Date,
    default: () => new Date(),
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Post",
  },
})

commentsSchema.virtual("comments", {
  // 레퍼런스 글쓰기 , _id를 기준으로 주인확인
  ref: "User",
  localField: "_id",
  foreignField: "owner",
})
commentsSchema.virtual("comments", {
  // 레퍼런스 글쓰기 , _id를 기준으로 주인확인
  ref: "Post",
  localField: "post",
  foreignField: "_id",
})

const Comments = mongoose.model("Comments", commentsSchema)
module.exports = Comments
