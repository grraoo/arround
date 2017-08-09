import Intro from './screens/intro/intro';
import Greeting from './screens/greeting/greeting';
import Rules from './screens/rules/rules';
import Game from './screens/games/game';
import Stats from './screens/stats/stats';

const GameState = {
    INTRO: '',
    GREETING: 'greeting',
    RULES: 'rules',
    GAME: 'game',
    STATS: 'stats'
}

const getGameStateFromHash = (hash) => hash.replace('#', '');

class Application {
    constructor() {
        this._routes = {
            [GameState.INTRO]: Intro,
            [GameState.GREETING]: Greeting,
            [GameState.RULES]: Rules,
            [GameState.GAME]: Game,
            [GameState.STATS]: Stats
        }
        
        window.onhashchange = () => {
            this._changeGameState(getGameStateFromHash(location.hash));
        }
    }

    init() {
        this._changeGameState(getGameStateFromHash(location.hash));
    }

    showIntro() {
        location.hash = GameState.INTRO;
    }

    showGreeting() {
        location.hash = GameState.GREETING;
    }

    showRules() {
        location.hash = GameState.RULES;
    }

    showGame() {
        location.hash = GameState.GAME;
    }

    showStats() {
        location.hash = GameState.STATS;
    }
    
    _changeGameState(route = GameState.INTRO) {
        const Screen = this._routes[route];
        if (!Screen) return
        new Screen().init();
    }
};

const app = new Application();
export default app;
