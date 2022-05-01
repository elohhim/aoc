import { SolutionMetadataRecord } from 'src/shared/model/solution-metadata-record';

export const SOLUTIONS_METADATA: SolutionMetadataRecord[] = [
  {
    key: { event: 2015, day: 1, language: 'Python' },
    metadata: {
      files: [
        {
          repositoryPath: 'python/aoc/2015/01.py',
          assetPath: '/assets/solutions/python/2015/01.py',
        },
      ],
    },
  },
  {
    key: { event: 2021, day: 1, language: 'Java' },
    metadata: {
      files: [
        {
          repositoryPath:
            'java/src/main/java/elohhim/aoc/solver/y2021/d01/Y2021D01Solver.java',
          assetPath: '/assets/solutions/java/y2021/d01/Y2021D01Solver.java',
        },
      ],
    },
  },
  {
    key: { event: 2021, day: 1, language: 'Python' },
    metadata: {
      files: [
        {
          repositoryPath: 'python/aoc/2021/01.py',
          assetPath: '/assets/solutions/python/2021/01.py',
        },
      ],
    },
  },
];
