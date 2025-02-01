import classes from './bonusSquare.module.css'

const BonusSquare = (props) => {
    const { value, bonus } = props
    return (
        (bonus === null ?
            <td className={classes.bonus}>+{value}</td> :
            bonus ?
                <td className={`${classes.bonus} ${classes.true}`}>+{value} &#9989;</td> :
                <td className={`${classes.bonus} ${classes.false}`}>&#10060;</td>
        )
    );
}

export default BonusSquare;