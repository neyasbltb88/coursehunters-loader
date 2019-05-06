// import * as Template from './template';
import Template from './template';

export default class Interface {
    constructor(props) {
        this.main = props.main;
        this.container = null;
        this.lesson_section = null;

        this.container_title = 'Скачать курс';


        this.template = Template(this);

        this.init();
    }

    createContainer() {
        this.container = this.template.container();

        this.lesson_section.after(this.container);
    }

    lessonRender(index) {
        this.template.lessonRender(index);
    }

    lessonsRender() {
        this.template.lessonsRender();
    }


    init() {
        console.log('%c%s', (window.log_color) ? window.log_color.blue : '', `*CourseLoader* Interface init`);

        this.lesson_section = document.querySelector('.standard-block[data-id]');

        this.createContainer();

        requestAnimationFrame(() => this.main.init());
    }
}