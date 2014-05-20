(function () {
    "use strict";

    var EventEmitter = require("events").EventEmitter;
    var util = require("util");
    var fork = require("child_process").fork;
    var path = require("path");

    function NodeCore() {
        EventEmitter.call(this);

        var launcherPath = path.resolve(__dirname, "./node-core/Launcher.js");

        var child = fork(launcherPath, { silent: true });

        var commandCount = 0;

        child.stdout.setEncoding("utf8");
        child.stdout.on("data", function (data) {
            var args = data.trim().split("|");

            if (args.length > 1) {
                if (args[1] === "ping") {
                    child.stdin.write("\n\n" + (commandCount++) + "|pong|" + args[0] + "\n\n");
                } else if (args[1] === "port" && args.length > 2) {
                    var port = parseInt(args[2], 10);
                    this.emit("port", port);
                } else {
                    console.log("else", data);
                }
            }
        }.bind(this));

        child.stderr.setEncoding("utf8");
        child.stderr.on("data", function (data) {
            console.error(data);
        }.bind(this));

        child.on("error", function (data) {
            this.emit("error", data);
        }.bind(this));

        child.on("exit", function (data) {
            this.emit("exit", data);
        }.bind(this));

        child.on("close", function (data) {
            this.emit("close", data);
        }.bind(this));
    }

    util.inherits(NodeCore, EventEmitter);

    function createNodeCore() {
        return new NodeCore();
    }

    exports.NodeCore = NodeCore;
    exports.createNodeCore = createNodeCore;
}());