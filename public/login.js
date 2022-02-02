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

    if (res.status === 201) {
      window.location.replace("/")
    }
  } catch (err) {
    console.log(err)
  }
}

async function signup(author, password, email) {
  try {
    const res = await axios.post("/users/signup", { author, password, email })
    console.log(res)
    if (res.status === 201) {
      window.location.replace("/")
    }
  } catch (err) {
    console.log(err)
  }
}
