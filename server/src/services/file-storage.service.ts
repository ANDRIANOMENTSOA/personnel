import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {Readable} from 'stream';

import fs from 'fs';
import * as Path from 'path';

@injectable({scope: BindingScope.TRANSIENT})
export class FileStorageService {
  constructor(/* Add @inject to inject parameters */) {}
  /*
   * Add service methods here
   */
  copyFile(sourceId: string, targetId: string) {
    return new Promise((resolve, reject) => {
      fs.mkdir(
        Path.dirname(this.getFilePath(targetId)),
        {recursive: true},
        mErr => {
          if (mErr) {
            reject(mErr);
          } else {
            fs.copyFile(
              this.getFilePath(sourceId),
              this.getFilePath(targetId),
              cErr => {
                if (cErr) {
                  reject(cErr);
                } else {
                  resolve(null);
                }
              },
            );
          }
        },
      );
    });
  }
  saveFile(id: string, fileStream: Readable | Buffer) {
    if (fileStream instanceof Readable) {
      return new Promise((resolve, reject) => {
        const filePath = this.getFilePath(id);
        const dirname = Path.dirname(filePath);
        fs.mkdir(dirname, {recursive: true}, err => {
          if (err) {
            return reject(err);
          }
          const stream = fileStream.pipe(fs.createWriteStream(filePath));
          stream.on('finish', resolve);
          stream.on('error', reject);
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        const filePath = this.getFilePath(id);
        const dirname = Path.dirname(filePath);
        fs.mkdir(dirname, {recursive: true}, mErr => {
          if (mErr) {
            return reject(mErr);
          }
          fs.writeFile(filePath, fileStream, wErr => {
            if (wErr) {
              return reject(wErr);
            }
            resolve(true);
          });
        });
      });
    }
  }

  saveFileSync(id: string, buffer: Buffer) {
    const filePath = this.getFilePath(id);
    const dirname = Path.dirname(filePath);
    fs.mkdirSync(dirname, {recursive: true});
    fs.writeFileSync(filePath, buffer);
  }

  getFileStream(id: string): Readable {
    return fs.createReadStream(this.getFilePath(id));
  }

  async getFile(id: string) {
    return fs.readFileSync(this.getFilePath(id));
  }

  getFilePath(id: string) {
    return Path.resolve(
      process.cwd() +
        '/fileStore/' +
        (id.match(/.{1,2}/g) as string[]).join('/'),
    );
  }
}
