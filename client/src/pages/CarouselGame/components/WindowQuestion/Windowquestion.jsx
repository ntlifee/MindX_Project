import classes from './windowquestion.module.css'

import InputComponent from '@mindx/components/UI/Input/Input';

const WindowQuestion = (props) => {
    const { question, point, inputValue, action, isCorrect, readOnly, idx, isCentre, visibility, animation } = props;
    return (
        <div className={`
            ${classes.window_question} 
            ${isCentre ? classes.window_question_big : classes.window_question_small} 
            ${isCorrect ? classes.correct : isCorrect === false ? classes.incorrect : ''}
            ${visibility}
            ${animation}`
        }>

            <div className={classes.points}>Вопрос #{idx} стоимость: <strong>{point}</strong></div>

            <label
                className={!animation && isCentre ? classes.label_centre : classes.label}
                htmlFor={idx}>{question || '???'}</label>

            <InputComponent
                className={classes.input_answer}
                inputId={idx}
                inputValue={inputValue}
                placeholder={"Введите ответ!"}
                readOnly={readOnly}
                action={action}
            />

        </div>
    );
}

export default WindowQuestion;