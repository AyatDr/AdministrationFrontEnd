import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; // Ajout du bon import
import { CoursFormationDirecteurComponent } from './cours-formation-directeur.component';
const routes: Routes = [
  {
    path: '',
    component: CoursFormationDirecteurComponent, // Utilisation du composant
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CoursFormationDirecteurModule { }
