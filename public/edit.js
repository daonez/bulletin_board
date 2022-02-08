async function checkToken() {
  const token = localStorage.getItem("token")
  console.log(token)
  if (!token) {
    await window.alert("please log in")
    await window.location.replace("/")
  } else {
    return token
  }
}

function makeEditable() {
  const inputEl = document.querySelectorAll("input, textarea")
  inputEl.forEach((el) => {
    el.readOnly = false
  })
  document.getElementById("editBtn").style.display = "inline-block"
  document.getElementById("makeEditable").style.display = "none"
}
