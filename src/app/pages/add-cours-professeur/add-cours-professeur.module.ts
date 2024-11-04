import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCoursProfesseurComponent } from './add-cours-professeur.component';

@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: AddCoursProfesseurComponent,
      }
    ]),
  ]
})
export class AddCoursProfesseurModule { }
