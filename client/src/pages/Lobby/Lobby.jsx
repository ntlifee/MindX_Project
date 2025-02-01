import './lobby.scss'
import GameCard from '@mindx/components/GameCard/GameCard';

const Lobby = (props) => {
  //#region development
  const { type } = props;
  const arrayCard = [
    { imgName: '71.jpg', id: 1, type: "square" },
    { imgName: '', id: 2, type: "square" },
    { imgName: '71.jpg', id: 3, type: "square" },
    { imgName: '', id: 4, type: "square" },
    { imgName: '', id: 5, type: "carousel" },
    { imgName: '71.jpg', id: 6, type: "carousel" },
    { imgName: '71.jpg', id: 7, type: "carousel" }
  ]
  //#endregion

  //TODO: Сделать запрос по type

  return (
    <main className="lobby-section">
      <div className="container">
        <div className="access_text">
          <h1>Список игр</h1>
        </div>
        {/*  TODO: Сделать select и searchstring */}
        <ul className="games">
          {arrayCard.map((card, index) => {
            return <GameCard key={index} type={type} imgName={card.imgName} id={card.id} />
          })}
        </ul>
      </div>
    </main>
  );
}

export default Lobby;