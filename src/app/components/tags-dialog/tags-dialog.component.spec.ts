import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsDialogComponent } from './tags-dialog.component';

describe('TagsDialogComponent', () => {
  let component: TagsDialogComponent;
  let fixture: ComponentFixture<TagsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
