import './tabs.scss';
import { useState, useEffect } from 'react';
import { templates } from '@mindx/templateModels/index'
import Loading from '@mindx/components/UI/Loading/Loading.jsx';


const Tabs = (props) => {
	const { setTemplate, setData, reload, setReload } = props;
	const [loading, setLoading] = useState(false);
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
		if(tab !== currentTab) {
			setData(null);
			setTemplate(null);
		}
    setTab(tab)
    setTemplate(templates[TAB_LIST[tab]?.type])
		setLoading(true);
    templates[TAB_LIST[tab].type]?.api.getList()
			.then(response => setData(response))
			.catch(error => console.error(error))
			.finally(() => {
				setLoading(false);
			});
  }
  useEffect(() => {
    changeTab(0)
  }, [])
	
	useEffect(() => {
		if (reload) {
			changeTab(currentTab);
			setReload(false);
		}
	}, [reload])
	return (
		//TODO: Решить проблему с overflow
		<>
			{
				loading && <Loading/>
			}
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
		</>
	);
};

export default Tabs;
