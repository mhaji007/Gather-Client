import React from "react";
import styles from "./EditProfileForm.module.css";
import { isAuth, signout } from "../../components/helpers/auth";
import axios from "axios";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// import { GoogleLoginButton } from "react-social-login-buttons";

const EditProfileForm = ({ state, setState }) => {
  const {
    name,
    email,
    password,
    success,
    error,
    loading,
    formData,
    buttonText,
    redirectToProfile,
    id,
  } = state;
  // Dynamic onChange handler
  // used by all inputs
  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    const imageName =
      name === "photo" ? e.target.files[0].name : "Upload Photo";

    // Set dynamic name and value in formData
    // have the formData ready to send to backend
    // on submit

    // if name:email => value of email
    // if name:photo => value of photo
    formData.set(name, value);

    setState({
      ...state,
      [name]: value,
      error: "",
      success: "",
      imageUploadText: imageName,
    });
  };

  // Function reponsible for making request to sign up endpoint

  const update = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/user/${id}`,

        formData,

        {
          headers: {
            Authorization: `Bearer ${isAuth().data.token}`,
          },
        }
      );
      console.log("User update response ====>", response);
      setState({
        ...state,
        name: "",
        email: "",
        password: "",
        buttonText: "Updated",
        success: response.data.message,
        loading: false,
        redirectToProfile: true,
        imageUploadText: "Upload Image",
      });
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        buttonText: "Update",
        error: error.response.data.error,
        loading: false,
        // redirectToProfile: true,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, loading: true });
    console.log("form data from client =======>", ...formData);
    update();
  };

  return (
    <>
      <Form className={styles.update} onSubmit={handleSubmit}>
        <FormGroup>
          <Label> Profile Photo </Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleChange("photo")}
          />
        </FormGroup>
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
