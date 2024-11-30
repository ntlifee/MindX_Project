import './auth.scss';
import { ROUTES } from '../../utils/consts.js';
import { API } from '../../http/API.js';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';

const SignIn = observer( () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const click = async () => {
    try {
      const response = await API.user.SingIn(username, password);
    } catch(e) {
      console.error(e);
    }
  };
  return ( 
    <main className='auth-section'>
      <div className="signin-section">
        <h1 className='auth-title'>Вход</h1>
        <form className='auth-form' onSubmit={e => e.preventDefault()}>
          <div>
            <label htmlFor='login'>Логин</label>
            <input type='text' id='login' className='auth-input'
                  value={username} onChange={e => setUsername(e.target.value)}/>
          </div>
          <div>
            <label htmlFor='password'>Пароль</label>
            <input type='password' id='password' className='auth-input'
                  value={password} onChange={e => setPassword(e.target.value)}/>
          </div>
          <div className='btn-section'>
            <a className='btn sign' href={ROUTES.SIGNUP_ROUTE}>Нет аккаунта?</a>
            <button className='btn auth' onClick={click}>Войти</button>
          </div>
        </form>
      </div>
    </main>
  );
}
) 
export default SignIn;