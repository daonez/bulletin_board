async function loginPage() {
  try {
    const res = await axios.get("/users/login")
    console.log(res)
    if (res.status === 200) {
      window.location.replace("/users/login")
    }
  } catch (e) {
    console.log(e)
  }
}

async function registerPage() {
  try {
    const res = await axios.get("/users/signup")
    console.log(res)
    if (res.status === 200) {
      window.location.replace("/users/signup")
    }
  } catch (e) {
    console.log(e)
  }
}

async function login(email, password) {
  try {
    const res = await axios.post("/users/login", { email, password })
    console.log(res.data.token)

    if (res.status === 200) {
      const { token } = res.data
      localStorage.setItem("token", token)
      window.location.replace("/")
    }
  } catch (err) {
    console.log(err)
  }
}

async function signup(author, password, email) {
  try {
    const regex = /^(?![A-Za-z]\d?$)[a-zA-Z]+\d*$/
    if (!regex.test(author) && author.length < 3) {
      window.alert("닉네임은 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9) 입니다")
    }
    const res = await axios.post("/users/signup", { author, password, email })
    console.log(res)
    if (res.status === 201) {
      window.location.replace("/users/login")
    }
  } catch (err) {
    console.log(err)
  }
}

async function logout() {
  try {
    const token = localStorage.getItem("token")
    const res = await axios.post(
      "/users/logoutAll",
      { token },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )

    if (res.status === 201) {
      localStorage.clear()
      window.location.reload()
    }
  } catch (e) {
    console.log(e)
  }
}
