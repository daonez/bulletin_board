const mongoose = require("mongoose")

const commentsSchema = new mongoose.Schema({
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
})

commentsSchema.virtual("comments", {
  // 레퍼런스 글쓰기 , _id를 기준으로 주인확인
  ref: "User",
  localField: "_id",
  foreignField: "owner",
})

const Comments = mongoose.model("Comments", commentsSchema)
module.exports = Comments
