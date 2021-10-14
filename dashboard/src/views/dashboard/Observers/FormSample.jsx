import React from "react";

const FormSample = ({ handleSubmit, formElements }) => {
  return (
    <div class="form-sample">
      <form onSubmit={handleSubmit}>{formElements}</form>
    </div>
  );
};

export default FormSample;
