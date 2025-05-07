import './mindxTabs.scss';
import { useState, useEffect } from 'react';
import Loading from '@mindx/components/UI/Loading/Loading.jsx';


const MindxTabs = (props) => {
	const { setTemplate, templates, setData, reload, setReload, changeData, settings } = props;
	const [loading, setLoading] = useState(false);
	const [tabList, setTabList] = useState([]);
	const [currentTab, setTab] = useState(0);
  function changeTab(tab, id) {
		if(tab !== currentTab) {
			setData(null);
			setTemplate(null);
		}
    setTab(tab)
		let newTemplate;
		setLoading(true);
		if (!settings?.customTab) {
			newTemplate = templates[tabList[tab]?.type];
			changeData(newTemplate, () => setLoading(false));
			setLoading(false);
		} else {
			newTemplate = templates[settings?.type];
			if (!!id) {
				changeData(newTemplate, () => setLoading(false), id);
			} else {
				setLoading(false);
			}
		}
		setTemplate(newTemplate)
  }
	
	useEffect(() => {
		let tab_list = [];
    if (!settings?.customTab) {
			tab_list = Object.values(templates).map((template) => ({
				type: template.type,
				label: template.label,
			}));
		} else {
			tab_list = settings.getTabList();
		}
		setTabList(tab_list);
  }, [tabList])

  useEffect(() => {
    changeTab(0)
  }, []);

	useEffect(() => {
		if (reload) {
			changeTab(currentTab);
			setReload(false);
		}
	}, [reload])
	return (
		<>
			{
				loading && <Loading/>
			}
			<div className='tabs-section'>
				{tabList?.map((tab, index) => (
					<button
						className={currentTab === index ? 'tab active' : 'tab'}
						key={tab.label}
						onClick={() => changeTab(index, tab?.id)}
					>
						{tab.label}
					</button>
				))}
			</div>
		</>
	);
};

export default MindxTabs;
