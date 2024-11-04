import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CoursProfesseurComponent } from './cours-professeur.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: CoursProfesseurComponent,
      }
    ]),
  ]
})
export class CoursProfesseurModule { }
