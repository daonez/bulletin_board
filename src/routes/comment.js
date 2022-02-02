const express = require("express")
const router = express.Router()
const Comments = require("../models/comment")
const auth = require("../middleware/auth")
const Posts = require("../models/post")

router.post("/comments", auth, async (req, res) => {
  const { _id, comment } = req.body
  const comments = new Comments({ post: _id, comment, owner: req.user._id })
  try {
    const result = await comments.save()
    await Posts.findByIdAndUpdate(
      _id,
      { $push: { comments: result } },
      { new: true, useFindAndModify: false }
    )
    res.status(201).send(comments)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
})

router.patch("/comments/:id", async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ["author", "content"]
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidUpdate) {
    return res.status(400).send({ error: "수정 할 수있는 내용이 없습니다" })
  }

  try {
    const comment = await Posts.findById(req.params.id)
    updates.forEach((update) => (comment[update] = req.body[update]))

    await comment.save()

    if (!comment) {
      return res.status(404).send()
    }
    res.send(comment)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete("/comments/:id", async (req, res) => {
  try {
    const comment = await Comments.findByIdAndDelete(req.params.id)
    if (!post) {
      return res.status(404).send()
    }
    res.send(comment)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
