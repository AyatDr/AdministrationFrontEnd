import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-professeur-directeur',
  templateUrl: './professeur-directeur.component.html',
  styleUrl: './professeur-directeur.component.scss'
})
export class ProfesseurDirecteurComponent {

  data: any[] = [];
  errorMessage: string = '';

  constructor( private authService: AuthService,
    private http: HttpService,
    private cdr: ChangeDetectorRef,
    
  ) {
    

  }


  ngOnInit(): void {
    this.loadData();
    this.loadFormations()
  }


  professeurs: any[] = [];
  formations: any[] = [];


  loadData(): void {
    this.http.getDataAuth('/professeur/list').subscribe(
      (response) => {
        console.log('Professeurs reçus du backend:', response);
        this.professeurs = response;
        this.assignMatiersToProfesseurs(); // Assign subjects after loading professors
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Erreur lors de la récupération des professeurs:', error);
        this.errorMessage = 'Erreur de récupération des professeurs';
      }
    );
  }
  
  loadFormations(): void {
    this.http.getDataAuth('/directeur/formation/list').subscribe(
      (response) => {
        console.log('Formations reçues du backend:', response);
        this.formations = response;
        this.assignMatiersToProfesseurs(); // Assign subjects after loading formations
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Erreur lors de la récupération des formations:', error);
        this.errorMessage = 'Erreur de récupération des formations';
      }
    );
  }
  
  assignMatiersToProfesseurs(): void {
    // Check if both professors and formations are loaded
    if (this.professeurs.length === 0 || this.formations.length === 0) return;
  
    this.professeurs.forEach((professeur) => {
      // Collect all the subjects (matières) taught by this professor
      const matieres: any[] = [];
  
      this.formations.forEach((formation) => {
        formation.semestres.forEach((semestre: any) => {
          semestre.modules.forEach((module: any) => {
            module.matieres.forEach((matiere: any) => {
              if (matiere.professeur.id === professeur.id) {
                matieres.push(matiere);
              }
            });
          });
        });
      });
  
      // Assign the collected subjects to the professor
      professeur.matieres = matieres;
    });
  
    console.log('Professeurs avec matières assignées:', this.professeurs);
  }

   // Fonction pour générer une couleur aléatoire
   getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  onEdit(etudiant: any): void {
    console.log('Modifier étudiant:', etudiant);
    // Implémente ici la logique de modification
  }
  
  onDelete(etudiant: any): void {
    console.log('Supprimer étudiant:', etudiant);
    // Implémente ici la logique de suppression (par exemple, afficher un SweetAlert)
  }

   
}
