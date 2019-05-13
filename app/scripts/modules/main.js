import Interface from './interface';
import SStorage from './storage';

export default class Main {
    constructor() {
        this.id = null;

        this.state = {
            lessons: [],
            is_loading: false,
            is_open: true,
        };

        this.interface = new Interface({
            main: this,
        });

        this.storage = null;
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

        new_value = new_value.map(char => template[char] || char);

        return new_value.join('');
    }

    fileNameExt(url) {
        // https://regex101.com/r/fIgKBo/1
        const regex = /.*(\.\w*)/i;
        let res = url.match(regex);

        return res[1];
    }

    collectCourseData() {
        let course_id = document.querySelector('.standard-block[data-id]').dataset.id;
        let course_name = document.querySelector('.breadcrumbs__a_active').textContent;

        this.id = `id_${course_id}` || course_name;
    }

    collectLessonData() {
        let lesson_elems = document.querySelectorAll('#lessons-list li');
        let lessons = [];

        lesson_elems.forEach(lesson => {
            let lesson_data = {};
            let lesson_name = lesson.querySelector('[itemprop="name"]').textContent;

            lesson_data.index = lessons.length;
            lesson_data.url = lesson.querySelector('[itemprop="url"]').href;
            lesson_data.name = this.fileNameNormalize(lesson_name);
            lesson_data.ext = this.fileNameExt(lesson_data.url);
            lesson_data.mime = '';
            lesson_data.size_loaded = 0;
            lesson_data.size_total = 0;
            lesson_data.progress = 0;
            lesson_data.is_loaded = false;
            lesson_data.is_loading = false;
            lesson_data.is_checked = true;

            lessons.push(lesson_data);
        });

        return lessons;
    }

    // --- Хранилище ---
    storeLessonSave(index) {
        let lessons = this.storage.get('lessons');
        if (!lessons[index]) lessons[index] = {};

        lessons[index].size_total = this.state.lessons[index].size_total;

        this.storage.set('lessons', lessons);
    }

    storeLessonRestore() {
        let lessons = this.storage.get('lessons');

        for (let index in lessons) {
            this.state.lessons[index].is_loaded = true;
            this.state.lessons[index].progress = 100;
            this.state.lessons[index].size_total = lessons[index].size_total;
            this.state.lessons[index].size_loaded = lessons[index].size_total;
        }

        this.setState(this.state);
    }

    // === Хранилище ===

    async collectSizeTotal(index = 0) {
        let lesson = this.state.lessons[index];
        let size_total = await loader.request(lesson.url, { method: 'HEAD' });
        lesson.size_total = size_total.total;
        lesson.mime = size_total.target.getResponseHeader('Content-Type');

        index++;
        if (index < this.state.lessons.length) {
            this.collectSizeTotal(index);
        } else if (index >= this.state.lessons.length) {
            this.setState(this.state);
        }
    }

    loadProgress(index, e) {
        let loaded = e.loaded;
        let total = e.total;
        let progress = window.utils.Percent(loaded, e.total, 0);
        let state = Object.assign({}, this.state);

        state.lessons[index].size_total = total;
        state.lessons[index].size_loaded = loaded;
        state.lessons[index].progress = progress;

        this.setState(state);
    }

    loadLoaded(index, e) {
        console.log('loded_event: ', index, e);

        let state = Object.assign({}, this.state);
        let lesson = state.lessons[index];

        lesson.is_loaded = true;
        lesson.is_loading = false;

        window.Downloader(new Blob([e.target.response]), lesson.name + lesson.ext, lesson.mime);

        this.storeLessonSave(index);

        this.setState(state);
    }

    loadEnd() {
        console.log('loadLoop завершен');

        let state = Object.assign({}, this.state);
        state.is_loading = false;
        this.setState(state);
    }


    async loadLesson(index) {
        if (index === undefined) return;

        let lesson = this.state.lessons[index];
        let loded_event;
        lesson.is_loading = true;

        try {
            loded_event = await window.loader.request(lesson.url, {
                responseType: 'arraybuffer',
                // responseType: 'blob',
            }, this.loadProgress.bind(this, index));

            this.loadLoaded(index, loded_event);
        } catch (error) {
            console.log('Ошибка загрузки: ', error);

            if (error.type === 'abort') {
                let state = Object.assign({}, this.state);
                state.is_loading = false;
                state.lessons.map(lesson => {
                    if (lesson.is_loading) {
                        lesson.is_loading = false;
                        lesson.progress = 0;
                        lesson.size_loaded = 0;
                    }

                    return lesson;
                });

                this.setState(state);
                return false;
            }

        }

        this.loadLoop();
    }

    async loadLoop() {
        let index;
        for (let i = 0; i < this.state.lessons.length; i++) {
            let lesson = this.state.lessons[i];
            if (lesson && lesson.is_checked && !lesson.is_loaded && !lesson.is_loading) {
                index = i;
                this.loadLesson(index);
                break;
            }
        }

        if (index === undefined) {
            this.loadEnd();
        }
    }

    loadStart() {
        let state = Object.assign({}, this.state);
        state.is_loading = true;
        this.setState(state);

        this.loadLoop();
    }

    loadStop() {
        window.loader.abort();
    }

    init() {
        console.log('%c%s', (window.log_color) ? window.log_color.blue : '', `*CourseLoader* init`);

        this.collectCourseData();

        this.storage = new SStorage(this.id, {
            lessons: {},
            is_open: true,
        });

        let lessons = this.collectLessonData();
        this.setState({ lessons });

        this.storeLessonRestore();

        this.collectSizeTotal();
    }
}