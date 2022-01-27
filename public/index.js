function getCurrentDate() {
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth()
  var today = date.getDate()
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var seconds = date.getSeconds()
  var milliseconds = date.getMilliseconds()
  return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds))
}

async function deletePost(id, password) {
  //const id = window.location.pathname.replace(/^\/([^\/]*).*$/, "$1")

  try {
    console.log(id)
    const res = await axios.delete(`/${id}`, { data: { password } })
    console.log(res)
    if (res.status === 204) {
      window.location.replace("/")
    }
  } catch (err) {
    console.log(err)
  }
}

async function editPost(_id, title, body, password) {
  try {
    const res = await axios.patch(`/${_id}`, { title, body, password })

    if (res.status === 204) {
      window.location.reload()
    }
  } catch (err) {
    window.alert("wrong info was given")
    console.log(err)
  }
}
