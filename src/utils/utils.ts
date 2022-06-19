import fs  from 'fs';
import path from 'path';
import { IncomingMessage } from 'http';

import { FullUserType } from '../types';

function writeDataToFile(content: FullUserType[], pathToData: string) {
  fs.writeFileSync(path.join(__dirname, pathToData), JSON.stringify(content), 'utf8');
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
