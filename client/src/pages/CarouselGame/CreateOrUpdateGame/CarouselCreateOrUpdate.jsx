import classes from './carouselcreteorupdate.module.css'
import SelectNumber from '../../../components/SelectNumber/SelectNumber';

import { useState } from 'react'

const CarouselCreateOrUpdate = () => {
    const [scoreFirstQuestion, setScoreFirstQuestion] = useState(1)
    const [scoreSuccess, setScoreSuccess] = useState(1)
    const [scoreFailure, setScoreFailure] = useState(1)
    return (
        <main className={classes.section}>
            <div className="container">
                <div className={classes.wrapper}>
                    <h1 className={classes.title}>Создание и редактирование игры</h1>
                    <div className={classes.select}>
                        <SelectNumber Id={classes.select1} Name={'Первый вопрос:'} Value={scoreFirstQuestion} Min={1} Action={setScoreFirstQuestion} />
                        <SelectNumber Id={'select2'} Name={'Правильный ответ: +'} Value={scoreSuccess} Min={1} Action={setScoreSuccess} />
                        <SelectNumber Id={'select3'} Name={'Неправильный ответ: -'} Value={scoreFailure} Min={1} Action={setScoreFailure} />
                    </div>

                </div>
            </div>
        </main>
    );
}

export default CarouselCreateOrUpdate;