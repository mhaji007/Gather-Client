import React from "react";

import styles from "./ResetPasswordForm.module.css";
import { resetPassword } from "../../components/helpers/auth";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

function ResetPasswordForm({ state, setState, params }) {
  const { newPassword, success, error } = state;

  const resetPasswordHandler = (e) => {
    e.preventDefault();
    // console.log("email from ForgotPassWordForm ===>", email);
    setState({ success: "", error: "" });
    resetPassword({newPassword, resetPasswordLink:params.resetPasswordToken}).then((data) => {
      if (data.error) {
        console.log(data.error);
        setState({ error: data.error });
      } else {
        console.log(data.message);
        setState({ success: data.message, newPassword:"" });
      }
    });
  };

  return (
    <div>
      <Form className={styles.reset} onSubmit={resetPasswordHandler}>
        <FormGroup>
          {/* <Label> Password </Label> */}
          <Input
            type="password"
            value={newPassword}
            placeholder="Password"
            onChange={(e) =>
              setState({
                newPassword: e.target.value,
                success: "",
                error: "",
              })
            }
            autoFocus
          />
          {JSON.stringify(newPassword)}
        </FormGroup>
        <Button className="btn-lg btn-dark btn-block mt-3">
         Reset Password
        </Button>
      </Form>
    </div>
  );
}

export default ResetPasswordForm;
