// src/app/shared/shared.module.ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AddClientComponent } from 'src/app/pages/user/add-client/add-client.component'; // Adjust the path as necessary
// import { UpdateClientComponent } from 'src/app/pages/user/update-client/update-client.component'; // Adjust the path as necessary
import { MapComponent } from '../_metronic/partials/content/widgets/map/map.component';
@NgModule({
  declarations: [
    // AddClientComponent,
    // UpdateClientComponent,
    MapComponent
    // Declare other shared components, directives, or pipes here
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Import other Angular modules if needed
  ],
  exports: [
    // AddClientComponent,
    // UpdateClientComponent,
    MapComponent
    // Export other shared components, directives, or pipes here
  ]
})
export class SharedModule { }
