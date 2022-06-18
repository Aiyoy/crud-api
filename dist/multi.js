"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
require("dotenv/config");
const server_1 = require("./server");
const PORT = process.env.PORT || 8000;
const numCPUs = os_1.default.cpus().length;
if (cluster_1.default.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}
else {
    server_1.server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    console.log(`Worker ${process.pid} started`);
}
//# sourceMappingURL=multi.js.map