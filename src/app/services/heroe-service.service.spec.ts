import { TestBed } from '@angular/core/testing';

import { HeroeServiceService } from './heroe-service.service';

describe('HeroeServiceService', () => {
  let service: HeroeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
