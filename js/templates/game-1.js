import createElement from '../utils/elementCreator'
import { initialState, stats } from '../data/data.js'
import calculateAspectRatioFit from '../utils/resizeImg.js';
import lvlStats from '../blocks/lvlStats'
import render from '../utils/render'
import header from '../blocks/header'
import game2 from './game-2'

export default function game1() {
    let gameTemplate = createElement(`
      ${header(initialState)}
      <div class="game">
        <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
        <form class="game__content">
          <div class="game__option">
            <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
            <label class="game__answer game__answer--photo">
              <input name="question1" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer game__answer--paint">
              <input name="question1" type="radio" value="paint">
              <span>Рисунок</span>
            </label>
          </div>
          <div class="game__option">
            <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
            <label class="game__answer  game__answer--photo">
              <input name="question2" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer  game__answer--paint">
              <input name="question2" type="radio" value="paint">
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
    let gameArea = gameTemplate.querySelector('.game__content')
    let formElements = gameArea.elements;
    let images = gameTemplate.querySelectorAll(`.game__option > img`);
    
    [].forEach.call(images, (img) => {
        img.addEventListener(`load`, (event) =>{
            calculateAspectRatioFit(img);
        });
    })
    
    gameArea.addEventListener('click', () => {
        if (formElements.question1.value && formElements.question2.value)
            render(game2());
    })
    
    return gameTemplate;
}
