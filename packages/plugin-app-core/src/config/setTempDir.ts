import * as path from 'path';
import * as fse from 'fs-extra';
import type { IPluginAPI } from 'build-scripts';
import { cache, emptyDirSync } from '@builder/app-helpers';
import { TEMP_PATH, ICE_TEMP } from '../constant';

export default (api: IPluginAPI, options) => {
  const { context, setValue } = api;
  const { rootDir, userConfig } = context;
  const { enableMem } = userConfig;

  const { framework } = options;
  const isRax = framework === 'rax';

  const tempDir = isRax ? 'rax' : 'ice';
  const tempPath = path.join(rootDir, `.${process.env.__FRAMEWORK_NAME__ || tempDir}`);
  setValue(TEMP_PATH, tempPath);
  setValue(ICE_TEMP, tempPath);

  if (enableMem) {
    fse.removeSync(tempPath);
    cache.mkdirpSync(tempPath);
    emptyDirSync(tempPath);
  } else {
    fse.ensureDirSync(tempPath);
    fse.emptyDirSync(tempPath);
  }
};
