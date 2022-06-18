"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.findUserById = exports.findAllUsers = void 0;
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const data_json_1 = __importDefault(require("../data/data.json"));
const data_test_json_1 = __importDefault(require("../test/data-test.json"));
let users;
if (process.env.NODE_ENV === 'test') {
    users = data_test_json_1.default;
}
else {
    users = data_json_1.default;
}
function findAllUsers() {
    return new Promise((resolve, reject) => {
        resolve(users);
    });
}
exports.findAllUsers = findAllUsers;
function findUserById(id) {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === id);
        resolve(user);
    });
}
exports.findUserById = findUserById;
function create(user) {
    return new Promise((resolve, reject) => {
        const newUser = Object.assign({ id: (0, uuid_1.v4)() }, user);
        users.push(newUser);
        if (process.env.NODE_ENV !== 'test') {
            (0, utils_1.writeDataToFile)(users);
        }
        resolve(newUser);
    });
}
exports.create = create;
function update(id, user) {
    return new Promise((resolve, reject) => {
        const index = users.findIndex((user) => user.id === id);
        users[index] = Object.assign({ id }, user);
        if (process.env.NODE_ENV !== 'test') {
            (0, utils_1.writeDataToFile)(users);
        }
        resolve(users[index]);
    });
}
exports.update = update;
function remove(id) {
    return new Promise((resolve, reject) => {
        const filterUsers = users.filter((user) => user.id !== id);
        if (process.env.NODE_ENV !== 'test') {
            (0, utils_1.writeDataToFile)(filterUsers);
        }
        resolve();
    });
}
exports.remove = remove;
//# sourceMappingURL=userModel.js.map