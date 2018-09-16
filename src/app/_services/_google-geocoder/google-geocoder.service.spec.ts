import { TestBed, inject } from '@angular/core/testing';

import { GoogleGeocoderService } from './google-geocoder.service';

describe('GoogleGeocoderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleGeocoderService]
    });
  });

  it('should be created', inject([GoogleGeocoderService], (service: GoogleGeocoderService) => {
    expect(service).toBeTruthy();
  }));
});
