import './auth.scss'
import { ROUTES } from '../../utils/consts.js';
import { API } from '../../http/API.js';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const click = async () => {
    try {
      const response = await API.user.SignUp(username, password, repeatPassword);
    } catch(e) {
      console.error(e);
    }
  };
  return ( 
    <main className='auth-section'>
      <div className="signup-section">
      <h1 className='auth-title'>Регистрация</h1>
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
          <div>
            <label htmlFor='repeat_password'>Повторите пароль</label>
            <input type='password' id='repeat_password' className='auth-input'
                  value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)}/>
          </div>
          <div className='btn-section'>
            <a className='btn sign' href={ROUTES.SIGNIN_ROUTE}>Уже есть аккаунт?</a>
            <button className='btn auth' onClick={click}>Зарегистриоваться</button>
          </div>
        </form>
      </div>
    </main>
  );
}
 
export default SignUp;