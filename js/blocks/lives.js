export default function lives(state) {
    let livesTemplate = `
        <div class="game__lives">
            ${new Array(3 - state.lives).fill(getHeartTemplate('img/heart__empty.svg')).join(``)}
            ${new Array(state.lives).fill(getHeartTemplate('img/heart__full.svg')).join(``)}
        </div>`

    return livesTemplate;
}

function getHeartTemplate(url) {
    return `<img src="${url}" class="game__heart" alt="Life" width="32" height="32">`;
}