import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router'; // Ajout du bon import
import { CoursEtudiantDetailsComponent } from './cours-etudiant-details.component';



const routes: Routes = [
  {
    path: '',
    component: CoursEtudiantDetailsComponent, // Utilisation du composant
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  
  ]
})
export class CoursEtudiantDetailsModule { }
