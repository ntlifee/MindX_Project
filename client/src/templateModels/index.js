import { API } from '../http/API';

const questionTemplate = {
	type: 'question',
	label: 'Вопросы',
	api: API.question,
	fileds: [
		{ type: 'question', label: 'Вопрос' },
		{ type: 'answer', label: 'Ответ' },
		{ type: 'imageId', label: 'Изображение' },
	],
};

const gameTemplate = {
	type: 'game',
	label: 'Игры',
	api: API.game,
	fileds: [
		{ type: 'typeGame', label: 'Тип' },
		{ type: 'name', label: 'Название' },
		{ type: 'startDate', label: 'Дата начала' },
		{ type: 'endDate', label: 'Дата окончания' },
		{ type: 'imageId', label: 'Изображение' },
	],
};

export const templates = {
	question: questionTemplate,
	game: gameTemplate,
};
