const express = require("express")
const router = express.Router()
const Comments = require("../models/comment")


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

module.exports = router
