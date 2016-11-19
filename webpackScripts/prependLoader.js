"use strict";

var utils = require("loader-utils");

module.exports = function (content, map) {
    var opt = utils.parseQuery(this.query);
    this.callback(null, opt.appendData ? opt.appendData + content : content, map);
};
