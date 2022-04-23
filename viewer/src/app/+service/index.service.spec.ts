import { TestBed } from '@angular/core/testing';
import { SolutionKey } from 'src/shared/model/solution-key';

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
        { event: 2016, day: 1 },
        { event: 2016, day: 2 },
      ]);
    });
  });

  describe('getAssetPaths', () => {
    it('should return asset paths for given event and language', () => {
      const key: SolutionKey = { event: 2015, day: 1, language: 'Python' };
      const result = service.getAssetPaths(key);
      expect(result).toEqual(['/assets/solutions/python/2015/01.py']);
    });
  });
});
