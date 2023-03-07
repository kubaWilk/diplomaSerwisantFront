import React, { Fragment } from "react";

const FormGroup = ({ htmlFor, label, value, type, onChange, name }) => {
  return (
    <div className="form-group">
      <label className="self-start ml-2 mb-1" htmlFor={htmlFor}>
        {label}:
      </label>
      <input
        type={type}
        value={value}
        className="m-1 p-1 border self-stretch"
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default FormGroup;
