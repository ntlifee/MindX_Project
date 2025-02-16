import './lobby.scss'
import GameCard from './components/GameCard/GameCard';
import { API } from '@mindx/http/API';
import { useState, useEffect } from 'react';
import { ErrorEmmiter, SuccessEmmiter } from '@mindx/components/UI/Toastify/Notify';

const Lobby = (props) => {
  //#region development
  const { type } = props;
  
  const [gameList, setGameList] = useState([]);
  //#endregion

  useEffect(() => {
    API.lobby.getList(type)
      .then(response => setGameList(response))
      .catch((error) => {
        const errorsArray = error.response.data.errors;
        errorsArray.forEach((errorMessage) => ErrorEmmiter(errorMessage));
        console.error(error);
      });
      /* setGameList([
        {
          "id": "12345678-abcd-4efg-9hij-klmnopqrstuv",
          "typeGame": "square",
          "name": "Квадратная головоломка",
          "startDate": "2023-12-01T10:00:00.000Z",
          "endDate": "2023-12-31T23:59:59.000Z",
          "imageId": "5e44ecf5-cb8c-4d33-94ce-d2424f440ae5"
        },
        {
          "id": "98765432-zyxw-4vut-9srq-ponmlkjihgfe",
          "typeGame": "carousel",
          "name": "Карусель знаний",
          "startDate": "2024-01-15T09:00:00.000Z",
          "endDate": "2024-02-15T18:00:00.000Z"
        },
        {
          "id": "11223344-aabb-4ccdd-9eef-fgghhiijjkkl",
          "typeGame": "square",
          "name": "Логический квадрат",
          "startDate": "2024-03-01T12:00:00.000Z",
          "endDate": "2024-03-31T23:59:59.000Z",
          "imageId": "5e44ecf5-cb8c-4d33-94ce-d2424f440ae5"
        },
        {
          "id": "22334455-bbcc-4ddee-9ffg-ghhiijjkkllm",
          "typeGame": "carousel",
          "name": "Вращающиеся вопросы",
          "startDate": "2024-04-10T08:00:00.000Z",
          "endDate": "2024-05-10T20:00:00.000Z",
          "imageId": "498d1792-e537-4fad-8f00-e1b358cdbae6"
        },
        {
          "id": "33445566-ccdd-4eeff-9ggh-hiijjkkllmmn",
          "typeGame": "square",
          "name": "Квадратный марафон",
          "startDate": "2024-06-01T15:00:00.000Z",
          "endDate": "2024-06-30T23:59:59.000Z",
          "imageId": "498d1792-e537-4fad-8f00-e1b358cdbae6"
        },
        {
          "id": "44556677-ddee-4ffgg-9hhi-ijjkkllmmnno",
          "typeGame": "carousel",
          "name": "Карусель эрудиции",
          "startDate": "2024-07-15T11:00:00.000Z",
          "endDate": "2024-08-15T22:00:00.000Z",
          "imageId": "fa3595e1-1a19-4b58-bec9-16f2863f539f",
        },
        {
          "id": "55667788-eeff-4gghh-9iij-jkkllmmnnoop",
          "typeGame": "square",
          "name": "Квадрат возможностей",
          "startDate": "2024-09-01T14:00:00.000Z",
          "endDate": "2024-09-30T23:59:59.000Z",
          "imageId": "fa3595e1-1a19-4b58-bec9-16f2863f539f"
        },
        {
          "id": "66778899-ffgg-4hhii-9jjk-kllmmnnoopp",
          "typeGame": "carousel",
          "name": "Круговорот знаний",
          "startDate": "2024-10-10T10:00:00.000Z",
          "endDate": "2024-11-10T21:00:00.000Z"
        },
        {
          "id": "77889900-gghh-4iijj-9kkl-lmmnnoopp",
          "typeGame": "square",
          "name": "Квадратный вызов",
          "startDate": "2024-12-01T13:00:00.000Z",
          "endDate": "2024-12-31T23:59:59.000Z",
          "imageId": "fa3595e1-1a19-4b58-bec9-16f2863f539f"
        },
        {
          "id": "88990011-hhii-4jjkk-9llm-mnnoopp",
          "typeGame": "carousel",
          "name": "Карусель открытий",
          "startDate": "2025-01-15T09:00:00.000Z",
          "endDate": "2025-02-15T18:00:00.000Z"
        }
      ]) */
  }, [type]);

  useEffect(() => {/* console.log(gameList) */}, [gameList]);

  return (
    <main className="lobby-section">
      <div className="container">
        <div className="access_text">
          <h1>Список игр</h1>
        </div>
        {/*  TODO: Сделать select и searchstring */}
        <ul className="games">
          {gameList.map((card, index) => {
            return <GameCard key={index} model={card}/>
          })}
        </ul>
      </div>
    </main>
  );
}

export default Lobby;