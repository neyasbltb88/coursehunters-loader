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
            clear_history_btn: 'Очистить историю скачиваний',
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

        // Если новый элемент имеет атрибут data-render, то элемент полностью обновится,
        // игнорируя флаг text_content
        if (new_elem.dataset.render) {
            text_content = false;
            delete new_elem.dataset.render;
        }

        // Составление сектора нового элемента для поиска его старой версии по такому же селектору
        if (new_elem.id) {
            prev_selector = new_elem.id;
        } else {
            prev_selector = `.${new_elem.className.split(' ').join('.')}`;
            prev_selector += (new_elem.dataset.key !== undefined) ? `[data-key="${new_elem.dataset.key}"]` : '';
        }

        let prev = parent.querySelector(prev_selector);

        if (!prev) {
            // Если еще не блыо такого элемента, то добавить в конец родительского
            parent.appendChild(new_elem);
        } else if (prev && !text_content) {
            // Если элемент был, и нужно рендерить полностью, заменяем элемент
            prev.replaceWith(new_elem);
        } else if (prev && text_content) {
            // Если элемент был, и нужно обноить только текстовое содержимое в нем
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
        let checkboxMaster = this.template.checkboxMaster();
        if (!checkboxMaster) return;

        checkboxMaster.addEventListener('change', (e) => this.handlerCheckboxMaster(e));

        this.outputRender('.btn_container', checkboxMaster);
    }

    handlerClearHistoryBtn(e) {
        e.preventDefault();

        this.main.storeLessonsClear();

        return false;
    }

    renderClearHistoryBtn() {
        let clear_history_btn = document.createElement('a');
        clear_history_btn.className = 'clear_history_btn';
        clear_history_btn.href = '#';
        clear_history_btn.textContent = this.text.clear_history_btn;
        clear_history_btn.addEventListener('click', e => this.handlerClearHistoryBtn(e));

        this.outputRender('.btn_container', clear_history_btn, true);
    }

    render() {
        for (let index = 0; index < this.main.state.lessons.length; index++) {
            this.renderLesson(index);
        }

        this.renderBtn();
        this.renderCheckboxMaster();
        this.renderClearHistoryBtn();
    }


    init() {
        console.log('%c%s', (window.log_color) ? window.log_color.blue : '', `*CourseLoader* Interface init`);

        if (this.createContainer()) {
            requestAnimationFrame(() => this.main.init());
        }
    }
}