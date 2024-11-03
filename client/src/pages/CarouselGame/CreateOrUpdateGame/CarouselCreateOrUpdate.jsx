import classes from './carouselcreteorupdate.module.css'
import SelectNumber from '../../../components/SelectNumber/SelectNumber';

const CarouselCreateOrUpdate = () => {
    return (
        <main className={classes.section}>
            <div className="container">
                <div className={classes.wrapper}>
                    <SelectNumber Name={'Балл первого вопроса:'} />
                    <SelectNumber Name={'Получение за правильный ответ:'} />
                    <SelectNumber Name={'Снятие за неправильный ответ:'} />

                </div>
            </div>
        </main>
    );
}

export default CarouselCreateOrUpdate;