import http from 'http';
import 'dotenv/config';

import { getUsers, getUser, createUser, updateUser, deleteUser } from './controllers/controllers';

const server = http.createServer(async (req, res) => {
  if (req.url === '/api/users' && req.method === 'GET') {
    await getUsers(req, res);
  } else if (req.url && req.url.match(/\/api\/users\/\w+/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    await getUser(req, res, id);
  } else if (req.url === '/api/users' && req.method === 'POST') {
    await createUser(req, res);
  } else if (req.url && req.url.match(/\/api\/users\/\w+/) && req.method === 'PUT') {
    const id = req.url.split('/')[3];
    await updateUser(req, res, id);
  } else if (req.url && req.url.match(/\/api\/users\/\w+/) && req.method === 'DELETE') {
    const id = req.url.split('/')[3];
    await deleteUser(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route Not Found' }));
  }
});

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
