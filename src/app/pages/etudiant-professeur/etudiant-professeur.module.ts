import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EtudiantProfesseurComponent } from './etudiant-professeur.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: EtudiantProfesseurComponent,
      }
    ]),
  ]
})
export class EtudiantProfesseurModule { }
