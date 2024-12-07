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

const themeTemplate = {
	type: 'theme',
	label: 'Темы',
	api: API.theme,
	fileds: [
		{ type: 'name', label: 'Название' },
	],
};

const userTemplate = {
	type: 'user',
	label: 'Пользователи',
	api: API.user,
	fileds: [
		{ type: 'username', label: 'Имя пользователя' },
		{ type: 'role_name', label: 'Роль'}
	],
}

const userAnswerTemplate = {
	type: 'userAnswer',
	label: 'Ответы пользователей',
	api: API.userAnswer,
	fileds: [
		{ type: 'questionNumber', label: 'Номер вопроса' },
		{ type: 'userAnswer', label: 'Ответ' },
		{ type: 'points', label: 'Очки' },
		{ type: 'isCorrect', label: 'Правильно' },
	],
}

export const templates = {
	question: questionTemplate,
	game: gameTemplate,
	theme: themeTemplate,
	user: userTemplate,
	userAnswer: userAnswerTemplate,
};
