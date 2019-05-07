export default class Loader {
    constructor() {
        this.xhr = {};
        this.xhr_counter = 0;
        this.callback = () => {};
    }

    getSizeTotal(url) {
        let xhr_index = ++this.xhr_counter;
        this.xhr[xhr_index] = new XMLHttpRequest();

        return new Promise((resolve, reject) => {
            this.xhr[xhr_index].addEventListener('load', e => {
                delete this.xhr[xhr_index];
                resolve(e.total);
            });
            this.xhr[xhr_index].addEventListener('abort', e => {
                delete this.xhr[xhr_index];
                reject(e);
            });
            this.xhr[xhr_index].addEventListener('error', e => {
                delete this.xhr[xhr_index];
                reject(e);
            });
            this.xhr[xhr_index].addEventListener('timeout', e => {
                delete this.xhr[xhr_index];
                reject(e);
            });

            this.xhr[xhr_index].open('HEAD', url, true);
            this.xhr[xhr_index].send();
        });
    }
}