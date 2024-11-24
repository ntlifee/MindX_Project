import './tabs.scss';
import { useState, useEffect } from 'react';
import { templates } from '../../templateModels/index'

const Tabs = (props) => {
	const { setTemplate, setData } = props;
	//TODO: Использовать для теста overflow
	/* const TAB_LIST = [
		{ type: 'question', label: 'Вопросы' },
		{ type: 'theme', label: 'Темы' },
		{ type: 'image', label: 'Картинки' },
		{ type: 'role', label: 'Роли' },
		{ type: 'game', label: 'Игры' },
	]; */
	const TAB_LIST = Object.values(templates).map((template) => ({
    type: template.type,
    label: template.label,
  }));
	const [currentTab, setTab] = useState(0);
  function changeTab(tab) {
    setTab(tab)
    setTemplate(templates[TAB_LIST[tab]?.type])
    templates[TAB_LIST[tab].type]?.api.getList().then(response => setData(response));
  }
  useEffect(() => {
    changeTab(0)
  }, [])
	return (
		//TODO: Решить проблему с overflow
		<div className='tabs-section'>
			{TAB_LIST.map((tab, index) => (
				<button
					className={currentTab === index ? 'tab active' : 'tab'}
					key={tab.label}
					onClick={() => changeTab(index)}
				>
					{tab.label}
				</button>
			))}
		</div>
	);
};

export default Tabs;
