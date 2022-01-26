async function deletePost(id) {
  //const id = window.location.pathname.replace(/^\/([^\/]*).*$/, "$1")

  try {
    console.log(id)
    const res = await axios.delete(`/${id}`, { params: {} })
    console.log(res)
    if (res.status === 204) {
      window.location.replace("/")
    }
  } catch (err) {
    console.log(err)
  }
}

async function editPost(_id, title, body, author, password) {
  try {
    const res = await axios.patch(`/${_id}`, { title, body, author, password })

    if (res.status === 204) {
      window.location.replace("/")
    }
  } catch (err) {
    window.alert("wrong info was given")
    console.log(err)
  }
}
