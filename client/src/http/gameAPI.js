import { $host, $authHost } from './index';

const getList = async () => {
	const { data } = await $authHost.get('/api/admin/game');
	for (const game of data) {
		game.accessGames = game.accessGames.map((item) => item.role);
		if (game.typeGame === 'square') {
			game.themeGames = game.themeGames.map((item) => item.theme);
			const questionArray = [];
			const chunkSize = 5;
			for (let i = 0; i < game.questionGames.length; i += chunkSize) {
				const chunk = game.questionGames.slice(i, i + chunkSize);
				const questionsChunk = chunk.map(item => item.question);
				questionArray.push(questionsChunk);
			}
			game.questionGames = questionArray;
		} else if (game.typeGame === 'carousel') {
				game.countQuestionsOfCarousel = game?.questionGames.length;
				game.scoreFailure = JSON.parse(JSON.stringify(game?.carouselData?.scoreFailure));
				game.scoreFirst	= JSON.parse(JSON.stringify(game?.carouselData?.scoreFirst));
				game.scoreSuccess	= JSON.parse(JSON.stringify(game?.carouselData?.scoreSuccess));
				game.questionGames = game.questionGames.map(item => item.question);
				delete game.carouselData;
		}
	};
	return data;
};

const getById = async (id) => {
	const { data } = await $authHost.get(`/api/admin/game/${id}`);
	return data;
};

const getByIdUser = async (id) => {
	const { data } = await $authHost.get(`/api/game/${id}`);

	if (data.typeGame === 'square') {
		const questionArray = [];
		const chunkSize = 5;
		for (let i = 0; i < data.questionGames.length; i += chunkSize) {
			const chunk = data.questionGames.slice(i, i + chunkSize);
			questionArray.push(chunk);
		}
		data.questionGames = questionArray;
	}
	return data;
};

const postAnswer = async ({gameId, body}) => {
	const { data } = await $authHost.post(`/api/game/${gameId}`, body);
  return data;
}

const update = async (item) => {
	item.questionGames = item.questionGames.flat();
	if (item.typeGame === 'carousel') {
		item.carouselData = {
			scoreFirst: item?.scoreFirst,
			scoreSuccess: item?.scoreSuccess,
			scoreFailure: item?.scoreFailure,
		}
	}
	const { data } = await $authHost.put(`/api/admin/game/${item.id}`, item);
	return data;
}

const deleteById = async (id) => {
	const { data } = await $authHost.delete(`/api/admin/game/${id}`);
	return data;
}

const addItem = async (item) => {
	item.questionGames = item.questionGames.flat();
	if (item.typeGame === 'carousel') {
		item.carouselData = {
			scoreFirst: item?.scoreFirst,
			scoreSuccess: item?.scoreSuccess,
			scoreFailure: item?.scoreFailure,
		}
	}
	const { data } = await $authHost.post(`/api/admin/game`, item);
  return data;
}

export const gameAPI = {
	getList,
	getById,
	getByIdUser,
	update,
	deleteById,
	addItem,
	postAnswer
};
