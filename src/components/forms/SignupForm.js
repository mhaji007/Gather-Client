import React from "react";
import styles from "./SignupForm.module.css";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// import { GoogleLoginButton } from "react-social-login-buttons";

const SignupForm = ({ state, setState }) => {
  // Dynamic onChange handler
  // used by all inputs
  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
    });
  };

  const { name, email, password, error } = state;
  return (
    <>

    <Form className={styles.signup}>
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
      <Button className="btn-lg btn-dark btn-block mt-3">Signup</Button>
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
