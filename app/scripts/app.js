import Utils from './modules/utils';
window.utils = Utils;

import Loader from './modules/loader';
window.loader = new Loader();

import Downloader from 'downloadjs';
window.Downloader = Downloader;

import Main from './modules/main';
window.courseLoader = new Main();