import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemestreProfesseurComponent } from './semestre-professeur.component';

describe('SemestreProfesseurComponent', () => {
  let component: SemestreProfesseurComponent;
  let fixture: ComponentFixture<SemestreProfesseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemestreProfesseurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SemestreProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
