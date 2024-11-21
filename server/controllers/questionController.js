const { where } = require('sequelize')
const ApiError = require('../error/ApiError')
const { Question } = require('../models/index')
const { validateIsNull, validateObjectIsNull } = require('../validators/isNullValidator')

class questionController {
    async create(req, res, next) {
        try {
            const questions = req.body
            validateObjectIsNull(questions)
            const questionsData = await Question.bulkCreate([...questions])
            res.json({ message: questions.length === 1 ? 'Вопрос добавлен' : 'Вопросы добавлены', questionsData })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка создания вопроса: ${error.massage}`))
        }
    }

    async getAll(req, res, next) {
        try {
            const questions = await Question.findAll()
            res.json(questions)
        } catch (error) {
            return next(
                ApiError.badRequest(`Ошибка получения вопросов: ${error.massage}`)
            )
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            if (!id) {
                return next(ApiError.badRequest('Не задан id вопроса'))
            }
            const isDelete = await Question.destroy({
                where: {
                    id: id,
                },
            })
            if (!isDelete) {
                return next(ApiError.badRequest('Вопрос не найден'))
            }
            res.json({ message: 'Вопрос удален' })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка удаления вопроса: ${error.massage}`))
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            if (!id) {
                return next(ApiError.badRequest('Не задан id вопроса'))
            }

            const { question, answer, imageId } = req.body;
            validateIsNull([id, question, answer]);
            const isUpdate = await Question.update(
                {
                    question: question,
                    answer: answer,
                    imageId: imageId
                },
                {
                    where: {
                        id: id,
                    }
                }
            );
            if (!isUpdate[0]) {
                return next(ApiError.badRequest('Вопрос не найден'))
            }
            res.json({ message: 'Вопрос обновлен' });
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest(`Ошибка обновления: ${error.massage}`));
        }
    }
}

module.exports = new questionController()