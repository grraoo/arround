export default function lvlStats(stats) {
    return Array.from(stats.values(), 
        (status) => `<li class="stats__result stats__result--${status}"></li>`
    ).join('');
}