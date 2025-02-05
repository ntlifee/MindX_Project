import { API } from '@mindx/http/API';
import { ErrorEmmiter } from '@mindx/components/UI/Toastify/Notify';
import { useState, useEffect, useRef } from 'react';

const CatalogRef = (props) => {
  const { size, defaultValue, onChange, url, path } = props;
  const [objectList, setObjectList] = useState([]);
  const selectRef = useRef(null);

  useEffect(() => {
    API[url].getList()
      .then(response => setObjectList(response))
      .catch(error => {
        console.error(error);
        ErrorEmmiter(error.message);
      }); 
  }, [url]);

  useEffect(() => {
    selectRef.current.value = defaultValue;
  }, [objectList]);

  return ( 
    <>
      <select
        ref={selectRef} 
        className="catalog-ref"
        size={size}  
        onChange={(e) => onChange(e.target.value)}
      >
        <option key={"nullOption"} value={null}></option>
        {
          objectList.map((item) => (
            <option key={item.id} value={item.id}>
              {item[path]}
            </option>
          ))
        }
      </select>
    </>
  );
}

export default CatalogRef;