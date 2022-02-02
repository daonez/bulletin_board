document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token")
  const logoutEl = document.querySelector(".nav-logout")
  const loginEl = document.querySelector(".nav-login")

  if (token) {
    logoutEl.style.display = "block"
    loginEl.style.display = "none"
  } else {
    logoutEl.style.display = "none"
    loginEl.style.display = "block"
  }
})
