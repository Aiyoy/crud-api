import {v4 as uuidv4} from 'uuid';

import { writeDataToFile } from '../utils/utils';
import { UserType, FullUserType } from '../types';

import users from '../data/data.json';

function findAllUsers() {
    return new Promise((resolve, reject) => {
        resolve(users);
    })
}

function findUserById(id: string) {
  return new Promise((resolve, reject) => {
      const user: FullUserType | undefined = users.find((user) => user.id === id)
      resolve(user)
  })
}

function create(user: UserType) {
  return new Promise((resolve, reject) => {
    const newUser: FullUserType = {id: uuidv4(), ...user}
    users.push(newUser);
    writeDataToFile(users);
    resolve(newUser);
  })
}

export {
  findAllUsers,
  findUserById,
  create
}
