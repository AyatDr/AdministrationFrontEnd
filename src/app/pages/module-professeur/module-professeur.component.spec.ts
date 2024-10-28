import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleProfesseurComponent } from './module-professeur.component';

describe('ModuleProfesseurComponent', () => {
  let component: ModuleProfesseurComponent;
  let fixture: ComponentFixture<ModuleProfesseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleProfesseurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuleProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
