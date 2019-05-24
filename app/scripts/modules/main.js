import Interface from './interface';
import SStorage from './storage';
import Collector from './collector';

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

        this.collector = new Collector();

        this.storage = null;
    }

    // === Служебные ===

    setState(new_state) {
        Object.assign(this.state, new_state);

        this.interface.render();
    }

    // --- Служебные ---

    // === Сбор данных ===

    collectCourseData() {
        let course_id = document.querySelector('.standard-block[data-id]').dataset.id;
        let course_name = document.querySelector('.breadcrumbs__a_active').textContent;

        this.id = `id_${course_id}` || course_name;
    }

    async collectSizeTotal(index = 0) {
        let lesson = this.state.lessons[index];

        if (!lesson.size_total) {
            let size_total = await loader.request(lesson.url, { method: 'HEAD' });
            lesson.size_total = size_total.total;
            lesson.mime = size_total.target.getResponseHeader('Content-Type');
        }

        index++;
        if (index < this.state.lessons.length) {
            this.collectSizeTotal(index);
        } else if (index >= this.state.lessons.length) {
            this.setState(this.state);
        }
    }

    // --- Сбор данных ---

    // === Хранилище ===
    storeInit() {
        this.storage = new SStorage(this.id, {
            lessons: {},
            is_open: true,
        });
    }

    storeLessonSave(index) {
        let lessons = this.storage.get('lessons');
        if (!lessons[index]) lessons[index] = {};

        lessons[index].size_total = this.state.lessons[index].size_total;

        this.storage.set('lessons', lessons);
    }

    storeLessonsRestore() {
        if (localStorage.getItem(this.id)) {
            this.storeInit();
        } else {
            return;
        }

        let state = Object.assign({}, this.state);
        let lessons = this.storage.get('lessons');

        for (let index in lessons) {
            state.lessons[index].is_loaded = true;
            state.lessons[index].progress = 100;
            state.lessons[index].size_total = lessons[index].size_total;
            state.lessons[index].size_loaded = lessons[index].size_total;
        }

        this.setState(state);
    }

    storeLessonsClear() {
        let state = Object.assign({}, this.state);
        this.storage.set('lessons', {});

        state.lessons.forEach(lesson => {
            lesson.is_loaded = false;
            if (!lesson.is_loading) {
                lesson.progress = 0;
                lesson.size_loaded = 0;
            }
        });

        this.setState(state);
    }

    // --- Хранилище ---

    // === Закачка ===
    // === Закачка: обработчики ===

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
        let state = Object.assign({}, this.state);
        let lesson = state.lessons[index];

        lesson.is_loaded = true;
        lesson.is_loading = false;
        lesson.size_loaded = lesson.size_total;
        lesson.progress = '100';

        window.Downloader(new Blob([e.target.response]), lesson.name + lesson.ext, lesson.mime);

        this.storeLessonSave(index);

        this.setState(state);
    }

    loadEnd() {
        let state = Object.assign({}, this.state);
        state.is_loading = false;
        this.setState(state);
    }

    // --- Закачка: обработчики --- 

    async loadLesson(index) {
        if (index === undefined) this.loadEnd();

        let lesson = this.state.lessons[index];
        let loded_event;
        lesson.is_loading = true;

        if (!lesson.url && lesson.data) {
            this.loadLoaded(index, {
                target: {
                    response: lesson.data
                }
            });
        } else if (lesson.url) {
            try {
                loded_event = await window.loader.request(lesson.url, {
                    responseType: 'arraybuffer',
                }, this.loadProgress.bind(this, index));

                this.loadLoaded(index, loded_event);
            } catch (error) {
                console.log('Ошибка загрузки: ', error);

                if (error.type === 'abort') {
                    let state = Object.assign({}, this.state);
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
        }

        this.loadLoop();
    }

    async loadLoop() {
        let index;

        // Поиск первого попавшегося урока, отмеченного для скачивания
        for (let i = 0; i < this.state.lessons.length; i++) {
            let lesson = this.state.lessons[i];

            // Если урок с таким индексом существует, он отмечен, еще не загружен и не в процессе загрузки
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

        this.storeInit();

        this.loadLoop();
    }

    loadStop() {
        window.loader.abort();

        this.loadEnd();
    }

    // --- Закачка ---

    init() {
        console.log('%c%s', (window.log_color) ? window.log_color.blue : '', `*CourseLoader* init`);

        this.collectCourseData();

        let lessons = this.collector.collectLessonsData();
        this.setState({ lessons });

        this.storeLessonsRestore();

        this.collectSizeTotal();
    }
}