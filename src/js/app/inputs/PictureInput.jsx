import React from 'react';

export default function ({label, name, register, rules, errorMessage, className="", onChange}) {
  return (
    <div className={`mb-4 ${className}`}>
      <h5 className="col-form-label pl-2">{label}</h5>
      <input
        type="file"
        accept='image/png, image/jpeg'
        className={`btn btn-primary ${errorMessage ? 'is-invalid' : ''}`}
        placeholder={label}
        name={name}
        {...register(name, rules)}
        onChange={onChange}
      />
      <div className="invalid-feedback d-block">
        {errorMessage && errorMessage.message}
      </div>
    </div>
  );
}
