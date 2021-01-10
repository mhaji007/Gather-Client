
// response is an object contianing token
// and user info received when user successfully signs in
// The callback function (next) is used for
// redirecting user to another page after successfully setting cookie and local storage
export const authenticate= (jwt, next) => {
  if(typeof window !=="undefined") {
    localStorage.setItem("jwt", JSON.stringify(jwt))
    next()
  }
}
