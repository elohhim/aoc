import { TestBed } from '@angular/core/testing';

import { SolutionKeyGuard } from './solution-key.guard';

describe('SolutionKeyGuard', () => {
  let guard: SolutionKeyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SolutionKeyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
