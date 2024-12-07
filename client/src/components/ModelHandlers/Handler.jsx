import './handler.scss'
import Model from './Models';
import { API } from '../../http/API';

const Handler = (props) => {
  const { model, type, setSelected, ErrorEmmiter, SuccessEmmiter } = props;
  const Component = Model[type];
  const send = async () => {
    try {
      const data = await API.question.update(model);
      SuccessEmmiter(data.message);
      setSelected(null);
    } catch(e) {     
      ErrorEmmiter(e.response.data.message);
      console.error(e);
    }
  };
  return ( 
    <div className="handler-section">
      {model.mode === 'edit' ? 
        <>
          <div className='btn-container'>
            <button className='btn success' onClick={() => send()}>Сохранить</button>
            <button className='btn cancel' onClick={() => setSelected(null)}>Отменить</button>
          </div>
        </>
        :
        <>
        </>
      }
      <Component model={model}/>
    </div>
   );
}
 
export default Handler;