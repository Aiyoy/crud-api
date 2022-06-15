import { findAllUsers } from '../models/userModel';

async function getUsers(req: any, res: { writeHead: (arg0: number, arg1: { 'Content-Type': string; }) => void; end: (arg0: string) => void; }) {
  try {
    const users = await findAllUsers();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

export {
  getUsers
};
