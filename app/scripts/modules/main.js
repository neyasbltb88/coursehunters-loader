import Interface from './interface';

export default class Main {
    constructor() {
        this.state = {
            lessons: [],
            is_loading: false,
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

        new_value = new_value.map(char => template[char] || char);

        return new_value.join('');
    }

    collectLessonData() {
        let lesson_elems = document.querySelectorAll('#lessons-list li');
        let lessons = [];

        lesson_elems.forEach(lesson => {
            let lesson_data = {};
            let lesson_name = lesson.querySelector('[itemprop="name"]').textContent;

            lesson_data.index = lessons.length;
            lesson_data.name = this.fileNameNormalize(lesson_name);
            lesson_data.url = lesson.querySelector('[itemprop="url"]').href;
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

    async collectSizeTotal(index = 0) {
        let lesson = this.state.lessons[index];
        let size_total = await loader.request(lesson.url, { method: 'HEAD' });
        lesson.size_total = size_total.total;

        index++;
        if (index < this.state.lessons.length && !this.state.lessons[index].size_total) {
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
        state.lessons[index].is_loaded = true;
        state.lessons[index].is_loading = false;

        window.Downloader(e.target.response, state.lessons[index].name + '.mp4', 'video/mp4');

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
                // responseType: 'arraybuffer',
                responseType: 'blob',
            }, this.loadProgress.bind(this, index));
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

        this.loadLoaded(index, loded_event)

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

        let lessons = this.collectLessonData();
        this.setState({ lessons });

        this.collectSizeTotal();
    }
}