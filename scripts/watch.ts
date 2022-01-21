/* eslint @typescript-eslint/explicit-function-return-type:0, no-shadow: 0 */
import * as glob from 'glob';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as chokidar from 'chokidar';
import { run } from './fn/shell';

(async () => {
  await run('npm run clean');

  const fileParten = '*/src/**/!(*.ts|*.tsx|*.rs)';
  console.log(`[COPY]: ${fileParten}`);

  const cwd = path.join(__dirname, '../packages');
  const files = glob.sync(fileParten, { cwd, nodir: true });
  const fileSet = new Set();
  /* eslint no-restricted-syntax:0 */
  for (const file of files) {
    /* eslint no-await-in-loop:0 */
    await copyOneFile(file, cwd);
    fileSet.add(path.join(cwd, file));
  }

  const watcher = chokidar.watch('.', {
    cwd,
    interval: 100,
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 1000,
      pollInterval: 100,
    },
  });

  const onFileAddOrChange = (filePath: string) => {
    const absPath = path.join(cwd, filePath);
    if (fileSet.has(absPath)) {
      console.log('non-ts change detected:', absPath);
      copyOneFile(path.relative(cwd, absPath), cwd);
    }
  };

  watcher.on('add', onFileAddOrChange);
  watcher.on('change', onFileAddOrChange);

  await run('npx tsc --build ./tsconfig.json -w');
})().catch((e) => {
  console.trace(e);
  process.exit(128);
});

async function copyOneFile(file, cwd) {
  const from = path.join(cwd, file);
  const to = path.join(cwd, file.replace(/(?<=(\\|\/))src(?=(\\|\/))/g, 'lib'));
  await fs.copy(from, to);
}
