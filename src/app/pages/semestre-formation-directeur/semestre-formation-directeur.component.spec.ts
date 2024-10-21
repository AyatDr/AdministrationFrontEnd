import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemestreFormationDirecteurComponent } from './semestre-formation-directeur.component';

describe('SemestreFormationDirecteurComponent', () => {
  let component: SemestreFormationDirecteurComponent;
  let fixture: ComponentFixture<SemestreFormationDirecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemestreFormationDirecteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SemestreFormationDirecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
