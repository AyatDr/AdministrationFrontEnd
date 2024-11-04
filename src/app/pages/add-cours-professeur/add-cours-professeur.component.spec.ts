import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoursProfesseurComponent } from './add-cours-professeur.component';

describe('AddCoursProfesseurComponent', () => {
  let component: AddCoursProfesseurComponent;
  let fixture: ComponentFixture<AddCoursProfesseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCoursProfesseurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCoursProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
