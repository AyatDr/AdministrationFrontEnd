import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursFormationDirecteurComponent } from './cours-formation-directeur.component';

describe('CoursFormationDirecteurComponent', () => {
  let component: CoursFormationDirecteurComponent;
  let fixture: ComponentFixture<CoursFormationDirecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursFormationDirecteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursFormationDirecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
