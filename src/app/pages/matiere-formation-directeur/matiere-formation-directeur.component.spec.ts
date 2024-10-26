import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatiereFormationDirecteurComponent } from './matiere-formation-directeur.component';

describe('MatiereFormationDirecteurComponent', () => {
  let component: MatiereFormationDirecteurComponent;
  let fixture: ComponentFixture<MatiereFormationDirecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatiereFormationDirecteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatiereFormationDirecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
