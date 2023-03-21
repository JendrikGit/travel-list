import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LottieAnimComponent } from './lottie-anim.component';

describe('LottieAnimComponent', () => {
  let component: LottieAnimComponent;
  let fixture: ComponentFixture<LottieAnimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LottieAnimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LottieAnimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
