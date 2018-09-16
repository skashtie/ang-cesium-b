import { TestBed, inject } from '@angular/core/testing';

import { FutureConstructionService } from './future-construction.service';

describe('FutureConstructionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FutureConstructionService]
    });
  });

  it('should be created', inject([FutureConstructionService], (service: FutureConstructionService) => {
    expect(service).toBeTruthy();
  }));
});
