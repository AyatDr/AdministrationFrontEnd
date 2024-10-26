import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; // Ajout du bon import
import { ModuleFormationDirecteurComponent } from './module-formation-directeur.component'; // Assure-toi que ce chemin est correct

const routes: Routes = [
  {
    path: '',
    component: ModuleFormationDirecteurComponent, // Utilisation du composant
  },
];

@NgModule({
  declarations: [], // Déclare le composant ici
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // Configuration correcte des routes
  ],
})
export class ModuleFormationDirecteurModule {}
