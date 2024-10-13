import classes from './questionButton.module.css'

const QuestionButton = (props) => {
    const { setModalActive, level, numberQuestion, setNumberQuestion, isCloseQuestions } = props;
    const handleClick = () => {
        setModalActive(true)
        setNumberQuestion(numberQuestion);
    }
    return (
        <td className={classes.question_button_wrapper}>
            {isCloseQuestions === undefined ?
                <a href='#' className={classes.question_button} onClick={() => handleClick()}>{level ? level * 10 : '?'}</a>
                :
                isCloseQuestions ?
                    <a href='#' className={`${classes.question_button} ${classes.green}`} onClick={() => handleClick()}>{level ? level * 10 : '?'} &#9989;</a>
                    :
                    <a href='#' className={`${classes.question_button} ${classes.red}`} onClick={() => handleClick()}>{level ? level * 10 : '?'} &#10060;</a>
            }
        </td>
    );
}



export default QuestionButton;