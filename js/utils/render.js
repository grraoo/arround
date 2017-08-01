export default function render(screen) {
    let contentScreen = document.querySelector(`.central`);
    contentScreen.innerHTML = '';
    contentScreen.appendChild(screen);
}
