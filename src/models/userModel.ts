import { v4 as uuidv4 } from 'uuid';

import { writeDataToFile } from '../utils/utils';
import { UserType, FullUserType } from '../types';

import users from '../data/data.json';

function findAllUsers(): Promise<FullUserType[]> {
  return new Promise((resolve, reject) => {
    resolve(users);
  })
}

function findUserById(id: string): Promise<FullUserType | undefined> {
  return new Promise((resolve, reject) => {
      const user: FullUserType | undefined = users.find((user) => user.id === id)
      resolve(user)
  })
}

function create(user: UserType): Promise<FullUserType> {
  return new Promise((resolve, reject) => {
    const newUser: FullUserType = {id: uuidv4(), ...user}
    users.push(newUser);
    writeDataToFile(users);
    resolve(newUser);
  })
}

function update(id: string, user: UserType): Promise<FullUserType> {
  return new Promise((resolve, reject) => {
    const index: number = users.findIndex((user) => user.id === id)
    users[index] = {id, ...user}
    writeDataToFile(users);
    resolve(users[index])
  })
}

function remove(id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const filterUsers = users.filter((user) => user.id !== id);
    writeDataToFile(filterUsers);
    resolve();
  });
}

export {
  findAllUsers,
  findUserById,
  create,
  update,
  remove
}
