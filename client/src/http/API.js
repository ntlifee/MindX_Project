import { questionAPI } from './questionAPI';
import { gameAPI } from './gameAPI';
import { themeAPI } from './themeAPI';
import { userAPI } from './userAPI';
import { userAnswerAPI } from './userAnswerAPI';

export const API = {
	question: questionAPI,
	game: gameAPI,
	theme: themeAPI,
	user: userAPI,
	userAnswer: userAnswerAPI,
};
