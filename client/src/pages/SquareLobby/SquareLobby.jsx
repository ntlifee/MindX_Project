import classes from './squarelobby.module.css'
import GameCard from '../../components/GameCard/GameCard';

const SquareLobby = () => {
    return (
        <main className="section">
            <div className="container">
                <div className={classes.access_text}>
                    <h1>Доступные игры</h1>
                </div>
                <ul className={classes.games}>
                    <GameCard imgName='without_image.png' />
                    <GameCard imgName='without_image.png' />
                    <GameCard imgName='without_image.png' />
                    <GameCard imgName='without_image.png' />
                    <GameCard imgName='without_image.png' />
                    <GameCard imgName='without_image.png' />
                    <GameCard imgName='71.jpg' />
                    <GameCard imgName='71.jpg' />
                    <GameCard imgName='71.jpg' />
                    <GameCard imgName='71.jpg' />
                    <GameCard imgName='71.jpg' />
                    <GameCard imgName='71.jpg' />
                    <GameCard imgName='71.jpg' />
                    <GameCard imgName='71.jpg' />
                    <GameCard imgName='71.jpg' />
                    <GameCard imgName='71.jpg' />
                </ul>
            </div>
        </main>
    );
}

export default SquareLobby;