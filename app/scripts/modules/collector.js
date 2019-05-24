export default class Collector {
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

    collectInfoPage(index = 0) {
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
        info_page.data = /* html */ `
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
                    background-image: url(https://coursehunters.net/images/background.png);
                }

                header.standard-block {
                    display: flex;
                }

                header.standard-block .header_info {
                    padding-left: 15px;
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
                                breadcrumb.querySelector('.breadcrumbs > a').classList.remove('breadcrumbs__a_active');

                                return breadcrumb.outerHTML;
                            })()}

                            <!-- Блок заголовка -->
                            <header class="standard-block">
                                <img src="${document.querySelector('#lessons-list [itemprop="thumbnail"]').href}" width="250" height="150">
                                <div class="header_info">
                                    ${document.querySelector('header.standard-block').innerHTML}
                                </div>
                            </header>

                            <!-- Список уроков -->
                            ${(() => {
                                let lessons_block = document.querySelector('.standard-block[data-id]').cloneNode(true);
                                let title = lessons_block.querySelector('h2').cloneNode(true);
                                let details = lessons_block.querySelector('details').cloneNode(true);
                                details.open = true;

                                lessons_block.innerHTML = '';
                                lessons_block.appendChild(title);
                                lessons_block.appendChild(details);

                                return lessons_block.outerHTML;
                            })()}

                            <!-- Блок с материалами курса -->
                            ${(() => {
                                let attachment_link = document.querySelector('a.downloads');
                                if(attachment_link) {
                                    return attachment_link.parentElement.outerHTML;
                                } else {
                                    return '';
                                }
                            })()}

                            <!-- Блок с описанием курса -->
                            ${(() => {
                                let description = document.querySelector('.standard-block p');
                                if(description) {
                                    return description.closest('.standard-block').outerHTML;
                                } else {
                                    return '';
                                }
                            })()}

                            <!-- Блок с оценкой курса -->
                            ${(() => {
                                let rating = document.querySelector('.standard-block__rating');
                                if(rating) {
                                    rating = rating.closest('.standard-block').cloneNode(true);
                                    rating.querySelector('h2').textContent = 'Оценка курса';
                                    return rating.outerHTML;
                                } else {
                                    return '';
                                }
                            })()}

                        </div>
                    </div>
                </div>
            </div>

            <div class="toggle-aside_light"></div>

            <script>
                let theme_btn = document.querySelector('.toggle-aside_light');
                theme_btn.addEventListener('click', () => {
                    document.body.classList.toggle('theme_dark');
                });
            </script>
        </body>
        </html>`;

        info_page.size_total = window.utils.StrBytes(info_page.data);

        return info_page;
    }

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

        let attachment = this.collectAttachment(lessons.length);
        if (attachment) {
            lessons.push(attachment);
        }

        let info_page = this.collectInfoPage(lessons.length);
        lessons.push(info_page);

        return lessons;
    }
}