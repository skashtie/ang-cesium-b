import { TestBed, inject } from '@angular/core/testing';

import { LandUseService } from './land-use.service';

describe('LandUseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LandUseService]
    });
  });

  it('should be created', inject([LandUseService], (service: LandUseService) => {
    expect(service).toBeTruthy();
  }));
});
