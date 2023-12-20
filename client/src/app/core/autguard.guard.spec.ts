import { TestBed } from '@angular/core/testing';

import { AutguardGuard } from './autguard.guard';

describe('AutguardGuard', () => {
  let guard: AutguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
