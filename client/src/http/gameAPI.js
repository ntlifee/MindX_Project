import { $host, $authHost } from './index';

const getList = async () => {
	const { data } = await $authHost.get('/api/admin/game');
	return data;
};

const getById = async (id) => {
	const { data } = await $authHost.get(`/api/admin/game/${id}`);
	return data;
};

const update = async (item) => {
	const { data } = await $authHost.put(`/api/admin/game/${item.id}`, item);
	return data;
}

const deleteById = async (id) => {
	const { data } = await $authHost.delete(`/api/admin/game/${id}`);
	return data;
}

const addItem = async (item) => {
	item.themeGame = item.themeGame.map((id) => { return {themeId: id} });
	item.accessGame = item.accessGame.map((id) => { return {roleId: id} });
	const { data } = await $authHost.post(`/api/admin/game`, item);
  return data;
}

export const gameAPI = {
	getList,
	getById,
	update,
	deleteById,
	addItem,
};
