export default function render(view) {
    let contentScreen = document.querySelector(`.central`);
    contentScreen.innerHTML = '';
    contentScreen.appendChild(view.element);
}
