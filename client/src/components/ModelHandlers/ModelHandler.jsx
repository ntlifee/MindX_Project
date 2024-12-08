import './handler.scss'
import Model from './Models';

const Handler = (props) => {
  const { model, type, setSelected, ErrorEmmiter, SuccessEmmiter } = props;
  const Component = Model[type];
  return ( 
    <div className="handler-section">
      <Component model={model} setSelected={setSelected}/>
    </div>
   );
}
 
export default Handler;