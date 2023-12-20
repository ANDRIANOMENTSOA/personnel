import { TestBed } from '@angular/core/testing';

import { ReglageService } from './reglage.service';

describe('ReglageService', () => {
  let service: ReglageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReglageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
