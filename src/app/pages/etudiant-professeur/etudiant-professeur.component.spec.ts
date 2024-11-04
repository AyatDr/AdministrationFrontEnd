import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantProfesseurComponent } from './etudiant-professeur.component';

describe('EtudiantProfesseurComponent', () => {
  let component: EtudiantProfesseurComponent;
  let fixture: ComponentFixture<EtudiantProfesseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudiantProfesseurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtudiantProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
