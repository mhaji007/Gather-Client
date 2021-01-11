import React, { useState, useEffect } from "react";

import { Redirect } from "react-router-dom";
import SigninForm from "../../components/forms/SigninForm";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../components/helpers/alerts";
import loader from "../../loader.gif"
function SignIn() {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
    success: "",
    buttonText: "Sign in",
    loading: false,
    redirectToReferer: false,
  });



  const { email, password, error, success, loading, redirectToReferer } = state;

  if (redirectToReferer) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <h2 className="mt-5 mb-1 text-center">
        <img src="./gather.png" />
      </h2>
      {success && showSuccessMessage(success)}
      {error && showErrorMessage(error)}
      <div className="text-center">

      {loading &&<img src={loader} style={{width:"auto", height:"250px"}}/>}
      </div>
      <SigninForm state={state} setState={setState} />
    </div>
  );
}

export default SignIn;
