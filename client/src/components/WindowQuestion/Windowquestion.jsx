import classes from './windowquestion.module.css'

import InputComponent from '../../components/Input/Input';

const WindowQuestion = (props) => {
    const { question, point, inputValue, action, isCorrect, readOnly, idx } = props;
    return (
        <div className={`${classes.window_question} ${isCorrect ? classes.correct : isCorrect === false ? classes.incorrect : ''}`}>
            <div className={classes.points}>Вопрос #{idx} стоимость: <strong>{point}</strong></div>
            <label
                className={classes.label}
                htmlFor="input-answer">{question}</label>

            <InputComponent
                className={classes.input_answer}
                inputId={"input-answer"}
                inputValue={inputValue}
                placeholder={"Введите ответ!"}
                readOnly={readOnly}
                action={action}
            />
        </div>
    );
}

export default WindowQuestion;