import Interface from './interface';

export default class Main {
    constructor() {
        this.lessons = [];

        this.interface = new Interface({
            main: this,
        });

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
        let lessons = document.querySelectorAll('#lessons-list li');

        lessons.forEach(lesson => {
            let lesson_data = {};
            let lesson_name = lesson.querySelector('[itemprop="name"]').textContent;
            lesson_data.name = this.fileNameNormalize(lesson_name);
            lesson_data.url = lesson.querySelector('[itemprop="url"]').href;
            lesson_data.size = undefined;
            lesson_data.progress = 0;

            this.lessons.push(lesson_data);
        });
    }

    init() {
        console.log('%c%s', (window.log_color) ? window.log_color.blue : '', `*CourseLoader* init`);

        this.collectLessonData();

        this.interface.lessonsRender();

    }
}