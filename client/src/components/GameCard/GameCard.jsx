import classes from './gameCard.module.css'
import { NavLink } from 'react-router-dom';

const GameCard = (props) => {
    const { imgName, id } = props
    //#region development
    const STATUS = [
        { status: 'Запущена', color: 'green' },
        { status: 'Завершено', color: 'red' },
        { status: 'Ожидание', color: 'yellow'}
    ]
    const min = 0;
    const max = 2;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    const GameStatus = STATUS[randomNum];
    const randomNumber = Math.floor(Math.random() * (250 - 10 + 1)) + 10;
    //#endregion
    return (
        <li className={classes.game_item}>
            <div className={classes.wrapper}>
                <div className={classes.status}>
                    <div className={classes.circle} style={{ backgroundColor: GameStatus.color }} title={`${GameStatus.status}`}></div>
                    <div className={classes.game_name}>Игра #{randomNumber}</div>
                </div>
                <img src={imgName ? `/img/${imgName}` : `/img/without_image.png`} className={classes.game_img} alt='gameIMG' />
                <div className={classes.game_info}>
                </div>
                <NavLink to={`/square/${id}`} className={classes.start_game_button}>Начать игру</NavLink>
            </div>
        </li>
    );
}

export default GameCard;