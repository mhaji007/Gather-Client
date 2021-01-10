import React from "react";
import styles from "./SigninForm.module.css";
import axios from "axios";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// import { GoogleLoginButton } from "react-social-login-buttons";

const SigninForm = ({ state, setState }) => {
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

  const { email, password, error, redirectToReferer } = state;

  // Function reponsible for making request to sign up endpoint

  const signin = async () => {
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
      const response = await axios.post(`${process.env.REACT_APP_API}/signin`, {
        email,
        password,
      });
      setState({
        ...state,
        email: "",
        password: "",
        buttonText: "Signed in",
        success: response.data.message,
      });
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        buttonText: "Sign in",
        error: error.response.data.error,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Signing in..." });
    signin();

  };

  return (
    <>
      <Form className={styles.signin} onSubmit={handleSubmit}>
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
        <Button className="btn-lg btn-dark btn-block mt-5">Sign in</Button>
      </Form>
    </>
  );
};

export default SigninForm;
