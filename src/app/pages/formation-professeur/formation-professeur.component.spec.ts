import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationProfesseurComponent } from './formation-professeur.component';

describe('FormationProfesseurComponent', () => {
  let component: FormationProfesseurComponent;
  let fixture: ComponentFixture<FormationProfesseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationProfesseurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormationProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
