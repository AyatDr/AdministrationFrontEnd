import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EtudiantDirecteurComponent } from './etudiant-directeur.component';



@NgModule({
  declarations: [EtudiantDirecteurComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EtudiantDirecteurComponent, // Associer la route au composant
      },
    ]),
  ],
})
export class EtudiantDirecteurModule { }
