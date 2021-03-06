const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Posts = require("./post")
const Comments = require("./comment")

const userSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  updatedAt: {
    type: Date,
    default: () => new Date(),
  },
})

//toJSON 방법을 써서 password,tokens 삭제하여 client에게 안보이게한다!
userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()
  console.log(userObject)
  delete userObject.password
  delete userObject.tokens

  return userObject
}

//pre 저장하기 전, post 저장후가있음
//this를 사용하기 때문에 화살표 함수 불가
// 미들웨어 이기 때문에 next가 없으면 무한로딩함 (작업을 끝낼떄까지 기다리때문)
userSchema.pre("save", async function (next) {
  // this 함수를 계속 쓰기 불편하고, 가독성이 안좋으니 value로 저장
  const user = this
  //비밀번호 암호화
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

//인스턴스에 사용할 메서드
userSchema.methods.makeAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, "thisisssecret")
  //token:token  을 줄여서 token으로 shorthand방법사용
  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

// 스키마 . statics 해서 메서드를 만들어서 사용 할 수있다. 아래 메서드는 비밀번호와 이메일정보가 일치하면 로그인하기 위해서 사용된다
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error("로그인을 실패했습니다")
  }
  console.log(password, user.password)
  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error("로그인을 실패했습니다")
  }

  return user
}

userSchema.virtual("posts", {
  // 레퍼런스 글쓰기 , _id를 기준으로 주인확인
  ref: "Posts",
  localField: "_id",
  foreignField: "owner",
})

userSchema.virtual("comments", {
  // 레퍼런스 글쓰기 , _id를 기준으로 주인확인
  ref: "Comments",
  localField: "_id",
  foreignField: "owner",
})

const User = mongoose.model("User", userSchema)

module.exports = User
