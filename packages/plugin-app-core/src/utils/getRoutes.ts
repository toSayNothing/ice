import * as path from 'path';
import * as fse from 'fs-extra';
import { cache } from '@builder/app-helpers';

export interface IParams {
  rootDir: string;
  tempPath: string;
  configPath: string;
  projectType: string;
  isMpa: boolean;
  srcDir: string;
  enableMem: boolean;
}

interface IResult {
  routesPath: string;
  isConfigRoutes: boolean;
}

function getRoutes({ rootDir, tempPath, configPath, projectType, isMpa, srcDir, enableMem }: IParams): IResult {
  // if is mpa use empty router file
  if (isMpa) {
    const routesTempPath = path.join(tempPath, 'routes.ts');
    if (enableMem) {
      cache.mkdirpSync(tempPath);
      cache.writeFileSync(routesTempPath, 'export default [];');
    } else {
      fse.writeFileSync(routesTempPath, 'export default [];', 'utf-8');
    }
    configPath = routesTempPath;
    return {
      routesPath: configPath,
      isConfigRoutes: true
    };
  }

  const routesPath = configPath
    ? path.join(rootDir, configPath)
    : path.join(rootDir, srcDir, `/routes.${projectType}`);

  // 配置式路由
  const configPathExists = fse.existsSync(routesPath);
  if (configPathExists) {
    return {
      routesPath,
      isConfigRoutes: true
    };
  }

  // 约定式路由
  return {
    routesPath: path.join(tempPath, `routes.${projectType}`),
    isConfigRoutes: false
  };
}

export default getRoutes;
