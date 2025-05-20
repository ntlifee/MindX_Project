import './model.scss';
import { useState, useEffect } from 'react';
import { API } from '@mindx/http/API';
import CatalogRef from '@mindx/components/UI/CatalogRef/CatalogRef';

const User = (props) => { 
  const { model } = props;
  const [username, setUsername] = useState(model?.username ? model.username : '');
  const [password, setPassword] = useState(model?.password ? model.password : '');
  const [confirmPassword, setConfirmPassword] = useState(model?.password ? model.password : '');
  const [roleId, setRoleId] = useState(model?.role ? model.role.id : null);
  const [roleList, setRoleList] = useState([]);

  const getRoles = async () => {
    API.role.getList()
      .then(response => setRoleList(response))
      .catch(error => console.error(error)); 
  };

  useEffect(() => {
    getRoles();
  },[]);

  useEffect(() => {
    model.username = (username).trim();
  }, [username]);
  useEffect(() => {
    model.password = password;
  }, [password]);
  useEffect(() => {
    model.confirmPassword = confirmPassword;
  }, [confirmPassword]);
  useEffect(() => {
    model.roleId = roleId;
  }, [roleId]);

  return (    
    <div className="model-section">
      <form onSubmit={e => e.preventDefault()}>
      <div className='group-label'>
        <label>Имя пользователя</label>
        <input type="text" placeholder="Имя пользователя..."
          value={username} onChange={(e) => setUsername(e.target.value)}
          minLength={3} maxLength={30}
        />  
      </div>
      <div className='group-label'>
        <label>Пароль</label>
        <input type="password" placeholder="Пароль..."
          value={password} onChange={(e) => setPassword(e.target.value)}
          minLength={3} maxLength={30}
        />
      </div>
      <div className='group-label'>
        <label>Повторите пароль</label>
        <input type="password" placeholder="Повторите пароль..."
          value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
          minLength={3} maxLength={30}
        />
      </div>
      <div className='group-label'>
        <label>Роль</label>
        <CatalogRef 
          size={1} 
          defaultValue={ model.role ? model.role : null } 
          onChange={setRoleId}
          url={"role"}
          path={"name"}
          placeholder="Выберите роль..."
          returnValue="value"
        />
      </div>
      </form>
    </div>
  );
}

export default User;