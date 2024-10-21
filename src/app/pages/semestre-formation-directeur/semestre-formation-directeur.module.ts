import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { SemestreFormationDirecteurComponent } from './semestre-formation-directeur.component'; // Import FormationDirecteurComponent

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SemestreFormationDirecteurComponent, // Utilisation du composant
      },
    ]),
  ],
})
export class SemestreFormationDirecteurModule { }
