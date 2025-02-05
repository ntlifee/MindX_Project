import './admin.scss';
import ObjectList from './components/ObjectList/ObjectList';
import Tabs from './components/Tabs/Tabs';
import { useState } from 'react';
import ModelHandler from './components/ModelHandlers/ModelHandler.jsx';

const AdminPage = () => {
  const [data, setData] = useState([]);
  const [template, setTemplate] = useState({});
  const [reload, setReload] = useState(false);
  const [state, setState] = useState({});
  return (
    <>
      {
        state.mode && state.item && state.type 
          ? <ModelHandler state={state} setState={setState} setReload={setReload}/>
          : <></>
      }
      <main className="admin-section">
        <div className='tabs'>
          <Tabs setTemplate={setTemplate} setData={setData} reload={reload} setReload={setReload}/>
        </div>
        <div className='objects-list'>
          <ObjectList 
            template={template?.fileds} 
            type={template?.type} 
            data={data} 
            state={state}
            setState={setState}
            reload={reload} setReload={setReload}
            />
        </div>
      </main>
    </>
  );
}

export default AdminPage;