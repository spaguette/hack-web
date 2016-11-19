if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}

require('normalize.css');
require('./styles/index.scss');

require('es6-promise').polyfill();
require('./js/app');
