import React from "react";
import styles from "./SigninForm.module.css";
import axios from "axios";
import {authenticate} from "../helpers/auth";
import {Link} from "react-router-dom"
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

  const { email, password, error, buttonText, loading, redirectToReferer } = state;

  // Function reponsible for making request to sign in endpoint

  const signin = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/signin`, {
        email,
        password,
      });
      authenticate(response, () => {
        setState({
          ...state,
          email: "",
          password: "",
          buttonText: "Signed in",
          success: response.data.message,
          loading:false,
          redirectToReferer:true
        });
      });
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        buttonText: "Sign in",
        error: error.response.data.error,
        loading:false
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({ ...state, loading:true, buttonText: "Signing in..." });
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
        <Button className="btn-lg btn-dark btn-block mt-3 mb-3">{buttonText}</Button>
        <p className="float-right">
          <Link to="/forgot-password" className="text-danger">
            Forgot Password
          </Link>
        </p>
      </Form>
    </>
  );
};

export default SigninForm;
