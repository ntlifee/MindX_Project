const { where } = require('sequelize')
const ApiError = require('../error/ApiError')
const { CarouselData, QuestionGame, Question } = require('../models/index')
const { validateCheck } = require('../validators/isNullValidator')

class CarouselController {
	async create(req, res, next) {
		try {
			const { gameId, scoreFirst, scoreSuccess, scoreFailure, questionGame } = req.body
			//Добавление асинхронно в БД
			const carouselData = await Promise.all([
				CarouselData.create({ gameId, scoreFirst, scoreSuccess, scoreFailure }),
				QuestionGame.bulkCreate([...questionGame]),
			]);
			res.json(carouselData)
		} catch (error) {
			return next(ApiError.badRequest(`Ошибка создания: ${error.massage}`))
		}
	}

	async getOne(req, res, next) {
		try {
			const { id } = req.params;
			validateCheck(!id, 'Не задан id игры')
			const carouselData = await Promise.all([
				CarouselData.findOne({
					where: {
						gameId: id,
					},
					attributes: {
						exclude: ['gameId'],
					},
				}),
				QuestionGame.findAll({
					where: {
						gameId: id,
					},
					attributes: {
						exclude: ['gameId'],
					},
				}),
			]);
			validateCheck(!carouselData[0] && !carouselData[1].length, 'Не найдены данные игры')
			res.json(carouselData);
		} catch (error) {
			return next(ApiError.badRequest(`Ошибка получения: ${error.massage}`));
		}
	}

	async delete(req, res, next) {
		try {
			const { id } = req.params;
			validateCheck(!id, 'Не задан id вопроса игры')
			const count = await Question.destroy({
				where: {
					id: id,
				},
			});
			validateCheck(!count, 'Вопрос игры не найден')
			res.json({ message: 'Вопрос игры удален' });
		} catch (error) {
			return next(ApiError.badRequest(`Ошибка удаления: ${error.massage}`));
		}
	}

	async update(req, res, next) {
		try {
			const { id } = req.params;
			validateCheck(!id, 'Не задан id игры')
			const { scoreFirst, scoreSuccess, scoreFailure, questionGame } = req.body
			//Добавление асинхронно в БД
			const isUpdate = await Promise.all([
				CarouselData.update(
					{
						scoreFirst: scoreFirst,
						scoreSuccess: scoreSuccess,
						scoreFailure: scoreFailure,
					},
					{
						where: {
							gameId: id,
						}
					}
				),
				questionGame.forEach(item => {
					QuestionGame.update(
						{
							questionId: item.questionId,
							numberQuestion: item.numberQuestion
						},
						{
							where: {
								id: item.id,
							}
						}
					)
				})
			]);
			validateCheck(!isUpdate[0][0], 'Данные игры не найдены')
			res.json({ message: 'Игра обновлена' });
		} catch (error) {
			return next(ApiError.badRequest(`Ошибка обновления: ${error.massage}`));
		}
	}
}

module.exports = new CarouselController();
