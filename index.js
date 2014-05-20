(function () {
    "use strict";

    var nodeCore = require("./node-core").createNodeCore();

    nodeCore.on("port", function (port) {
        console.log("Port: ", port);
    });
}());