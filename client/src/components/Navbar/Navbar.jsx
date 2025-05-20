import './navbar.scss';
import { NavLink } from 'react-router-dom';
import Logo from './../../components/UI/Logo/Logo';
import { useState, useEffect, useContext } from "react";
import BurgerButton from './../BurgerButton/BurgerButton';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';

const Navbar = observer((props) => {
    const { user } = useContext(Context);
    const strongLink = ' link-strong';
    const activeLink = 'nav-list_link nav-list_link-active';
    const passiveLink = 'nav-list_link';
    const [isMobile, setIsMobile] = useState(false);
    const { isActiveBurger, setIsActiveBurger } = props;
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };       
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const logout = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.setItem(`token`, null);
        window.location.reload();
    };

    return (
        <nav className="nav">
            <div className="container">
                <div className="nav-row">
                    {!isMobile ? (
                        <>
                            <NavLink to="/" className="logo_left">
                                <Logo Width='70px' Height='42px' />
                            </NavLink>
                            <ul className="nav-list">
                                {
                                    user.isAuth &&
                                    <>
                                        <li className="nav-list_item">
                                            <NavLink to="/square" className={({ isActive }) => `${isActive ? activeLink : passiveLink} ${strongLink}`}>
                                                Квадрат
                                            </NavLink>
                                        </li>
                                        <li className="nav-list_item">
                                            <NavLink to="/carousel" className={({ isActive }) => `${isActive ? activeLink : passiveLink} ${strongLink}`}>
                                                Карусель
                                            </NavLink>
                                        </li>
                                        <li className="nav-list_item">
                                            <NavLink to="/rating" className={({ isActive }) => isActive ? activeLink : passiveLink}>
                                                Рейтинг
                                            </NavLink>
                                        </li>
                                    </>
                                }
                                {
                                    user.isAdmin &&
                                    <li className="nav-list_item">
                                    <NavLink to="/admin" className={({ isActive }) => isActive ? activeLink : passiveLink}>
                                        Админ-панель
                                    </NavLink>
                                </li>
                                }
                                { !user.isAuth ? 
                                    <li className="nav-list_item">
                                        <NavLink to="/signin" className='button authorize'>
                                            Войти / Зарегистрироваться
                                        </NavLink>
                                    </li> 
                                    :
                                    <li className="nav-list_item auth">
                                        <NavLink className='button authorize'>
                                            {user.user.username}
                                        </NavLink>
                                        <button className='button unauthorize' onClick={() => logout()}>
                                            Выйти
                                        </button>
                                    </li>
                                }
                            </ul>
                        </>
                    ) : (
                        <>
                            <BurgerButton setIsActiveBurger={setIsActiveBurger} />
                            <NavLink to="/" className="logo_center">
                                <Logo Width='70px' Height='42px' />
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
});

export default Navbar;
