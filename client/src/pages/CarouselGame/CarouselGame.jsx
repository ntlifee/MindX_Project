import classes from './carouselgame.module.css'

import WindowQuestion from '../../components/WindowQuestion/Windowquestion'
import GameInformationPanel from './../../components/GameInformationPanel/GameInformationPanel'

import Data from './Questions_Carousel.json'

/*import axios from 'axios' */
import { useState } from 'react'

const CarouselGame = () => {

    const { scoreFirstQuestion, scoreSuccess, scoreFailure, progressUser, questionsGame } = Data
    const [idx, setIdx] = useState(progressUser.length) //индекс вопроса ожидающего ответа
    const [idxPre, setIdxPre] = useState(idx) //индекс текещего вопроса
    const [value, setValue] = useState('') //значение введенное пользователем
    const [questions] = useState(questionsGame) //вопросы
    const [score, setScore] = useState(progressUser.reduce((acc, cur) => acc + cur.isCorrect ? cur.points : 0, 0))
    const [progress, setProgress] = useState([
        ...progressUser,
        ...Array.from({ length: questions.length - progressUser.length + 1 }, () => ({
            points: scoreFirstQuestion,
            isCorrect: null,
        }))
    ]) //прогресс пользователя

    const [isAnimationUp, setIsAnimationUp] = useState(false)
    const [isAnimationDown, setIsAnimationDown] = useState(false)

    //проверяем ответ
    const isCorrectAnswer = () => {
        return questions[idx].answer === value
    }

    const handleSubmit = () => {
        const isCorrect = isCorrectAnswer()
        if (idxPre !== questions.length - 1)
            setIsAnimationUp(true)
        const points = isCorrect ? progress[idx].points + scoreSuccess : Math.max(scoreFirstQuestion, progress[idx].points - scoreFailure)
        //изменение прогресса
        setProgress(prevState => {
            const newProgress = [...prevState]
            newProgress[idx].isCorrect = isCorrect
            newProgress[idx + 1].points = points
            return newProgress
        })
        console.log(progress)
        setScore(score + (isCorrect ? progress[idx].points : 0))
        setValue('')
        setIdx(idx + 1)
        setTimeout(() => {
            if (idx + 1 !== questions.length) {
                setIdxPre(idxPre + 1)
            }
            setIsAnimationUp(false); // Сброс анимации после 1 секунды            
        }, idxPre !== questions.length - 1 ? 950 : 0);
    }

    const idxPreSub = () => {
        if (idxPre > 0) {
            setIsAnimationDown(true)
            setTimeout(() => {
                setIdxPre(idxPre - 1)
                setIsAnimationDown(false); // Сброс анимации после 1 секунды            
            }, 950);
        }
        return
    }

    const idxPreInc = () => {
        if (idxPre < idx && idxPre < questions.length - 1) {
            setIsAnimationUp(true)
            setTimeout(() => {
                setIdxPre(idxPre + 1)
                setIsAnimationUp(false); // Сброс анимации после 1 секунды            
            }, 950);
        }
        return
    }

    return (
        <main className={classes.section}>
            <div className="container">
                <div className={classes.carousel_game}>

                    <GameInformationPanel score={score} />

                    <WindowQuestion key={idxPre - 1}
                        question={questions[idxPre - 1]?.question}
                        point={progress[idxPre - 1]?.points}
                        inputValue={progress[idxPre - 1]?.isCorrect ? 'Верный ответ' : 'Неверный ответ'}
                        isCorrect={progress[idxPre - 1]?.isCorrect}
                        readOnly={true}
                        idx={idxPre}
                        visibility={(isAnimationDown && idxPre > 0) || idxPre > 0 ? classes.visible : classes.hidden}
                        animation={isAnimationDown ? classes.action_down_previous : ''} />

                    <WindowQuestion key={idxPre}
                        question={questions[idxPre]?.question}
                        point={progress[idxPre].points}
                        inputValue={progress[idxPre].isCorrect ? 'Вверный ответ' :
                            progress[idxPre].isCorrect === false ? 'Неверный ответ' : value}
                        isCorrect={progress[idxPre].isCorrect}
                        readOnly={progress[idxPre].isCorrect === null ? false : true}
                        action={progress[idxPre].isCorrect === null ? setValue : null}
                        idx={idxPre + 1}
                        isCentre={true}
                        visibility={classes.visible}
                        animation={isAnimationDown ? classes.action_down_center : isAnimationUp ? classes.action_up_center : ''} />

                    {(!isAnimationDown && !isAnimationUp) && <div className={classes.button_wrapper}>
                        <button
                            onClick={idxPreSub}
                            className={`${classes.button_answer} ${idxPre !== 0 ? classes.visible : classes.hidden}`}
                        >Предыдущий</button>

                        <button
                            onClick={!isAnimationUp && idx !== questions.length ? handleSubmit : null}
                            className={`${classes.button_answer} ${idxPre === idx && idx !== questions.length ? classes.visible : classes.hidden}`}
                        >Ответить</button>

                        <button
                            onClick={idxPreInc}
                            className={`${classes.button_answer} ${idxPre !== idx && idxPre !== questions.length - 1 ? classes.visible : classes.hidden}`}
                        >Следующий</button>
                    </div>}

                    <WindowQuestion key={idxPre + 1}
                        question={questions[idxPre + 1]?.question}
                        point={progress[idxPre + 1]?.points}
                        inputValue={progress[idxPre]?.isCorrect ? 'Верный ответ' :
                            progress[idxPre + 1]?.isCorrect === false ? 'Неверный ответ' : value}
                        isCorrect={progress[idxPre + 1]?.isCorrect}
                        readOnly={true}
                        idx={idxPre + 2}
                        visibility={idxPre !== idx && idxPre !== questions.length - 1 ? classes.visible : classes.hidden}
                        animation={isAnimationUp ? classes.action_up_next : ''} />
                </div>
            </div>
        </main>
    )
}

export default CarouselGame