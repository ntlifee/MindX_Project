import { useEffect, useState } from 'react'
import GameInformationPanel from './../../components/GameInformationPanel/GameInformationPanel'
import QuestionButton from '../../components/QuestionButton/QuestionButton'
import ModalWindow_Square from '../../components/ModalWindow_Square/ModalWindow_Square'
import classes from './squaregame.module.css'
import useDidMountEffect from './../../customHooks/useDidMountEffect'

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
            const indexRow = (numberQuestion - (numberQuestion % 5)) / 5
            const indexCol = numberQuestion % 5 - 1
            if (bonusRow[indexRow] === undefined) {
                bonusRow[indexRow] = true;
                for (let i = 0; i < 5; i++) {
                    if (isCloseQuestions[indexRow * 5 + i] === false) {
                        bonusRow[indexRow] = false;
                        break;
                    }
                }
                setBonusRow(bonusRow)
            }
            if (bonusCol[indexCol] === undefined) {
                bonusCol[indexCol] = true;
                for (let i = 0; i < 5; i++) {
                    if (isCloseQuestions[i * 5 + indexCol] === false) {
                        bonusCol[indexCol] = false;
                        break;
                    }
                }
                setBonusCol(bonusCol)
            }
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
                                    <td className={`${classes.bonus} ${classes.td_square}`}>+{(themeNumber + 1) * 10}</td>
                                </tr>
                            ))}
                            <tr className={classes.tr_square}>
                                <th className={classes.th_square}>Бонус</th>
                                {levels.map(level => (<td className={classes.td_square} key={level}>+{level * 10}</td>))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}

export default SquareGame;