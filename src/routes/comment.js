const express = require("express")
const router = express.Router()
const Comments = require("../models/comment")

router.get("/comments", async (req, res) => {
  const results = await Comments.find({})
  try {
    res.send(results)
  } catch (e) {
    res.status(500).send()
  }
})

router.get("/comments/:id", async (req, res) => {
  const _id = req.params.id

  try {
    const comment = await Comments.findById({ _id })
    if (!comment) {
      return res.status(404).send()
    }
    res.send(comment)
  } catch (e) {
    res.status(500).send()
  }
})

router.post("/comments", async (req, res) => {
  const comment = new Comments(req.body)
  try {
    await comment.save()
    res.status(201).send(comment)
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
