import { TestBed } from '@angular/core/testing';

import { ChampionService } from './champion.service';

describe('ChampionServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChampionService = TestBed.get(ChampionService);
    expect(service).toBeTruthy();
  });
});
