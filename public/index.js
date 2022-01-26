const deletePostBtn = document.getElementById("delBtn")

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
