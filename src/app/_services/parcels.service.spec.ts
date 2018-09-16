import { TestBed, inject } from '@angular/core/testing';

import { ParcelsService } from './parcels.service';

describe('ParcelsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParcelsService]
    });
  });

  it('should be created', inject([ParcelsService], (service: ParcelsService) => {
    expect(service).toBeTruthy();
  }));
});
