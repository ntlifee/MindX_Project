import classes from './gameCard.module.css'
import { NavLink } from 'react-router-dom';

const GameCard = (props) => {
    const { imgName, id } = props
    return (
        <li className={classes.game_item}>
            <div className={classes.wrapper}>
                <img src={imgName ? `/img/${imgName}` : `/img/without_image.png`} className={classes.game_img} alt='gameIMG' />
                <div className={classes.game_info}>
                </div>
                <NavLink to={`/square/${id}`} className={classes.start_game_button}>Начать игру</NavLink>
            </div>
        </li>
    );
}

export default GameCard;