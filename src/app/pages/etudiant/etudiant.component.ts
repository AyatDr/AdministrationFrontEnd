import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etudiant',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.scss']
})
export class EtudiantComponent implements OnInit {
  data: any = {}; // Contiendra les informations de formation générale
  semestre: any = {}; // Contiendra uniquement les informations du premier semestre
  errorMessage: string = '';
  auth: any;

  // Variables pour le comportement des icônes
  hoveredDelete: boolean = false;
  hoveredEdit: boolean = false;

  // Données pour le formulaire d'ajout et d'édition
  ModuleData: any = {};
  editModule: any = {};


  constructor(
    private http: HttpService, 
    private cdr: ChangeDetectorRef, 
    private authService: AuthService,
    private router: Router
  ) {
    this.auth = this.authService.getAuthFromLocalStorage();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const id = this.auth?.user?.id; 
    this.http.getDataAuth(`/formationEtudiant/${id}`).subscribe(
      (response: any) => {
        console.log('Données reçues du backend:', response);

        // Stockage de la formation entière et du premier semestre
        this.data = response;
        this.semestre = response?.semestres[0] || {};
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);
        this.errorMessage = 'Erreur de récupération des données';
      }
    );
  }

  goToMatierePage(module: any): void {
    console.log('module envoyé : ', module);
    this.router.navigate(['apps/MatiereEtudiant'], { state: { module } });
  }

  deleteModule(moduleId: number): void {
    console.log("Suppression du module avec l'ID:", moduleId);
  }

  

  onSubmit(): void {
    console.log("Ajout d'un nouveau module avec les données:", this.ModuleData);
  }

  onSubmitEdit(): void {
    console.log("Édition du module avec les nouvelles données:", this.editModule);
  }
}
