import classes from './gameCard.module.css'

const GameCard = (props) => {
    const { imgName } = props
    return (
        <li className={classes.game_item}>
            <div className={classes.wrapper}>
                <img src={`/img/${imgName}`} className={classes.game_img} alt='gameIMG' />
                <div className={classes.game_info}>

                </div>
                <a href='#' className={classes.start_game_button}>Начать игру</a>
            </div>
        </li>
    );
}

export default GameCard;