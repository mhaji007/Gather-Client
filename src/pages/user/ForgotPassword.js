import React, { useState } from "react";

import ForgotPasswordForm from "../../components/forms/ForgotPasswordForm";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../components/helpers/alerts";

const ForgotPassword = () => {
  const [state, setState] = useState({ email: "", success: "", error: "" });

  const { email, success, error } = state;



  return (
    <div className="container">
      <h2 className="mt-5 mb-3 text-center">Password Reset</h2>

      {success && showSuccessMessage(success)}
      {error && showErrorMessage(error)}

      <ForgotPasswordForm
        state={state}
        setState={setState}

      />
    </div>
  );
};

export default ForgotPassword;
