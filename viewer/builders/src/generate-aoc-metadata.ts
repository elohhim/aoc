import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import {
  ADAPTERS,
  LANGUAGES,
} from '../../src/shared/adapters/adapter-registry';
import { Day, EventKey } from '../../src/shared/model/event-key';
import { SolutionKey } from '../../src/shared/model/solution-key';
import * as fs from 'fs';
import { SolutionMetadataRecord } from '../../src/shared/model/solution-metadata-record';
import { FileMetadata } from '../../src/shared/model/file-metadata';

interface Options extends JsonObject {
  repositoryRoot: string;
  outputDir: string;
  events: {
    first: number;
    last: number;
  };
}

export default createBuilder(generateAocMetadata);

async function generateAocMetadata(
  options: Options,
  context: BuilderContext
): Promise<BuilderOutput> {
  context.reportStatus('Generating metadata');
  const keys = [...eventKeys(options.events)];
  const records = keys.flatMap(processEventKey);

  const tsContent = `import { SolutionMetadataRecord } from 'src/shared/model/solution-metadata-record';
  
export const SOLUTIONS_METADATA: SolutionMetadataRecord[] = ${JSON.stringify(
    records,
    undefined,
    2
  )};
`;

  fs.writeFileSync(`${options.outputDir}/metadata.ts`, tsContent);

  return { success: true };

  function processEventKey(
    key: EventKey,
    index: number,
    keys: EventKey[]
  ): SolutionMetadataRecord[] {
    context.reportProgress(index, keys.length);
    return LANGUAGES.map((language) => ({ ...key, language }))
      .map(processSolutionKey)
      .filter(
        (record): record is SolutionMetadataRecord => record !== undefined
      );
  }

  function processSolutionKey(
    key: SolutionKey
  ): SolutionMetadataRecord | undefined {
    const adapter = ADAPTERS[key.language];
    const repositoryPath = adapter.getSolutionRepositoryPath(key);
    const path = `${options.repositoryRoot}/${repositoryPath}`;
    if (fs.existsSync(path)) {
      return adapter.multiFile && fs.lstatSync(path).isDirectory()
        ? buildMultiFileRecord(key, path, repositoryPath)
        : buildSingleFileRecord(key, repositoryPath);
    }
    return undefined;
  }
}

function buildMultiFileRecord(
  key: SolutionKey,
  dirPath: string,
  dirRepositoryPath: string
): SolutionMetadataRecord {
  const files: FileMetadata[] = fs
    .readdirSync(dirPath)
    .filter((child) => fs.lstatSync(`${dirPath}/${child}`).isFile())
    .map((child) => `${dirRepositoryPath}/${child}`)
    .map((filePath) => ({
      assetPath: `assets/solutions/${filePath}`,
      repositoryPath: filePath,
    }));
  return buildRecord(key, files);
}

function buildSingleFileRecord(
  key: SolutionKey,
  repositoryPath: string
): SolutionMetadataRecord {
  return {
    key,
    metadata: {
      files: [
        {
          assetPath: `assets/solutions/${repositoryPath}`,
          repositoryPath,
        },
      ],
    },
  };
}

function buildRecord(
  key: SolutionKey,
  files: FileMetadata[]
): SolutionMetadataRecord {
  return {
    key,
    metadata: {
      files,
    },
  };
}

export function* eventKeys({
  first,
  last,
}: {
  first: number;
  last: number;
}): Generator<EventKey, void, void> {
  for (let event = first; event <= last; event++) {
    for (let day = 1; day <= 25; day++) {
      yield { event, day: day as Day };
    }
  }
  return;
}
