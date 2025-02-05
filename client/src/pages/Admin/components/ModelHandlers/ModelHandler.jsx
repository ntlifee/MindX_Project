import './handler.scss'
import Model from './Models';
import { API } from '@mindx/http/API';
import { ErrorEmmiter, SuccessEmmiter } from '@mindx/components/UI/Toastify/Notify';

const ModelHandler = (props) => {
  const { state, setState, setReload } = props;
  const Component = Model[state.type];

  const put = async () => {
    try {
      const data = await API[state.type].update(state.item);
      SuccessEmmiter(data.message);
      setReload(true);
      cancel();
    } catch(error) {     
      const errorsArray = error.response.data.errors;
      errorsArray.forEach((errorMessage) => ErrorEmmiter(errorMessage));
      console.error(error);
    }
  };
  const create = async () => {
    try {
      const data = await API[state.type].addItem(state.item);
      SuccessEmmiter(data.message);
      setReload(true);
      cancel();
    } catch(error) {
      const errorsArray = error.response.data.errors;
      errorsArray.forEach((errorMessage) => ErrorEmmiter(errorMessage));
      console.error(error);
    }
  };

  const cancel = () => {
    setState({});
  };

  return ( 
    <>
      <div className='handler-dark' onClick={ () => cancel() }></div>
      <div className="handler-section">
        {state?.mode === 'edit' ? 
          <>
            <div className='btn-container'>
              <button className='btn success' onClick={() => put() }>Сохранить</button>
              <button className='btn cancel' onClick={() => cancel() }>Отменить</button>
            </div>
          </>
          :
          <>
            <div className='btn-container'>
              <button className='btn success' onClick={() => create() }>Сохранить</button>
              <button className='btn cancel' onClick={() => cancel() }>Отменить</button>
            </div>
          </>
        }
        { Component 
          ? <Component model={state.item}/> 
          : <></> 
        }
      </div>
    </>
  );
}

export default ModelHandler;