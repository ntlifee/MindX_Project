import './handler.scss'
import Model from './Models';

const ModelHandler = (props) => {
  const { model, type, setSelected, setCreateMode, setReload } = props;
  const Component = Model[type];
  return ( 
    <div className="handler-section">
      {Component ? <Component model={model} setSelected={setSelected} setCreateMode={setCreateMode} setReload={setReload}/> : <></>}
    </div>
   );
}

export default ModelHandler;