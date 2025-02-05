import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { API } from '@mindx/http/API';
import { ErrorEmmiter } from '@mindx/components/UI/Toastify/Notify';
import { Image } from 'react-bootstrap';
import { useRef } from 'react';

const CatalogRef = (props) => {
  const { defaultValue, onChange, url, path, img } = props;
  const [objectList, setObjectList] = useState([]);
  const selectRef = useRef(null);

  const fetchData = () => {
    API[url].getList()
      .then(response => {
        const options = response.map(item => ({
          value: item.id,
          label: img 
            ? <Image width={200} height={200} src={`http://localhost:3001/${item.id}.jpg`}/>
            : item[path],
          data: item
        }));
        setObjectList(options);
      })
      .catch(error => {
        console.error(error);
        ErrorEmmiter(error.message);
      });
  };

  useEffect(() => {
    if (defaultValue) {
      selectRef.current.setValue({
        value: img ? defaultValue : defaultValue.id,
        label: img
        ? <Image width={200} height={200} src={`http://localhost:3001/${defaultValue}.jpg`}/>
        : defaultValue[path],
        data: defaultValue
      })
    }
  }, []);

  return (
    <Select
      ref={selectRef}
      options={objectList}
      defaultValue={defaultValue}
      onChange={(selectedOption) => onChange(selectedOption.value)}
      formatOptionLabel={option => option.label}
      onMenuOpen={fetchData}
    />
  );
};

export default CatalogRef;