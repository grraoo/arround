import createElement from '../utils/elementCreator'
import greeting from './greeting'
import footer from '../blocks/footer'
import render from '../utils/render'
import game1 from './game-1'
    
export default function rules() {
    let rulesTemplate = createElement(`<header class="header">
        <div class="header__back">
          <span class="back">
            <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
            <img src="img/logo_small.png" width="101" height="44">
          </span>
        </div>
      </header>
      <div class="rules">
        <h1 class="rules__title">Правила</h1>
        <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
          src="img/photo_icon.png" width="16" height="16"> или рисунок <img
          src="img/paint_icon.png" width="16" height="16" alt="">.<br>
          Фотографиями или рисунками могут быть оба изображения.<br>
          На каждую попытку отводится 30 секунд.<br>
          Ошибиться можно не более 3 раз.<br>
          <br>
          Готовы?
        </p>
        <form class="rules__form">
          <input class="rules__input" type="text" placeholder="Ваше Имя">
          <button class="rules__button  continue" type="submit" disabled>Go!</button>
        </form>
      </div>
      ${footer()}`)
    let startGameBtn = rulesTemplate.querySelector('.rules__button');
    let nameField = rulesTemplate.querySelector('.rules__input');
    let backBtn = rulesTemplate.querySelector('.header__back');
    
    startGameBtn.disabled = true;
       
    backBtn.addEventListener('click', () => {
        render(greeting())
    })
    
    nameField.addEventListener('keyup', () => {
       startGameBtn.disabled = nameField.value ? false : true;
    }) 
    
    startGameBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        render(game1());
    });
    
    return rulesTemplate;
}
