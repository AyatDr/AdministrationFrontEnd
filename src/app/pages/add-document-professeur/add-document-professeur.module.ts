import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AddDocumentProfesseurComponent } from './add-document-professeur.component';

@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: AddDocumentProfesseurComponent,
      }
    ]),
  ]
})
export class AddDocumentProfesseurModule { }
