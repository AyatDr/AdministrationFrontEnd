import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; // Ajout du bon import
import { MatiereEtudiantComponent } from './matiere-etudiant.component';
const routes: Routes = [
  {
    path: '',
    component: MatiereEtudiantComponent, // Utilisation du composant
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class MatiereEtudiantModule { }
