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
      error: "",
      success: "",
      [name]: e.target.value,
    });
  };

  const { name, email, password, success, error, buttonText } = state;

  // Function reponsible for making request to sign up endpoint

  const signup = async () => {
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
        buttonText: "Sign up",
        error: error.response.data.error,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Signing up..." });
    signup();
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
        <Button className="btn-lg btn-dark btn-block mt-3">{buttonText}</Button>
      </Form>
    </>
  );
};

export default SignupForm;
