import { TestBed } from '@angular/core/testing';

import { LottieAnimService } from './lottie-anim.service';

describe('LottieAnimService', () => {
  let service: LottieAnimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LottieAnimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
