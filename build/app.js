!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},function(e,t){function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}e.exports=function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}},function(e,t,n){e.exports=n(5)},function(e,t){function n(e,t,n,r,o,a,i){try{var s=e[a](i),c=s.value}catch(e){return void n(e)}s.done?t(c):Promise.resolve(c).then(r,o)}e.exports=function(e){return function(){var t=this,r=arguments;return new Promise(function(o,a){var i=e.apply(t,r);function s(e){n(i,o,a,s,c,"next",e)}function c(e){n(i,o,a,s,c,"throw",e)}s(void 0)})}}},function(e,t,n){var r,o,a;o=[],void 0===(a="function"==typeof(r=function(){return function e(t,n,r){var o,a,i=window,s="application/octet-stream",c=r||s,l=t,u=!n&&!r&&l,d=document.createElement("a"),h=function(e){return String(e)},f=i.Blob||i.MozBlob||i.WebKitBlob||h,p=n||"download";if(f=f.call?f.bind(i):Blob,"true"===String(this)&&(c=(l=[l,c])[0],l=l[1]),u&&u.length<2048&&(p=u.split("/").pop().split("?")[0],d.href=u,-1!==d.href.indexOf(u))){var v=new XMLHttpRequest;return v.open("GET",u,!0),v.responseType="blob",v.onload=function(t){e(t.target.response,p,s)},setTimeout(function(){v.send()},0),v}if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(l)){if(!(l.length>2096103.424&&f!==h))return navigator.msSaveBlob?navigator.msSaveBlob(y(l),p):b(l);l=y(l),c=l.type||s}else if(/([\x80-\xff])/.test(l)){for(var m=0,g=new Uint8Array(l.length),_=g.length;m<_;++m)g[m]=l.charCodeAt(m);l=new f([g],{type:c})}function y(e){for(var t=e.split(/[:;,]/),n=t[1],r="base64"==t[2]?atob:decodeURIComponent,o=r(t.pop()),a=o.length,i=0,s=new Uint8Array(a);i<a;++i)s[i]=o.charCodeAt(i);return new f([s],{type:n})}function b(e,t){if("download"in d)return d.href=e,d.setAttribute("download",p),d.className="download-js-link",d.innerHTML="downloading...",d.style.display="none",document.body.appendChild(d),setTimeout(function(){d.click(),document.body.removeChild(d),!0===t&&setTimeout(function(){i.URL.revokeObjectURL(d.href)},250)},66),!0;if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent))return/^data:/.test(e)&&(e="data:"+e.replace(/^data:([\w\/\-\+]+)/,s)),window.open(e)||confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")&&(location.href=e),!0;var n=document.createElement("iframe");document.body.appendChild(n),!t&&/^data:/.test(e)&&(e="data:"+e.replace(/^data:([\w\/\-\+]+)/,s)),n.src=e,setTimeout(function(){document.body.removeChild(n)},333)}if(o=l instanceof f?l:new f([l],{type:c}),navigator.msSaveBlob)return navigator.msSaveBlob(o,p);if(i.URL)b(i.URL.createObjectURL(o),!0);else{if("string"==typeof o||o.constructor===h)try{return b("data:"+c+";base64,"+i.btoa(o))}catch(e){return b("data:"+c+","+encodeURIComponent(o))}(a=new FileReader).onload=function(e){b(this.result)},a.readAsDataURL(o)}return!0}})?r.apply(t,o):r)||(e.exports=a)},function(e,t,n){var r=function(e){"use strict";var t,n=Object.prototype,r=n.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",s=o.toStringTag||"@@toStringTag";function c(e,t,n,r){var o=t&&t.prototype instanceof v?t:v,a=Object.create(o.prototype),i=new z(r||[]);return a._invoke=function(e,t,n){var r=u;return function(o,a){if(r===h)throw new Error("Generator is already running");if(r===f){if("throw"===o)throw a;return O()}for(n.method=o,n.arg=a;;){var i=n.delegate;if(i){var s=S(i,n);if(s){if(s===p)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===u)throw r=f,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=h;var c=l(e,t,n);if("normal"===c.type){if(r=n.done?f:d,c.arg===p)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r=f,n.method="throw",n.arg=c.arg)}}}(e,n,i),a}function l(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(e){return{type:"throw",arg:e}}}e.wrap=c;var u="suspendedStart",d="suspendedYield",h="executing",f="completed",p={};function v(){}function m(){}function g(){}var _={};_[a]=function(){return this};var y=Object.getPrototypeOf,b=y&&y(y(C([])));b&&b!==n&&r.call(b,a)&&(_=b);var x=g.prototype=v.prototype=Object.create(_);function k(e){["next","throw","return"].forEach(function(t){e[t]=function(e){return this._invoke(t,e)}})}function w(e){var t;this._invoke=function(n,o){function a(){return new Promise(function(t,a){!function t(n,o,a,i){var s=l(e[n],e,o);if("throw"!==s.type){var c=s.arg,u=c.value;return u&&"object"==typeof u&&r.call(u,"__await")?Promise.resolve(u.__await).then(function(e){t("next",e,a,i)},function(e){t("throw",e,a,i)}):Promise.resolve(u).then(function(e){c.value=e,a(c)},function(e){return t("throw",e,a,i)})}i(s.arg)}(n,o,t,a)})}return t=t?t.then(a,a):a()}}function S(e,n){var r=e.iterator[n.method];if(r===t){if(n.delegate=null,"throw"===n.method){if(e.iterator.return&&(n.method="return",n.arg=t,S(e,n),"throw"===n.method))return p;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var o=l(r,e.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,p;var a=o.arg;return a?a.done?(n[e.resultName]=a.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,p):a:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,p)}function L(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function E(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function z(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(L,this),this.reset(!0)}function C(e){if(e){var n=e[a];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function n(){for(;++o<e.length;)if(r.call(e,o))return n.value=e[o],n.done=!1,n;return n.value=t,n.done=!0,n};return i.next=i}}return{next:O}}function O(){return{value:t,done:!0}}return m.prototype=x.constructor=g,g.constructor=m,g[s]=m.displayName="GeneratorFunction",e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===m||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,g):(e.__proto__=g,s in e||(e[s]="GeneratorFunction")),e.prototype=Object.create(x),e},e.awrap=function(e){return{__await:e}},k(w.prototype),w.prototype[i]=function(){return this},e.AsyncIterator=w,e.async=function(t,n,r,o){var a=new w(c(t,n,r,o));return e.isGeneratorFunction(n)?a:a.next().then(function(e){return e.done?e.value:a.next()})},k(x),x[s]="Generator",x[a]=function(){return this},x.toString=function(){return"[object Generator]"},e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){for(;t.length;){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},e.values=C,z.prototype={constructor:z,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(E),!e)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function o(r,o){return s.type="throw",s.arg=e,n.next=r,o&&(n.method="next",n.arg=t),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],s=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),l=r.call(i,"finallyLoc");if(c&&l){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=e,i.arg=t,a?(this.method="next",this.next=a.finallyLoc,p):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),p},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),E(n),p}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var o=r.arg;E(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,n,r){return this.delegate={iterator:C(e),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=t),p}},e}(e.exports);try{regeneratorRuntime=r}catch(e){Function("r","regeneratorRuntime = r")(r)}},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(1),i=n.n(a),s=function(){function e(){o()(this,e)}return i()(e,null,[{key:"StrBytes",value:function(e){var t,n,r,o=0,a=e.length;for(r=0;r<a;r++)(t=e.charCodeAt(r))>=55296&&t<57344&&t<56320&&r+1<a&&(n=e.charCodeAt(r+1))>=56320&&n<57344?(o+=4,r++):o+=t<128?1:t<2048?2:3;return o}},{key:"Percent",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2;return(100*e/t).toFixed(n)}},{key:"FileSize",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(e=+e,isNaN(e))return!1;var n=0,r=["Б","КБ","МБ","ГБ","ТБ"];function o(e){return e>1024&&n<4?(n++,o(e/1024)):e}return t?{size:o(e),level:n,unit:r[n]}:"".concat(o(e).toFixed(1)," ").concat(r[n])}},{key:"UrlParse",value:function(e){var t={},n=e.match(/^(http\:\/\/|https\:\/\/|ftp\:\/\/)(.*?\..*?\/)(.*\/)*(.*)\.(.*)$/i);return t.schema=n[1],t.host=n[2],t.path=n[3].split("/"),t.path=t.path.filter(function(e){return e.length>0}),t.file={fileName:n[4]+"."+n[5],name:n[4],ext:n[5]},t}},{key:"TimeNormalizer",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if("number"!=typeof e||e<0)return!1;var r=[],o=e/1e3,a={day:"д",hour:"ч",min:"мин",sec:"с",msec:"мс"},i=60,s=3600,c=86400,l=!1;function u(e,t){t<=0&&!l||(l=!0,r.push({unit:a[e],value:t}))}var d=Math.floor(o/c);u("day",d),o-=d*c;var h=Math.floor(o/s);u("hour",h),o-=h*s,u("min",Math.floor(o/i));var f=Math.floor(o%60);(!t&&!l||f>0)&&(l=!0,u("sec",f));var p=Math.round(1e3*(o%60-f));return!t&&l||(l=!0,u("msec",p)),n?r:r.reduce(function(e,t,n){return e+"".concat(n>0?" ":"").concat(t.value).concat(t.unit)},"")}}]),e}(),c=function(){function e(){o()(this,e),this.xhr={},this.xhr_counter=0}return i()(e,[{key:"request",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.method,o=void 0===r?"GET":r,a=n.responseType,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},s=this.xhr_counter++;return this.xhr[s]=new XMLHttpRequest,a&&(this.xhr[s].responseType=a),this.xhr[s].addEventListener("progress",function(e){"function"==typeof i&&i(e)}),new Promise(function(n,r){t.xhr[s].addEventListener("load",function(e){delete t.xhr[s],n(e)}),t.xhr[s].addEventListener("abort",function(e){delete t.xhr[s],r(e)}),t.xhr[s].addEventListener("error",function(e){delete t.xhr[s],r(e)}),t.xhr[s].addEventListener("timeout",function(e){delete t.xhr[s],r(e)}),t.xhr[s].open(o,e,!0),t.xhr[s].send()})}},{key:"abort",value:function(){for(var e in this.xhr)this.xhr[e].abort(),delete this.xhr[e];return!0}}]),e}(),l=n(4),u=n.n(l),d=n(2),h=n.n(d),f=n(3),p=n.n(f);var v=function(){function e(t){var n,r;o()(this,e),this.main=t.main,this.container=null,this.text={container_title:"Скачать курс",btn_title:"Скачать выделенные:",btn_title_loading:"Остановить скачивание:",btn_title_disabled:"Выделите уроки для скачивания",checkbox_master:"Выделить все",checkbox_master_checked:"Снять выделение",clear_history_btn:"Очистить историю скачиваний"},this.rendered_state={lessons:[],checkboxMaster:void 0,btnDisabled:void 0},this.template=(n=this,r={container:function(){var e=document.createElement("div");return e.className="standard-block course_loader_container",e.innerHTML="\n        <h2>".concat(this.text.container_title,"</h2>\n        <details ").concat(this.main.state.is_open?"open":"",'>\n            <summary>\n                <span class="lessons-list__more">Развернуть / Свернуть</span>\n            </summary>\n            <div class="details_container">\n                <ul class="lessons-list"></ul>\n\n                <div class="btn_container"></div>\n            </div>\n        </details>\n\n        <style>\n            .course_loader_container .toggle-aside.course_loader_btn {\n                position: static;\n                border: none;\n                padding-left: 1.5em;\n                padding-right: 1.5em;\n            }\n\n            .course_loader_container .toggle-aside.course_loader_btn[disabled] {\n                cursor: default;\n                filter: grayscale(1);\n            }\n\n            .course_loader_container .toggle-aside.course_loader_btn[disabled]:hover {\n                color: #c3c3c3;\n            }\n\n            .course_loader_container .toggle-aside.course_loader_btn:after {\n                content: \'\';\n            }\n\n            .course_loader_container .lessons-list__li {\n                line-height: 20px;\n                min-height: 30px;\n                padding: 0 5px;\n                display: flex;\n                align-items: center;\n            }\n\n            .course_loader_container [itemprop="name"] {\n                width: 100%;\n                display: flex;\n                align-items: center;\n            }\n\n            .course_loader_container .lesson_check {\n                margin: 0 5px 0 0;\n            }\n\n            .course_loader_container .white_space {\n                white-space: pre;\n            }\n\n            .course_loader_container .lesson_info {\n                margin-left: 5px;\n                white-space: nowrap;\n            }\n\n            .course_loader_container .btn_container {\n                display: flex;\n                justify-content: space-between;\n                align-items: center;\n            }\n\n            .course_loader_container .checkbox_master_container {\n                user-select: none;\n                cursor: pointer;\n            }\n            \n        </style>\n    '),e},lesson:function(e){var t=this.main.state.lessons[e],n=this.rendered_state.lessons[e];if(!this.isEqualObj(t,n)){this.rendered_state.lessons[e]=Object.assign({},t);var r=document.createElement("li");return r.className="lessons-list__li",r.dataset.key=t.index,r.innerHTML='\n            <progress class="lessons-list__progress" max="100" value="'.concat(t.progress,'"></progress>\n            \n            <span itemprop="name"><input type="checkbox" class="lesson_check" ').concat(t.is_checked?"checked":""," ").concat(t.is_loading||t.is_loaded?"disabled":"",">").concat(t.name,'</span>\n\n            <em class="lesson_info">\n                ').concat(t.size_total?'<span class="size_total white_space">'.concat(window.utils.FileSize(t.size_total),"</span>"):"","\n                ").concat(t.progress?'<span class="progress_value white_space">('.concat(t.progress,"%)</span>"):"","\n            </em>\n        "),r}},btn:function(){var e=document.createElement("button");e.className="toggle-aside course_loader_btn";var t=this.main.state.lessons.reduce(function(e,t){return t.is_checked&&(e.amount++,t.is_loaded&&e.amount_loaded++,t.size_total&&(e.size_total+=t.size_total),t.size_loaded&&(e.size_loaded+=t.size_loaded)),e},{amount:0,amount_loaded:0,size_total:0,size_loaded:0}),n="",r=t.amount-t.amount_loaded<=0;return r?n=this.text.btn_title_disabled:(n=this.main.state.is_loading?"".concat(this.text.btn_title_loading," "):"".concat(this.text.btn_title," "),n+="".concat(t.amount_loaded,"/").concat(t.amount),n+=t.size_total?" (".concat(window.utils.FileSize(t.size_loaded),"/").concat(window.utils.FileSize(t.size_total),")"):""),this.rendered_state.btnDisabled!==r&&(this.rendered_state.btnDisabled=r,e.dataset.render=!0),e.disabled=r,e.textContent=n,e},checkboxMaster:function(e){var t=document.createElement("label");return t.className="checkbox_master_container",t.innerHTML='\n                <input type="checkbox" class="checkbox_master" '.concat(e?"checked":"",'>\n                <span class="checkbox_master_text">').concat(e?this.text.checkbox_master_checked:this.text.checkbox_master,"</span>\n            "),t}},function(){for(var e in r)r[e]=r[e].bind(n);return r}()),this.init()}return i()(e,[{key:"isEqualObj",value:function(e,t){if(!e||!t)return!1;for(var n in e)if(e[n]!==t[n])return!1;return!0}},{key:"outputRender",value:function(e,t){var n,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=document.querySelector(e);t.dataset.render&&(r=!1),delete t.dataset.render,t.id?n=t.id:(n=".".concat(t.className.split(" ").join(".")),n+=void 0!==t.dataset.key?'[data-key="'.concat(t.dataset.key,'"]'):"");var a=o.querySelector(n);a&&!r?a.replaceWith(t):a||r?!a&&r?o.appendChild(t):a&&r&&(a.textContent=t.textContent):o.appendChild(t)}},{key:"createContainer",value:function(){var e=document.querySelector(".standard-block[data-id]");return!!e&&(this.container=this.template.container(),e.after(this.container),!0)}},{key:"handlerLessonClick",value:function(e){var t=Object.assign({},this.main.state);t.lessons[e].is_loading||t.lessons[e].is_loaded||(t.lessons[e].is_checked=!t.lessons[e].is_checked,this.main.setState(t))}},{key:"renderLesson",value:function(e){var t=this.template.lesson(e);t&&(t.addEventListener("click",this.handlerLessonClick.bind(this,e)),this.outputRender(".course_loader_container .lessons-list",t))}},{key:"handlerBtn",value:function(){this.main.state.is_loading?this.main.loadStop():this.main.loadStart()}},{key:"renderBtn",value:function(){var e=this.template.btn();e.addEventListener("click",this.handlerBtn.bind(this)),this.outputRender(".btn_container",e,!0)}},{key:"handlerCheckboxMaster",value:function(e){var t=!!e.target.checked,n=Object.assign({},this.main.state);n.lessons=n.lessons.map(function(e){return e.is_loading||e.is_loaded||(e.is_checked=t),e}),this.main.setState(n)}},{key:"renderCheckboxMaster",value:function(){var e=this,t=this.main.state.lessons.every(function(e){return e.is_checked});if(t!==this.rendered_state.checkboxMaster){this.rendered_state.checkboxMaster=t;var n=this.template.checkboxMaster(t);n.addEventListener("change",function(t){return e.handlerCheckboxMaster(t)}),this.outputRender(".btn_container",n)}}},{key:"handlerClearHistoryBtn",value:function(e){return e.preventDefault(),this.main.storeLessonsClear(),!1}},{key:"renderClearHistoryBtn",value:function(){var e=this,t=document.createElement("a");t.className="clear_history_btn",t.href="#",t.textContent=this.text.clear_history_btn,t.addEventListener("click",function(t){return e.handlerClearHistoryBtn(t)}),this.outputRender(".btn_container",t,!0)}},{key:"render",value:function(){for(var e=0;e<this.main.state.lessons.length;e++)this.renderLesson(e);this.renderBtn(),this.renderCheckboxMaster(),this.renderClearHistoryBtn()}},{key:"init",value:function(){var e=this;console.log("%c%s",window.log_color?window.log_color.blue:"","*CourseLoader* Interface init"),this.createContainer()&&requestAnimationFrame(function(){return e.main.init()})}}]),e}(),m=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};o()(this,e),this.name=t,this.default_val=n,this.init()}return i()(e,[{key:"set",value:function(e,t){if(void 0===t)return!1;var n=JSON.parse(localStorage.getItem(this.name));return n[e]=t,localStorage.setItem(this.name,JSON.stringify(n)),n}},{key:"get",value:function(e){return JSON.parse(localStorage.getItem(this.name))[e]}},{key:"getAll",value:function(){return JSON.parse(localStorage.getItem(this.name))}},{key:"remove",value:function(e){var t=JSON.parse(localStorage.getItem(this.name));return delete t[e],localStorage.setItem(this.name,JSON.stringify(t)),t}},{key:"clear",value:function(){localStorage.removeItem(this.name)}},{key:"prepareStorage",value:function(){return null==localStorage.getItem(this.name)&&(localStorage.setItem(this.name,JSON.stringify(this.default_val)),!0)}},{key:"init",value:function(){this.prepareStorage()}}]),e}(),g=function(){function e(){o()(this,e)}return i()(e,[{key:"fileNameNormalize",value:function(e){var t=e.split(""),n={"\\":"_","/":"_",":":"-","*":"_","?":"7",'"':"'","<":"{",">":"}","|":" l "};return(t=t.map(function(e){return n[e]||e})).join("")}},{key:"fileNameExt",value:function(e){return e.match(/.*(\.\w*)/i)[1]}},{key:"collectAttachment",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=document.querySelector("a.downloads"),n={};return!!t&&(n.index=e,n.url=t.href,n.name=this.fileNameNormalize(t.textContent),n.ext=this.fileNameExt(n.url),n.mime="",n.size_loaded=0,n.size_total=0,n.progress=0,n.is_loaded=!1,n.is_loading=!1,n.is_checked=!0,n)}},{key:"collectInfoPage",value:function(){var e,t,n,r,o,a,i,s=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,c={};return c.index=s,c.name="Информация о курсе",c.ext=".html",c.mime="text/html",c.size_loaded=0,c.size_total=0,c.progress=0,c.is_loaded=!1,c.is_loading=!1,c.is_checked=!0,c.data='\n        <!DOCTYPE html>\n        <html lang="ru">\n        \n        <head>\n            <meta charset="UTF-8">\n            <meta name="viewport" content="width=device-width, initial-scale=1.0">\n            <meta http-equiv="X-UA-Compatible" content="ie=edge">\n            <title>'.concat(document.title,"</title>\n\n            <style>\n                ").concat(document.querySelector("head style").textContent,'\n\n                body {\n                    background-image: url(https://coursehunters.net/images/background.png);\n                }\n\n                header.standard-block {\n                    display: flex;\n                }\n\n                header.standard-block .header_info {\n                    padding-left: 15px;\n                }\n\n                .lessons-list__li:hover {\n                    color: inherit;\n                    background: inherit;\n                    cursor: default;\n                }\n\n                .lessons-list__li span[itemprop="name"] {\n                    z-index: 1;\n                    position: relative;\n                    cursor: text;\n                    padding: 0 15px;\n                    margin: 0 -15px;\n                }\n\n                .lessons-list__progress {\n                    display: none;\n                }\n\n                .standard-block__rating__i {\n                    cursor: default;\n                }\n            </style>\n        </head>\n        \n        <body class="').concat(document.body.className,'">\n            <div class="main">\n                <div class="container">\n                    <div class="grid grid_closed">\n                        <div class="grid__coll grid__coll_main">\n\n                            \x3c!-- Хлебные крошки --\x3e\n                            ').concat((i=document.querySelector('.standard-block[itemtype="https://schema.org/BreadcrumbList"]').cloneNode(!0),i.querySelector(".breadcrumbs > a").classList.remove("breadcrumbs__a_active"),i.outerHTML),'\n\n                            \x3c!-- Блок заголовка --\x3e\n                            <header class="standard-block">\n                                <img src="').concat(document.querySelector('#lessons-list [itemprop="thumbnail"]').href,'" width="250" height="150">\n                                <div class="header_info">\n                                    ').concat(document.querySelector("header.standard-block").innerHTML,"\n                                </div>\n                            </header>\n\n                            \x3c!-- Список уроков --\x3e\n                            ").concat((r=document.querySelector(".standard-block[data-id]").cloneNode(!0),o=r.querySelector("h2").cloneNode(!0),a=r.querySelector("details").cloneNode(!0),a.open=!0,r.innerHTML="",r.appendChild(o),r.appendChild(a),r.outerHTML),"\n\n                            \x3c!-- Блок с материалами курса --\x3e\n                            ").concat((n=document.querySelector("a.downloads"),n?n.parentElement.outerHTML:""),"\n\n                            \x3c!-- Блок с описанием курса --\x3e\n                            ").concat((t=document.querySelector(".standard-block p"),t?t.closest(".standard-block").outerHTML:""),"\n\n                            \x3c!-- Блок с оценкой курса --\x3e\n                            ").concat((e=document.querySelector(".standard-block__rating"))?((e=e.closest(".standard-block").cloneNode(!0)).querySelector("h2").textContent="Оценка курса",e.outerHTML):"","\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"toggle-aside_light\"></div>\n\n            <script>\n                let theme_btn = document.querySelector('.toggle-aside_light');\n                theme_btn.addEventListener('click', () => {\n                    document.body.classList.toggle('theme_dark');\n                });\n            <\/script>\n        </body>\n        </html>"),c.size_total=window.utils.StrBytes(c.data),c}},{key:"collectLessonsData",value:function(){var e=this,t=document.querySelectorAll("#lessons-list li"),n=[];t.forEach(function(t){var r={},o=t.querySelector('[itemprop="name"]').textContent;r.index=n.length,r.url=t.querySelector('[itemprop="url"]').href,r.name=e.fileNameNormalize(o),r.ext=e.fileNameExt(r.url),r.mime="",r.size_loaded=0,r.size_total=0,r.progress=0,r.is_loaded=!1,r.is_loading=!1,r.is_checked=!0,n.push(r)});var r=this.collectAttachment(n.length);r&&n.push(r);var o=this.collectInfoPage(n.length);return n.push(o),n}}]),e}(),_=function(){function e(){o()(this,e),this.id=null,this.state={lessons:[],is_loading:!1,is_open:!0},this.interface=new v({main:this}),this.collector=new g,this.storage=null}return i()(e,[{key:"setState",value:function(e){Object.assign(this.state,e),this.interface.render()}},{key:"collectCourseData",value:function(){var e=document.querySelector(".standard-block[data-id]").dataset.id;document.querySelector(".breadcrumbs__a_active").textContent;this.id="id_".concat(e)||!1}},{key:"collectSizeTotal",value:function(){var e=p()(h.a.mark(function e(){var t,n,r,o=arguments;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=o.length>0&&void 0!==o[0]?o[0]:0,(n=this.state.lessons[t]).size_total){e.next=8;break}return e.next=5,loader.request(n.url,{method:"HEAD"});case 5:r=e.sent,n.size_total=r.total,n.mime=r.target.getResponseHeader("Content-Type");case 8:++t<this.state.lessons.length?this.collectSizeTotal(t):t>=this.state.lessons.length&&this.setState(this.state);case 10:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"storeInit",value:function(){this.storage=new m(this.id,{lessons:{},is_open:!0})}},{key:"storeLessonSave",value:function(e){var t=this.storage.get("lessons");t[e]||(t[e]={}),t[e].size_total=this.state.lessons[e].size_total,this.storage.set("lessons",t)}},{key:"storeLessonsRestore",value:function(){if(localStorage.getItem(this.id)){this.storeInit();var e=Object.assign({},this.state),t=this.storage.get("lessons");for(var n in t)e.lessons[n].is_loaded=!0,e.lessons[n].progress=100,e.lessons[n].size_total=t[n].size_total,e.lessons[n].size_loaded=t[n].size_total;this.setState(e)}}},{key:"storeLessonsClear",value:function(){var e=Object.assign({},this.state);this.storage.set("lessons",{}),e.lessons.forEach(function(e){e.is_loaded=!1,e.is_loading||(e.progress=0,e.size_loaded=0)}),this.setState(e)}},{key:"loadProgress",value:function(e,t){var n=t.loaded,r=t.total,o=window.utils.Percent(n,t.total,0),a=Object.assign({},this.state);a.lessons[e].size_total=r,a.lessons[e].size_loaded=n,a.lessons[e].progress=o,this.setState(a)}},{key:"loadLoaded",value:function(e,t){var n=Object.assign({},this.state),r=n.lessons[e];r.is_loaded=!0,r.is_loading=!1,r.size_loaded=r.size_total,r.progress="100",window.Downloader(new Blob([t.target.response]),r.name+r.ext,r.mime),this.storeLessonSave(e),this.setState(n)}},{key:"loadEnd",value:function(){var e=Object.assign({},this.state);e.is_loading=!1,this.setState(e)}},{key:"loadLesson",value:function(){var e=p()(h.a.mark(function e(t){var n,r,o;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0===t&&this.loadEnd(),(n=this.state.lessons[t]).is_loading=!0,n.url||!n.data){e.next=7;break}this.loadLoaded(t,{target:{response:n.data}}),e.next=23;break;case 7:if(!n.url){e.next=23;break}return e.prev=8,e.next=11,window.loader.request(n.url,{responseType:"arraybuffer"},this.loadProgress.bind(this,t));case 11:r=e.sent,this.loadLoaded(t,r),e.next=23;break;case 15:if(e.prev=15,e.t0=e.catch(8),console.log("Ошибка загрузки: ",e.t0),"abort"!==e.t0.type){e.next=23;break}return(o=Object.assign({},this.state)).lessons.map(function(e){return e.is_loading&&(e.is_loading=!1,e.progress=0,e.size_loaded=0),e}),this.setState(o),e.abrupt("return",!1);case 23:this.loadLoop();case 24:case"end":return e.stop()}},e,this,[[8,15]])}));return function(t){return e.apply(this,arguments)}}()},{key:"loadLoop",value:function(){var e=p()(h.a.mark(function e(){var t,n,r;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=0;case 1:if(!(n<this.state.lessons.length)){e.next=10;break}if(!(r=this.state.lessons[n])||!r.is_checked||r.is_loaded||r.is_loading){e.next=7;break}return t=n,this.loadLesson(t),e.abrupt("break",10);case 7:n++,e.next=1;break;case 10:void 0===t&&this.loadEnd();case 11:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"loadStart",value:function(){var e=Object.assign({},this.state);e.is_loading=!0,this.setState(e),this.storeInit(),this.loadLoop()}},{key:"loadStop",value:function(){window.loader.abort(),this.loadEnd()}},{key:"init",value:function(){console.log("%c%s",window.log_color?window.log_color.blue:"","*CourseLoader* init"),this.collectCourseData();var e=this.collector.collectLessonsData();this.setState({lessons:e}),this.storeLessonsRestore(),this.collectSizeTotal()}}]),e}();window.utils=s,window.loader=new c,window.Downloader=u.a,window.courseLoader=new _}]);