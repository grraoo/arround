import livesBlock from '../blocks/lives'
import Application from '../application';

export const onBackClick = () => {
    Application.showIntro();
}

export default function header(state = null) {
    let content = '';
    if (state) {
        let { lives, time } = state;
        content = state ? `<h1 class="game__timer">${time}</h1>
            ${livesBlock(lives)}` : ''
    }
    
    let headerTemplate = `<header class="header">
        <div class="header__back">
            <span class="back">
                <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
                <img src="img/logo_small.png" width="101" height="44">
            </span>
        </div>
        ${content}
      </header>`
      
    return headerTemplate;
}