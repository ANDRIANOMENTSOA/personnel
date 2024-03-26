import { TestBed } from '@angular/core/testing';

import { PaieService } from './paie.service';

describe('PaieService', () => {
  let service: PaieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
