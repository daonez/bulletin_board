const express = require("express")
const router = express.Router()
const Posts = require("../schemas/post")

router.get("/", async (req, res) => {
  res.render("writePage")
})
router.post("/", async (req, res) => {
  const { title, body, createdAt, updatedAt } = req.body
  const createdText = await Posts.create({ title, body, createdAt, updatedAt })
  res.json({ createdText })
})

module.exports = router
