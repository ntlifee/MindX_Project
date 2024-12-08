import './objectList.scss';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Image } from 'react-bootstrap';
import ModelHandler from './../ModelHandlers/ModelHandler';
import { useState } from 'react';
import { ErrorEmmiter, SuccessEmmiter } from './../../components/Toastify/Notify.jsx';
import { API } from './../../http/API'

const ObjectList = (props) => {
	const { template, data, type, setReload } = props;
	const [selected, setSelected] = useState(null);
	const editItem = (item) => {
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
	return (
		<>
		{selected ? <ModelHandler model={selected} type={type} 
								setSelected={setSelected} 
								ErrorEmmiter={ErrorEmmiter} SuccessEmmiter={SuccessEmmiter}/> : <></>}
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
								{column.type === 'imageId' ? (
									<Image
										width={100}
										height={100}
										src={
											'http://localhost:3001/fa3595e1-1a19-4b58-bec9-16f2863f539f.jpg'
										}
									/>
								) : (
									row[column.type]
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
