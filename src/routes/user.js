const express = require("express")
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

module.exports = router
