import React, { useState, useEffect } from "react";
import {Redirect} from "react-router-dom"
import SigninForm from "../../components/forms/SigninForm";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../components/helpers/alerts";

function SignIn() {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
    success: "",
    buttonText: "SignIn",
    redirectToReferer: false
  });

  const { email, password, error, success, redirectToReferer } = state;

  if (redirectToReferer) {
    return <Redirect to="/"/>
  }

  return (
    <div className="container">
      <h2 className="mt-5 mb-3 text-center">
        <img src="./gather.png" />
      </h2>
      {success && showSuccessMessage(success)}

      {error && showErrorMessage(error)}
      <SigninForm state={state} setState={setState} />
    </div>
  );
}

export default SignIn;
