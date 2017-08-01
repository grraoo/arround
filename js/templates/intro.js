import createElement from '../utils/elementCreator';
import render from '../utils/render'
import greeting from './greeting'

export default function intro() {
    let introTemplate = createElement(`<div id="intro" class="intro">
        <h1 class="intro__asterisk">*</h1>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>`)
    
    let starBtn = introTemplate.querySelector('.intro__asterisk');
    starBtn.addEventListener('click', () => {
        render(greeting());
    })
    
    return introTemplate;
}
