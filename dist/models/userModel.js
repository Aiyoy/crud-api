"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.findUserById = exports.findAllUsers = void 0;
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const data_json_1 = __importDefault(require("../data/data.json"));
function findAllUsers() {
    return new Promise((resolve, reject) => {
        resolve(data_json_1.default);
    });
}
exports.findAllUsers = findAllUsers;
function findUserById(id) {
    return new Promise((resolve, reject) => {
        const user = data_json_1.default.find((user) => user.id === id);
        resolve(user);
    });
}
exports.findUserById = findUserById;
function create(user) {
    return new Promise((resolve, reject) => {
        const newUser = Object.assign({ id: (0, uuid_1.v4)() }, user);
        data_json_1.default.push(newUser);
        (0, utils_1.writeDataToFile)(data_json_1.default);
        resolve(newUser);
    });
}
exports.create = create;
function update(id, user) {
    return new Promise((resolve, reject) => {
        const index = data_json_1.default.findIndex((user) => user.id === id);
        data_json_1.default[index] = Object.assign({ id }, user);
        (0, utils_1.writeDataToFile)(data_json_1.default);
        resolve(data_json_1.default[index]);
    });
}
exports.update = update;
function remove(id) {
    return new Promise((resolve, reject) => {
        const filterUsers = data_json_1.default.filter((user) => user.id !== id);
        (0, utils_1.writeDataToFile)(filterUsers);
        resolve();
    });
}
exports.remove = remove;
//# sourceMappingURL=userModel.js.map