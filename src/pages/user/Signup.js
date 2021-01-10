import React, {useState, useEffect} from 'react';
import SignupForm from "../../components/forms/SignupForm";
import { showSuccessMessage, showErrorMessage } from "../../components/helpers/alerts";

function Signup() {
  const [state, setState] = useState({
    name:"",
    email:"",
    password:"",
    error:"",
    success:"",
    buttonText:"Sign up"
  })

  const {name, email, password, error, success} = state;

  return (
    <div className="container">
      <h2 className="mt-5 mb-1 text-center">
        <img src="./gather.png" />
      </h2>
      {success && showSuccessMessage(success)}

      {error && showErrorMessage(error)}
      <SignupForm state={state} setState={setState} />
    </div>
  );
}

export default Signup
