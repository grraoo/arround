import StatsView from './stats-view';

export default class {
    constructor() {
        this._view = new StatsView();
    }

    init() {
        this._view.show();
    }
}