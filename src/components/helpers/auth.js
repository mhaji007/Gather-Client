import axios from "axios";

// response is an object contianing token
// and user info received when user successfully signs in
// The callback function (next) is used for
// redirecting user to another page after successfully setting cookie and local storage
export const authenticate = (jwt, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(jwt));
    next();
  }
};

export const signout = async (next) => {
  if (typeof window !== "undefined") {
    // Remove token from local storage
    localStorage.removeItem("jwt");
    next();
    try {
      // Send request to backend to clear cookie
      const response = await axios.get(`${process.env.REACT_APP_API}/signout`);
      console.log("Sign out response from server ====>", response.data.message);
      return response.data.message;
    } catch (error) {
      console.log(error);
    }
  }
};

// Function for authenticating user

// Access user info from local storage
// This information can be used for different purposes
// such as displaying user's profile name (via isAuth().data.user.name)
// as well as directing user to their profile page after
// sign in (the user id is accessible via isAuth().data.user._id
// and can be used to push to the url once user clicks on their profile name)
export const isAuth = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    // user is not authenticated
    return false;
  }
};

