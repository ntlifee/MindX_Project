import './model.scss';
import { useState, useEffect } from 'react';
import CatalogRef from '@mindx/components/UI/CatalogRef/CatalogRef';
import MXSelect from '@mindx/components/UI/MXSelect/MXSelect';
import MXDatetime from '@mindx/components/UI/MXDatetime/MXDatetime';
import moment from 'moment';


const Game = (props) => { 
  const { model } = props;

  const [typeGame, setTypeGame] = useState(model?.type ? model.type : '');
  const [name, setName] = useState(model?.name ? model.name : '');
  const [startDate, setStartDate] = useState(model?.startDate ? moment(model.startDate) : null);
  const [endDate, setEndDate] = useState(model?.endDate ? moment(model.endDate) : null);
  const [imageId, setImageId] = useState(null);
  const [accessRole, setAccessRole] = useState([]);

  const TYPE_LIST = [
    {
      value: 'square',
      label: 'Квадрат'
    },
    {
      value: 'carousel',
      label: 'Карусель'
    }
  ]

  useEffect(() => {
    model.typeGame = typeGame;
  }, [typeGame]);
  useEffect(() => {
    model.name = name;
  }, [name]);
  useEffect(() => {
    model.startDate = startDate;
  }, [startDate]);
  useEffect(() => {
    model.endDate = endDate;
  }, [endDate]);
  useEffect(() => {
    model.imageId = imageId;
  }, [imageId]);
  useEffect(() => {
    model.accessRole = accessRole;
  }, [accessRole]);
  
  return (    
    <div className="model-section">
      <form onSubmit={e => e.preventDefault()}>
        <div className='group-label'>
          <label>Тип</label>
          <MXSelect 
            options={TYPE_LIST}
            onChange={setTypeGame}
            placeholder="Выберите тип..."
          />
        </div>     
        <div className='group-label'>
          <label>Название</label>
          <input type="text" placeholder="Название..."
            value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className='group-label'>
          <label>Дата начала</label>
          <MXDatetime 
            initialValue={moment(model?.startDate ? moment(model.startDate) : null)}
            onChange={setStartDate}/>
        </div>
        <div className='group-label'>
          <label>Дата окончания</label>
          <MXDatetime 
            initialValue={moment(model?.endDate ? moment(model.endDate) : null)}
            onChange={setEndDate}/>
        </div>
        <div className='group-label'>    
        <label>Изображение</label>
          <CatalogRef 
            defaultValue={ model.imageId ? model.imageId : null } 
            onChange={setImageId}
            url={"image"}
            img={true}
            placeholder="Выберите изображение..."
          />
        </div>
        <div className='group-label'>    
        <label>Доступно для ролей</label>
          <CatalogRef 
            /* defaultValue={ model.imageId ? model.imageId : null }  */
            onChange={setAccessRole}
            isMulti
            url={"role"}
            path={"name"}
            placeholder="Выберите роли..."
          />
        </div>
      </form>
    </div>
  );
}

export default Game;