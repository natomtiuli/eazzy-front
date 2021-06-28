import React from 'react';

export default function ({name, label, labelTwo, register, rules, onChange, defaultChecked=false, errorMessage, className}) {
    return (
      <div className={`checkbox-div mb-3 ${className && className}`}>
        <input 
          type="checkbox"
          name={name} 
          id={name}
          {...register(name, rules)}
          defaultChecked={defaultChecked} 
        />
        <label htmlFor={name}>
          {label}
          {
            labelTwo &&
            <span className='ml-1 bold'>
              {labelTwo}
            </span>
          }
        </label>
        {
          errorMessage &&
          <div className="error-msg">
            {errorMessage}
          </div>
        }
      </div>
    );
}
