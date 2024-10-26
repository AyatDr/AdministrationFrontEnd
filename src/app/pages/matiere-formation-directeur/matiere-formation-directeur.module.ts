import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatiereFormationDirecteurComponent } from './matiere-formation-directeur.component';
import { RouterModule, Routes } from '@angular/router'; // Ajout du bon import
const routes: Routes = [
  {
    path: '',
    component: MatiereFormationDirecteurComponent, // Utilisation du composant
  },
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class MatiereFormationDirecteurModule {

  
 }
