import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const MXSelect = (props) => {
  const {
    options,
    value,
    onChange,
    isSearchable = true,
    isDisabled = false,
    isMulti = false,
    placeholder
  } = props;

  const [optionsComponent, setOptionsComponent] = useState([]);

  useEffect(() => {
    setOptionsComponent(
      options.map((option) => (
        { 
          value: option.value, 
          label: option.label, 
          data: option 
        }
      ))
    );
  }, []);

  const handleChange = (selectedOption) => {
    if (onChange) {
      onChange(selectedOption);
    }
  };

  return (
    <>
      <Select
        options={optionsComponent}
        value={value}
        onChange={handleChange}
        isClearable={true}
        isSearchable={isSearchable}
        isDisabled={isDisabled}
        isMulti={isMulti}
        placeholder={placeholder}
      />
    </>
  );
};

export default MXSelect;