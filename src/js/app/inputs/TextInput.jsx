import React from 'react';

export default function ({label, placeholder, name, register, rules, errorMessage, className="", defaultValue="", onChange}) {
  return (
    <div className={`input-div ${className}`}>
      {
        label &&
        <h5 className="col-form-label pl-2 mb-1">{label}</h5>
      }
      <div className='input-group'>
        <input
          type="text"
          className={`form-control ${errorMessage ? 'is-invalid' : ''}`}
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...register(name, rules)}
          onChange={onChange}
        />
        <div className="input-group-append">
          <div className="input-group-text">
            <span className="fas fa-user"></span>
          </div>
        </div>
      </div>
      {
        errorMessage &&
        <div className="invalid-feedback d-block">
          {errorMessage}
        </div>
      }
    </div>
  );
}
