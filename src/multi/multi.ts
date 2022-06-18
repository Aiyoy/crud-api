import http from 'http';
import cluster from 'cluster';
import os from 'os';
import 'dotenv/config';

import { server } from '../index';

const PORT = process.env.PORT || 8000;
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  server.listen(PORT);

  console.log(`Worker ${process.pid} started`);
}
