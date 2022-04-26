import { TestBed } from '@angular/core/testing';
import { EventKey } from 'src/shared/model/event-key';
import { Language } from 'src/shared/model/language';
import { SolutionKey } from 'src/shared/model/solution-key';
import { unroll } from 'src/spec-utils';

import { IndexService } from './index.service';

describe('IndexService', () => {
  let service: IndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getEventKeys', () => {
    it('should return keys for all event days present in index', () => {
      const result = service.getEventKeys();
      expect(result).toEqual([
        { event: 2015, day: 1 },
        { event: 2021, day: 1 },
      ]);
    });
  });

  describe('getSolutionLanguages', () => {
    unroll(
      'should return valid languages for given event key',
      () => service.getSolutionLanguages,
      [
        {
          args: [{ event: 2015, day: 1 }],
          expected: ['Python'],
        },
        {
          args: [{ event: 2021, day: 1 }],
          expected: ['Python', 'Java'],
        },
      ],
      { matcher: jasmine.arrayWithExactContents }
    );
  });

  describe('getSolutionFiles', () => {
    it('should return files metadata for given event and language', () => {
      const key: SolutionKey = { event: 2015, day: 1, language: 'Python' };
      const result = service.getSolutionFiles(key);
      expect(result).toEqual([
        {
          repositoryPath: 'python/aoc/2015/01.py',
          assetPath: '/assets/solutions/python/2015/01.py',
        },
      ]);
    });
  });
});
