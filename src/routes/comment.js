const express = require("express")
const router = express.Router()
const Comments = require("../models/comment")
const auth = require("../middleware/auth")
const Posts = require("../models/post")

router.post("/comments", auth, async (req, res) => {
  const { _id, comment, author } = req.body
  const comments = await new Comments({
    comment,
    post: _id,
    owner: req.user._id,
    author,
  }).populate("owner", "author")
  try {
    const result = await comments.save()

    await Posts.findByIdAndUpdate(
      _id,
      { $push: { comments: result } },
      { new: true, useFindAndModify: false }
    ).populate("owner", "author")
    res.status(201).send(result)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.patch("/comments/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ["comments"]
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidUpdate) {
    return res.status(400).send({ error: "수정 할 수있는 내용이 없습니다" })
  }

  try {
    const comment = await Comments.findById({
      _id: req.params.id,
      owner: req.user._id,
    })
    console.log(comment)
    const updateResult = updates.forEach((update) => (comment[update] = req.body[update]))
    console.log(updateResult)

    await comment.save()

    if (!comment) {
      return res.status(404).send()
    }
    res.send(comment)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
})

router.delete("/comments/:id", auth, async (req, res) => {
  try {
    const comment = await Comments.findByIdAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    })
    if (!comment) {
      return res.status(404).send()
    }
    res.send(comment)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
