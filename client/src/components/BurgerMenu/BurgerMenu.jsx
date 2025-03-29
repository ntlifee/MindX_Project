import './burgerMenu.scss'
import { NavLink } from 'react-router-dom';
import { useContext } from "react";
import { Context } from '@mindx/index.js';
import { observer } from 'mobx-react-lite';

const BurgerMenu = observer((props) => {
    const { user } = useContext(Context);
    const { isActiveBurger, setIsActiveBurger } = props;

    const logout = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.setItem(`token`, null);
    };
    return (
        <div className={isActiveBurger ? `dark_theme active` : `dark_theme`} onClick={() => setIsActiveBurger(false)}>
            <div className='burger' onClick={(e) => e.stopPropagation()}>
                <ul className='burger_list'>
                    <li className='burger_list_item'>
                        <NavLink to="/square">
                            Квадрат
                        </NavLink>
                    </li>
                    <li className='burger_list_item'>
                        <NavLink to="/carousel">
                            Карусель
                        </NavLink>
                    </li>
                    <li className='burger_list_item'>
                        <NavLink to="/rating">
                            Рейтинг
                        </NavLink>
                    </li>
                    <li className='burger_list_item'>
                        <NavLink to="/admin">
                            Админ-панель
                        </NavLink>
                    </li>
                    <li className="burger_list_item authorize">
                        <NavLink to="/signin">
                            Войти
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
});

export default BurgerMenu;