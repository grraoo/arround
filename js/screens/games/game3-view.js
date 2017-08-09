import AbstractView from '../../abstractView'
import calculateAspectRatioFit from '../../utils/resizeImg.js';
import checkAnswers from '../../utils/checkAnswers'
import { initialState, stats as statsData, levels } from '../../data/data.js'
import { checkAnswers as isAnswerRight, generateGameStat } from '../../utils/gameParams'
import game from '../../blocks/game'
import footer from '../../blocks/footer'
import header from '../../blocks/header'

export default class Game3View extends AbstractView {
    constructor(state) {
        super();
        this._state = state;
    }
    
    get template() {
        return `
            ${header(this._state)}
            ${game(this._state.stats, levels[this._state.levelNum])}
            ${footer()}`
    }
    
    bind() {
        let gameArea = this.element.querySelector('.game__content');
        let formElements = gameArea.elements;
        let images = this.element.querySelectorAll(`.game__option > img`);
        let gameTimer = this.element.querySelector('.game__timer');
        let backBtn = this.element.querySelector('.back');
        
        Array.prototype.forEach.call(images, (img) => {
            img.addEventListener(`load`, (event) => {
                calculateAspectRatioFit(img);
            })
        })
        
        gameArea.addEventListener('click', (ev) => {
            if (checkAnswers(formElements)) {
                let answerValues = [].filter.call(formElements, (answer) => answer.checked).map((answer) => answer.value);
                let isCorrect = isAnswerRight(this._state, answerValues);
                clearInterval(this._state.timer);
                this._state.stats = generateGameStat(this._state, isCorrect, this._state.time);
                if (!isCorrect)
                    this._state.lives--;
                this.onChangeGameScreen();
            }
        })
        
        this._state.timer = setInterval(() => {
            this._state.time--;
            gameTimer.innerHTML = this._state.time;
        }, 1000);
        
        backBtn.addEventListener('click', () => {
            this.onBackClick();
        })
    }
    
    onChangeGameScreen() {}
}