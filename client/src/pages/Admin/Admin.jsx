import './admin.scss';
import AddEdit from '../../components/AddEditSidebar/index';
import ObjectList from '../../components/ObjectList/ObjectList';
import Tabs from '../../components/Tabs/Tabs';
import { useState } from 'react';

const AdminPage = () => {
  const [data, setData] = useState([]);
  const [template, setTemplate] = useState({});
  return (
    <main className="admin-section">
      <div className='tabs'>
        <Tabs setTemplate={setTemplate} setData={setData}/>
      </div>
      <div className='objects-list'>
        <ObjectList template={template?.fileds} data={data}/>
      </div>
    </main>
  );
}

export default AdminPage;