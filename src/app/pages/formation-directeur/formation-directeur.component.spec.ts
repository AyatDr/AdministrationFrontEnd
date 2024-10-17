import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationDirecteurComponent } from './formation-directeur.component';

describe('FormationDirecteurComponent', () => {
  let component: FormationDirecteurComponent;
  let fixture: ComponentFixture<FormationDirecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationDirecteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormationDirecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
