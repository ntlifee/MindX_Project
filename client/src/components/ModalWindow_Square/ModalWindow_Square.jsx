import classes from './modalWindow_Square.module.css'
import { useState, useEffect } from 'react'

const ModalWindow_Square = (props) => {
    const { active, setActive, numberQuestion, isCloseQuestions, setisCloseQuestions, score, setScore } = props;
    const [time, setTime] = useState(120);
    const checkCloseQuestions = isCloseQuestions[numberQuestion - 1]
    const scoreQuestion = (((numberQuestion - 1) % 5 + 1) * 10)
    useEffect(() => {
        time > 0 ? setTimeout(() => setTime(time - 1), 1000) : handleAnswer();
    }, [time]);


    const handleAnswer = () => {
        if (checkCloseQuestions === undefined) {
            //#region Обработки ответа

            //#endregion

            //#region development
            CloseQuestion(true)
            ChangeScore(1)
            //#endregion

            setActive(false)
        }
    }
    const handleSurrender = () => {
        CloseQuestion(false)
        ChangeScore(-1)
        setActive(false)
    }
    const CloseQuestion = (status) => {
        isCloseQuestions[numberQuestion - 1] = status
        setisCloseQuestions(isCloseQuestions)
    }
    const ChangeScore = (koef) => {
        setScore(score + scoreQuestion * koef)
    }

    return (
        <div className={active ? `${classes.modal_dark} ${classes.active}` : classes.modal_dark}>
            <div className={classes.modal_window_square}>
                <div className={classes.content_question}>
                    some content
                </div>
                <div className={classes.content_answer}>
                    {checkCloseQuestions === undefined ?
                        <textarea defaultValue='' placeholder='Введите ответ:' className={classes.text_answer} /> :
                        <textarea defaultValue='your answer' readOnly className={classes.text_answer} />}
                    {checkCloseQuestions === undefined ?
                        <span className={classes.time}>{time}</span> :
                        checkCloseQuestions ?
                            <span className={classes.time}>&#9989;</span> :
                            <span className={classes.time}>&#10060;</span>
                    }
                    <div className={classes.content_buttons}>
                        {checkCloseQuestions === undefined ?
                            <><button className={`${classes.button} ${classes.green}`} onClick={() => handleAnswer()}>Ответить</button>
                                <button className={`${classes.button} ${classes.red}`} onClick={() => handleSurrender()}>Сдаться (-{scoreQuestion})</button></> :
                            <button className={`${classes.button} ${classes.red}`} onClick={() => setActive(false)}>Закрыть</button>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalWindow_Square;