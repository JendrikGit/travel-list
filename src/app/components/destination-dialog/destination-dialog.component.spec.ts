import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationDialogComponent } from './destination-dialog.component';

describe('DestinationDialogComponent', () => {
  let component: DestinationDialogComponent;
  let fixture: ComponentFixture<DestinationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
