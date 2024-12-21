import './model.scss';
import { useState, useEffect } from 'react';
import { API } from '../../../http/API';
import { ErrorEmmiter, SuccessEmmiter } from './../../../components/Toastify/Notify.jsx';

const Role = (props) => { 
  const { model, setSelected, setCreateMode, setReload} = props;
  const [role, setRole] = useState(model?.name ? model.name : '');

  useEffect(() => {
    model.name = role;
  }, [role])

  const put = async () => {
    try {
      const data = await API.role.update(model);
      SuccessEmmiter(data.message);
      setSelected(null);
      setReload(true);
    } catch(error) {     
      ErrorEmmiter(error.response.data.message);
      console.error(error);
    }
  };
  const create = async () => {
    try {
      const data = await API.role.addItem(model);
      SuccessEmmiter(data.message);
      setCreateMode(null);
      setReload(true);
    } catch(error) {     
      ErrorEmmiter(error.response.data.message);
      console.error(error);
    }
  };
  return (    
    <div className="model-section">
      {model?.mode === 'edit' ? 
        <>
          <div className='btn-container'>
            <button className='btn success' onClick={() => put()}>Сохранить</button>
            <button className='btn cancel' onClick={() => setSelected(null)}>Отменить</button>
          </div>
        </>
        :
        <>
          <div className='btn-container'>
            <button className='btn success' onClick={() => create()}>Сохранить</button>
            <button className='btn cancel' onClick={() => setCreateMode(false)}>Отменить</button>
          </div>
        </>
      }
      <form onSubmit={e => e.preventDefault()}>
        <input type="text" placeholder="Название роли..."
          value={role} onChange={(e) => setRole(e.target.value)}/>      
      </form>
    </div>
  );
}
 
export default Role;