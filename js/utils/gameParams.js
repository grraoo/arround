import { levels } from '../data/data.js'

const TIME_FOR_QUESTION = 30;

export function refreshLivesCount(state, isAnswerCorrect) {
    if (state.lives < 0) {
        throw new RangeError('Can\'t get negative value of lives')
    }
    
    return isAnswerCorrect 
        ? state
        : Object.assign({}, state, { lives: state.lives - 1 })
}

export function checkAnswers(state, answers) {
    return levels[state.levelNum].answers.every((answer, i) => {
        return answers[i] === answer.type
    }) 
} 

export function calcLivesPoints(state) {
    return state.lives * 50;
}

export function calcAnswerPoints(state, answerType) {
    let points = 0;
    if (answerType === `correct`) {
        points = 100;
    } else if (answerType === `fast`) {
        points = 50;
    } else {
        points = -50;
    }

    return points + calcLivesPoints(state);
}

export function generateGameStat(state, isAnswerCorrect, time) {
    const newGameStats = state.stats.slice();
    let answerParam = null;
    let getAnswerParam = () => {
        if (isAnswerCorrect) {
            if (time < 10) {
                return 'fast';
            } else if (time > 20 && time <= 30) {
                return 'slow';
            } else if (time >= 10 && time <= 20){
                return 'correct';
            } else if (time === -1) {
                return 'wrong';
            }
        }
        
        return 'wrong'
    }
    
    time = TIME_FOR_QUESTION - time;
    newGameStats[state.levelNum - 1] = getAnswerParam();
    return newGameStats;
}