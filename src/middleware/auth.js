const jwt = require("jsonwebtoken")
const User = require("../models/user")

const auth = async (req, res, next) => {
  try {
   
    const token = req.header("Authorization").replace("Bearer ", "")

    const decoded = jwt.verify(token, "thisisssecret")
    const user = await User.findOne({ _id: decoded._id, "tokens.token": token })

    if (!user) {
      throw new Error()
    }
    req.token = token
    req.user = user

    next()
  } catch (e) {
    console.log(e)
    res.status(401).send({ error: "로그인을 해주세요" })
  }
}

module.exports = auth
