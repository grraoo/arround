import createElement from '../utils/elementCreator';
import { initialState, stats } from '../data/data.js'
import calculateAspectRatioFit from '../utils/resizeImg.js';
import lvlStats from '../blocks/lvlStats'
import header from '../blocks/header'
import render from '../utils/render'
import game3 from './game-3'
import game1 from './game-1'

export default function game2() {
    let gameTemplate = createElement(`
    ${header(initialState)}
    <div class="game">
      <p class="game__task">Угадай, фото или рисунок?</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="http://placehold.it/705x455" alt="Option 1" width="705" height="455">
          <label class="game__answer  game__answer--photo">
            <input name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--wide  game__answer--paint">
            <input name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
      </form>
      <div class="stats">
        <ul class="stats">
          ${lvlStats(stats)}
        </ul>
      </div>
    </div>
    <footer class="footer">
      <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
      <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; 2016</span>
      <div class="footer__social-links">
        <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
        <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
        <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
        <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
      </div>
    </footer>`)
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
        if (ev.target.className = 'game__answer')
            render(game3())
    })
    
    return gameTemplate;
}
