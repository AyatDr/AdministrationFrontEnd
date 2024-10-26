import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantDirecteurComponent } from './etudiant-directeur.component';

describe('EtudiantDirecteurComponent', () => {
  let component: EtudiantDirecteurComponent;
  let fixture: ComponentFixture<EtudiantDirecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudiantDirecteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtudiantDirecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
