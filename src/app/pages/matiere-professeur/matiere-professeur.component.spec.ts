import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatiereProfesseurComponent } from './matiere-professeur.component';

describe('MatiereProfesseurComponent', () => {
  let component: MatiereProfesseurComponent;
  let fixture: ComponentFixture<MatiereProfesseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatiereProfesseurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatiereProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
