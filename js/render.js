import intro from './intro'
import { greetingElement } from './greeting'
import { rulesElement } from './rules'
import { game1 } from './game-1'
import { game2 } from './game-2'
import { game3 } from './game-3'
import { stats } from './stats'

let contentScreen = document.querySelector(`.central`);
let screens = [intro, greetingElement, rulesElement, game1, game2, game3, stats];

function render(num) {
    contentScreen.innerHTML = screens[num].innerHTML;
}

export { screens, render }
