import classes from './burgerMenu.module.css'
import { NavLink } from 'react-router-dom';

const BurgerMenu = (props) => {
    const { isActiveBurger, setIsActiveBurger } = props;
    return (
        <div className={isActiveBurger ? `${classes.dark_theme} ${classes.active}` : classes.dark_theme} onClick={() => setIsActiveBurger(false)}>
            <div className={classes.burger} onClick={(e) => e.stopPropagation()}>
                <ul className={classes.burger_list}>
                    <li className={classes.burger_list_item}>
                        <NavLink to="/square">
                            Квадрат
                        </NavLink>
                    </li>
                    <li className={classes.burger_list_item}>
                        <NavLink to="/carousel">
                            Карусель
                        </NavLink>
                    </li>
                    <li className={classes.burger_list_item}>
                        <NavLink to="/game3">
                            Игра3
                        </NavLink>
                    </li>
                    <li className={classes.burger_list_item}>
                        <NavLink to="/game4">
                            Игра4
                        </NavLink>
                    </li>
                    <li className={classes.burger_list_item}>
                        <NavLink to="/rating">
                            Рейтинг
                        </NavLink>
                    </li>
                    <li className={classes.burger_list_item}>
                        <NavLink to="/admin">
                            Админ-панель
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default BurgerMenu;