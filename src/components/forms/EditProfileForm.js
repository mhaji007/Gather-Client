import React from "react";
import styles from "./EditProfileForm.module.css";
import { isAuth, updateUser } from "../../components/helpers/auth";
import axios from "axios";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// import { GoogleLoginButton } from "react-social-login-buttons";

const EditProfileForm = ({ state, setState }) => {
  const {
    name,
    email,
    about,
    password,
    success,
    error,
    loading,
    formData,
    fileSize,
    buttonText,
    redirectToProfile,
    id,
  } = state;

  // Client side validation of user input
  // for profile update.
  const isValid = () => {
    const { name, email, password } = state;

    if (fileSize > 100000) {
      setState({ ...state, error: "File size should be less than 100kb", loading:false });
      return false;
    }
    if (name.length == 0) {
      setState({ ...state, error: "Name is required", loading:false });
      return false;
    }
    // Apply test to email
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setState({ ...state, error: "A valid email is required", loading:false });
      return false;
    }
    if (password.length >= 1 && password.length <= 5) {
      setState({
        ...state,
        error: "Password must be at least 6 characters long",
        loading:false
      });
      return false;
    }
    return true;
  };

  // Dynamic onChange handler
  // used by all inputs
  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    const fileSize = name === "photo" ? e.target.files[0].size : 0;
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
      fileSize,
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
    
      updateUser(response.data, () => {
        setState({
          ...state,
          name: "",
          email: "",
          about: "",
          password: "",
          buttonText: "Updated",
          success: response.data.message,
          loading: false,
          redirectToProfile: true,
          imageUploadText: "Upload Image",
        });
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
    if (isValid()) {
      update();
    }
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
          <Label> About </Label>
          <Input
            type="textarea"
            placeholder="About"
            value={about}
            onChange={handleChange("about")}
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
