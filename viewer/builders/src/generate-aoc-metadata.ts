import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';

interface Options extends JsonObject {
  source: string;
  destination: string;
  outputDir: string;
}

export default createBuilder(copyFileBuilder);

async function copyFileBuilder(
  options: Options,
  context: BuilderContext
): Promise<BuilderOutput> {
  context.logger.info(`options:\n${JSON.stringify(options)}`);
  return { success: true };
}
