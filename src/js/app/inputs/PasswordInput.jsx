import React, {useState} from 'react';

export default function ({label, placeholder, name, register, rules, errorMessage, className="", defaultValue="", onChange}) {
  const [show, setShow] = useState(false);
  return (
    <div className={`input-div ${className}`}>
      {
        label &&
        <h5 className="col-form-label pl-2">{label}</h5>
      }
      <div className='input-group'>
        <input
          type={show === false ? "password" : "text"}
          className={`form-control ${errorMessage ? 'is-invalid' : ''}`}
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...register(name, rules)}
          onChange={onChange}
        />
        <div className="input-group-append">
          <div 
            className="btn input-group-text"
            onClick={()=>{setShow(!show)}} 
          >
            <span className={`fas ${show === false ? 'fa-lock' : 'fa-unlock'}`}></span>
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
