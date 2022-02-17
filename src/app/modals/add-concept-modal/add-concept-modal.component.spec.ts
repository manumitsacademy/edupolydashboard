import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConceptModalComponent } from './add-concept-modal.component';

describe('AddConceptModalComponent', () => {
  let component: AddConceptModalComponent;
  let fixture: ComponentFixture<AddConceptModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConceptModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConceptModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
