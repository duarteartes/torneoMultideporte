import { TestBed } from '@angular/core/testing';

import { PartidosService } from './partidos';

describe('Partidos', () => {
  let service: PartidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
