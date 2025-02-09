import { useEffect, useState } from 'react'
import GameInformationPanel from '@mindx/components/GameInformationPanel/GameInformationPanel'
import QuestionButton from './components/QuestionButton/QuestionButton'
import ModalWindowSquare from './components/ModalWindowSquare/ModalWindowSquare'
import classes from './squaregame.module.css'
import useDidMountEffect from '@mindx/customHooks/useDidMountEffect'
import BonusSquare from './components/BonusSquare/BonusSquare'

const SquareGame = (props) => {
    let { levels, themes } = props
    const [modalActive, setModalActive] = useState(false)
    const [numberQuestion, setNumberQuestion] = useState(0)
    const [isCloseQuestions, setisCloseQuestions] = useState(new Array(25).fill(null))
    const isQuestionTemporary = []
    const [bonusRow, setBonusRow] = useState(new Array(5).fill(null))
    const [bonusCol, setBonusCol] = useState(new Array(5).fill(null))
    const [score, setScore] = useState(0)

    //#region development
    for(let i = 0; i < 25; i++) {
        if(i % 2 === 0) {
            isQuestionTemporary[i] = true;
        }
        else{
            isQuestionTemporary[i] = false;
        }
    }
    //#endregion
    

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
        <main className={classes.section}>
            <div className="container">
                <div className={classes.wrapper}>
                    <GameInformationPanel score={score} />
                    <ModalWindowSquare key={numberQuestion}
                        active={modalActive} setActive={setModalActive}
                        numberQuestion={numberQuestion}
                        isCloseQuestions={isCloseQuestions} setisCloseQuestions={setisCloseQuestions}
                        score={score} setScore={setScore}
                        isQuestionTemporary={isQuestionTemporary[numberQuestion-1]} 
                        />
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
                                            numberQuestion={themeNumber * 5 + level} setNumberQuestion={setNumberQuestion} 
                                            isCloseQuestions={isCloseQuestions[themeNumber * 5 + level - 1]} 
                                            isQuestionTemporary={isQuestionTemporary[themeNumber * 5 + level - 1]}/>
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