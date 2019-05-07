import Utils from './modules/utils';
window.utils = Utils;

import Main from './modules/main';
import Loader from './modules/loader';
window.loader = new Loader();


window.courseLoader = new Main();