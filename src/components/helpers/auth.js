import React, {Component} from "react";
import axios from "axios";
import { Route, Redirect } from "react-router-dom";

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



// component is the component(page) passed in
// renamed to Component
// rest is props of the component being passed
// like path, exact, history (if it's a route component) and all other props
// component is renamed to Component since we don't know what
// kind of component is to be rendered
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;

// Function fro updating local storage after
// user profile update

// If user updates their profile name
// the change is not reflected as isAuth()
// only runs once after user sign in, hence the need
// for the updateUser function
export const updateUser= (user, next) => {
  // console.log("user from updateUser =====>", user)
  if(typeof window !=="undefined"){
    if(localStorage.getItem("jwt")){
      let auth = JSON.parse(localStorage.getItem("jwt"))

      // user is response.data received from update axios call
      // jwt(auth) is an object with a key of data
      // which it self consists of two fields (token and user)
      auth.data.user = user;

      next()
    }
  }
}

export const forgotPassword = email => {
    console.log("email from forgotPassword in auth ===> ", email);
    return fetch(`${process.env.REACT_APP_API}/forgot-password`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        console.log("forgot password response: ", response);
        return response.json();
      })
      .catch((err) => console.log(err));
};

export const resetPassword = resetInfo => {
    return fetch(`${process.env.REACT_APP_API}/reset-password`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resetInfo)
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};


export const socialLogin = (user) => {
  return fetch(`${process.env.REACT_APP_API}/social-login/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // credentials: "include", // works only in the same origin
    body: JSON.stringify(user),
  })
    .then((response) => {
      console.log("signin response: ", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};
