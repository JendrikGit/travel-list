import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimDialogComponent } from './anim-dialog.component';

describe('AnimDialogComponent', () => {
  let component: AnimDialogComponent;
  let fixture: ComponentFixture<AnimDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
