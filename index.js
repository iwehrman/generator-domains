/*jslint node: true*/

(function () {
    "use strict";

    var Server = require("./node-core/Server");

    exports.init = function () {
        Server.start();
    };
}());