import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ModuleProfesseurComponent } from './module-professeur.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: ModuleProfesseurComponent,
      }
    ]),
  ]
})
export class ModuleProfesseurModule { }
