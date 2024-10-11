import classes from './carouselgame.module.css'

import WindowQuestion from '../../components/WindowQuestion/Windowquestion'

import Data from './Questions_Carousel.json'

/*import axios from 'axios' */
import { useState } from 'react'

const CarouselGame = () => {

    const { scoreFirstQuestion, scoreSuccess, scoreFailure, progressUser, questionsGame } = Data
    const [idx, setIdx] = useState(0) //индекс вопроса
    const [value, setValue] = useState('') //значение введенное пользователем
    const [score, setScore] = useState(scoreFirstQuestion) //балл текущего вопроса
    const [questions] = useState(questionsGame) //вопросы
    const [progress, setProgress] = useState(progressUser) //прогресс пользователя


    //проверяем ответ
    const isCorrectAnswer = () => {
        return questions[idx].answer === value
    }

    const handleSubmit = () => {
        const isCorrect = isCorrectAnswer()
        setProgress([...progress, { points: score, isCorrect: isCorrect }]) //обновление прогресса пользователя

        //балл для следующего вопроса
        if (isCorrect) {
            setScore(score + scoreSuccess)
        } else {
            setScore(Math.max(scoreFirstQuestion, score - scoreFailure))
        }
        setValue('')
        setIdx(idx + 1)
    }

    return (
        <main className="section">
            <div className="container">
                <div className={classes.carousel_game}>
                    {idx > 0 && <WindowQuestion key={idx - 1}
                        question={questions[idx - 1].question}
                        point={progress[idx - 1].points}
                        inputValue={progress[idx - 1].isCorrect ? 'Верный ответ' : 'Не верный ответ'}
                        isCorrect={progress[idx - 1].isCorrect}
                        readOnly={true} />
                    }
                    {idx !== questions.length && <WindowQuestion key={idx}
                        question={questions[idx].question}
                        point={score}
                        inputValue={value}
                        readOnly={false}
                        action={setValue} />}
                    {idx !== questions.length && <button onClick={handleSubmit} className={classes.button_answer}>Следующий вопрос</button>}
                </div>
            </div>
        </main>
    )



    /* const [carouselData, setCarouselData] = useState()

    useEffect(() => {
        const apiUrl = ''
        axios.get(apiUrl).then((resp) => {
            const allData = resp.data
            console.log(allData)
            setCarouselData(allData)
        })
    }, [setCarouselData])

    const { scoreFirstQuestion, scoreSuccess, scoreFailure, questions } = questionData
    const [idx, setIdx] = useState(0) //индекс вопроса
    const [value, setValue] = useState('') //значение введенное пользователем
    const [question, setQuestion] = useState('') //текущий вопрос
    const [answeredStatus, setAnsweredStatus] = useState(Array(questions.length).fill(null)) //массив статуса строк
    const [scores, setScores] = useState([scoreFirstQuestion, ...Array(questions.length - 1).fill(null)]) // первая ячейка с баллом, остальные пустые

    useEffect(() => {
        console.log(idx)
        if (idx !== questions.length) {
            setQuestion(questions[idx].question)
        } else {
            setQuestion('Тест окончен')
        }
    }, [idx])

    const handleSubmit = () => {
        if (idx === questions.length) {
            return
        }
        const isCorrect = questions[idx].answer === value //проверяем ответ
        const updatedStatus = [...answeredStatus] // копируем массив статусов
        updatedStatus[idx] = isCorrect ? 'correct' : 'incorrect' // обновляем статус текущего вопроса

        const updatedScores = [...scores] // копируем массив баллов
        if (isCorrect) {
            updatedScores[idx + 1] = updatedScores[idx] + scoreSuccess // добавляем scoreSuccess
        } else {
            updatedScores[idx + 1] = Math.max(scoreFirstQuestion, updatedScores[idx] - scoreFailure) // вычитаем scoreFailure, но не меньше scoreFirstQuestion
        }

        setAnsweredStatus(updatedStatus) // обновляем статус строк
        setScores(updatedScores) // обновляем баллы
        setValue('')
        setIdx(idx + 1)
    }

    return (
        <main className="section">
            <div className="container">
                <div className="carousel-game">
                    <div className="carousel-wrapper-progress-table">
                        <table id="carousel-progress-table">
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Цена</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className={answeredStatus[0]} key={0}>
                                    <td>1</td>
                                    <td>{scoreFirstQuestion}</td>
                                </tr>
                                {questions.slice(1).map((_, index) => (
                                    <tr className={answeredStatus[index + 1]} key={index + 1}>
                                        <td>{index + 2}</td>
                                        <td>{scores[index + 1]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="carousel-wrapper-question">
                        <label className="carousel-label" htmlFor="input-answer">{question}</label>
                        <div className="carousel-form-answer">
                            <InputComponent inputValue={value} action={setValue} inputId={"input-answer"} placeholder={"Введите ответ!"} />
                            <button onClick={handleSubmit} className="carousel-button-form-answer">Следующий вопрос</button>
                        </div>
                    </div>
                </div>
            </div>
        </main> 
    )*/
}

export default CarouselGame