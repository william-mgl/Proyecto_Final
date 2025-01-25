import { TestBed } from '@angular/core/testing';

import { MiServicioBusService } from './mi-servicio-bus.service';

describe('MiServicioBusService', () => {
  let service: MiServicioBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiServicioBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
