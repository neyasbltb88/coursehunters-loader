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
                    <div>
                        <ul class="lessons-list">
                            
                        </ul>

                        <button class="toggle-aside">Скачать выделенное</button>
                    </div>
                </details>

                <style>
                    .course_loader_container .toggle-aside {
                        position: static;
                        border: none;
                    }

                    .course_loader_container .toggle-aside:after {
                        content: '';
                    }

                    .course_loader_container .lessons-list__li {
                        line-height: 20px;
                        min-height: 30px;
                        padding: 0 5px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }                    
                </style>
            `;

            return container;
        },

        lessonRender(index) {
            let lesson = this.main.lessons[index];

            let li = document.createElement('li');
            li.className = 'lessons-list__li';
            li.dataset.lessonIndex = index;
            li.innerHTML = /* html */ `
                <progress class="lessons-list__progress" max="100" value="${lesson.progress}"></progress>
                <span itemprop="name">${lesson.name}</span>
                <em class="progress_value">${lesson.progress}%</em>
            `;

            let ul = this.container.querySelector('.lessons-list');
            let prev_lesson_elem = ul.querySelector(`li[data-lesson-index="${index}"]`);

            if (prev_lesson_elem) {
                prev_lesson_elem.replaceWith(li);
            } else {
                ul.appendChild(li);
            }
        },

        lessonsRender() {
            this.main.lessons.forEach((lesson, index) => this.lessonRender(index));
        }
    };



    // Возврат объекта с привязанными функциями
    let bindReturn = () => {
        for (const fun in fn) fn[fun] = fn[fun].bind(that)
        return fn;
    }

    return bindReturn();
}