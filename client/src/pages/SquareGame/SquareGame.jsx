import { useEffect, useState } from 'react'
import GameInformationPanel from './../../components/GameInformationPanel/GameInformationPanel'
import QuestionButton from '../../components/QuestionButton/QuestionButton'
import ModalWindow_Square from '../../components/ModalWindow_Square/ModalWindow_Square'
import classes from './squaregame.module.css'
import useDidMountEffect from './../../customHooks/useDidMountEffect'
import BonusSquare from '../../components/BonusSquare/BonusSquare'

const SquareGame = (props) => {
    let { levels, themes } = props
    const [modalActive, setModalActive] = useState(false)
    const [numberQuestion, setNumberQuestion] = useState(0)
    const [isCloseQuestions, setisCloseQuestions] = useState(new Array(25).fill(undefined))
    const [bonusRow, setBonusRow] = useState(new Array(5).fill(undefined))
    const [bonusCol, setBonusCol] = useState(new Array(5).fill(undefined))
    const [score, setScore] = useState(0)

    useDidMountEffect(() => {
        if (isCloseQuestions[numberQuestion - 1] !== undefined) {
            const indexRow = Math.floor((numberQuestion - 1) / 5)
            const indexCol = (numberQuestion - 1) % 5

            let newBonusRow = [...bonusRow]
            let newBonusCol = [...bonusCol]

            if (newBonusRow[indexRow] === undefined) {
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


            if (newBonusCol[indexCol] === undefined) {
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
    }, [isCloseQuestions[numberQuestion - 1]])


    //#region development
    levels = [];
    for (let i = 1; i <= 5; i++) {
        levels.push(i);
    }
    themes = [];
    for (let i = 1; i <= 5; i++) {
        themes.push(i);
    }
    //#endregion
    return (
        <main className="section">
            <div className="container">
                <div className={classes.wrapper}>
                    <GameInformationPanel score={score} />
                    <ModalWindow_Square key={numberQuestion}
                        active={modalActive} setActive={setModalActive}
                        numberQuestion={numberQuestion}
                        isCloseQuestions={isCloseQuestions} setisCloseQuestions={setisCloseQuestions}
                        score={score} setScore={setScore} />
                    <table className={classes.table_square}>
                        <thead>
                            <tr className={classes.tr_square}>
                                <th className={classes.th_square}>Тема</th>
                                {levels.map(level => (<td className={classes.td_square} key={level}>Уровень {level}</td>))}
                                <th className={classes.th_square}>Бонус</th>
                            </tr>
                        </thead>
                        <tbody>
                            {themes.map((theme, themeNumber) => (
                                <tr key={themeNumber} className={classes.tr_square}>
                                    <td className={`${classes.theme} ${classes.td_square}`}><span className={classes.theme_text}>Тема {theme} orghsofhe8fhsog8ufsgohysepofyes98fywsfsiwdwadwadufg</span></td>
                                    {levels.map(level => (
                                        <QuestionButton key={themeNumber * 5 + level}
                                            setModalActive={setModalActive}
                                            level={level}
                                            numberQuestion={themeNumber * 5 + level}
                                            setNumberQuestion={setNumberQuestion} isCloseQuestions={isCloseQuestions[themeNumber * 5 + level - 1]} />
                                    ))}
                                    <BonusSquare key={themeNumber + 1} value={(themeNumber + 1) * 10} bonus={bonusRow[themeNumber]} />
                                </tr>
                            ))}
                            <tr className={classes.tr_square}>
                                <th className={classes.th_square}>Бонус</th>
                                {levels.map(level => (<BonusSquare key={level} value={level * 10} bonus={bonusCol[level - 1]} />))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}

export default SquareGame;