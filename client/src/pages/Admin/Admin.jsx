import './admin.scss';
import ObjectList from '../../components/ObjectList/ObjectList';
import Tabs from '../../components/Tabs/Tabs';
import { useState } from 'react';

const AdminPage = () => {
  const [data, setData] = useState([]);
  const [template, setTemplate] = useState({});
  const [reload, setReload] = useState(false);
  return (
    <main className="admin-section">
      <div className='tabs'>
        <Tabs setTemplate={setTemplate} setData={setData} reload={reload} setReload={setReload}/>
      </div>
      <div className='objects-list'>
        <ObjectList template={template?.fileds} type={template?.type} data={data} setReload={setReload}/>
      </div>
    </main>
  );
}

export default AdminPage;