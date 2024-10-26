import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; // Ajout du bon import
import { CoursDetailsDirecteurComponent } from './cours-details-directeur.component';

const routes: Routes = [
  {
    path: '',
    component: CoursDetailsDirecteurComponent, // Utilisation du composant
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CoursDetailsDirecteurModule { }
