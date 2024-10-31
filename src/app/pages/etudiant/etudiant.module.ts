import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtudiantComponent } from './etudiant.component';
import { RouterModule, Routes } from '@angular/router'; // Ajout du bon import
const routes: Routes = [
  {
    path: '',
    component: EtudiantComponent, // Utilisation du composant
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class EtudiantModule { }
