import { TestBed } from '@angular/core/testing';
import { EventKey } from 'src/shared/model/event-key';
import { pureAssert } from 'src/spec-utils';
import { LinkService } from './link.service';

describe('LinkService', () => {
  let service: LinkService;

  // TODO: 2022-04-22 jk - not 100% unit as it does not mock AdapterService
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

  describe('getGitHubLink', () => {
    it('should return repository link based on file metadata', () =>
      pureAssert(
        service.getGitHubLink,
        [
          {
            repositoryPath: 'some/path/in/repo',
            assetPath: 'assets/solutions/',
          },
        ],
        'https://github.com/elohhim/aoc/blob/main/some/path/in/repo'
      ));
  });
});
