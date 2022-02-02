async function getloginPage() {
  try {
    const res = await axios.get("/users/login")

    if (res.status === 201) {
      window.location.replace("/")
    }
  } catch (err) {
    console.log(err)
  }
}

// async function login(password, email) {
//   try {
//     const res = await axios.get("/login", { password, email })

//     if (res.status === 201) {
//       window.location.replace("/")
//     }
//   } catch (err) {
//     console.log(err)
//   }
// }
