import React, {useEffect, useState} from 'react';
import Select from "react-select";
import {Controller} from 'react-hook-form';
import _ from 'lodash'

const customStyles = {
  option: (styles, {isFocused, isSelected}) => {
    return {
      ...styles,
      backgroundColor: (isFocused || isSelected) ? "#00a79c" : null,
    };
  },
  control: (base, state) => {
    return {
      ...base,
      boxShadow: state.isFocused ? `0 0 0 1px #00a79c` : null,
    }
  }
};

export default function ({
                           label,
                           name,
                           register,
                           control,
                           getValues,
                           errorMessage,
                           options = [],
                           placeholder = 'აირჩიეთ',
                           className = '',
                           inputClassName = '',
                           optionLabel = "name",
                           optionValue = "id",
                           callback = null,
                         }) {

  const [selectedValue, setSelectValue] = useState({});

  useEffect(() => {
    const value = getValues(name);
    if (_.isEmpty(selectedValue) && value) {
      const filtered = options.filter(item => value === item[optionValue]);
      setSelectValue(filtered);
    }
  }, [register]);

  const handleChange = (selected, field) => {
    const value = selected[optionValue];
    field.onChange(value);
    setSelectValue(selected);

    if (callback) callback(value);
  }

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({field}) => (
          <div className={`form-group ${inputClassName ? inputClassName : ""}`}>
            <h5 className="col-form-label">{label}</h5>
            <Select
              classNamePrefix="react-select"
              menuPlacement="auto"
              maxMenuHeight={190}
              className={`selectOption ` + className}
              placeholder={placeholder}
              onChange={(selected) => handleChange(selected, field)}
              closeMenuOnSelect={true}
              options={options}
              getOptionLabel={(option) => option[optionLabel]}
              getOptionValue={(option) => option[optionValue]}
              value={selectedValue}
              isMulti={false}
              blurInputOnSelect={false}
              noOptionsMessage={() => " "}
              styles={customStyles}
            />
            <div className="invalid-feedback d-block">
              {errorMessage}
            </div>
          </div>
        )}
      />
    </>

  )
}