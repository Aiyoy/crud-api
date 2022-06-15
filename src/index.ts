import http from 'http';
import 'dotenv/config';

import { getUsers } from './controllers/controllers';

const server = http.createServer((req, res) => {
  if(req.url === '/api/users' && req.method === 'GET') {
    getUsers(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route Not Found' }));
  }
});

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
