import { TestBed, inject } from '@angular/core/testing';

import { StreetsService } from './streets.service';

describe('StreetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StreetsService]
    });
  });

  it('should be created', inject([StreetsService], (service: StreetsService) => {
    expect(service).toBeTruthy();
  }));
});
