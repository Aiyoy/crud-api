import { IncomingMessage, ServerResponse } from 'http';

import { findAllUsers, findUserById } from '../models/userModel';

async function getUsers(req: any, res: { writeHead: (arg0: number, arg1: { 'Content-Type': string; }) => void; end: (arg0: string) => void; }) {
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
      const user = await findUserById(id)

      if(!user) {
          res.writeHead(404, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: 'User Not Found' }))
      } else {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(user))
      }
  } catch (error) {
      console.log(error)
  }
}

export {
  getUsers,
  getUser
};
