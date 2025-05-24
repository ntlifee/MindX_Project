import './burgerMenu.scss';
import { NavLink } from 'react-router-dom';
import { useContext } from "react";
import { Context } from '@mindx/index.js';
import { observer } from 'mobx-react-lite';
import { CloseOutlined } from '@ant-design/icons';

const BurgerMenu = observer((props) => {
    const { user } = useContext(Context);
    const { isActiveBurger, setIsActiveBurger } = props;

    const logout = () => {
        user.logout();
        localStorage.setItem('token', null);
        setIsActiveBurger(false);
    };

    return (
        <div className={`burger-overlay ${isActiveBurger ? 'active' : ''}`} onClick={() => setIsActiveBurger(false)}>
            <div className='burger-menu' onClick={(e) => e.stopPropagation()}>
                <button className="burger-close-btn" onClick={() => setIsActiveBurger(false)}>
                    <CloseOutlined />
                </button>
                
                <ul className='burger-list'>
                    {
                        user.isAuth &&
                        <>
                            <li className='burger-list__item'>
                                <NavLink to="/square" onClick={() => setIsActiveBurger(false)}>
                                    Квадрат
                                </NavLink>
                            </li>
                            <li className='burger-list__item'>
                                <NavLink to="/carousel" onClick={() => setIsActiveBurger(false)}>
                                    Карусель
                                </NavLink>
                            </li>
                            <li className='burger-list__item'>
                                <NavLink to="/rating" onClick={() => setIsActiveBurger(false)}>
                                    Рейтинг
                                </NavLink>
                            </li>
                        </>
                    }
                    {user.isAdmin && (
                        <li className='burger-list__item'>
                            <NavLink to="/admin" onClick={() => setIsActiveBurger(false)}>
                                Админ-панель
                            </NavLink>
                        </li>
                    )}
                    
                    {user.isAuth ? (
                        <li className="burger-list__item logout" onClick={logout}>
                            Выйти
                        </li>
                    ) : (
                        <li className="burger-list__item login">
                            <NavLink to="/signin" onClick={() => setIsActiveBurger(false)}>
                                Войти
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
});

export default BurgerMenu;