var jsonToSassVars = require('./webpackScripts/jsonToSassVars');
var path = require('path');

module.exports = {
    GLOBALS_JS_CSS: {
        STEP_WIDTH: 1300,
        BIG_PADDING: 60,
        SMALL_PADDING: 20
    },
    GLOBALS: {
    },

    /* Общие глобальные переменные для JS и SCSS */
    getDefines: function (env) {
        if (!env) {
            env = "'development'";
        }
        this.prepend = path.join(__dirname, './webpackScripts/prependLoader');
        this.definePlugin = {
            GLOBALS_JS_CSS: this.GLOBALS_JS_CSS,
            GLOBALS: this.GLOBALS
        };
        this.definePlugin.NODE_ENV = env;
        this.definePlugin.process = {
            env: {
                NODE_ENV: env
            }
        };

        // Формируется строка для глобальных переменных в SCSS
        this.sassGlobals = encodeURIComponent(jsonToSassVars(this.definePlugin.GLOBALS_JS_CSS));

        for (var key in this.definePlugin.GLOBALS_JS_CSS) {
            if (this.definePlugin.GLOBALS_JS_CSS.hasOwnProperty(key)) {
                this.definePlugin.GLOBALS_JS_CSS[key] = JSON.stringify(this.definePlugin.GLOBALS_JS_CSS[key]);
            }
        }
    }
};