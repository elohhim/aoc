import { TestBed } from '@angular/core/testing';
import { EventKey } from 'src/shared/+model/event-key';
import { Language } from 'src/shared/+model/language';

import { LinkService } from './link.service';

describe('LinkService', () => {
  let service: LinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkService);
  });

  describe('getAocLink', () => {
    it('should return valid AoC link for given event key', () => {
      const eventKey: EventKey = { event: 2010, day: 10 };
      const result = service.getAocLink(eventKey);
      expect(result).toEqual('https://adventofcode.com/2010/day/10');
    });
  });

  describe('getRepositoryLink', () => {
    it('should return repository link for given event key and language based on adapter', () => {
      const eventKey: EventKey = { event: 2010, day: 10 };
      const language: Language = 'Python';
      const result = service.getGitHubLink(eventKey, language);
      expect(result).toEqual(
        'https://github.com/elohhim/aoc/blob/main/python/aoc/2010/10.py'
      );
    });
  });
});
