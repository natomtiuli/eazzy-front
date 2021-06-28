import React from 'react';

export default function ({label, name, register, rules, errorMessage, className="", defaultValue=""}) {
  return (
    <div className={`form-group ${className}`}>
      <h5 className="col-form-label pl-2">{label}</h5>

      <textarea
        className={`form-control ${errorMessage ? 'is-invalid' : ''}`}
        placeholder={label}
        name={name}
        defaultValue={defaultValue}
        {...register(name, rules)}
      />

      <div className="invalid-feedback d-block">
        {errorMessage && errorMessage.message}
      </div>
    </div>
  );
}
