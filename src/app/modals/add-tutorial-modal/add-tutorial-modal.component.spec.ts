import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTutorialModalComponent } from './add-tutorial-modal.component';

describe('AddTutorialModalComponent', () => {
  let component: AddTutorialModalComponent;
  let fixture: ComponentFixture<AddTutorialModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTutorialModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTutorialModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
