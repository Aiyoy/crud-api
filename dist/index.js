"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const http_1 = __importDefault(require("http"));
require("dotenv/config");
const controllers_1 = require("./controllers/controllers");
const server = http_1.default.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.url === '/api/users' && req.method === 'GET') {
        yield (0, controllers_1.getUsers)(req, res);
    }
    else if (req.url && req.url.match(/\/api\/users\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        yield (0, controllers_1.getUser)(req, res, id);
    }
    else if (req.url === '/api/users' && req.method === 'POST') {
        yield (0, controllers_1.createUser)(req, res);
    }
    else if (req.url && req.url.match(/\/api\/users\/\w+/) && req.method === 'PUT') {
        const id = req.url.split('/')[3];
        yield (0, controllers_1.updateUser)(req, res, id);
    }
    else if (req.url && req.url.match(/\/api\/users\/\w+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];
        yield (0, controllers_1.deleteUser)(req, res, id);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route Not Found' }));
    }
}));
exports.server = server;
const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//# sourceMappingURL=index.js.map