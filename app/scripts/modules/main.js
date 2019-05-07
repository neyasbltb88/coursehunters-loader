import Interface from './interface';

export default class Main {
    constructor() {
        this.state = {
            lessons: [],
        };

        this.interface = new Interface({
            main: this,
        });

    }

    setState(new_state) {
        Object.assign(this.state, new_state);
        this.interface.render();
    }

    fileNameNormalize(value) {
        let new_value = value.split('');
        let template = {
            '\\': '_',
            '/': '_',
            ':': '-',
            '*': '_',
            '?': '7',
            '"': '\'',
            '<': '{',
            '>': '}',
            '|': ' l ',
        };

        new_value = new_value.map(char => template[char] ? template[char] : char);

        return new_value.join('');
    }

    collectLessonData() {
        let lesson_elems = document.querySelectorAll('#lessons-list li');
        let lessons = [];

        lesson_elems.forEach(lesson => {
            let lesson_data = {};
            let lesson_name = lesson.querySelector('[itemprop="name"]').textContent;
            lesson_data.name = this.fileNameNormalize(lesson_name);
            lesson_data.url = lesson.querySelector('[itemprop="url"]').href;
            lesson_data.size_loaded = 0;
            lesson_data.size_total = 0;
            lesson_data.progress = 0;
            lesson_data.is_loaded = false;
            lesson_data.is_loading = false;

            lessons.push(lesson_data);
        });

        return lessons;
    }

    async collectSizeTotal(index = 0) {
        let lesson = this.state.lessons[index];
        lesson.size_total = await loader.getSizeTotal(lesson.url);

        index++;
        if (index < this.state.lessons.length) {
            this.collectSizeTotal(index);
        } else {
            this.setState(this.state);
        }
    }

    init() {
        console.log('%c%s', (window.log_color) ? window.log_color.blue : '', `*CourseLoader* init`);

        let lessons = this.collectLessonData();
        this.setState({ lessons });

        this.collectSizeTotal();
    }
}