import Interface from './interface';

export default class Main {
    constructor() {
        this.interface = new Interface({
            main: this,
        });
    }

    init() {
        console.log('%c%s', (window.log_color) ? window.log_color.blue : '', `*CourseLoader* init`);
    }
}