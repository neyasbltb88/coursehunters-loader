export default function Template(that) {
    let fn = {
        container() {
            let container = document.createElement('div');
            container.className = 'standard-block';
            container.innerHTML = /* html */ `
                <h2>${this.container_title}</h2>
                <details open>
                    <summary>
                        <span class="lessons-list__more">Развернуть / Свернуть</span>
                    </summary>
                    <div>
                        <ul id="lessons-list" class="lessons-list">
                            <li class="lessons-list__li" data-index="0" itemscope="" itemtype="https://schema.org/VideoObject">
                                <progress class="lessons-list__progress" max="100" value="50"></progress>
                                <span itemprop="name">Урок 1. Введение</span>
                                <em class="lessons-list__duration" itemprop="duration">00:08:56</em>
                            </li>
                            <li class="lessons-list__li" data-index="1" itemscope="" itemtype="https://schema.org/VideoObject">
                                <progress class="lessons-list__progress" max="100" value="0"></progress>
                                <span itemprop="name">Урок 2. Ассерты</span>
                                <em class="lessons-list__duration" itemprop="duration">00:10:08</em>
                            </li>
                            <li class="lessons-list__li" data-index="2" itemscope="" itemtype="https://schema.org/VideoObject">
                                <progress class="lessons-list__progress" max="100" value="0"></progress>
                                <span itemprop="name">Урок 3. Структура тестов</span>
                                <em class="lessons-list__duration" itemprop="duration">00:09:38</em>
                            </li>
                            <li class="lessons-list__li" data-index="3" itemscope="" itemtype="https://schema.org/VideoObject">
                                <progress class="lessons-list__progress" max="100" value="0"></progress>
                                <span itemprop="name">Урок 4. Dataset</span>
                                <em class="lessons-list__duration" itemprop="duration">00:04:55</em>
                            </li>
                            <li class="lessons-list__li" data-index="4" itemscope="" itemtype="https://schema.org/VideoObject">
                                <progress class="lessons-list__progress" max="100" value="0"></progress>
                                <span itemprop="name">Урок 5. Тестирование исключений</span>
                                <em class="lessons-list__duration" itemprop="duration">00:02:52</em>
                            </li>
                            <li class="lessons-list__li" data-index="5" itemscope="" itemtype="https://schema.org/VideoObject">
                                <progress class="lessons-list__progress" max="100" value="0"></progress>
                                <span itemprop="name">Урок 6. Fixtures</span>
                                <em class="lessons-list__duration" itemprop="duration">00:02:28</em>
                            </li>
                            <li class="lessons-list__li" data-index="6" itemscope="" itemtype="https://schema.org/VideoObject">
                                <progress class="lessons-list__progress" max="100" value="0"></progress>
                                <span itemprop="name">Урок 7. Stub</span>
                                <em class="lessons-list__duration" itemprop="duration">00:08:09</em>
                            </li>
                            <li class="lessons-list__li" data-index="7" itemscope="" itemtype="https://schema.org/VideoObject">
                                <progress class="lessons-list__progress" max="100" value="0"></progress>
                                <span itemprop="name">Урок 8. Mock</span>
                                <em class="lessons-list__duration" itemprop="duration">00:07:35</em>
                            </li>
                            <li class="lessons-list__li" data-index="8" itemscope="" itemtype="https://schema.org/VideoObject">
                                <progress class="lessons-list__progress" max="100" value="0"></progress>
                                <span itemprop="name">Урок 9. Файловая система</span>
                                <em class="lessons-list__duration" itemprop="duration">00:12:46</em>
                            </li>
                        </ul>

                        <button>Скачать выделенное</button>
                    </div>
                </details>
            `;

            return container;
        }
    };



    // Возврат объекта с привязанными функциями
    let bindReturn = () => {
        for (const fun in fn) fn[fun] = fn[fun].bind(that)
        return fn;
    }

    return bindReturn();
}