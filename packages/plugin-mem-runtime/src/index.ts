import { IPlugin } from 'build-scripts';
import { RuntimePlugin } from './plugins/RuntimePlugin';

const plugin: IPlugin = async ({ context, registerUserConfig, onGetWebpackConfig }) => {
  registerUserConfig([
    {
      name: 'enableMem',
      validation: 'boolean',
      defaultValue: false,
    }
  ]);

  onGetWebpackConfig(config => {
    const { userConfig: { enableMem } } = context;
    config.plugin('mem-runtime-plugin').use(RuntimePlugin, [{ enabled: enableMem } as any]);
  });
};

export default plugin;