import { TestBed } from '@angular/core/testing';

import { EventKeyGuard } from './event-key.guard';

describe('EventKeyGuard', () => {
  let guard: EventKeyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EventKeyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
