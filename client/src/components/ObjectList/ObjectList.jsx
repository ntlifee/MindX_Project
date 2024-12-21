import './objectList.scss';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Image } from 'react-bootstrap';
import ModelHandler from './../ModelHandlers/ModelHandler';
import { useState, useEffect } from 'react';
import { ErrorEmmiter, SuccessEmmiter } from './../../components/Toastify/Notify.jsx';
import { API } from './../../http/API'
import moment from 'moment';

const ObjectList = (props) => {
	const { template, data, type, setReload, activeMenu, setActiveMenu } = props;
	const [selected, setSelected] = useState(null);
	const [createMode, setCreateMode] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	useEffect(() => {
		if (selected) {
			setCreateMode(false);
		}
	}, [selected]);
	useEffect(() => {
		if (createMode) {
			setSelected(null);
		}
	}, [createMode]);
	const editItem = (item) => {
		setActiveMenu(true);
    item.mode = 'edit';
		setSelected(item);
  };
	const deleteItem = async (item) => {
    try {
			const data = await API[type].deleteById(item.id);
      SuccessEmmiter(data.message);
			setReload(true);
		} catch (error) {
			ErrorEmmiter(error.response.data.message);
      console.error(error);
		}
  };
	const createItem = () => {
		setActiveMenu(true);
		setCreateMode(true);
	};
	return (
		<>
		{ activeMenu && (selected || createMode) ? <ModelHandler model={selected ? selected : {}} type={type} 
								setSelected={setSelected} setCreateMode={setCreateMode}
								setReload={setReload}/> : <></>}
		<div className='table-header'>
			<input 
				type='text' 
				placeholder='Поиск...'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<button onClick={createItem}>Создать объект</button>
		</div>
		<table className='objectlist-section'>
			<thead>
				<tr>
					{template?.map((column, index) => (
						<th key={index}>{column.label}</th>
					))}
					<th></th>
				</tr>
			</thead>
			<tbody>
				{data?.map((row, index) => (
					<tr key={index}>
						{template?.map((column, index) => (
							<td key={index}>
								{column.meta === 'img' ? (
									<Image
										width={100}
										height={100}
										src={
											'http://localhost:3001/fa3595e1-1a19-4b58-bec9-16f2863f539f.jpg'
										}
									/>
								) : (
									column.meta === 'datetime'
									? moment(new Date(row[column.type])).format('DD.MM.YYYY HH:mm')
									: row[column.type]
								)}
							</td>
						))}
						<td className='command-icons'>
							<button onClick={() => editItem(row)}>
								<FaEdit />
							</button>
							<button>
								<FaTrashAlt onClick={() => deleteItem(row)}/>
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
		</>
	);
};

export default ObjectList;
