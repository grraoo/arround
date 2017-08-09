export default function lvlStats(stats = []) {
    return `<div class="stats">
      <ul class="stats">
        ${stats.map((status) => `<li class="stats__result stats__result--${status}"></li>`).join('')}
      </ul>
    </div>`;
}