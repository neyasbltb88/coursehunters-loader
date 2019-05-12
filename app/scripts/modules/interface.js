// import * as Template from './template';
import Template from './template';

export default class Interface {
    constructor(props) {
        this.main = props.main;
        this.container = null;

        this.text = {
            container_title: 'Скачать курс',
            btn_title: 'Скачать выделенные:',
            btn_title_loading: 'Остановить скачивание:',
            btn_title_disabled: 'Выделите уроки для скачивания',
            checkbox_master: 'Выделить все',
            checkbox_master_checked: 'Снять выделение',
        };

        this.rendered_state = {
            lessons: [],
            checkboxMaster: undefined,
            btnDisabled: undefined,
        };

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

    outputRender(parent_selector, new_elem, text_content = false) {
        let parent = document.querySelector(parent_selector);
        let prev_selector;

        if (new_elem.dataset.render) {
            text_content = false;
        }

        delete new_elem.dataset.render;

        if (new_elem.id) {
            prev_selector = new_elem.id;
        } else {
            prev_selector = `.${new_elem.className.split(' ').join('.')}`;
            prev_selector += (new_elem.dataset.key !== undefined) ? `[data-key="${new_elem.dataset.key}"]` : '';
        }

        let prev = parent.querySelector(prev_selector);


        if (prev && !text_content) {
            prev.replaceWith(new_elem);
        } else if (!prev && !text_content) {
            parent.appendChild(new_elem);
        } else if (!prev && text_content) {
            parent.appendChild(new_elem);
        } else if (prev && text_content) {
            prev.textContent = new_elem.textContent;
        }
    }

    createContainer() {
        let lesson_section = document.querySelector('.standard-block[data-id]');
        if (!lesson_section) return false;

        this.container = this.template.container();
        lesson_section.after(this.container);

        return true;
    }

    handlerLessonClick(index) {
        let state = Object.assign({}, this.main.state);
        if (state.lessons[index].is_loading || state.lessons[index].is_loaded) return;

        state.lessons[index].is_checked = !state.lessons[index].is_checked;
        this.main.setState(state);
    }

    renderLesson(index) {
        let li = this.template.lesson(index);
        if (!li) return;

        li.addEventListener('click', this.handlerLessonClick.bind(this, index));

        this.outputRender('.course_loader_container .lessons-list', li);
    }

    handlerBtn() {
        if (this.main.state.is_loading) {
            this.main.loadStop();
        } else {
            this.main.loadStart();
        }

    }

    renderBtn() {
        let btn = this.template.btn();
        btn.addEventListener('click', this.handlerBtn.bind(this));

        this.outputRender('.btn_container', btn, true);
    }

    handlerCheckboxMaster(e) {
        let checked = e.target.checked ? true : false;
        let state = Object.assign({}, this.main.state);

        state.lessons = state.lessons.map(lesson => {
            if (lesson.is_loading || lesson.is_loaded) {

            } else {
                lesson.is_checked = checked;
            }

            return lesson;
        })

        this.main.setState(state);
    }

    renderCheckboxMaster() {
        let all_cheked = this.main.state.lessons.every(lesson => lesson.is_checked);
        if (all_cheked === this.rendered_state.checkboxMaster) return;
        this.rendered_state.checkboxMaster = all_cheked;

        let checkboxMaster = this.template.checkboxMaster(all_cheked);
        checkboxMaster.addEventListener('change', (e) => this.handlerCheckboxMaster(e));

        this.outputRender('.btn_container', checkboxMaster);
    }

    render() {
        for (let index = 0; index < this.main.state.lessons.length; index++) {
            this.renderLesson(index);
        }

        this.renderBtn();
        this.renderCheckboxMaster();
    }


    init() {
        console.log('%c%s', (window.log_color) ? window.log_color.blue : '', `*CourseLoader* Interface init`);

        if (this.createContainer()) {
            requestAnimationFrame(() => this.main.init());
        }
    }
}