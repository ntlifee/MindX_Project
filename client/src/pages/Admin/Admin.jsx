import './admin.scss';
import AddEdit from '../../components/AddEditSidebar/index';
import ObjectList from '../../components/ObjectList/ObjectList';
import Tabs from '../../components/Tabs/Tabs';
import { API } from '../../http/API';
import { templates } from '../../templateModels/index'
import { useState, useEffect } from 'react';

const AdminPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    API.question.getList().then(response => setData(response));
  }, [])
  return (
    <main className="admin-section">
      <div className='tabs'>
        <Tabs />
      </div>
      <div className='objects-list'>
        <ObjectList template={templates?.question} data={data}/>
      </div>
    </main>
  );
}

export default AdminPage;