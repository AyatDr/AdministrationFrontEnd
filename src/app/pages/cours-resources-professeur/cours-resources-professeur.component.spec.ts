import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursResourcesProfesseurComponent } from './cours-resources-professeur.component';

describe('CoursResourcesProfesseurComponent', () => {
  let component: CoursResourcesProfesseurComponent;
  let fixture: ComponentFixture<CoursResourcesProfesseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursResourcesProfesseurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursResourcesProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
