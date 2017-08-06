import lvlStats from '../blocks/lvlStats'

export default function game(stats, level) {
    let answers = level.answers.map((answer, i) => {
        return `
            <div class="game__option">
                <img src="${answer.image}" alt="Option ${i+1}" width="468" height="458">
                <label class="game__answer game__answer--photo">
                    <input name="question${i+1}" type="radio" value="photo">
                    <span>Фото</span>
                </label>
                <label class="game__answer game__answer--paint">
                    <input name="question${i+1}" type="radio" value="paint">
                    <span>Рисунок</span>
                </label>
            </div>`
    }).join('');
    let gameTemplate = `
        <div class="game">
            <p class="game__task">${level.question}</p>
            <form class="game__content">
                ${answers}
            </form>
            <div class="stats">
                <ul class="stats">
                    ${lvlStats(stats)}
                </ul>
            </div>
        </div>`

    return gameTemplate;
}