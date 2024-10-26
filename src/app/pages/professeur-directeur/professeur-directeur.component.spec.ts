import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesseurDirecteurComponent } from './professeur-directeur.component';

describe('ProfesseurDirecteurComponent', () => {
  let component: ProfesseurDirecteurComponent;
  let fixture: ComponentFixture<ProfesseurDirecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesseurDirecteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfesseurDirecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
