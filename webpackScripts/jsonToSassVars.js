"use strict";

function jsonToSassVars (obj, indent) {
    var sass = "";
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            sass += "$" + key + ":" + obj[key] + ";\n";
        }
    }

    var storedStrings = [];
    sass = sass.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, function (str) {
        var id = "___JTS" + storedStrings.length;
        storedStrings.push({id: id, value: str});
        return id;
    });

    sass = sass.replace(/[{\[]/g, "(").replace(/[}\]]/g, ")");

    storedStrings.forEach(function (str) {
        sass = sass.replace(str.id, str.value);
    });

    return sass;
}

module.exports = jsonToSassVars;
