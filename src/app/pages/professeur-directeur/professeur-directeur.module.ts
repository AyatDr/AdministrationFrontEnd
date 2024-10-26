import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfesseurDirecteurComponent } from './professeur-directeur.component'; // Import du composant

@NgModule({
  declarations: [ProfesseurDirecteurComponent], // Déclarer le composant ici
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfesseurDirecteurComponent, // Associer la route au composant
      },
    ]),
  ],
})
export class ProfesseurDirecteurModule {}
