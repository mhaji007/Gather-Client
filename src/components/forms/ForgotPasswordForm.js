import React from "react";

import styles from "./ForgotPasswordForm.module.css";
import { forgotPassword } from "../../components/helpers/auth";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";


function ForgotPasswordForm({ state, setState }) {
  const { email, success, error } = state;

    const forgotPasswordHandler = (e) => {
      e.preventDefault();
      console.log("email from ForgotPassWordForm ===>", email)
      setState({ success: "", error: "" });
      forgotPassword(email).then((data) => {
        if (data.error) {
          console.log(data.error);
          setState({ error: data.error });
        } else {
          console.log(data.message);
          setState({ success: data.message });
        }
      });
    };



  return (
    <div>
      <Form className={styles.forgot} onSubmit={ forgotPasswordHandler }>
        <FormGroup>
          {/* <Label> Email </Label> */}
          <Input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) =>
              setState({
                email: e.target.value,
                success: "",
                error: "",
              })
            }
            autoFocus
          />
          {JSON.stringify(email)}
        </FormGroup>
        <Button className="btn-lg btn-dark btn-block mt-3">
          Send Password Reset Link
        </Button>
      </Form>
    </div>
  );
}

export default ForgotPasswordForm;
