import './tabs.scss'
import { useState } from 'react'

const Tabs = (props) => {
  const TAB_LIST = [
    {type: 'questions', label: 'Вопросы'},
    {type: 'themes', label: 'Темы'},
    {type: 'images', label: 'Картинки'},
    {type: 'roles', label: 'Роли'},
    {type: 'games', label: 'Игры'},
  ]
  const [currentTab, setTab] = useState(0);
  return (
    //TODO: Решить проблему с overflow
    <div className='tabs-section'>
      {TAB_LIST.map((tab, index) => (
        <button 
          className={currentTab === index ? 'tab active' : 'tab'} 
          key={tab.label} 
          onClick={() => setTab(index)}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default Tabs;