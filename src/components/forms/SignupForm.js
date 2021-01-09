import React from "react";
import styles from "./SignupForm.module.css";
import axios from "axios";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// import { GoogleLoginButton } from "react-social-login-buttons";

const SignupForm = ({ state, setState }) => {
  // Dynamic onChange handler
  // used by all inputs
  const handleChange = (name) => (e) => {
    setState({
      ...state,
      error:"",
      success:"",
      [name]: e.target.value,
    });
  };

  const { name, email, password, error } = state;





  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Signing up..." });

    // Using fetch

  //   fetch(`${process.env.REACT_APP_API}/signup`,{
  //   method:"POST",
  //   headers: {
  //     Accept:"application/json",
  //     Content-Type:"application/json",
  //   },
  //   body: JSON.stringify({name,email,password})
  // })
  // .then(response => {
  //   return response.json()
  // })

    // Using axios with async await
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/signup`, {
        name,
        email,
        password,
      });
      setState({
        ...state,
        name: "",
        email: "",
        password: "",
        buttonText: "Signed up",
        success: response.data.message,
      });
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        buttonText: "Signup",
        error: error.response.data.error,
      });
    }
  };

  return (
    <>
      <Form className={styles.signup} onSubmit={handleSubmit}>
        <FormGroup>
          <Label> Name </Label>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleChange("name")}
          />
        </FormGroup>
        <FormGroup>
          <Label> Email </Label>
          <Input
            type="email"
            value={email}
            placeholder="Email"
            onChange={handleChange("email")}
          />
        </FormGroup>
        <FormGroup>
          <Label> Password </Label>
          <Input
            type="password"
            value={password}
            placeholder="Password"
            onChange={handleChange("password")}
          />
        </FormGroup>
        <Button className="btn-lg btn-dark btn-block mt-5">Signup</Button>
      </Form>
    </>

    // Alternative  form

    // <div className="container text-center">
    // <form>
    //   <div className="form-group">
    //     <input
    //       type="text"
    //       name="name"
    //       placeholder="Name"
    //       required
    //     />
    //   </div>
    //   <div className="form-group">
    //     <input
    //       type="email"
    //       name="email"
    //       placeholder="Email"
    //       required
    //       />
    //   </div>
    //   <div className="form-group">
    //     <input
    //       type="password"
    //       name="password"
    //       placeholder="Password"
    //       required
    //     />
    //   </div>

    //   <button className="btn btn-md btn-raised btn-info ">Submit</button>
    // </form>

    // </div>
  );
};

export default SignupForm;
