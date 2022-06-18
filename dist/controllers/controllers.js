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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const uuid_1 = require("uuid");
const userModel_1 = require("../models/userModel");
const utils_1 = require("../utils/utils");
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, userModel_1.findAllUsers)();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users));
        }
        catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Server Error' }));
        }
    });
}
exports.getUsers = getUsers;
function getUser(req, res, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, userModel_1.findUserById)(id);
            if (!(0, uuid_1.validate)(id)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid ID' }));
            }
            else if (!user) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User Not Found' }));
            }
            else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(user));
            }
        }
        catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Server Error' }));
        }
    });
}
exports.getUser = getUser;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = yield (0, utils_1.getPostData)(req);
            const { username, age, hobbies } = JSON.parse(body);
            if (!username || !age || !hobbies) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Request body does not contain required fields' }));
            }
            else {
                const user = {
                    username,
                    age,
                    hobbies
                };
                const newUser = yield (0, userModel_1.create)(user);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify(newUser));
            }
        }
        catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Server Error' }));
        }
    });
}
exports.createUser = createUser;
function updateUser(req, res, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, userModel_1.findUserById)(id);
            if (!(0, uuid_1.validate)(id)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid ID' }));
            }
            else if (!user) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User Not Found' }));
            }
            else {
                const body = yield (0, utils_1.getPostData)(req);
                const { username, age, hobbies } = JSON.parse(body);
                const newUserInf = {
                    username: username || user.username,
                    age: age || user.age,
                    hobbies: hobbies || user.hobbies
                };
                const updateUser = yield (0, userModel_1.update)(id, newUserInf);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify(updateUser));
            }
        }
        catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Server Error' }));
        }
    });
}
exports.updateUser = updateUser;
function deleteUser(req, res, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, userModel_1.findUserById)(id);
            if (!(0, uuid_1.validate)(id)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid ID' }));
            }
            else if (user) {
                yield (0, userModel_1.remove)(id);
                res.writeHead(204, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: `User ${id} removed` }));
            }
            else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User Not Found' }));
            }
        }
        catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Server Error' }));
        }
    });
}
exports.deleteUser = deleteUser;
//# sourceMappingURL=controllers.js.map