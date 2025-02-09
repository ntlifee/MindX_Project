import './objectList.scss';
import { FaTrashAlt, FaEdit, FaTimes } from 'react-icons/fa';
import { Image } from 'react-bootstrap';
import { useState, useEffect, useMemo } from 'react';
import { ErrorEmmiter, SuccessEmmiter } from '@mindx/components/UI/Toastify/Notify.jsx';
import { API } from '@mindx/http/API.js'
import moment from 'moment';

const ObjectList = (props) => {
	const { template, data, type, setReload, state, setState } = props;
	const [searchTerm, setSearchTerm] = useState('');

	const filteredData = useMemo(() => {
		if (!searchTerm) return data;

		return data.filter(item => {
			return template.some(column => {
				const value = item[column.type];
				if (typeof value === 'string') {
					return value.toLowerCase().includes(searchTerm.toLowerCase());
				}
				return false;
			});
		});
	}, [data, searchTerm, template]);

	const editItem = (item) => {
		setState({
			mode: 'edit',
			item: item,
			type: type,
		})
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
		setState({
			mode: 'create',
			item: {},
			type: type,
		})
	};

	return (
		<>
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
					{filteredData?.map((row, index) => (
						<tr key={index}>
							{template?.map((column, index) => (
								<td key={index}>
									{column.meta === 'img' ? (
										row[column.type] 
										?	<Image
												width={150}
												height={150}
												src={`http://localhost:3001/${row[column.type]}.jpg`}
											/>
										: <>{"-"}</>
									) : (
										column.meta === 'datetime'
										? moment(new Date(row[column.type])).format('DD.MM.YYYY HH:mm')
										: row[column.type]
									)}
								</td>
							))}
							<td className='command-icons'>
								{
									(type !== 'role' || (row.name !== 'ADMIN' && row.name !== 'USER')) &&
									<>
										<button onClick={() => editItem(row)}>
											<FaEdit />
										</button>
										<button>
											<FaTrashAlt onClick={() => deleteItem(row)}/>
										</button>
									</>
								}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default ObjectList;