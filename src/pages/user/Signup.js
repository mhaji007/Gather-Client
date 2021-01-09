import React, {useState, useEffect} from 'react';
import SignupForm from "../../components/forms/SignupForm"

function Signup() {
  const [state, setState] = useState({
    name:"",
    email:"",
    password:"",
    error:""
  })

  const {name, email, password, error} = state;

  return (
    <div className="container">
      <h2 className="mt-5 mb-3 text-center">Signup</h2>
      <SignupForm state={state} setState={setState}/>
    </div>
  )
}

export default Signup
