const { where } = require('sequelize')
const ApiError = require('../error/ApiError')
const { UserAnswer, User, QuestionGame, Question, Game } = require('../models/index')
const { validateCheck } = require('../validators/isNullValidator')
const ratingController = require('./ratingController')

class userAnswerController {
    async create(req, res, next) {
        try {
            const { questionGameId, points, userAnswer } = req.body
            const questionData = (await QuestionGame.findOne({
                attributes: [],
                include: [{
                    model: Question,
                    attributes: ['id', 'answer'],
                    required: true
                }, {
                    model: UserAnswer,
                    attributes: ['id'],
                    required: false,
                    where: {
                        questionGameId,
                        userId: req.user.id
                    }
                }],
                where: { id: questionGameId }
            })).toJSON()
            validateCheck(questionData.userAnswers.length, 'Ответ был дан ранее!')
            let isCorrect
            const { answer } = questionData.question
            isCorrect = answer === userAnswer ? true : false
            const userAnswerData = await UserAnswer.create({ questionGameId, userId: req.user.id, points, userAnswer, isCorrect })
            res.json({ message: 'Ответ добавлен', isCorrect })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка создания: ${error.message}`))
        }
    }

    async getAll(req, res, next) {
        try {
            const gamesData = await UserAnswer.findAll({
                attributes: { exclude: ['gameId', 'userId', 'questionGameId'] },
                include: [{
                    model: User,
                    attributes: { exclude: ['password'] },
                    required: false
                },
                {
                    model: QuestionGame,
                    attributes: ['id'],
                    required: false,
                    include: [{
                        model: Game,
                        attributes: ['id', 'typeGame', 'name'],
                        required: false
                    }]
                }]
            })
            res.json(gamesData)
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка получения: ${error.message}`))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            validateCheck(!id, 'Не задан id ответа пользователя!')
            const isDelete = await UserAnswer.destroy({
                where: {
                    id: id,
                },
            })
            validateCheck(!isDelete, 'Ответ пользователя найден!')
            res.json({ message: 'Ответ пользователя удален' })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка удаления: ${error.message}`))
        }
    }

    async download(req, res, next) {
        try {
            const { countQuestion, rating } = await ratingController.getRatingPrivate(req.params.id, req.query.userId)
            let { typeGame, name, startDate, endDate } = await Game.findByPk(req.params.id, { attributes: ["typeGame", "name", "startDate", "endDate"] })

            startDate.setHours(startDate.getHours() + 3)
            endDate.setHours(endDate.getHours() + 3)
            startDate = startDate.toISOString().slice(0, 19).replace(/:/g, '-')
            endDate = endDate.toISOString().slice(0, 19).replace(/:/g, '-')

            // Имя файла
            const fileName = `${startDate}_${endDate}_${name}_${typeGame}.xlsx`

            // Создание массива данных для Excel
            let excelData = []

            // Строка с номерами вопросов
            let questionNumbers = ['Номер']
            for (let i = 1; i <= countQuestion; i++) {
                questionNumbers.push(i) // Номера вопросов
            }

            // Формирование данных ответов пользователя
            rating.forEach(item => {
                excelData.push(["Пользователь", item.username])
                excelData.push(questionNumbers)

                let answerPoints = ["Баллы"]
                // Перебираем все вопросы
                for (let i = 1; i <= countQuestion; i++) {
                    // Ищем ответ пользователя на данный вопрос
                    let userAnswer = item.userAnswers.find(answer => answer.numberQuestion === i)
                    if (userAnswer?.isCorrect) {
                        // Lобавляем баллы за верный ответ
                        answerPoints.push(userAnswer.points)
                    } else {
                        // Если ответа нет или неверный, ставим 0
                        answerPoints.push(0)
                    }
                }
                //TODO: заменить 0 на баллы
                excelData.push(answerPoints)
                if (typeGame === "square") {
                    excelData.push(["Сумма баллов за вопросы", 0])
                    excelData.push(["Бонусы", 0])
                }
                excelData.push(["Всего баллов", item.totalPoints])
                excelData.push([])
            });

            res.json({ fileName: fileName, excelData: excelData })
        } catch (error) {
            return next(ApiError.badRequest(`Ошибка скачивания: ${error.message}`))
        }
    }
}

module.exports = new userAnswerController()