import { TestBed } from '@angular/core/testing';

import { DigimonService } from './digimon.service';

describe('DigimonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DigimonService = TestBed.get(DigimonService);
    expect(service).toBeTruthy();
  });
});
