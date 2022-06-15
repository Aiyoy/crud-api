import { IncomingMessage, ServerResponse } from 'http';

import { findAllUsers, findUserById, create, update } from '../models/userModel';
import { getPostData } from '../utils/utils';
import { UserType, FullUserType } from '../types';

async function getUsers(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const users = await findAllUsers();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

async function getUser(req: IncomingMessage, res: ServerResponse, id: string): Promise<void> {
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

async function createUser(req: IncomingMessage, res: ServerResponse): Promise<ServerResponse | undefined> {
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

async function updateUser(req: IncomingMessage, res: ServerResponse, id: string): Promise<ServerResponse | undefined> {
  try {
      const user: FullUserType = await findUserById(id) as FullUserType;

      if(!user) {
          res.writeHead(404, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: 'User Not Found' }))
      } else {
          const body: string = await getPostData(req) as string;

          const { username, age, hobbies } = JSON.parse(body)

          const newUserInf: UserType = {
              username: username || user.username,
              age: age || user.age,
              hobbies: hobbies || user.hobbies
          }

          const updateUser = await update(id, newUserInf)

          res.writeHead(200, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify(updateUser)) 
      }


  } catch (error) {
      console.log(error)
  }
}

export {
  getUsers,
  getUser,
  createUser,
  updateUser
};
