import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleFormationDirecteurComponent } from './module-formation-directeur.component';

describe('ModuleFormationDirecteurComponent', () => {
  let component: ModuleFormationDirecteurComponent;
  let fixture: ComponentFixture<ModuleFormationDirecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleFormationDirecteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuleFormationDirecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
