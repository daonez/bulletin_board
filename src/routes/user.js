const express = require("express")
const router = express.Router()
const User = require("../models/user")

router.get("/users", async (req, res) => {
  const results = await User.find({})
  try {
    res.send(results)
  } catch (e) {
    res.status(500).send()
  }
})

router.post("/users", async (req, res) => {
  const user = new User(req.body)
  const token = await user.makeAuthToken()
  try {
    await user.save({ user, token })
    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

//로그인 라우터 endpoint
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.makeAuthToken()
    res.send({ user, token })
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
})

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id
  console.log(_id)

  try {
    const user = await User.findById({ _id })
    if (!user) {
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
    const user = await User.findById(req.params.id)
    updates.forEach((update) => (user[update] = req.body[update]))

    await user.save()

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
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).send()
    }
    res.status(204).send(user)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
