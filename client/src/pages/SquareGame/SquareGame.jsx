import { useState } from 'react';
import { useParams } from 'react-router-dom';
import GameInformationPanel from '@mindx/components/GameInformationPanel/GameInformationPanel';
import QuestionButton from './components/QuestionButton/QuestionButton';
import ModalWindowSquare from './components/ModalWindowSquare/ModalWindowSquare';
import classes from './squaregame.module.css';
import useDidMountEffect from '@mindx/customHooks/useDidMountEffect';
import BonusSquare from './components/BonusSquare/BonusSquare';
import GameBlocking from '@mindx/components/GameBlocking/GameBlocking';
import { API } from '@mindx/http/API';
import { ErrorEmmiter } from '@mindx/components/UI/Toastify/Notify';
import Loading from '@mindx/components/UI/Loading/Loading';

const SquareGame = (props) => {
	const { id } = useParams();
	const [currentQuestion, setCurrentQuestion] = useState(null);
	const [currentTheme, setCurrentTheme] = useState(null);
	const [bonusRow, setBonusRow] = useState(new Array(5).fill(null));
	const [bonusCol, setBonusCol] = useState(new Array(5).fill(null));
	const [score, setScore] = useState(0);
	const [questions, setQuestions] = useState([]);
	const [themes, setThemes] = useState([]);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const levels = [1, 2, 3, 4, 5];
  const [loading, setLoading] = useState(true);

	useDidMountEffect(() => {
		setLoading(true);
		API.game
			.getByIdUser(id)
			.then((response) => {
				setThemes(response.themeGames);
				setQuestions(response.questionGames);
				setStartDate(response.startDate);
				setEndDate(response.endDate);
				const currentPoints = response.questionGames.flat().reduce((accumulator, currentValue) => {
					if (currentValue?.userAnswer?.points) {
						const curPoints = currentValue.userAnswer.points;
						accumulator += currentValue.userAnswer.isCorrect ? curPoints : curPoints * (-1);
					}
          return accumulator;
				}, 0)
				setScore(currentPoints);
				setLoading(false);
			})
			.catch((error) => {
				const errorsArray = error.response.data.errors;
				errorsArray.forEach((errorMessage) => ErrorEmmiter(errorMessage));
				console.error(error);
			});
	}, [id]);

	/* 
    useDidMountEffect(() => {
        if (isCloseQuestions[numberQuestion - 1] !== null) {
            const indexRow = Math.floor((numberQuestion - 1) / 5)
            const indexCol = (numberQuestion - 1) % 5

            let newBonusRow = [...bonusRow]
            let newBonusCol = [...bonusCol]

            if (newBonusRow[indexRow] === null) {
                let count = 0
                for (let i = 0; i < 5; i++) {
                    if (isCloseQuestions[indexRow * 5 + i] === true) {
                        count++
                        continue
                    } else if (isCloseQuestions[indexRow * 5 + i] === false) {
                        newBonusRow[indexRow] = false
                        break
                    }
                }
                if (count === 5) {
                    newBonusRow[indexRow] = true
                    setScore(score + (indexRow + 1) * 10)
                }
            }


            if (newBonusCol[indexCol] === null) {
                let count = 0
                for (let i = 0; i < 5; i++) {
                    if (isCloseQuestions[i * 5 + indexCol] === true) {
                        count++
                        continue
                    } else if (isCloseQuestions[i * 5 + indexCol] === false) {
                        newBonusCol[indexCol] = false
                        break
                    }
                }
                if (count === 5) {
                    newBonusCol[indexCol] = true
                    setScore(score + (indexCol + 1) * 10)
                }
            }
            setBonusRow(newBonusRow)
            setBonusCol(newBonusCol)
        }
    }, [isCloseQuestions[numberQuestion - 1]]) */
	return (
		<>
			<main className={classes.section}>
				{/* <GameBlocking /> */}
				{
					loading && <Loading/>
				}
				<div className='container'>
					<div className={classes.wrapper}>
						<GameInformationPanel score={score} endDate={endDate}/>
						{currentQuestion && (
							<ModalWindowSquare
								key={currentQuestion.question.id}
								gameId={id}
								currentTheme={currentTheme}
								currentQuestion={currentQuestion}
								setCurrentQuestion={setCurrentQuestion}
								score={score}
								setScore={setScore}
								questions={questions}
								setQuestions={setQuestions}
							/>
						)}
						<table className={classes.table_square}>
							<thead>
								<tr className={classes.tr_square}>
									<th className={classes.th_square}>Тема</th>
									{levels.map((level) => (
										<td
											className={classes.td_square}
											key={level}
										>
											Уровень {level}
										</td>
									))}
									<th className={classes.th_square}>Бонус</th>
								</tr>
							</thead>
							<tbody>
								{themes.map(({ id, numberTheme, theme }) => (
									<tr
										key={id}
										className={classes.tr_square}
									>
										<td className={`${classes.theme} ${classes.td_square}`}>
											<span className={classes.theme_text}>{theme.name}</span>
										</td>
										{questions[numberTheme - 1].map((item) => (
											<QuestionButton
												key={item.id}
												model={item}
												setCurrentQuestion={setCurrentQuestion}
												level={
													item.numberQuestion % 5 === 0
														? 5
														: item.numberQuestion % 5
												}
												setCurrentTheme={setCurrentTheme}
												numberTheme={numberTheme}
											/>
										))}
										<BonusSquare
											key={numberTheme + 1}
											value={numberTheme * 10}
											bonus={bonusRow[numberTheme - 1]}
										/>
									</tr>
								))}
								<tr className={classes.tr_square}>
									<th className={classes.th_square}>Бонус</th>
									{levels.map((level) => (
										<BonusSquare
											key={level}
											value={level * 10}
											bonus={bonusCol[level - 1]}
										/>
									))}
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</main>
		</>
	);
};

export default SquareGame;
