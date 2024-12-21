import './model.scss';
import { useState, useEffect } from 'react';
import { API } from '../../../http/API';
import { ErrorEmmiter, SuccessEmmiter } from './../../../components/Toastify/Notify.jsx';

const User = (props) => { 
  const { model, setSelected, setCreateMode, setReload} = props;
  const [username, setUsername] = useState(model?.username ? model.username : '');
  const [password, setPassword] = useState(model?.password ? model.password : '');
  const [roleId, setRoleId] = useState(model?.role ? model.role.id : null);
  const [roleList, setRoleList] = useState([]);

  const getRoles = async () => {
    await API.role.getList()
      .then(response => setRoleList(response))
      .catch(error => console.error(error)); 
  };

  useEffect(() => {
    getRoles();
  },[]);

  useEffect(() => {
    model.username = username;
  }, [username])
  useEffect(() => {
    model.password = password;
  }, [password])
  useEffect(() => {
    model.roleId = roleId;
  }, [roleId])

  const put = async () => {
    try {
      const data = await API.user.update(model);
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
      const data = await API.user.addItem(model);
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
        <input type="text" placeholder="Имя пользователя..."
          value={username} onChange={(e) => setUsername(e.target.value)}/>      
        <input type="password" placeholder="Пароль..."
          value={password} onChange={(e) => setPassword(e.target.value)}/>
        <select size={1} defaultValue={model?.role ? model.role.id : roleList[0]?.id} onChange={(e) => setRoleId(e.target.value)}>
          {roleList.map(role => (
            <option key={role.id} value={role.id}>{role.name}</option>
          ))}
        </select>
      </form>
    </div>
  );
}
 
export default User;