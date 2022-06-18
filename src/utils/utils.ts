import fs  from 'fs';
import path from 'path';
import { IncomingMessage } from 'http';

import { FullUserType } from '../types';

let fileName = '../data/data.json';

if (process.env.NODE_ENV === 'test') {
  fileName = '../test/data-test.json';
}

function writeDataToFile(content: FullUserType[]) {
  fs.writeFileSync(path.join(__dirname, fileName), JSON.stringify(content), 'utf8');
}

function getPostData(req: IncomingMessage) {
  return new Promise((resolve, reject) => {
    try {
      let body: string = '';

      req.on('data', (chunk: Buffer) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        resolve(body)
      })
    } catch (error) {
      reject(error);
    }
  })
}

export {
  writeDataToFile,
  getPostData
}
