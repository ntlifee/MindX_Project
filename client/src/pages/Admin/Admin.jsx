import './admin.scss';
import AddEdit from '../../components/AddEditSidebar/index'
import ObjectList from '../../components/ObjectList/ObjectList'
import Tabs from '../../components/Tabs/Tabs'

const AdminPage = () => {
  return (
    <main className="admin-section">
      <div className='tabs'>
        <Tabs />
      </div>
      <div className='objects-list'>
        <ObjectList />
      </div>
    </main>
  );
}

export default AdminPage;