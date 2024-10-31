import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatiereEtudiantComponent } from './matiere-etudiant.component';

describe('MatiereEtudiantComponent', () => {
  let component: MatiereEtudiantComponent;
  let fixture: ComponentFixture<MatiereEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatiereEtudiantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatiereEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
