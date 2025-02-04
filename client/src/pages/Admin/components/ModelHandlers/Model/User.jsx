import './model.scss';
import { useState, useEffect, useCallback } from 'react';
import { API } from '@mindx/http/API';
import { ErrorEmmiter, SuccessEmmiter } from '@mindx/components/UI/Toastify/Notify';

const User = (props) => { 
  const { model } = props;
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

  return (    
    <div className="model-section">
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