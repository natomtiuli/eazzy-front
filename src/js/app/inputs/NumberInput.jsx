import React from 'react';

export default function ({label, placeholder, name, register, rules, errorMessage, className="", defaultValue="", onChange}) {
  return (
    <div className={`form-group ${className}`}>
      <h5 className="col-form-label pl-2">{label}</h5>

      <input
        type="number"
        className={`form-control number-input ${errorMessage ? 'is-invalid' : ''}`}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(name, rules)}
        onChange={onChange}
      />
      {
        errorMessage &&
        <div className="invalid-feedback d-block">
          {errorMessage.message}
        </div>
      }
    </div>
  );
}
