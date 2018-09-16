import { TestBed, inject } from '@angular/core/testing';

import { MapParametersService } from './map-parameters.service';

describe('MapParametersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapParametersService]
    });
  });

  it('should be created', inject([MapParametersService], (service: MapParametersService) => {
    expect(service).toBeTruthy();
  }));
});
