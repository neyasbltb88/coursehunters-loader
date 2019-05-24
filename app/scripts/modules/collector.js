export default class Collector {
    // Фильтрует строки на предмет недопустимых символов для использования в качестве имени файла
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

    // Возвращает расширение файла из пути к нему (https://site.com/code.zip -> .zip)
    fileNameExt(url) {
        // https://regex101.com/r/fIgKBo/1
        const regex = /.*(\.\w*)/i;
        let res = url.match(regex);

        return res[1];
    }

    // Загружает картинку по url и возвращает ее в виде base64;
    async imgUrl2base64(url) {
        let res = await window.loader.request(url, { responseType: 'blob' });
        let b64 = await window.utils.blob2base64(res.target.response);

        return b64;
    }

    // Собирает айтем списка для Материалов курса
    collectAttachment(index = 0) {
        let attachment_elem = document.querySelector('a.downloads');
        let attachment = {};

        if (!attachment_elem) return false;

        attachment.index = index;
        attachment.url = attachment_elem.href;
        attachment.name = this.fileNameNormalize(attachment_elem.textContent);
        attachment.ext = this.fileNameExt(attachment.url);
        attachment.mime = '';
        attachment.size_loaded = 0;
        attachment.size_total = 0;
        attachment.progress = 0;
        attachment.is_loaded = false;
        attachment.is_loading = false;
        attachment.is_checked = true;

        return attachment;
    }

    // Генерирует содержимое страницы информации о курсе
    async infoPageContent() {
            return /* html */ `
        <!DOCTYPE html>
        <html lang="ru">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>${document.title}</title>

            <style>
                ${document.querySelector('head style').textContent}

                body {
                    background-image: url(${await this.imgUrl2base64('https://coursehunters.net/images/background.png')});
                }

                header.standard-block {
                    display: flex;
                }

                header.standard-block .header_img {
                    min-width: 250px;
                    align-self: center;
                }

                header.standard-block .header_img img {
                    display: block;
                }

                header.standard-block .header_info {
                    padding-left: 15px;
                }

                header.standard-block .standard-block__date {
                    position: relative;
                }

                .lessons-list__li:hover {
                    color: inherit;
                    background: inherit;
                    cursor: default;
                }

                .lessons-list__li span[itemprop="name"] {
                    z-index: 1;
                    position: relative;
                    cursor: text;
                    padding: 0 15px;
                    margin: 0 -15px;
                }

                .lessons-list__progress {
                    display: none;
                }

                .standard-block__rating__i {
                    cursor: default;
                }
            </style>
        </head>
        
        <body class="${document.body.className}">
            <div class="main">
                <div class="container">
                    <div class="grid grid_closed">
                        <div class="grid__coll grid__coll_main">

                            <!-- Хлебные крошки -->
                            ${(() => {
                                let breadcrumb = document.querySelector('.standard-block[itemtype="https://schema.org/BreadcrumbList"]').cloneNode(true);
                                // Удаление этого класса делает активной ссылку на текущий курс
                                breadcrumb.querySelector('.breadcrumbs > a').classList.remove('breadcrumbs__a_active');

                                return breadcrumb.outerHTML;
                            })()}

                            <!-- Блок заголовка -->
                            <header class="standard-block">
                                <div class="header_img">
                                    <img src="${await this.imgUrl2base64(document.querySelector('#lessons-list [itemprop="thumbnail"]').href)}" width="250" height="150">
                                </div>
                                <div class="header_info">
                                    ${(() => {
                                        let header = document.querySelector('header.standard-block').cloneNode(true);

                                        // Получаем дату добавления первого и последнего урок
                                        let start_date = document.querySelector('.standard-block[data-id] .lessons-list__li:first-child [itemprop="uploadDate"]');
                                        let end_date = document.querySelector('.standard-block[data-id] .lessons-list__li:last-child [itemprop="uploadDate"]');

                                        // Оставляем только число и отрезаем время
                                        start_date = start_date.getAttribute('content').split(' ')[0].split('-').reverse().join('-');
                                        end_date = end_date.getAttribute('content').split(' ')[0].split('-').reverse().join('-');

                                        // Если даты совпадают, оставляем одну, если нет - то отобразим период
                                        let date_content = (start_date === end_date) ? end_date : `${start_date} - ${end_date}`;

                                        let date = document.createElement('div');
                                        date.className = 'standard-block__duration standard-block__date';
                                        date.textContent = date_content;

                                        // Добавим блок с датой после заголовка курса
                                        header.firstElementChild.after(date);

                                        return header.innerHTML.replace('Duration', 'Продолжительность курса');
                                    })()}
                                </div>
                            </header>

                            <!-- Список уроков -->
                            ${(() => {
                                // Берем полный блок с плеером, заголовком и списком уроков
                                let lessons_block = document.querySelector('.standard-block[data-id]').cloneNode(true);
                                // Клонируем заголовок и список уроков
                                let title = lessons_block.querySelector('h2').cloneNode(true);
                                let details = lessons_block.querySelector('details').cloneNode(true);
                                // Делаем список уроков открытым
                                details.open = true;

                                // Очищаем полный блок
                                lessons_block.innerHTML = '';
                                // И добавляем в него обратно только заголовок и список уроков
                                lessons_block.appendChild(title);
                                lessons_block.appendChild(details);

                                return lessons_block.outerHTML;
                            })()}

                            <!-- Блок с материалами курса -->
                            ${(() => {
                                let attachment_link = document.querySelector('a.downloads');
                                if(attachment_link) {
                                    // Если есть ссылки на материалы к уроку, то в этом месте будет блок с материалами
                                    return attachment_link.closest('.standard-block').outerHTML;
                                } else {
                                    // Иначе блока не будет
                                    return '';
                                }
                            })()}

                            <!-- Блок с описанием курса -->
                            ${(() => {
                                let description = document.querySelector('.standard-block p');
                                if(description) {
                                    // Если есть блок с описанием курса, то в этом месте будет этот блок
                                    return description.closest('.standard-block').outerHTML;
                                } else {
                                    // Иначе блока не будет
                                    return '';
                                }
                            })()}

                            <!-- Блок с оценкой курса -->
                            ${(() => {
                                let rating = document.querySelector('.standard-block__rating');
                                if(rating) {
                                    rating = rating.closest('.standard-block').cloneNode(true);
                                    rating.querySelector('h2').textContent = 'Оценка курса';
                                    // Если есть блок с оценкой курса, то в этом месте будет этот блок
                                    return rating.outerHTML;
                                } else {
                                    // Иначе блока не будет
                                    return '';
                                }
                            })()}

                        </div>
                    </div>
                </div>
            </div>

            <div class="toggle-aside_light"></div>

            <script>
                // Кнопка переключения темной темы
                let theme_btn = document.querySelector('.toggle-aside_light');
                theme_btn.addEventListener('click', () => {
                    document.body.classList.toggle('theme_dark');
                });
            </script>
        </body>
        </html>`;
    }

    // Метод сбора страницы информации о курсе и ее размера в байтах
    async collectInfoPage(lesson) {
        if (!lesson) return;

        lesson.data = await this.infoPageContent();
        lesson.size_total = window.utils.StrBytes(lesson.data);
    }

    // Собирает шаблон айтема списка для Информации о курсе
    infoPageItem(index = 0) {
        let info_page = {};

        info_page.index = index;
        info_page.name = 'Информация о курсе';
        info_page.ext = '.html';
        info_page.mime = 'text/html';
        info_page.size_loaded = 0;
        info_page.size_total = 0;
        info_page.progress = 0;
        info_page.is_loaded = false;
        info_page.is_loading = false;
        info_page.is_checked = true;
        info_page.data = '';
        // Контент страницы информации будет создан после вызова этого метода
        // Если бы контент собирался здесь, то в него не попадал бы блок с оценкой курса 
        info_page.collectMethod = this.collectInfoPage.bind(this);

        return info_page;
    }

    // Сбор айтемов списка с уроками курса
    collectLessonsData() {
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

        // Добавтить в список айтемов Материалы курса
        let attachment = this.collectAttachment(lessons.length);
        if (attachment) {
            lessons.push(attachment);
        }

        // Добавить в список айтемов Информацию о курсе
        let info_page = this.infoPageItem(lessons.length);
        lessons.push(info_page);

        return lessons;
    }
}