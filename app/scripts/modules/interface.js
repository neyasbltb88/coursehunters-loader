export default class Interface {
    constructor(props) {
        this.main = props.main;
        this.container = null;
        this.lesson_section = null;

        this.init();
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'standard-block';

        this.lesson_section.after(this.container);
    }


    init() {
        console.log('%c%s', (window.log_color) ? window.log_color.blue : '', `*CourseLoader* Interface init`);

        this.lesson_section = document.querySelector('.standard-block[data-id]');

        this.createContainer();

        this.main.init();
    }
}