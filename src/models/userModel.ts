import { v4 as uuidv4 } from 'uuid';

import { writeDataToFile } from '../utils/utils';
import { UserType, FullUserType } from '../types';

import users from '../data/data.json';
import testUsers from '../test/data-test.json';

function findAllUsers(): Promise<FullUserType[]> {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'test') {
      resolve(users);
    } else {
      resolve(testUsers);
    }
  })
}

function findUserById(id: string): Promise<FullUserType | undefined> {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'test') {
      const user: FullUserType | undefined = users.find((user) => user.id === id)
      resolve(user)
    } else {
      const user: FullUserType | undefined = testUsers.find((user) => user.id === id)
      resolve(user)
    }
  })
}

function create(user: UserType): Promise<FullUserType> {
  return new Promise((resolve, reject) => {
    const newUser: FullUserType = {id: uuidv4(), ...user};
    if (process.env.NODE_ENV !== 'test') {
      users.push(newUser);
      writeDataToFile(users, '../data/data.json');
    } else {
      testUsers.push(newUser);
      writeDataToFile(users, '../test/data-test.json');
    }
    resolve(newUser);
  })
}

function update(id: string, user: UserType): Promise<FullUserType> {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'test') {
      const index: number = users.findIndex((user) => user.id === id)
      users[index] = {id, ...user}
      writeDataToFile(users, '../data/data.json');
      resolve(users[index])
    } else {
      const index: number = testUsers.findIndex((user) => user.id === id)
      testUsers[index] = {id, ...user}
      writeDataToFile(testUsers, '../test/data-test.json');
      resolve(testUsers[index])
    }
  })
}

function remove(id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'test') {
      const filterUsers = users.filter((user) => user.id !== id);
      writeDataToFile(filterUsers, '../data/data.json');
    } else {
      const filterUsers = testUsers.filter((user) => user.id !== id);
      writeDataToFile(filterUsers, '../test/data-test.json');
    }
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
