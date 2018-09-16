import { TestBed, inject } from '@angular/core/testing';

import { MunicipalAreaService } from './municipal-area.service';

describe('MunicipalAreaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MunicipalAreaService]
    });
  });

  it('should be created', inject([MunicipalAreaService], (service: MunicipalAreaService) => {
    expect(service).toBeTruthy();
  }));
});
