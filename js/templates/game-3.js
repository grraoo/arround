import createElement from '../utils/elementCreator';
import { initialState, stats as statsData, levels } from '../data/data.js'
import calculateAspectRatioFit from '../utils/resizeImg.js';
import checkAnswers from '../utils/checkAnswers'
import footer from '../blocks/footer'
import game from '../blocks/game'
import header from '../blocks/header'
import render from '../utils/render'
import stats from './stats'
import game2 from './game-2'

export default function game3() {
    let gameTemplate = createElement(`
        ${header(initialState)}
        ${game(statsData, levels['3'])}
        ${footer()}`)
    let gameArea = gameTemplate.querySelector('.game__content');
    let formElements = gameArea.elements;
    let images = gameTemplate.querySelectorAll(`.game__option > img`);
    let backBtn = gameTemplate.querySelector('.header__back');
    
    backBtn.addEventListener('click', () => {
        render(game2())
    })
    
    Array.prototype.forEach.call(images, (img) => {
        img.addEventListener(`load`, (event) => {
            calculateAspectRatioFit(img);
        })
    })
    
    gameArea.addEventListener('click', (ev) => {
        if (checkAnswers(formElements))
            render(stats());
    })
    
    return gameTemplate;    
}
