import createElement from '../utils/elementCreator';
import { initialState, stats as statsData } from '../data/data.js'
import calculateAspectRatioFit from '../utils/resizeImg.js';
import lvlStats from '../blocks/lvlStats'
import header from '../blocks/header'
import render from '../utils/render'
import stats from './stats'
import game2 from './game-2'

export default function game3() {
    let gameTemplate = createElement(`
      ${header(initialState)}
      <div class="game">
        <p class="game__task">Найдите рисунок среди изображений</p>
        <form class="game__content  game__content--triple">
          <div class="game__option">
            <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
          </div>
          <div class="game__option  game__option--selected">
            <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
          </div>
          <div class="game__option">
            <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
          </div>
        </form>
        <div class="stats">
          <ul class="stats">
            ${lvlStats(statsData)}
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
    let gameArea = gameTemplate.querySelector('.game__content');
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
        if (ev.target.className.includes('game__option'))
            render(stats());
    })
    
    return gameTemplate;    
}
