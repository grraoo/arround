import createElement from '../utils/elementCreator';
import { initialState, stats, levels } from '../data/data'
import calculateAspectRatioFit from '../utils/resizeImg';
import checkAnswers from '../utils/checkAnswers'
import footer from '../blocks/footer'
import header from '../blocks/header'
import game from '../blocks/game'
import render from '../utils/render'
import game3 from './game-3'
import game1 from './game-1'

export default function game2() {
    let gameTemplate = createElement(`
        ${header(initialState)}
        ${game(stats, levels['2'])}
        ${footer()}`)
    let gameArea = gameTemplate.querySelector('.game__content')
    let formElements = gameArea.elements;
    let images = gameTemplate.querySelectorAll(`.game__option > img`);
    let backBtn = gameTemplate.querySelector('.header__back');
    
    backBtn.addEventListener('click', () => {
        render(game1())
    })
    
    Array.prototype.forEach.call(images, (img) => {
        img.addEventListener(`load`, (event) =>{
            calculateAspectRatioFit(img);
        });
    })
    
    let gameForm = gameTemplate.querySelector('.game__content');
    gameForm.addEventListener('click', (ev) => {
        if (checkAnswers(formElements))
            render(game3())
    })
    
    return gameTemplate;
}
