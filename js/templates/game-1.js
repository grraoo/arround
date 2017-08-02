import createElement from '../utils/elementCreator'
import { initialState, stats, levels } from '../data/data.js'
import rules from './rules'
import calculateAspectRatioFit from '../utils/resizeImg.js';
import checkAnswers from '../utils/checkAnswers'
import game from '../blocks/game'
import footer from '../blocks/footer'
import render from '../utils/render'
import header from '../blocks/header'
import game2 from './game-2'

export default function game1() {        
    let gameTemplate = createElement(`
        ${header(initialState)}
        ${game(stats, levels['1'])}
        ${footer()}`)
    let gameArea = gameTemplate.querySelector('.game__content')
    let formElements = gameArea.elements;
    let images = gameTemplate.querySelectorAll(`.game__option > img`);
    let backBtn = gameTemplate.querySelector('.header__back');
    
    backBtn.addEventListener('click', () => {
        render(rules())
    })

    Array.prototype.forEach.call(images, (img) => {
        img.addEventListener(`load`, (event) =>{
            calculateAspectRatioFit(img);
        });
    })
    
    gameArea.addEventListener('click', () => {
        if (checkAnswers(formElements))
            render(game2());
    })
    
    return gameTemplate;
}
