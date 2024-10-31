import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursEtudiantDetailsComponent } from './cours-etudiant-details.component';

describe('CoursEtudiantDetailsComponent', () => {
  let component: CoursEtudiantDetailsComponent;
  let fixture: ComponentFixture<CoursEtudiantDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursEtudiantDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursEtudiantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
