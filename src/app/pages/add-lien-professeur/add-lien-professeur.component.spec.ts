import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLienProfesseurComponent } from './add-lien-professeur.component';

describe('AddLienProfesseurComponent', () => {
  let component: AddLienProfesseurComponent;
  let fixture: ComponentFixture<AddLienProfesseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLienProfesseurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddLienProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
