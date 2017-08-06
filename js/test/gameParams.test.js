import { refreshLivesCount, checkAnswers, calcLivesPoints, calcAnswerPoints, generateGameStat } from '../utils/gameParams'
import assert from 'assert'

const state = {
    time: 30,
    lives: 3,
    totalRounds: 10,
    currentRound: 0,
    gameStat: []
};

describe('Game params', () => {
    describe('Check answers', () => {
        let roundState = {
            answers: [{ type: 'photo' }, { type: 'photo'}, { type: 'paint' }]
        }
        let answers = ['paint', 'photo', 'paint'];
        it('should return true if received answers are correct', () => {
            let answers = ['photo', 'photo', 'paint'];
            assert.equal(checkAnswers(roundState, answers), true);
        })
        it('should return false if received answers aren\'t correct', () => {
            let answers = ['photo', 'paint', 'photo'];
            assert.equal(checkAnswers(roundState, answers), false);
        })
    })
    describe('Refresh lives count', () => {
        it('should decrease number of lives by one if answer is incorrect', () => {
            assert.equal(refreshLivesCount(state, false).lives, state.lives - 1);
        })
        it('shouldn\'t decrease number of lives if answer is correct', () => {
            assert.equal(refreshLivesCount(state, true).lives, state.lives);
        })
        it('should throw error if number of lives below zero', () => {
            let newState = Object.assign({}, state, { lives: -1 });
            const setNegativeValueOfLives = () => refreshLivesCount(newState, true);
            assert.throws(setNegativeValueOfLives);
        })
    })
    describe('50 points from every live', () => {
        it('should return 0 points if there are no any lives left', () => {
            assert.equal(calcLivesPoints({ lives: 0 }), 0);
        })
        it('should return 50 points if there are 1 live left', () => {
            assert.equal(calcLivesPoints({ lives: 1 }), 50);
        })
        it('should return 100 points if there are 2 lives left', () => {
            assert.equal(calcLivesPoints({ lives: 2 }), 100);
        })
    })
    describe('Answer points which depends on answer and number of lives', () => {
        it('should return 150 points if type of answer \'fast\' and 2 lives left', () => {
            assert.equal(calcAnswerPoints({ lives: 2 }, 'fast'), 150)
        })
        it('should return 0 points if type of answer \'slow\' and 1 live left', () => {
            assert.equal(calcAnswerPoints({ lives: 1 }, 'slow'), 0)
        })
        it('should return 200 points if type of answer \'correct\' and 2 lives left', () => {
            assert.equal(calcAnswerPoints({ lives: 2 }, 'correct'), 200)
        })
        it('should return -50 points if type of answer \'wrong\' and 0 lives left', () => {
            assert.equal(calcAnswerPoints({ lives: 0 }, 'wrong'), -50)
        })
    })
    describe(`Game stats`, () => {
        it(`Add 'correct' answer`, function () {
            const newGameState = generateGameStat(state, true, 15).gameStat;
            assert.equal(newGameState[newGameState.length - 1], `correct`);
        });
        it(`Add 'wrong' answer or user didn't answer`, function () {
            const newGameState = generateGameStat(state, false, -1).gameStat;
            assert.equal(newGameState[newGameState.length - 1], `wrong`);
        });
        it(`Add 'fast' answer`, function () {
            const newGameState = generateGameStat(state, true, 9).gameStat;
            assert.equal(newGameState[newGameState.length - 1], `fast`);
        });
        it(`Add 'slow' answer`, function () {
            const newGameState = generateGameStat(state, true, 21).gameStat;
            assert.equal(newGameState[newGameState.length - 1], `slow`);
        });
    });
})
