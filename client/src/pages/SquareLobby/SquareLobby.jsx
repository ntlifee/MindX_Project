import classes from './squarelobby.module.css'
import GameCard from '../../components/GameCard/GameCard';

const SquareLobby = () => {
    //#region development
        const arrayCard = [
            {imgName: '71.jpg', id: 1},
            {imgName: '', id: 2},
            {imgName: '71.jpg', id: 3},
            {imgName: '', id: 4},
            {imgName: '', id: 5},
            {imgName: '71.jpg', id: 6},
            {imgName: '71.jpg', id: 7}
        ]
    //#endregion
    return (
        <main className="section">
            <div className="container">
                <div className={classes.access_text}>
                    <h1>Доступные игры</h1>
                </div>
                <ul className={classes.games}>
                    {arrayCard.map((card, index) => {
                        return <GameCard key={index} imgName={card.imgName} id={card.id} />
                    })}
                </ul>
            </div>
        </main>
    );
}

export default SquareLobby;