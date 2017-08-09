import IntroView from './intro-view'
import Application from '../../application'

export default class {
    constructor() {
        this._view = new IntroView();
        this._view.onStart = () => {
            Application.showGreeting();
        }
    }
    
    init() {
        this._view.show();
    }
}