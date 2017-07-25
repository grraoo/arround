const LEFT_ARROW_KEY = 37;
const RIGHT_ARROW_KEY = 39;

let screens = document.querySelectorAll(`template`);
let contentScreen = document.querySelector(`.central`);
let numOfScreen = 0;

setScreenByNum(numOfScreen);

document.onkeydown = (e) => {
    if (e.shiftKey && e.keyCode === LEFT_ARROW_KEY) {
        if (numOfScreen !== 0) {
            numOfScreen--;
        }
        setScreenByNum(numOfScreen);
    } else if (e.shiftKey && e.keyCode === RIGHT_ARROW_KEY) {
        numOfScreen++;
        setScreenByNum(numOfScreen);
    }
};

function setScreenByNum(num) {
    contentScreen.innerHTML = screens[num].innerHTML;
}
