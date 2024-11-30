import './navbar.scss';
import AccountBtn from '../AccountBtn/AccountBtn';
import { NavLink } from 'react-router-dom';
import Logo from './../../components/Logo/Logo';
import { useState, useEffect } from "react";
import BurgerButton from './../BurgerButton/BurgerButton';

const Navbar = (props) => {
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
                                    <NavLink to="/game3" className={({ isActive }) => `${isActive ? activeLink : passiveLink} ${strongLink}`}>
                                        Игра3
                                    </NavLink>
                                </li>
                                <li className="nav-list_item">
                                    <NavLink to="/game4" className={({ isActive }) => `${isActive ? activeLink : passiveLink} ${strongLink}`}>
                                        Игра4
                                    </NavLink>
                                </li>
                                <li className="nav-list_item">
                                    <NavLink to="/rating" className={({ isActive }) => isActive ? activeLink : passiveLink}>
                                        Рейтинг
                                    </NavLink>
                                </li>
                                <li className="nav-list_item">
                                    <NavLink to="/admin" className={({ isActive }) => isActive ? activeLink : passiveLink}>
                                        Админ-панель
                                    </NavLink>
                                </li>
                                <li className="nav-list_item">
                                    <NavLink to="/signin" className='button authorize'>
                                        Войти / Зарегистрироваться
                                    </NavLink>
                                </li>
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
};

export default Navbar;
