import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursDetailsDirecteurComponent } from './cours-details-directeur.component';

describe('CoursDetailsDirecteurComponent', () => {
  let component: CoursDetailsDirecteurComponent;
  let fixture: ComponentFixture<CoursDetailsDirecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursDetailsDirecteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursDetailsDirecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
