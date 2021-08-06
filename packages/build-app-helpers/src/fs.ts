import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as path from 'path';
import { patchFs } from 'fs-monkey';
import { Volume as MemoryVolume } from 'memfs';
import { ufs } from 'unionfs';

// We have to create a copy of original `fs` module to prevent infinite recursion in `unionfs`
const stockFs = Object.create({});
patchFs(fs, stockFs);
const cache = new MemoryVolume();
const unionfs = ufs.use(stockFs).use(cache as any);

const emptyDirSync = (dir: string) => {
  let items: any[];
  try {
    items = cache.readdirSync(dir);
  } catch {
    return cache.mkdirpSync(dir);
  }

  items.forEach(item => {
    item = path.join(dir, item);
    cache.rmdirSync(item);
  });
  cache.toJSON();
};

const copy2Cache = (root: string, tar?: string) => {
  const readAll = (src: string, list = []) => {
    const files = fs.readdirSync(src);
    files.forEach((item) => {
      const tempPath = path.join(src, item);
      const stats = fs.statSync(tempPath);
      if (stats.isDirectory()) {
        readAll(tempPath, list);
      } else {
        list.push(path.relative(root, tempPath));
      }
    });
  };

  const data = {};
  const list = [];
  readAll(root, list);
  list.forEach((item) => {
    data[path.join(tar, item)] = fse.readFileSync(path.join(root, item));
  });
  cache.mkdirpSync(tar);
  cache.fromJSON(data);
};

export {
  stockFs,
  cache,
  unionfs,
  emptyDirSync,
  copy2Cache
};