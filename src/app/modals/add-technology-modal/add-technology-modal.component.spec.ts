import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTechnologyModalComponent } from './add-technology-modal.component';

describe('AddTechnologyModalComponent', () => {
  let component: AddTechnologyModalComponent;
  let fixture: ComponentFixture<AddTechnologyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTechnologyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTechnologyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
