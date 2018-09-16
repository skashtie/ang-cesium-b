import { TestBed, inject } from '@angular/core/testing';

import { ThreeDTilesService } from './three-d-tiles.service';

describe('ThreeDTilesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThreeDTilesService]
    });
  });

  it('should be created', inject([ThreeDTilesService], (service: ThreeDTilesService) => {
    expect(service).toBeTruthy();
  }));
});
