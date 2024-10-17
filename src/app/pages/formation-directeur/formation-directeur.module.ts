import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { FormationDirecteurComponent } from './formation-directeur.component'; // Import the standalone component

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FormationDirecteurComponent, // Use the component directly
      },
    ]),
  ],
})
export class FormationDirecteurModule {}
