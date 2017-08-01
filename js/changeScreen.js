import { screens, render } from './render'

let numberOfScreen = 0;

function renderNextScreen() {
    if (numberOfScreen !== screens.length)
        numberOfScreen++
    render(numberOfScreen);
}

function renderPrevScreen() {
    if (numberOfScreen !== 0)
        numOfScreen--
    render(numberOfScreen);
}

export { renderNextScreen, renderPrevScreen }