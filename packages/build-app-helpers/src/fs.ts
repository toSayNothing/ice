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
};

const copy2Cache = (root: string, tar?: string) => {
  const readAll = (src: string) => {
    const files = fs.readdirSync(src);
    files.forEach((item) => {
      const realPath = path.join(src, item);
      const unrealPath = path.join(tar, path.relative(root, realPath));
      const stats = fs.statSync(realPath);
      if (stats.isDirectory()) {
        cache.mkdirpSync(unrealPath);
        readAll(realPath);
      } else {
        cache.writeFileSync(unrealPath, fse.readFileSync(realPath));
      }
    });
  };

  readAll(root);
};

export {
  stockFs,
  cache,
  unionfs,
  emptyDirSync,
  copy2Cache
};