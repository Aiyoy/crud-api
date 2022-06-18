"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
require("dotenv/config");
const index_js_1 = require("../index.js");
const PORT = process.env.PORT || 8000;
const cpuNum = os_1.default.cpus().length;
if (cluster_1.default.isPrimary) {
    process.stdout.write(`\nMaster ${process.pid} started.\n`);
    for (let i = 0; i < cpuNum; i += 1) {
        cluster_1.default.fork();
    }
    ;
    cluster_1.default.on("exit", () => {
        index_js_1.server.listen(PORT, () => process.stdout.write(`\nWorker ${process.pid} was started.\n`));
    });
}
else {
    index_js_1.server.listen(PORT, () => process.stdout.write(`\nWorker ${process.pid} was started.\n`));
}
;
//# sourceMappingURL=multi.js.map