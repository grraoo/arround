export default function lives(lives) {
    let livesTemplate = `
        <div class="game__lives">
            ${new Array(3 - lives).fill(getHeartTemplate('img/heart__empty.svg')).join(``)}
            ${new Array(lives).fill(getHeartTemplate('img/heart__full.svg')).join(``)}
        </div>`

    return livesTemplate;
}

function getHeartTemplate(url) {
    return `<img src="${url}" class="game__heart" alt="Life" width="32" height="32">`;
}