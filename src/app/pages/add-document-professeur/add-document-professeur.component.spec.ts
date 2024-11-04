import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocumentProfesseurComponent } from './add-document-professeur.component';

describe('AddDocumentProfesseurComponent', () => {
  let component: AddDocumentProfesseurComponent;
  let fixture: ComponentFixture<AddDocumentProfesseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDocumentProfesseurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDocumentProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
