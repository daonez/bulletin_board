const express = require("express")
const { off } = require("../models/user")
const router = express.Router()
const Users = require("../models/user")

router.post("/users", async (req, res) => {
  const user = new Users(req.body)

  try {
    await user.save()
    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id
  console.log(_id)

  try {
    const user = await Users.findById({ _id })
    if (user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (e) {
    res.status(500).send()
  }
})

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ["author", "password", "email"]
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidUpdate) {
    return res.status(400).send({ error: "수정 할 수있는 내용이 없습니다" })
  }

  try {
    const user = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).send()
    }
    res.status(204).send(user)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
