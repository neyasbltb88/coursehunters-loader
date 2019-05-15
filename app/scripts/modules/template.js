export default function Template(that) {
    let fn = {
            container() {
                let container = document.createElement('div');
                container.className = 'standard-block course_loader_container';
                container.innerHTML = /* html */ `
        <h2>${this.text.container_title}</h2>
        <details ${this.main.state.is_open ? 'open' : ''}>
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
                padding-left: 1.5em;
                padding-right: 1.5em;
            }

            .course_loader_container .toggle-aside.course_loader_btn[disabled] {
                cursor: default;
                filter: grayscale(1);
            }

            .course_loader_container .toggle-aside.course_loader_btn[disabled]:hover {
                color: #c3c3c3;
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
                white-space: nowrap;
            }

            .course_loader_container .btn_container {
                display: flex;
                justify-content: space-between;
                align-items: center;
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
            
            <span itemprop="name"><input type="checkbox" class="lesson_check" ${lesson.is_checked ? 'checked' : ''} ${(lesson.is_loading || lesson.is_loaded) ? 'disabled' : ''}>${lesson.name}</span>

            <em class="lesson_info">
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
                    
                    if (lesson.is_loaded) sum.amount_loaded++;
                    if (lesson.size_total) sum.size_total += lesson.size_total;
                    if (lesson.size_loaded) sum.size_loaded += lesson.size_loaded;
                }

                return sum;
            }, {
                amount: 0,
                amount_loaded: 0,
                size_total: 0,
                size_loaded: 0,
            });

            let btn_text = '';
            let disabled = (total_checked.amount - total_checked.amount_loaded) <= 0;
            if(!disabled) {
                if(this.main.state.is_loading) {
                    btn_text = `${this.text.btn_title_loading} `;
                } else {
                    btn_text = `${this.text.btn_title} `;
                }

                btn_text += `${total_checked.amount_loaded}/${total_checked.amount}`;
                btn_text += total_checked.size_total ? ` (${window.utils.FileSize(total_checked.size_loaded)}/${window.utils.FileSize(total_checked.size_total)})` : '';
            } else {
                btn_text = this.text.btn_title_disabled;
            }

            if(this.rendered_state.btnDisabled !== disabled) {
                this.rendered_state.btnDisabled = disabled;
                btn.dataset.render = true;
            }

            btn.disabled = disabled;
            btn.textContent = btn_text;

            return btn;
        }, /* btn */

        checkboxMaster(checked) {
            let label = document.createElement('label');
            label.className = 'checkbox_master_container';

            label.innerHTML = /* html */ `
                <input type="checkbox" class="checkbox_master" ${checked ? 'checked' : ''}>
                <span class="checkbox_master_text">${checked ? this.text.checkbox_master_checked : this.text.checkbox_master}</span>
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