export default class Utils {
    static blob2base64(blob) {
        return new Promise(resolve => {
            let reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.readAsDataURL(blob);
        });
    }

    static StrBytes(str) {
        var bytes = 0,
            len = str.length,
            codePoint, next, i;

        for (i = 0; i < len; i++) {
            codePoint = str.charCodeAt(i);

            if (codePoint >= 0xD800 && codePoint < 0xE000) {
                if (codePoint < 0xDC00 && i + 1 < len) {
                    next = str.charCodeAt(i + 1);

                    if (next >= 0xDC00 && next < 0xE000) {
                        bytes += 4;
                        i++;
                        continue;
                    }
                }
            }

            bytes += (codePoint < 0x80 ? 1 : (codePoint < 0x800 ? 2 : 3));
        }

        return bytes;
    }

    static Percent(current, total, precision = 2) {
        let percent = (current * 100) / total;
        return percent.toFixed(precision);
    }

    static FileSize(size = 0, extend = false) {
        size = +size;
        if (isNaN(size)) return false;
        let level_counter = 0;
        let levels = [
            'Б', 'КБ', 'МБ', 'ГБ', 'ТБ'
        ];

        function check(size) {
            if (size > 1024 && level_counter < 4) {
                level_counter++;
                return check(size / 1024);
            } else {
                return size;
            }
        }

        if (extend) {
            return {
                size: check(size),
                level: level_counter,
                unit: levels[level_counter],
            };
        } else {
            return `${check(size).toFixed(1)} ${levels[level_counter]}`;
        }
    }

    static UrlParse(url) {
        var regex = /^(http\:\/\/|https\:\/\/|ftp\:\/\/)(.*?\..*?\/)(.*\/)*(.*)\.(.*)$/i;
        var result_obj = {};
        var result = url.match(regex);

        result_obj.schema = result[1];
        result_obj.host = result[2];
        result_obj.path = result[3].split('/');
        result_obj.path = result_obj.path.filter(function(item) {
            return item.length > 0;
        });
        result_obj.file = {
            'fileName': result[4] + '.' + result[5],
            'name': result[4],
            'ext': result[5]
        };

        return result_obj;
    }

    static TimeNormalizer(time = 0, ms = false, template = false) {
        if (typeof time !== 'number' || time < 0) return false;
        let result_arr = [];
        let duration = time / 1000;
        let date_obj = {};

        let units = {
            day: 'д',
            hour: 'ч',
            min: 'мин',
            sec: 'с',
            msec: 'мс',
        }

        let divide = {
            min: 60,
            hour: 60 * 60,
            day: 60 * 60 * 24
        }

        let begin = false;

        function filter(unit, val) {
            if (val <= 0 && !begin) return
            begin = true;
            result_arr.push({
                'unit': units[unit],
                'value': val
            });
        }

        let day = Math.floor(duration / divide.day);
        filter('day', day);
        duration -= day * divide.day;

        let hour = Math.floor(duration / divide.hour);
        filter('hour', hour);
        duration -= hour * divide.hour;

        let min = Math.floor(duration / divide.min);
        filter('min', min);

        let sec = Math.floor(duration % 60);
        if ((!ms && !begin) || sec > 0) {
            begin = true;
            filter('sec', sec);
        }

        let msec = Math.round(((duration % 60) - sec) * 1000);
        date_obj.msec = msec;
        if (ms || !begin) {
            begin = true;
            filter('msec', msec);
        }

        if (template) {
            return result_arr;
        } else {
            return result_arr.reduce((sum, item, index) => {
                return sum + `${(index > 0) ? ' ': ''}${item.value}${item.unit}`;
            }, '');
        }
    }
}