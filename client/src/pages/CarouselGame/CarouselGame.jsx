import classes from './carouselgame.module.css'

import WindowQuestion from '../../components/WindowQuestion/Windowquestion'

import Data from './Questions_Carousel.json'

/*import axios from 'axios' */
import { useEffect, useState } from 'react'

const CarouselGame = () => {

    const { scoreFirstQuestion, scoreSuccess, scoreFailure, progressUser, questionsGame } = Data
    const [idx, setIdx] = useState(progressUser.length) //индекс вопроса ожидающего ответа
    const [idxPre, setIdxPre] = useState(idx) //индекс текещего вопроса
    const [value, setValue] = useState('') //значение введенное пользователем
    const [questions] = useState(questionsGame) //вопросы
    const [progress, setProgress] = useState([
        ...progressUser,
        ...new Array(questions.length - progressUser.length + 1).fill({ points: scoreFirstQuestion, isCorrect: null })
    ]) //прогресс пользователя

    //проверяем ответ
    const isCorrectAnswer = () => {
        return questions[idx].answer === value
    }

    useEffect(() => {
        if (idx === questions.length) {
            setIdx(idx - 1)
            setIdxPre(prevIdx => {
                const newIdx = prevIdx - 1
                return newIdx; // возвращаем новый индекс
            });
            alert('Игра окончена!')
        }
    }, [idx, questions])

    const handleSubmit = () => {
        const isCorrect = isCorrectAnswer()

        //балл для следующего вопроса
        if (isCorrect) {
            setProgress(prevState => {
                const newProgress = [...prevState]
                newProgress[idx] = { points: newProgress[idx].points + scoreSuccess, isCorrect: isCorrect }
                return newProgress
            })
        } else {
            setProgress(prevState => {
                const newProgress = [...prevState]
                newProgress[idx] = { points: Math.max(scoreFirstQuestion, newProgress[idx].points - scoreFailure), isCorrect: isCorrect }
                return newProgress
            })
        }

        setValue('')
        setIdxPre(idxPre + 1)
        setIdx(idx + 1)
        console.log(idxPre + 1)
    }

    const idxPreSub = () => {
        if (idxPre > 0)
            setIdxPre(idxPre - 1)
        return
    }

    const idxPreInc = () => {
        if (idxPre < idx)
            setIdxPre(idxPre + 1)
        return
    }

    return (
        <main className="section">
            <div className="container">
                <div className={classes.carousel_game}>

                    {idxPre > 0 && <WindowQuestion key={idxPre - 1}
                        question={questions[idxPre - 1].question}
                        point={progress[idxPre - 1].points}
                        inputValue={progress[idxPre - 1].isCorrect ? 'Вы дали верный ответ' : 'Вы дали неверный ответ'}
                        isCorrect={progress[idxPre - 1].isCorrect}
                        readOnly={true}
                        idx={idxPre} />
                    }

                    {idxPre !== questions.length && <WindowQuestion key={idxPre}
                        question={questions[idxPre].question}
                        point={progress[idxPre].points}
                        inputValue={progress[idxPre].isCorrect ? 'Вы дали верный ответ' :
                            progress[idxPre].isCorrect === false ? 'Вы дали неверный ответ' : value}
                        isCorrect={progress[idxPre].isCorrect}
                        readOnly={progress[idxPre].isCorrect === null ? false : true}
                        action={progress[idxPre].isCorrect === null ? setValue : null}
                        idx={idxPre + 1} />
                    }

                    {idxPre !== idx && <WindowQuestion key={idxPre + 1}
                        question={questions[idxPre + 1].question}
                        point={progress[idxPre + 1].points}
                        inputValue={progress[idxPre].isCorrect ? 'Вы дали верный ответ' :
                            progress[idxPre + 1].isCorrect === false ? 'Вы дали неверный ответ' : value}
                        isCorrect={progress[idxPre + 1].isCorrect}
                        readOnly={true}
                        idx={idxPre + 2} />
                    }
                    <div className={classes.button_wrapper}>
                        {idxPre !== 0 && <button onClick={idxPreSub} className={classes.button_answer}>{'<'}</button>}
                        {idx !== questions.length && idxPre === idx && <button onClick={handleSubmit} className={classes.button_answer}>Ответить</button>}
                        {idxPre !== idx && <button onClick={idxPreInc} className={classes.button_answer}>{'>'}</button>}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default CarouselGame