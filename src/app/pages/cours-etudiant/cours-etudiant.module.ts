import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; // Ajout du bon import
import { CoursEtudiantComponent } from './cours-etudiant.component';


const routes: Routes = [
  {
    path: '',
    component: CoursEtudiantComponent, // Utilisation du composant
  },
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CoursEtudiantModule { }
