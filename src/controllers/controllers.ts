import { IncomingMessage, ServerResponse } from 'http';

import { findAllUsers, findUserById, create } from '../models/userModel';
import { getPostData } from '../utils/utils';
import { UserType } from '../types';

async function getUsers(req: IncomingMessage, res: ServerResponse) {
  try {
    const users = await findAllUsers();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

async function getUser(req: IncomingMessage, res: ServerResponse, id: string) {
  try {
    const user = await findUserById(id);

    if(!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User Not Found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
  }
}

async function createUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const body: string = await getPostData(req) as string;
    const { username, age, hobbies } = JSON.parse(body);

    const user: UserType = {
      username,
      age,
      hobbies
    };

    const newUser = await create(user);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

export {
  getUsers,
  getUser,
  createUser
};
