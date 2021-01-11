import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import SignupForm from "../../components/forms/SignupForm";
import { showSuccessMessage, showErrorMessage } from "../../components/helpers/alerts";
import styles from "../../components/helpers/alerts.module.css"

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
      {success && (
        <div className="text-center">
        <Link className={`text-success btn bg-white btn-success mt-1 ${styles.cstmAlert}`} to="/signin">
          Click here to sign in
        </Link>
        </div>
      )}

      {error && showErrorMessage(error)}
      <SignupForm state={state} setState={setState} />
    </div>
  );
}

export default Signup
