import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';

import { findAllUsers, findUserById, create, update, remove } from '../models/userModel';
import { getPostData } from '../utils/utils';
import { UserType, FullUserType } from '../types';

async function getUsers(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const users = await findAllUsers();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server Error' }));
  }
}

async function getUser(req: IncomingMessage, res: ServerResponse, id: string): Promise<void> {
  try {
    const user = await findUserById(id);

    if (!validate(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid ID' }));
    } else if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User Not Found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server Error' }));
  }
}

async function createUser(req: IncomingMessage, res: ServerResponse): Promise<ServerResponse | undefined> {
  try {
    const body: string = await getPostData(req) as string;
    const { username, age, hobbies } = JSON.parse(body);

    if (!username || !age || !hobbies) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Request body does not contain required fields' }));
    } else {
      const user: UserType = {
        username,
        age,
        hobbies
      };
  
      const newUser = await create(user);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(newUser));
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server Error' }));
  }
}

async function updateUser(req: IncomingMessage, res: ServerResponse, id: string): Promise<ServerResponse | undefined> {
  try {
    const user: FullUserType = await findUserById(id) as FullUserType;

    if (!validate(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid ID' }));
    } else if(!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User Not Found' }));
    } else {
      const body: string = await getPostData(req) as string;

      const { username, age, hobbies } = JSON.parse(body);

      const newUserInf: UserType = {
          username: username || user.username,
          age: age || user.age,
          hobbies: hobbies || user.hobbies
      };

      const updateUser = await update(id, newUserInf);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(updateUser));
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server Error' }));
  }
}

async function deleteUser(req: IncomingMessage, res: ServerResponse, id: string): Promise<void> {
  try {
    const user = await findUserById(id);

    if (!validate(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid ID' }));
    } else if(!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User Not Found' }));
    } else {
      await remove(id);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `User ${id} removed` }));
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server Error' }));
  }
}

export {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
