import { TestBed, inject } from '@angular/core/testing';

import { PublicInstitutionService } from './public-institution.service';

describe('PublicInstitutionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PublicInstitutionService]
    });
  });

  it('should be created', inject([PublicInstitutionService], (service: PublicInstitutionService) => {
    expect(service).toBeTruthy();
  }));
});
