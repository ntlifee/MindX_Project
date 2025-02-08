import { $host, $authHost } from './index';

const getList = async () => {
	const { data } = await $authHost.get('/api/admin/game');
	for (const game of data) {
		game.accessGames = game.accessGames.map((item) => item.role);
		game.themeGames = game.themeGames.map((item) => item.theme);
		game.timers = [];
		const questionArray = [];
		const chunkSize = 5;
		for (let i = 0; i < game.questionGames.length; i += chunkSize) {
			const chunk = game.questionGames.slice(i, i + chunkSize);
			const questionsChunk = chunk.map(item => item.question);
			questionArray.push(questionsChunk);
			const timersChunk = chunk.map(item => item.timer);
			game.timers.push(timersChunk);
		}
		game.questionGames = questionArray;
	};
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
	console.log(item)
	item.questionGames.forEach((row, i) => {
    if (item.timers[i]) {
			row.forEach((question, j) => {
				question.timer = item.timers[i][j] || null;
			});
		}
	});
	item.questionGames = item.questionGames.flat();
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
