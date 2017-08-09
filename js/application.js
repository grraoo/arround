import Intro from './screens/intro/intro';
import Greeting from './screens/greeting/greeting';
import Rules from './screens/rules/rules';
import Game from './screens/games/game';
import Stats from './screens/stats/stats';

export default new class {
    constructor() {
        this._intro = new Intro();
        this._greeting = new Greeting();
        this._rules = new Rules();
        this._game = new Game();
        this._stats = new Stats();
    }

    init() {
        this.showIntro();
    }

    showIntro() {
        this._intro.init();
    }

    showGreeting() {
        this._greeting.init();
    }

    showRules() {
        this._rules.init();
    }

    showGame() {
        this._game.init();
    }

    showStats() {
        this._stats.init();
    }
};
