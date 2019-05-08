export default function Template(that) {
    let fn = {
            container() {
                let container = document.createElement('div');
                container.className = 'standard-block course_loader_container';
                container.innerHTML = /* html */ `
        <h2>${this.container_title}</h2>
        <details open>
            <summary>
                <span class="lessons-list__more">Развернуть / Свернуть</span>
            </summary>
            <div class="details_container">
                <ul class="lessons-list"></ul>

                <div class="btn_container"></div>
            </div>
        </details>

        <style>
            .course_loader_container .toggle-aside.course_loader_btn {
                position: static;
                border: none;
            }

            .course_loader_container .toggle-aside.course_loader_btn:after {
                content: '';
            }

            .course_loader_container .lessons-list__li {
                line-height: 20px;
                min-height: 30px;
                padding: 0 5px;
                display: flex;
                align-items: center;
            }

            .course_loader_container [itemprop="name"] {
                width: 100%;
                display: flex;
                align-items: center;
            }

            .course_loader_container .lesson_check {
                margin: 0 5px 0 0;
            }

            .course_loader_container .white_space {
                white-space: pre;
            }

            .course_loader_container .lesson_info {
                margin-left: 5px;
            }

            .course_loader_container .checkbox_master_container {
                user-select: none;
                cursor: pointer;
            }
            
        </style>
    `;

                return container;
            },
            /* container */

            lesson(index) {
                let lesson = this.main.state.lessons[index];
                let rendered_lesson = this.rendered_state.lessons[index];
                if (this.isEqualObj(lesson, rendered_lesson)) return;

                this.rendered_state.lessons[index] = Object.assign({}, lesson);

                let li = document.createElement('li');
                li.className = 'lessons-list__li';
                li.dataset.key = lesson.index;
                li.innerHTML = /* html */ `
            <progress class="lessons-list__progress" max="100" value="${lesson.progress}"></progress>
            
            <span itemprop="name"><input type="checkbox" class="lesson_check" ${lesson.is_checked ? 'checked' : ''}>${lesson.name}</span>

            <em class="lesson_info">
                ${lesson.size_loaded ? /* html */`<span class="size_loaded white_space">${window.utils.FileSize(lesson.size_loaded)}</span>/` : ''}
                ${lesson.size_total ? /* html */`<span class="size_total white_space">${window.utils.FileSize(lesson.size_total)}</span>` : ''}
                ${lesson.progress ? /* html */`<span class="progress_value white_space">(${lesson.progress}%)</span>` : ''}
            </em>
        `;

            return li;
        }, /* lesson */

        btn() {
            let btn = document.createElement('button');
            btn.className = 'toggle-aside course_loader_btn';

            let total_checked = this.main.state.lessons.reduce((sum, lesson) => {
                if (lesson.is_checked) {
                    sum.amount++;
                    
                    if (lesson.size_total) sum.size += lesson.size_total;
                }

                return sum;
            }, {
                amount: 0,
                size: 0
            });

            btn.textContent = `${total_checked.amount ? `${this.btn_title}: ${total_checked.amount} ${total_checked.size ? `(${window.utils.FileSize(total_checked.size)})` : ''}` : 'Выделите уроки для скачивания'}`;
            btn.disabled = (total_checked.amount > 0) ? false : true;

            return btn;
        }, /* btn */

        checkboxMaster() {
            let all_cheked = this.main.state.lessons.every(lesson => lesson.is_checked);
            let label = document.createElement('label');
            label.className = 'checkbox_master_container';

            label.innerHTML = /* html */ `
                <input type="checkbox" class="checkbox_master" ${all_cheked ? 'checked' : ''}>
                <span class="checkbox_master_text">${all_cheked ? 'Снять выделение' : 'Выделить все'}</span>
            `;

            return label;
        }, /* checkboxMaster */

    };



    // Возврат объекта с привязанными функциями
    let bindReturn = () => {
        for (const fun in fn) fn[fun] = fn[fun].bind(that)
        return fn;
    }

    return bindReturn();
}