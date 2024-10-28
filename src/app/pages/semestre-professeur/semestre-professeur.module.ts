import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SemestreProfesseurComponent } from './semestre-professeur.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: SemestreProfesseurComponent,
      }
    ]),
  ]
})
export class SemestreProfesseurModule { }
