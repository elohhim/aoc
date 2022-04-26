import { TestBed } from '@angular/core/testing';
import { pureIt, unroll } from 'src/spec-utils';

import { ParamsResolveService } from './params-resolve.service';

describe('KeyResolveService', () => {
  let service: ParamsResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamsResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('resolveEventKey', () => {
    unroll('should return event key', () => service.resolveEventKey, [
      {
        args: [{ event: '2021', day: '10' }],
        expected: { event: 2021, day: 10 },
      },
      {
        args: [{ event: '2015', day: '1' }],
        expected: { event: 2015, day: 1 },
      },
    ]);
  });

  describe('resolveLanguage', () => {
    unroll('should return valid language', () => service.resolveLanguage, [
      {
        args: [{ language: 'Java' }],
        expected: 'Java',
      },
      {
        args: [{ language: 'Python' }],
        expected: 'Python',
      },
    ]);
  });
});
