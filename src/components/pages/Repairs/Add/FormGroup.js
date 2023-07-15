import React from "react";

const FormGroup = ({ label, value, type, onChange, name, placeholder }) => {
  return (
    <div className="form-group">
      <label className="self-start ml-2 mb-1">
        <p>{label}</p>
        <input
          type={type}
          value={value}
          className="m-1 p-1 border self-stretch"
          onChange={onChange}
          name={name}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
};

export default FormGroup;
