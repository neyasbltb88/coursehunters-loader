// import * as Template from './template';
import Template from './template';

export default class Interface {
    constructor(props) {
        this.main = props.main;
        this.container = null;

        this.container_title = 'Скачать курс';
        this.btn_title = 'Скачать выделенные';
        this.rendered_state = {
            lessons: [],
        }

        this.template = Template(this);

        this.init();
    }

    isEqualObj(obj1, obj2) {
        if (!obj1 || !obj2) return false;

        for (let key in obj1) {
            if (obj1[key] !== obj2[key]) return false;
        }

        return true;
    }

    outputRender(parent_selector, new_elem) {
        let parent = document.querySelector(parent_selector);
        let prev_selector;

        if (new_elem.id) {
            prev_selector = new_elem.id;
        } else {
            prev_selector = `.${new_elem.className.split(' ').join('.')}`;
            prev_selector += (new_elem.dataset.key !== undefined) ? `[data-key="${new_elem.dataset.key}"]` : '';
        }

        let prev = parent.querySelector(prev_selector);

        if (prev) {
            prev.replaceWith(new_elem);
        } else {
            parent.appendChild(new_elem);
        }
    }

    createContainer() {
        let lesson_section = document.querySelector('.standard-block[data-id]');
        this.container = this.template.container();

        lesson_section.after(this.container);
    }

    handlerLessonClick(index) {
        let state = Object.assign({}, this.main.state);
        state.lessons[index].is_checked = !state.lessons[index].is_checked;
        this.main.setState(state);
    }

    renderLesson(index) {
        let li = this.template.lesson(index);
        if (!li) return;

        li.addEventListener('click', this.handlerLessonClick.bind(this, index));

        this.outputRender('.course_loader_container .lessons-list', li);
    }

    renderBtn() {
        let btn = this.template.btn();

        this.outputRender('.btn_container', btn);
    }

    handlerCheckboxMaster(e) {
        let checked = e.target.checked;
        let state = Object.assign({}, this.main.state);

        state.lessons = state.lessons.map(lesson => {
            lesson.is_checked = checked;

            return lesson;
        })

        this.main.setState(state);
    }

    renderCheckboxMaster() {
        let checkboxMaster = this.template.checkboxMaster();
        checkboxMaster.addEventListener('change', (e) => this.handlerCheckboxMaster(e));

        this.outputRender('.btn_container', checkboxMaster);
    }

    render(index) {
        if (typeof index === 'number') {
            this.renderLesson(index);

            this.renderBtn();
            this.renderCheckboxMaster();
        } else {
            let length = this.main.state.lessons.length;
            for (let index = 0; index < length; index++) {
                this.render(index);
            }
        }
    }


    init() {
        console.log('%c%s', (window.log_color) ? window.log_color.blue : '', `*CourseLoader* Interface init`);

        this.createContainer();

        requestAnimationFrame(() => this.main.init());
    }
}