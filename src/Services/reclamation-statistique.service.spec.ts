import { TestBed } from '@angular/core/testing';

import { ReclamationStatistiqueService } from './reclamation-statistique.service';

describe('ReclamationStatistiqueService', () => {
  let service: ReclamationStatistiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReclamationStatistiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
