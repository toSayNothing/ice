import { unionfs } from '@builder/app-helpers';
import type { WebpackPluginInstance, Compiler } from 'webpack';

export interface Options {
  enabled: boolean
}

export class RuntimePlugin implements WebpackPluginInstance {
  private readonly options: Partial<Options> = {};

  constructor(options: Options) {
    this.options = { ...this.options, ...options };
  }

  public apply(compiler: Compiler): void {
    const { enabled } = this.options;
    if (!enabled) return;

    compiler.inputFileSystem = unionfs;
  }
}