import React from "react";
import styles from "./EditProfileForm.module.css";
import { isAuth, signout } from "../../components/helpers/auth";
import axios from "axios";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// import { GoogleLoginButton } from "react-social-login-buttons";

const EditProfileForm = ({ state, setState }) => {
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

  const {
    name,
    email,
    password,
    success,
    error,
    buttonText,
    redirectToProfile,
    id,
  } = state;



  // Function reponsible for making request to sign up endpoint

  const update = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/user/${id}`,
        {
          name,
          email,
          // In case user does not want to
          // update their password
          password: password || undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${isAuth().data.token}`,
          },
        }
      );
      setState({
        ...state,
        name: "",
        email: "",
        password: "",
        buttonText: "Updated",
        success: response.data.message,
        redirectToProfile: true,
      });
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        buttonText: "Update",
        error: error.response.data.error,
        // redirectToProfile: true,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    update();
  };

  return (
    <>
      <Form className={styles.update} onSubmit={handleSubmit}>
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

export default EditProfileForm;
