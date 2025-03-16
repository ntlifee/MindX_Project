const { where, Sequelize } = require('sequelize')
const ApiError = require('../error/ApiError')
const { UserAnswer, User, QuestionGame, Question, Game, Bonus } = require('../models/index')
const { validateCheck } = require('../validators/isNullValidator')
const ratingController = require('./ratingController')

class userAnswerController {
    async create(req, res, next) {
        try {
            const { questionGameId, points, userAnswer, bonus } = req.body
            const questionData = (await QuestionGame.findOne({
                attributes: ["numberQuestion"],
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
            //TODO: проверить это проверку для карусели
            if (!bonus) {
                const isCreateAnswer = await UserAnswer.count({
                    where: {
                        userId: req.user.id,
                        questionGameId
                    }
                })
                if (isCreateAnswer !== questionData.numberQuestion - 1) {
                    throw new Error('Нельзя ответить на вопрос не после предыдущего!')
                }
            }

            let isCorrect
            const { answer } = questionData.question
            isCorrect = answer === userAnswer ? true : false
            const userAnswerData = await UserAnswer.create({ questionGameId, userId: req.user.id, points, userAnswer, isCorrect })
            //TODO: проверить можно ли добавить бонус, посмотреть checkRows и checkColumns
            if (bonus) {
                const bonusData = await Bonus.findOne({
                    where: {
                        userId: req.user.id,
                        gameId: req.params.id,
                        lvl: bonus.lvl,
                        type: bonus.type,
                    }
                })
                if (!bonusData) {
                    const rowColumnAnswer = UserAnswer.findAll({
                        attributes: ['questionGameId'],
                        where: {
                            userId: req.user.id,
                            questionGameId,
                            isCorrect: true
                        }
                    })
                    const temp = await this.checkRows()
                    const temp2 = await this.checkColumns()
                    await Bonus.create({ ...bonus, userId: req.user.id, gameId: req.params.id })
                }
            }

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
            validateCheck(!isDelete, 'Ответ пользователя не найден!')
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
    async checkRows() {
        const rows = await UserAnswer.findAll({
            attributes: [
                [Sequelize.literal('CEIL("questionGame"."numberQuestion" / 5)'), 'row_number'],
                [Sequelize.fn('COUNT', Sequelize.col('userAnswer.isCorrect')), 'correct_count']
            ],
            include: [{
                model: QuestionGame,
                attributes: []
            }],
            where: {
                isCorrect: true
            },
            group: [Sequelize.literal('row_number')],
            having: Sequelize.literal('COUNT("userAnswer"."isCorrect") = 5')
        });

        return rows.map(row => row.dataValues.row_number);
    }

    async checkColumns() {
        const columns = await UserAnswer.findAll({
            attributes: [
                [Sequelize.literal('("questionGame"."numberQuestion" - 1) % 5 + 1'), 'column_number'],
                [Sequelize.fn('COUNT', Sequelize.col('userAnswer.isCorrect')), 'correct_count']
            ],
            include: [{
                model: QuestionGame,
                attributes: []
            }],
            where: {
                isCorrect: true
            },
            group: [Sequelize.literal('column_number')],
            having: Sequelize.literal('COUNT("userAnswer"."isCorrect") = 5')
        });

        return columns.map(column => column.dataValues.column_number);
    }

}

module.exports = new userAnswerController()