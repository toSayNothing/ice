import * as fs from 'fs';
import { patchFs } from 'fs-monkey';
import { Volume as MemoryVolume } from 'memfs';
import { ufs } from 'unionfs';

// We have to create a copy of original `fs` module to prevent infinite recursion in `unionfs`
const stockFs = Object.create({});
patchFs(fs, stockFs);
const cache = new MemoryVolume();
const unionfs = ufs.use(stockFs).use(cache as any);

export {
  stockFs,
  cache,
  unionfs
};