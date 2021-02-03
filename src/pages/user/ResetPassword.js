import React, { useState } from "react";

import ResetPasswordForm from "../../components/forms/ResetPasswordForm";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../components/helpers/alerts";

function ResetPassword({match:{params}}) {
  const [state, setState] = useState({ newPassword: "", success: "", error: "" });

  const { newPassword, success, error } = state;

  return (
    <div className="container">
      <h2 className="mt-5 mb-3 text-center">Please enter your new password</h2>

      {success && showSuccessMessage(success)}
      {error && showErrorMessage(error)}

      <ResetPasswordForm state={state} setState={setState} params={params} />
    </div>
  );
}

export default ResetPassword
