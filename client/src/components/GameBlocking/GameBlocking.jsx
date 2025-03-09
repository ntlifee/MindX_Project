import './gameBlocking.scss';

const GameBlocking = (props) => {
  const { message } = props;
  return ( 
    <>
      <div className="game-blocking-section">
        <h1>Отказано в доступе.</h1>
        <h1>{message}</h1>
      </div>
    </> 
  );
}
 
export default GameBlocking;