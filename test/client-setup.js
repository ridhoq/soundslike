var jsdom = require('jsdom').jsdom;
var LocalStorage = require('node-localstorage').LocalStorage;

global.localStorage = new LocalStorage("./test/client/tmp");
global.document = jsdom('');
global.window = document.defaultView;
global.window.localStorage = global.localStorage;
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};