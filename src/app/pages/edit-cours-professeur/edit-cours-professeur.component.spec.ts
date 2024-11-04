import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoursProfesseurComponent } from './edit-cours-professeur.component';

describe('EditCoursProfesseurComponent', () => {
  let component: EditCoursProfesseurComponent;
  let fixture: ComponentFixture<EditCoursProfesseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCoursProfesseurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCoursProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
