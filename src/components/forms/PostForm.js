import React from "react";
import styles from "./PostForm.module.css";
import { isAuth, updateUser } from "../../components/helpers/auth";
import axios from "axios";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// import { GoogleLoginButton } from "react-social-login-buttons";

const PostForm = ({ state, setState }) => {
  const {
    title,
    body,
    success,
    error,
    photo,
    loading,
    postData,
    fileSize,
    buttonText,
    redirectToProfile,
  } = state;

   console.log("form data from PostForm =======>", postData);
  // Client side validation of user input
  // for profile update.
  const isValid = () => {
    const { title, body, fileSize } = state;

    // if (fileSize > 100000) {
    //   setState({ ...state, error: "File size should be less than 100kb", loading:false });
    //   return false;
    // }
    if (title.length === 0 || body.length === 0) {
      setState({ ...state, error: "All fields are required", loading: false });
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
    postData.set(name, value);

    setState({
      ...state,
      [name]: value,
      fileSize,
      error: "",
      success: "",
      imageUploadText: imageName,
    });
  };

  // Function reponsible for making request to post endpoint

  const post = async () => {
    const userId = isAuth().data.user._id;
    const token = isAuth().data.token;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/post/new/${userId}`,
        // data to create a post
        postData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


        setState({
          ...state,
          title: "",
          body: "",
          photo: "",
          buttonText: "Posted",
          success: response.data.message,
          loading: false,
          imageUploadText: "Upload Image",
          redirectToProfile: true,
        });


      console.log("POST created ===>", response.data);
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        buttonText: "Post",
        error: error.response.data.error,
        loading: false,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Posting...", loading: true });

    if (isValid()) {
      post();
    }
  };

  return (
    <>
      <Form className={styles.post} onSubmit={handleSubmit}>
        <FormGroup>
          <Label> Photo </Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleChange("photo")}
          />
        </FormGroup>
        <FormGroup>
          <Label> Title </Label>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleChange("title")}
          />
        </FormGroup>
        <FormGroup>
          <Label> Body </Label>
          <Input
            type="textarea"
            placeholder="Body"
            value={body}
            onChange={handleChange("body")}
          />
        </FormGroup>
        <Button className="btn-lg btn-dark btn-block mt-3">Post</Button>
      </Form>
    </>
  );
};

export default PostForm;
