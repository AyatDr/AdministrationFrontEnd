import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursProfesseurComponent } from './cours-professeur.component';

describe('CoursProfesseurComponent', () => {
  let component: CoursProfesseurComponent;
  let fixture: ComponentFixture<CoursProfesseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursProfesseurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
