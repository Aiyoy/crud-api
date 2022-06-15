"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostData = exports.writeDataToFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function writeDataToFile(content) {
    fs_1.default.writeFileSync(path_1.default.join(__dirname, '../data/data.json'), JSON.stringify(content), 'utf8');
}
exports.writeDataToFile = writeDataToFile;
function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                resolve(body);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.getPostData = getPostData;
//# sourceMappingURL=utils.js.map